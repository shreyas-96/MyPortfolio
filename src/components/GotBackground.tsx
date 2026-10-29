'use client';

import React, { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   MARVEL CINEMATIC BACKGROUND
   Iron Man energy field — crimson & gold particles,
   hexagonal grid, ambient scan lines
───────────────────────────────────────────────────────── */

interface Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    maxAlpha: number;
    hue: number;       // 0 = red, 44 = gold
    life: number;
    maxLife: number;
    type: 'energy' | 'ember';
}

interface GridNode {
    x: number;
    y: number;
    alpha: number;
    pulsePhase: number;
    pulseSpeed: number;
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
            buildGrid();
        };
        window.addEventListener('resize', handleResize);

        // ── HEX GRID ──────────────────────────────────────
        const GRID_SIZE = 72;
        const gridNodes: GridNode[] = [];

        function buildGrid() {
            gridNodes.length = 0;
            const cols = Math.ceil(width  / GRID_SIZE) + 2;
            const rows = Math.ceil(height / GRID_SIZE) + 2;
            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const offset = (r % 2) * (GRID_SIZE / 2);
                    gridNodes.push({
                        x: c * GRID_SIZE + offset - GRID_SIZE,
                        y: r * GRID_SIZE - GRID_SIZE,
                        alpha: 0.015 + Math.random() * 0.03,
                        pulsePhase: Math.random() * Math.PI * 2,
                        pulseSpeed: 0.006 + Math.random() * 0.012,
                    });
                }
            }
        }
        buildGrid();

        // ── ENERGY PARTICLES ──────────────────────────────
        const PARTICLE_COUNT = 55;
        const particles: Particle[] = [];

        function createParticle(warm = false): Particle {
            // Mostly red/orange, occasionally gold
            const isGold = Math.random() < (warm ? 0.55 : 0.22);
            const hue    = isGold ? 40 + Math.random() * 12 : -5 + Math.random() * 10;
            return {
                x:        Math.random() * width,
                y:        Math.random() * height,
                size:     0.6 + Math.random() * 2.2,
                vx:       (Math.random() - 0.5) * 0.22,
                vy:       -(0.12 + Math.random() * 0.36),
                alpha:    0,
                maxAlpha: 0.06 + Math.random() * 0.14,
                hue,
                life:     0,
                maxLife:  180 + Math.floor(Math.random() * 240),
                type:     Math.random() < 0.15 ? 'ember' : 'energy',
            };
        }

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = createParticle();
            p.life = Math.floor(Math.random() * p.maxLife);
            particles.push(p);
        }

        // ── AMBIENT GLOW ORBS ─────────────────────────────
        interface Orb { cx: number; cy: number; r: number; hue: number; phase: number; speed: number; baseAlpha: number; }
        const orbs: Orb[] = [
            { cx: 0.85, cy: 0.08, r: 0.38, hue: 0,  phase: 0,    speed: 0.003, baseAlpha: 0.07 },  // top-right red
            { cx: 0.10, cy: 0.80, r: 0.30, hue: 40, phase: 1.5,  speed: 0.004, baseAlpha: 0.05 },  // bottom-left gold
            { cx: 0.50, cy: 0.50, r: 0.60, hue: 0,  phase: 0.8,  speed: 0.002, baseAlpha: 0.02 },  // centre subtle red
        ];

        // ── SCAN LINES ────────────────────────────────────
        let scanY = -height * 0.3;

        let phase = 0;

        // ── RENDER LOOP ───────────────────────────────────
        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            phase += 0.008;

            // ── Ambient orbs ──
            for (const orb of orbs) {
                orb.phase += orb.speed;
                const pulse = 0.75 + 0.25 * Math.sin(orb.phase);
                const cx = orb.cx * width  + Math.cos(orb.phase * 0.6) * 30;
                const cy = orb.cy * height + Math.sin(orb.phase * 0.8) * 20;
                const r  = orb.r  * width;

                const isRed = orb.hue < 20;
                const inner = isRed ? `rgba(230,36,41,${orb.baseAlpha * pulse})` : `rgba(217,164,65,${orb.baseAlpha * pulse})`;
                const mid   = isRed ? `rgba(180,20,24,${orb.baseAlpha * 0.4 * pulse})` : `rgba(160,120,40,${orb.baseAlpha * 0.3 * pulse})`;

                const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
                grd.addColorStop(0,   inner);
                grd.addColorStop(0.5, mid);
                grd.addColorStop(1,   'transparent');
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, width, height);
            }

            // ── Grid nodes pulse ──
            for (const node of gridNodes) {
                node.pulsePhase += node.pulseSpeed;
                const a = node.alpha * (0.6 + 0.4 * Math.sin(node.pulsePhase));
                ctx.fillStyle = `rgba(217,164,65,${a})`;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
                ctx.fill();
            }

            // ── Energy particles ──
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.life++;
                p.x += p.vx + Math.sin(phase + i * 0.4) * 0.08;
                p.y += p.vy;

                // Fade in/out
                const t = p.life / p.maxLife;
                p.alpha = t < 0.2
                    ? p.maxAlpha * (t / 0.2)
                    : t > 0.75
                        ? p.maxAlpha * ((1 - t) / 0.25)
                        : p.maxAlpha;

                if (p.life >= p.maxLife || p.y < -20 || p.x < -20 || p.x > width + 20) {
                    particles[i] = createParticle();
                    continue;
                }

                const isGold = p.hue > 20;
                const r = isGold ? 217 : 230;
                const g = isGold ? 164 : 36;
                const b = isGold ?  65 : 41;

                if (p.type === 'ember') {
                    // Bright ember dot
                    ctx.save();
                    ctx.globalAlpha = p.alpha * 1.8;
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.shadowColor = `rgba(${r},${g},${b},0.8)`;
                    ctx.shadowBlur  = 6;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else {
                    // Soft glow orb
                    const pg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
                    pg.addColorStop(0,   `rgba(${r},${g},${b},${p.alpha})`);
                    pg.addColorStop(0.5, `rgba(${r},${g},${b},${p.alpha * 0.5})`);
                    pg.addColorStop(1,   'transparent');
                    ctx.fillStyle = pg;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // ── Horizontal scan line ──
            scanY += 0.55;
            if (scanY > height * 1.3) scanY = -height * 0.3;

            const sg = ctx.createLinearGradient(0, scanY - 80, 0, scanY + 80);
            sg.addColorStop(0,    'transparent');
            sg.addColorStop(0.45, `rgba(230,36,41,0.018)`);
            sg.addColorStop(0.5,  `rgba(230,36,41,0.035)`);
            sg.addColorStop(0.55, `rgba(230,36,41,0.018)`);
            sg.addColorStop(1,    'transparent');
            ctx.fillStyle = sg;
            ctx.fillRect(0, scanY - 80, width, 160);

            // ── Bottom warm gold haze ──
            const bh = ctx.createLinearGradient(0, height * 0.72, 0, height);
            bh.addColorStop(0, 'transparent');
            bh.addColorStop(1, `rgba(217,164,65,0.025)`);
            ctx.fillStyle = bh;
            ctx.fillRect(0, height * 0.72, width, height * 0.28);

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
            {/* Deep cinematic vignette */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '100vh',
                pointerEvents: 'none', zIndex: 0,
                background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(4, 6, 14, 0.72) 100%)',
            }} />
            {/* Top navbar fade */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '160px',
                pointerEvents: 'none', zIndex: 0,
                background: 'linear-gradient(to bottom, rgba(8,11,20,0.55) 0%, transparent 100%)',
            }} />
        </>
    );
}
