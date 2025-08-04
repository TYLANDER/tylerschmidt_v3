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
  const timeRef = useRef(0)

  // Subtle gradient colors (much more toned down)
  const colors = [
    [0.2, 0.0, 0.15],   // Dark Pink
    [0.0, 0.15, 0.3],   // Dark Blue  
    [0.1, 0.2, 0.0],    // Dark Green
    [0.25, 0.1, 0.0],   // Dark Orange
    [0.15, 0.0, 0.25],  // Dark Purple
    [0.0, 0.2, 0.15],   // Dark Teal
  ]

  // Vertex shader for triangulated mesh
  const vertexShaderSource = `
    precision mediump float;
    attribute vec2 a_position;
    attribute vec3 a_color;
    varying vec3 v_color;
    uniform float u_time;
    uniform vec2 u_mouse;
    
    void main() {
      vec2 position = a_position;
      
      // Subtle mouse influence
      float mouseDistance = distance(a_position, u_mouse);
      float influence = 1.0 - smoothstep(0.0, 0.3, mouseDistance);
      
      // Very gentle wave motion
      float wave = sin(a_position.x * 3.0 + u_time * 0.5) * 0.02;
      wave += cos(a_position.y * 2.0 + u_time * 0.3) * 0.015;
      
      // Gentle mouse warping
      vec2 mouseOffset = (u_mouse - a_position) * influence * 0.05;
      position += mouseOffset;
      position.x += wave;
      position.y += wave * 0.8;
      
      gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
      v_color = a_color;
    }
  `

  // Fragment shader for smooth interpolation
  const fragmentShaderSource = `
    precision mediump float;
    varying vec3 v_color;
    uniform float u_time;
    
    void main() {
      // Very subtle color variation
      vec3 color = v_color;
      
      // Minimal time-based variation
      color += 0.02 * sin(u_time * 0.5);
      
      gl_FragColor = vec4(color, 0.8);
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
        
        // Create smoother color distribution
        const colorIndex = ((j + i) * 2) % colors.length
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
    
    // Get uniform locations
    const timeLocation = (gl as WebGLRenderingContext).getUniformLocation(program, 'u_time')
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

      // Set uniforms
      glContext.uniform1f(timeLocation, timeRef.current)
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