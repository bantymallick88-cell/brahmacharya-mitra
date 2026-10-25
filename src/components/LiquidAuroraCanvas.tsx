import React, { useEffect, useRef } from 'react';

/**
 * 21st.dev & Godly-style Liquid Aurora Shader Canvas
 * Renders a morphing dynamic liquid aurora mesh with spectral prism light beams,
 * electric gold (#f59e0b), cosmic violet (#6d28d9), and cyan-saffron highlights.
 * Runs smoothly at 60fps with interactive mouse wave displacement.
 */
export default function LiquidAuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates with smooth interpolation
    let mouseX = width * 0.5;
    let mouseY = height * 0.4;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Harmonic wave parameters for fluid streams
    let time = 0;

    interface FluidWave {
      colorStops: { offset: number; color: string }[];
      baseY: number;
      speed: number;
      amplitude: number;
      frequency: number;
      phase: number;
      widthMultiplier: number;
    }

    const waves: FluidWave[] = [
      // 1. Cosmic Violet Deep Base Stream
      {
        colorStops: [
          { offset: 0, color: 'rgba(109, 40, 217, 0.42)' },
          { offset: 0.5, color: 'rgba(76, 29, 149, 0.3)' },
          { offset: 1, color: 'transparent' }
        ],
        baseY: 0.45,
        speed: 0.0008,
        amplitude: 85,
        frequency: 0.0018,
        phase: 0,
        widthMultiplier: 1.1
      },
      // 2. Electric Neon Gold Fluid Stream
      {
        colorStops: [
          { offset: 0, color: 'rgba(245, 158, 11, 0.38)' },
          { offset: 0.45, color: 'rgba(217, 119, 6, 0.25)' },
          { offset: 1, color: 'transparent' }
        ],
        baseY: 0.42,
        speed: 0.0012,
        amplitude: 70,
        frequency: 0.0022,
        phase: Math.PI * 0.5,
        widthMultiplier: 0.95
      },
      // 3. Cyber Amber & Saffron Prism Ribbon
      {
        colorStops: [
          { offset: 0, color: 'rgba(251, 191, 36, 0.32)' },
          { offset: 0.6, color: 'rgba(245, 158, 11, 0.18)' },
          { offset: 1, color: 'transparent' }
        ],
        baseY: 0.5,
        speed: 0.00095,
        amplitude: 95,
        frequency: 0.0015,
        phase: Math.PI * 1.1,
        widthMultiplier: 1.2
      },
      // 4. Cyan-Spectral Accent Highlight Beam
      {
        colorStops: [
          { offset: 0, color: 'rgba(6, 182, 212, 0.28)' },
          { offset: 0.5, color: 'rgba(99, 102, 241, 0.2)' },
          { offset: 1, color: 'transparent' }
        ],
        baseY: 0.38,
        speed: 0.0015,
        amplitude: 60,
        frequency: 0.0028,
        phase: Math.PI * 1.7,
        widthMultiplier: 0.8
      }
    ];

    const render = (timestamp: number) => {
      time = timestamp;

      // Smooth mouse follow (lerp)
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Deep obsidian backdrop layer
      ctx.fillStyle = '#02040a';
      ctx.fillRect(0, 0, width, height);

      // Global composite mode for luminous spectral blending
      ctx.globalCompositeOperation = 'screen';

      // 1. Draw glowing interactive radial focal spot under mouse
      const mouseGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        0,
        mouseX,
        mouseY,
        width * 0.45
      );
      mouseGrad.addColorStop(0, 'rgba(245, 158, 11, 0.16)');
      mouseGrad.addColorStop(0.35, 'rgba(109, 40, 217, 0.12)');
      mouseGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.05)');
      mouseGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = mouseGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw active flowing liquid waves
      waves.forEach((wave) => {
        const step = 25; // Segment resolution
        const waveCenterY = height * wave.baseY;

        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width + step; x += step) {
          // Harmonic wave math + cursor displacement distortion
          const distToMouse = Math.hypot(x - mouseX, waveCenterY - mouseY);
          const mouseFactor = Math.max(0, 1 - distToMouse / (width * 0.45));
          const mouseDisplacement = Math.sin(distToMouse * 0.015 - time * 0.003) * 35 * mouseFactor;

          const harmonic1 = Math.sin(x * wave.frequency + time * wave.speed + wave.phase);
          const harmonic2 = Math.cos(x * wave.frequency * 0.55 - time * wave.speed * 0.75);
          const y = waveCenterY + (harmonic1 * 0.7 + harmonic2 * 0.3) * wave.amplitude + mouseDisplacement;

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();

        // Vertical gradient with wave color stops
        const grad = ctx.createLinearGradient(0, waveCenterY - wave.amplitude, 0, height);
        wave.colorStops.forEach((cs) => {
          grad.addColorStop(cs.offset, cs.color);
        });

        ctx.fillStyle = grad;
        ctx.filter = 'blur(45px)';
        ctx.fill();
        ctx.filter = 'none';
      });

      // 3. Central Prismatic Beams (Diagonal Aurora Streaks)
      const prismAngle = Math.sin(time * 0.0004) * 0.12;
      ctx.save();
      ctx.translate(width * 0.5, height * 0.35);
      ctx.rotate(-0.15 + prismAngle);

      const prismGrad = ctx.createLinearGradient(-width * 0.4, 0, width * 0.4, 0);
      prismGrad.addColorStop(0, 'transparent');
      prismGrad.addColorStop(0.3, 'rgba(109, 40, 217, 0.15)');
      prismGrad.addColorStop(0.48, 'rgba(254, 240, 138, 0.25)');
      prismGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.4)');
      prismGrad.addColorStop(0.52, 'rgba(245, 158, 11, 0.3)');
      prismGrad.addColorStop(0.7, 'rgba(6, 182, 212, 0.12)');
      prismGrad.addColorStop(1, 'transparent');

      ctx.fillStyle = prismGrad;
      ctx.filter = 'blur(35px)';
      ctx.fillRect(-width * 0.45, -80, width * 0.9, 160);
      ctx.restore();

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      style={{
        background: '#02040a',
        willChange: 'transform'
      }}
      aria-hidden="true"
    />
  );
}
