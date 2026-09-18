'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', path: '/' },
        { name: 'About & Skills', path: '/about' },
        { name: 'Projects', path: '/projects' },
        { name: 'Services', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <nav
            className="navbar"
            style={{
                background: scrolled ? 'rgba(6, 9, 17, 0.92)' : 'rgba(6, 9, 17, 0.65)',
                padding: scrolled ? '1rem 0' : '1.35rem 0',
                borderBottom: scrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
                backdropFilter: 'blur(16px)',
            }}
        >
            <div className="container nav-container">
                <Link href="/" className="logo">
                    <span>Shreyas</span>
                    <span style={{ color: 'var(--accent-color)' }}>.dev</span>
                </Link>

                <div className="nav-links">
                    {links.map((link) => (
                        <Link
                            key={link.path}
                            href={link.path}
                            className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                        >
                            {link.name}
                            {pathname === link.path && (
                                <motion.div
                                    layoutId="underline"
                                    style={{
                                        height: '2px',
                                        background: 'var(--accent-gradient)',
                                        marginTop: '4px',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 8px rgba(212, 175, 55, 0.5)',
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn btn-primary"
                        style={{ padding: '0.6rem 1.3rem', fontSize: '0.85rem' }}
                    >
                        Let&apos;s Work Together
                    </Link>
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            background: 'rgba(6, 9, 17, 0.96)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid var(--glass-border)',
                            overflow: 'hidden',
                        }}
                    >
                        <div className="container" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`nav-link ${pathname === link.path ? 'active' : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    style={{ fontSize: '1.1rem' }}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/contact"
                                className="btn btn-primary"
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Let&apos;s Work Together
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
