'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Flame, Snowflake, Sparkles } from 'lucide-react';

type GotThemeMode = 'all' | 'fire' | 'ice';

interface Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    maxAlpha: number;
    decay: number;
    type: 'ember' | 'frost';
    hue: number;
    wobble: number;
    wobbleSpeed: number;
    life: number;
}

export default function GotBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [mode, setMode] = useState<GotThemeMode>('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });
    const modeRef = useRef<GotThemeMode>('all');

    useEffect(() => {
        modeRef.current = mode;
    }, [mode]);

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

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Particle pool
        const COUNT = 110;
        const particles: Particle[] = [];

        function createParticle(forceType?: 'ember' | 'frost'): Particle {
            const m = modeRef.current;
            const chosenType: 'ember' | 'frost' =
                forceType ||
                (m === 'fire' ? 'ember' : m === 'ice' ? 'frost' : Math.random() > 0.45 ? 'ember' : 'frost');

            const isEmber = chosenType === 'ember';
            const x = Math.random() * width;
            const y = isEmber ? height + Math.random() * 40 : -20 - Math.random() * 40;
            const maxAlpha = isEmber ? 0.55 + Math.random() * 0.45 : 0.4 + Math.random() * 0.5;

            return {
                x,
                y,
                size: isEmber ? 1.8 + Math.random() * 3 : 1.4 + Math.random() * 2.8,
                vx: (Math.random() - 0.5) * 1.0,
                vy: isEmber ? -(1.0 + Math.random() * 2.0) : 0.7 + Math.random() * 1.8,
                alpha: 0.05,
                maxAlpha,
                decay: 0.002 + Math.random() * 0.004,
                type: chosenType,
                hue: isEmber
                    ? Math.random() > 0.6 ? 42 : Math.random() > 0.3 ? 22 : 6
                    : Math.random() > 0.5 ? 195 : 215,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.025 + Math.random() * 0.035,
                life: 0,
            };
        }

        for (let i = 0; i < COUNT; i++) {
            const p = createParticle();
            p.y = Math.random() * height;
            particles.push(p);
        }

        let mistPhase = 0;

        const render = (timestamp: number) => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);
            mistPhase += 0.004;

            const m = modeRef.current;

            // ── FIRE GLOW (bottom left area) ──
            if (m === 'all' || m === 'fire') {
                const fx = width * 0.28 + Math.sin(mistPhase) * 70;
                const fy = height * 0.8 + Math.cos(mistPhase) * 50;
                const fg = ctx.createRadialGradient(fx, fy, 10, fx, fy, width * 0.6);
                fg.addColorStop(0, 'rgba(255, 100, 0, 0.18)');
                fg.addColorStop(0.35, 'rgba(212, 175, 55, 0.09)');
                fg.addColorStop(0.7, 'rgba(180, 60, 0, 0.04)');
                fg.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = fg;
                ctx.fillRect(0, 0, width, height);

                // Secondary fire pulse
                const fx2 = width * 0.15 + Math.cos(mistPhase * 1.3) * 50;
                const fy2 = height * 0.65;
                const fg2 = ctx.createRadialGradient(fx2, fy2, 5, fx2, fy2, width * 0.35);
                fg2.addColorStop(0, 'rgba(255, 80, 0, 0.12)');
                fg2.addColorStop(1, 'transparent');
                ctx.fillStyle = fg2;
                ctx.fillRect(0, 0, width, height);
            }

            // ── ICE GLOW (top right area) ──
            if (m === 'all' || m === 'ice') {
                const ix = width * 0.78 + Math.cos(mistPhase * 0.9) * 70;
                const iy = height * 0.18 + Math.sin(mistPhase * 0.9) * 45;
                const ig = ctx.createRadialGradient(ix, iy, 10, ix, iy, width * 0.6);
                ig.addColorStop(0, 'rgba(0, 230, 255, 0.16)');
                ig.addColorStop(0.4, 'rgba(60, 130, 220, 0.08)');
                ig.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = ig;
                ctx.fillRect(0, 0, width, height);

                // Secondary ice shimmer
                const ix2 = width * 0.9 + Math.sin(mistPhase * 1.1) * 40;
                const iy2 = height * 0.35;
                const ig2 = ctx.createRadialGradient(ix2, iy2, 5, ix2, iy2, width * 0.3);
                ig2.addColorStop(0, 'rgba(0, 180, 255, 0.1)');
                ig2.addColorStop(1, 'transparent');
                ctx.fillStyle = ig2;
                ctx.fillRect(0, 0, width, height);
            }

            // ── MIST BANDS ──
            for (let band = 0; band < 3; band++) {
                const bandY = height * (0.55 + band * 0.15) + Math.sin(mistPhase + band) * 30;
                const mg = ctx.createLinearGradient(0, bandY - 60, 0, bandY + 60);
                mg.addColorStop(0, 'transparent');
                if (m === 'ice') {
                    mg.addColorStop(0.5, 'rgba(100, 180, 220, 0.03)');
                } else if (m === 'fire') {
                    mg.addColorStop(0.5, 'rgba(180, 80, 20, 0.03)');
                } else {
                    mg.addColorStop(0.5, 'rgba(120, 140, 180, 0.025)');
                }
                mg.addColorStop(1, 'transparent');
                ctx.fillStyle = mg;
                ctx.fillRect(0, bandY - 60, width, 120);
            }

            // ── PARTICLES ──
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];

                // Enforce mode filter
                if (m === 'fire' && p.type === 'frost') { particles[i] = createParticle('ember'); continue; }
                if (m === 'ice' && p.type === 'ember') { particles[i] = createParticle('frost'); continue; }

                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.6;
                p.y += p.vy;
                p.life++;

                // Fade in then out
                if (p.life < 20) {
                    p.alpha = Math.min(p.maxAlpha, p.alpha + 0.04);
                } else if (p.y < height * 0.15 || p.y > height * 0.85) {
                    p.alpha -= p.decay * 2;
                } else if (p.alpha < p.maxAlpha) {
                    p.alpha += 0.015;
                }

                // Mouse repulsion
                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        const force = (1 - dist / 150) * 2.5;
                        p.x += (dx / dist) * force;
                        p.y += (dy / dist) * force;
                        p.alpha = Math.min(1, p.alpha + 0.12);
                    }
                }

                // Draw particle
                ctx.save();
                ctx.beginPath();

                if (p.type === 'ember') {
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                    grad.addColorStop(0, `hsla(${p.hue}, 100%, 82%, ${p.alpha})`);
                    grad.addColorStop(0.4, `hsla(${p.hue}, 95%, 60%, ${p.alpha * 0.65})`);
                    grad.addColorStop(1, `hsla(${p.hue}, 90%, 40%, 0)`);
                    ctx.fillStyle = grad;
                    ctx.shadowColor = `hsl(${p.hue}, 100%, 65%)`;
                    ctx.shadowBlur = 12;
                    ctx.arc(p.x, p.y, p.size * 2.8, 0, Math.PI * 2);
                } else {
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
                    grad.addColorStop(0, `hsla(${p.hue}, 90%, 92%, ${p.alpha})`);
                    grad.addColorStop(0.5, `hsla(${p.hue}, 85%, 72%, ${p.alpha * 0.55})`);
                    grad.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
                    ctx.fillStyle = grad;
                    ctx.shadowColor = `hsl(${p.hue}, 90%, 80%)`;
                    ctx.shadowBlur = 10;
                    ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
                }

                ctx.fill();
                ctx.restore();

                // Recycle
                if (
                    p.alpha <= 0 ||
                    (p.type === 'ember' && p.y < -30) ||
                    (p.type === 'frost' && p.y > height + 30) ||
                    p.x < -50 || p.x > width + 50
                ) {
                    particles[i] = createParticle();
                }
            }

            // Keep particle count stable
            while (particles.length < COUNT) {
                particles.push(createParticle());
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            {/* Background Canvas */}
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

            {/* Subtle Vignette Overlay */}
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    pointerEvents: 'none',
                    zIndex: 0,
                    background: 'radial-gradient(ellipse at center, transparent 35%, rgba(3, 5, 10, 0.7) 100%)',
                }}
            />



            {/* Interactive Theme Control Pill */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    right: '1.5rem',
                    zIndex: 99,
                }}
            >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    {isMenuOpen && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'rgba(11, 15, 25, 0.95)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(212, 175, 55, 0.35)',
                                borderRadius: '2rem',
                                padding: '0.35rem 0.6rem',
                                marginRight: '0.6rem',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7), 0 0 20px rgba(212, 175, 55, 0.25)',
                            }}
                        >
                            {[
                                { key: 'all', label: 'Ice & Fire', icon: <Sparkles size={14} />, activeGrad: 'linear-gradient(135deg, rgba(230,92,0,0.35) 0%, rgba(0,240,255,0.35) 100%)', activeBorder: 'rgba(212,175,55,0.7)', activeColor: '#ffd700' },
                                { key: 'fire', label: 'Fire', icon: <Flame size={14} color="#ff7b25" />, activeGrad: 'rgba(230, 92, 0, 0.4)', activeBorder: '#ff7b25', activeColor: '#ff9e54' },
                                { key: 'ice', label: 'Frost', icon: <Snowflake size={14} color="#00f0ff" />, activeGrad: 'rgba(0, 240, 255, 0.3)', activeBorder: '#00f0ff', activeColor: '#00f0ff' },
                            ].map(({ key, label, icon, activeGrad, activeBorder, activeColor }) => (
                                <button
                                    key={key}
                                    onClick={() => setMode(key as GotThemeMode)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.4rem 0.85rem',
                                        borderRadius: '1.5rem',
                                        fontSize: '0.78rem',
                                        fontWeight: 600,
                                        fontFamily: 'Cinzel, serif',
                                        letterSpacing: '0.05em',
                                        background: mode === key ? activeGrad : 'transparent',
                                        border: mode === key ? `1px solid ${activeBorder}` : '1px solid transparent',
                                        color: mode === key ? activeColor : 'var(--text-secondary)',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {icon} {label}
                                </button>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Theme Atmosphere"
                        style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.95) 0%, rgba(10, 12, 20, 0.98) 100%)',
                            border: '1.5px solid rgba(212, 175, 55, 0.65)',
                            color: '#d4af37',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.35)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {mode === 'fire' ? <Flame size={18} color="#ff7b25" /> :
                         mode === 'ice'  ? <Snowflake size={18} color="#00f0ff" /> :
                                           <Sparkles size={18} color="#d4af37" />}
                    </button>
                </div>
            </div>
        </>
    );
}
