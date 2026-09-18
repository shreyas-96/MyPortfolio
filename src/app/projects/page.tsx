'use client';

import PageTransition from '@/components/PageTransition';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
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
            'Resilient backend data modeling and error tolerance'
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
        live: null
    },
    {
        title: 'Bishi Collection (SmartBishi)',
        tags: ['Java', 'Android', 'Firebase Realtime DB', 'FinTech / Group Savings'],
        description: 'A community group savings & contribution management application engineered to track transactions, member deposits, and recurring pool payouts with live Firebase updates.',
        features: [
            'Live ledger tracking with Firebase Realtime Database',
            'Automated transaction logging and contribution status',
            'Secure authentication and tamper-proof user state'
        ],
        images: [
            '/images/bishi_2.png',
            '/images/bishi_3.png',
            '/images/bishi_4.png',
            '/images/bishi_1.png',
        ],
        github: 'https://github.com/shreyas-96',
        live: null
    }
];

export default function Projects() {
    const [currentImageIndices, setCurrentImageIndices] = useState<number[]>(PROJECTS_DATA.map(() => 0));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndices(prev =>
                prev.map((currentIndex, projectIndex) => {
                    const projectImages = PROJECTS_DATA[projectIndex].images;
                    if (projectImages.length <= 1) return currentIndex;
                    return (currentIndex + 1) % projectImages.length;
                })
            );
        }, 3200);

        return () => clearInterval(interval);
    }, []);

    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h1 className="heading-lg">Featured Creations</h1>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">Battle-tested Android applications forged with Java and Firebase</p>
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
                                gap: '4rem',
                                alignItems: 'center'
                            }}
                            className="project-row"
                        >
                            {/* Project Info */}
                            <div style={{ order: index % 2 === 0 ? 1 : 2 }} className="project-info">
                                <div style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: 'var(--accent-gold)',
                                    fontSize: '0.82rem',
                                    fontWeight: 700,
                                    fontFamily: 'Cinzel, serif',
                                    letterSpacing: '0.08em',
                                    marginBottom: '0.75rem',
                                }}>
                                    <span>PROJECT 0{index + 1}</span>
                                </div>

                                <h2 className="heading-md mb-4" style={{ color: 'var(--text-primary)' }}>{project.title}</h2>

                                <div className="glass-card mb-6" style={{
                                    padding: '1.75rem',
                                    background: 'rgba(10,15,28,0.85)',
                                    borderLeft: '3px solid var(--accent-color)'
                                }}>
                                    <p className="text-body" style={{ color: 'var(--text-primary)', lineHeight: 1.8 }}>
                                        {project.description}
                                    </p>
                                </div>

                                <ul style={{ listStyleType: 'none', padding: 0, marginBottom: '2rem' }}>
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="text-body mb-2" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', fontSize: '0.95rem' }}>
                                            <span style={{ color: 'var(--accent-color)', marginTop: '0.1rem', fontSize: '1rem' }}>⚔</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
                                    {project.tags.map(tech => (
                                        <span key={tech} style={{
                                            fontSize: '0.85rem',
                                            color: 'var(--accent-gold)',
                                            fontFamily: 'Cinzel, serif',
                                            letterSpacing: '0.03em',
                                            background: 'rgba(212,175,55,0.08)',
                                            border: '1px solid rgba(212,175,55,0.25)',
                                            padding: '0.4rem 0.85rem',
                                            borderRadius: '2rem'
                                        }}>
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    {project.live ? (
                                        <a href={project.live} target="_blank" rel="noreferrer" className="btn btn-primary">
                                            View Project <ExternalLink size={18} />
                                        </a>
                                    ) : (
                                        <button className="btn btn-primary" style={{ opacity: 0.75, cursor: 'not-allowed' }} disabled>
                                            In Production <ExternalLink size={18} />
                                        </button>
                                    )}

                                    <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-secondary">
                                        Source Code <FaGithub size={18} />
                                    </a>
                                </div>
                            </div>

                            {/* Phone Mockup with Carousel */}
                            <motion.div
                                style={{ order: index % 2 === 0 ? 2 : 1, display: 'flex', justifyContent: 'center', position: 'relative' }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div style={{
                                    width: '300px',
                                    height: '600px',
                                    borderRadius: '1.75rem',
                                    boxShadow: '0 25px 60px -12px rgba(0, 0, 0, 0.75), 0 0 35px rgba(212, 175, 55, 0.2)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    border: '2px solid rgba(212, 175, 55, 0.35)',
                                    background: '#04060b'
                                }}>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={currentImageIndices[index]}
                                            initial={{ opacity: 0, scale: 1.04 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.5 }}
                                            style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
                                        >
                                            <Image
                                                src={project.images[currentImageIndices[index]]}
                                                alt={`${project.title} screenshot ${currentImageIndices[index] + 1}`}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Carousel Indicators */}
                                    {project.images.length > 1 && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '1rem',
                                            left: 0,
                                            right: 0,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            zIndex: 10
                                        }}>
                                            {project.images.map((_, imgIdx) => (
                                                <div
                                                    key={imgIdx}
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: currentImageIndices[index] === imgIdx ? 'var(--accent-gold)' : 'rgba(255,255,255,0.3)',
                                                        boxShadow: currentImageIndices[index] === imgIdx ? '0 0 8px #ffd700' : 'none',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
          @media (max-width: 768px) {
            .project-row {
              grid-template-columns: 1fr !important;
              gap: 3rem !important;
            }
            .project-info {
              order: 2 !important;
            }
          }
        `
            }} />
        </PageTransition>
    );
}
