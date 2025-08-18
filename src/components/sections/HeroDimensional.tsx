"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Text3D, Center, OrbitControls } from '@react-three/drei'

// Custom shader for impossible geometry text
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uMouse;
  uniform float uAngle;
  
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    // Create color that shifts based on viewing angle
    vec3 color1 = vec3(0.3, 0.6, 1.0); // Designer blue
    vec3 color2 = vec3(1.0, 0.4, 0.4); // Engineer red
    vec3 color3 = vec3(0.4, 1.0, 0.6); // Creative green
    
    float angle = abs(uAngle);
    vec3 finalColor;
    
    if (angle < 0.5) {
      finalColor = mix(color1, color2, angle * 2.0);
    } else {
      finalColor = mix(color2, color3, (angle - 0.5) * 2.0);
    }
    
    // Add shimmer effect
    float shimmer = sin(vPosition.x * 10.0 + uTime * 2.0) * 0.1 + 0.9;
    finalColor *= shimmer;
    
    // Distance-based fade
    float dist = length(uMouse - vPosition);
    float glow = 1.0 / (1.0 + dist * 0.1);
    
    gl_FragColor = vec4(finalColor * glow, 1.0);
  }
`

function DimensionalText() {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const { camera, mouse } = useThree()
  const [currentWord, setCurrentWord] = useState('DESIGNER')
  
  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return
    
    // Calculate viewing angle
    const cameraPosition = camera.position
    const textPosition = meshRef.current.position
    const angle = Math.atan2(
      cameraPosition.x - textPosition.x,
      cameraPosition.z - textPosition.z
    )
    
    // Update shader uniforms
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime
    materialRef.current.uniforms.uMouse.value = new THREE.Vector3(
      mouse.x * 5,
      mouse.y * 5,
      0
    )
    materialRef.current.uniforms.uAngle.value = (angle + Math.PI) / (Math.PI * 2)
    
    // Change text based on viewing angle
    const normalizedAngle = (angle + Math.PI) / (Math.PI * 2)
    if (normalizedAngle < 0.33 && currentWord !== 'DESIGNER') {
      setCurrentWord('DESIGNER')
    } else if (normalizedAngle >= 0.33 && normalizedAngle < 0.66 && currentWord !== 'ENGINEER') {
      setCurrentWord('ENGINEER')
    } else if (normalizedAngle >= 0.66 && currentWord !== 'CREATIVE') {
      setCurrentWord('CREATIVE')
    }
    
    // Subtle rotation
    meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1
  })
  
  return (
    <Center>
      <Text3D
        ref={meshRef}
        font="/fonts/optimer_bold.typeface.json" // You'll need to add a 3D font
        size={1.5}
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelThickness={0.1}
        bevelSize={0.02}
        bevelOffset={0}
        bevelSegments={8}
      >
        {currentWord}
        <shaderMaterial
          ref={materialRef}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            uTime: { value: 0 },
            uMouse: { value: new THREE.Vector3() },
            uAngle: { value: 0 }
          }}
        />
      </Text3D>
    </Center>
  )
}

function PhysicsLetters({ text }: { text: string }) {
  const letters = text.split('')
  
  return (
    <>
      {letters.map((letter, i) => (
        <PhysicsLetter key={i} letter={letter} index={i} />
      ))}
    </>
  )
}

function PhysicsLetter({ letter, index }: { letter: string; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { mouse } = useThree()
  const [hover, setHover] = useState(false)
  
  useFrame((state) => {
    if (!meshRef.current) return
    
    // Apply "gravity" from cursor
    const mousePos = new THREE.Vector3(mouse.x * 10, mouse.y * 10, 0)
    const letterPos = meshRef.current.position
    const distance = mousePos.distanceTo(letterPos)
    
    if (distance < 3) {
      // Repel from cursor
      const direction = letterPos.clone().sub(mousePos).normalize()
      const force = (3 - distance) * 0.1
      meshRef.current.position.add(direction.multiplyScalar(force))
    } else {
      // Return to original position
      const targetX = (index - 3.5) * 1.2
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.1
      meshRef.current.position.y += (0 - meshRef.current.position.y) * 0.1
    }
    
    // Rotation on hover
    if (hover) {
      meshRef.current.rotation.x += 0.1
      meshRef.current.rotation.y += 0.1
    }
  })
  
  return (
    <Text3D
      ref={meshRef}
      font="/fonts/optimer_bold.typeface.json"
      size={1}
      height={0.3}
      position={[(index - 3.5) * 1.2, 0, 0]}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {letter}
      <meshStandardMaterial
        color={hover ? '#ff6b6b' : '#4a9eff'}
        emissive={hover ? '#ff6b6b' : '#000000'}
        emissiveIntensity={hover ? 0.5 : 0}
      />
    </Text3D>
  )
}

export function HeroDimensional() {
  const [mode, setMode] = useState<'dimensional' | 'physics'>('dimensional')
  
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          className="cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, -10]} color="#ff6b6b" />
          
          {mode === 'dimensional' ? (
            <>
              <DimensionalText />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
              />
            </>
          ) : (
            <PhysicsLetters text="SCHMIDT" />
          )}
        </Canvas>
      </div>
      
      {/* UI Overlay */}
      <div className="relative z-10 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <p className="text-lg text-muted-foreground mb-4">
            {mode === 'dimensional' 
              ? "Drag to rotate • Watch the text transform"
              : "Move your cursor • Interact with the letters"
            }
          </p>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setMode('dimensional')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'dimensional' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Dimensional Mode
            </button>
            <button
              onClick={() => setMode('physics')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                mode === 'physics' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Physics Mode
            </button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="space-y-2"
        >
          <h2 className="text-2xl md:text-3xl text-muted-foreground">
            Tyler Schmidt
          </h2>
          <p className="text-lg text-muted-foreground/80">
            Where dimensions meet design
          </p>
        </motion.div>
      </div>
      
      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm text-muted-foreground/60">
          {mode === 'dimensional'
            ? "The text reveals different words from different angles"
            : "Each letter has its own physics"}
        </p>
      </motion.div>
    </section>
  )
}
