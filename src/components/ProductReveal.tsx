"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Can3D from "./Can3D";

export default function ProductReveal() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  // Scroll parallax for the whole section
  const sectionY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Mouse interaction state (used just for background spotlight)
  const [isHovered, setIsHovered] = useState(false);

  // Particles generation
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; scale: number; delay: number }[]>([]);
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <section 
      ref={container} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative min-h-[120vh] w-full bg-[#090909] flex flex-col items-center justify-center overflow-hidden py-32 perspective-1000"
    >
      {/* 1. Background Enhancements */}
      {/* Deep red radial ambient glow */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.6 : 0.3,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] bg-[radial-gradient(circle,_#2A0006_0%,_transparent_70%)] pointer-events-none z-0" 
      />
      
      {/* Soft moving light gradients */}
      <motion.div 
        animate={{ 
          opacity: isHovered ? 0.4 : 0.1,
        }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_#E61B23_0%,_transparent_50%)] mix-blend-screen pointer-events-none z-0 blur-[100px]" 
      />

      {/* Subtle animated grain/noise */}
      <div className="absolute inset-0 opacity-[0.03] z-10 pointer-events-none mix-blend-screen bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Faint floating smoke/fog effect (Simulated via layered blurred gradients) */}
      <motion.div 
        animate={{ y: ["0%", "5%", "0%"], x: ["0%", "-2%", "0%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -inset-1/2 bg-[radial-gradient(ellipse_at_center,_rgba(217,217,217,0.05)_0%,_transparent_50%)] blur-[80px] pointer-events-none z-0"
      />

      {/* Minimal floating particles */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-1 h-1 bg-[#D9D9D9] rounded-full opacity-30"
            style={{ left: `${p.x}%`, top: `${p.y}%`, scale: p.scale }}
            animate={{ 
              y: ["0px", "-50px", "0px"],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: p.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* 2. Interactive Product Display */}
      <motion.div 
        style={{ y: sectionY }}
        className="relative z-30 flex flex-col items-center w-full max-w-7xl mx-auto px-4"
      >
        <div className="relative w-64 h-[500px] md:w-80 md:h-[600px]">
          {/* React Three Fiber Canvas with rotatable 3D Can */}
          <Can3D />
          
          {/* Glowing Red Backlight specific to the can */}
          <motion.div
            animate={{ 
              opacity: isHovered ? 0.8 : 0.3,
              scale: isHovered ? 1.2 : 1
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#E61B23] rounded-full blur-[80px] -z-10 pointer-events-none transition-all duration-500"
          />
        </div>

        {/* 3. Text Improvements & CTA */}
        <div className="mt-16 flex flex-col items-center text-center relative z-40 pointer-events-none">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-5xl md:text-7xl text-[#F5F5F5] font-black tracking-tight uppercase mb-4 drop-shadow-2xl"
          >
            OPEN THE BOLD.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="font-sans text-xl md:text-2xl text-[#D9D9D9] font-light tracking-wide mb-10"
          >
            Cold. Crisp. <span className="text-[#F5F5F5] font-medium">Iconic.</span>
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group glass-panel px-10 py-4 rounded-full border border-[#D9D9D9]/30 hover:border-[#E61B23]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(230,27,35,0.4)] bg-[#111111]/40 backdrop-blur-xl pointer-events-auto"
          >
            <span className="relative z-10 font-sans font-semibold text-[#F5F5F5] uppercase tracking-[0.2em] text-sm group-hover:text-white transition-colors duration-300">
              FEEL THE FIZZ
            </span>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#E61B23]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          </motion.button>
        </div>

      </motion.div>
    </section>
  );
}
