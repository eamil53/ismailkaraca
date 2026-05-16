import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" style={{ padding: '120px 0', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute',
                top: '-20px',
                left: '-20px',
                width: '100%',
                height: '100%',
                border: '2px solid #c5a059',
                zIndex: -1,
                borderRadius: '8px'
              }} />
              <img 
                src="/team.png" 
                alt="Ekibimiz" 
                style={{ 
                  width: '100%', 
                  borderRadius: '8px',
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
                }} 
              />
            </motion.div>
          </div>
          
          <div style={{ flex: '1.2', minWidth: '350px' }}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h5 style={{ color: '#c5a059', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                Hakkımızda
              </h5>
              <h2 style={{ fontSize: '2.8rem', color: '#1a1a1a', marginBottom: '2rem' }}>
                Adaletin Peşinde, <br /> <span style={{ color: '#c5a059' }}>Güçlü</span> Bir Miras
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#444444', marginBottom: '1.5rem', lineHeight: '1.8' }}>
                2005 yılında İstanbul'un kalbinde kurulan Demir & Ortaklığı, dürüstlük, sadakat ve 
                profesyonellik ilkeleri üzerine inşa edilmiştir. Misyonumuz, müvekkillerimizin 
                haklarını en etkin şekilde savunmak ve onlara hukukun her alanında güvenilir bir liman olmaktır.
              </p>
              <p style={{ fontSize: '1.1rem', color: '#444444', marginBottom: '2.5rem', lineHeight: '1.8' }}>
                Uzman avukat kadromuzla, yerel ve uluslararası düzeyde müvekkillerimize kapsamlı hukuki danışmanlık 
                hizmeti sunuyoruz. Her vakaya özel stratejiler geliştirerek, adaletin zamanında ve eksiksiz 
                tecelli etmesi için çalışıyoruz.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '2rem', color: '#c5a059', marginBottom: '0.5rem' }}>15+</h4>
                  <p style={{ color: '#666666', fontWeight: '500' }}>Uzman Avukat</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '2rem', color: '#c5a059', marginBottom: '0.5rem' }}>2500+</h4>
                  <p style={{ color: '#666666', fontWeight: '500' }}>Başarılı Dava</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
