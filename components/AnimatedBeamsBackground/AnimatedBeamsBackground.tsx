"use client";
import React, { useEffect, useRef, useState } from 'react';

type Beam = {
     isHorizontal: boolean;
     x: number;
     y: number;
     size: number;
     length: number;
     speed: number;
     color: string;
     opacity: number;
     isPersistent: boolean;
};

// --- ANIMATED BEAMS COMPONENT ---
const AnimatedBeamsBackground = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const beamsRef = useRef<Beam[]>([]);

     useEffect(() => {
          const canvas = canvasRef.current;
          if (!canvas) return;

          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          let animationFrameId: number;
          let width: number, height: number;

          const getBeamCount = () => {
               const w = window.innerWidth;

               if (w < 640) return 35;   // sm
               if (w < 1024) return 55;  // md
               return 75;               // lg+
          };
          const maxBeams = 80;

          const createBeam = (isInitial = false, customX: number | null = null, customY: number | null = null): Beam => {
               const isHorizontal = Math.random() > 0.8;
               const speed = Math.random() * 0.7 + 0.7;
               const size = Math.random() * 2.5 + 1.2;

               let x: number, y: number;
               if (customX !== null && customY !== null) {
                    x = isHorizontal ? customX - 200 : customX;
                    y = isHorizontal ? customY : customY - 200;
               } else {
                    x = isHorizontal
                         ? (isInitial ? Math.random() * width : -400)
                         : Math.random() * width;
                    y = isHorizontal
                         ? Math.random() * height
                         : (isInitial ? Math.random() * height : -400);
               }

               return {
                    isHorizontal,
                    x,
                    y,
                    size,
                    length: Math.random() * 400 + 200,
                    speed,
                    color: Math.random() > 0.5 ? '#2563eb' : '#22d3ee',
                    opacity: Math.random() * 0.5 + 0.25,
                    isPersistent: customX === null,
               };
          };

          const handleInteraction = (e: MouseEvent | TouchEvent) => {
               const rect = canvas.getBoundingClientRect();
               const clientX = 'clientX' in e ? e.clientX : e.touches?.[0]?.clientX;
               const clientY = 'clientY' in e ? e.clientY : e.touches?.[0]?.clientY;

               if (clientX === undefined || clientY === undefined) return;

               const x = clientX - rect.left;
               const y = clientY - rect.top;

               if (beamsRef.current.length < maxBeams) {
                    beamsRef.current.push(createBeam(false, x, y));
                    beamsRef.current.push(createBeam(false, x, y));
               }
          };

          const resize = () => {
               width = window.innerWidth;
               height = window.innerHeight;

               canvas.width = width * window.devicePixelRatio;
               canvas.height = height * window.devicePixelRatio;
               ctx.setTransform(1, 0, 0, 1, 0, 0);
               ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

               beamsRef.current = [];
               const beamCount = getBeamCount();

               for (let i = 0; i < beamCount; i++) {
                    beamsRef.current.push(createBeam(true));
               }
          };

          const draw = () => {
               ctx.clearRect(0, 0, width, height);

               for (let i = beamsRef.current.length - 1; i >= 0; i--) {
                    const beam = beamsRef.current[i];

                    if (beam.isHorizontal) {
                         beam.x += beam.speed;
                    } else {
                         beam.y += beam.speed;
                    }

                    const isOffScreen = beam.isHorizontal
                         ? beam.x > width + 100
                         : beam.y > height + 100;

                    if (isOffScreen) {
                         if (beam.isPersistent) {
                              beamsRef.current[i] = createBeam();
                         } else {
                              beamsRef.current.splice(i, 1);
                              continue;
                         }
                    }

                    const startX = beam.x;
                    const startY = beam.y;
                    const endX = beam.isHorizontal ? beam.x + beam.length : beam.x;
                    const endY = beam.isHorizontal ? beam.y : beam.y + beam.length;

                    const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                    gradient.addColorStop(0, 'transparent');
                    gradient.addColorStop(0.5, beam.color);
                    gradient.addColorStop(1, 'transparent');

                    ctx.globalAlpha = beam.opacity;
                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = beam.size;
                    ctx.lineCap = 'round';
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();

                    ctx.globalAlpha = beam.opacity + 0.3;
                    ctx.beginPath();
                    ctx.fillStyle = beam.color;
                    const headX = beam.isHorizontal ? beam.x + beam.length * 0.5 : beam.x;
                    const headY = beam.isHorizontal ? beam.y : beam.y + beam.length * 0.5;
                    ctx.arc(headX, headY, beam.size * 0.8, 0, Math.PI * 2);
                    ctx.fill();
               }

               animationFrameId = requestAnimationFrame(draw);
          };

          window.addEventListener('resize', resize);
          window.addEventListener('mousedown', handleInteraction);
          window.addEventListener('touchstart', handleInteraction, { passive: true });

          resize();
          draw();

          return () => {
               window.removeEventListener('resize', resize);
               window.removeEventListener('mousedown', handleInteraction);
               window.removeEventListener('touchstart', handleInteraction);
               cancelAnimationFrame(animationFrameId);
          };
     }, []);

     return (
          <div className="fixed inset-0 -z-10 bg-black overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,#1e3a8a_0%,#000000_80%)] opacity-30" />
               <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                    style={{ filter: 'blur(0.4px) drop-shadow(0 0 12px rgba(34, 211, 238, 0.3))' }}
               />
             
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_90%)] pointer-events-none" />
          </div>
     );
};

export default AnimatedBeamsBackground;
