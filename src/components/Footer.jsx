import React from 'react';
import { Scale, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#0a0a0a', color: '#ffffff', padding: '80px 0 30px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '60px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <Scale size={32} color="#c5a059" />
              <span style={{ fontSize: '1.5rem', fontWeight: '700', fontFamily: 'Playfair Display, serif' }}>
                DEMİR & ORTAKLIĞI
              </span>
            </div>
            <p style={{ color: '#888888', lineHeight: '1.8', marginBottom: '2rem' }}>
              Profesyonel hukuk çözümleri ve danışmanlık hizmetleri ile adaletin güvenilir temsilcisi.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#ffffff', opacity: 0.7 }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}><Linkedin size={20} /></a>
              <a href="#" style={{ color: '#ffffff', opacity: 0.7 }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}><Twitter size={20} /></a>
              <a href="#" style={{ color: '#ffffff', opacity: 0.7 }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}><Instagram size={20} /></a>
              <a href="#" style={{ color: '#ffffff', opacity: 0.7 }} onMouseEnter={(e) => e.target.style.opacity = 1} onMouseLeave={(e) => e.target.style.opacity = 0.7}><Facebook size={20} /></a>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', borderLeft: '3px solid #c5a059', paddingLeft: '1rem' }}>Hızlı Menü</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#home" style={{ color: '#888888' }} onMouseEnter={(e) => e.target.style.color = '#c5a059'} onMouseLeave={(e) => e.target.style.color = '#888888'}>Ana Sayfa</a></li>
              <li><a href="#about" style={{ color: '#888888' }} onMouseEnter={(e) => e.target.style.color = '#c5a059'} onMouseLeave={(e) => e.target.style.color = '#888888'}>Hakkımızda</a></li>
              <li><a href="#services" style={{ color: '#888888' }} onMouseEnter={(e) => e.target.style.color = '#c5a059'} onMouseLeave={(e) => e.target.style.color = '#888888'}>Uzmanlık Alanları</a></li>
              <li><a href="#contact" style={{ color: '#888888' }} onMouseEnter={(e) => e.target.style.color = '#c5a059'} onMouseLeave={(e) => e.target.style.color = '#888888'}>İletişim</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', borderLeft: '3px solid #c5a059', paddingLeft: '1rem' }}>Uzmanlıklar</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li><a href="#" style={{ color: '#888888' }}>Ceza Hukuku</a></li>
              <li><a href="#" style={{ color: '#888888' }}>Ticaret Hukuku</a></li>
              <li><a href="#" style={{ color: '#888888' }}>Aile Hukuku</a></li>
              <li><a href="#" style={{ color: '#888888' }}>Gayrimenkul Hukuku</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '2rem', borderLeft: '3px solid #c5a059', paddingLeft: '1rem' }}>Bülten</h4>
            <p style={{ color: '#888888', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Hukuki gelişmelerden haberdar olmak için bültenimize abone olun.
            </p>
            <div style={{ display: 'flex' }}>
              <input type="email" placeholder="E-Posta" style={{ 
                padding: '0.8rem', 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333', 
                borderRadius: '4px 0 0 4px', 
                color: '#fff', 
                flex: 1,
                outline: 'none'
              }} />
              <button style={{ 
                backgroundColor: '#c5a059', 
                padding: '0.8rem 1.2rem', 
                borderRadius: '0 4px 4px 0', 
                color: '#fff',
                fontWeight: '600'
              }}>Abone Ol</button>
            </div>
          </div>
        </div>

        <div style={{ 
          borderTop: '1px solid #222', 
          paddingTop: '30px', 
          textAlign: 'center', 
          fontSize: '0.9rem', 
          color: '#555' 
        }}>
          <p>© 2024 Demir & Ortaklığı Hukuk Bürosu. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
