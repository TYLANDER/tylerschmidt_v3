"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface MetallicHeroProps {
  className?: string
}

// Generate random positions for metallic balls
function generateBallPositions(count: number): [number, number, number][] {
  const positions: [number, number, number][] = []
  
  for (let i = 0; i < count; i++) {
    positions.push([
      (Math.random() - 0.5) * 16, // X: -8 to 8
      (Math.random() - 0.5) * 8,  // Y: -4 to 4
      (Math.random() - 0.5) * 12, // Z: -6 to 6
    ])
  }
  
  return positions
}

function MetalBall({ 
  position, 
  index 
}: { 
  position: [number, number, number]
  index: number 
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const { viewport } = useThree()

  // Create unique animation parameters for each ball
  const animParams = useMemo(() => ({
    speed: 0.3 + Math.random() * 0.4,
    xOffset: Math.random() * Math.PI * 2,
    yOffset: Math.random() * Math.PI * 2,
    zOffset: Math.random() * Math.PI * 2,
    floatRange: 2 + Math.random() * 3,
    scale: 0.8 + Math.random() * 0.6,
  }), [])

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime * animParams.speed

      // Gentle floating motion with unique patterns
      meshRef.current.position.x = position[0] + Math.sin(time + animParams.xOffset) * 0.5
      meshRef.current.position.y = position[1] + Math.cos(time + animParams.yOffset) * 0.3
      meshRef.current.position.z = position[2] + Math.sin(time * 0.5 + animParams.zOffset) * 0.4

      // Keep balls within viewport bounds
      const bounds = {
        x: viewport.width * 0.4,
        y: viewport.height * 0.3,
        z: 4
      }

      if (Math.abs(meshRef.current.position.x) > bounds.x) {
        meshRef.current.position.x = Math.sign(meshRef.current.position.x) * bounds.x
      }
      if (Math.abs(meshRef.current.position.y) > bounds.y) {
        meshRef.current.position.y = Math.sign(meshRef.current.position.y) * bounds.y
      }
      if (Math.abs(meshRef.current.position.z) > bounds.z) {
        meshRef.current.position.z = Math.sign(meshRef.current.position.z) * bounds.z
      }

      // Rotation
      meshRef.current.rotation.x = Math.sin(time * 0.7) * 0.3
      meshRef.current.rotation.y += 0.005 + (hovered ? 0.02 : 0)
      meshRef.current.rotation.z = Math.cos(time * 0.5) * 0.2

      // Scale on interaction
      const targetScale = clicked ? animParams.scale * 1.4 : (hovered ? animParams.scale * 1.2 : animParams.scale)
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  return (
    <Float 
      speed={animParams.speed} 
      rotationIntensity={0.3} 
      floatIntensity={0.2}
      position={position}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onPointerDown={() => setClicked(true)}
        onPointerUp={() => setClicked(false)}
        scale={animParams.scale}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#E5E5E5"
          metalness={1}
          roughness={0.05}
          distort={0.2 + (hovered ? 0.3 : 0)}
          speed={1 + (hovered ? 2 : 0)}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  )
}

// We'll handle the text as HTML overlay for better compatibility

function Scene() {
  // Generate random number of balls (5-12)
  const ballCount = useMemo(() => Math.floor(Math.random() * 8) + 5, [])
  const ballPositions = useMemo(() => generateBallPositions(ballCount), [ballCount])

  return (
    <>
      <color attach="background" args={["#000000"]} />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[-10, -10, -10]} color="#4A90E2" intensity={0.8} />
      <pointLight position={[10, -5, 5]} color="#E24A90" intensity={0.6} />
      
      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Text handled as HTML overlay */}

      {/* Floating metallic balls */}
      {ballPositions.map((position, index) => (
        <MetalBall key={index} position={position} index={index} />
      ))}

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#000000", 8, 25]} />
    </>
  )
}

export function MetallicHero({ className }: MetallicHeroProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full",
        className
      )}
    >
      <Canvas
        camera={{ position: [0, 0, 12], fov: 60 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  )
}