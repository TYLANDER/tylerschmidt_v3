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
  const animationRef = useRef<number>(0)
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)


  // Simple, elegant mesh gradient colors
  const colors = [
    [0.1, 0.15, 0.3],   // Deep blue
    [0.2, 0.1, 0.4],    // Deep purple  
    [0.3, 0.05, 0.2],   // Deep magenta
    [0.15, 0.2, 0.35],  // Deep teal
  ]

  // Clean vertex shader for smooth mesh
  const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    uniform vec2 u_mouse;
    
    void main() {
      vec2 position = a_position;
      
      // Very gentle mouse influence only
      float mouseDistance = distance(a_position, u_mouse);
      float influence = 1.0 - smoothstep(0.0, 0.5, mouseDistance);
      
      // Minimal mouse warping
      vec2 mouseOffset = (u_mouse - a_position) * influence * 0.02;
      position += mouseOffset;
      
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
      v_color = a_color;
    }
  `

  // Clean fragment shader - no time-based changes
  const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    
    void main() {
      gl_FragColor = vec4(v_color, 0.9);
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
    // Simple 4x4 grid for smooth gradient
    const gridPoints: GradientPoint[] = []
    const gridSize = 4
    
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const baseX = j / (gridSize - 1)
        const baseY = i / (gridSize - 1)
        
        // Simple corner-based color assignment
        let colorIndex = 0
        if (i === 0 && j === 0) colorIndex = 0      // Top-left
        else if (i === 0 && j === gridSize - 1) colorIndex = 1  // Top-right
        else if (i === gridSize - 1 && j === 0) colorIndex = 2  // Bottom-left
        else if (i === gridSize - 1 && j === gridSize - 1) colorIndex = 3  // Bottom-right
        else colorIndex = Math.floor((i + j) / 2) % colors.length
        gridPoints.push({
          x: baseX,
          y: baseY,
          targetX: baseX,
          targetY: baseY,
          baseX,
          baseY,
          color: colors[colorIndex] as [number, number, number],
          velocity: { x: 0, y: 0 }
        })
      }
    }
    
    setPoints(gridPoints)
  }, [colors])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || points.length === 0) return

    // Get WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    if (!gl) {
      console.warn('WebGL not supported, falling back to 2D canvas')
      return
    }

    glRef.current = gl as WebGLRenderingContext

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ;(gl as WebGLRenderingContext).viewport(0, 0, canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: 1.0 - (e.clientY - rect.top) / rect.height, // Flip Y for WebGL
      }
    }

    // Initialize WebGL
    const program = createProgram(gl as WebGLRenderingContext)
    if (!program) return
    
    programRef.current = program
    ;(gl as WebGLRenderingContext).useProgram(program)

    // Create buffers
    const positionBuffer = (gl as WebGLRenderingContext).createBuffer()
    const colorBuffer = (gl as WebGLRenderingContext).createBuffer()

    // Get attribute locations
    const positionLocation = (gl as WebGLRenderingContext).getAttribLocation(program, 'a_position')
    const colorLocation = (gl as WebGLRenderingContext).getAttribLocation(program, 'a_color')
    
    // Get uniform locations (no time uniform)
    const resolutionLocation = (gl as WebGLRenderingContext).getUniformLocation(program, 'u_resolution')
    const mouseLocation = (gl as WebGLRenderingContext).getUniformLocation(program, 'u_mouse')

    // Generate triangulated indices for the grid
    const generateIndices = (gridWidth: number, gridHeight: number) => {
      const indices: number[] = []
      for (let y = 0; y < gridHeight - 1; y++) {
        for (let x = 0; x < gridWidth - 1; x++) {
          const topLeft = y * gridWidth + x
          const topRight = topLeft + 1
          const bottomLeft = (y + 1) * gridWidth + x
          const bottomRight = bottomLeft + 1
          
          // Two triangles per quad
          indices.push(topLeft, bottomLeft, topRight)
          indices.push(topRight, bottomLeft, bottomRight)
        }
      }
      return indices
    }

    const animate = () => {
      // Prepare static vertex data - no time-based animation
      const positions: number[] = []
      const colors: number[] = []
      
      points.forEach((point) => {
        // Very gentle mouse influence only
        const mouseInfluence = 0.002
        const restoreForce = 0.008
        
        // Calculate target position
        const dx = mouseRef.current.x - point.x
        const dy = mouseRef.current.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / 0.8)
        
        point.targetX = point.baseX + dx * influence * 0.01
        point.targetY = point.baseY + dy * influence * 0.01
        
        // Apply gentle movement
        point.velocity.x += (point.targetX - point.x) * mouseInfluence
        point.velocity.y += (point.targetY - point.y) * mouseInfluence
        
        // Strong restore force
        point.velocity.x += (point.baseX - point.x) * restoreForce
        point.velocity.y += (point.baseY - point.y) * restoreForce
        
        // Heavy damping
        point.velocity.x *= 0.88
        point.velocity.y *= 0.88
        
        // Update position
        point.x += point.velocity.x
        point.y += point.velocity.y
        
        positions.push(point.x, point.y)
        colors.push(...point.color)
      })

      // Clear and set up WebGL state
      const glContext = gl as WebGLRenderingContext
      glContext.clearColor(0, 0, 0, 0)
      glContext.clear(glContext.COLOR_BUFFER_BIT)
      glContext.enable(glContext.BLEND)
      glContext.blendFunc(glContext.SRC_ALPHA, glContext.ONE_MINUS_SRC_ALPHA)

      // Upload position data
      glContext.bindBuffer(glContext.ARRAY_BUFFER, positionBuffer)
      glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(positions), glContext.DYNAMIC_DRAW)
      glContext.enableVertexAttribArray(positionLocation)
      glContext.vertexAttribPointer(positionLocation, 2, glContext.FLOAT, false, 0, 0)

      // Upload color data
      glContext.bindBuffer(glContext.ARRAY_BUFFER, colorBuffer)
      glContext.bufferData(glContext.ARRAY_BUFFER, new Float32Array(colors), glContext.STATIC_DRAW)
      glContext.enableVertexAttribArray(colorLocation)
      glContext.vertexAttribPointer(colorLocation, 3, glContext.FLOAT, false, 0, 0)

      // Set uniforms (no time uniform needed)
      glContext.uniform2f(resolutionLocation, canvas.width, canvas.height)
      glContext.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y)

      // Generate and upload indices for triangulated mesh
      const gridSize = Math.sqrt(points.length)
      const indices = generateIndices(gridSize, gridSize)
      
      const indexBuffer = glContext.createBuffer()
      glContext.bindBuffer(glContext.ELEMENT_ARRAY_BUFFER, indexBuffer)
      glContext.bufferData(glContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), glContext.STATIC_DRAW)
      
      // Draw triangulated mesh
      glContext.drawElements(glContext.TRIANGLES, indices.length, glContext.UNSIGNED_SHORT, 0)

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