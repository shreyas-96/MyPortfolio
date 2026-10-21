'use client';

import React, { useEffect, useRef } from 'react';

interface Particle {
    x: number; y: number; size: number;
    vx: number; vy: number; alpha: number;
    maxAlpha: number; decay: number; hue: number;
    saturation: number; wobble: number; wobbleSpeed: number; life: number;
}

export default function GotBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animId: number;
        let width  = (canvas.width  = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width  = canvas.width  = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        // ── GOLD DUST MOTES ──
        const COUNT = 42;
        const particles: Particle[] = [];

        function createParticle(): Particle {
            const hueOpts = [44, 40, 48, 36, 52];
            const hue = hueOpts[Math.floor(Math.random() * hueOpts.length)];
            return {
                x: Math.random() * width,
                y: height * 0.42 + Math.random() * height * 0.58,
                size: 0.7 + Math.random() * 1.6,
                vx: (Math.random() - 0.5) * 0.20,
                vy: -(0.10 + Math.random() * 0.36),
                alpha: 0,
                maxAlpha: 0.07 + Math.random() * 0.12,
                decay: 0.0007 + Math.random() * 0.001,
                hue,
                saturation: 65 + Math.random() * 20,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.007 + Math.random() * 0.011,
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
            phase += 0.0012;

            // ── BOTTOM WARM GOLD GLOW ──
            const warmG = ctx.createRadialGradient(
                width * 0.5, height * 1.05, 0,
                width * 0.5, height * 1.05, width * 0.72
            );
            warmG.addColorStop(0,   'rgba(160, 118, 30, 0.08)');
            warmG.addColorStop(0.5, 'rgba(100, 72,  16, 0.04)');
            warmG.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmG;
            ctx.fillRect(0, 0, width, height);

            // ── TOP-RIGHT DEEP INDIGO GLOW ──
            const indigoX = width  * 0.88 + Math.cos(phase * 0.7) * 22;
            const indigoY = height * 0.10 + Math.sin(phase * 0.9) * 15;
            const indigoG = ctx.createRadialGradient(indigoX, indigoY, 0, indigoX, indigoY, width * 0.45);
            indigoG.addColorStop(0,   'rgba(32, 42, 100, 0.10)');
            indigoG.addColorStop(0.5, 'rgba(20, 28,  72, 0.05)');
            indigoG.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.fillStyle = indigoG;
            ctx.fillRect(0, 0, width, height);

            // ── LEFT SUBTLE DEEP BLUE ──
            const leftG = ctx.createRadialGradient(
                width * 0.06, height * 0.50, 0,
                width * 0.06, height * 0.50, width * 0.28
            );
            leftG.addColorStop(0, 'rgba(22, 30, 72, 0.07)');
            leftG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = leftG;
            ctx.fillRect(0, 0, width, height);

            // ── HORIZONTAL HAZE ──
            const hazeY = height * 0.58 + Math.sin(phase * 1.2) * 16;
            const hg = ctx.createLinearGradient(0, hazeY - 65, 0, hazeY + 65);
            hg.addColorStop(0,   'transparent');
            hg.addColorStop(0.5, 'rgba(30, 38, 80, 0.018)');
            hg.addColorStop(1,   'transparent');
            ctx.fillStyle = hg;
            ctx.fillRect(0, hazeY - 65, width, 130);

            // ── GOLD DUST MOTES ──
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.14;
                p.y += p.vy;
                p.life++;

                if (p.life < 40) {
                    p.alpha = Math.min(p.maxAlpha, p.alpha + 0.003);
                } else if (p.y < height * 0.06) {
                    p.alpha -= p.decay * 3;
                } else {
                    p.alpha = p.maxAlpha * (0.6 + 0.4 * Math.sin(p.wobble * 0.4));
                }

                ctx.save();
                ctx.beginPath();
                const dg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
                dg.addColorStop(0,   `hsla(${p.hue}, ${p.saturation}%, 78%, ${p.alpha})`);
                dg.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, 58%, ${p.alpha * 0.45})`);
                dg.addColorStop(1,   `hsla(${p.hue}, ${p.saturation}%, 38%, 0)`);
                ctx.fillStyle = dg;
                ctx.arc(p.x, p.y, p.size * 1.9, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                if (p.alpha <= 0 || p.y < -20 || p.x < -40 || p.x > width + 40) {
                    particles[i] = createParticle();
                }
            }

            while (particles.length < COUNT) particles.push(createParticle());

            animId = requestAnimationFrame(render);
        };

        animId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animId);
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                style={{
                    position: 'fixed', top: 0, left: 0,
                    width: '100vw', height: '100vh',
                    pointerEvents: 'none', zIndex: 0,
                }}
            />
            {/* Deep midnight vignette */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '100vh',
                pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse at 50% 52%, transparent 26%, rgba(4, 4, 10, 0.65) 100%)',
            }} />
            {/* Top fade */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '160px',
                pointerEvents: 'none', zIndex: 0,
                background: 'linear-gradient(to bottom, rgba(3, 4, 9, 0.50) 0%, transparent 100%)',
            }} />
        </>
    );
}
