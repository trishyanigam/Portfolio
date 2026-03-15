import { useState, useEffect, useRef } from "react";

const COLORS = {
  dark: {
    bg: "#0a0f1e",
    surface: "#111827",
    card: "#1a2236",
    cardHover: "#1e2a42",
    border: "#2a3550",
    text: "#e8edf5",
    muted: "#8899bb",
    accent: "#4f8ef7",
    accentGlow: "rgba(79,142,247,0.18)",
    accent2: "#38e5c5",
    accent3: "#f7934f",
    navBg: "rgba(10,15,30,0.92)",
  },
  light: {
    bg: "#f0f4ff",
    surface: "#ffffff",
    card: "#ffffff",
    cardHover: "#f5f8ff",
    border: "#dde5f5",
    text: "#1a2236",
    muted: "#5a6a8a",
    accent: "#2563eb",
    accentGlow: "rgba(37,99,235,0.10)",
    accent2: "#0d9488",
    accent3: "#ea6b1f",
    navBg: "rgba(240,244,255,0.95)",
  },
};

const skillsData = {
  technical: [
    { name: "JavaScript", level: 88, category: "Languages", icon: "🟨", color: "#f7df1e" },
    { name: "C++", level: 82, category: "Languages", icon: "⚙️", color: "#00599c" },
    { name: "Python", level: 70, category: "Languages", icon: "🐍", color: "#3776ab" },
    { name: "Java", level: 68, category: "Languages", icon: "☕", color: "#ed8b00" },
    { name: "PHP", level: 65, category: "Languages", icon: "🐘", color: "#777bb4" },
    { name: "React.js", level: 85, category: "Web Dev", icon: "⚛️", color: "#61dafb" },
    { name: "Node.js", level: 83, category: "Web Dev", icon: "🟢", color: "#339933" },
    { name: "Express.js", level: 82, category: "Web Dev", icon: "🚂", color: "#68a063" },
    { name: "MongoDB", level: 80, category: "Databases", icon: "🍃", color: "#47a248" },
    { name: "MySQL", level: 75, category: "Databases", icon: "🐬", color: "#4479a1" },
    { name: "Tailwind CSS", level: 87, category: "Web Dev", icon: "💨", color: "#06b6d4" },
    { name: "Git & GitHub", level: 85, category: "Tools", icon: "🔀", color: "#f05032" },
    { name: "REST APIs", level: 83, category: "Web Dev", icon: "🔗", color: "#ff6b6b" },
    { name: "Socket.IO", level: 72, category: "Web Dev", icon: "⚡", color: "#010101" },
    { name: "Generative AI", level: 78, category: "Tools", icon: "🤖", color: "#9b59b6" },
  ],
  soft: [
    { name: "Problem Solving", level: 92, category: "Soft Skills", icon: "🧩", color: "#4f8ef7" },
    { name: "Communication", level: 88, category: "Soft Skills", icon: "💬", color: "#38e5c5" },
    { name: "Team Collaboration", level: 90, category: "Soft Skills", icon: "🤝", color: "#f7934f" },
    { name: "Quick Learner", level: 95, category: "Soft Skills", icon: "🚀", color: "#c084fc" },
  ],
};

const projects = [
  {
    title: "PrepHunter",
    period: "2025",
    desc: "Full-Stack Interview Preparation & Job Hunting Platform",
    bullets: [
      "Built a MERN stack platform to help students prepare for technical interviews with curated resources",
      "Implemented structured roadmaps, topic-wise question banks, and progress tracking for users",
      "Designed a responsive frontend with React.js and a robust backend API with Node.js & Express.js",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "JavaScript"],
    color: "#6366f1",
    emoji: "🎯",
    image: "/project-images/prephunter.png",
    github: "https://github.com/trishyanigam/prepHunter",
    live: "https://github.com/trishyanigam/prepHunter",
    featured: true,
  },
  {
    title: "IP Assist Hub",
    period: "Nov 2025 – Dec 2025",
    desc: "Real-Time IP Management & Admin Support System",
    bullets: [
      "Full-stack IP management platform with role-based access for Admin and Applicants",
      "Real-time communication using Socket.IO for seamless admin–applicant interaction",
      "Improved application processing efficiency by 30%, reduced response time through live chat",
    ],
    tech: ["Node.js", "Express.js", "MongoDB", "React.js", "Socket.IO"],
    color: "#4f8ef7",
    emoji: "🔐",
    image: "/project-images/ipassisthub.png",
    github: "https://github.com/trishyanigam/IPFC",
    live: "#",
    featured: true,
  },
  {
    title: "Food Fit AI",
    period: "Jun 2025 – Jul 2025",
    desc: "AI-Powered Personalized Nutrition & Meal Recommendation System",
    bullets: [
      "Personalized meal recommendation web app for fitness goals through data-driven planning",
      "Integrated nutrition APIs, secure authentication, interactive dashboard for calorie monitoring",
      "Enhanced user engagement by 40%, reduced meal planning effort by 60%",
    ],
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "Generative AI"],
    color: "#38e5c5",
    emoji: "🥗",
    image: "/project-images/foodfitai.png",
    github: "https://github.com/trishyanigam/ai-ingredient-replacer",
    live: "#",
    featured: true,
  },
  {
    title: "Budget Buddy",
    period: "Feb 2025 – Mar 2025",
    desc: "Smart Expense Tracking & Financial Management System",
    bullets: [
      "Full-stack expense tracking system for managing budgets and monitoring daily expenses",
      "Transaction categorization, budget goal setting, and real-time expense visualization",
      "Boosted tracking accuracy by 45%, reduced manual budgeting effort by 55%",
    ],
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Bootstrap"],
    color: "#f7934f",
    emoji: "💰",
    image: "/project-images/budgetbuddy.png",
    github: "https://github.com/trishyanigam/BudgetBuddy",
    live: "#",
    featured: false,
  },
  {
    title: "Fake News Detector",
    period: "2025",
    desc: "AI-Powered News Credibility Verification & Fact-Checking Tool",
    bullets: [
      "Built a web app that analyzes news articles and URLs to detect potentially fake or misleading content",
      "Integrated multiple pages: analyze, results, similar articles, sources, and how-it-works explanation",
      "Implemented credibility scoring logic with a clean, responsive interface using vanilla HTML/CSS/JS",
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    color: "#f43f5e",
    emoji: "🔍",
    image: "/project-images/fakenewsdetector.png",
    github: "https://github.com/trishyanigam/fake-news-detector",
    live: "#",
    featured: false,
  },
];

const certifications = [
  {
    name: "OCI 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    date: "Aug 2025",
    color: "#f7934f",
    preview: "#",
    download: "#",
  },
  {
    name: "ChatGPT-4 Prompt Engineering: ChatGPT, Generative AI & LLM",
    issuer: "Infosys",
    date: "Aug 2025",
    color: "#38e5c5",
    preview: "#",
    download: "#",
  },
  {
    name: "Introduction to Machine Learning",
    issuer: "NPTEL (IIT Madras)",
    date: "Jan 2025 – Apr 2025",
    color: "#c084fc",
    preview: "#",
    download: "#",
  },
  {
    name: "Web Development",
    issuer: "Rising Tech Pro",
    date: "Feb 2024 – Mar 2024",
    color: "#4f8ef7",
    preview: "#",
    download: "#",
  },
];

const training = [
  {
    title: "MERN with Gen AI",
    provider: "W3grads",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Completed structured course covering basic to advanced MERN Stack concepts and projects",
      "Learned new frameworks like React.js, Express.js and MongoDB database",
      "Built a MERN project on Job Application Tracker and earned certification",
    ],
    preview: "#",
    download: "#",
  },
];

const achievements = [
  {
    title: "Semifinalist, Flipkart Grid 7.0",
    date: "Aug 2025",
    desc: "Selected among top participants nationwide in a prestigious tech innovation competition organized by Flipkart.",
    icon: "🏆",
    color: "#f7934f",
  },
  {
    title: "Contributor, GirlScript Summer of Code (GSSoC)",
    date: "Aug 2025",
    desc: "Contributed to open-source projects by fixing issues, raising pull requests, and collaborating with developers across India.",
    icon: "🌟",
    color: "#38e5c5",
  },
  {
    title: "5-star C++ & 4-star Java on HackerRank",
    date: "Jul 2025",
    desc: "Demonstrated strong programming and problem-solving skills through competitive coding.",
    icon: "💻",
    color: "#4f8ef7",
  },
];

const navLinks = ["About", "Skills", "Projects", "Education", "Training", "Achievements", "Contact"];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function GitHubIcon({ size = 18, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function AnimatedBar({ level, color, delay = 0, dark }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ width: "100%", background: dark ? "#2a3550" : "#dde5f5", borderRadius: 99, height: 8, overflow: "hidden" }}>
      <div style={{
        height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, ${color}, ${color}cc)`,
        width: inView ? `${level}%` : "0%",
        transition: `width 1.1s cubic-bezier(.4,0,.2,1) ${delay}ms`,
        boxShadow: inView ? `0 0 12px ${color}88` : "none",
      }} />
    </div>
  );
}

function SkillCard({ skill, index, dark, c }) {
  const [hovered, setHovered] = useState(false);
  const skillColor = skill.color || c.accent;
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? dark ? `linear-gradient(135deg, ${skillColor}18, ${skillColor}08)` : `linear-gradient(135deg, ${skillColor}12, #fff)`
          : c.card,
        border: `1px solid ${hovered ? skillColor + "55" : c.border}`,
        borderRadius: 18,
        padding: "22px 20px",
        transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? `0 12px 32px ${skillColor}22` : "none",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}>
      {/* Glow blob in corner */}
      <div style={{
        position: "absolute", top: -20, right: -20,
        width: 80, height: 80, borderRadius: "50%",
        background: `${skillColor}18`,
        transition: "all 0.3s",
        transform: hovered ? "scale(1.8)" : "scale(1)",
      }} />
      {/* Top row: icon + name + percent */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, position: "relative" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, flexShrink: 0,
          background: `${skillColor}20`,
          border: `1px solid ${skillColor}33`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 18, transition: "transform 0.3s",
          transform: hovered ? "scale(1.1) rotate(-5deg)" : "none",
        }}>
          {skill.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: c.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {skill.name}
          </div>
          <div style={{ fontSize: 11, color: c.muted, marginTop: 1 }}>{skill.category}</div>
        </div>
        <div style={{
          fontSize: 15, fontWeight: 800, color: skillColor,
          background: `${skillColor}15`,
          padding: "2px 8px", borderRadius: 99,
          border: `1px solid ${skillColor}30`,
          flexShrink: 0,
        }}>
          {skill.level}%
        </div>
      </div>
      {/* Progress bar */}
      <AnimatedBar level={skill.level} color={skillColor} delay={index * 50} dark={dark} />
    </div>
  );
}

function ProjectCard({ p, dark, c }) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div style={{
      background: c.card, border: `1px solid ${hovered ? p.color + "66" : c.border}`,
      borderRadius: 20, overflow: "hidden",
      boxShadow: hovered ? `0 16px 40px ${p.color}22` : "none",
      transition: "all 0.3s cubic-bezier(.4,0,.2,1)",
      transform: hovered ? "translateY(-6px)" : "none",
      display: "flex", flexDirection: "column",
    }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>

      {/* Project Preview Banner */}
      <div style={{
        height: 190,
        position: "relative", overflow: "hidden",
        borderBottom: `1px solid ${p.color}33`,
        flexShrink: 0,
      }}>
        {/* Real screenshot if available and not errored */}
        {p.image && !imgError ? (
          <>
            <img
              src={p.image}
              alt={`${p.title} preview`}
              onError={() => setImgError(true)}
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "top",
                display: "block",
                transition: "transform 0.5s ease",
                transform: hovered ? "scale(1.04)" : "scale(1)",
              }}
            />
            {/* Subtle overlay so browser bar reads well */}
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 40%, rgba(0,0,0,0.18) 100%)`,
            }} />
          </>
        ) : (
          /* Fallback: gradient + emoji */
          <>
            <div style={{
              position: "absolute", inset: 0,
              background: `linear-gradient(135deg, ${p.color}22 0%, ${p.color}44 100%)`,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              background: `radial-gradient(circle at 30% 50%, ${p.color}33, transparent 70%)`,
            }} />
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <div style={{ fontSize: 64, filter: "drop-shadow(0 4px 16px rgba(0,0,0,.2))" }}>{p.emoji}</div>
            </div>
          </>
        )}


        {/* Featured badge */}
        {p.featured && (
          <div style={{
            position: "absolute", bottom: 12, left: 16,
            background: "linear-gradient(90deg, #f7934f, #f7c34f)",
            color: "#fff", borderRadius: 99,
            padding: "3px 12px", fontSize: 10, fontWeight: 700,
            boxShadow: "0 2px 8px rgba(247,147,79,0.4)",
          }}>⭐ Featured</div>
        )}

        {/* Color accent bar at bottom */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          height: 3,
          background: `linear-gradient(90deg, ${p.color}, ${p.color}88)`,
        }} />
      </div>

      {/* Card body */}
      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
          <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: c.text }}>{p.title}</h3>
          <div style={{ display: "flex", gap: 10, alignItems: "center", flexShrink: 0 }}>
            {p.github && p.github !== "#" && (
              <a href={p.github} target="_blank" rel="noopener noreferrer"
                style={{ color: c.muted, textDecoration: "none", transition: "color 0.2s", display: "flex", alignItems: "center" }}
                title="View on GitHub"
                onMouseEnter={e => e.currentTarget.style.color = c.text}
                onMouseLeave={e => e.currentTarget.style.color = c.muted}>
                <GitHubIcon size={18} color="currentColor" />
              </a>
            )}
          </div>
        </div>
        <div style={{ fontSize: 12, color: c.muted, marginBottom: 8 }}>📅 {p.period}</div>
        <p style={{ margin: "0 0 12px", fontSize: 13, color: c.muted, lineHeight: 1.6 }}>{p.desc}</p>
        <ul style={{ margin: "0 0 16px", paddingLeft: 0, flex: 1 }}>
          {p.bullets.map((b, i) => (
            <li key={i} style={{ fontSize: 13, color: c.text, marginBottom: 5, lineHeight: 1.6, listStyleType: "none", paddingLeft: 14, position: "relative" }}>
              <span style={{ position: "absolute", left: 0, color: p.color }}>•</span>
              {b}
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {p.tech.map(t => (
            <span key={t} style={{
              background: `${p.color}18`, color: p.color,
              border: `1px solid ${p.color}44`,
              padding: "3px 10px", borderRadius: 99, fontSize: 11, fontWeight: 600,
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [activeNav, setActiveNav] = useState("About");
  const [skillTab, setSkillTab] = useState("all");
  const [scrolled, setScrolled] = useState(false);
  const c = dark ? COLORS.dark : COLORS.light;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  const filteredSkills = skillTab === "all"
    ? [...skillsData.technical, ...skillsData.soft]
    : skillTab === "technical" ? skillsData.technical
    : skillsData.soft;

  return (
    <div style={{
      minHeight: "100vh", background: c.bg, color: c.text,
      fontFamily: "'Outfit', 'Segoe UI', sans-serif", transition: "background 0.4s, color 0.4s",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${c.border}; border-radius: 99px; }
        html { scroll-behavior: smooth; }
        a { color: inherit; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(32px); } to { opacity: 1; transform: none; } }
        @keyframes pulse-glow { 0%,100% { box-shadow: 0 0 0 0 ${c.accentGlow}; } 50% { box-shadow: 0 0 0 12px transparent; } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .fade-in { animation: fadeUp 0.7s cubic-bezier(.4,0,.2,1) both; }
        .section-heading { font-family: 'Syne', sans-serif; font-size: clamp(26px, 4vw, 38px); font-weight: 800; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? c.navBg : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${c.border}` : "none",
        transition: "all 0.4s",
        padding: "0 clamp(16px,4vw,80px)",
        display: "flex", alignItems: "center", height: 64,
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 22, color: c.accent, marginRight: "auto" }}>TN</span>
        <div style={{ display: "flex", gap: "clamp(12px,2vw,32px)", alignItems: "center" }}>
          {navLinks.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: activeNav === link ? c.accent : c.muted,
                fontWeight: activeNav === link ? 700 : 500,
                fontSize: 14, fontFamily: "inherit",
                borderBottom: activeNav === link ? `2px solid ${c.accent}` : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s",
              }}>
              {link}
            </button>
          ))}
          <button onClick={() => setDark(!dark)} style={{
            background: c.card, border: `1px solid ${c.border}`, borderRadius: 99,
            padding: "6px 14px", cursor: "pointer", fontSize: 14,
            color: c.text, fontFamily: "inherit", fontWeight: 500,
            transition: "all 0.2s",
          }}>{dark ? "☀ Light" : "🌙 Dark"}</button>
        </div>
      </nav>

      {/* HERO */}
      <section id="about" style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "80px clamp(16px,8vw,120px) 60px",
        background: dark
          ? `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(79,142,247,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 60% at 80% 80%, rgba(56,229,197,0.06) 0%, transparent 60%)`
          : `radial-gradient(ellipse 80% 60% at 60% 40%, rgba(37,99,235,0.07) 0%, transparent 60%)`,
        gap: "clamp(32px, 6vw, 80px)",
        flexWrap: "wrap",
      }}>
        {/* Avatar side */}
        <div className="fade-in" style={{ flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {/* Spinning ring */}
          <div style={{ position: "relative", width: 200, height: 200 }}>
            <div style={{
              position: "absolute", inset: -6,
              borderRadius: "50%",
              background: `conic-gradient(${c.accent}, ${c.accent2}, ${c.accent3}, ${c.accent})`,
              animation: "spin-slow 6s linear infinite",
              opacity: 0.7,
            }} />
            <div style={{
              position: "absolute", inset: -2, borderRadius: "50%",
              background: c.bg,
            }} />
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: `linear-gradient(135deg, ${c.accent}33, ${c.accent2}22)`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 80, border: `3px solid ${c.border}`,
              overflow: "hidden",
            }}>
              👩‍💻
            </div>
          </div>
          {/* Quick stats */}
          <div style={{ display: "flex", gap: 16 }}>
            {[["5+", "Projects"], ["5+", "Certs"], ["8.43", "CGPA"]].map(([v, l]) => (
              <div key={l} style={{
                textAlign: "center", background: c.card, border: `1px solid ${c.border}`,
                borderRadius: 12, padding: "10px 16px",
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: c.accent }}>{v}</div>
                <div style={{ fontSize: 11, color: c.muted }}>{l}</div>
              </div>
            ))}
          </div>
          {/* Social links */}
          <div style={{ display: "flex", gap: 12 }}>
            {[
              { icon: "in", href: "http://www.linkedin.com/in/trishya-nigam", label: "LinkedIn" },
              { icon: <GitHubIcon size={16} color="currentColor" />, href: "https://github.com/trishyanigam", label: "GitHub" },
              { icon: "✉", href: "mailto:trishyanigam@gmail.com", label: "Email" },
              { icon: "☎", href: "tel:+918881889377", label: "Phone" },
            ].map(s => (
              <a key={s.label} href={s.href} title={s.label} style={{
                width: 40, height: 40, borderRadius: 10,
                background: c.card, border: `1px solid ${c.border}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 16, textDecoration: "none", color: c.muted,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.color = c.accent; e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = c.muted; e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Text side */}
        <div className="fade-in" style={{ flex: 1, minWidth: 280, animationDelay: "0.15s" }}>
          <div style={{ fontSize: 14, color: c.accent, fontWeight: 600, marginBottom: 10, letterSpacing: 2 }}>
            ✦ WELCOME TO MY PORTFOLIO
          </div>
          <h1 style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 900,
            fontSize: "clamp(36px,6vw,68px)", lineHeight: 1.05,
            marginBottom: 8, color: c.text,
          }}>Trishya<br />
            <span style={{ color: c.accent }}>Nigam</span>
          </h1>
          <div style={{
            fontSize: "clamp(16px,2vw,22px)", fontWeight: 600, color: c.accent2,
            marginBottom: 20,
          }}>Full Stack Developer</div>
          <p style={{
            fontSize: "clamp(14px,1.4vw,16px)", color: c.muted, lineHeight: 1.8,
            maxWidth: 540, marginBottom: 32,
          }}>
            Passionate Full-Stack Developer specializing in MERN Stack development, building scalable
            and production-ready web applications. Strong foundation in DSA with hands-on experience
            in Generative AI integration and cloud technologies.
          </p>

          {/* Quick Links */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 28 }}>
            {[
              { label: "📁 Projects", id: "projects" },
              { label: "🛠 Skills", id: "skills" },
              { label: "🎓 Education", id: "education" },
              { label: "📜 Certifications", id: "training" },
            ].map(q => (
              <button key={q.label} onClick={() => scrollTo(q.id.charAt(0).toUpperCase() + q.id.slice(1))}
                style={{
                  background: `${c.accent}18`, color: c.accent,
                  border: `1px solid ${c.accent}44`,
                  padding: "7px 16px", borderRadius: 99,
                  cursor: "pointer", fontSize: 13, fontWeight: 600,
                  fontFamily: "inherit", transition: "all 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = c.accent; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${c.accent}18`; e.currentTarget.style.color = c.accent; }}>
                {q.label}
              </button>
            ))}
          </div>

          {/* CTA buttons */}
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("Projects")} style={{
              background: c.accent, color: "#fff", border: "none",
              padding: "13px 28px", borderRadius: 12,
              cursor: "pointer", fontWeight: 700, fontSize: 15,
              fontFamily: "inherit", transition: "all 0.2s",
              boxShadow: `0 4px 20px ${c.accent}55`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 30px ${c.accent}77`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 4px 20px ${c.accent}55`; }}>
              View Projects →
            </button>
            <a href="/Trishya_Nigam_CV.pdf" download="Trishya_Nigam_CV.pdf"
              style={{
                background: "none", color: c.text,
                border: `1px solid ${c.border}`,
                padding: "13px 28px", borderRadius: 12,
                cursor: "pointer", fontWeight: 600, fontSize: 15,
                fontFamily: "inherit", transition: "all 0.2s",
                textDecoration: "none", display: "flex", alignItems: "center", gap: 8,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = c.accent; e.currentTarget.style.color = c.accent; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.text; }}>
              ⬇ Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT ME */}
      <section style={{ padding: "80px clamp(16px,8vw,120px)", background: dark ? c.surface : "#f8faff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ WHO I AM</div>
          <h2 className="section-heading" style={{ color: c.text, marginBottom: 10 }}>About Me</h2>
          <p style={{ color: c.muted, fontSize: 15, maxWidth: 520, margin: "0 auto" }}>
            A dedicated developer with a passion for creating impactful web solutions
          </p>
        </div>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {/* Professional Summary Card */}
          <div style={{
            background: c.card, border: `1px solid ${c.border}`,
            borderRadius: 20, padding: "32px 36px", marginBottom: 24,
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 18 }}>Professional Summary</h3>
            <p style={{ fontSize: 15, color: c.muted, lineHeight: 1.85, marginBottom: 14 }}>
              I'm a passionate Full-Stack Developer currently pursuing my Bachelor of Technology in Computer Science and Engineering at
              Lovely Professional University. With a strong foundation in the MERN stack and experience across multiple programming
              languages, I specialize in building scalable and user-friendly web applications.
            </p>
            <p style={{ fontSize: 15, color: c.muted, lineHeight: 1.85, marginBottom: 14 }}>
              My journey in software development has been marked by hands-on projects ranging from IP management platforms to
              AI-powered nutrition systems. I'm particularly interested in creating solutions that solve real-world problems and
              enhance user experiences.
            </p>
            <p style={{ fontSize: 15, color: c.muted, lineHeight: 1.85 }}>
              Beyond technical skills, I bring strong problem-solving abilities, effective communication, and a team-oriented
              mindset to every project. I'm always eager to learn new technologies and stay updated with industry trends.
            </p>
          </div>

          {/* Info Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            {[
              {
                icon: "🎓", label: "Education",
                title: "BTech in Computer Science",
                sub: "CGPA: 8.43",
                color: c.accent,
              },
              {
                icon: "📍", label: "Location",
                title: "Lucknow, Uttar Pradesh, India",
                sub: "Available for opportunities",
                color: c.accent2,
              },
              {
                icon: "⚡", label: "Specialization",
                title: "MERN Stack Development",
                sub: "Full-Stack Web Applications",
                color: c.accent3,
              },
              {
                icon: "💼", label: "Experience",
                title: "5+ Projects",
                sub: "5+ Certifications",
                color: "#c084fc",
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: c.card, border: `1px solid ${c.border}`,
                borderRadius: 16, padding: "20px 22px",
                display: "flex", alignItems: "center", gap: 16,
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "55"; e.currentTarget.style.boxShadow = `0 6px 20px ${item.color}18`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                  background: `${item.color}18`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, border: `1px solid ${item.color}28`,
                }}>
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: 12, color: c.muted, marginBottom: 4 }}>{item.label}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: c.text, marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: c.muted }}>{item.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px clamp(16px,8vw,120px)", background: dark ? c.bg : "#ffffff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ EXPERTISE</div>
          <h2 className="section-heading" style={{ color: c.text, marginBottom: 12 }}>Skills & Technologies</h2>
          <p style={{ color: c.muted, fontSize: 15, maxWidth: 480, margin: "0 auto" }}>
            A diverse toolkit built through real-world projects and continuous learning.
          </p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 44 }}>
          {[["all", "✦ All Skills"], ["technical", "⚙ Technical"], ["soft", "🤝 Soft Skills"]].map(([id, label]) => (
            <button key={id} onClick={() => setSkillTab(id)} style={{
              background: skillTab === id ? c.accent : "transparent",
              color: skillTab === id ? "#fff" : c.muted,
              border: `1.5px solid ${skillTab === id ? c.accent : c.border}`,
              padding: "10px 24px", borderRadius: 99,
              cursor: "pointer", fontSize: 13, fontWeight: 600,
              fontFamily: "inherit", transition: "all 0.22s",
              boxShadow: skillTab === id ? `0 4px 16px ${c.accent}44` : "none",
            }}>{label}</button>
          ))}
        </div>

        {/* When "all" tab: render grouped by category */}
        {skillTab === "all" ? (
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
            {/* Languages */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, flex: 1, background: c.border }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: c.muted, letterSpacing: 2, whiteSpace: "nowrap" }}>LANGUAGES</span>
                <div style={{ height: 1, flex: 1, background: c.border }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
                {skillsData.technical.filter(s => s.category === "Languages").map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} dark={dark} c={c} />
                ))}
              </div>
            </div>
            {/* Web Dev + Databases */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, flex: 1, background: c.border }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: c.muted, letterSpacing: 2, whiteSpace: "nowrap" }}>WEB DEVELOPMENT & DATABASES</span>
                <div style={{ height: 1, flex: 1, background: c.border }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
                {skillsData.technical.filter(s => s.category === "Web Dev" || s.category === "Databases").map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} dark={dark} c={c} />
                ))}
              </div>
            </div>
            {/* Tools + Soft */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ height: 1, flex: 1, background: c.border }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: c.muted, letterSpacing: 2, whiteSpace: "nowrap" }}>TOOLS & SOFT SKILLS</span>
                <div style={{ height: 1, flex: 1, background: c.border }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
                {[...skillsData.technical.filter(s => s.category === "Tools"), ...skillsData.soft].map((skill, i) => (
                  <SkillCard key={skill.name} skill={skill} index={i} dark={dark} c={c} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 14 }}>
            {filteredSkills.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} dark={dark} c={c} />
            ))}
          </div>
        )}
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "80px clamp(16px,8vw,120px)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ WORK</div>
          <h2 className="section-heading" style={{ color: c.text, marginBottom: 12 }}>Featured Projects</h2>
          <p style={{ color: c.muted, fontSize: 15 }}>Real-world applications built with modern technologies</p>
        </div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 24, maxWidth: 1200, margin: "0 auto",
        }}>
          {projects.map(p => <ProjectCard key={p.title} p={p} dark={dark} c={c} />)}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "80px clamp(16px,8vw,120px)", background: dark ? c.surface : "#f8faff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ ACADEMIA</div>
          <h2 className="section-heading" style={{ color: c.text }}>Education</h2>
        </div>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
          {[
            {
              degree: "B.Tech — Computer Science & Engineering",
              school: "Lovely Professional University, Punjab",
              period: "Since Aug 2023",
              detail: "CGPA: 8.43",
              icon: "🎓", color: c.accent,
            },
            {
              degree: "Intermediate (Class XII)",
              school: "City Montessori School, Lucknow",
              period: "Apr 2021 – Jun 2022",
              detail: "92%",
              icon: "📚", color: c.accent2,
            },
            {
              degree: "Matriculation (Class X)",
              school: "City Montessori School, Lucknow",
              period: "Apr 2019 – Jun 2020",
              detail: "91.33%",
              icon: "📖", color: c.accent3,
            },
          ].map((e, i) => (
            <div key={i}
              style={{
                background: c.card,
                border: `1px solid ${c.border}`,
                borderLeft: `4px solid ${e.color}`,
                borderRadius: 16,
                padding: "22px 28px",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 18,
                transition: "all 0.25s",
              }}
              onMouseEnter={ev => { ev.currentTarget.style.boxShadow = `0 8px 28px ${e.color}22`; ev.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={ev => { ev.currentTarget.style.boxShadow = "none"; ev.currentTarget.style.transform = "none"; }}
            >
              {/* Icon */}
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `${e.color}18`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, border: `1px solid ${e.color}33`,
              }}>
                {e.icon}
              </div>
              {/* Middle: degree + school */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15, color: c.text, marginBottom: 4, lineHeight: 1.4 }}>
                  {e.degree}
                </div>
                <div style={{ fontSize: 13, color: c.muted }}>{e.school}</div>
              </div>
              {/* Right: period + result */}
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{
                  display: "inline-block", fontSize: 11, color: c.muted,
                  background: dark ? "#ffffff0d" : "#0000000a",
                  border: `1px solid ${c.border}`, borderRadius: 99,
                  padding: "3px 10px", marginBottom: 8,
                }}>
                  {e.period}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: e.color }}>{e.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRAINING + CERTIFICATIONS */}
      <section id="training" style={{ padding: "80px clamp(16px,8vw,120px)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ GROWTH</div>
          <h2 className="section-heading" style={{ color: c.text, marginBottom: 6 }}>Training & Certifications</h2>
          <p style={{ color: c.muted, fontSize: 15 }}>Continuous learning and professional development</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, maxWidth: 1200, margin: "0 auto" }}>
          {/* Professional Training */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>📘</span> Professional Training
            </h3>
            {training.map((t, i) => (
              <div key={i} style={{
                background: c.card, border: `1px solid ${c.border}`, borderRadius: 16, padding: "22px 24px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: c.text, flex: 1 }}>{t.title}</div>
                  <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                    <a href={t.preview} style={{
                      color: c.accent, background: `${c.accent}15`, borderRadius: 8,
                      padding: "4px 10px", fontSize: 12, fontWeight: 600, textDecoration: "none",
                    }}>👁 Preview</a>
                    <a href={t.download} download style={{
                      color: c.accent2, background: `${c.accent2}15`, borderRadius: 8,
                      padding: "4px 10px", fontSize: 12, fontWeight: 600, textDecoration: "none",
                    }}>⬇ Download</a>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: c.muted, marginBottom: 10 }}>{t.provider}</div>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  background: `${c.accent}18`, color: c.accent,
                  border: `1px solid ${c.accent}33`, borderRadius: 99, padding: "4px 12px",
                  fontSize: 12, fontWeight: 600, marginBottom: 14,
                }}>📅 {t.period}</div>
                <ul style={{ margin: 0, paddingLeft: 0 }}>
                  {t.bullets.map((b, j) => (
                    <li key={j} style={{ fontSize: 13, color: c.text, marginBottom: 6, lineHeight: 1.6, listStyleType: "none", paddingLeft: 14, position: "relative" }}>
                      <span style={{ position: "absolute", left: 0, color: c.accent }}>•</span>{b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {/* Certifications */}
          <div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: c.text, marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22 }}>🏅</span> Certifications
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  background: c.card, border: `1px solid ${c.border}`, borderRadius: 14,
                  padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = cert.color + "55"; e.currentTarget.style.boxShadow = `0 4px 16px ${cert.color}18`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ flex: 1, paddingRight: 12 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: c.text, marginBottom: 3 }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: c.muted }}>{cert.issuer}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flexShrink: 0 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: cert.color }}>{cert.date}</div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <a href={cert.preview} style={{
                        color: c.accent, fontSize: 14, background: `${c.accent}15`, padding: "3px 8px",
                        borderRadius: 6, textDecoration: "none",
                      }} title="Preview">👁</a>
                      <a href={cert.download} download style={{
                        color: c.accent2, fontSize: 14, background: `${c.accent2}15`, padding: "3px 8px",
                        borderRadius: 6, textDecoration: "none",
                      }} title="Download">⬇</a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" style={{ padding: "80px clamp(16px,8vw,120px)", background: dark ? c.surface : "#f8faff" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ MILESTONES</div>
          <h2 className="section-heading" style={{ color: c.text }}>Achievements</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
          {achievements.map((a, i) => (
            <div key={i} style={{
              background: c.card, border: `1px solid ${c.border}`, borderRadius: 18,
              padding: "28px 24px", transition: "all 0.3s",
              borderLeft: `4px solid ${a.color}`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 32px ${a.color}22`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{a.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: c.text, marginBottom: 8 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: a.color, fontWeight: 700, marginBottom: 10 }}>{a.date}</div>
              <p style={{ fontSize: 13, color: c.muted, lineHeight: 1.7 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px clamp(16px,8vw,120px)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 13, color: c.accent, fontWeight: 600, letterSpacing: 2, marginBottom: 8 }}>✦ LET'S CONNECT</div>
          <h2 className="section-heading" style={{ color: c.text, marginBottom: 12 }}>Get In Touch</h2>
          <p style={{ color: c.muted, fontSize: 15 }}>Open for opportunities, collaborations, and conversations</p>
        </div>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
            {[
              { icon: "✉", label: "Email", value: "trishyanigam@gmail.com", href: "mailto:trishyanigam@gmail.com", color: c.accent },
              { icon: "☎", label: "Phone", value: "+91-8881889377", href: "tel:+918881889377", color: c.accent2 },
              { icon: "in", label: "LinkedIn", value: "trishya-nigam", href: "http://www.linkedin.com/in/trishya-nigam", color: "#0a66c2" },
              { icon: <GitHubIcon size={20} color="currentColor" />, label: "GitHub", value: "trishyanigam", href: "https://github.com/trishyanigam", color: c.accent3 },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{
                background: c.card, border: `1px solid ${c.border}`, borderRadius: 16,
                padding: "20px 22px", textDecoration: "none",
                display: "flex", alignItems: "center", gap: 14,
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = item.color + "66"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}20`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${item.color}18`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, color: item.color,
                  flexShrink: 0, border: `1px solid ${item.color}33`,
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: 11, color: c.muted, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: c.text }}>{item.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${c.border}`, padding: "24px clamp(16px,8vw,120px)",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        background: dark ? c.surface : "#f0f4ff",
      }}>
        <span style={{ fontSize: 13, color: c.muted }}>© 2025 Trishya Nigam. Built with ❤️</span>
        <span style={{ fontSize: 13, color: c.muted }}>Full Stack Developer · LPU Punjab</span>
      </footer>
    </div>
  );
}