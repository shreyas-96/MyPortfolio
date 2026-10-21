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
        let dragonX   = -260;
        let dragonY   = height * 0.24;
        const dragonSpeed = 0.52;
        let wingPhase = 0;
        let bodyWave  = 0;
        let fireTimer = 0;

        // Fire breath particles
        const fireParticles: {
            x: number; y: number; vx: number; vy: number;
            alpha: number; size: number; hue: number;
        }[] = [];

        // ── DUST MOTE PARTICLES (gold-tinted) ──
        const COUNT = 40;
        const particles: Particle[] = [];

        function createParticle(): Particle {
            // Royal gold / warm amber hues for dust motes
            const hueOpts = [44, 40, 48, 36, 52];
            const hue = hueOpts[Math.floor(Math.random() * hueOpts.length)];
            return {
                x: Math.random() * width,
                y: height * 0.42 + Math.random() * height * 0.58,
                size: 0.7 + Math.random() * 1.5,
                vx: (Math.random() - 0.5) * 0.2,
                vy: -(0.10 + Math.random() * 0.35),
                alpha: 0,
                maxAlpha: 0.06 + Math.random() * 0.11,
                decay: 0.0006 + Math.random() * 0.001,
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

        // ─────────────────────────────────────
        // DRAW DRAGON — Midnight Blue + Royal Gold
        // ─────────────────────────────────────
        function drawDragon() {
            if (!ctx) return;

            wingPhase += 0.038;
            bodyWave  += 0.018;
            fireTimer++;

            const scale = Math.min(width, height) * 0.0019;
            const s = scale;

            const bw = Math.sin(bodyWave) * 5.5;
            const wingUp   =  Math.sin(wingPhase) * 0.52;
            const wingDown = -Math.sin(wingPhase) * 0.32;

            // Advance dragon position
            dragonX += dragonSpeed;
            if (dragonX > width + 340) {
                dragonX = -280;
                dragonY = height * (0.15 + Math.random() * 0.25);
            }
            dragonY += Math.sin(bodyWave * 0.65) * 0.22;

            const dx = dragonX;
            const dy = dragonY + bw;

            // Fire breath burst every ~155 frames
            if (fireTimer % 155 === 0) {
                for (let i = 0; i < 28; i++) {
                    fireParticles.push({
                        x: dx + 92 * s,
                        y: dy - 9 * s,
                        vx: 1.6 + Math.random() * 4.0,
                        vy: (Math.random() - 0.5) * 1.4,
                        alpha: 0.80 + Math.random() * 0.20,
                        size: 5 + Math.random() * 12,
                        // Gold fire: hue 42–52 (amber-gold range)
                        hue: 42 + Math.random() * 12,
                    });
                }
            }

            ctx.save();
            ctx.translate(dx, dy);

            // ─── TAIL ───
            ctx.beginPath();
            ctx.moveTo(-62 * s, 8 * s);
            ctx.bezierCurveTo(-92 * s, 22 * s + bw, -122 * s, 4 * s - bw * 0.4, -158 * s, 28 * s + bw * 0.7);
            ctx.bezierCurveTo(-172 * s, 37 * s, -188 * s, 18 * s, -198 * s, 36 * s);
            ctx.strokeStyle = 'rgba(50, 58, 95, 0.65)';
            ctx.lineWidth = 5.5 * s;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Tail gold edge
            ctx.beginPath();
            ctx.moveTo(-62 * s, 8 * s);
            ctx.bezierCurveTo(-92 * s, 22 * s + bw, -122 * s, 4 * s - bw * 0.4, -158 * s, 28 * s + bw * 0.7);
            ctx.strokeStyle = 'rgba(185, 145, 55, 0.22)';
            ctx.lineWidth = 1 * s;
            ctx.stroke();

            // Tail spikes — gold-tipped
            for (let i = 0; i < 4; i++) {
                const tx = (-77 - i * 30) * s;
                const ty = (10 + i * 5 + bw * 0.25) * s;
                ctx.beginPath();
                ctx.moveTo(tx, ty);
                ctx.lineTo(tx - 5 * s, ty + 14 * s);
                ctx.lineTo(tx + 5 * s, ty + 7 * s);
                ctx.closePath();
                // Gold-tipped midnight spikes
                const spikeG = ctx.createLinearGradient(tx, ty, tx, ty + 14 * s);
                spikeG.addColorStop(0, 'rgba(201, 168, 76, 0.55)');
                spikeG.addColorStop(1, 'rgba(30, 36, 65, 0.50)');
                ctx.fillStyle = spikeG;
                ctx.fill();
            }

            // ─── UPPER WING ───
            ctx.save();
            ctx.translate(12 * s, -9 * s);
            ctx.rotate(wingUp);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(22 * s, -62 * s,  82 * s, -125 * s, 122 * s, -92 * s);
            ctx.bezierCurveTo(148 * s, -70 * s, 122 * s, -28 * s,  82 * s, -18 * s);
            ctx.bezierCurveTo(105 * s, -82 * s, 135 * s, -105 * s, 155 * s, -78 * s);
            ctx.bezierCurveTo(168 * s, -56 * s, 142 * s, -12 * s,  92 * s,  2 * s);
            ctx.bezierCurveTo(62 * s, 18 * s, 26 * s, 10 * s, 0, 0);
            ctx.closePath();
            // Deep midnight-indigo wing membrane with gold tint edge
            const wingGrad = ctx.createLinearGradient(0, -95 * s, 80 * s, 5 * s);
            wingGrad.addColorStop(0,   'rgba(28, 34, 68, 0.72)');
            wingGrad.addColorStop(0.4, 'rgba(22, 28, 56, 0.60)');
            wingGrad.addColorStop(0.8, 'rgba(18, 22, 45, 0.48)');
            wingGrad.addColorStop(1,   'rgba(14, 16, 34, 0.35)');
            ctx.fillStyle = wingGrad;
            ctx.fill();
            // Gold wing outline
            ctx.strokeStyle = 'rgba(185, 148, 58, 0.45)';
            ctx.lineWidth = 1.2 * s;
            ctx.stroke();
            // Wing vein lines
            const veins = [
                [0, 0, 60 * s, -80 * s],
                [10 * s, -5 * s, 90 * s, -65 * s],
                [20 * s, -8 * s, 110 * s, -50 * s],
            ];
            veins.forEach(([x1, y1, x2, y2]) => {
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = 'rgba(201, 168, 76, 0.18)';
                ctx.lineWidth = 0.5 * s;
                ctx.stroke();
            });
            ctx.restore();

            // ─── LOWER WING ───
            ctx.save();
            ctx.translate(6 * s, 11 * s);
            ctx.rotate(wingDown);
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(22 * s, 42 * s,  72 * s, 85 * s, 115 * s, 62 * s);
            ctx.bezierCurveTo(135 * s, 50 * s, 118 * s, 20 * s,  72 * s, 12 * s);
            ctx.bezierCurveTo(52 * s, 32 * s, 22 * s, 20 * s, 0, 0);
            ctx.closePath();
            const wingGrad2 = ctx.createLinearGradient(0, 0, 55 * s, 65 * s);
            wingGrad2.addColorStop(0, 'rgba(25, 30, 60, 0.55)');
            wingGrad2.addColorStop(1, 'rgba(15, 18, 38, 0.30)');
            ctx.fillStyle = wingGrad2;
            ctx.fill();
            ctx.strokeStyle = 'rgba(175, 138, 50, 0.35)';
            ctx.lineWidth = 1 * s;
            ctx.stroke();
            ctx.restore();

            // ─── BODY ───
            ctx.beginPath();
            ctx.moveTo(-62 * s, 10 * s);
            ctx.bezierCurveTo(-32 * s, -9 * s, 18 * s, -14 * s, 56 * s, -1 * s);
            ctx.bezierCurveTo( 72 * s,  6 * s, 82 * s, 18 * s, 72 * s,  24 * s);
            ctx.bezierCurveTo( 52 * s, 34 * s,-14 * s, 32 * s,-62 * s,  18 * s);
            ctx.closePath();
            const bodyGrad = ctx.createLinearGradient(0, -14 * s, 0, 30 * s);
            bodyGrad.addColorStop(0,   'rgba(42, 50, 88, 0.85)');  // midnight blue top
            bodyGrad.addColorStop(0.5, 'rgba(35, 42, 75, 0.78)');
            bodyGrad.addColorStop(1,   'rgba(22, 26, 50, 0.65)');  // deep bottom
            ctx.fillStyle = bodyGrad;
            ctx.fill();
            // Gold body outline
            ctx.strokeStyle = 'rgba(195, 158, 62, 0.38)';
            ctx.lineWidth = 1.1 * s;
            ctx.stroke();

            // Scale shimmer highlight — subtle blue sheen across body
            ctx.beginPath();
            ctx.moveTo(-50 * s, -4 * s);
            ctx.bezierCurveTo(-20 * s, -12 * s, 20 * s, -13 * s, 50 * s, -5 * s);
            ctx.strokeStyle = 'rgba(100, 130, 220, 0.12)';
            ctx.lineWidth = 5 * s;
            ctx.stroke();

            // Body ridge spikes — gold-tipped
            for (let i = 0; i < 5; i++) {
                const rx = (-42 + i * 20) * s;
                const ry = -13 * s;
                ctx.beginPath();
                ctx.moveTo(rx - 4 * s, ry + 5 * s);
                ctx.lineTo(rx, ry - (11 + i * 1.5) * s);
                ctx.lineTo(rx + 4 * s, ry + 5 * s);
                ctx.closePath();
                const spikeGrad = ctx.createLinearGradient(rx, ry - 12 * s, rx, ry + 5 * s);
                spikeGrad.addColorStop(0, 'rgba(212, 175, 70, 0.70)');
                spikeGrad.addColorStop(1, 'rgba(38, 46, 82, 0.55)');
                ctx.fillStyle = spikeGrad;
                ctx.fill();
            }

            // ─── NECK ───
            ctx.beginPath();
            ctx.moveTo(56 * s, 5 * s);
            ctx.bezierCurveTo(66 * s, -16 * s, 76 * s, -22 * s, 87 * s, -16 * s);
            ctx.bezierCurveTo(92 * s,  -8 * s, 90 * s,   5 * s, 77 * s,  11 * s);
            ctx.closePath();
            const neckGrad = ctx.createLinearGradient(56 * s, -10 * s, 90 * s, 10 * s);
            neckGrad.addColorStop(0, 'rgba(42, 50, 88, 0.82)');
            neckGrad.addColorStop(1, 'rgba(30, 36, 65, 0.68)');
            ctx.fillStyle = neckGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(185, 148, 58, 0.30)';
            ctx.lineWidth = 0.8 * s;
            ctx.stroke();

            // ─── HEAD ───
            ctx.beginPath();
            ctx.ellipse(94 * s, -15 * s, 19 * s, 12 * s, -0.20, 0, Math.PI * 2);
            const headGrad = ctx.createRadialGradient(90 * s, -18 * s, 2 * s, 94 * s, -14 * s, 19 * s);
            headGrad.addColorStop(0, 'rgba(55, 65, 105, 0.88)');
            headGrad.addColorStop(1, 'rgba(32, 38, 72, 0.78)');
            ctx.fillStyle = headGrad;
            ctx.fill();
            ctx.strokeStyle = 'rgba(195, 158, 62, 0.38)';
            ctx.lineWidth = 0.9 * s;
            ctx.stroke();

            // Snout / jaw
            ctx.beginPath();
            ctx.moveTo(106 * s, -13 * s);
            ctx.bezierCurveTo(120 * s, -15 * s, 124 * s, -8 * s, 120 * s, -4 * s);
            ctx.bezierCurveTo(114 * s,  0 * s,  106 * s, -4 * s, 106 * s, -13 * s);
            ctx.fillStyle = 'rgba(40, 48, 84, 0.80)';
            ctx.fill();
            ctx.strokeStyle = 'rgba(185, 148, 58, 0.28)';
            ctx.lineWidth = 0.7 * s;
            ctx.stroke();

            // Nostril
            ctx.beginPath();
            ctx.ellipse(117 * s, -9 * s, 1.8 * s, 1.1 * s, 0.3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(15, 18, 35, 0.80)';
            ctx.fill();

            // ─── EYE — vivid royal gold with glow ───
            // Outer glow ring
            ctx.beginPath();
            ctx.ellipse(101 * s, -18 * s, 5 * s, 3.8 * s, -0.1, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(201, 168, 76, 0.18)';
            ctx.shadowColor  = 'rgba(220, 185, 60, 0.90)';
            ctx.shadowBlur   = 14 * s;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Iris — vivid amber
            ctx.beginPath();
            ctx.ellipse(101 * s, -18 * s, 3.5 * s, 2.6 * s, -0.1, 0, Math.PI * 2);
            ctx.fillStyle = '#D4B040';
            ctx.shadowColor = 'rgba(255, 210, 60, 0.95)';
            ctx.shadowBlur  = 10 * s;
            ctx.fill();
            ctx.shadowBlur = 0;

            // Pupil — vertical slit
            ctx.beginPath();
            ctx.ellipse(101 * s, -18 * s, 0.9 * s, 2.4 * s, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(5, 5, 12, 0.98)';
            ctx.fill();

            // ─── HORN — gold gradient ───
            ctx.beginPath();
            ctx.moveTo(96 * s, -24 * s);
            ctx.lineTo(99 * s, -38 * s);
            ctx.lineTo(102 * s, -24 * s);
            ctx.closePath();
            const hornG = ctx.createLinearGradient(96 * s, -38 * s, 102 * s, -24 * s);
            hornG.addColorStop(0, 'rgba(220, 180, 65, 0.80)');
            hornG.addColorStop(1, 'rgba(140, 110, 35, 0.55)');
            ctx.fillStyle = hornG;
            ctx.fill();

            // ─── LEGS ───
            for (let leg = 0; leg < 2; leg++) {
                const lx = (-22 + leg * 44) * s;
                const ly = 20 * s;
                const swing = Math.sin(wingPhase + leg * Math.PI) * 0.14;
                ctx.save();
                ctx.translate(lx, ly);
                ctx.rotate(swing);
                ctx.beginPath();
                ctx.roundRect(-4 * s, 0, 8 * s, 20 * s, 3 * s);
                const legG = ctx.createLinearGradient(0, 0, 0, 20 * s);
                legG.addColorStop(0, 'rgba(42, 50, 88, 0.70)');
                legG.addColorStop(1, 'rgba(28, 33, 60, 0.55)');
                ctx.fillStyle = legG;
                ctx.fill();
                // Gold claw tip
                ctx.beginPath();
                ctx.arc(0, 22 * s, 4.5 * s, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(185, 148, 55, 0.55)';
                ctx.fill();
                ctx.restore();
            }

            ctx.restore();

            // ── DRAGON AMBIENT GLOW ──
            const glowR = ctx.createRadialGradient(dx, dy, 0, dx, dy, 150 * s);
            glowR.addColorStop(0, 'rgba(40, 50, 100, 0.07)');
            glowR.addColorStop(0.5, 'rgba(201, 168, 76, 0.025)');
            glowR.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glowR;
            ctx.beginPath();
            ctx.ellipse(dx, dy, 150 * s, 85 * s, 0, 0, Math.PI * 2);
            ctx.fill();
        }

        // ── FIRE PARTICLES ──
        function drawFire() {
            if (!ctx) return;
            for (let i = fireParticles.length - 1; i >= 0; i--) {
                const f = fireParticles[i];
                f.x += f.vx;
                f.y += f.vy;
                f.vy += 0.035;
                f.vx *= 0.975;
                f.alpha -= 0.025;
                f.size  *= 0.965;

                if (f.alpha <= 0 || f.size < 0.5) { fireParticles.splice(i, 1); continue; }

                const fg = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.size);
                // Gold fire — bright amber core, warm orange edge
                fg.addColorStop(0,   `hsla(${f.hue + 8},  95%, 88%, ${f.alpha})`);
                fg.addColorStop(0.35,`hsla(${f.hue},      90%, 68%, ${f.alpha * 0.75})`);
                fg.addColorStop(0.7, `hsla(${f.hue - 12}, 80%, 45%, ${f.alpha * 0.40})`);
                fg.addColorStop(1,   `hsla(${f.hue - 20}, 70%, 28%, 0)`);
                ctx.fillStyle = fg;
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        let phase = 0;

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            phase += 0.0012;

            // ── ATMOSPHERIC GLOWS ──

            // Bottom warm gold — candlelight from below
            const warmG = ctx.createRadialGradient(width * 0.5, height * 1.05, 0, width * 0.5, height * 1.05, width * 0.72);
            warmG.addColorStop(0, 'rgba(160, 118, 30, 0.08)');
            warmG.addColorStop(0.5,'rgba(100, 72, 16, 0.04)');
            warmG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmG;
            ctx.fillRect(0, 0, width, height);

            // Top-right deep indigo — night sky depth
            const indigoX = width * 0.88 + Math.cos(phase * 0.7) * 22;
            const indigoY = height * 0.10 + Math.sin(phase * 0.9) * 15;
            const indigoG = ctx.createRadialGradient(indigoX, indigoY, 0, indigoX, indigoY, width * 0.45);
            indigoG.addColorStop(0, 'rgba(32, 42, 100, 0.10)');
            indigoG.addColorStop(0.5,'rgba(20, 28, 72, 0.05)');
            indigoG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = indigoG;
            ctx.fillRect(0, 0, width, height);

            // Left side subtle deep blue
            const leftG = ctx.createRadialGradient(width * 0.06, height * 0.5, 0, width * 0.06, height * 0.5, width * 0.28);
            leftG.addColorStop(0, 'rgba(22, 30, 72, 0.07)');
            leftG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = leftG;
            ctx.fillRect(0, 0, width, height);

            // Subtle horizontal haze
            const hazeY = height * 0.58 + Math.sin(phase * 1.2) * 16;
            const hg = ctx.createLinearGradient(0, hazeY - 65, 0, hazeY + 65);
            hg.addColorStop(0, 'transparent');
            hg.addColorStop(0.5, 'rgba(30, 38, 80, 0.018)');
            hg.addColorStop(1, 'transparent');
            ctx.fillStyle = hg;
            ctx.fillRect(0, hazeY - 65, width, 130);

            // Draw dragon + fire
            drawDragon();
            drawFire();

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
                dg.addColorStop(0, `hsla(${p.hue}, ${p.saturation}%, 78%, ${p.alpha})`);
                dg.addColorStop(0.5, `hsla(${p.hue}, ${p.saturation}%, 58%, ${p.alpha * 0.45})`);
                dg.addColorStop(1, `hsla(${p.hue}, ${p.saturation}%, 38%, 0)`);
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
            {/* Vignette — deep midnight corners */}
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
