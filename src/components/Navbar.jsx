import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scale } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '#home' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Uzmanlık Alanları', href: '#services' },
    { name: 'Ekibimiz', href: '#team' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-4 shadow-lg' : 'bg-transparent py-6'
      }`}
      style={{
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
        borderBottom: isScrolled ? '1px solid rgba(197, 160, 89, 0.2)' : 'none'
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Scale size={32} color={isScrolled ? '#c5a059' : '#ffffff'} />
          <span 
            style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              fontFamily: 'Playfair Display, serif',
              color: isScrolled ? '#1a1a1a' : '#ffffff'
            }}
          >
            DEMİR & ORTAKLIĞI
          </span>
        </div>

        {/* Desktop Menu */}
        <ul style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href}
                style={{ 
                  color: isScrolled ? '#1a1a1a' : '#ffffff',
                  fontWeight: '500',
                  fontSize: '0.9rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
                onMouseEnter={(e) => e.target.style.color = '#c5a059'}
                onMouseLeave={(e) => e.target.style.color = isScrolled ? '#1a1a1a' : '#ffffff'}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li>
            <button
              style={{
                backgroundColor: '#c5a059',
                color: '#ffffff',
                padding: '0.8rem 1.5rem',
                borderRadius: '4px',
                fontWeight: '600',
                fontSize: '0.9rem'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#a68541'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#c5a059'}
            >
              Randevu Al
            </button>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none' }} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
           {isMobileMenuOpen ? <X color={isScrolled ? '#1a1a1a' : '#ffffff'} /> : <Menu color={isScrolled ? '#1a1a1a' : '#ffffff'} />}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 992px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; cursor: pointer; }
        }
      `}} />
    </nav>
  );
};

export default Navbar;
