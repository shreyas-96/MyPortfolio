'use client';

import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Zap } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useState, useEffect } from 'react';

const PROJECTS_DATA = [
    {
        title: 'Saral Truck Transport',
        tags: ['Java', 'Android', 'Firebase Firestore', 'Logistics Realm'],
        description: 'An Android-based truck booking and logistics management system engineered for real-time fleet coordination, instant updates, and intuitive driver-operator workflows.',
        features: [
            'Real-time Firestore sync for fleet status & active shipments',
            'Streamlined user flows designed for rapid mobile interaction',
            'Resilient backend data modeling and error tolerance',
        ],
        images: [
            '/images/saral_1.png',
            '/images/saral_5.png',
            '/images/saral_2.png',
            '/images/saral_3.png',
            '/images/saral_4.png',
            '/images/saral_6.png',
        ],
        github: 'https://github.com/shreyas-96',
        live: null,
    },
    {
        title: 'Bishi Collection (SmartBishi)',
        tags: ['Java', 'Android', 'Firebase Realtime DB', 'FinTech / Group Savings'],
        description: 'A community group savings & contribution management application engineered to track transactions, member deposits, and recurring pool payouts with live Firebase updates.',
        features: [
            'Live ledger tracking with Firebase Realtime Database',
            'Automated transaction logging and contribution status',
            'Secure authentication and tamper-proof user state',
        ],
        images: [
            '/images/bishi_2.png',
            '/images/bishi_3.png',
            '/images/bishi_4.png',
            '/images/bishi_1.png',
        ],
        github: 'https://github.com/shreyas-96',
        live: null,
    },
];

// ─────────────────────────────────────────────────────────────
//  ProjectCarousel — isolated component per project.
//  Uses a CROSSFADE (not mode="wait") so images smoothly overlap
//  without any black flash between slides.
// ─────────────────────────────────────────────────────────────
function ProjectCarousel({ images, title }: { images: string[]; title: string }) {
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;
        const interval = setInterval(() => {
            setActiveIdx(prev => (prev + 1) % images.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [images.length]);

    // Index of the image that was showing before the current one.
    // We keep it rendered below z-index 2 so there is NEVER a transparent gap.
    const prevIdx = (activeIdx - 1 + images.length) % images.length;

    return (
        <div
            style={{
                width: 'clamp(200px, 45vw, 300px)',
                height: 'clamp(400px, 90vw, 600px)',
                borderRadius: '1.75rem',
                boxShadow:
                    '0 25px 60px -12px rgba(0,0,0,0.75), 0 0 30px rgba(230,36,41,0.15)',
                position: 'relative',
                overflow: 'hidden',
                border: '2px solid rgba(230,36,41,0.30)',
                background: '#04060b',
                maxWidth: '300px',
            }}
        >
            {/* Layer 1 (z-index 1) — previous image always visible, prevents black gaps */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
                <Image
                    src={images[prevIdx]}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    style={{ objectFit: 'cover' }}
                    aria-hidden
                />
            </div>

            {/* Layer 2 (z-index 2) — current image crossfades in on top */}
            <AnimatePresence>
                <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: 0, zIndex: 2 }}
                >
                    <Image
                        src={images[activeIdx]}
                        alt={`${title} screenshot ${activeIdx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 300px"
                        style={{ objectFit: 'cover' }}
                        priority={activeIdx === 0}
                    />
                </motion.div>
            </AnimatePresence>

            {/* Layer 3 (z-index 10) — dot indicators, clickable */}
            {images.length > 1 && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: '1rem',
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        zIndex: 10,
                    }}
                >
                    {images.map((_, imgIdx) => (
                        <button
                            key={imgIdx}
                            aria-label={`Go to screenshot ${imgIdx + 1}`}
                            onClick={() => setActiveIdx(imgIdx)}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                border: 'none',
                                cursor: 'pointer',
                                padding: 0,
                                background:
                                    activeIdx === imgIdx
                                        ? 'var(--accent-gold)'
                                        : 'rgba(255,255,255,0.3)',
                                boxShadow:
                                    activeIdx === imgIdx ? '0 0 8px #ffd700' : 'none',
                                transition: 'all 0.3s ease',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
//  Projects page
// ─────────────────────────────────────────────────────────────
export default function Projects() {
    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <div className="badge-red" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                        <Zap size={12} /> My Work
                    </div>
                    <h1 className="heading-lg">Featured <span className="text-gradient">Projects</span></h1>
                    <div className="got-divider">
                        <span>◆</span>
                    </div>
                    <p className="text-body">
                        Production-tested Android applications built with Java and Firebase
                    </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
                    {PROJECTS_DATA.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.7 }}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 'clamp(2rem, 5vw, 4rem)',
                                alignItems: 'center',
                            }}
                            className="project-row"
                        >
                            {/* ── Project Info ── */}
                            <div
                                style={{ order: index % 2 === 0 ? 1 : 2 }}
                                className="project-info"
                            >
                                <div
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        color: '#FF6B6F',
                                        fontSize: '0.78rem',
                                        fontWeight: 700,
                                        fontFamily: 'Rajdhani, sans-serif',
                                        letterSpacing: '0.1em',
                                        marginBottom: '0.75rem',
                                    }}
                                >
                                    <span>PROJECT 0{index + 1}</span>
                                </div>

                                <h2
                                    className="heading-md mb-4"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    {project.title}
                                </h2>

                                <div
                                    className="glass-card mb-6"
                                    style={{
                                        padding: '1.75rem',
                                        background: 'rgba(16,23,38,0.85)',
                                        borderLeft: '3px solid var(--accent-red)',
                                    }}
                                >
                                    <p
                                        className="text-body"
                                        style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}
                                    >
                                        {project.description}
                                    </p>
                                </div>

                                <ul
                                    style={{
                                        listStyleType: 'none',
                                        padding: 0,
                                        marginBottom: '2rem',
                                    }}
                                >
                                    {project.features.map((feature, i) => (
                                        <li
                                            key={i}
                                            className="text-body mb-2"
                                            style={{
                                                display: 'flex',
                                                alignItems: 'flex-start',
                                                gap: '0.75rem',
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: '#E62429',
                                                    marginTop: '0.2rem',
                                                    fontSize: '0.75rem',
                                                }}
                                            >
                                                ▸
                                            </span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div
                                    style={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        gap: '0.75rem',
                                        marginBottom: '2rem',
                                    }}
                                >
                                    {project.tags.map(tech => (
                                        <span
                                            key={tech}
                                            style={{
                                                fontSize: '0.82rem',
                                                color: '#FFB84D',
                                                fontFamily: 'Rajdhani, sans-serif',
                                                letterSpacing: '0.06em',
                                                fontWeight: 600,
                                                background: 'rgba(217,164,65,0.08)',
                                                border: '1px solid rgba(217,164,65,0.25)',
                                                padding: '0.35rem 0.85rem',
                                                borderRadius: '2rem',
                                            }}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {project.live ? (
                                        <a
                                            href={project.live}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="btn btn-primary"
                                        >
                                            View Project <ExternalLink size={18} />
                                        </a>
                                    ) : (
                                        <button
                                            className="btn btn-primary"
                                            style={{ opacity: 0.75, cursor: 'not-allowed' }}
                                            disabled
                                        >
                                            In Production <ExternalLink size={18} />
                                        </button>
                                    )}
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="btn btn-secondary"
                                    >
                                        Source Code <FaGithub size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* ── Phone Mockup with Crossfade Carousel ── */}
                            <motion.div
                                style={{
                                    order: index % 2 === 0 ? 2 : 1,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    position: 'relative',
                                }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCarousel
                                    images={project.images}
                                    title={project.title}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style
                dangerouslySetInnerHTML={{
                    __html: `
          @media (max-width: 768px) {
            .project-row {
              grid-template-columns: 1fr !important;
              gap: 2.5rem !important;
            }
            .project-row > div {
              order: unset !important;
            }
          }
          @media (max-width: 480px) {
            .project-row { gap: 2rem !important; }
          }
        `,
                }}
            />
        </PageTransition>
    );
}
