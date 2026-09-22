import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Braces, ChevronRight, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Sparkles, X } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState, type MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import portraitAsset from "@/assets/karthik-portrait.png.asset.json";

const HeroScene = lazy(() => import("@/components/hero-scene").then((module) => ({ default: module.HeroScene })));

const navItems = ["About", "Experience", "Projects", "Skills", "Contact"];
const experiences = [
  { role: "Full Stack Developer", org: "TestLoop — Testing Platform", detail: "Built a testers marketplace with app assets, MCP, XP levels, streaks, rewards, credits, feedback flows, image uploads, and real-time updates.", tech: ["React", "Supabase", "Realtime", "Storage"] },
  { role: "Web Developer", org: "Personal Projects", detail: "Created full stack web platforms with authentication, real-time updates, file uploads, and deployments across modern cloud platforms.", tech: ["React.js", "Node.js", "Express.js", "MongoDB"] },
  { role: "Infosys InStep Intern", org: "Infosys Springboard", detail: "Completed Internship 6.0 (B1): Development of an AI-Based Music Composition System from August 6, 2025 to October 10, 2025. Certificate issued November 27, 2025.", tech: ["Infosys", "Infosys Springboard", "AI", "Music Composition"] },
  { role: "Contributor · Internship Experience", org: "Open Source — MalariaGEN, Django", detail: "Fixed bugs, improved data processing, implemented test cases, and contributed through established project guidelines and collaborative Git workflows.", tech: ["Python", "Django", "Testing", "Git/GitHub"] },
];
const projects = [
  { title: "Human Resource Management", code: "HRMS", summary: "An operational system for employee records, attendance, leave management, and payroll.", detail: "A full employee operations platform covering the essential HR lifecycle: structured employee records, daily attendance, leave workflows, and payroll administration.", tech: ["Python", "Flask", "MySQL"] },
  { title: "Smart Task Manager", code: "STM", summary: "A responsive task system with authentication, prioritization, and live updates.", detail: "A modern productivity platform designed around secure accounts, changing task priorities, and real-time state updates across the application.", tech: ["React.js", "Node.js", "Authentication"] },
  { title: "School Management System", code: "SMS", summary: "A connected academic system for people, subjects, attendance, and results.", detail: "A structured school administration platform for managing students, teachers, subjects, attendance records, and academic results.", tech: ["PHP", "MySQL", "JavaScript"] },
  { title: "Crop Tracking Dashboard", code: "IOT", summary: "A hackathon dashboard for live temperature, humidity, and crop monitoring.", detail: "A real-time crop monitoring dashboard that receives environmental readings from Arduino and DHT11 hardware and turns them into clear visual trends.", tech: ["Arduino", "DHT11", "PHP", "Chart.js"] },
];
const skills = ["React.js", "Next.js", "JavaScript", "Node.js", "Express.js", "Python", "REST APIs", "JWT Auth", "MongoDB", "SQL", "Firebase", "Supabase", "Tailwind CSS", "Git", "Vite", "Postman", "CI/CD"];

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Karthik — Full Stack & Creative Developer" },
    { name: "description", content: "Karthik builds scalable full stack applications, responsive interfaces, real-time platforms, and cloud-ready digital products." },
    { property: "og:title", content: "Karthik — Full Stack & Creative Developer" },
    { property: "og:description", content: "Explore Karthik's full stack projects, open-source experience, and modern development toolkit." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Portfolio,
});

function Portfolio() {
  const reducedMotion = useReducedMotion() ?? false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  useEffect(() => { const timer = window.setTimeout(() => setLoaded(true), 450); return () => window.clearTimeout(timer); }, []);

  return <div className="min-h-screen bg-background text-foreground lab-grid">
    <motion.div className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-primary" style={{ scaleX }} />
    <AnimatePresence>{!loaded && <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[80] grid place-items-center bg-background"><div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Initializing portfolio<span className="animate-pulse">_</span></div></motion.div>}</AnimatePresence>
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between rounded-lg border border-border bg-surface/80 px-4 shadow-2xl backdrop-blur-xl" aria-label="Main navigation">
        <a href="#top" className="font-mono text-sm font-medium text-foreground"><span className="text-primary">&lt;</span>KARTHIK<span className="text-primary">/&gt;</span></a>
        <div className="hidden items-center gap-7 md:flex">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="text-xs font-medium text-muted-foreground transition-colors hover:text-primary">{item}</a>)}</div>
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Close menu" : "Open menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
      </nav>
      <AnimatePresence>{menuOpen && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mx-auto mt-2 max-w-6xl rounded-lg border border-border bg-popover p-3 shadow-2xl md:hidden">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)} className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{item}<ChevronRight className="size-4" /></a>)}</motion.div>}</AnimatePresence>
    </header>

    <main id="top">
      <section className="relative flex min-h-[94svh] items-center overflow-hidden border-b border-border pt-24">
        <div className="absolute inset-0 opacity-80"><ClientOnly fallback={<div className="h-full w-full" />}><Suspense fallback={null}><HeroScene reducedMotion={reducedMotion} /></Suspense></ClientOnly></div>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,var(--background)_10%,transparent_65%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.25fr_.75fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={loaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: reducedMotion ? 0 : 0.7 }}>
            <div className="mb-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary"><span className="size-1.5 rounded-full bg-primary shadow-[var(--shadow-glow)]" />Full Stack / Creative Developer</div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.03] tracking-normal sm:text-6xl lg:text-7xl">Building digital products that <span className="text-sheen">solve real problems.</span></h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">Creative developer focused on scalable web applications, robust backend systems, responsive interfaces, and thoughtful product experiences.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild variant="hero" size="lg"><a href="#projects">View Projects <ArrowDown /></a></Button><Button asChild variant="glass" size="lg"><a href="#contact">Contact Me <ArrowUpRight /></a></Button></div>
            <div className="mt-12 flex items-center gap-6 font-mono text-[11px] uppercase text-muted-foreground"><span>Based in India</span><span className="h-px w-10 bg-border"/><span>Available for opportunities</span></div>
          </motion.div>
          <Portrait />
        </div>
      </section>

      <Section id="about" number="01" label="Profile">
        <div className="grid gap-12 lg:grid-cols-2"><div><h2 className="text-3xl font-semibold sm:text-5xl">Engineering with a creative edge.</h2><p className="mt-6 max-w-xl leading-7 text-muted-foreground">I combine full stack engineering with product-minded design to build reliable web applications. My work spans REST APIs, databases, authentication, real-time systems, file handling, and responsive user interfaces.</p></div><div className="border-l border-border pl-6 sm:pl-10"><GraduationCap className="mb-6 size-8 text-primary"/><p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Education</p><h3 className="mt-3 text-xl font-semibold">B.E. Computer Science and Engineering</h3><p className="mt-2 text-muted-foreground">PSV College of Engineering and Technology</p><p className="mt-6 font-mono text-sm text-foreground">CGPA <span className="text-primary">7.8</span></p></div></div>
      </Section>

      <Section id="experience" number="02" label="Experience"><h2 className="mb-12 text-3xl font-semibold sm:text-5xl">Where I’ve built and contributed.</h2><div className="border-t border-border">{experiences.map((item, i) => <ExperienceItem key={item.role} item={item} index={i} />)}</div></Section>
      <Section id="projects" number="03" label="Selected work"><div className="mb-12 flex flex-wrap items-end justify-between gap-4"><h2 className="text-3xl font-semibold sm:text-5xl">Systems built to be used.</h2><p className="font-mono text-xs text-muted-foreground">04 PROJECTS / DETAILS INSIDE</p></div><div className="grid gap-4 md:grid-cols-2">{projects.map((project, i) => <ProjectCard key={project.title} project={project} index={i} reducedMotion={reducedMotion} />)}</div></Section>
      <Section id="skills" number="04" label="Capabilities"><div className="grid items-center gap-12 lg:grid-cols-[.7fr_1.3fr]"><div><h2 className="text-3xl font-semibold sm:text-5xl">A connected toolkit.</h2><p className="mt-5 leading-7 text-muted-foreground">From interface to infrastructure, each technology supports a practical role in building complete, maintainable products.</p></div><SkillsConstellation reducedMotion={reducedMotion}/></div></Section>
      <Section id="contact" number="05" label="Contact"><div><h2 className="text-3xl font-semibold sm:text-5xl">Let’s build something useful.</h2><p className="mt-5 leading-7 text-muted-foreground">Have a product idea, role, or open-source project in mind? Reach out directly.</p><div className="mt-8 space-y-3"><ContactRow icon={<Mail/>} label="Email"/><ContactRow icon={<Github/>} label="GitHub"/><ContactRow icon={<Linkedin/>} label="LinkedIn"/></div></div></Section>
    </main>
    <footer className="border-t border-border bg-background"><div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><span>© 2026 Karthik. Built with intention.</span><span className="font-mono">FULL STACK / CREATIVE DEVELOPMENT</span></div></footer>
  </div>;
}

function Section({ id, number, label, children }: { id: string; number: string; label: string; children: React.ReactNode }) { return <motion.section id={id} className="scroll-mt-24 border-b border-border bg-background/85 py-24 backdrop-blur-sm sm:py-32" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}><div className="mx-auto max-w-6xl px-5"><div className="mb-12 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground"><span className="text-primary">{number}</span><span className="h-px w-8 bg-border"/>{label}</div>{children}</div></motion.section>; }

function Portrait() { const portraitUrl = portraitAsset.url; return <motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .25 }} className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md border border-border bg-surface shadow-2xl"><div className="absolute inset-3 border border-border"/><img src={portraitUrl} alt="Portrait of Karthik" className="h-full w-full object-cover object-center"/><div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-md border border-border bg-surface/85 px-4 py-3 backdrop-blur-xl"><span className="font-mono text-xs">KARTHIK.DEV</span><span className="flex items-center gap-2 text-[10px] uppercase text-primary"><span className="size-1.5 animate-pulse rounded-full bg-primary"/>Online</span></div></motion.div>; }

function ExperienceItem({ item, index }: { item: typeof experiences[number]; index: number }) { const [open, setOpen] = useState(index === 0); return <article className="border-b border-border"><button className="grid w-full gap-4 py-6 text-left sm:grid-cols-[3rem_1fr_auto] sm:items-center" onClick={() => setOpen(!open)} aria-expanded={open}><span className="font-mono text-xs text-primary">0{index + 1}</span><span><strong className="block font-semibold">{item.role}</strong><span className="mt-1 block text-sm text-muted-foreground">{item.org}</span></span><ChevronRight className={`size-5 text-muted-foreground transition-transform ${open ? "rotate-90" : ""}`}/></button><AnimatePresence initial={false}>{open && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden"><div className="pb-7 sm:pl-[4rem]"><p className="max-w-3xl leading-7 text-muted-foreground">{item.detail}</p><div className="mt-4 flex flex-wrap gap-2">{item.tech.map(t => <Tag key={t}>{t}</Tag>)}</div></div></motion.div>}</AnimatePresence></article>; }

function ProjectCard({ project, index, reducedMotion }: { project: typeof projects[number]; index: number; reducedMotion: boolean }) { const ref = useRef<HTMLDivElement>(null); const move = (event: MouseEvent<HTMLDivElement>) => { if (reducedMotion || !ref.current) return; const box = ref.current.getBoundingClientRect(); ref.current.style.transform = `perspective(900px) rotateX(${((event.clientY-box.top)/box.height-.5)*-5}deg) rotateY(${((event.clientX-box.left)/box.width-.5)*7}deg)`; }; return <Dialog><motion.div ref={ref} onMouseMove={move} onMouseLeave={() => { if(ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; }} className="group border border-border bg-card p-6 transition-[transform,border-color,background-color] duration-200 hover:border-primary/50 hover:bg-surface-strong sm:p-8"><div className="mb-12 flex items-start justify-between"><span className="font-mono text-xs text-muted-foreground">0{index+1} / {project.code}</span><Layers3 className="size-5 text-primary"/></div><h3 className="text-2xl font-semibold">{project.title}</h3><p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">{project.summary}</p><div className="mt-6 flex flex-wrap gap-2">{project.tech.map(t => <Tag key={t}>{t}</Tag>)}</div><DialogTrigger asChild><Button variant="ghost" className="mt-7 px-0 text-primary">View details <ArrowUpRight/></Button></DialogTrigger></motion.div><DialogContent className="border-border bg-popover"><DialogHeader><div className="mb-4 font-mono text-xs text-primary">PROJECT / {project.code}</div><DialogTitle className="text-2xl">{project.title}</DialogTitle><DialogDescription className="pt-3 leading-6">{project.detail}</DialogDescription></DialogHeader><div className="flex flex-wrap gap-2">{project.tech.map(t => <Tag key={t}>{t}</Tag>)}</div></DialogContent></Dialog>; }

function Tag({ children }: { children: React.ReactNode }) { return <span className="rounded-sm border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[10px] uppercase text-muted-foreground">{children}</span>; }

function SkillsConstellation({ reducedMotion }: { reducedMotion: boolean }) { return <div className="relative min-h-[480px] overflow-hidden rounded-md border border-border bg-card p-5"><div className="absolute left-1/2 top-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-accent shadow-[var(--shadow-glow)]"/><div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center text-center font-mono text-xs text-primary"><Braces className="mb-1 size-5"/>FULL<br/>STACK</div>{skills.map((skill, i) => { const angle=(i/skills.length)*Math.PI*2; const radius=i%2===0?37:45; return <motion.span key={skill} className="absolute rounded-sm border border-border bg-surface px-2 py-1.5 font-mono text-[10px] text-muted-foreground hover:border-primary hover:text-primary" style={{ left:`${50+Math.cos(angle)*radius}%`, top:`${50+Math.sin(angle)*radius}%`, transform:"translate(-50%, -50%)" }} animate={reducedMotion ? {} : { y:[0, i%2?4:-4, 0] }} transition={{ duration:3+i%4, repeat:Infinity, ease:"easeInOut" }}>{skill}</motion.span>; })}</div>; }

function ContactRow({ icon, label }: { icon: React.ReactNode; label: string }) {
  const contacts: Record<string, string> = {
    Email: "mailto:karthik642006@gmail.com",
    GitHub: "https://github.com/karthik642006",
    LinkedIn: "https://www.linkedin.com/in/karthik-k-224372434",
  };
  const href = contacts[label];
  return <a href={href} target={label === "Email" ? undefined : "_blank"} rel={label === "Email" ? undefined : "noreferrer"} className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary">
    <span className="grid size-9 place-items-center rounded-md border border-border bg-surface [&_svg]:size-4">{icon}</span>
    <span>{label}</span>
    <span className="ml-auto font-mono text-[10px] uppercase text-primary">{label === "Email" ? "karthik642006@gmail.com" : "Open ↗"}</span>
  </a>;
}
