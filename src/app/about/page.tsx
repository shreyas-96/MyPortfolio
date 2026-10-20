'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Code2, Smartphone, Database, Globe, Wrench, GraduationCap, Briefcase, BookOpen, Users, Languages, Sparkles, MapPin, Calendar } from 'lucide-react';

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
            items: ['Android Studio', 'Android Application Development', 'Android UI / XML', 'Material Design']
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
            items: ['Git', 'GitHub', 'Android Studio', 'Gradle']
        }
    ];

    const education = [
        {
            degree: 'Master of Computer Applications (MCA)',
            institution: 'D. Y. Patil Agriculture and Technical University, Talsande',
            year: '2024 - 2026',
            percentage: '72.37%'
        },
        {
            degree: 'Bachelor of Computer Applications (BCA)',
            institution: 'Jaysingpur College, Jaysingpur',
            year: '2021 - 2024',
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
            {/* About Section */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">About Me</h1>
                    <div className="got-divider"><span>⚔</span></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Professional Summary */}
                        <h3 className="heading-md mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Sparkles color="var(--accent-color)" size={22} /> Professional Summary
                        </h3>
                        <p className="text-body mb-8" style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--text-primary)' }}>
                            Android/Java developer with 11 months of internship experience in mobile application development, Firebase-backed systems, and clean user experiences. Passionate about applying technical knowledge to build practical software solutions, contribute to organizational growth, and continuously develop professionally.
                        </p>

                        {/* Professional Experience */}
                        <h3 className="heading-md mb-4" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <Briefcase color="var(--accent-color)" size={22} /> Professional Experience
                        </h3>
                        <motion.div
                            className="glass-card mb-8"
                            style={{ padding: '2rem', borderLeft: '3px solid var(--accent-color)', position: 'relative' }}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                <div>
                                    <h4 style={{ fontSize: '1.15rem', color: 'var(--accent-gold)', marginBottom: '0.25rem' }}>
                                        Android / Java Developer Intern
                                    </h4>
                                    <p style={{ color: 'var(--text-primary)', fontSize: '1rem' }}>
                                        Infoyashonand Technology Pvt. Ltd., Sangli
                                    </p>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                                    <Calendar size={15} />
                                    11 Months
                                </div>
                            </div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                                {[
                                    'Collaborated on application development tasks while focusing on clean UI, functionality, and user experience.',
                                    'Developed and maintained mobile application features using Android Studio, Java, and Firebase technologies.',
                                    'Worked on Android/Java application development and contributed to practical software solutions.'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                                        <span style={{ color: 'var(--accent-color)', fontSize: '0.7rem', marginTop: '0.45rem', flexShrink: 0 }}>◆</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
                    >
                        {/* Highlight Cards */}
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
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Fluid UI, activities, lifecycle &amp; Material components</p>
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
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Clean OOP design, performance &amp; maintainable structures</p>
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
                                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Firebase &amp; Cloud Realm</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Real-time synchronization, Firestore &amp; secure authentication</p>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '2rem' }}>
                            <div style={{
                                padding: '1.1rem',
                                background: 'rgba(212,175,55,0.1)',
                                border: '1px solid rgba(212,175,55,0.3)',
                                borderRadius: '1rem',
                                color: 'var(--accent-color)'
                            }}>
                                <MapPin size={32} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Kolhapur, Maharashtra</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem' }}>Open to remote &amp; on-site opportunities</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Education Section */}
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="heading-lg">Education</h2>
                    <div className="got-divider"><span>⚔</span></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.5 }}
                            whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                            style={{ borderLeft: '3px solid var(--accent-color)', position: 'relative' }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                                <GraduationCap color="var(--accent-color)" size={22} />
                                <span style={{
                                    padding: '0.3rem 0.85rem',
                                    background: 'rgba(212,175,55,0.12)',
                                    border: '1px solid rgba(212,175,55,0.3)',
                                    borderRadius: '2rem',
                                    fontSize: '0.82rem',
                                    fontWeight: 600,
                                    fontFamily: 'Cinzel, serif',
                                    color: 'var(--accent-gold)',
                                    letterSpacing: '0.04em'
                                }}>{edu.year}</span>
                            </div>
                            <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>{edu.degree}</h4>
                            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>{edu.institution}</p>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.35rem 0.9rem',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '2rem',
                                fontSize: '0.88rem',
                                color: 'var(--text-secondary)'
                            }}>
                                Score: <span style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{edu.percentage}</span>
                            </div>
                        </motion.div>
                    ))}
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

            {/* Currently Learning, Soft Skills, Languages */}
            <section className="section container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {/* Currently Learning */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                padding: '0.6rem',
                                borderRadius: '0.75rem',
                                background: 'rgba(0,240,255,0.1)',
                                border: '1px solid rgba(0,240,255,0.25)'
                            }}>
                                <BookOpen size={22} color="var(--accent-ice)" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Currently Learning</h3>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {currentlyLearning.map(item => (
                                <div key={item} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.7rem',
                                    padding: '0.65rem 1rem',
                                    background: 'rgba(0,240,255,0.04)',
                                    border: '1px solid rgba(0,240,255,0.15)',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    <span style={{ color: 'var(--accent-ice)', fontSize: '0.6rem' }}>●</span>
                                    {item}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Soft Skills */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                padding: '0.6rem',
                                borderRadius: '0.75rem',
                                background: 'rgba(212,175,55,0.1)',
                                border: '1px solid rgba(212,175,55,0.25)'
                            }}>
                                <Users size={22} color="var(--accent-color)" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Soft Skills</h3>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {softSkills.map(skill => (
                                <span key={skill} style={{
                                    padding: '0.5rem 1.1rem',
                                    background: 'rgba(212,175,55,0.06)',
                                    border: '1px solid rgba(212,175,55,0.2)',
                                    borderRadius: '2rem',
                                    fontSize: '0.9rem',
                                    color: 'var(--text-secondary)'
                                }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Languages */}
                    <motion.div
                        className="glass-card"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        whileHover={{ y: -5, borderColor: 'rgba(212, 175, 55, 0.45)' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
                            <div style={{
                                padding: '0.6rem',
                                borderRadius: '0.75rem',
                                background: 'rgba(255,106,0,0.1)',
                                border: '1px solid rgba(255,106,0,0.25)'
                            }}>
                                <Languages size={22} color="#ff7b25" />
                            </div>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>Languages</h3>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            {languages.map(lang => (
                                <div key={lang} style={{
                                    flex: 1,
                                    textAlign: 'center',
                                    padding: '1rem 0.5rem',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '0.75rem',
                                    fontSize: '0.95rem',
                                    color: 'var(--text-primary)',
                                    fontWeight: 500
                                }}>
                                    {lang}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Interests */}
            <section className="section container" style={{ paddingTop: '0' }}>
                <motion.div
                    className="glass-card"
                    style={{
                        textAlign: 'center',
                        padding: '3rem',
                        background: 'linear-gradient(135deg, rgba(12,18,32,0.9) 0%, rgba(212,175,55,0.06) 100%)',
                        border: '1px solid rgba(212,175,55,0.2)'
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h3 className="heading-md mb-4" style={{ color: 'var(--accent-gold)' }}>Interests</h3>
                    <p className="text-body" style={{ fontSize: '1.1rem' }}>
                        Mobile Development &amp; New Technologies
                    </p>
                </motion.div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
                @media (max-width: 768px) {
                    section > div[style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}} />
        </PageTransition>
    );
}
