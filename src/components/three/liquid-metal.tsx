"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface LiquidMetalProps {
  className?: string
}

function MetalBlob() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<unknown>(null)
  const [hovered, setHovered] = useState(false)
  
  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Continuous morphing
      const material = materialRef.current as THREE.ShaderMaterial & { 
        distort?: number
        speed?: number 
      }
      material.distort = 0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      material.speed = 0.5
      
      // Rotation based on mouse/hover
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      meshRef.current.rotation.y += 0.01
      
      // Scale on hover
      const targetScale = hovered ? 1.2 : 1
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    }
  })

  return (
    <Float speed={1} rotationIntensity={1} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[2, 128, 128]} />
        <MeshDistortMaterial
          color="#C0C0C0"
          metalness={1}
          roughness={0.1}
          distort={0.3}
          speed={0.5}
          envMapIntensity={1}
        />
      </mesh>
    </Float>
  )
}

function ChromeSphere({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#E5E5E5"
        metalness={1}
        roughness={0}
        envMapIntensity={2}
      />
    </mesh>
  )
}

export function LiquidMetal({ className }: LiquidMetalProps) {
  return (
    <div className={cn("w-full h-full min-h-[500px] bg-gradient-to-b from-gray-900 to-black", className)}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000000"]} />
        
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#0066ff" intensity={0.5} />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Main liquid metal blob */}
        <MetalBlob />
        
        {/* Smaller chrome spheres */}
        <ChromeSphere position={[-4, 2, -2]} />
        <ChromeSphere position={[4, -1, -3]} />
        <ChromeSphere position={[-3, -2, 1]} />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#000000", 8, 20]} />
      </Canvas>
    </div>
  )
} 