'use client';

import React, { useEffect, useRef } from 'react';

// ── SNOWFLAKE TYPES ──
interface Snowflake {
    x: number;
    y: number;
    size: number;       // radius in px
    speed: number;      // fall speed
    alpha: number;
    drift: number;      // current horizontal offset angle
    driftSpeed: number; // sine wave speed for drift
    driftAmp: number;   // how far left/right it drifts
    rotation: number;   // for crystal flakes
    rotSpeed: number;
    type: 'dot' | 'crystal'; // small dots vs 6-arm crystals
    twinkle: number;    // twinkle phase
    twinkleSpeed: number;
}

// Dust mote interface (kept for background warmth)
interface Particle {
    x: number; y: number; size: number;
    vx: number; vy: number; alpha: number;
    maxAlpha: number; hue: number;
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

        // ─────────────────────────────────────
        //  SNOWFLAKES
        // ─────────────────────────────────────
        const SNOW_COUNT = 160;
        const snowflakes: Snowflake[] = [];

        function createSnowflake(startFromTop = false): Snowflake {
            const size = Math.random();
            // Size buckets:
            //  0.0–0.55  → tiny dot  (0.8–2.2px)
            //  0.55–0.85 → medium dot (2.2–3.8px)
            //  0.85–1.0  → crystal   (4–7px, draws 6-arm shape)
            let radius: number;
            let type: 'dot' | 'crystal';
            if (size < 0.55) {
                radius = 0.8 + size * 2.5;
                type   = 'dot';
            } else if (size < 0.85) {
                radius = 2.2 + (size - 0.55) * 5;
                type   = 'dot';
            } else {
                radius = 4 + (size - 0.85) * 20;
                type   = 'crystal';
            }

            // Larger flakes fall faster and are more opaque — parallax depth feel
            const speed = 0.28 + radius * 0.22 + Math.random() * 0.35;
            const alpha = 0.18 + radius * 0.06 + Math.random() * 0.25;

            return {
                x: Math.random() * (width + 40) - 20,
                y: startFromTop ? -radius - Math.random() * height * 0.5 : Math.random() * height,
                size: radius,
                speed,
                alpha: Math.min(alpha, 0.85),
                drift: Math.random() * Math.PI * 2,
                driftSpeed: 0.004 + Math.random() * 0.008,
                driftAmp:   0.2 + Math.random() * 0.6,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed:  (Math.random() - 0.5) * 0.012,
                type,
                twinkle: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.025 + Math.random() * 0.045,
            };
        }

        // Initialise snowflakes scattered across full screen
        for (let i = 0; i < SNOW_COUNT; i++) {
            snowflakes.push(createSnowflake(false));
        }

        // Draw a 6-armed snowflake crystal
        function drawCrystal(x: number, y: number, r: number, rot: number, alpha: number) {
            if (!ctx) return;
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(rot);
            ctx.globalAlpha = alpha;

            const arms = 6;
            for (let i = 0; i < arms; i++) {
                const angle = (Math.PI * 2 / arms) * i;
                ctx.save();
                ctx.rotate(angle);

                // Main arm
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(0, -r);
                ctx.strokeStyle = 'rgba(210, 230, 255, 1)';
                ctx.lineWidth   = Math.max(0.5, r * 0.14);
                ctx.lineCap     = 'round';
                ctx.stroke();

                // Two side branches at 60% and 80% of arm length
                [0.55, 0.78].forEach(frac => {
                    const branchLen = r * 0.38;
                    const branchY   = -r * frac;
                    ctx.beginPath();
                    ctx.moveTo(0, branchY);
                    ctx.lineTo( branchLen * 0.70, branchY - branchLen * 0.70);
                    ctx.strokeStyle = 'rgba(200, 225, 255, 0.85)';
                    ctx.lineWidth   = Math.max(0.4, r * 0.09);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.moveTo(0, branchY);
                    ctx.lineTo(-branchLen * 0.70, branchY - branchLen * 0.70);
                    ctx.stroke();
                });

                ctx.restore();
            }

            // Centre dot
            ctx.beginPath();
            ctx.arc(0, 0, r * 0.16, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(220, 240, 255, 0.9)';
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.restore();
        }

        // Draw a simple circular snowdot with soft glow
        function drawDot(x: number, y: number, r: number, alpha: number) {
            if (!ctx) return;
            const grd = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
            grd.addColorStop(0,   `rgba(230, 242, 255, ${alpha})`);
            grd.addColorStop(0.4, `rgba(210, 232, 255, ${alpha * 0.65})`);
            grd.addColorStop(1,   `rgba(190, 220, 255, 0)`);
            ctx.fillStyle = grd;
            ctx.beginPath();
            ctx.arc(x, y, r * 2.0, 0, Math.PI * 2);
            ctx.fill();
        }

        // ─────────────────────────────────────
        //  WARM GOLD DUST MOTES (background depth)
        // ─────────────────────────────────────
        const DUST_COUNT = 28;
        const dustMotes: Particle[] = [];

        function createDust(): Particle {
            const hueOpts = [44, 40, 48, 36, 52];
            return {
                x: Math.random() * width,
                y: height * 0.45 + Math.random() * height * 0.55,
                size: 0.6 + Math.random() * 1.4,
                vx: (Math.random() - 0.5) * 0.18,
                vy: -(0.08 + Math.random() * 0.30),
                alpha: Math.random() * 0.08,
                maxAlpha: 0.04 + Math.random() * 0.08,
                hue: hueOpts[Math.floor(Math.random() * hueOpts.length)],
                saturation: 65 + Math.random() * 20,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.006 + Math.random() * 0.01,
                life: Math.floor(Math.random() * 200),
            };
        }

        for (let i = 0; i < DUST_COUNT; i++) dustMotes.push(createDust());

        let phase = 0;

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            phase += 0.001;

            // ── ATMOSPHERIC GLOWS ──

            // Bottom warm gold
            const warmG = ctx.createRadialGradient(width * 0.5, height * 1.05, 0, width * 0.5, height * 1.05, width * 0.72);
            warmG.addColorStop(0,   'rgba(160, 118, 30, 0.07)');
            warmG.addColorStop(0.5, 'rgba(100, 72,  16, 0.035)');
            warmG.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.fillStyle = warmG;
            ctx.fillRect(0, 0, width, height);

            // Top-right deep indigo (night sky)
            const ix = width  * 0.88 + Math.cos(phase * 0.7) * 20;
            const iy = height * 0.10 + Math.sin(phase * 0.9) * 14;
            const indigoG = ctx.createRadialGradient(ix, iy, 0, ix, iy, width * 0.45);
            indigoG.addColorStop(0,   'rgba(32, 42, 100, 0.09)');
            indigoG.addColorStop(0.5, 'rgba(20, 28,  72, 0.04)');
            indigoG.addColorStop(1,   'rgba(0, 0, 0, 0)');
            ctx.fillStyle = indigoG;
            ctx.fillRect(0, 0, width, height);

            // Left deep blue
            const leftG = ctx.createRadialGradient(width * 0.06, height * 0.50, 0, width * 0.06, height * 0.50, width * 0.28);
            leftG.addColorStop(0, 'rgba(22, 30, 72, 0.06)');
            leftG.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = leftG;
            ctx.fillRect(0, 0, width, height);

            // Horizontal haze
            const hazeY = height * 0.58 + Math.sin(phase * 1.2) * 16;
            const hg    = ctx.createLinearGradient(0, hazeY - 65, 0, hazeY + 65);
            hg.addColorStop(0,   'transparent');
            hg.addColorStop(0.5, 'rgba(30, 38, 80, 0.015)');
            hg.addColorStop(1,   'transparent');
            ctx.fillStyle = hg;
            ctx.fillRect(0, hazeY - 65, width, 130);

            // ── GOLD DUST MOTES ──
            for (let i = dustMotes.length - 1; i >= 0; i--) {
                const p = dustMotes[i];
                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.12;
                p.y += p.vy;
                p.life++;
                p.alpha = p.maxAlpha * (0.55 + 0.45 * Math.sin(p.wobble * 0.5));

                ctx.save();
                ctx.beginPath();
                const dg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                dg.addColorStop(0,   `hsla(${p.hue}, ${p.saturation}%, 76%, ${p.alpha})`);
                dg.addColorStop(1,   `hsla(${p.hue}, ${p.saturation}%, 40%, 0)`);
                ctx.fillStyle = dg;
                ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();

                if (p.y < -20 || p.x < -40 || p.x > width + 40) {
                    dustMotes[i] = createDust();
                }
            }

            // ─────────────────────────────────
            //  SNOWFALL
            // ─────────────────────────────────
            for (let i = 0; i < snowflakes.length; i++) {
                const sf = snowflakes[i];

                // Move
                sf.drift    += sf.driftSpeed;
                sf.rotation += sf.rotSpeed;
                sf.twinkle  += sf.twinkleSpeed;

                sf.y += sf.speed;
                sf.x += Math.sin(sf.drift) * sf.driftAmp;

                // Twinkle — alpha breathes gently
                const twinkleFactor = 0.78 + 0.22 * Math.sin(sf.twinkle);
                const drawAlpha     = sf.alpha * twinkleFactor;

                // Draw
                if (sf.type === 'crystal') {
                    drawCrystal(sf.x, sf.y, sf.size, sf.rotation, drawAlpha);
                } else {
                    drawDot(sf.x, sf.y, sf.size, drawAlpha);
                }

                // Recycle when off-screen
                if (sf.y > height + sf.size + 5) {
                    const fresh = createSnowflake(true);
                    // Reset to top
                    fresh.y = -fresh.size - Math.random() * 30;
                    snowflakes[i] = fresh;
                }
                // Wrap horizontal
                if (sf.x < -sf.size - 20) sf.x = width + sf.size;
                if (sf.x > width + sf.size + 20) sf.x = -sf.size;
            }

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
                background: 'radial-gradient(ellipse at 50% 50%, transparent 24%, rgba(4, 4, 10, 0.65) 100%)',
            }} />
            {/* Top fade */}
            <div style={{
                position: 'fixed', top: 0, left: 0,
                width: '100vw', height: '160px',
                pointerEvents: 'none', zIndex: 0,
                background: 'linear-gradient(to bottom, rgba(3, 4, 9, 0.48) 0%, transparent 100%)',
            }} />
        </>
    );
}
