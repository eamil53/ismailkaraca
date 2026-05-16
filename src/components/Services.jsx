import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Briefcase, Users, Home, Gavel, FileText } from 'lucide-react';

const services = [
  {
    title: 'Ceza Hukuku',
    description: 'Şüpheli veya sanık müdafiiliği ile mağdur ve katılan vekilliği süreçlerinde yanınızdayız.',
    icon: <Gavel size={40} />
  },
  {
    title: 'Ticaret Hukuku',
    description: 'Şirketler hukuku, sözleşmeler ve ticari uyuşmazlıklarda profesyonel danışmanlık.',
    icon: <Briefcase size={40} />
  },
  {
    title: 'Aile Hukuku',
    description: 'Boşanma, velayet, mal paylaşımı ve nafaka davalarında hassas ve gizlilik odaklı yaklaşım.',
    icon: <Users size={40} />
  },
  {
    title: 'Gayrimenkul Hukuku',
    description: 'Tapu iptal tescil, ortaklığın giderilmesi ve kira hukuku uyuşmazlıkları.',
    icon: <Home size={40} />
  },
  {
    title: 'İş Hukuku',
    description: 'İşe iade, tazminat ve iş kazaları kaynaklı uyuşmazlıkların çözümü.',
    icon: <Shield size={40} />
  },
  {
    title: 'Bilişim Hukuku',
    description: 'KVKK uyum süreçleri, siber suçlar ve dijital varlıkların korunması.',
    icon: <FileText size={40} />
  }
];

const Services = () => {
  return (
    <section id="services" style={{ padding: '100px 0', backgroundColor: '#f9f9f9' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h5 style={{ color: '#c5a059', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '1rem' }}>
            Uzmanlık Alanlarımız
          </h5>
          <h2 style={{ fontSize: '3rem', color: '#1a1a1a' }}>
            Size Nasıl <span style={{ color: '#c5a059' }}>Yardımcı</span> Olabiliriz?
          </h2>
          <div style={{ 
            width: '80px', 
            height: '3px', 
            backgroundColor: '#c5a059', 
            margin: '2rem auto' 
          }} />
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                backgroundColor: '#ffffff',
                padding: '3rem 2rem',
                borderRadius: '8px',
                textAlign: 'center',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                border: '1px solid #f0f0f0',
                transition: 'all 0.3s ease'
              }}
              whileHover={{ 
                y: -10, 
                borderColor: '#c5a059',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ color: '#c5a059', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                {service.icon}
              </div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>{service.title}</h3>
              <p style={{ color: '#666666', fontSize: '1rem', lineHeight: '1.7' }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
