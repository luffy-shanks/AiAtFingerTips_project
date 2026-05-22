"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={container} className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-60"
        >
          <source src="/video1.mp4" type="video/mp4" />
        </video>
        {/* Cinematic gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10" />
      </motion.div>

      {/* Floating particles (simplified) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-20">
        <motion.h1 
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-display font-bold text-6xl md:text-8xl lg:text-9xl uppercase leading-[0.85] tracking-tighter text-[#F5F5F5] mb-6 drop-shadow-2xl"
        >
          Zero Sugar.<br/>
          <span className="text-[#E61B23] text-glow">Full Attitude.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          className="font-sans text-lg md:text-xl text-[#D9D9D9] max-w-2xl mb-12 font-light"
        >
          An iconic refreshment reimagined through cinematic motion and modern design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 items-center"
        >
          <button className="glass-panel px-8 py-4 rounded-full font-sans font-medium text-[#F5F5F5] uppercase tracking-widest text-sm hover:scale-105 transition-all duration-300 border border-[#D9D9D9]/20 hover:border-[#E61B23]/50 hover:shadow-[0_0_20px_rgba(230,27,35,0.3)] relative overflow-hidden group">
            <span className="relative z-10">Open Experience</span>
            <div className="absolute inset-0 bg-[#E61B23]/10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
          
          <button className="px-8 py-4 rounded-full font-sans font-medium text-[#D9D9D9] uppercase tracking-widest text-sm hover:text-[#F5F5F5] transition-colors duration-300 flex items-center gap-2">
            Watch The Pour
            <div className="w-8 h-[1px] bg-[#D9D9D9]/50" />
          </button>
        </motion.div>
      </div>

      {/* Smooth scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#F5F5F5] to-transparent animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest font-sans">Scroll</span>
      </motion.div>
    </section>
  );
}
