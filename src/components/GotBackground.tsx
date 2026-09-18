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
}

export default function GotBackground() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [mode, setMode] = useState<GotThemeMode>('all');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

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
            mouseRef.current = {
                x: e.clientX,
                y: e.clientY,
                active: true,
            };
        };

        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Particle pool
        const count = 75;
        const particles: Particle[] = [];

        function createParticle(forceType?: 'ember' | 'frost'): Particle {
            const chosenType: 'ember' | 'frost' =
                forceType ||
                (mode === 'fire'
                    ? 'ember'
                    : mode === 'ice'
                    ? 'frost'
                    : Math.random() > 0.45
                    ? 'ember'
                    : 'frost');

            const isEmber = chosenType === 'ember';
            const x = Math.random() * width;
            const y = isEmber ? height + Math.random() * 40 : -20 - Math.random() * 40;
            const maxAlpha = isEmber ? 0.3 + Math.random() * 0.6 : 0.25 + Math.random() * 0.5;

            return {
                x,
                y,
                size: isEmber ? 1.5 + Math.random() * 2.5 : 1.2 + Math.random() * 2.2,
                vx: (Math.random() - 0.5) * 0.8,
                vy: isEmber ? -(0.8 + Math.random() * 1.6) : 0.6 + Math.random() * 1.4,
                alpha: 0.05,
                maxAlpha,
                decay: 0.003 + Math.random() * 0.005,
                type: chosenType,
                hue: isEmber
                    ? Math.random() > 0.6
                        ? 42 // ancient gold
                        : Math.random() > 0.3
                        ? 22 // ember orange
                        : 6  // fiery crimson
                    : Math.random() > 0.5
                    ? 195 // frost cyan
                    : 215, // deep ice blue
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: 0.02 + Math.random() * 0.03,
            };
        }

        // Initialize particles
        for (let i = 0; i < count; i++) {
            const p = createParticle();
            p.y = Math.random() * height; // scatter vertically at start
            particles.push(p);
        }

        // Ambient mist offsets
        let mistPhase = 0;

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            mistPhase += 0.003;

            // Draw atmospheric ambient glows
            // 1. Dragon Fire Glow (Warm gold/crimson bottom & center)
            if (mode === 'all' || mode === 'fire') {
                const fireGlowX = width * 0.3 + Math.sin(mistPhase) * 60;
                const fireGlowY = height * 0.85 + Math.cos(mistPhase) * 40;
                const fireGrad = ctx.createRadialGradient(
                    fireGlowX,
                    fireGlowY,
                    20,
                    fireGlowX,
                    fireGlowY,
                    width * 0.55
                );
                fireGrad.addColorStop(0, 'rgba(230, 92, 0, 0.07)');
                fireGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.03)');
                fireGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = fireGrad;
                ctx.fillRect(0, 0, width, height);
            }

            // 2. Winterfell Frost Glow (Icy cold top & right)
            if (mode === 'all' || mode === 'ice') {
                const iceGlowX = width * 0.75 + Math.cos(mistPhase * 0.8) * 60;
                const iceGlowY = height * 0.2 + Math.sin(mistPhase * 0.8) * 40;
                const iceGrad = ctx.createRadialGradient(
                    iceGlowX,
                    iceGlowY,
                    20,
                    iceGlowX,
                    iceGlowY,
                    width * 0.55
                );
                iceGrad.addColorStop(0, 'rgba(0, 240, 255, 0.05)');
                iceGrad.addColorStop(0.6, 'rgba(70, 130, 220, 0.02)');
                iceGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
                ctx.fillStyle = iceGrad;
                ctx.fillRect(0, 0, width, height);
            }

            // Update & draw particles
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Respect mode filter
                if (mode === 'fire' && p.type === 'frost') {
                    particles[i] = createParticle('ember');
                    continue;
                }
                if (mode === 'ice' && p.type === 'ember') {
                    particles[i] = createParticle('frost');
                    continue;
                }

                p.wobble += p.wobbleSpeed;
                p.x += p.vx + Math.sin(p.wobble) * 0.5;
                p.y += p.vy;

                // Fade in then out
                if (p.y > height * 0.8 || p.y < height * 0.2) {
                    p.alpha -= p.decay * 1.5;
                } else if (p.alpha < p.maxAlpha) {
                    p.alpha += 0.01;
                }

                // Mouse interaction - gentle repulsion & spark flaring
                if (mouseRef.current.active) {
                    const dx = p.x - mouseRef.current.x;
                    const dy = p.y - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const radius = 130;
                    if (dist < radius) {
                        const force = (1 - dist / radius) * 2;
                        p.x += (dx / dist) * force;
                        p.y += (dy / dist) * force;
                        p.alpha = Math.min(1, p.alpha + 0.1);
                    }
                }

                // Draw particle
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                if (p.type === 'ember') {
                    // Glowing fire ember
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
                    grad.addColorStop(0, `hsla(${p.hue}, 100%, 75%, ${p.alpha})`);
                    grad.addColorStop(0.5, `hsla(${p.hue}, 95%, 55%, ${p.alpha * 0.6})`);
                    grad.addColorStop(1, `hsla(${p.hue}, 90%, 40%, 0)`);
                    ctx.fillStyle = grad;
                    ctx.shadowColor = `hsl(${p.hue}, 100%, 60%)`;
                    ctx.shadowBlur = 8;
                    ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
                } else {
                    // Crystalline winter frost
                    const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
                    grad.addColorStop(0, `hsla(${p.hue}, 90%, 90%, ${p.alpha})`);
                    grad.addColorStop(0.6, `hsla(${p.hue}, 80%, 70%, ${p.alpha * 0.5})`);
                    grad.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
                    ctx.fillStyle = grad;
                    ctx.shadowColor = `hsl(${p.hue}, 90%, 75%)`;
                    ctx.shadowBlur = 6;
                    ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
                }

                ctx.fill();
                ctx.restore();

                // Recycle particle if out of bounds or faded
                if (
                    p.alpha <= 0 ||
                    (p.type === 'ember' && p.y < -30) ||
                    (p.type === 'frost' && p.y > height + 30) ||
                    p.x < -30 ||
                    p.x > width + 30
                ) {
                    particles[i] = createParticle();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [mode]);

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
                    background:
                        'radial-gradient(ellipse at center, transparent 40%, rgba(3, 5, 10, 0.75) 100%)',
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
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {isMenuOpen && (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4rem',
                                background: 'rgba(11, 15, 25, 0.92)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid rgba(212, 175, 55, 0.3)',
                                borderRadius: '2rem',
                                padding: '0.35rem 0.6rem',
                                marginRight: '0.6rem',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 15px rgba(212, 175, 55, 0.2)',
                            }}
                        >
                            <button
                                onClick={() => setMode('all')}
                                title="Song of Ice & Fire"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '1.5rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    fontFamily: 'Cinzel, serif',
                                    letterSpacing: '0.05em',
                                    background: mode === 'all' ? 'linear-gradient(135deg, rgba(230,92,0,0.3) 0%, rgba(0,240,255,0.3) 100%)' : 'transparent',
                                    border: mode === 'all' ? '1px solid rgba(212, 175, 55, 0.6)' : '1px solid transparent',
                                    color: mode === 'all' ? '#ffd700' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Sparkles size={14} /> Ice & Fire
                            </button>

                            <button
                                onClick={() => setMode('fire')}
                                title="Dragon Fire (Targaryen)"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '1.5rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    fontFamily: 'Cinzel, serif',
                                    letterSpacing: '0.05em',
                                    background: mode === 'fire' ? 'rgba(230, 92, 0, 0.35)' : 'transparent',
                                    border: mode === 'fire' ? '1px solid #ff7b25' : '1px solid transparent',
                                    color: mode === 'fire' ? '#ff9e54' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Flame size={14} color="#ff7b25" /> Fire
                            </button>

                            <button
                                onClick={() => setMode('ice')}
                                title="Winterfell Frost (Stark)"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.35rem',
                                    padding: '0.4rem 0.75rem',
                                    borderRadius: '1.5rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    fontFamily: 'Cinzel, serif',
                                    letterSpacing: '0.05em',
                                    background: mode === 'ice' ? 'rgba(0, 240, 255, 0.25)' : 'transparent',
                                    border: mode === 'ice' ? '1px solid #00f0ff' : '1px solid transparent',
                                    color: mode === 'ice' ? '#00f0ff' : 'var(--text-secondary)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                <Snowflake size={14} color="#00f0ff" /> Frost
                            </button>
                        </div>
                    )}

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle Theme Atmosphere"
                        style={{
                            width: '42px',
                            height: '42px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.9) 0%, rgba(10, 12, 20, 0.95) 100%)',
                            border: '1.5px solid rgba(212, 175, 55, 0.6)',
                            color: '#d4af37',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(212, 175, 55, 0.3)',
                            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {mode === 'fire' ? (
                            <Flame size={18} color="#ff7b25" />
                        ) : mode === 'ice' ? (
                            <Snowflake size={18} color="#00f0ff" />
                        ) : (
                            <Sparkles size={18} color="#d4af37" />
                        )}
                    </button>
                </div>
            </div>
        </>
    );
}
