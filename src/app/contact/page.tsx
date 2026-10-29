'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Mail, Send, Zap } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <div className="badge-red" style={{ display: 'inline-flex', marginBottom: '1rem' }}>
                        <Zap size={12} /> Let&apos;s Connect
                    </div>
                    <h1 className="heading-lg">Get In <span className="text-gradient">Touch</span></h1>
                    <div className="got-divider"><span>◆</span></div>
                    <p className="text-body" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)' }}>
                        Have an app idea? Let&apos;s turn your vision into a working mobile application.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Direct Channels */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="glass-card"
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        <h3 className="heading-md">Direct Channels</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                            {[
                                { icon: <Mail color="#E62429" size={22} />, label: 'EMAIL', href: 'mailto:chudmungeshreyas0096@gmail.com', text: 'chudmungeshreyas0096@gmail.com', bg: 'rgba(230,36,41,0.1)', border: 'rgba(230,36,41,0.25)' },
                                { icon: <FaGithub color="#D9A441" size={22} />, label: 'GITHUB', href: 'https://github.com/shreyas-96', text: 'github.com/shreyas-96', bg: 'rgba(217,164,65,0.1)', border: 'rgba(217,164,65,0.25)' },
                                { icon: <FaLinkedin color="#38BDF8" size={22} />, label: 'LINKEDIN', href: 'https://linkedin.com/in/shreyaschudmunge96', text: 'linkedin.com/in/shreyaschudmunge96', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.22)' },
                            ].map(channel => (
                                <div key={channel.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.85rem',
                                        background: channel.bg,
                                        border: `1px solid ${channel.border}`,
                                        borderRadius: '0.75rem',
                                        flexShrink: 0,
                                        minWidth: '50px', minHeight: '50px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        {channel.icon}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{channel.label}</p>
                                        <a
                                            href={channel.href}
                                            target={channel.href.startsWith('mailto') ? undefined : '_blank'}
                                            rel="noreferrer"
                                            style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: 'clamp(0.78rem, 1.8vw, 0.95rem)', wordBreak: 'break-word' }}
                                        >
                                            {channel.text}
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(230,36,41,0.15)' }}>
                            <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                Available for freelance contracts, mobile development consultations, and full-time engineering roles.
                            </p>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card"
                        style={{ border: '1px solid rgba(230,36,41,0.18)' }}
                    >
                        {/* Top red line */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, rgba(230,36,41,0.5), transparent)', borderRadius: '1rem 1rem 0 0' }} />

                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div className="form-row">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="contact-name" style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Your Name</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        placeholder="John Doe"
                                        style={{
                                            width: '100%', padding: '0.9rem',
                                            background: 'rgba(8,11,20,0.7)',
                                            border: '1px solid rgba(217,164,65,0.18)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none', fontFamily: 'Inter, sans-serif',
                                            fontSize: '0.95rem',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="contact-email" style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Your Email</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        placeholder="john@example.com"
                                        style={{
                                            width: '100%', padding: '0.9rem',
                                            background: 'rgba(8,11,20,0.7)',
                                            border: '1px solid rgba(217,164,65,0.18)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none', fontFamily: 'Inter, sans-serif',
                                            fontSize: '0.95rem',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="contact-scope" style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Project Scope</label>
                                <select
                                    id="contact-scope"
                                    style={{
                                        width: '100%', padding: '0.9rem',
                                        background: 'rgba(8,11,20,0.7)',
                                        border: '1px solid rgba(217,164,65,0.18)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none', fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.95rem', appearance: 'none',
                                    }}
                                >
                                    <option value="android">Native Android App Development</option>
                                    <option value="firebase">Firebase &amp; Cloud Integration</option>
                                    <option value="api">API / Payment Gateway Integration</option>
                                    <option value="maintenance">App Hardening &amp; Maintenance</option>
                                    <option value="other">Other Collaboration</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="contact-message" style={{ fontFamily: 'Rajdhani, sans-serif', color: 'var(--text-muted)', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Message Details</label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    placeholder="Describe your mobile application requirements..."
                                    style={{
                                        width: '100%', padding: '0.9rem',
                                        background: 'rgba(8,11,20,0.7)',
                                        border: '1px solid rgba(217,164,65,0.18)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none', resize: 'vertical',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '0.95rem', minHeight: '130px',
                                    }}
                                />
                            </div>

                            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>

                <style dangerouslySetInnerHTML={{ __html: `
                    .contact-grid {
                        display: grid;
                        grid-template-columns: 1fr 1.8fr;
                        gap: 3rem;
                        max-width: 1000px;
                        margin: 0 auto;
                    }
                    .form-row {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 1.25rem;
                    }
                    input::placeholder, textarea::placeholder, select option {
                        color: var(--text-muted);
                    }
                    input:focus, textarea:focus, select:focus {
                        border-color: rgba(230,36,41,0.5) !important;
                        box-shadow: 0 0 0 3px rgba(230,36,41,0.1);
                    }
                    @media (max-width: 768px) {
                        .contact-grid {
                            grid-template-columns: 1fr !important;
                            gap: 2rem;
                        }
                        .form-row {
                            grid-template-columns: 1fr !important;
                        }
                    }
                `}} />
            </section>
        </PageTransition>
    );
}
