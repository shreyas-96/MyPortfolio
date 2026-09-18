'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Globe, Wrench, GraduationCap } from 'lucide-react';

export default function About() {
    const skills = [
        {
            category: 'Core Languages',
            icon: <Code2 size={24} color="var(--accent-color)" />,
            items: ['Java', 'Core Java', 'OOP Design', 'Data Structures']
        },
        {
            category: 'Mobile Realm',
            icon: <Smartphone size={24} color="var(--accent-color)" />,
            items: ['Android Studio', 'Android SDK', 'Android UI / XML', 'Material Design']
        },
        {
            category: 'Backend & Cloud',
            icon: <Database size={24} color="var(--accent-color)" />,
            items: ['Firebase Firestore', 'Realtime Database', 'Firebase Auth', 'Cloud Storage']
        },
        {
            category: 'Integrations & Protocols',
            icon: <Globe size={24} color="var(--accent-color)" />,
            items: ['RESTful APIs', 'JSON Parsing', 'WhatsApp API', 'Payment Gateways']
        },
        {
            category: 'Tooling & Armory',
            icon: <Wrench size={24} color="var(--accent-color)" />,
            items: ['Git & GitHub', 'Gradle', 'Android Studio', 'Debugging & Profiling']
        }
    ];

    return (
        <PageTransition>
            {/* About Section */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">About Me</h1>
                    <div className="got-divider"><span>⚔</span></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p className="text-body mb-6" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-primary)' }}>
                            I am an Android Developer specializing in Java and Firebase-powered mobile ecosystems. I take pride in crafting software that fuses intuitive, polished aesthetics with resilient backend logic and real-time data sync.
                        </p>
                        <p className="text-body mb-8" style={{ fontSize: '1.15rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
                            Constantly expanding my mastery of modern mobile architectures, I collaborate with founders, clients, and teams to build high-impact real-world applications.
                        </p>

                        <h3 className="heading-md mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <GraduationCap color="var(--accent-color)" size={24} /> Education
                        </h3>
                        <div className="glass-card mb-4" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-color)' }}>
                            <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)' }}>Master of Computer Applications (MCA)</h4>
                            <p style={{ color: 'var(--text-primary)', marginTop: '0.35rem' }}>D. Y. Patil Agriculture and Technical University, Talsande</p>
                        </div>
                        <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '3px solid var(--accent-color)' }}>
                            <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)' }}>Bachelor of Computer Applications (BCA)</h4>
                            <p style={{ color: 'var(--text-primary)', marginTop: '0.35rem' }}>Jaysingpur College, Jaysingpur</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                            <div style={{
                                padding: '1.1rem',
                                background: 'rgba(212,175,55,0.1)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                borderRadius: '1rem',
                                color: 'var(--accent-color)'
                            }}>
                                <Smartphone size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Native Android Craft</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Fluid UI, activities, lifecycle & Material components</p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                            <div style={{
                                padding: '1.1rem',
                                background: 'rgba(255,106,0,0.1)',
                                border: '1px solid rgba(255,106,0,0.3)',
                                borderRadius: '1rem',
                                color: '#ff7b25'
                            }}>
                                <Code2 size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Java Architecture</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Clean OOP design, performance & maintainable structures</p>
                            </div>
                        </div>

                        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                            <div style={{
                                padding: '1.1rem',
                                background: 'rgba(0,240,255,0.1)',
                                border: '1px solid rgba(0,240,255,0.3)',
                                borderRadius: '1rem',
                                color: 'var(--accent-ice)'
                            }}>
                                <Database size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Firebase & Cloud Realm</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Real-time synchronization, Firestore & secure authentication</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Technical Skills Section */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="heading-lg">Technical Armory</h2>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">The tools, languages, and technologies forged into every project</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -5,
                                borderColor: 'rgba(212, 175, 55, 0.45)',
                                boxShadow: '0 10px 30px -10px rgba(212, 175, 55, 0.25)'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div style={{
                                    padding: '0.6rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(212,175,55,0.1)',
                                    border: '1px solid rgba(212,175,55,0.2)'
                                }}>
                                    {skillGroup.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)' }}>{skillGroup.category}</h3>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                {skillGroup.items.map(item => (
                                    <span key={item} style={{
                                        padding: '0.5rem 1rem',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '2rem',
                                        fontSize: '0.9rem',
                                        color: 'var(--text-secondary)',
                                        transition: 'var(--transition)'
                                    }} className="hover:text-white hover:border-accent hover:bg-accent/10">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
