// import type { Metadata } from "next";
// import { Bebas_Neue } from "next/font/google";
// import { SmoothCursor } from "@/components/ui/smooth-cursor"; 
// import "./globals.css";

// const bebas = Bebas_Neue({
//   weight: "400",
//   subsets: ["latin"],
//   variable: "--font-bebas",
// });

// export const metadata: Metadata = {
//   title: "Portfolio",
//   description: "My Portfolio",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={bebas.variable}>
//       <body className="antialiased relative bg-[#F7F4FF]">
        
//         {/* MAIN WEBSITE CONTENT */}
//         <div className="relative z-10">
//           {children}
//         </div>

//         {/* GLOBAL SMOOTH CURSOR */}
//         <SmoothCursor />
        
//       </body>
//     </html>
//   );
// }
"use client";

import { useState, useEffect, useRef } from "react";
import { Bebas_Neue } from "next/font/google";
import { IconCloud } from "@/components/ui/icon-cloud";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { motion, AnimatePresence } from "framer-motion";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const slugs = [
  "typescript", "javascript",  "react", 
  "android", "html5", "css3", "nodedotjs", "express", "nextdotjs",
  "prisma", "amazonaws", "postgresql", "firebase", "nginx", "vercel",
  "testinglibrary", "cypress", "docker", "git", "jira",
  "github", "gitlab", "visualstudiocode", "androidstudio",  "figma",
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [phase, setPhase] = useState<"spinning" | "exploding" | "done">("spinning");
  const cloudRef = useRef<HTMLDivElement>(null);

  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`
  );

  useEffect(() => {
    // Phase 1: Spin normally for 1.5 seconds
    const spinTimer = setTimeout(() => {
      setPhase("exploding");

      // Phase 2: Grab all individual icon images and throw them randomly
      if (cloudRef.current) {
        const icons = cloudRef.current.querySelectorAll("img");
        
        icons.forEach((icon) => {
          // Calculate a random point far away from the center
          const randomX = (Math.random() - 0.5) * 2000; // -1000px to 1000px
          const randomY = (Math.random() - 0.5) * 2000;
          const randomRotation = (Math.random() - 0.5) * 1080; // spin randomly
          
          // Apply the explosion transform
          (icon as HTMLElement).style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(0.5)`;
          (icon as HTMLElement).style.opacity = "0";
          (icon as HTMLElement).style.transition = "transform 1.2s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 1.2s ease-out";
        });
      }

      // Phase 3: Hide loading screen completely after explosion finishes
      const doneTimer = setTimeout(() => {
        setPhase("done");
      }, 1400); // 1.4 seconds for the explosion to finish

      return () => {
        clearTimeout(doneTimer);
      };
    }, 1500); // 1.5 seconds of spinning

    return () => clearTimeout(spinTimer);
  }, []);

  return (
   <html lang="en" className={bebas.variable}>
  <body className="antialiased bg-black overflow-x-hidden">

    {/* FULL SCREEN LOADING ANIMATION */}
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.8,
              ease: "easeInOut",
            },
          }}
          style={{ pointerEvents: "auto" }}
        >
          {/* Cloud */}
          <div
            ref={cloudRef}
            className={`transition-all duration-1000 ease-out ${
              phase === "exploding"
                ? "scale-[3] blur-sm opacity-50"
                : "scale-100 opacity-100"
            }`}
          >
            <IconCloud images={images} />
          </div>

          <h2
            className={`absolute mt-[420px] font-[family-name:var(--font-bebas)] text-3xl md:text-5xl tracking-widest text-white transition-all duration-1000 ${
              phase === "exploding"
                ? "opacity-0 scale-110 blur-sm"
                : "opacity-100"
            }`}
          >
            SANKALP HARDIYA
          </h2>
        </motion.div>
      )}
    </AnimatePresence>

    {/* WEBSITE */}
    <motion.main
      initial={{ opacity: 0 }}
      animate={{
        opacity: phase === "done" ? 1 : 0,
      }}
      transition={{
        duration: 0.8,
      }}
      className="relative min-h-screen"
    >
      {children}
    </motion.main>

    {/* Cursor only on desktop */}
    <div className="hidden md:block">
      <SmoothCursor />
    </div>

  </body>
</html>
  );
}