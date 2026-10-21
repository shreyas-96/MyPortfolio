'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Contact() {
    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">Send A Raven</h1>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body" style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
                        Have an app idea? Let&apos;s forge your vision into a working mobile application.
                    </p>
                </div>

                {/* Responsive two-col: info left, form right */}
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
                                { icon: <Mail color="var(--accent-gold)" size={22} />, label: 'EMAIL', href: 'mailto:chudmungeshreyas0096@gmail.com', text: 'chudmungeshreyas0096@gmail.com' },
                                { icon: <FaGithub color="var(--accent-gold)" size={22} />, label: 'GITHUB', href: 'https://github.com/shreyas-96', text: 'github.com/shreyas-96' },
                                { icon: <FaLinkedin color="var(--accent-gold)" size={22} />, label: 'LINKEDIN', href: 'https://linkedin.com/in/shreyaschudmunge96', text: 'linkedin.com/in/shreyaschudmunge96' },
                            ].map(channel => (
                                <div key={channel.label} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{
                                        padding: '0.85rem',
                                        background: 'rgba(201,168,76,0.10)',
                                        border: '1px solid rgba(201,168,76,0.25)',
                                        borderRadius: '0.75rem',
                                        flexShrink: 0,
                                        minWidth: '50px', minHeight: '50px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        {channel.icon}
                                    </div>
                                    <div style={{ minWidth: 0 }}>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>{channel.label}</p>
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

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
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
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Name + Email row */}
                            <div className="form-row">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="contact-name" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontFamily: 'Cinzel, serif' }}>Your Name</label>
                                    <input
                                        type="text"
                                        id="contact-name"
                                        placeholder="Lord Stark / John Doe"
                                        style={{
                                            width: '100%', padding: '1rem',
                                            background: 'rgba(6,7,14,0.75)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none', fontFamily: 'Inter, sans-serif',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="contact-email" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontFamily: 'Cinzel, serif' }}>Your Email</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        placeholder="john@realm.com"
                                        style={{
                                            width: '100%', padding: '1rem',
                                            background: 'rgba(6,7,14,0.75)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none', fontFamily: 'Inter, sans-serif',
                                            fontSize: '1rem',
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="contact-scope" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontFamily: 'Cinzel, serif' }}>Project Scope</label>
                                <select
                                    id="contact-scope"
                                    style={{
                                        width: '100%', padding: '1rem',
                                        background: 'rgba(6,7,14,0.75)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none', fontFamily: 'Inter, sans-serif',
                                        fontSize: '1rem', appearance: 'none',
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
                                <label htmlFor="contact-message" style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', fontFamily: 'Cinzel, serif' }}>Message Details</label>
                                <textarea
                                    id="contact-message"
                                    rows={5}
                                    placeholder="Describe your mobile application requirements..."
                                    style={{
                                        width: '100%', padding: '1rem',
                                        background: 'rgba(6,7,14,0.75)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none', resize: 'vertical',
                                        fontFamily: 'Inter, sans-serif',
                                        fontSize: '1rem', minHeight: '130px',
                                    }}
                                />
                            </div>

                            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                                Dispatch Message <Send size={18} />
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
                        border-color: rgba(201,168,76,0.45) !important;
                        box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
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
