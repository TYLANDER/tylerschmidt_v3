"use client"

import { useRef, useMemo, useCallback } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

interface FluidDynamicsProps {
  className?: string
}

// Custom shader material for fluid simulation
function FluidMaterial() {
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
    resolution: { value: new THREE.Vector2(1024, 1024) },
    viscosity: { value: 0.8 },
    force: { value: 0.0 },
    dye: { value: new THREE.Vector3(0.2, 0.8, 1.0) }
  }), [])

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `

  const fragmentShader = `
    uniform float time;
    uniform vec2 mouse;
    uniform vec2 resolution;
    uniform float viscosity;
    uniform float force;
    uniform vec3 dye;
    varying vec2 vUv;

    // Noise function
    float noise(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    // Smooth noise
    float smoothNoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      
      float a = noise(i);
      float b = noise(i + vec2(1.0, 0.0));
      float c = noise(i + vec2(0.0, 1.0));
      float d = noise(i + vec2(1.0, 1.0));
      
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    // Turbulent flow
    vec2 turbulence(vec2 p) {
      float t = time * 0.1;
      vec2 vel = vec2(0.0);
      
      // Multiple octaves of noise for turbulence
      vel += 0.5 * vec2(
        smoothNoise(p + vec2(t, 0.0)) - 0.5,
        smoothNoise(p + vec2(0.0, t)) - 0.5
      );
      
      vel += 0.25 * vec2(
        smoothNoise(p * 2.0 + vec2(t * 1.1, 0.0)) - 0.5,
        smoothNoise(p * 2.0 + vec2(0.0, t * 1.1)) - 0.5
      );
      
      return vel;
    }

    void main() {
      vec2 uv = vUv;
      vec2 p = uv * 8.0;
      
      // Mouse influence
      float mouseInfluence = 1.0 - smoothstep(0.0, 2.0, distance(uv, mouse));
      
      // Turbulent flow
      vec2 flow = turbulence(p + time * 0.05);
      
      // Add mouse force
      vec2 mouseForce = (uv - mouse) * mouseInfluence * force;
      flow += mouseForce;
      
      // Sample the flow field
      vec2 samplePos = uv + flow * 0.1;
      
      // Create fluid patterns
      float density = 0.0;
      density += smoothNoise(samplePos * 4.0 + time * 0.1) * 0.5;
      density += smoothNoise(samplePos * 8.0 + time * 0.2) * 0.25;
      density += smoothNoise(samplePos * 16.0 + time * 0.4) * 0.125;
      
      // Color mixing based on flow
      vec3 color1 = dye;
      vec3 color2 = vec3(1.0, 0.3, 0.8);
      vec3 color3 = vec3(0.3, 1.0, 0.4);
      
      float flowMagnitude = length(flow);
      vec3 finalColor = mix(color1, color2, flowMagnitude);
      finalColor = mix(finalColor, color3, density * mouseInfluence);
      
      // Add some shimmer
      float shimmer = sin(time * 2.0 + samplePos.x * 10.0 + samplePos.y * 10.0) * 0.1 + 0.9;
      finalColor *= shimmer;
      
      // Fade edges
      float vignette = 1.0 - smoothstep(0.3, 1.0, distance(uv, vec2(0.5)));
      
      gl_FragColor = vec4(finalColor * density * vignette, 1.0);
    }
  `

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = state.clock.elapsedTime
    }
  })

  return (
    <shaderMaterial
      ref={materialRef}
      uniforms={uniforms}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      transparent
    />
  )
}

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport, pointer } = useThree()
  
  useFrame(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        // Update mouse position
        const x = (pointer.x + 1) / 2
        const y = (pointer.y + 1) / 2
        material.uniforms.mouse.value.set(x, y)
        
        // Gradually reduce force when not interacting
        material.uniforms.force.value *= 0.98
      }
    }
  })

  const handlePointerMove = useCallback(() => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.force.value = 1.0
      }
    }
  }, [])

  return (
    <mesh
      ref={meshRef}
      onPointerMove={handlePointerMove}
      scale={[viewport.width, viewport.height, 1]}
    >
      <planeGeometry args={[1, 1, 128, 128]} />
      <FluidMaterial />
    </mesh>
  )
}

export function FluidDynamics({ className }: FluidDynamicsProps) {
  return (
    <div className={cn("w-full h-full min-h-[500px] bg-black", className)}>
      <Canvas
        camera={{ position: [0, 0, 1], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#000008"]} />
        <FluidPlane />
        
        {/* Instructions */}
        <Html position={[0, 0, 0]} center>
          <div className="absolute top-4 left-4 text-white text-sm bg-black/50 p-2 rounded backdrop-blur pointer-events-none">
            Move mouse to create fluid turbulence
          </div>
        </Html>
      </Canvas>
    </div>
  )
} 