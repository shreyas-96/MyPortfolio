'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import {
    Code2, Smartphone, Database, Globe, Wrench,
    GraduationCap, Briefcase, BookOpen, Users,
    Languages, Sparkles, MapPin, Calendar
} from 'lucide-react';

export default function About() {
    const skills = [
        {
            category: 'Java',
            icon: <Code2 size={24} color="var(--accent-color)" />,
            items: ['Object-Oriented Programming', 'Collections', 'Exception Handling', 'Multithreading', 'File Handling']
        },
        {
            category: 'Android',
            icon: <Smartphone size={24} color="var(--accent-color)" />,
            items: ['Android Studio', 'App Development', 'Android UI / XML', 'Material Design']
        },
        {
            category: 'Firebase',
            icon: <Database size={24} color="var(--accent-color)" />,
            items: ['Firestore', 'Realtime Database', 'Firebase Auth', 'Cloud Storage']
        },
        {
            category: 'Integrations',
            icon: <Globe size={24} color="var(--accent-color)" />,
            items: ['WhatsApp API', 'Payment Gateway', 'RESTful APIs', 'JSON Parsing']
        },
        {
            category: 'Tools',
            icon: <Wrench size={24} color="var(--accent-color)" />,
            items: ['Git & GitHub', 'Gradle', 'Android Studio', 'Debugging']
        }
    ];

    const education = [
        {
            degree: 'Master of Computer Applications (MCA)',
            institution: 'D. Y. Patil Agriculture and Technical University, Talsande',
            year: '2024 – 2026',
            percentage: '72.37%'
        },
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'Jaysingpur College, Jaysingpur',
            year: '2021 – 2024',
            percentage: '66.69%'
        },
        {
            degree: 'Higher Secondary Certificate (H.S.C.)',
            institution: 'Jaysingpur College, Jaysingpur',
            year: '2021',
            percentage: '65.50%'
        }
    ];

    const softSkills = ['Teamwork & Leadership', 'Quick Learner', 'Adaptability', 'Management Qualities'];
    const languages = ['Marathi', 'Hindi', 'English'];
    const currentlyLearning = ['WhatsApp API Integration', 'Payment Gateway Integration'];

    return (
        <PageTransition>
            {/* ── ABOUT HEADER ── */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">About Me</h1>
                    <div className="got-divider"><span>⚔</span></div>
                </div>

                <div className="two-col-grid">
                    {/* Left col — summary + experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Professional Summary */}
                        <h3 className="heading-md mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Sparkles color="var(--accent-color)" size={22} /> Professional Summary
                        </h3>
                        <p className="text-body mb-8" style={{ lineHeight: 1.85, color: 'var(--text-primary)' }}>
                            Android/Java developer with 11 months of internship experience in mobile application development, Firebase-backed systems, and clean user experiences. Passionate about applying technical knowledge to build practical software solutions, contribute to organizational growth, and continuously develop professionally.
                        </p>

                        {/* Experience */}
                        <h3 className="heading-md mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Briefcase color="var(--accent-color)" size={22} /> Experience
                        </h3>
                        <motion.div
                            className="glass-card mb-8"
                            style={{ borderLeft: '3px solid var(--accent-color)' }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                                        Android / Java Developer Intern
                                    </h4>
                                    <p style={{ color: 'var(--text-primary)', fontSize: 'clamp(0.88rem, 2vw, 1rem)' }}>
                                        Infoyashonand Technology Pvt. Ltd., Sangli
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.88rem', whiteSpace: 'nowrap' }}>
                                    <Calendar size={14} />
                                    11 Months
                                </div>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {[
                                    'Collaborated on application development tasks focusing on clean UI, functionality, and user experience.',
                                    'Developed and maintained mobile application features using Android Studio, Java, and Firebase technologies.',
                                    'Worked on Android/Java application development and contributed to practical software solutions.'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)', lineHeight: 1.6 }}>
                                        <span style={{ color: 'var(--accent-color)', fontSize: '0.65rem', marginTop: '0.45rem', flexShrink: 0 }}>◆</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Location */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                            <MapPin size={16} color="var(--accent-color)" />
                            Kolhapur, Maharashtra — Open to remote &amp; on-site
                        </div>
                    </motion.div>

                    {/* Right col — highlight cards */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        {[
                            { icon: <Smartphone size={30} />, title: 'Native Android Craft', desc: 'Fluid UI, activities, lifecycle & Material components', color: 'rgba(212,175,55,0.1)', border: 'rgba(212,175,55,0.3)', iconColor: 'var(--accent-color)' },
                            { icon: <Code2 size={30} />, title: 'Java Architecture', desc: 'Clean OOP design, performance & maintainable structures', color: 'rgba(255,106,0,0.1)', border: 'rgba(255,106,0,0.3)', iconColor: '#ff7b25' },
                            { icon: <Database size={30} />, title: 'Firebase & Cloud', desc: 'Real-time sync, Firestore & secure authentication', color: 'rgba(0,240,255,0.1)', border: 'rgba(0,240,255,0.3)', iconColor: 'var(--accent-ice)' },
                        ].map((card, i) => (
                            <div key={i} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                                <div style={{
                                    padding: '1rem',
                                    background: card.color,
                                    border: `1px solid ${card.border}`,
                                    borderRadius: '1rem',
                                    color: card.iconColor,
                                    flexShrink: 0
                                }}>
                                    {card.icon}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 'clamp(1rem, 2.5vw, 1.3rem)', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>{card.title}</h3>
                                    <p className="text-body" style={{ fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)' }}>{card.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── EDUCATION ── */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="heading-lg">Education</h2>
                    <div className="got-divider"><span>⚔</span></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: '1.75rem' }}>
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.5 }}
                            whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                            style={{ borderLeft: '3px solid var(--accent-color)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                                <GraduationCap color="var(--accent-color)" size={20} />
                                <span style={{
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(212,175,55,0.12)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    borderRadius: '2rem',
                                    fontSize: '0.78rem',
                                    fontWeight: 600,
                                    fontFamily: 'Cinzel, serif',
                                    color: 'var(--accent-gold)',
                                }}>{edu.year}</span>
                            </div>
                            <h4 style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--accent-gold)', marginBottom: '0.4rem' }}>{edu.degree}</h4>
                            <p style={{ color: 'var(--text-primary)', fontSize: 'clamp(0.82rem, 1.8vw, 0.95rem)', marginBottom: '0.75rem' }}>{edu.institution}</p>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.3rem 0.85rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '2rem',
                                fontSize: '0.85rem',
                                color: 'var(--text-secondary)'
                            }}>
                                Score: <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{edu.percentage}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── TECHNICAL SKILLS ── */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="heading-lg">Technical Armory</h2>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">The tools, languages, and technologies forged into every project</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.75rem' }}>
                    {skills.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)', boxShadow: '0 10px 30px -10px rgba(212, 175, 55, 0.25)' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
                                <div style={{
                                    padding: '0.55rem',
                                    borderRadius: '0.75rem',
                                    background: 'rgba(212,175,55,0.1)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    flexShrink: 0
                                }}>
                                    {skillGroup.icon}
                                </div>
                                <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'var(--text-primary)' }}>{skillGroup.category}</h3>
                            </div>

                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                                {skillGroup.items.map(item => (
                                    <span key={item} style={{
                                        padding: '0.4rem 0.85rem',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '2rem',
                                        fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
                                        color: 'var(--text-secondary)',
                                        transition: 'var(--transition)'
                                    }}>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── CURRENTLY LEARNING / SOFT SKILLS / LANGUAGES ── */}
            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.75rem' }}>

                    {/* Currently Learning */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{ padding: '0.55rem', borderRadius: '0.75rem', background: 'rgba(0,240,255,0.1)', border: '1px solid rgba(0,240,255,0.25)', flexShrink: 0 }}>
                                <BookOpen size={20} color="var(--accent-ice)" />
                            </div>
                            <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'var(--text-primary)' }}>Currently Learning</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {currentlyLearning.map(item => (
                                <div key={item} style={{
                                    display: 'flex', alignItems: 'center', gap: '0.65rem',
                                    padding: '0.6rem 1rem',
                                    background: 'rgba(0,240,255,0.04)', border: '1px solid rgba(0,240,255,0.15)',
                                    borderRadius: '0.75rem', fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)', color: 'var(--text-secondary)'
                                }}>
                                    <span style={{ color: 'var(--accent-ice)', fontSize: '0.55rem', flexShrink: 0 }}>●</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{ padding: '0.55rem', borderRadius: '0.75rem', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.25)', flexShrink: 0 }}>
                                <Users size={20} color="var(--accent-color)" />
                            </div>
                            <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'var(--text-primary)' }}>Soft Skills</h3>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                            {softSkills.map(skill => (
                                <span key={skill} style={{
                                    padding: '0.4rem 0.9rem',
                                    background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)',
                                    borderRadius: '2rem', fontSize: 'clamp(0.82rem, 1.8vw, 0.9rem)', color: 'var(--text-secondary)'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                            <div style={{ padding: '0.55rem', borderRadius: '0.75rem', background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.25)', flexShrink: 0 }}>
                                <Languages size={20} color="#ff7b25" />
                            </div>
                            <h3 style={{ fontSize: 'clamp(1rem, 2.2vw, 1.2rem)', color: 'var(--text-primary)' }}>Languages</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {languages.map(lang => (
                                <div key={lang} style={{
                                    flex: '1 1 60px', textAlign: 'center',
                                    padding: '0.75rem 0.5rem',
                                    background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)',
                                    borderRadius: '0.75rem', fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)',
                                    color: 'var(--text-primary)', fontWeight: 500
                                }}>
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── INTERESTS ── */}
            <section className="section container" style={{ paddingTop: 0 }}>
                <motion.div
                    className="glass-card"
                    style={{
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, rgba(12,18,32,0.9) 0%, rgba(212,175,55,0.06) 100%)',
                        border: '1px solid rgba(212,175,55,0.2)'
                    }}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                >
                    <h3 className="heading-md mb-4" style={{ color: 'var(--accent-gold)' }}>Interests</h3>
                    <p className="text-body" style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)' }}>
                        Mobile Development &amp; New Technologies
                    </p>
                </motion.div>
            </section>
        </PageTransition>
    );
}
