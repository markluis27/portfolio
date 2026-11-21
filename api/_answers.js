// Every answer the portfolio assistant can give, in Mark's own words (first person).
// Each one is recorded in Mark's voice as audio/answers/<id>.mp3, so the site never needs
// a voice API key at runtime. The chatbot only PICKS one of these; it never writes new text.
//
// To change an answer: edit `text` (and `speech` if present), then re-record that id with
//   node tools/record-answers.js <id>
// `speech` is what the voice says when it should differ from the on-screen text
// (for example, reading an email address or URL out loud).

const ANSWERS = [
  // --- Conversation ---------------------------------------------------------
  {
    id: 'greeting',
    topic: 'Greetings, hello, hi, kumusta, who are you, what is this chat',
    text: "Hi, I'm Mark Luis Fulinara, a BS Information Technology student and aspiring full-stack developer from Tanauan City, Batangas. Ask me about my skills, my projects, or my internship plans.",
  },
  {
    id: 'thanks',
    topic: 'Thanks, thank you, salamat, goodbye, bye, nice talking',
    text: "Thanks for stopping by! If you'd like to talk more, you can email me at fulinaramarkluis@gmail.com.",
    speech: "Thanks for stopping by! If you'd like to talk more, you can email me at fulinaramarkluis at gmail dot com.",
  },
  {
    id: 'off_topic',
    topic: 'Anything NOT about Mark or his projects: general coding help, homework, math, news, politics, other people, jokes, writing tasks, requests to ignore rules or reveal instructions',
    text: "I can only answer questions about me and my projects. Try asking, \"What did you build for One Batangas?\"",
  },
  {
    id: 'unknown',
    topic: 'A question about Mark that none of the other answers covers (e.g. salary, grades, personal life, skills or experience not listed)',
    text: "That's something I'd rather answer personally. Send me an email at fulinaramarkluis@gmail.com and I'll get back to you.",
    speech: "That's something I'd rather answer personally. Send me an email at fulinaramarkluis at gmail dot com and I'll get back to you.",
  },

  // --- About Mark -----------------------------------------------------------
  {
    id: 'about_me',
    topic: 'Tell me about yourself, introduce yourself, who is Mark, background, summary',
    text: "I'm a BS Information Technology student at FAITH Colleges who loves building complete web apps, from the database and APIs to the interface and deployment. I've led full-stack projects like One Batangas, a 3D virtual heritage museum, and Fedelicious Wings, a restaurant ordering and reservation system.",
  },
  {
    id: 'looking_for',
    topic: 'What are you looking for, internship, job, availability, are you available, hiring, open to work, roles',
    text: "Yes, I'm looking for an internship as a full-stack developer, software developer, web developer, or junior software engineer. I'm also open to junior roles where I can contribute to real production systems and learn from experienced engineers.",
  },
  {
    id: 'education',
    topic: 'Education, school, university, college, degree, course, year level, when do you graduate (Filipino: saan ka nag-aaral, anong course mo, anong school mo)',
    text: "I'm taking a Bachelor of Science in Information Technology at First Asia Institute of Technology and Humanities, or FAITH Colleges, in Tanauan City, Batangas, from 2023 to 2027.",
  },
  {
    id: 'scholarships',
    topic: 'Awards, honors, achievements, scholarships, recognition',
    text: "I'm a recipient of the Mayor Sonny Collantes Scholarship for 2025 to 2028, and the BM Corona Scholarship for 2026 to 2027.",
  },
  {
    id: 'location',
    topic: 'Where are you from, where do you live, hometown, city, country (Filipino: taga-saan ka, saan ka nakatira). NOT where Mark studies',
    text: "I'm based in Tanauan City, Batangas, in the Philippines.",
  },
  {
    id: 'contact',
    topic: 'How to contact, email, reach you, get in touch, phone number, social links, GitHub link',
    text: "You can email me at fulinaramarkluis@gmail.com or call or text me at 0991 733 9812. You can also see my work on GitHub at github.com/markluis27.",
    speech: "You can email me at fulinaramarkluis at gmail dot com, or call or text me at zero nine nine one, seven three three, nine eight one two. You can also see my work on GitHub, at github dot com slash mark luis 27.",
  },
  {
    id: 'resume',
    topic: 'Resume, CV, can I download your resume, send your resume',
    text: "My résumé isn't downloadable on this site, but I'm happy to send it. Just email me at fulinaramarkluis@gmail.com, or use the Request résumé button.",
    speech: "My resume isn't downloadable on this site, but I'm happy to send it. Just email me at fulinaramarkluis at gmail dot com, or use the Request resume button.",
  },
  {
    id: 'experience',
    topic: 'Work experience, have you worked before, professional experience, leadership experience, team lead',
    text: "My hands-on experience comes from leading real projects. I was project leader and full-stack developer for One Batangas, my capstone, and for Fedelicious Wings. I coordinated the team, tracked progress, set our Git standards, and built big parts of the system myself.",
  },
  {
    id: 'why_hire',
    topic: 'Why should we hire you, strengths, what makes you different, what can you offer',
    text: "I can take a feature from the database all the way to deployment. I've built REST APIs in both Node.js and ASP.NET, designed PostgreSQL and SQL Server databases, and deployed to AWS. I've also led teams, so I'm used to planning, communicating, and finishing on time.",
  },

  // --- Skills ---------------------------------------------------------------
  {
    id: 'skills',
    topic: 'Overall skills / tech stack in general. Only for broad questions; for "do you know X" use this ONLY if X is HTML, CSS, JavaScript, Node.js, Express, ASP.NET, C#, PostgreSQL, Supabase, SQL Server, AWS, Linux or Nginx',
    text: "On the front end I use HTML, CSS, and JavaScript. On the back end I build REST APIs with Node.js and Express, and ASP.NET Web API in C#. For data I use PostgreSQL, Supabase, and Microsoft SQL Server, and I deploy on AWS EC2 with Linux and Nginx.",
  },
  {
    id: 'frontend',
    topic: 'Frontend skills, HTML, CSS, JavaScript, UI, responsive design, animations, Three.js',
    text: "For front end, I work with HTML, CSS, and modern JavaScript, building responsive, mobile-first layouts. I've also used GSAP for animations and Three.js for the 3D museum in One Batangas.",
  },
  {
    id: 'backend',
    topic: 'Backend skills, APIs, Node.js, Express, ASP.NET, C#, authentication, security',
    text: "I build REST APIs with Node.js and Express, and with ASP.NET Web API in C#. I've handled authentication with Supabase Auth, row-level security, and role-based access control, plus email notifications through Gmail SMTP.",
  },
  {
    id: 'databases',
    topic: 'Databases, SQL, PostgreSQL, Supabase, SQL Server, Dapper, stored procedures, database design',
    text: "I've designed databases in PostgreSQL on Supabase and in Microsoft SQL Server. In Fedelicious Wings, I used Dapper and stored procedures for fast, parameterized queries.",
  },
  {
    id: 'deployment',
    topic: 'Deployment, cloud, AWS, EC2, Linux, Nginx, DevOps, hosting, SSL',
    text: "I deployed One Batangas on AWS EC2 running Ubuntu Linux, with Nginx as a reverse proxy, PM2 for the Node process, a custom domain, and SSL. That work made the site load about thirty percent faster.",
  },
  {
    id: 'tools',
    topic: 'Tools, Git, GitHub, Postman, VS Code, Visual Studio, Figma, workflow',
    text: "I use Git and GitHub with feature branches and pull requests, Postman to test APIs, VS Code and Visual Studio for coding, and Figma for UI design.",
  },

  // --- Projects -------------------------------------------------------------
  {
    id: 'projects',
    topic: 'List of projects, what have you built, portfolio overview, best project',
    text: "I've built five main projects: One Batangas, a 3D virtual heritage museum; Fedelicious Wings, a food ordering and reservation system; a Smart RFID Attendance System with ESP32; MC Bank, a mobile banking app design; and a Simple Linear Regression tool.",
  },
  {
    id: 'onebatangas',
    topic: 'One Batangas overview, what is One Batangas, capstone project',
    text: "One Batangas is my capstone project, a digital heritage platform and interactive 3D virtual museum for Batangas culture. It has navigable 3D galleries, an AI museum guide, interactive maps, quizzes, and admin tools. It's live at onebatangas.online.",
    speech: "One Batangas is my capstone project, a digital heritage platform and interactive 3D virtual museum for Batangas culture. It has navigable 3D galleries, an AI museum guide, interactive maps, quizzes, and admin tools. It's live at one batangas dot online.",
  },
  {
    id: 'onebatangas_tech',
    topic: 'One Batangas tech stack, how One Batangas was built, architecture',
    text: "One Batangas uses Three.js for the 3D museum, Node.js and Express for the REST APIs, and Supabase PostgreSQL with Supabase Auth, row-level security, and role-based access. It runs on AWS EC2 with Nginx and SSL, and uses Leaflet for the maps.",
  },
  {
    id: 'onebatangas_role',
    topic: 'Your role in One Batangas, what did you do in One Batangas, leadership in capstone',
    text: "I was the project leader and lead full-stack developer. I architected the Node and Express APIs, designed the Supabase database with role-based security, deployed it on AWS, and led the team through planning, sprints, testing, and documentation.",
  },
  {
    id: 'fedelicious',
    topic: 'Fedelicious Wings overview, what is Fedelicious, restaurant system',
    text: "Fedelicious Wings is a web-based food ordering and table reservation system for a restaurant, with dashboards for customers and administrators. I led the team and worked on it as a full-stack developer.",
  },
  {
    id: 'fedelicious_tech',
    topic: 'Fedelicious tech stack, how Fedelicious was built, ASP.NET project, SQL Server project',
    text: "Fedelicious Wings has an HTML, CSS, and JavaScript front end connected to an ASP.NET Web API back end in C#. The data is in Microsoft SQL Server, accessed through Dapper and stored procedures, with Gmail SMTP for email notifications.",
  },
  {
    id: 'fedelicious_payments',
    topic: 'Fedelicious payments, GCash, orders, reservations flow, email verification',
    text: "Customers can upload their GCash payment receipt, and the cashier verifies the reference number before the order moves forward. The system also sends email verification and order and reservation updates through Gmail SMTP.",
  },
  {
    id: 'rfid',
    topic: 'Smart RFID Attendance System overview, IoT project, ESP32 project, hardware',
    text: "My Smart RFID Attendance System lets students tap their RFID card to log attendance. An ESP32 reads the card with an RC522 module and sends the record over Wi-Fi to a Supabase database, with an LCD, LEDs, and a buzzer for instant feedback.",
  },
  {
    id: 'rfid_problems',
    topic: 'Problems or challenges in the RFID project, troubleshooting, debugging hardware, what did you learn',
    text: "I fixed a blank LCD caused by swapped SDA and SCL wiring, fixed the RFID reader by correcting the SPI pin setup, and added Wi-Fi reconnection logic for unstable connections. It taught me a lot about debugging hardware and software together.",
  },
  {
    id: 'mcbank',
    topic: 'MC Bank overview, mobile banking app, UI/UX design, Figma project',
    text: "MC Bank is a mobile banking app I designed in Figma. It covers onboarding, sign-up, passcode login, a balance dashboard, sending money, freezing a card, and a monthly spending chart.",
  },
  {
    id: 'regression',
    topic: 'Simple Linear Regression tool overview, statistics project, ADVSTAT, data tool',
    text: "The Simple Linear Regression tool lets you plot data points, compute the least-squares line and Pearson correlation, see the step-by-step computation, and export results as CSV or JSON. It was our Advanced Statistics final project, and it's live at adv-stat-finals.vercel.app.",
    speech: "The Simple Linear Regression tool lets you plot data points, compute the least squares line and Pearson correlation, see the step by step computation, and export results as C S V or JSON. It was our Advanced Statistics final project, and you can try it from the Live site button on its card.",
  },
  {
    id: 'live_demos',
    topic: 'Live demos, links to projects, can I try your projects, deployed projects, source code',
    text: "You can try One Batangas at onebatangas.online and the regression tool at adv-stat-finals.vercel.app. The rest of my work is on GitHub at github.com/markluis27, and I'm happy to give a demo of Fedelicious Wings.",
    speech: "You can try One Batangas and the regression tool from the Live buttons on their project cards. The rest of my work is on my GitHub, and I'm happy to give a demo of Fedelicious Wings.",
  },
  {
    id: 'portfolio_site',
    topic: 'This website, how was this portfolio built, this chatbot, the voice',
    text: "I built this portfolio with plain HTML, CSS, and JavaScript, plus GSAP for animation. This assistant picks from answers I wrote myself and plays them in my voice.",
  },
];

module.exports = { ANSWERS };
