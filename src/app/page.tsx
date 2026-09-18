'use client';

import PageTransition from '@/components/PageTransition';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Download, ArrowRight, CheckCircle2, Database, Code2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Home() {
    const processSteps = [
        { num: 'I', title: 'Forge Strategy', desc: 'Requirements analysis & mobile blueprint' },
        { num: 'II', title: 'UI Architecture', desc: 'Intuitive, modern Material UX design' },
        { num: 'III', title: 'Core Development', desc: 'Robust Java & Android native code' },
        { num: 'IV', title: 'Realm Integration', desc: 'Firebase Firestore & REST API pipelines' },
        { num: 'V', title: 'Trial & Hardening', desc: 'Comprehensive testing & bug fixing' },
        { num: 'VI', title: 'Deployment', desc: 'Production release & ongoing support' },
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
            {/* Hero Section */}
            <section className="section container" style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }}>

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
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            fontFamily: 'Cinzel, serif',
                            letterSpacing: '0.08em',
                            marginBottom: '1.25rem',
                        }}>
                            <span>⚔</span> Android & Java Engineer
                        </div>

                        <h1 className="heading-xl mb-4">
                            Hi, I&apos;m Shreyas<br />
                            <span className="text-gradient">Android Developer</span><br />
                            & Java Specialist
                        </h1>

                        <motion.p
                            className="text-body mb-8"
                            style={{ fontSize: '1.2rem', maxWidth: '520px', lineHeight: 1.8 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.7 }}
                        >
                            Forging modern, high-performance, and resilient Android applications with Java, Firebase, and cutting-edge mobile architectures.
                        </motion.p>

                        <motion.div
                            className="flex gap-4 mb-8" style={{ flexWrap: 'wrap' }}
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
                                href="/resume.pdf"
                                target="_blank"
                                className="btn btn-secondary"
                                style={{ padding: '0.75rem 1.5rem' }}
                            >
                                <Download size={18} /> Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Developer Visual */}
                    <motion.div
                        style={{ position: 'relative', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    >
                        {/* Glowing dragon fire background blob */}
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

            {/* Work Process */}
            <section className="section container">
                <div className="text-center mb-8">
                    <h2 className="heading-lg">The Craft & Process</h2>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">How vision is forged into high-performing mobile reality</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                    gap: '1.75rem',
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
                                position: 'relative',
                                zIndex: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                textAlign: 'center',
                                padding: '2rem 1.25rem'
                            }}
                        >
                            <div style={{
                                width: '3.75rem',
                                height: '3.75rem',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, rgba(20, 25, 40, 0.9) 0%, rgba(10, 12, 20, 0.95) 100%)',
                                border: '2px solid var(--accent-color)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '1.2rem',
                                fontWeight: 800,
                                fontFamily: 'Cinzel, serif',
                                color: 'var(--accent-gold)',
                                marginBottom: '1.25rem',
                                boxShadow: '0 0 18px rgba(212, 175, 55, 0.3)'
                            }}>
                                {step.num}
                            </div>
                            <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>{step.title}</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Why Work With Me */}
            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 className="heading-lg mb-4">Why Work With Me</h2>
                        <div className="got-divider" style={{ margin: '1rem 0 2.5rem', justifyContent: 'flex-start' }}><span>⚔</span></div>
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
                                        justifyContent: 'center'
                                    }}>
                                        <CheckCircle2 color="var(--accent-color)" size={20} />
                                    </div>
                                    <span style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>{point}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{
                        padding: '3.5rem 2.5rem',
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
