"use client"

import { useRef, useState, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface AudioCrystalsProps {
  className?: string
}

interface CrystalProps {
  position: [number, number, number]
  frequency: number
  audioData: number
}

function Crystal({ position, frequency, audioData }: CrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Scale based on audio amplitude
      const baseScale = 0.5
      const audioScale = baseScale + audioData * 2
      meshRef.current.scale.setScalar(audioScale)

      // Rotation based on frequency
      meshRef.current.rotation.y += (frequency / 1000) * (1 + audioData)
      meshRef.current.rotation.x += (frequency / 2000) * (1 + audioData)

      // Color intensity based on audio
      const intensity = 0.3 + audioData * 0.7
      const hue = frequency / 255 + state.clock.elapsedTime * 0.1
      materialRef.current.color.setHSL(hue % 1, 0.8, intensity)

      // Emission for glow effect
      materialRef.current.emissive.setHSL(hue % 1, 0.6, audioData * 0.5)
    }
  })

  // Different crystal geometries
  const geometry = useMemo(() => {
    const geometries = [
      new THREE.OctahedronGeometry(1, 2),
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.ConeGeometry(1, 2, 6),
      new THREE.CylinderGeometry(0.5, 1, 2, 8),
    ]
    return geometries[Math.floor(frequency / 64) % geometries.length]
  }, [frequency])

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial
        ref={materialRef}
        color="#00aaff"
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.9}
      />
      {/* Glow effect */}
      <mesh scale={1.2}>
        <meshBasicMaterial
          color="#00aaff"
          transparent
          opacity={audioData * 0.3}
        />
      </mesh>
    </mesh>
  )
}

function CrystalField({ audioData }: { audioData: Float32Array }) {
  const crystals = useMemo(() => {
    const crystalCount = 32
    return Array.from({ length: crystalCount }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      frequency: i * 8, // Map to frequency bins
    }))
  }, [])

  return (
    <group>
      {crystals.map((crystal, index) => (
        <Crystal
          key={index}
          position={crystal.position}
          frequency={crystal.frequency}
          audioData={audioData[crystal.frequency] || 0}
        />
      ))}
    </group>
  )
}

function AudioVisualization() {
  const [, setAudioContext] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null)
  const [audioData, setAudioData] = useState<Float32Array>(
    new Float32Array(256)
  )
  const [isListening, setIsListening] = useState(false)
  const [error, setError] = useState<string>("")

  const startAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const context = new AudioContext()
      const source = context.createMediaStreamSource(stream)
      const analyserNode = context.createAnalyser()

      analyserNode.fftSize = 512
      analyserNode.smoothingTimeConstant = 0.8

      source.connect(analyserNode)

      setAudioContext(context)
      setAnalyser(analyserNode)
      setIsListening(true)
      setError("")
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError("Could not access microphone. Using demo mode.")
      // Use demo mode with fake audio data
      setIsListening(true)
    }
  }

  useFrame(() => {
    if (analyser) {
      const dataArray = new Float32Array(analyser.frequencyBinCount)
      analyser.getFloatFrequencyData(dataArray)

      // Normalize the data (from dB to 0-1 range)
      const normalizedData = dataArray.map(
        (value) => Math.max(0, (value + 100) / 100) // Convert from dB (-100 to 0) to 0-1
      )

      setAudioData(new Float32Array(normalizedData))
    } else if (isListening && error) {
      // Demo mode - generate fake audio data
      const fakeData = new Float32Array(256)
      const time = Date.now() * 0.001

      for (let i = 0; i < 256; i++) {
        fakeData[i] = Math.abs(
          Math.sin(time * 2 + i * 0.1) * Math.sin(time * 0.5 + i * 0.02) * 0.5
        )
      }
      setAudioData(fakeData)
    }
  })

  return (
    <>
      <CrystalField audioData={audioData} />

      {!isListening && (
        <Html position={[0, 0, 0]} center>
          <div className="space-y-4 text-center">
            <button
              onClick={startAudio}
              className="rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              🎵 Enable Microphone
            </button>
            <p className="max-w-xs text-sm text-white">
              Allow microphone access to see crystals react to your voice or
              music
            </p>
          </div>
        </Html>
      )}

      {error && (
        <Html position={[0, -8, 0]} center>
          <div className="rounded bg-black/50 p-2 text-sm text-orange-400 backdrop-blur">
            {error}
          </div>
        </Html>
      )}
    </>
  )
}

export function AudioCrystals({ className }: AudioCrystalsProps) {
  return (
    <div className={cn("h-full min-h-[500px] w-full bg-gray-900", className)}>
      <Canvas
        camera={{ position: [0, 5, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a1a"]} />

        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#66aaff" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.5}
          color="#ff6666"
        />
        <pointLight position={[0, 20, 0]} intensity={0.8} color="#88ff88" />

        <AudioVisualization />

        {/* Fog for atmosphere */}
        <fog attach="fog" args={["#0a0a1a", 10, 50]} />
      </Canvas>
    </div>
  )
}
