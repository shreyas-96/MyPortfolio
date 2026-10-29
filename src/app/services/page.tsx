'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Smartphone, Database, Globe, Layout, Wrench, ServerCog, Zap } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: 'Android App Development',
            description: 'Custom, battle-tested native Android applications built with Java, focusing on high speed, rock-solid stability, and seamless UX.',
            icon: <Smartphone size={28} color="#E62429" />,
            accentBg: 'rgba(230,36,41,0.1)',
            accentBorder: 'rgba(230,36,41,0.25)',
            flare: 'rgba(230,36,41,0.10)',
        },
        {
            title: 'Firebase Architecture',
            description: 'Seamless integration of Firebase services including Cloud Firestore, Realtime Database, and Authentication for scalable cloud systems.',
            icon: <Database size={28} color="#D9A441" />,
            accentBg: 'rgba(217,164,65,0.1)',
            accentBorder: 'rgba(217,164,65,0.25)',
            flare: 'rgba(217,164,65,0.10)',
        },
        {
            title: 'API & Gateway Integration',
            description: 'Connecting your mobile applications with external services: RESTful APIs, payment gateways, and WhatsApp messaging systems.',
            icon: <Globe size={28} color="#38BDF8" />,
            accentBg: 'rgba(56,189,248,0.08)',
            accentBorder: 'rgba(56,189,248,0.2)',
            flare: 'rgba(56,189,248,0.08)',
        },
        {
            title: 'UI/UX Mobile Implementation',
            description: 'Transforming designs into pixel-perfect, responsive, and intuitive mobile interfaces following modern Material Design standards.',
            icon: <Layout size={28} color="#E62429" />,
            accentBg: 'rgba(230,36,41,0.1)',
            accentBorder: 'rgba(230,36,41,0.25)',
            flare: 'rgba(230,36,41,0.10)',
        },
        {
            title: 'Database Architecture',
            description: 'Designing and engineering resilient local and remote schema structures for secure, high-throughput, and scalable data flow.',
            icon: <ServerCog size={28} color="#D9A441" />,
            accentBg: 'rgba(217,164,65,0.1)',
            accentBorder: 'rgba(217,164,65,0.25)',
            flare: 'rgba(217,164,65,0.10)',
        },
        {
            title: 'App Hardening & Maintenance',
            description: 'Performance optimization, memory profiling, and meticulous bug resolution to keep your production apps at peak capability.',
            icon: <Wrench size={28} color="#AAB5C8" />,
            accentBg: 'rgba(170,181,200,0.08)',
            accentBorder: 'rgba(170,181,200,0.2)',
            flare: 'rgba(170,181,200,0.06)',
        }
    ];

    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="badge-red" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                        <Zap size={12} /> What I Build
                    </div>
                    <h1 className="heading-lg">Services & <span className="text-gradient">Expertise</span></h1>
                    <div className="got-divider"><span>◆</span></div>
                    <p className="text-body">What I can build and deliver for your company or product</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Corner ambient flare */}
                            <div style={{
                                position: 'absolute', top: 0, right: 0,
                                width: '160px', height: '160px',
                                background: `radial-gradient(circle, ${service.flare} 0%, transparent 70%)`,
                                transform: 'translate(30%, -30%)',
                                zIndex: 0,
                            }} />

                            <div style={{
                                width: '54px', height: '54px', borderRadius: '0.875rem',
                                background: service.accentBg,
                                border: `1px solid ${service.accentBorder}`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', zIndex: 1,
                            }}>
                                {service.icon}
                            </div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.65rem' }}>{service.title}</h3>
                                <p className="text-body" style={{ fontSize: '0.93rem', lineHeight: 1.75 }}>{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
