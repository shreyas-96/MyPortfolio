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
                background: scrolled ? 'rgba(8, 11, 20, 0.96)' : 'rgba(8, 11, 20, 0.70)',
                padding: scrolled ? '0.4rem 0' : '0.5rem 0',
                borderBottom: scrolled
                    ? '1px solid rgba(230, 36, 41, 0.22)'
                    : '1px solid transparent',
                backdropFilter: 'blur(18px)',
                boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.5)' : 'none',
            }}
        >
            <div className="container nav-container">
                <Link href="/" className="logo">
                    <span>Shreyas</span>
                    <span style={{ color: 'var(--accent-red)' }}>.dev</span>
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
                                        background: 'linear-gradient(90deg, #E62429, #D9A441)',
                                        marginTop: '4px',
                                        borderRadius: '2px',
                                        boxShadow: '0 0 10px rgba(230, 36, 41, 0.6)',
                                    }}
                                />
                            )}
                        </Link>
                    ))}
                    <Link
                        href="/contact"
                        className="btn btn-primary"
                        style={{ padding: '0.55rem 1.3rem', fontSize: '0.82rem' }}
                    >
                        Let&apos;s Connect
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
                            background: 'rgba(8, 11, 20, 0.97)',
                            backdropFilter: 'blur(22px)',
                            borderBottom: '1px solid rgba(230, 36, 41, 0.18)',
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
                                Let&apos;s Connect
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
