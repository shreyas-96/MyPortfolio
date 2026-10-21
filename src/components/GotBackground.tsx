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

        // ── DRAGON STATE ──
        let dragonX   = -200;               // starts off left edge
        let dragonY   = height * 0.28;
        const dragonSpeed = 0.55;           // slow majestic glide
        let wingPhase = 0;
        let bodyWave  = 0;
        let fireTimer = 0;
        const fireParticles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number; hue: number }[] = [];

        // ── DUST MOTE PARTICLES ──
        const COUNT = 38;
        const particles: Particle[] = [];

        function createParticle(): Particle {
            const hueOpts = [38, 42, 28, 46, 32];
            const hue = hueOpts[Math.floor(Math.random() * hueOpts.length)];
            return {
                x: Math.random() * width,
                y: height * 0.45 + Math.random() * height * 0.55,
                size: 0.7 + Math.random() * 1.6,
                vx: (Math.random() - 0.5) * 0.22,
                vy: -(0.12 + Math.random() * 0.38),
                alpha: 0, maxAlpha: 0.07 + Math.random() * 0.12,
                decay: 0.0007 + Math.random() * 0.001,
                hue, saturation: 55 + Math.random() * 25,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.007 + Math.random() * 0.012,
                life: 0,
            };
        }

        for (let i = 0; i < COUNT; i++) {
            const p = createParticle();
            p.y = Math.random() * height;
            p.alpha = Math.random() * p.maxAlpha;
            particles.push(p);
        }

        // ── DRAW DRAGON ──
        function drawDragon(t: number) {
            if (!ctx) return;

            wingPhase += 0.04;
            bodyWave  += 0.02;
            fireTimer++;

            // Dragon size — scales with viewport
            const scale = Math.min(width, height) * 0.0018;
            const s = scale;

            // Body wave
            const bw = Math.sin(bodyWave) * 6;

            // Wing flap angle — smooth sine
            const wingUp   =  Math.sin(wingPhase) * 0.55;          // upper wing
            const wingDown = -Math.sin(wingPhase) * 0.35;          // lower membrane

            // Move dragon across screen (right to left feel → we go left→right)
            dragonX += dragonSpeed;
            if (dragonX > width + 320) {
                dragonX = -300;
                dragonY = height * (0.18 + Math.random() * 0.22);  // randomise height on re-entry
            }

            // Gentle vertical drift
            dragonY += Math.sin(bodyWave * 0.7) * 0.25;

            const dx = dragonX;
            const dy = dragonY + bw;

            ctx.save();
            ctx.translate(dx, dy);

            // ── FIRE BREATH (every ~160 frames) ──
            if (fireTimer % 160 === 0) {
                for (let i = 0; i < 22; i++) {
                    fireParticles.push({
                        x: dx + 90 * s,
                        y: dy - 10 * s,
                        vx: 1.8 + Math.random() * 3.5,
                        vy: (Math.random() - 0.5) * 1.2,
                        alpha: 0.75 + Math.random() * 0.25,
                        size: 4 + Math.random() * 10,
                        hue: Math.random() > 0.5 ? 32 : 18,   // warm amber / deep orange
                    });
                }
            }

            // ─── TAIL (drawn first — behind body) ───
            ctx.beginPath();
            ctx.moveTo(-60 * s, 8 * s);
            ctx.bezierCurveTo(
                -90 * s, 20 * s + bw,
                -120 * s, 5 * s - bw * 0.5,
                -155 * s, 28 * s + bw * 0.8
            );
            ctx.bezierCurveTo(
                -170 * s, 36 * s,
                -185 * s, 18 * s,
                -195 * s, 35 * s
            );
            ctx.strokeStyle = 'rgba(160, 120, 40, 0.55)';
            ctx.lineWidth = 5 * s;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Tail spikes
            for (let i = 0; i < 4; i++) {
                const tx = (-75 - i * 32) * s;
                const ty = (12 + i * 5 + bw * 0.3) * s;
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(tx - 6 * s, ty + 16 * s);
                ctx.lineTo(tx + 6 * s, ty + 8 * s);
                ctx.closePath();
                ctx.fillStyle = 'rgba(140, 100, 30, 0.45)';
                ctx.fill();
            }

            // ─── UPPER WING ───
            ctx.save();
            ctx.translate(10 * s, -8 * s);
            ctx.rotate(wingUp);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            // Outer leading edge
            ctx.bezierCurveTo(
                20 * s, -60 * s,
                80 * s, -120 * s,
                120 * s, -90 * s
            );
            ctx.bezierCurveTo(
                145 * s, -68 * s,
                120 * s, -30 * s,
                80 * s, -20 * s
            );
            // Wing finger 2
            ctx.bezierCurveTo(
                100 * s, -80 * s,
                130 * s, -100 * s,
                150 * s, -75 * s
            );
            ctx.bezierCurveTo(
                165 * s, -55 * s,
                140 * s, -15 * s,
                90 * s, 0
            );
            // Wing trailing membrane
            ctx.bezierCurveTo(60 * s, 18 * s, 25 * s, 10 * s, 0, 0);
            ctx.closePath();
            const wingGrad = ctx.createLinearGradient(0, -90 * s, 0, 10 * s);
            wingGrad.addColorStop(0, 'rgba(110, 75, 20, 0.62)');
            wingGrad.addColorStop(0.5, 'rgba(90, 55, 12, 0.50)');
            wingGrad.addColorStop(1, 'rgba(70, 40, 8, 0.35)');
            ctx.fillStyle = wingGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(160, 120, 38, 0.40)';
            ctx.lineWidth = 1.2 * s;
            ctx.stroke();
            ctx.restore();

            // ─── LOWER WING ───
            ctx.save();
            ctx.translate(5 * s, 10 * s);
            ctx.rotate(wingDown);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
                20 * s, 40 * s,
                70 * s, 80 * s,
                110 * s, 60 * s
            );
            ctx.bezierCurveTo(
                130 * s, 48 * s,
                115 * s, 20 * s,
                70 * s, 12 * s
            );
            ctx.bezierCurveTo(50 * s, 30 * s, 20 * s, 20 * s, 0, 0);
            ctx.closePath();
            const wingGrad2 = ctx.createLinearGradient(0, 0, 0, 60 * s);
            wingGrad2.addColorStop(0, 'rgba(80, 52, 12, 0.45)');
            wingGrad2.addColorStop(1, 'rgba(55, 32, 5, 0.28)');
            ctx.fillStyle = wingGrad2;
            ctx.fill();
            ctx.strokeStyle = 'rgba(140, 100, 30, 0.30)';
            ctx.lineWidth = 1 * s;
            ctx.stroke();
            ctx.restore();

            // ─── BODY ───
            ctx.beginPath();
            ctx.moveTo(-60 * s, 10 * s);
            ctx.bezierCurveTo(
                -30 * s, -8 * s,
                20 * s, -12 * s,
                55 * s, 0
            );
            ctx.bezierCurveTo(
                70 * s, 6 * s,
                80 * s, 16 * s,
                70 * s, 22 * s
            );
            ctx.bezierCurveTo(
                50 * s, 32 * s,
                -15 * s, 30 * s,
                -60 * s, 18 * s
            );
            ctx.closePath();
            const bodyGrad = ctx.createLinearGradient(0, -12 * s, 0, 28 * s);
            bodyGrad.addColorStop(0, 'rgba(130, 95, 28, 0.72)');
            bodyGrad.addColorStop(0.5, 'rgba(110, 75, 18, 0.65)');
            bodyGrad.addColorStop(1, 'rgba(80, 50, 8, 0.50)');
            ctx.fillStyle = bodyGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(180, 140, 50, 0.35)';
            ctx.lineWidth = 1 * s;
            ctx.stroke();

            // Body ridge spikes
            for (let i = 0; i < 5; i++) {
                const rx = (-40 + i * 20) * s;
                const ry = -11 * s;
                ctx.beginPath();
                ctx.moveTo(rx - 4 * s, ry + 4 * s);
                ctx.lineTo(rx, ry - (10 + i * 1.5) * s);
                ctx.lineTo(rx + 4 * s, ry + 4 * s);
                ctx.closePath();
                ctx.fillStyle = 'rgba(160, 115, 35, 0.50)';
                ctx.fill();
            }

            // ─── NECK ───
            ctx.beginPath();
            ctx.moveTo(55 * s, 5 * s);
            ctx.bezierCurveTo(
                65 * s, -15 * s,
                75 * s, -20 * s,
                85 * s, -15 * s
            );
            ctx.bezierCurveTo(
                90 * s, -8 * s,
                88 * s, 5 * s,
                75 * s, 10 * s
            );
            ctx.closePath();
            ctx.fillStyle = 'rgba(120, 88, 22, 0.65)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(170, 130, 42, 0.30)';
            ctx.lineWidth = 0.8 * s;
            ctx.stroke();

            // ─── HEAD ───
            ctx.beginPath();
            ctx.ellipse(93 * s, -14 * s, 18 * s, 11 * s, -0.22, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(135, 98, 26, 0.72)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(180, 140, 45, 0.32)';
            ctx.lineWidth = 0.8 * s;
            ctx.stroke();

            // Snout / jaw
            ctx.beginPath();
            ctx.moveTo(104 * s, -12 * s);
            ctx.bezierCurveTo(
                118 * s, -14 * s,
                122 * s, -8 * s,
                118 * s, -4 * s
            );
            ctx.bezierCurveTo(
                112 * s, 0, 104 * s, -4 * s, 104 * s, -12 * s
            );
            ctx.fillStyle = 'rgba(120, 85, 20, 0.68)';
            ctx.fill();

            // Nostril
            ctx.beginPath();
            ctx.ellipse(115 * s, -8 * s, 2 * s, 1.2 * s, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(60, 35, 5, 0.6)';
            ctx.fill();

            // Eye — glowing amber
            ctx.beginPath();
            ctx.ellipse(100 * s, -17 * s, 3.5 * s, 2.5 * s, -0.1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(220, 165, 30, 0.90)';
            ctx.shadowColor = 'rgba(255, 180, 0, 0.8)';
            ctx.shadowBlur = 8 * s;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Eye slit pupil
            ctx.beginPath();
            ctx.ellipse(100 * s, -17 * s, 1 * s, 2.2 * s, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(15, 8, 0, 0.95)';
            ctx.fill();

            // Horn
            ctx.beginPath();
            ctx.moveTo(95 * s, -22 * s);
            ctx.lineTo(98 * s, -34 * s);
            ctx.lineTo(100 * s, -22 * s);
            ctx.closePath();
            ctx.fillStyle = 'rgba(170, 130, 40, 0.60)';
            ctx.fill();

            // ─── LEGS (hanging down slightly) ───
            for (let leg = 0; leg < 2; leg++) {
                const lx = (-20 + leg * 45) * s;
                const ly = 20 * s;
                const swing = Math.sin(wingPhase + leg * Math.PI) * 0.15;
                ctx.save();
                ctx.translate(lx, ly);
                ctx.rotate(swing);
                ctx.beginPath();
                ctx.roundRect(-4 * s, 0, 8 * s, 20 * s, 3 * s);
                ctx.fillStyle = 'rgba(100, 68, 14, 0.55)';
                ctx.fill();
                // Claw
                ctx.beginPath();
                ctx.arc(0, 22 * s, 5 * s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(80, 52, 8, 0.50)';
                ctx.fill();
                ctx.restore();
            }

            ctx.restore(); // end dragon translate

            // ── SUBTLE GLOW AROUND DRAGON ──
            const gx = dx;
            const gy = dy;
            const glowR = ctx.createRadialGradient(gx, gy, 0, gx, gy, 140 * s);
            glowR.addColorStop(0, 'rgba(160, 110, 20, 0.06)');
            glowR.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glowR;
            ctx.beginPath();
            ctx.ellipse(gx, gy, 140 * s, 80 * s, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // ── DRAW FIRE PARTICLES ──
        function drawFire() {
            if (!ctx) return;
            for (let i = fireParticles.length - 1; i >= 0; i--) {
                const f = fireParticles[i];
                f.x  += f.vx;
                f.y  += f.vy;
                f.vy += 0.04;
                f.vx *= 0.97;
                f.alpha -= 0.028;
                f.size  *= 0.96;

                if (f.alpha <= 0 || f.size < 0.5) {
                    fireParticles.splice(i, 1);
                    continue;
                }

                const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
                fg.addColorStop(0, `hsla(${f.hue + 10}, 85%, 80%, ${f.alpha})`);
                fg.addColorStop(0.4, `hsla(${f.hue}, 80%, 55%, ${f.alpha * 0.7})`);
                fg.addColorStop(1, `hsla(${f.hue - 10}, 70%, 30%, 0)`);
                ctx.fillStyle = fg;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let phase = 0;

        const render = (timestamp: number) => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            phase += 0.0012;

            // ── VINTAGE WARM ATMOSPHERE ──
            const warmG = ctx.createRadialGradient(width * 0.5, height, 0, width * 0.5, height, width * 0.75);
            warmG.addColorStop(0, 'rgba(150, 95, 25, 0.07)');
            warmG.addColorStop(0.4, 'rgba(110, 65, 15, 0.035)');
            warmG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmG;
            ctx.fillRect(0, 0, width, height);

            // Side glow
            const sideG = ctx.createRadialGradient(width * 0.07, height * 0.55, 0, width * 0.07, height * 0.55, width * 0.32);
            sideG.addColorStop(0, 'rgba(130, 82, 18, 0.05)');
            sideG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = sideG;
            ctx.fillRect(0, 0, width, height);

            // Horizontal haze
            const hazeY = height * 0.6 + Math.sin(phase * 1.2) * 18;
            const hg = ctx.createLinearGradient(0, hazeY - 70, 0, hazeY + 70);
            hg.addColorStop(0, 'transparent');
            hg.addColorStop(0.5, 'rgba(95, 68, 22, 0.012)');
            hg.addColorStop(1, 'transparent');
            ctx.fillStyle = hg;
            ctx.fillRect(0, hazeY - 70, width, 140);

            // Draw dragon + fire
            drawDragon(timestamp);
            drawFire();

            // ── DUST MOTES ──
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.15;
                p.y += p.vy;
                p.life++;

                if (p.life < 40) { p.alpha = Math.min(p.maxAlpha, p.alpha + 0.003); }
                else if (p.y < height * 0.06) { p.alpha -= p.decay * 3; }
                else { p.alpha = p.maxAlpha * (0.65 + 0.35 * Math.sin(p.wobble * 0.5)); }

                ctx.save();
                ctx.beginPath();
                const dg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.2);
                dg.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, 72%, ${p.alpha})`);
                dg.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, 52%, ${p.alpha * 0.45})`);
                dg.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, 38%, 0)`);
                ctx.fillStyle = dg;
                ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
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
            {/* Vintage vignette */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '100vh',
                pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse at 50% 55%, transparent 28%, rgba(5, 3, 1, 0.62) 100%)',
            }} />
            {/* Top shadow */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '170px',
                pointerEvents: 'none', zIndex: 0,
                background: 'linear-gradient(to bottom, rgba(4, 2, 1, 0.48) 0%, transparent 100%)',
            }} />
        </>
    );
}
