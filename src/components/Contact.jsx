import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" style={{ padding: '100px 0', backgroundColor: '#1a1a1a', color: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <h5 style={{ color: '#c5a059', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
              İletişim
            </h5>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '2rem' }}>
              Hukuki Danışmanlık İçin <br /> <span style={{ color: '#c5a059' }}>Bizimle</span> İletişime Geçin
            </h2>
            <p style={{ color: '#aaaaaa', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Sorularınız veya randevu talepleriniz için formumuzu doldurabilir ya da doğrudan 
              bizi arayabilirsiniz. Ekibimiz en kısa sürede size geri dönüş yapacaktır.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: '50%', color: '#c5a059' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <p style={{ color: '#c5a059', fontWeight: '600', marginBottom: '0.2rem' }}>Telefon</p>
                  <p style={{ fontSize: '1.1rem' }}>+90 (212) 555 01 01</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: '50%', color: '#c5a059' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <p style={{ color: '#c5a059', fontWeight: '600', marginBottom: '0.2rem' }}>E-Posta</p>
                  <p style={{ fontSize: '1.1rem' }}>bilgi@demirhukuk.com</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(197, 160, 89, 0.1)', borderRadius: '50%', color: '#c5a059' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <p style={{ color: '#c5a059', fontWeight: '600', marginBottom: '0.2rem' }}>Adres</p>
                  <p style={{ fontSize: '1.1rem' }}>Levent, Büyükdere Cd. No:123, 34330 Beşiktaş/İstanbul</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '350px' }}>
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                padding: '3rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#aaaaaa' }}>Ad Soyad</label>
                  <input type="text" style={{ 
                    padding: '1rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    outline: 'none'
                  }} placeholder="Adınız Soyadınız" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: '#aaaaaa' }}>Telefon</label>
                  <input type="tel" style={{ 
                    padding: '1rem', 
                    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '4px',
                    color: '#ffffff',
                    outline: 'none'
                  }} placeholder="Telefon Numaranız" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#aaaaaa' }}>E-Posta</label>
                <input type="email" style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  color: '#ffffff',
                  outline: 'none'
                }} placeholder="E-Posta Adresiniz" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
                <label style={{ fontSize: '0.9rem', color: '#aaaaaa' }}>Mesajınız</label>
                <textarea rows="4" style={{ 
                  padding: '1rem', 
                  backgroundColor: 'rgba(255, 255, 255, 0.08)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  color: '#ffffff',
                  outline: 'none',
                  resize: 'none'
                }} placeholder="Konu hakkında kısa bir bilgi veriniz..."></textarea>
              </div>
              <button style={{
                width: '100%',
                backgroundColor: '#c5a059',
                color: '#ffffff',
                padding: '1.2rem',
                fontSize: '1rem',
                fontWeight: '600',
                borderRadius: '4px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#a68541'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#c5a059'}
              >
                Mesajı Gönder
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
