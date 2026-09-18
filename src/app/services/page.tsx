'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Smartphone, Database, Globe, Layout, Wrench, ServerCog } from 'lucide-react';

export default function Services() {
    const services = [
        {
            title: 'Android App Development',
            description: 'Custom, battle-tested native Android applications forged with Java, focusing on high speed, rock-solid stability, and seamless UX.',
            icon: <Smartphone size={30} color="var(--accent-gold)" />
        },
        {
            title: 'Firebase Architecture',
            description: 'Seamless integration of Firebase services including Cloud Firestore, Realtime Database, and Authentication for scalable cloud realms.',
            icon: <Database size={30} color="var(--accent-gold)" />
        },
        {
            title: 'API & Gateway Integration',
            description: 'Connecting your mobile realm with external services: RESTful APIs, payment gateways, and WhatsApp messaging systems.',
            icon: <Globe size={30} color="var(--accent-gold)" />
        },
        {
            title: 'UI/UX Mobile Implementation',
            description: 'Transforming blueprints into pixel-perfect, responsive, and intuitive mobile interfaces following modern Material Design standards.',
            icon: <Layout size={30} color="var(--accent-gold)" />
        },
        {
            title: 'Database Architecture',
            description: 'Designing and engineering resilient local and remote schema structures for secure, high-throughput, and scalable data flow.',
            icon: <ServerCog size={30} color="var(--accent-gold)" />
        },
        {
            title: 'App Hardening & Maintenance',
            description: 'Performance optimization, memory profiling, and meticulous bug resolution to keep your production apps operating at peak capability.',
            icon: <Wrench size={30} color="var(--accent-gold)" />
        }
    ];

    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">Services & Craft</h1>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body">What I can forge and build for your company or product</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="glass-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{
                                y: -6,
                                borderColor: 'rgba(212, 175, 55, 0.45)',
                                boxShadow: '0 12px 35px -10px rgba(212, 175, 55, 0.25)'
                            }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
                        >
                            {/* Ambient flare */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '160px',
                                height: '160px',
                                background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
                                transform: 'translate(30%, -30%)',
                                zIndex: 0
                            }} />

                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '1rem',
                                background: 'rgba(212, 175, 55, 0.1)',
                                border: '1px solid rgba(212, 175, 55, 0.25)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 1
                            }}>
                                {service.icon}
                            </div>

                            <div style={{ position: 'relative', zIndex: 1 }}>
                                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>{service.title}</h3>
                                <p className="text-body" style={{ fontSize: '0.95rem', lineHeight: 1.7 }}>{service.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </PageTransition>
    );
}
