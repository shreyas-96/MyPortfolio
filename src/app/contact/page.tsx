'use client';

import PageTransition from '@/components/PageTransition';
import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function Contact() {
    return (
        <PageTransition>
            <section className="section container">
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="heading-lg">Send A Raven</h1>
                    <div className="got-divider"><span>⚔</span></div>
                    <p className="text-body" style={{ fontSize: '1.2rem' }}>
                        Have an app idea? Let&apos;s forge your vision into a working mobile application.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.8fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="glass-card"
                        style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
                    >
                        <h3 className="heading-md">Direct Channels</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    padding: '0.85rem',
                                    background: 'rgba(212,175,55,0.1)',
                                    border: '1px solid rgba(212,175,55,0.25)',
                                    borderRadius: '0.75rem'
                                }}>
                                    <Mail color="var(--accent-gold)" size={22} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>EMAIL</p>
                                    <a href="mailto:chudmungeshreyas0096@gmail.com" style={{ color: 'var(--text-primary)', fontWeight: 500 }} className="hover:text-accent">
                                        chudmungeshreyas0096@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    padding: '0.85rem',
                                    background: 'rgba(212,175,55,0.1)',
                                    border: '1px solid rgba(212,175,55,0.25)',
                                    borderRadius: '0.75rem'
                                }}>
                                    <FaGithub color="var(--accent-gold)" size={22} />
                                </div>
                                <div>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', fontFamily: 'Cinzel, serif', letterSpacing: '0.05em' }}>GITHUB</p>
                                    <a href="https://github.com/shreyas-96" target="_blank" rel="noreferrer" style={{ color: 'var(--text-primary)', fontWeight: 500 }} className="hover:text-accent">
                                        github.com/shreyas-96
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                            <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>
                                Available for freelance contracts, mobile development consultations, and full-time engineering roles.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="glass-card"
                    >
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="name" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'Cinzel, serif' }}>Your Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Lord Stark / John Doe"
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(6,9,17,0.7)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            fontFamily: 'Inter, sans-serif'
                                        }}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <label htmlFor="email" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'Cinzel, serif' }}>Your Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="john@realm.com"
                                        style={{
                                            padding: '1rem',
                                            background: 'rgba(6,9,17,0.7)',
                                            border: '1px solid var(--glass-border)',
                                            borderRadius: '0.75rem',
                                            color: 'var(--text-primary)',
                                            outline: 'none',
                                            fontFamily: 'Inter, sans-serif'
                                        }}
                                    />
                                </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="projectType" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'Cinzel, serif' }}>Project Scope</label>
                                <select
                                    id="projectType"
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(6,9,17,0.7)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        fontFamily: 'Inter, sans-serif',
                                        appearance: 'none'
                                    }}
                                >
                                    <option value="android">Native Android App Development</option>
                                    <option value="firebase">Firebase & Cloud Integration</option>
                                    <option value="api">API / Payment Gateway Integration</option>
                                    <option value="maintenance">App Hardening & Maintenance</option>
                                    <option value="other">Other Collaboration</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label htmlFor="message" style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: 'Cinzel, serif' }}>Message Details</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="Describe your mobile application requirements..."
                                    style={{
                                        padding: '1rem',
                                        background: 'rgba(6,9,17,0.7)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '0.75rem',
                                        color: 'var(--text-primary)',
                                        outline: 'none',
                                        resize: 'vertical',
                                        fontFamily: 'Inter, sans-serif'
                                    }}
                                />
                            </div>

                            <button type="button" className="btn btn-primary" style={{ alignSelf: 'flex-start', marginTop: '0.75rem' }}>
                                Dispatch Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        @media (max-width: 768px) {
          form > div:first-child {
            grid-template-columns: 1fr !important;
          }
          section > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
        }
      `}} />
        </PageTransition>
    );
}
