 "use client";

// import { useEffect, useState, useRef } from "react";
// import { DitherShader } from "@/components/ui/dither-shader";
// import Lenis from "lenis";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import AboutSection from "@/app/about/page"; 
// import { Marquee } from "@/components/ui/marquee";
// import PortfolioSection from "@/app/portfolio/page";
// import Switch from "@/components/Switch"; 

// gsap.registerPlugin(ScrollTrigger);

// import {
//   FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaGitAlt, FaGithub,
// } from "react-icons/fa";

// import {
//   SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, SiExpress,
//   SiCplusplus, SiFramer, SiRedux, SiTypescript,
// } from "react-icons/si";

// // --- SCRAMBLE TEXT COMPONENT ---
// function ScrambleText({ children, className, onDone }) {
//   const ref = useRef(null);
//   const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
import { useEffect, useState, useRef, ReactNode } from "react";
import { DitherShader } from "@/components/ui/dither-shader";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "@/app/about/page"; 
import { Marquee } from "@/components/ui/marquee";
import PortfolioSection from "@/app/portfolio/page";
import Switch from "@/components/Switch"; 

gsap.registerPlugin(ScrollTrigger);

import {
  FaReact, FaHtml5, FaCss3Alt, FaJsSquare, FaPython, FaGitAlt, FaGithub,
} from "react-icons/fa";

import {
  SiNextdotjs, SiTailwindcss, SiMongodb, SiMysql, SiExpress,
  SiCplusplus, SiFramer, SiRedux, SiTypescript,
} from "react-icons/si";

// --- SCRAMBLE TEXT COMPONENT ---
interface ScrambleTextProps {
  children: ReactNode;
  className?: string;
  onDone?: () => void;
}

function ScrambleText({ children, className, onDone }: ScrambleTextProps) {
  const ref = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
  useEffect(() => {
    const text = children || "";
    const node = ref.current;
    if (!node) return;

    const spans = text.split("").map((char) => {
      const span = document.createElement("span");
      span.textContent = "";
      span.style.display = "inline-block";
      node.appendChild(span);
      return { span, char };
    });

    const staggerDelay = 40;
    const scrambleDuration = 1500;
    const startTime = performance.now();

    function tick(now) {
      let allDone = true;
      spans.forEach(({ span, char }, i) => {
        const elapsed = now - startTime - i * staggerDelay;
        if (elapsed < 0) {
          span.textContent = "";
          allDone = false;
        } else if (elapsed < scrambleDuration) {
          span.textContent = chars[Math.floor(Math.random() * chars.length)];
          allDone = false;
        } else {
          span.textContent = char === " " ? "\u00A0" : char;
        }
      });

      if (!allDone) {
        requestAnimationFrame(tick);
      } else if (onDone) {
        onDone();
      }
    }

    requestAnimationFrame(tick);
    return () => {
      spans.forEach(({ span }) => span.remove());
    };
  }, [children, onDone]);

  return <span ref={ref} className={className} />;
}

// --- MAIN HOME PAGE ---
export default function Home() {
  const [time, setTime] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [isDark, setIsDark] = useState(false); 
  
  const scrollWrapperRef = useRef(null);
  const footerRef = useRef(null);

  // Apply .dark class to the <html> tag (Shadcn standard)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const techStack = [
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <FaHtml5 />, name: "HTML5" },
    { icon: <FaCss3Alt />, name: "CSS3" },
    { icon: <FaJsSquare />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiTailwindcss />, name: "tailwind" },
    { icon: <SiFramer />, name: "Framer Motion" },
    { icon: <SiRedux />, name: "Redux" },
    { icon: <SiExpress />, name: "Express" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <FaPython />, name: "Python" },
    { icon: <SiCplusplus />, name: "C++" },
    { icon: <FaGitAlt />, name: "Git" },
    {icon: <FaGithub />, name: "GitHub" },
  ];

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const timer = setTimeout(() => {
      if (scrollWrapperRef.current) {
        gsap.to(scrollWrapperRef.current, {
          y: -150,
          opacity: 0,
          scale: 0.95,
          ease: "none",
          scrollTrigger: {
            trigger: scrollWrapperRef.current,
            start: "top center",
            end: "bottom 20%",
            scrub: 1.5,
          },
        });
      }

      if (footerRef.current) {
        gsap.from(footerRef.current, {
          y: 100,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 98%",
            end: "top 70%",
            scrub: 1,
          },
        });
      }
    }, 1500);

    return () => {
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleScrambleDone = () => {
    setTimeout(() => setShowCard(true), 300);
  };

return (
  // Use Shadcn background and text classes
  <main className="min-h-screen flex flex-col gap-32 bg-background text-foreground transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-sm mt-6 flex items-center justify-between px-20 py-6 bg-background/90 border-b border-border transition-colors duration-300">
        <h1 className="text-4xl -ml-4 font-extrabold">
          AI Engineer
        </h1>
        <div className="flex items-center gap-8 text-xl">
          <span className="text-muted-foreground">Indore  {time}</span>
          <div className="w-4 h-4 rounded-full "></div>
          
          <Switch checked={isDark} onChange={() => setIsDark(!isDark)} />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 pb-16 pl-4 pr-4 pt-32">
        <div className="mx-auto max-w-[1600px] flex flex-col items-center">
          <div className="relative z-0">
            <h1 className="font-[family-name:var(--font-bebas)] text-[9rem] md:text-[13rem] font-normal leading-none tracking-tight text-center">
              <ScrambleText onDone={handleScrambleDone}>Sankalp Hardiya</ScrambleText>
            </h1>
          </div>

          <div ref={scrollWrapperRef} className="mt-8 w-full flex flex-col items-center">
            <div className={`transition-all duration-1000 ease-out ${showCard ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-12 scale-95"}`}>
              {/* Use bg-card and border-border here */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-2xl transition-colors duration-300">
                <DitherShader
                  src="/profile.jpg"
                  gridSize={1}
                  ditherMode="bayer"
                  colorMode="duotone"
                  primaryColor="#2C2930"
                  secondaryColor="#9D98A3"
                  threshold={0.45}
                  className="h-[450px] w-[400px] sm:h-[550px] sm:w-[550px] rounded-xl"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-black/60 backdrop-blur-md text-white p-4 rounded-lg border border-white/10">
                  <p className="text-sm font-bold tracking-widest uppercase text-neutral-300">Creative Developer</p>
                </div>
              </div>
            </div>

            <div className="mt-16 mb-8 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
              <span className="text-sm tracking-widest uppercase">Scroll</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
            </div>
          </div>
        </div>
      </section>
     
    {/* ABOUT SECTION */}
    <section className="py-40">
      <div className="flex flex-col items-center gap-6 mb-20">
        <p className="font-mono text-xs tracking-widest text-muted-foreground">WHO I AM</p>
        <h3 className="font-[family-name:var(--font-bebas)] text-5xl md:text-7xl leading-none tracking-wide text-center">ABOUT</h3>
      </div>
      <AboutSection />
    </section>

      {/* --- TECH STACK MARQUEE --- */}
      <section className="w-full pt-20 pb-20 overflow-hidden border-t border-b border-border bg-card transition-colors duration-300">
        <div className="flex flex-col items-center gap-6 mb-20">
          <p className="font-mono text-xs text-muted-foreground tracking-widest">WHAT I USE</p>
          <div className="flex items-center gap-6">
            <h3 className="font-[family-name:var(--font-bebas)] text-5xl md:text-7xl tracking-wide leading-none text-center">
              TECH STACK
            </h3>
          </div>
        </div>

        <Marquee pauseOnHover className="[--duration:35s]">
          {techStack.map((tech, index) => (
            <div 
              key={index} 
              className="flex items-center gap-4 mx-6 px-8 py-5 bg-background rounded-2xl border border-border shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <span className="text-7xl">
                {tech.icon}
              </span>
              <span className="font-[family-name:var(--font-bebas)] text-3xl tracking-wide whitespace-nowrap">
                {tech.name}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* PROJECTS SECTION */}
      <div>
        <PortfolioSection />
      </div>

      {/* --- DETAILED FOOTER --- */}
      <footer ref={footerRef} className="bg-[#111111] text-white px-8 md:px-20 py-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pb-16 border-b border-neutral-800">
            <div>
              <h2 className="font-[family-name:var(--font-bebas)] text-6xl md:text-8xl leading-none tracking-tight mb-6">
                LET&apos;S WORK<br/>TOGETHER.
              </h2>
              <p className="text-neutral-400 text-lg max-w-md leading-relaxed">
                Have a project in mind or just want to chat? Feel free to reach out. I am always open to discussing new projects, creative ideas, or opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 content-end">
              <div>
                <p className="font-mono text-xs text-neutral-500 mb-3 tracking-widest">EMAIL</p>
                <a href="mailto:your@email.com" className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide hover:text-neutral-300 transition-colors">
                  sankalphardiya18@gmail.com  
                </a>
              </div>
              <div>
                <p className="font-mono text-xs text-neutral-500 mb-3 tracking-widest">PHONE</p>
                <a href="tel:+919876543210" className="font-[family-name:var(--font-bebas)] text-4xl tracking-wide hover:text-neutral-300 transition-colors">
                  (+91) 8269424546
                </a>
              </div>
            </div>
          </div>

          <div className="pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <span className="font-[family-name:var(--font-bebas)] text-2xl tracking-wider">SANKALP HARDIYA</span>
              <span className="text-neutral-600">|</span>
              <span className="text-neutral-500 text-sm font-mono">AI DESIGN ENGINEER</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-neutral-500 font-mono">
              <span>INDORE, INDIA</span>
              <span className="text-neutral-700">●</span>
              <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
// original