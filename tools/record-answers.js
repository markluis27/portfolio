// Records every chatbot answer (api/_answers.js) in Mark's ElevenLabs voice.
// Output: audio/answers/<id>.mp3  (static files: the live site needs no voice API key)
//
// Usage (from the project folder):
//   node tools/record-answers.js            record answers that have no MP3 yet
//   node tools/record-answers.js greeting   re-record specific ids
//   node tools/record-answers.js --all      re-record everything
//
// Needs ELEVENLABS_API_KEY (starts with "sk_") and ELEVENLABS_VOICE_ID, either as
// environment variables or in .env. Remove the key from .env when you are done.

const fs = require('fs');
const path = require('path');
const { ANSWERS } = require('../api/_answers');

const root = path.join(__dirname, '..');
const outDir = path.join(root, 'audio', 'answers');

function loadEnv() {
  try {
    for (const line of fs.readFileSync(path.join(root, '.env'), 'utf8').split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch { /* no .env */ }
}

async function main() {
  loadEnv();
  const key = process.env.ELEVENLABS_API_KEY;
  const voice = process.env.ELEVENLABS_VOICE_ID;
  if (!key || !voice) throw new Error('Set ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID (in .env or the environment).');

  const args = process.argv.slice(2);
  const all = args.includes('--all');
  const ids = args.filter(a => !a.startsWith('--'));
  const unknown = ids.filter(id => !ANSWERS.some(a => a.id === id));
  if (unknown.length) throw new Error('Unknown answer ids: ' + unknown.join(', '));

  fs.mkdirSync(outDir, { recursive: true });
  const todo = ANSWERS.filter(a =>
    ids.length ? ids.includes(a.id) : (all || !fs.existsSync(path.join(outDir, a.id + '.mp3'))));
  const chars = todo.reduce((n, a) => n + (a.speech || a.text).length, 0);
  console.log(`To record: ${todo.length} answers, ${chars} characters.`);
  if (!todo.length) return;

  // Check remaining credits first
  // (skipped when the key lacks the "user_read" permission; text-to-speech still works)
  const subRes = await fetch('https://api.elevenlabs.io/v1/user/subscription', { headers: { 'xi-api-key': key } });
  const sub = await subRes.json().catch(() => ({}));
  if (subRes.ok) {
    const left = sub.character_limit - sub.character_count;
    console.log(`ElevenLabs credits left this month: ${left} of ${sub.character_limit}.`);
    if (left < chars) throw new Error(`Not enough credits (${left} left, ${chars} needed).`);
  } else {
    console.log('Could not read the credit balance with this key; recording anyway.');
  }

  for (const a of todo) {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`,
      {
        method: 'POST',
        headers: { 'xi-api-key': key, 'Content-Type': 'application/json', Accept: 'audio/mpeg' },
        body: JSON.stringify({
          text: a.speech || a.text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.85, style: 0.15, use_speaker_boost: true },
        }),
      },
    );
    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Failed on "${a.id}" (${res.status}): ${err.slice(0, 300)}`);
    }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(path.join(outDir, a.id + '.mp3'), buf);
    console.log(`  recorded ${a.id}.mp3 (${Math.round(buf.length / 1024)} KB)`);
  }
  console.log('Done.');
}

main().catch(err => { console.error(err.message); process.exit(1); });
