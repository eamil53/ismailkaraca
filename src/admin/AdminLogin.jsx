import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User } from 'lucide-react';

const AdminLogin = ({ onLogin }) => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleDragEnd = (event, info) => {
    // If the string is pulled down by at least 30px
    if (info.offset.y > 30) {
      setIsLightOn(!isLightOn);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      onLogin();
    } else {
      alert("Hatalı kullanıcı adı veya şifre! (İpucu: admin / admin123)");
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: isLightOn ? 'radial-gradient(circle at 30% 50%, #2a2a22 0%, #111111 70%)' : '#111', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      transition: 'background 0.5s ease-in-out',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '2rem', width: '100%', textAlign: 'center', color: '#fff', opacity: 0.8, fontFamily: "'Playfair Display', serif" }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 300, letterSpacing: '2px' }}>Login Lamp</h1>
        <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '0.5rem' }}>İpi aşağı doğru çekin</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4rem', width: '100%', maxWidth: '800px', padding: '0 2rem', flexWrap: 'wrap' }}>
        
        {/* Lamp Graphic */}
        <div style={{ position: 'relative', width: '200px', height: '300px' }}>
          {/* Lamp Shade Background Glow */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: isLightOn ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '-50px',
              left: '-50px',
              width: '300px',
              height: '300px',
              background: 'radial-gradient(circle, rgba(255,245,200,0.4) 0%, rgba(255,245,200,0) 70%)',
              borderRadius: '50%',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />

          {/* Lamp Shade */}
          <div style={{ 
            position: 'absolute', 
            top: '50px', 
            left: '25px', 
            width: '150px', 
            height: '60px', 
            background: isLightOn ? '#fffdf0' : '#e6e4d5',
            borderTopLeftRadius: '100px',
            borderTopRightRadius: '100px',
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
            zIndex: 2,
            boxShadow: isLightOn ? '0 0 30px rgba(255, 245, 200, 0.8)' : 'none',
            transition: 'all 0.3s'
          }} />

          {/* Lamp Stand */}
          <div style={{
            position: 'absolute',
            top: '110px',
            left: '95px',
            width: '10px',
            height: '140px',
            background: '#d0cdbc',
            zIndex: 1
          }} />

          {/* Lamp Base */}
          <div style={{
            position: 'absolute',
            top: '250px',
            left: '60px',
            width: '80px',
            height: '15px',
            background: '#d0cdbc',
            borderRadius: '10px',
            zIndex: 1
          }} />

          {/* Pull String (Interactive) */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={handleDragEnd}
            whileDrag={{ scale: 1.1 }}
            style={{
              position: 'absolute',
              top: '110px',
              left: '130px',
              width: '40px',
              height: '100px',
              zIndex: 3,
              cursor: 'grab',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* The string line */}
            <div style={{ width: '2px', height: '60px', background: '#888' }} />
            {/* The string ball */}
            <div style={{ width: '12px', height: '12px', background: '#d4af37', borderRadius: '50%', boxShadow: '0 2px 5px rgba(0,0,0,0.5)' }} />
          </motion.div>
        </div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50, pointerEvents: 'none', display: 'none' }}
          animate={isLightOn ? { opacity: 1, x: 0, pointerEvents: 'auto', display: 'block' } : { opacity: 0, x: 50, pointerEvents: 'none', transitionEnd: { display: 'none' } }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: 'rgba(30, 30, 30, 0.6)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '3rem 2.5rem',
            borderRadius: '24px',
            width: '100%',
            maxWidth: '380px',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)'
          }}
        >
          <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 500 }}>Welcome</h2>
          
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white', outline: 'none', transition: 'border 0.3s' }} 
                  placeholder="admin"
                  required
                />
                <User size={18} style={{ position: 'absolute', top: '16px', left: '16px', color: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white', outline: 'none', transition: 'border 0.3s' }} 
                  placeholder="••••••••"
                  required
                />
                <Lock size={18} style={{ position: 'absolute', top: '16px', left: '16px', color: 'rgba(255,255,255,0.5)' }} />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                marginTop: '1rem',
                padding: '1rem',
                background: 'linear-gradient(90deg, #d4af37 0%, #f9e596 50%, #d4af37 100%)',
                backgroundSize: '200% auto',
                color: '#111',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '1rem',
                cursor: 'pointer',
                transition: '0.5s',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundPosition = 'right center'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundPosition = 'left center'}
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
      
      {/* Back to site link */}
      <a href="#home" style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.color='white'} onMouseLeave={(e) => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
        ← Siteye Geri Dön
      </a>
    </div>
  );
};

export default AdminLogin;
