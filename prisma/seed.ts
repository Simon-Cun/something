import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.homeContent.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Simon Sau Cun",
      title: "Software Engineer",
      bio: "Hello, my name is Simon and I am a current student at the University of California, Riverside studying Computer Science.",
      githubUrl: "https://github.com/Simon-Cun",
      linkedinUrl: "https://www.linkedin.com/in/Simon-Cun",
      email: "simoncun2586@gmail.com",
      resumeUrl: "/Simon_Cun_Resume.pdf",
      profileImage: "/profile.png",
    },
  });

  await prisma.project.deleteMany();

  await prisma.project.createMany({
    data: [
      {
        title: "Cutie Mood (Mobile App)",
        date: "Sep 2025 – Aug 2025",
        status: "Completed",
        color: "bg-orange-200/20",
        imageUrl: "/projects/cutiemood.png",
        imageAlt: "Cutie Mood app calendar and chat screens",
        description:
          "Cross-platform mood tracking and journaling app with a calendar UI, Supabase sync, and a chatbot powered by Gemini.",
        techStack: [
          "React Native",
          "Expo",
          "TypeScript",
          "NativeWind",
          "Supabase",
          "PostgreSQL",
          "Gemini API",
        ],
        githubUrl: "https://github.com/kellyma626/cutieMood",
        demoUrl: "#",
        features: [
          "Calendar-based mood tracking with color-coded days",
          "Journal entries synced to Supabase with local caching",
          "Chatbot journaling powered by Gemini API",
          "Error-handled API calls and resilient UX",
        ],
        role: "Mobile Developer",
        displayOrder: 0,
      },
      {
        title: "Undergraduate Learning Assistant Website",
        date: "Jun 2025 – September 2025",
        status: "Ongoing",
        color: "bg-indigo-200/20",
        imageUrl: "/projects/ula.png",
        imageAlt: "Undergraduate Learning Assistant Landing Page",
        description:
          "UCR CSE's Undergraduate Learning Assistants site to support students and showcase program resources.",
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "TanStack Query",
        ],
        githubUrl: "https://github.com/acm-ucr/cse-ula",
        demoUrl: "https://ula.ucrhighlanders.org/",
        features: [
          "Responsive pages with reusable UI components",
          "Data fetching and caching with TanStack Query for fast loads",
          "Accessible design and SEO-friendly metadata",
        ],
        role: "Web Developer",
        displayOrder: 1,
      },
      {
        title: "My Personal Portfolio Website",
        date: "May 2025",
        status: "Complete",
        color: "bg-sky-100/20",
        imageUrl: "/projects/portfolio.png",
        imageAlt: "My Portfolio Website Landing Page",
        description:
          "Personal website built to showcase projects, resume, and contact info. Designed with a clean UI and hosted on Vercel.",
        techStack: ["React", "Next.js", "TailwindCSS"],
        githubUrl: "https://github.com/Simon-Cun/Portfolio",
        demoUrl: "https://simoncun.vercel.app",
        features: ["Live project previews", "Mobile responsive layout"],
        role: "Full Stack Developer",
        displayOrder: 2,
      },
      {
        title: "ACM Forge Autonomous Drones Project",
        date: "Feb 2025 – Present",
        status: "Ongoing",
        color: "bg-purple-200/20",
        imageUrl: "/projects/skyflow.jpg",
        imageAlt: "Drone Project Image",
        description:
          "Designed and built a fully autonomous drone. Programmed flight control in Python, integrated sensors and cameras, and led hardware–software integration using SolidWorks and IMU calibration.",
        techStack: ["Python", "SolidWorks", "Git", "Raspberry Pi"],
        githubUrl: "https://github.com/acm-ucr/drones-skyflow",
        demoUrl: "#",
        features: [
          "3D-printed custom drone chassis",
          "Stabilized autonomous flight with IMU calibration",
          "Integrated camera and motor systems",
        ],
        role: "Software & Mechanical Engineer",
        displayOrder: 3,
      },
      {
        title: "WUSHU Website",
        date: "Jan 2025 – Jun 2025",
        status: "Complete",
        color: "bg-pink-200/20",
        imageUrl: "/projects/wushu.png",
        imageAlt: "Wushu Landing Page",
        description:
          "Official website for the UCR Wushu Club. Interactive components with React and TypeScript, styled with Tailwind CSS, and animations with Framer Motion.",
        techStack: [
          "React",
          "Next.js",
          "TailwindCSS",
          "TypeScript",
          "Framer Motion",
          "Node.js",
        ],
        githubUrl: "https://github.com/acm-ucr/wushu-website",
        demoUrl: "https://wushu.ucrhighlanders.org/",
        features: [
          "Dynamic event and team member showcase",
          "Responsive design with smooth animations",
          "Optimized performance using Next.js",
        ],
        role: "Frontend Developer",
        displayOrder: 4,
      },
      {
        title: "Upcycle To Overcome - RoseHack 2025",
        date: "Jan 2025",
        status: "Complete",
        color: "bg-rose-200/20",
        imageUrl: "/projects/twiceisnice.png",
        imageAlt: "RoseHack Website Landing Page",
        description:
          "Sustainability-themed web app built during RoseHack 2025. Highlighted upcycling education with interactive UI and won the beginner track award.",
        techStack: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/Simon-Cun",
        demoUrl: "https://simon-cun.github.io/UpcycleToOvercome/",
        features: [
          "Informational sections about sustainability",
          "Interactive educational layout",
          "Built in under 24 hours at a hackathon",
        ],
        role: "Frontend Developer",
        displayOrder: 5,
      },
      {
        title: "Chinese Student Association Website",
        date: "Oct 2024 – Dec 2024",
        status: "Complete",
        color: "bg-fuchsia-200/20",
        imageUrl: "/projects/csa.png",
        imageAlt: "CSA Landing Page",
        description:
          "Modern club website for the Chinese Student Association at UCR. Collaborated on weekly sprints, implemented dynamic sections, and contributed to frontend development.",
        techStack: [
          "React",
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "Framer Motion",
          "Node.js",
        ],
        githubUrl: "https://github.com/acm-ucr/csa-website",
        demoUrl: "https://csa.ucrhighlanders.org/",
        features: [
          "Club event listing and contact form",
          "Modern responsive layout",
          "Animated transitions using Framer Motion",
        ],
        role: "Frontend Developer",
        displayOrder: 6,
      },
      {
        title: "Space Calculator - Cutie Hack 2024",
        date: "Nov 2024",
        status: "Complete",
        color: "bg-gray-700/20",
        imageUrl: "/projects/spacecalculator.png",
        imageAlt: "Space-themed calculator interface",
        description:
          "Space-themed calculator web app for Cutie Hack 2024 with playful design and interactive math operations.",
        techStack: ["HTML", "CSS", "JavaScript"],
        githubUrl: "https://github.com/aschu042/cutieHack",
        demoUrl: "https://evabao007.github.io/",
        features: [
          "Fully functional calculator with keyboard support",
          "Space-themed UI with animated galaxy background",
          "Built in under 12 hours at a hackathon",
        ],
        role: "Backend Developer",
        displayOrder: 7,
      },
    ],
  });

  await prisma.experience.deleteMany();

  await prisma.experience.createMany({
    data: [
      {
        title: "ACM @ UCR",
        role: "Software Engineer / VP of Internal Affairs",
        location: "Riverside, California",
        dateRange: "October 2025 – Present",
        information: [
          "Developed and refactored ACM projects, enhancing code efficiency and system performance by 30%, while contributing to both frontend and backend systems for student-led software development.",
          "Transformed 5+ Figma wireframes into responsive websites, implementing UI components and aligning visual design goals through weekly collaboration meetings.",
          "Managed internal documentation and scheduling for ACM Internal Affairs, streamlining event coordination by 40% and resource tracking, overall increasing community engagement by 60%.",
          "Organized and supported 10+ events per quarter, ensuring smooth communication within organization, and officers.",
        ],
        logoUrl: "/experience/acm@ucr.webp",
        displayOrder: 0,
      },
      {
        title: "Undergraduate Learning Assistant (ULA)",
        role: "Tutor - Professor Neftali Watkinson",
        location: "Riverside, California",
        dateRange: "October 2025 – Present",
        information: [
          "Supported classes of 100+ students in assembly language programming, computer architecture, and machine-level data representation through one-on-one and group tutoring sessions.",
          "Assisted students during weekly lab sessions with LC-3 assembly debugging, instruction execution, and memory organization concepts to reinforce course understanding.",
        ],
        logoUrl: "/experience/ula.png",
        displayOrder: 1,
      },
      {
        title: "Bearylicious",
        role: "Barista / Cashier",
        location: "Upland, California",
        dateRange: "September 2023 – February 2024",
        information: [
          "Provided excellent customer service in a high-volume boba tea shop.",
          "Prepared and served a variety of beverages efficiently and accurately.",
          "Managed POS transactions and maintained cleanliness of workstations.",
        ],
        logoUrl: "/experience/bearylicious.png",
        displayOrder: 2,
      },
    ],
  });

  console.log("Seed complete.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
