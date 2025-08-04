"use client"

import { useEffect, useRef, useState } from "react"

interface GradientPoint {
  x: number
  y: number
  targetX: number
  targetY: number
  baseX: number
  baseY: number
  color: [number, number, number]
  velocity: { x: number; y: number }
}

export function WebGLMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [points, setPoints] = useState<GradientPoint[]>([])
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const animationRef = useRef<number>()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const timeRef = useRef(0)

  // Felipe Pantone inspired colors (RGB normalized)
  const colors = [
    [1.0, 0.0, 0.5],   // Hot Pink
    [0.0, 0.5, 1.0],   // Electric Blue  
    [0.5, 1.0, 0.0],   // Neon Green
    [1.0, 0.5, 0.0],   // Orange
    [0.5, 0.0, 1.0],   // Purple
    [0.0, 1.0, 0.5],   // Cyan Green
    [1.0, 0.0, 0.25],  // Red Pink
    [0.25, 0.0, 1.0],  // Deep Purple
    [0.0, 1.0, 1.0],   // Cyan
  ]

  // Vertex shader
  const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    
    void main() {
      vec2 position = a_position;
      
      // Add wave distortion based on time and mouse
      float mouseDistance = distance(a_position, u_mouse);
      float influence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
      
      // Create flowing wave effect
      float wave = sin(a_position.x * 10.0 + u_time * 2.0) * 0.1;
      wave += cos(a_position.y * 8.0 + u_time * 1.5) * 0.08;
      
      // Mouse influence creates warping
      vec2 mouseOffset = (u_mouse - a_position) * influence * 0.3;
      position += mouseOffset;
      position.x += wave * influence;
      position.y += wave * influence * 0.7;
      
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
      v_color = a_color;
      gl_PointSize = 120.0 + influence * 80.0;
    }
  `

  // Fragment shader with blend modes
  const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float distance = length(center);
      
      // Create smooth circular gradient
      float alpha = 1.0 - smoothstep(0.3, 0.5, distance);
      
      // Add pulsing effect
      float pulse = 0.8 + 0.2 * sin(u_time * 3.0);
      alpha *= pulse;
      
      // Color shifting based on time
      vec3 color = v_color;
      color.r += 0.1 * sin(u_time * 2.0);
      color.g += 0.1 * cos(u_time * 1.5);
      color.b += 0.1 * sin(u_time * 2.5);
      
      gl_FragColor = vec4(color, alpha * 0.6);
    }
  `

  const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type)
    if (!shader) return null
    
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    
    return shader
  }

  const createProgram = (gl: WebGLRenderingContext) => {
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return null
    
    const program = gl.createProgram()
    if (!program) return null
    
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      return null
    }
    
    return program
  }

  useEffect(() => {
    // Initialize gradient points in a 5x5 grid for more detail
    const gridPoints: GradientPoint[] = []
    const gridSize = 5
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const baseX = j / (gridSize - 1)
        const baseY = i / (gridSize - 1)
        
        gridPoints.push({
          x: baseX,
          y: baseY,
          targetX: baseX,
          targetY: baseY,
          baseX,
          baseY,
          color: colors[Math.floor(Math.random() * colors.length)] as [number, number, number],
          velocity: { x: 0, y: 0 }
        })
      }
    }
    
    setPoints(gridPoints)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || points.length === 0) return

    // Get WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D canvas')
      return
    }

    glRef.current = gl

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height, // Flip Y for WebGL
      }
    }

    // Initialize WebGL
    const program = createProgram(gl)
    if (!program) return
    
    programRef.current = program
    gl.useProgram(program)

    // Create buffers
    const positionBuffer = gl.createBuffer()
    const colorBuffer = gl.createBuffer()

    // Get attribute locations
    const positionLocation = gl.getAttribLocation(program, 'a_position')
    const colorLocation = gl.getAttribLocation(program, 'a_color')
    
    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse')

    const animate = () => {
      timeRef.current += 0.016 // ~60fps
      
      // Prepare vertex data
      const positions: number[] = []
      const colors: number[] = []
      
      points.forEach((point) => {
        // Smooth movement towards mouse
        const mouseInfluence = 0.02
        const restoreForce = 0.01
        
        // Calculate target position (mix of base position and mouse influence)
        const dx = mouseRef.current.x - point.x
        const dy = mouseRef.current.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / 0.4)
        
        point.targetX = point.baseX + dx * influence * 0.1
        point.targetY = point.baseY + dy * influence * 0.1
        
        // Apply smooth movement
        point.velocity.x += (point.targetX - point.x) * mouseInfluence
        point.velocity.y += (point.targetY - point.y) * mouseInfluence
        
        // Add restore force to base position
        point.velocity.x += (point.baseX - point.x) * restoreForce
        point.velocity.y += (point.baseY - point.y) * restoreForce
        
        // Apply friction
        point.velocity.x *= 0.95
        point.velocity.y *= 0.95
        
        // Update position
        point.x += point.velocity.x
        point.y += point.velocity.y
        
        positions.push(point.x, point.y)
        colors.push(...point.color)
      })

      // Clear and set up WebGL state
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

      // Upload position data
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      // Upload color data
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW)
      gl.enableVertexAttribArray(colorLocation)
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0)

      // Set uniforms
      gl.uniform1f(timeLocation, timeRef.current)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)

      // Draw points
      gl.drawArrays(gl.POINTS, 0, points.length)

      animationRef.current = requestAnimationFrame(animate)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    
    animate()

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [points])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 opacity-60"
      style={{
        width: "100%",
        height: "100%",
        background: "radial-gradient(circle at 30% 20%, rgba(255, 0, 128, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 80%, rgba(0, 128, 255, 0.05) 0%, transparent 50%)",
      }}
    />
  )
}