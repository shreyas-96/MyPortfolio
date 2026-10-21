'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    maxAlpha: number;
    decay: number;
    hue: number;
    saturation: number;
    wobble: number;
    wobbleSpeed: number;
    life: number;
}

export default function GotBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // ── VINTAGE DUST MOTES ──
        // Fewer, slower, very low opacity — like candlelight dust
        const COUNT = 45;
        const particles: Particle[] = [];

        function createParticle(): Particle {
            const x = Math.random() * width;
            // Start from bottom half mostly (like rising warm air)
            const y = height * 0.4 + Math.random() * height * 0.6;
            // Vintage warm tones: deep amber (38°), antique gold (45°), warm sepia (28°)
            const hueOptions = [38, 42, 28, 46, 32];
            const hue = hueOptions[Math.floor(Math.random() * hueOptions.length)];

            return {
                x,
                y,
                size: 0.8 + Math.random() * 1.8,
                vx: (Math.random() - 0.5) * 0.25,
                vy: -(0.15 + Math.random() * 0.45),   // very slow upward drift
                alpha: 0,
                maxAlpha: 0.08 + Math.random() * 0.14,  // very subtle — max 0.22
                decay: 0.0008 + Math.random() * 0.001,
                hue,
                saturation: 55 + Math.random() * 25,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.008 + Math.random() * 0.012,
                life: 0,
            };
        }

        for (let i = 0; i < COUNT; i++) {
            const p = createParticle();
            p.y = Math.random() * height;
            p.alpha = Math.random() * p.maxAlpha;
            particles.push(p);
        }

        let phase = 0;

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            phase += 0.0015;  // very slow phase

            // ── VINTAGE WARM VIGNETTE GLOW (bottom) ──
            // Like candlelight from below — very muted amber
            const warmX = width * 0.5 + Math.sin(phase) * 80;
            const warmY = height + 40;
            const warmG = ctx.createRadialGradient(warmX, warmY, 0, warmX, warmY, width * 0.7);
            warmG.addColorStop(0, 'rgba(160, 100, 30, 0.08)');
            warmG.addColorStop(0.4, 'rgba(120, 70, 18, 0.04)');
            warmG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmG;
            ctx.fillRect(0, 0, width, height);

            // ── LEFT SIDE WARM GLOW ──
            const lx = width * 0.08 + Math.cos(phase * 0.8) * 30;
            const ly = height * 0.6;
            const lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, width * 0.35);
            lg.addColorStop(0, 'rgba(140, 88, 22, 0.06)');
            lg.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = lg;
            ctx.fillRect(0, 0, width, height);

            // ── TOP RIGHT VERY SUBTLE COOL SHADOW ──
            // A faint slate/pewter tone — like aged parchment shadow
            const rx = width * 0.92 + Math.sin(phase * 0.7) * 25;
            const ry = height * 0.12;
            const rg = ctx.createRadialGradient(rx, ry, 0, rx, ry, width * 0.4);
            rg.addColorStop(0, 'rgba(60, 55, 48, 0.05)');
            rg.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = rg;
            ctx.fillRect(0, 0, width, height);

            // ── VERY SUBTLE HORIZONTAL HAZE ──
            const hazeY = height * 0.62 + Math.sin(phase * 1.3) * 20;
            const hg = ctx.createLinearGradient(0, hazeY - 80, 0, hazeY + 80);
            hg.addColorStop(0, 'transparent');
            hg.addColorStop(0.5, 'rgba(100, 72, 28, 0.015)');
            hg.addColorStop(1, 'transparent');
            ctx.fillStyle = hg;
            ctx.fillRect(0, hazeY - 80, width, 160);

            // ── DRAW DUST MOTE PARTICLES ──
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.18;
                p.y += p.vy;
                p.life++;

                // Slow gentle fade in, then gradual fade out
                if (p.life < 40) {
                    p.alpha = Math.min(p.maxAlpha, p.alpha + 0.003);
                } else if (p.y < height * 0.08) {
                    p.alpha -= p.decay * 3;
                } else {
                    // very slowly breathe
                    p.alpha = p.maxAlpha * (0.7 + 0.3 * Math.sin(p.wobble * 0.5));
                }

                // Draw as tiny soft glowing dot
                ctx.save();
                ctx.beginPath();
                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
                grad.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, 75%, ${p.alpha})`);
                grad.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, 55%, ${p.alpha * 0.5})`);
                grad.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, 40%, 0)`);
                ctx.fillStyle = grad;
                ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                // Recycle when off-screen
                if (p.alpha <= 0 || p.y < -20 || p.x < -40 || p.x > width + 40) {
                    particles[i] = createParticle();
                }
            }

            while (particles.length < COUNT) {
                particles.push(createParticle());
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* Canvas */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0,
                }}
            />

            {/* Deep vintage vignette — dark corners, warm centre */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0,
                    background: `
                        radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(5, 3, 2, 0.65) 100%)
                    `,
                }}
            />

            {/* Top dark shadow — like old parchment edge */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '180px',
                    pointerEvents: 'none',
                    zIndex: 0,
                    background: 'linear-gradient(to bottom, rgba(4, 2, 1, 0.5) 0%, transparent 100%)',
                }}
            />
        </>
    );
}
