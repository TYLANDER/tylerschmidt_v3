"use client"

import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface ParticleGalaxyProps {
  className?: string
}

function Galaxy() {
  const ref = useRef<THREE.Points>(null)
  useThree() // Access three context

  // Generate galaxy particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(5000 * 3)
    const colors = new Float32Array(5000 * 3)

    for (let i = 0; i < 5000; i++) {
      // Spiral galaxy shape
      const radius = Math.random() * 25
      const angle = Math.random() * Math.PI * 2
      const height = (Math.random() - 0.5) * 2

      // Spiral arms
      const spiralAngle = angle + radius * 0.3

      positions[i * 3] = Math.cos(spiralAngle) * radius
      positions[i * 3 + 1] = height
      positions[i * 3 + 2] = Math.sin(spiralAngle) * radius

      // Color based on distance from center
      const distanceFromCenter = radius / 25
      colors[i * 3] = 1 - distanceFromCenter * 0.5 // Red
      colors[i * 3 + 1] = 0.5 + distanceFromCenter * 0.5 // Green
      colors[i * 3 + 2] = 1 // Blue
    }

    return [positions, colors]
  }, [])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.001
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
      <bufferAttribute
        attach="geometry-attributes-color"
        count={colors.length / 3}
        array={colors}
        itemSize={3}
        args={[colors, 3]}
      />
    </Points>
  )
}

function StarField() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const positions = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [])

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  )
}

export function ParticleGalaxy({ className }: ParticleGalaxyProps) {
  return (
    <div className={cn("h-full min-h-[500px] w-full bg-black", className)}>
      <Canvas
        camera={{ position: [0, 5, 30], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000011"]} />
        <StarField />
        <Galaxy />
        <ambientLight intensity={0.1} />
      </Canvas>
    </div>
  )
}
