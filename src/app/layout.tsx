import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GotBackground from "@/components/GotBackground";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Shreyas Chudmunge | Android & Java Developer",
    description: "Portfolio of Shreyas Chudmunge — Android and Java Developer forging robust mobile applications, Firebase architectures, and high-performance software.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <GotBackground />
                <Navbar />
                <main className="page-wrapper">
                    {children}
                </main>
                <footer style={{
                    borderTop: '1px solid var(--glass-border)',
                    padding: '3.5rem 0 2.5rem',
                    marginTop: 'auto',
                    background: 'rgba(6, 9, 17, 0.88)',
                    backdropFilter: 'blur(16px)',
                    position: 'relative',
                    zIndex: 1,
                }}>
                    <div className="container" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.75rem'
                    }}>
                        <div style={{ textAlign: 'center' }}>
                            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.06em' }}>
                                Shreyas<span style={{ color: 'var(--accent-color)' }}>.dev</span>
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
                                Forging Native Android & Java Software Realms
                            </p>
                        </div>

                        {/* Medieval divider accent */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            color: 'var(--accent-color)',
                            fontSize: '0.85rem'
                        }}>
                            <span style={{ width: '40px', height: '1px', background: 'var(--glass-border)' }}></span>
                            <span>⚔</span>
                            <span style={{ width: '40px', height: '1px', background: 'var(--glass-border)' }}></span>
                        </div>

                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                            <a
                                href="https://github.com/shreyas-96"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: 'var(--text-secondary)' }}
                                className="hover:text-accent"
                                aria-label="GitHub Profile"
                            >
                                <FaGithub size={22} />
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                style={{ color: 'var(--text-secondary)' }}
                                className="hover:text-accent"
                                aria-label="LinkedIn Profile"
                            >
                                <FaLinkedin size={22} />
                            </a>
                            <a
                                href="mailto:chudmungeshreyas0096@gmail.com"
                                style={{ color: 'var(--text-secondary)' }}
                                className="hover:text-accent"
                                aria-label="Send Email"
                            >
                                <Mail size={22} />
                            </a>
                        </div>

                        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                            © 2026 Shreyas Sunil Chudmunge. All rights reserved.
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
