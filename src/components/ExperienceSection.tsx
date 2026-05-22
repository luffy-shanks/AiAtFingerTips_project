"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const keywords = ["CRISP", "COLD", "SHARP", "CLEAN", "REFRESHING", "ENERGETIC"];

export default function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={containerRef} className="relative py-40 w-full bg-[#090909] overflow-hidden">
      {/* Background cinematic visuals */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 -left-1/4 w-[50vw] h-[50vw] bg-[#E61B23] blur-[150px] mix-blend-screen rounded-full" />
        <div className="absolute bottom-1/4 -right-1/4 w-[60vw] h-[60vw] bg-[#D9D9D9] blur-[120px] mix-blend-screen rounded-full opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center space-y-4 md:space-y-8">
        {keywords.map((word, index) => {
          // Staggered scroll transformations
          const isEven = index % 2 === 0;
          const startX = isEven ? "-20%" : "20%";
          const endX = isEven ? "5%" : "-5%";
          
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const x = useTransform(scrollYProgress, [0, 1], [startX, endX]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);

          return (
            <motion.div
              key={word}
              style={{ x, opacity, scale }}
              className="w-full text-center mix-blend-difference"
            >
              <h3 className={`font-display font-black text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] uppercase tracking-tighter leading-none ${
                word === "COLD" || word === "ENERGETIC" ? "text-transparent bg-clip-text bg-gradient-to-r from-[#D9D9D9] to-[#F5F5F5] text-glow-silver" 
                : word === "SHARP" ? "text-[#E61B23] text-glow" 
                : "text-[#1C1C1C] drop-shadow-[0_0_1px_rgba(255,255,255,0.3)]"
              }`}>
                {word}
              </h3>
            </motion.div>
          );
        })}
      </div>
      
      {/* Vapor/smoke overlay simulation */}
      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </section>
  );
}
