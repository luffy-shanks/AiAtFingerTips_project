"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function InteractiveShowcase() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section className="relative w-full min-h-screen bg-[#090909] flex flex-col items-center justify-center py-24 px-4 overflow-hidden">
      
      <div className="mb-20 text-center relative z-20">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F5F5F5] uppercase tracking-widest mb-4">
          Interact
        </h2>
        <div className="w-12 h-[2px] bg-[#E61B23] mx-auto" />
      </div>

      <div 
        className="relative w-full max-w-4xl aspect-[16/9] md:aspect-[2/1] rounded-3xl glass-panel group cursor-pointer perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
          setIsActive(false);
        }}
        onClick={() => setIsActive(!isActive)}
      >
        {/* Dynamic lighting based on mouse position */}
        <motion.div 
          className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300 z-10"
          style={{
            background: isHovering 
              ? `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(217, 217, 217, 0.15) 0%, transparent 50%)`
              : 'transparent',
          }}
        />

        {/* Floating layered cards */}
        <motion.div
          animate={{
            rotateX: isHovering ? mousePosition.y * -15 : 0,
            rotateY: isHovering ? mousePosition.x * 15 : 0,
            z: isActive ? 50 : 0,
          }}
          transition={{ type: "spring", stiffness: 150, damping: 20 }}
          className="w-full h-full relative transform-style-3d p-6 md:p-12 flex flex-col justify-between overflow-hidden rounded-3xl"
        >
          {/* Background Video */}
          <div className="absolute inset-0 z-0 bg-[#090909]">
            <motion.video 
              src="/AiAtFingerTips_project/video2.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              animate={{ opacity: isHovering ? 1 : 0.3, filter: isHovering ? 'grayscale(0%)' : 'grayscale(50%)' }}
              transition={{ duration: 0.5 }}
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability, fades on hover */}
            <motion.div 
              animate={{ opacity: isHovering ? 0 : 1 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-[#090909]/60 to-[#090909]/30" 
            />
          </div>

          {/* Internal gradient sweep active state */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isActive ? 1 : 0 }}
            className="absolute inset-0 bg-gradient-to-tr from-[#E61B23]/40 via-transparent to-[#D9D9D9]/20 pointer-events-none transition-opacity duration-700 z-10 mix-blend-overlay"
          />

          <div className="relative z-20">
            <h3 className="font-display font-bold text-2xl md:text-4xl text-[#F5F5F5] uppercase tracking-tight drop-shadow-lg">
              Diet Coke
            </h3>
            <p className="font-sans text-[#D9D9D9] font-medium mt-2 max-w-sm drop-shadow-md">
              Cold. Clean. Iconic.
            </p>
          </div>

          <div className="relative z-20 flex justify-end">
            <div className={`w-16 h-16 rounded-full border border-[#D9D9D9]/30 flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-[#E61B23] border-[#E61B23] shadow-[0_0_30px_rgba(230,27,35,0.6)]' : 'bg-black/50 backdrop-blur-sm'}`}>
              <div className={`w-4 h-4 rounded-full transition-all duration-500 ${isActive ? 'bg-white' : 'bg-[#D9D9D9]/50 group-hover:bg-[#F5F5F5]'}`} />
            </div>
          </div>
          
          {/* Subtle line decorations */}
          <div className="absolute bottom-12 left-12 right-32 h-[1px] bg-gradient-to-r from-[#D9D9D9]/20 to-transparent" />
          <div className="absolute top-12 bottom-32 left-12 w-[1px] bg-gradient-to-b from-[#D9D9D9]/20 to-transparent" />
        </motion.div>
        
        {/* Thin Chrome border glow on hover */}
        <div className="absolute inset-0 rounded-3xl border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]" />
      </div>

    </section>
  );
}
