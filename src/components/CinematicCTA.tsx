"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function CinematicCTA() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <section ref={container} className="relative w-full h-screen bg-[#090909] flex flex-col items-center justify-center overflow-hidden">
      
      {/* Sharp spotlight lighting effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[80vh] bg-[conic-gradient(from_180deg_at_50%_0%,rgba(217,217,217,0)_0deg,rgba(217,217,217,0.05)_180deg,rgba(217,217,217,0)_360deg)] opacity-70 mix-blend-screen pointer-events-none" />
      
      {/* Fog effect overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent z-10" />

      <motion.div 
        style={{ opacity, y }}
        className="relative z-20 flex flex-col items-center text-center px-4"
      >
        <h2 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-[#F5F5F5] mb-6 drop-shadow-2xl">
          Open Something <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#D9D9D9] to-[#111111] text-glow-silver">Iconic.</span>
        </h2>
        
        <p className="font-sans text-xl text-[#D9D9D9]/80 font-light max-w-md mb-12">
          Experience the cold rush of modern refreshment.
        </p>

        <div className="relative group">
          {/* Red pulse glow behind button */}
          <div className="absolute inset-0 bg-[#E61B23] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
          
          <button className="relative glass-panel px-10 py-5 rounded-full font-sans font-semibold text-[#F5F5F5] uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all duration-500 overflow-hidden border border-[#D9D9D9]/30 hover:border-white group-hover:shadow-[0_0_40px_rgba(230,27,35,0.4)]">
            <span className="relative z-10">Drink The Experience</span>
            
            {/* Button metallic shine */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </button>
        </div>
      </motion.div>
      
      {/* Global footer branding */}
      <div className="absolute bottom-8 z-20 text-[#D9D9D9]/40 font-sans text-xs tracking-widest uppercase">
        Diet Coke © {new Date().getFullYear()}
      </div>
    </section>
  );
}
