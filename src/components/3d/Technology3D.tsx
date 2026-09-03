"use client";

import React, { useEffect, useRef, useState } from "react";

export interface Technology3DProps {
  rotationSpeed?: number;
  scale?: number;
  interactionEnabled?: boolean;
  particleCount?: number;
  variant?: "network" | "sphere" | "modules" | "core";
  className?: string;
  theme?: "light" | "brand";
}

interface Point3D {
  x: number;
  y: number;
  z: number;
  label?: string;
  category?: "api" | "db" | "ai" | "edge" | "app";
  radius: number;
  baseColor: string;
}

export function Technology3D({
  rotationSpeed = 0.003,
  scale = 1.0,
  interactionEnabled = true,
  particleCount = 28,
  variant = "network",
  className = "",
  theme = "brand",
}: Technology3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth * window.devicePixelRatio || 500);
    let height = (canvas.height = container.clientHeight * window.devicePixelRatio || 500);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const cssWidth = container.clientWidth;
    const cssHeight = container.clientHeight;

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth * (window.devicePixelRatio || 1);
      height = canvas.height = container.clientHeight * (window.devicePixelRatio || 1);
      ctx.resetTransform?.();
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    };

    window.addEventListener("resize", handleResize);

    // Dynamic 3D Points Generator (Spherical + Geodesic Distribution)
    const points: Point3D[] = [];
    const radius = Math.min(cssWidth, cssHeight) * 0.38 * scale;
    const actualCount = window.innerWidth < 768 ? Math.min(particleCount, 16) : particleCount;

    const labels = [
      "Next.js SSR",
      "PostgreSQL 16",
      "FastAPI Core",
      "pgvector Embeddings",
      "Cloudflare Edge",
      "Zod Type Guard",
      "Docker Swarm",
      "PWA Offline Cache",
      "ACID Data Vault",
      "Claude RAG Engine",
      "WAF Defense",
      "Secure Auth Token",
    ];

    const colors = [
      "#ea580c", // Orange 600
      "#f97316", // Orange 500
      "#f59e0b", // Amber 500
      "#c2410c", // Orange 700
      "#fb923c", // Orange 400
    ];

    for (let i = 0; i < actualCount; i++) {
      // Golden Spiral spherical distribution
      const phi = Math.acos(1 - (2 * (i + 0.5)) / actualCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      points.push({
        x: radius * Math.sin(phi) * Math.cos(theta),
        y: radius * Math.cos(phi),
        z: radius * Math.sin(phi) * Math.sin(theta),
        label: labels[i % labels.length],
        radius: Math.random() * 2 + 3.5,
        baseColor: colors[i % colors.length],
      });
    }

    // Interactive mouse parallax state
    let rotX = 0.2;
    let rotY = 0.3;
    let targetRotX = 0.2;
    let targetRotY = 0.3;
    let mouseX = 0;
    let mouseY = 0;
    let isVisible = true;

    // IntersectionObserver to pause rendering when offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactionEnabled || prefersReducedMotion) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x / (rect.width / 2);
      mouseY = y / (rect.height / 2);
      targetRotY = mouseX * 0.6;
      targetRotX = -mouseY * 0.6;
    };

    if (interactionEnabled) {
      container.addEventListener("mousemove", handleMouseMove);
    }

    let pulseTime = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      pulseTime += 0.02;

      // Smooth camera interpolation (lerp)
      if (!prefersReducedMotion) {
        rotX += (targetRotX - rotX) * 0.05;
        rotY += (targetRotY - rotY) * 0.05 + rotationSpeed;
      }

      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const centerX = cssWidth / 2;
      const centerY = cssHeight / 2;
      const fov = 420;

      // Project 3D points to 2D screen
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * Math.cos(rotY) + p.z * Math.sin(rotY);
        let y1 = p.y;
        let z1 = -p.x * Math.sin(rotY) + p.z * Math.cos(rotY);

        // Rotate X
        let x2 = x1;
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        // Perspective division
        const distance = fov / (fov + z2);
        return {
          ...p,
          screenX: centerX + x2 * distance,
          screenY: centerY + y2 * distance,
          scale: distance,
          depth: z2,
        };
      });

      // Sort by depth for correct 3D z-buffering
      projected.sort((a, b) => a.depth - b.depth);

      // Draw Orbiting Core Rings
      const ringRadius = radius * 0.95;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        ringRadius,
        ringRadius * 0.4,
        rotY * 0.5,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = "rgba(234, 88, 12, 0.14)";
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 6]);
      ctx.stroke();
      ctx.restore();

      // Draw Connecting Edges between neighboring nodes
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dz = projected[i].z - projected[j].z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < radius * 0.9) {
            const avgDepth = (projected[i].depth + projected[j].depth) / 2;
            const alpha = Math.max(0.04, 0.22 * (1 - dist3D / (radius * 0.9)) * (1 + avgDepth / (radius * 1.5)));

            ctx.beginPath();
            ctx.moveTo(projected[i].screenX, projected[i].screenY);
            ctx.lineTo(projected[j].screenX, projected[j].screenY);
            ctx.strokeStyle = `rgba(234, 88, 12, ${alpha.toFixed(3)})`;
            ctx.lineWidth = Math.max(0.6, 1.1 * projected[i].scale);
            ctx.stroke();

            // Occasional traveling packet on edge
            const packetPhase = (pulseTime * 1.2 + i * 0.4) % 1;
            if (packetPhase > 0.05 && packetPhase < 0.95 && dist3D < radius * 0.65) {
              const px = projected[i].screenX + (projected[j].screenX - projected[i].screenX) * packetPhase;
              const py = projected[i].screenY + (projected[j].screenY - projected[i].screenY) * packetPhase;
              ctx.beginPath();
              ctx.arc(px, py, 1.8 * projected[i].scale, 0, Math.PI * 2);
              ctx.fillStyle = "rgba(249, 115, 22, 0.85)";
              ctx.fill();
            }
          }
        }
      }

      // Draw 3D Technology Nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        const nodeRadius = p.radius * p.scale;
        const depthAlpha = Math.min(1, Math.max(0.35, (p.depth + radius) / (2 * radius)));

        // Outer soft glow
        const glow = ctx.createRadialGradient(
          p.screenX,
          p.screenY,
          0,
          p.screenX,
          p.screenY,
          nodeRadius * 2.8
        );
        glow.addColorStop(0, `rgba(234, 88, 12, ${0.35 * depthAlpha})`);
        glow.addColorStop(1, "rgba(234, 88, 12, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, nodeRadius * 2.8, 0, Math.PI * 2);
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(p.screenX, p.screenY, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.baseColor;
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5 * p.scale;
        ctx.stroke();

        // Node Label (show labels for prominent front nodes)
        if (p.depth > -radius * 0.2 && p.label) {
          ctx.font = `600 ${Math.max(9, Math.round(10.5 * p.scale))}px ui-monospace, SFMono-Regular, monospace`;
          ctx.fillStyle = `rgba(15, 23, 42, ${Math.min(0.9, depthAlpha + 0.15)})`;
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          // Label pill background
          const textMetrics = ctx.measureText(p.label);
          const bgPad = 3.5;
          ctx.fillStyle = "rgba(255, 255, 255, 0.88)";
          ctx.strokeStyle = "rgba(226, 232, 240, 0.9)";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.roundRect(
            p.screenX + nodeRadius + 4,
            p.screenY - 7 * p.scale,
            textMetrics.width + bgPad * 2,
            14 * p.scale,
            3
          );
          ctx.fill();
          ctx.stroke();

          // Text
          ctx.fillStyle = "#0f172a";
          ctx.fillText(p.label, p.screenX + nodeRadius + 4 + bgPad, p.screenY);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (interactionEnabled) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [rotationSpeed, scale, interactionEnabled, particleCount, variant, theme]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] flex items-center justify-center select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />
      {/* Micro-interaction interactive cue */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-white/90 border border-slate-200 text-[10px] font-mono text-slate-500 shadow-2xs pointer-events-none flex items-center gap-1.5 backdrop-blur-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse" />
        <span>Interactive 3D Network • Move Cursor</span>
      </div>
    </div>
  );
}
