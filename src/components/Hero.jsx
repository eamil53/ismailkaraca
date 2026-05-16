import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" style={{ 
      height: '100vh', 
      width: '100%', 
      position: 'relative', 
      display: 'flex', 
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Background Image with Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url("/hero.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: -2
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        zIndex: -1
      }} />

      <div className="container">
        <div style={{ maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h5 style={{ 
              color: '#c5a059', 
              textTransform: 'uppercase', 
              letterSpacing: '4px', 
              marginBottom: '1.5rem',
              fontWeight: '600'
            }}>
              Güven, Tecrübe ve Kararlılık
            </h5>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
              color: '#ffffff', 
              marginBottom: '2rem',
              lineHeight: 1.1
            }}>
              Hukukta <span style={{ color: '#c5a059' }}>Profesyonel</span> <br /> Çözüm Ortağınız
            </h1>
            <p style={{ 
              color: '#e0e0e0', 
              fontSize: '1.1rem', 
              marginBottom: '3rem',
              maxWidth: '600px',
              lineHeight: 1.8
            }}>
              Demir & Ortaklığı olarak, karmaşık hukuki süreçlerinizde 20 yılı aşkın tecrübemizle yanınızdayız. 
              Adalet odaklı, şeffaf ve sonuç odaklı yaklaşımlarımızla haklarınızı en üst düzeyde koruyoruz.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button style={{
                backgroundColor: '#c5a059',
                color: '#ffffff',
                padding: '1.2rem 2.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '4px',
                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
              >
                Hizmetlerimiz
              </button>
              <button style={{
                border: '2px solid #ffffff',
                color: '#ffffff',
                padding: '1.2rem 2.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = '#ffffff';
              }}
              >
                Bize Ulaşın
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Element */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '50px',
          right: '50px',
          width: '150px',
          height: '2px',
          backgroundColor: '#c5a059'
        }}
      />
    </section>
  );
};

export default Hero;
