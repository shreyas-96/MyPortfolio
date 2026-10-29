import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GotBackground from "@/components/GotBackground";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export const metadata: Metadata = {
    title: "Shreyas Chudmunge | Android & Java Developer",
    description: "Portfolio of Shreyas Chudmunge — Android and Java Developer forging robust mobile applications, Firebase architectures, and high-performance software.",
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    viewportFit: 'cover',   // iOS notch / Dynamic Island support
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
                    borderTop: '1px solid rgba(230, 36, 41, 0.15)',
                    padding: '3.5rem 0 2.5rem',
                    marginTop: 'auto',
                    background: 'rgba(8, 11, 20, 0.90)',
                    backdropFilter: 'blur(18px)',
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
                                Shreyas<span style={{ color: 'var(--accent-red)' }}>.dev</span>
                            </h3>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.92rem' }}>
                                Building Native Android &amp; Java Mobile Applications
                            </p>
                        </div>

                        {/* Cinematic divider */}
                        <div style={{
                            width: '80px', height: '2px',
                            background: 'linear-gradient(90deg, #E62429, #D9A441)',
                            borderRadius: '2px',
                            boxShadow: '0 0 10px rgba(230, 36, 41, 0.4)',
                        }} />

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
                                href="https://linkedin.com/in/shreyaschudmunge96"
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
