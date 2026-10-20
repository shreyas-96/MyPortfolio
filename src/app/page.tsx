'use client';

import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ArrowRight, CheckCircle2, Database, Code2, X, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useState } from 'react';

export default function Home() {
    const [showPdf, setShowPdf] = useState(false);
    const [pdfError, setPdfError] = useState(false);

    const processSteps = [
        { num: 'I',   title: 'Forge Strategy',   desc: 'Requirements analysis & mobile blueprint' },
        { num: 'II',  title: 'UI Architecture',   desc: 'Intuitive, modern Material UX design' },
        { num: 'III', title: 'Core Development',  desc: 'Robust Java & Android native code' },
        { num: 'IV',  title: 'Realm Integration', desc: 'Firebase Firestore & REST API pipelines' },
        { num: 'V',   title: 'Trial & Hardening', desc: 'Comprehensive testing & bug fixing' },
        { num: 'VI',  title: 'Deployment',        desc: 'Production release & ongoing support' },
    ];

    const whyMePoints = [
        'Clean, intuitive & responsive mobile UI',
        'Real-time Firebase Firestore & Database mastery',
        'Practical, production-proven Android engineering',
        'Secure API & third-party integrations',
        'Swift & responsive communication',
        'Dedicated to reliability, speed, and precision'
    ];

    return (
        <PageTransition>
            {/* ── PDF VIEWER OVERLAY ── */}
            <AnimatePresence>
                {showPdf && (
                    <motion.div
                        className="pdf-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={(e) => { if (e.target === e.currentTarget) setShowPdf(false); }}
                    >
                        <div className="pdf-overlay-header">
                            <span style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, color: 'var(--accent-gold)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>
                                ⚔ Shreyas Sunil Chudmunge — Resume
                            </span>
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
                                <a
                                    href="/resume.pdf"
                                    download="Shreyas_Resume.pdf"
                                    className="btn btn-primary"
                                    style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
                                >
                                    <Download size={15} /> Download
                                </a>
                                <a
                                    href="/resume.pdf"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
                                >
                                    <ExternalLink size={15} /> Open in Tab
                                </a>
                                <button
                                    className="btn btn-secondary"
                                    style={{ padding: '0.5rem 0.75rem' }}
                                    onClick={() => setShowPdf(false)}
                                    aria-label="Close resume"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="pdf-frame-wrap">
                            {pdfError ? (
                                <div style={{
                                    padding: '3rem',
                                    textAlign: 'center',
                                    background: 'rgba(10,15,27,0.9)',
                                    color: 'var(--text-secondary)',
                                    fontSize: '1rem'
                                }}>
                                    <p style={{ marginBottom: '1rem', color: 'var(--accent-gold)', fontFamily: 'Cinzel, serif' }}>
                                        Could not load PDF preview
                                    </p>
                                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
                                        <ExternalLink size={16} /> Open PDF in New Tab
                                    </a>
                                </div>
                            ) : (
                                <iframe
                                    src="/resume.pdf"
                                    title="Shreyas Resume"
                                    onError={() => setPdfError(true)}
                                />
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── HERO SECTION ── */}
            <section
                className="section container"
                style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', position: 'relative' }}
            >
                <div className="hero-grid">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.4rem 1rem',
                            borderRadius: '2rem',
                            background: 'rgba(212, 175, 55, 0.1)',
                            border: '1px solid rgba(212, 175, 55, 0.3)',
                            color: 'var(--accent-gold)',
                            fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                            fontWeight: 600,
                            fontFamily: 'Cinzel, serif',
                            letterSpacing: '0.08em',
                            marginBottom: '1.25rem',
                        }}>
                            <span>⚔</span> Android &amp; Java Engineer
                        </div>

                        <h1 className="heading-xl mb-4">
                            Hi, I&apos;m Shreyas<br />
                            <span className="text-gradient">Android Developer</span><br />
                            &amp; Java Specialist
                        </h1>

                        <motion.p
                            className="text-body mb-8"
                            style={{ maxWidth: '520px', lineHeight: 1.8 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            Android/Java developer with 11 months of internship experience in mobile application development, Firebase-backed systems, and clean user experiences.
                        </motion.p>

                        <motion.div
                            className="flex gap-4 mb-8"
                            style={{ flexWrap: 'wrap' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <Link href="/projects" className="btn btn-primary">
                                View My Projects <ArrowRight size={18} />
                            </Link>
                            <Link href="/contact" className="btn btn-secondary">
                                Let&apos;s Work Together
                            </Link>
                        </motion.div>

                        <motion.div
                            className="flex gap-4"
                            style={{ flexWrap: 'wrap', alignItems: 'center' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            <a
                                href="https://github.com/shreyas-96"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem', borderRadius: '50%' }}
                                aria-label="GitHub"
                            >
                                <FaGithub size={20} />
                            </a>
                            <a
                                href="https://linkedin.com/in/shreyaschudmunge96"
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem', borderRadius: '50%' }}
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin size={20} />
                            </a>
                            {/* RESUME BUTTON — opens PDF viewer */}
                            <button
                                id="btn-resume"
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem 1.5rem' }}
                                onClick={() => { setPdfError(false); setShowPdf(true); }}
                                aria-label="View Resume"
                            >
                                <Download size={18} /> Resume
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Developer Visual */}
                    <motion.div
                        className="hero-visual"
                        style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        {/* Glowing background blob */}
                        <div style={{
                            position: 'absolute',
                            width: '320px',
                            height: '320px',
                            background: 'var(--accent-gradient)',
                            filter: 'blur(110px)',
                            opacity: 0.18,
                            borderRadius: '50%',
                            zIndex: 0
                        }} />

                        <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                src="/images/hero_visual.png"
                                alt="Developer Visual"
                                width={600}
                                height={400}
                                style={{
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '1.25rem',
                                    border: '1px solid var(--glass-border)',
                                    boxShadow: '0 20px 45px rgba(0,0,0,0.6), 0 0 30px rgba(212, 175, 55, 0.15)'
                                }}
                                priority
                            />
                        </div>

                        {/* Floating Badges */}
                        <motion.div
                            className="glass-card"
                            style={{
                                position: 'absolute',
                                top: '10%',
                                right: '0%',
                                padding: '0.9rem 1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                zIndex: 3,
                                border: '1px solid rgba(248, 152, 32, 0.4)',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(248, 152, 32, 0.2)'
                            }}
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <Code2 color="#f89820" size={22} />
                            <span style={{ fontWeight: 700, fontFamily: 'Cinzel, serif', color: '#ffb347' }}>Java Realm</span>
                        </motion.div>

                        <motion.div
                            className="glass-card"
                            style={{
                                position: 'absolute',
                                bottom: '18%',
                                left: '-4%',
                                padding: '0.9rem 1.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                zIndex: 3,
                                border: '1px solid rgba(255, 202, 40, 0.4)',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5), 0 0 15px rgba(255, 202, 40, 0.2)'
                            }}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                        >
                            <Database color="#FFCA28" size={22} />
                            <span style={{ fontWeight: 700, fontFamily: 'Cinzel, serif', color: '#ffd54f' }}>Firebase</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── WORK PROCESS ── */}
            <section className="section container">
                <div className="text-center mb-8">
                    <h2 className="heading-lg">The Craft &amp; Process</h2>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">How vision is forged into high-performing mobile reality</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                    gap: '1.5rem',
                    position: 'relative'
                }}>
                    {processSteps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -6, borderColor: 'rgba(212, 175, 55, 0.5)' }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: 'clamp(1rem, 2.5vw, 2rem) clamp(0.75rem, 2vw, 1.25rem)'
                            }}
                        >
                            <div style={{
                                width: '3.5rem',
                                height: '3.5rem',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.9) 0%, rgba(10, 12, 20, 0.95) 100%)',
                                border: '2px solid var(--accent-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.1rem',
                                fontWeight: 800,
                                fontFamily: 'Cinzel, serif',
                                color: 'var(--accent-gold)',
                                marginBottom: '1.1rem',
                                boxShadow: '0 0 18px rgba(212, 175, 55, 0.3)',
                                flexShrink: 0
                            }}>
                                {step.num}
                            </div>
                            <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{step.title}</h4>
                            <p style={{ fontSize: 'clamp(0.78rem, 1.5vw, 0.85rem)', color: 'var(--text-secondary)' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── WHY WORK WITH ME ── */}
            <section className="section container">
                <div className="two-col-grid">
                    <div>
                        <h2 className="heading-lg mb-4">Why Work With Me</h2>
                        <div className="got-divider" style={{ margin: '1rem 0 2.5rem', justifyContent: 'flex-start' }}>
                            <span>⚔</span>
                        </div>
                        <p className="text-body mb-8" style={{ lineHeight: 1.8 }}>
                            I unite rigorous technical discipline with meticulous attention to user experience, forging mobile software that executes flawlessly and captivates users.
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
                            {whyMePoints.map((point, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.4 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                                >
                                    <div style={{
                                        padding: '0.4rem',
                                        borderRadius: '50%',
                                        background: 'rgba(212, 175, 55, 0.1)',
                                        border: '1px solid rgba(212, 175, 55, 0.3)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <CheckCircle2 color="var(--accent-color)" size={20} />
                                    </div>
                                    <span style={{ fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', color: 'var(--text-primary)' }}>{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{
                        padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(12,18,32,0.9) 0%, rgba(212,175,55,0.08) 100%)',
                        border: '1.5px solid rgba(212,175,55,0.25)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.1)'
                    }}>
                        <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'rgba(212, 175, 55, 0.15)',
                            border: '1px solid var(--accent-color)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--accent-gold)',
                            fontSize: '1.5rem'
                        }}>
                            ⚔
                        </div>
                        <h3 className="heading-md mb-4">Ready To Forge Your App?</h3>
                        <p className="text-body mb-6" style={{ fontSize: '1rem' }}>
                            Let&apos;s turn your vision into a production-grade mobile application.
                        </p>
                        <Link href="/contact" className="btn btn-primary w-full">
                            Initiate A Project
                        </Link>
                    </div>
                </div>
            </section>
        </PageTransition>
    );
}
