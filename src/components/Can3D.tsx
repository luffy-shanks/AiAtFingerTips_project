"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useTexture, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function SodaCan() {
  const groupRef = useRef<THREE.Group>(null);
  
  // Load the comprehensive 360 texture map
  const texture = useTexture("/AiAtFingerTips_project/diet-coke-texture.svg");
  
  // Interaction and idle rotation
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
      // Calculate target rotation based on mouse pointer
      // state.pointer is normalized between -1 and 1
      const targetRotationX = (state.pointer.y * Math.PI) / 8; // Slight tilt
      
      // We want full 360 degree rotation capability from mouse X movement.
      // If we multiply by Math.PI * 1.5, dragging/hovering edge to edge will show all sides.
      const targetRotationY = (state.pointer.x * Math.PI * 1.5); 
      
      // If mouse is idle (0,0), add a very slow auto-spin, else interpolate to mouse
      if (state.pointer.x === 0 && state.pointer.y === 0) {
        groupRef.current.rotation.y += 0.005; // Slightly faster idle spin to show off the back
      } else {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
      }
    }
  });

  return (
    <group ref={groupRef}>
      
      {/* 1. Base Metallic Can Body */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.3, 1.3, 4.5, 64]} />
        <meshPhysicalMaterial 
          color="#D9D9D9"
          metalness={0.95}
          roughness={0.15}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          envMapIntensity={2.5}
        />
      </mesh>

      {/* 2. Label Wrapper (Slightly larger cylinder with the texture map) */}
      <mesh castShadow receiveShadow rotation={[0, -Math.PI / 2, 0]}>
        {/* Rotate -90deg so the front of the texture faces the camera by default */}
        <cylinderGeometry args={[1.302, 1.302, 4.5, 64]} />
        <meshPhysicalMaterial 
          map={texture}
          transparent={true}
          metalness={0.4}
          roughness={0.3}
          clearcoat={1.0}
          clearcoatRoughness={0.2}
          envMapIntensity={2.0}
        />
      </mesh>

      {/* 3. Top rim/cap */}
      <mesh position={[0, 2.25, 0]}>
        <cylinderGeometry args={[1.25, 1.3, 0.2, 64]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.3} />
      </mesh>
      
      {/* 4. Bottom rim/base */}
      <mesh position={[0, -2.25, 0]}>
        <cylinderGeometry args={[1.25, 1.3, 0.2, 64]} />
        <meshStandardMaterial color="#b0b0b0" metalness={0.8} roughness={0.3} />
      </mesh>
      
    </group>
  );
}

export default function Can3D() {
  return (
    <div className="w-full h-full absolute inset-0 z-20 pointer-events-auto">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#ffffff" />
        <spotLight position={[-10, 0, -10]} angle={0.2} penumbra={1} intensity={5} color="#E61B23" />
        
        <Suspense fallback={null}>
          <SodaCan />
        </Suspense>
        
        <Environment preset="studio" />
        
        {/* Soft dynamic shadow directly beneath the 3D can */}
        <ContactShadows 
          position={[0, -3.5, 0]} 
          opacity={0.7} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000"
        />
      </Canvas>
    </div>
  );
}
