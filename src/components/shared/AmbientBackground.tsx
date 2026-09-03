"use client";

import React, { useEffect, useRef } from "react";

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle, high-performance ambient constellation
    const particlesCount = Math.min(Math.floor(width / 45), 32);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      opacity: number;
    }> = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: Math.random() * 1.5 + 0.8,
        opacity: Math.random() * 0.2 + 0.08,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Light, crisp connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(234, 88, 12, ${0.08 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Draw light particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(234, 88, 12, ${p.opacity})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Light atmospheric ambient glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] rounded-full bg-orange-500/[0.035] blur-[130px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[650px] h-[550px] rounded-full bg-orange-500/[0.03] blur-[150px] animate-pulse-glow"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 right-10 w-[400px] h-[400px] rounded-full bg-sky-500/[0.025] blur-[120px] animate-pulse-glow"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Light subtle tech grid */}
      <div className="absolute inset-0 tech-grid-light opacity-60" />

      {/* Light interactive particle constellation */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
