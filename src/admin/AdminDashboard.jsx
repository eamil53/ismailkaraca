import React, { useState, useEffect } from 'react';
import { 
  PenTool, 
  Calendar, 
  LogOut, 
  Plus, 
  Trash2, 
  LayoutDashboard, 
  FileText, 
  Users, 
  Phone, 
  Loader2, 
  ArrowRight,
  Activity,
  TrendingUp,
  Clock,
  Globe,
  Laptop,
  MapPin,
  Eye,
  RefreshCw,
  Briefcase,
  Gavel,
  Scale,
  ShieldCheck,
  Scroll,
  Building2,
  ShieldAlert,
  Shield,
  Home
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { fetchAnalyticsStats } from '../utils/analytics';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar" style={{ background: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="admin-sidebar-header" style={{ padding: '2.5rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: 0, color: 'white', letterSpacing: '1px' }}>
            KARACA <span style={{ color: 'var(--color-accent)' }}>HUKUK</span>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', color: '#94a3b8', fontSize: '0.85rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            Sistem Aktif
          </div>
        </div>
        
        <div className="admin-sidebar-nav" style={{ display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', gap: '0.8rem', flex: 1 }}>
          <button 
            onClick={() => setActiveTab('overview')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: activeTab === 'overview' ? 'var(--color-accent)' : 'transparent', border: 'none', color: activeTab === 'overview' ? 'white' : '#cbd5e1', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: '0.3s', fontWeight: activeTab === 'overview' ? '600' : '400' }}
          >
            <LayoutDashboard size={20} /> Genel Bakış
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: activeTab === 'blog' ? 'var(--color-accent)' : 'transparent', border: 'none', color: activeTab === 'blog' ? 'white' : '#cbd5e1', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: '0.3s', fontWeight: activeTab === 'blog' ? '600' : '400' }}
          >
            <PenTool size={20} /> İçerik Yönetimi
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: activeTab === 'appointments' ? 'var(--color-accent)' : 'transparent', border: 'none', color: activeTab === 'appointments' ? 'white' : '#cbd5e1', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: '0.3s', fontWeight: activeTab === 'appointments' ? '600' : '400' }}
          >
            <Calendar size={20} /> Randevular
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: activeTab === 'services' ? 'var(--color-accent)' : 'transparent', border: 'none', color: activeTab === 'services' ? 'white' : '#cbd5e1', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: '0.3s', fontWeight: activeTab === 'services' ? '600' : '400' }}
          >
            <Briefcase size={20} /> Çalışma Alanları
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.2rem', background: activeTab === 'analytics' ? 'var(--color-accent)' : 'transparent', border: 'none', color: activeTab === 'analytics' ? 'white' : '#cbd5e1', borderRadius: '12px', cursor: 'pointer', textAlign: 'left', transition: '0.3s', fontWeight: activeTab === 'analytics' ? '600' : '400' }}
          >
            <Activity size={20} /> Ziyaretçi Analizi
          </button>
        </div>
        
        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', marginBottom: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--color-accent)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              İK
            </div>
            <div>
              <p style={{ margin: 0, color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>Av. İsmail Karaca</p>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.75rem' }}>Yönetici</p>
            </div>
          </div>
          <button 
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.8rem', width: '100%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', color: '#ef4444', borderRadius: '10px', cursor: 'pointer', transition: '0.3s', fontWeight: '500' }}
          >
            <LogOut size={18} /> Çıkış Yap
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="admin-content" style={{ background: '#f8fafc' }}>
        {activeTab === 'overview' && <Overview setActiveTab={setActiveTab} />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'appointments' && <AppointmentManager />}
        {activeTab === 'services' && <ServiceManager />}
        {activeTab === 'analytics' && <AnalyticsManager />}
      </div>
    </div>
  );
};

const Overview = ({ setActiveTab }) => {
  const [stats, setStats] = useState({ blogs: 0, appointments: 0, online: 0, todayViews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
        const { count: appCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
        
        // Fetch online users (last 5 minutes) and today's views
        const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
        const startOfToday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).toISOString();
        
        const { data: onlineData } = await supabase
          .from('visitor_logs')
          .select('session_id')
          .gte('created_at', fiveMinsAgo);
          
        const { count: todayCount } = await supabase
          .from('visitor_logs')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', startOfToday);
          
        const onlineCount = onlineData ? new Set(onlineData.map(d => d.session_id)).size : 0;
        
        setStats({ 
          blogs: blogCount || 0, 
          appointments: appCount || 0,
          online: onlineCount || 0,
          todayViews: todayCount || 0
        });
      } catch (err) {
        console.error("Error loading overview stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="spinner" size={40} color="var(--color-accent)"/></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '2rem' }}>Hoş Geldiniz, İsmail Bey</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>İşte sisteminizin güncel durumu.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Stat Card 1 */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(184, 145, 70, 0.05)', width: '150px', height: '150px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(184, 145, 70, 0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--color-accent)' }}>
              <FileText size={32} />
            </div>
            <span style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Toplam</span>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>{stats.blogs}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>Yayımlanan Makale</p>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(16, 185, 129, 0.05)', width: '150px', height: '150px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '16px', color: '#10b981' }}>
              <Users size={32} />
            </div>
            <span style={{ background: '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Bekleyen</span>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>{stats.appointments}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>Randevu Talebi</p>
          </div>
        </div>

        {/* Stat Card 3: Online Users */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(16, 185, 129, 0.05)', width: '150px', height: '150px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '16px', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity size={32} />
            </div>
            <span style={{ background: '#ecfdf5', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%' }}></span>
              Canlı
            </span>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>{stats.online}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>Aktif Ziyaretçi</p>
          </div>
        </div>

        {/* Stat Card 4: Today's views */}
        <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-20px', right: '-20px', background: 'rgba(184, 145, 70, 0.05)', width: '150px', height: '150px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(184, 145, 70, 0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--color-accent)' }}>
              <Eye size={32} />
            </div>
            <span style={{ background: '#f8fafc', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Sayfa</span>
          </div>
          <div>
            <h3 style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '0.5rem', lineHeight: 1 }}>{stats.todayViews}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', margin: 0 }}>Bugünkü Ziyaret</p>
          </div>
        </div>
      </div>

      {/* Advanced Quick Analytics Access */}
      <div 
        onClick={() => setActiveTab('analytics')}
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary), #1e293b)', 
          padding: '2.5rem', 
          borderRadius: '24px', 
          color: 'white', 
          cursor: 'pointer', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          transition: '0.3s ease',
          boxShadow: '0 10px 30px rgba(15,23,42,0.15)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', margin: '0 0 0.5rem 0', fontWeight: 600 }}>Detaylı Ziyaretçi Analiz Paneli</h2>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.95rem' }}>Anlık, saatlik, günlük, haftalık ve yıllık gösterim grafiklerini, coğrafi şehir dağılümlarını ve tarayıcı/cihaz istatistiklerini görüntüleyin.</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '50%', color: 'var(--color-accent)' }}>
          <ArrowRight size={28} />
        </div>
      </div>
    </div>
  );
};

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Genel');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  
  // Custom Category States
  const defaultCategories = ["Genel", "Ceza Hukuku", "Aile Hukuku", "Gayrimenkul Hukuku", "İş Hukuku", "Tazminat Hukuku", "İcra Hukuku"];
  const [dynamicCategories, setDynamicCategories] = useState(defaultCategories);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [customCategoryText, setCustomCategoryText] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
      // Extract unique categories from DB and merge with defaults
      if (data) {
        const uniqueDbCats = [...new Set(data.map(p => p.category).filter(Boolean))];
        setDynamicCategories([...new Set([...defaultCategories, ...uniqueDbCats])]);
      }
    }
    setLoading(false);
  };

  const handleEditClick = (post) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setContent(post.content);
    
    if (!defaultCategories.includes(post.category)) {
      setIsCustomCategory(true);
      setCustomCategoryText(post.category);
      setCategory('NEW_CUSTOM_CATEGORY');
    } else {
      setIsCustomCategory(false);
      setCategory(post.category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('Genel');
    setIsCustomCategory(false);
    setCustomCategoryText('');
    setEditingPostId(null);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    const finalCategory = isCustomCategory ? customCategoryText.trim() : category;
    if (!finalCategory) return alert('Lütfen geçerli bir kategori giriniz.');

    setIsSubmitting(true);
    
    if (editingPostId) {
      // Güncelleme Modu
      const { data: updatedData, error } = await supabase
        .from('blogs')
        .update({ 
          title, 
          content, 
          category: finalCategory 
        })
        .eq('id', editingPostId)
        .select();
        
      if (error) {
        alert('Güncelleme hatası: ' + error.message);
      } else if (!updatedData || updatedData.length === 0) {
        alert(
          'Güncelleme veritabanına kaydedilemedi.\n\n' +
          'Supabase panelinde "blogs" tablosuna UPDATE politikası eklemeniz gerekiyor.\n' +
          'Aşağıdaki SQL\'i Supabase SQL Editor\'da çalıştırın:\n\n' +
          'CREATE POLICY "Anon update blogs" ON public.blogs FOR UPDATE TO anon USING (true) WITH CHECK (true);'
        );
      } else {
        resetForm();
        fetchPosts();
      }
    } else {
      // Yeni Ekleme Modu
      const { error } = await supabase
        .from('blogs')
        .insert([{ 
          title, 
          content, 
          category: finalCategory, 
          date: new Date().toLocaleDateString('tr-TR') 
        }]);

      if (error) {
        alert('Ekleme hatası: ' + error.message);
      } else {
        resetForm();
        fetchPosts();
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Bu yazıyı silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) alert('Silme hatası: ' + error.message);
    else fetchPosts();
  };

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '2rem' }}>İçerik Yönetimi</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Form Section */}
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
            <PenTool size={20} color="var(--color-accent)"/> {editingPostId ? 'Makaleyi Düzenle' : 'Yeni Makale Oluştur'}
          </h3>
          <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Makale Başlığı</label>
                <input 
                  type="text" 
                  placeholder="Örn: İş Hukukunda İhbar Tazminatı Şartları" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', background: '#f8fafc', transition: 'border 0.3s', outline: 'none' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Hukuk Alanı (Kategori)</label>
                {isCustomCategory ? (
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <input 
                      type="text" 
                      placeholder="Yeni Alan Adı" 
                      value={customCategoryText}
                      onChange={(e) => setCustomCategoryText(e.target.value)}
                      style={{ padding: '1rem', border: '1px solid var(--color-accent)', borderRadius: '12px', background: '#fff', flex: 1, fontFamily: 'inherit', outline: 'none', boxShadow: '0 0 0 2px rgba(184, 145, 70, 0.2)' }}
                      autoFocus
                      required
                    />
                    <button 
                      type="button" 
                      onClick={() => setIsCustomCategory(false)} 
                      style={{ padding: '0 1rem', background: '#f1f5f9', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer', color: '#64748b', fontWeight: 600 }}
                    >
                      İptal
                    </button>
                  </div>
                ) : (
                  <select 
                    value={category}
                    onChange={(e) => {
                      if (e.target.value === 'NEW_CUSTOM_CATEGORY') {
                        setIsCustomCategory(true);
                      } else {
                        setCategory(e.target.value);
                      }
                    }}
                    style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: '#f8fafc', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
                  >
                    {dynamicCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    <option value="NEW_CUSTOM_CATEGORY" style={{ fontWeight: 'bold', color: 'var(--color-accent)' }}>+ Yeni Alan Ekle...</option>
                  </select>
                )}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Makale İçeriği</label>
              <textarea 
                placeholder="Yazı detaylarını buraya giriniz..." 
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ padding: '1.2rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', background: '#f8fafc', outline: 'none', lineHeight: '1.6' }}
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              {editingPostId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ padding: '1rem 2rem', background: '#f1f5f9', color: '#64748b', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Vazgeç
                </button>
              )}
              <button disabled={isSubmitting} type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? <Loader2 size={18} className="spinner" style={{ width: '18px', height: '18px', borderLeftColor: 'white' }}/> : <Plus size={18} />} 
                {isSubmitting ? 'Kaydediliyor...' : (editingPostId ? 'Değişiklikleri Kaydet' : 'Hemen Yayımla')}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Yayımlanan Makaleler ({posts.length})</h3>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="spinner" size={30} color="var(--color-accent)"/></div>
          ) : posts.length === 0 ? (
            <div style={{ background: 'white', padding: '4rem 2rem', borderRadius: '24px', border: '1px dashed var(--color-border)', textAlign: 'center' }}>
              <FileText size={48} color="var(--color-border)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--color-text-muted)' }}>Henüz herhangi bir makale yayımlamadınız.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {posts.map(post => (
                <div key={post.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: '0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '0.75rem', background: 'rgba(184, 145, 70, 0.1)', color: 'var(--color-accent)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>{post.category || 'Genel'}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEditClick(post)}
                        style={{ background: '#f1f5f9', color: '#3b82f6', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                        title="Yazıyı Düzenle"
                      >
                        <PenTool size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(post.id)}
                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                        title="Yazıyı Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-primary)', lineHeight: '1.4' }}>{post.title}</h4>
                  <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>{post.date}</p>
                    <a href={`#blog/${post.id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-accent)', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                      Görüntüle <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching appointments:', error);
    else setAppointments(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Bu randevuyu silmek veya tamamlandı olarak işaretlemek istediğinize emin misiniz?")) return;
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) alert('Silme hatası: ' + error.message);
    else fetchAppointments();
  };

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '2rem' }}>Gelen Randevu Talepleri</h1>
      </div>
      
      {loading ? (
        <div style={{ textAlign: 'center', padding: '5rem' }}><Loader2 className="spinner" size={40} color="var(--color-accent)"/></div>
      ) : appointments.length === 0 ? (
        <div style={{ background: 'white', padding: '5rem 2rem', borderRadius: '24px', border: '1px dashed var(--color-border)', textAlign: 'center' }}>
          <Calendar size={60} color="var(--color-border)" style={{ margin: '0 auto 1.5rem' }} />
          <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem' }}>Talep Bulunmuyor</h3>
          <p style={{ color: 'var(--color-text-muted)' }}>Şu an için bekleyen herhangi bir randevu talebiniz yok.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
          {appointments.map(app => (
            <div key={app.id} style={{ background: 'white', padding: '2rem', borderRadius: '20px', border: '1px solid var(--color-border)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '6px', height: '100%', background: app.type === 'online' ? '#3b82f6' : 'var(--color-accent)' }}></div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                    <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.3rem' }}>{app.name}</h3>
                    <span style={{ padding: '0.3rem 0.8rem', background: app.type === 'online' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(184, 145, 70, 0.1)', color: app.type === 'online' ? '#3b82f6' : 'var(--color-accent)', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {app.type === 'online' ? 'Online Görüşme' : 'Yüz Yüze Görüşme'}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                      <Phone size={16} /> 
                      <span style={{ fontWeight: 600, color: '#334155' }}>{app.phone}</span>
                    </div>
                    <a 
                      href={`https://wa.me/${app.phone.replace(/\s+/g, '').replace(/[^0-9]/g, '')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#25D366', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', background: 'rgba(37, 211, 102, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '12px' }}
                    >
                      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" /></svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <button 
                    onClick={() => handleDelete(app.id)} 
                    title="Sil veya Tamamlandı İşaretle"
                    style={{ background: 'white', border: '1px solid #e2e8f0', color: '#ef4444', cursor: 'pointer', padding: '0.6rem', borderRadius: '10px', display: 'flex', alignItems: 'center', transition: '0.2s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}
                  >
                    <Trash2 size={20}/>
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', background: '#f8fafc', padding: '1.5rem', borderRadius: '16px', marginLeft: '1rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>İlgili Hukuk Alanı</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{app.category || 'Belirtilmedi'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', display: 'block', marginBottom: '0.3rem' }}>Talep Edilen Tarih</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{app.date || 'Belirtilmedi'}</span>
                </div>
              </div>
              
              {app.note && (
                <div style={{ marginTop: '1.5rem', marginLeft: '1rem', padding: '1.5rem', borderLeft: '3px solid var(--color-accent)', background: 'linear-gradient(to right, #fffbeb, white)', borderRadius: '0 16px 16px 0' }}>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: '#b45309', fontWeight: 600, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Kullanıcı Notu</span>
                  <p style={{ margin: 0, fontSize: '0.95rem', color: '#78350f', lineHeight: '1.6' }}>"{app.note}"</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const AnalyticsManager = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChartTab, setActiveChartTab] = useState('daily');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);
    
    const stats = await fetchAnalyticsStats();
    if (stats.success) {
      setData(stats);
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
    // Auto-refresh stats every 30 seconds for REAL-TIME live tracking!
    const interval = setInterval(() => loadData(true), 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '10rem 2rem' }}>
        <Loader2 className="spinner" size={40} color="var(--color-accent)"/>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '1rem', fontSize: '0.95rem' }}>Ziyaretçi verileri ve grafikler yükleniyor...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p style={{ color: '#ef4444' }}>Veriler yüklenirken bir hata oluştu. Lütfen database tablosunun oluşturulup oluşturulmadığını kontrol ediniz.</p>
        <button onClick={() => loadData()} className="btn btn-primary" style={{ marginTop: '1rem' }}>Yeniden Dene</button>
      </div>
    );
  }

  const { stats, charts, breakdowns, recentLogs } = data;

  // Find max value in current chart data to calculate height percentages
  const currentChartData = charts[activeChartTab] || [];
  const maxChartVal = Math.max(...currentChartData.map(d => d.value), 1);

  return (
    <div style={{ maxWidth: '1100px', width: '100%', margin: '0 auto', paddingBottom: '4rem' }}>
      <style>{`
        /* pulse animation for online tracking */
        .pulse-online {
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        /* Chart tooltip */
        .chart-bar-wrapper {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          height: 100%;
          min-width: 0;
        }
        .chart-bar-container {
          flex: 1;
          display: flex;
          align-items: flex-end;
          height: 100%;
          position: relative;
          cursor: pointer;
        }
        .chart-bar {
          width: 65%;
          margin: 0 auto;
          background: linear-gradient(to top, var(--color-accent), #f59e0b);
          border-radius: 6px 6px 0 0;
          transition: height 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
          box-shadow: 0 2px 5px rgba(184, 145, 70, 0.15);
        }
        .chart-bar-container:hover .chart-bar {
          filter: brightness(1.1);
          box-shadow: 0 4px 12px rgba(184, 145, 70, 0.35);
        }
        .chart-tooltip {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          background: #1e293b;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 8px;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0;
          visibility: hidden;
          transition: all 0.2s ease;
          pointer-events: none;
          white-space: nowrap;
          z-index: 10;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
        }
        .chart-tooltip::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 5px solid transparent;
          border-top-color: #1e293b;
        }
        .chart-bar-container:hover .chart-tooltip {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(-4px);
        }

        /* Tabs and Cards */
        .tab-btn {
          padding: 0.7rem 1.2rem;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          background: white;
          cursor: pointer;
          font-weight: 600;
          font-family: inherit;
          color: var(--color-text-muted);
          transition: 0.2s ease;
        }
        .tab-btn.active {
          background: var(--color-accent);
          color: white;
          border-color: var(--color-accent);
          box-shadow: 0 4px 10px rgba(184, 145, 70, 0.2);
        }
        .tab-btn:hover:not(.active) {
          background: #f1f5f9;
          color: var(--color-primary);
        }
        
        .analytics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .analytics-card {
          background: white;
          padding: 1.5rem;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.01);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .distribution-list {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .distribution-item {
          display: flex;
          flex-direction: column;
        }
        .distribution-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
          margin-bottom: 0.35rem;
        }
        .progress-bar-bg {
          width: 100%;
          height: 6px;
          background: #f1f5f9;
          border-radius: 3px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: var(--color-accent);
          border-radius: 3px;
          transition: width 1s ease-out;
        }

        .table-responsive {
          overflow-x: auto;
          background: white;
          border-radius: 20px;
          border: 1px solid var(--color-border);
          box-shadow: 0 4px 15px rgba(0,0,0,0.01);
        }
        .log-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .log-table th {
          background: #f8fafc;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: var(--color-primary);
          border-bottom: 1.5px solid var(--color-border);
          white-space: nowrap;
        }
        .log-table td {
          padding: 1rem;
          border-bottom: 1px solid #f1f5f9;
          color: var(--color-text);
          white-space: nowrap;
        }
        .log-table tr:hover td {
          background: #f8fafc;
        }
      `}</style>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.3rem' }}>
            <h1 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '2rem' }}>Ziyaretçi Analizi</h1>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <span className="pulse-online"></span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>{stats.realtime} Çevrimiçi</span>
            </div>
          </div>
          <p style={{ color: 'var(--color-text-muted)', margin: 0 }}>Web sitenizin ziyaretçi istatistikleri ve anlık trafik analizleri.</p>
        </div>
        
        <button 
          onClick={() => loadData(true)} 
          disabled={refreshing}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.2rem', background: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer', fontWeight: 600, color: 'var(--color-primary)', transition: '0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}
        >
          <RefreshCw size={16} className={refreshing ? 'spinner' : ''} /> {refreshing ? 'Güncelleniyor...' : 'Verileri Yenile'}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="analytics-grid">
        {/* Card 1: Today Views */}
        <div className="analytics-card">
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'rgba(184, 145, 70, 0.03)', width: '90px', height: '90px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(184, 145, 70, 0.1)', padding: '0.6rem', borderRadius: '12px', color: 'var(--color-accent)' }}>
              <Eye size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>Bugün</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '0 0 0.2rem 0', lineHeight: 1 }}>{stats.today.views}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Sayfa Gösterimi</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{stats.today.uniques} Tekil Ziyaretçi</span>
            </div>
          </div>
        </div>

        {/* Card 2: Weekly Views */}
        <div className="analytics-card">
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'rgba(59, 130, 246, 0.03)', width: '90px', height: '90px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#3b82f6' }}>
              <TrendingUp size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3b82f6', background: 'rgba(59,130,246,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>7 Gün</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '0 0 0.2rem 0', lineHeight: 1 }}>{stats.weekly.views}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Sayfa Gösterimi</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{stats.weekly.uniques} Tekil Ziyaretçi</span>
            </div>
          </div>
        </div>

        {/* Card 3: Monthly Views */}
        <div className="analytics-card">
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'rgba(16, 185, 129, 0.03)', width: '90px', height: '90px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#10b981' }}>
              <Activity size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>30 Gün</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '0 0 0.2rem 0', lineHeight: 1 }}>{stats.monthly.views}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Sayfa Gösterimi</span>
              <span style={{ color: 'var(--color-primary)', fontSize: '0.8rem', fontWeight: 600 }}>{stats.monthly.uniques} Tekil Ziyaretçi</span>
            </div>
          </div>
        </div>

        {/* Card 4: All-Time Views */}
        <div className="analytics-card">
          <div style={{ position: 'absolute', top: '-15px', right: '-15px', background: 'rgba(139, 92, 246, 0.03)', width: '90px', height: '90px', borderRadius: '50%' }}></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.2rem' }}>
            <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '0.6rem', borderRadius: '12px', color: '#8b5cf6' }}>
              <Clock size={22} />
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#8b5cf6', background: 'rgba(139,92,246,0.1)', padding: '0.2rem 0.5rem', borderRadius: '10px' }}>Tüm Zamanlar</span>
          </div>
          <div>
            <h3 style={{ fontSize: '2.2rem', color: 'var(--color-primary)', margin: '0 0 0.2rem 0', lineHeight: 1 }}>{stats.total}</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Toplam Gösterim</span>
              <span style={{ color: '#8b5cf6', fontSize: '0.8rem', fontWeight: 600 }}>Yıllık: {stats.yearly.views}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="chart-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h3 style={{ margin: '0 0 0.2rem 0', color: 'var(--color-primary)', fontSize: '1.25rem' }}>Trafik Grafiği</h3>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Seçilen zaman aralığına göre sayfa ziyaret oranları.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setActiveChartTab('hourly')} className={`tab-btn ${activeChartTab === 'hourly' ? 'active' : ''}`}>Saatlik</button>
            <button onClick={() => setActiveChartTab('daily')} className={`tab-btn ${activeChartTab === 'daily' ? 'active' : ''}`}>Günlük</button>
            <button onClick={() => setActiveChartTab('weekly')} className={`tab-btn ${activeChartTab === 'weekly' ? 'active' : ''}`}>Haftalık</button>
            <button onClick={() => setActiveChartTab('monthly')} className={`tab-btn ${activeChartTab === 'monthly' ? 'active' : ''}`}>Aylık (1Y)</button>
          </div>
        </div>

        {/* Visual Chart Bars */}
        {currentChartData.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--color-text-muted)' }}>Bu dönem için ziyaretçi datası bulunmuyor.</div>
        ) : (
          <>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '240px', gap: '4px', borderBottom: '2px solid var(--color-border)', position: 'relative', overflow: 'visible' }}>
              {currentChartData.map((item, idx) => {
                const heightPx = maxChartVal > 0 ? Math.max((item.value / maxChartVal) * 220, item.value > 0 ? 8 : 2) : 2;
                return (
                  <div
                    key={idx}
                    className="chart-bar-wrapper"
                    title={`${item.name}: ${item.value} Gösterim`}
                  >
                    <div className="chart-bar-container">
                      <div className="chart-tooltip">
                        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginBottom: '2px' }}>{item.name}</div>
                        <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 'bold' }}>{item.value} Gösterim</div>
                      </div>
                      <div
                        className="chart-bar"
                        style={{ height: `${heightPx}px`, minHeight: item.value > 0 ? '4px' : '2px' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Chart X Labels */}
            <div style={{ display: 'flex', gap: '4px', padding: '0.6rem 0 0 0', overflowX: 'hidden' }}>
              {currentChartData.map((item, idx) => (
                <div
                  key={idx}
                  style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}
                  title={item.name}
                >
                  {activeChartTab === 'hourly' ? item.name : item.name.split(' ')[0]}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Distribution grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
        {/* Left: Top Pages & Referrers */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Top Pages */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-primary)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={18} color="var(--color-accent)" /> En Çok Ziyaret Edilen Sayfalar
            </h3>
            
            {breakdowns.pages.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Henüz data toplanmadı.</p>
            ) : (
              <div className="distribution-list">
                {breakdowns.pages.map((item, idx) => {
                  const percent = Math.round((item.value / stats.monthly.views) * 100) || 0;
                  return (
                    <div key={idx} className="distribution-item">
                      <div className="distribution-label">
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{item.name}</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{item.value} Gösterim ({percent}%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Referrers */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-primary)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={18} color="#3b82f6" /> Ziyaretçi Kaynakları
            </h3>
            
            {breakdowns.referrers.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Henüz data toplanmadı.</p>
            ) : (
              <div className="distribution-list">
                {breakdowns.referrers.map((item, idx) => {
                  const percent = Math.round((item.value / stats.monthly.views) * 100) || 0;
                  return (
                    <div key={idx} className="distribution-item">
                      <div className="distribution-label">
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{item.name}</span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{item.value} Ziyaret ({percent}%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%`, background: '#3b82f6' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right: Device/Browser Breakdown & Locations */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Geolocation Cities */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-primary)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Globe size={18} color="#10b981" /> Coğrafi Dağılım (Şehirler)
            </h3>
            
            {breakdowns.cities.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', margin: 0 }}>Henüz data toplanmadı.</p>
            ) : (
              <div className="distribution-list">
                {breakdowns.cities.map((item, idx) => {
                  const percent = Math.round((item.value / stats.monthly.views) * 100) || 0;
                  return (
                    <div key={idx} className="distribution-item">
                      <div className="distribution-label">
                        <span style={{ fontWeight: 600, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <MapPin size={14} color="var(--color-accent)" /> {item.name}
                        </span>
                        <span style={{ color: 'var(--color-text-muted)' }}>{item.value} Ziyaret ({percent}%)</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%`, background: '#10b981' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Browser / Devices split */}
          <div style={{ background: 'white', padding: '2rem', borderRadius: '24px', border: '1px solid var(--color-border)', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--color-primary)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Laptop size={18} color="#8b5cf6" /> Sistem Dağılımı (Tarayıcı & Cihaz)
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Cihaz Tipi</h4>
                {breakdowns.devices.map((item, idx) => {
                  const percent = Math.round((item.value / stats.monthly.views) * 100) || 0;
                  return (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%`, background: '#8b5cf6' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--color-primary)' }}>Tarayıcı</h4>
                {breakdowns.browsers.map((item, idx) => {
                  const percent = Math.round((item.value / stats.monthly.views) * 100) || 0;
                  return (
                    <div key={idx} style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.2rem' }}>
                        <span style={{ fontWeight: 600 }}>{item.name}</span>
                        <span>{percent}%</span>
                      </div>
                      <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${percent}%`, background: '#ec4899' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Log Feed Table */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ margin: 0, color: 'var(--color-primary)', fontSize: '1.25rem' }}>Canlı Akış & Ziyaret Günlüğü</h3>
            <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>Sitenizi ziyaret eden son 30 kullanıcının tüm detayları.</p>
          </div>
        </div>
        
        <div className="table-responsive">
          {recentLogs.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Henüz log bulunmuyor.</div>
          ) : (
            <table className="log-table">
              <thead>
                <tr>
                  <th>Tarih / Saat</th>
                  <th>IP Adresi</th>
                  <th>Konum</th>
                  <th>Ziyaret Edilen Sayfa</th>
                  <th>Kaynak</th>
                  <th>Cihaz</th>
                  <th>Sistem (OS / Tarayıcı)</th>
                </tr>
              </thead>
              <tbody>
                {recentLogs.map((log) => {
                  const dateObj = new Date(log.created_at);
                  const formattedDate = dateObj.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' });
                  const formattedTime = dateObj.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  
                  return (
                    <tr key={log.id}>
                      <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {formattedDate} <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal', marginLeft: '4px' }}>{formattedTime}</span>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{log.ip_address}</td>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} color="var(--color-accent)" />
                          {log.city && log.city !== 'Unknown' && log.city !== 'Bilinmeyen' ? `${log.city}, ` : ''}{log.country || 'Türkiye'}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: '0.8rem', background: 'rgba(184, 145, 70, 0.08)', color: 'var(--color-accent)', padding: '0.2rem 0.6rem', borderRadius: '8px', fontWeight: 600 }}>
                          {log.pathname}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>{log.referrer}</td>
                      <td style={{ fontSize: '0.85rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          {log.device_type === 'Mobil' ? '📱 Mobil' : '💻 Masaüstü'}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>
                        {log.os} / <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{log.browser}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

const ServiceManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [group, setGroup] = useState('Özel Hukuk');
  const [icon, setIcon] = useState('Briefcase');
  const [desc, setDesc] = useState('');
  const [detail, setDetail] = useState('');
  const [order, setOrder] = useState(0);

  const iconOptions = [
    { name: 'Adalet / Yargı (Gavel)', value: 'Gavel', icon: Gavel },
    { name: 'Ticaret / İş (Briefcase)', value: 'Briefcase', icon: Briefcase },
    { name: 'Aile / İnsanlar (Users)', value: 'Users', icon: Users },
    { name: 'Gayrimenkul / Konum (MapPin)', value: 'MapPin', icon: MapPin },
    { name: 'Terazi / Tazminat (Scale)', value: 'Scale', icon: Scale },
    { name: 'Güvenlik / Kalkan (ShieldCheck)', value: 'ShieldCheck', icon: ShieldCheck },
    { name: 'Miras / Evrak (Scroll)', value: 'Scroll', icon: Scroll },
    { name: 'Küresel / Kamu Hukuku (Globe)', value: 'Globe', icon: Globe },
    { name: 'Şirketler / Bina (Building2)', value: 'Building2', icon: Building2 },
    { name: 'Uyarı / Tüketici (ShieldAlert)', value: 'ShieldAlert', icon: ShieldAlert },
    { name: 'Koruma / Güvenlik (Shield)', value: 'Shield', icon: Shield },
    { name: 'Konut / Tapu (Home)', value: 'Home', icon: Home },
    { name: 'Doküman / Sözleşme (FileText)', value: 'FileText', icon: FileText },
  ];

  const renderIconHelper = (iconName, size = 20) => {
    const found = iconOptions.find(o => o.value === iconName);
    if (found) {
      const IconComp = found.icon;
      return <IconComp size={size} />;
    }
    return <Briefcase size={size} />;
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order', { ascending: true });
    
    if (error) {
      console.error('Error fetching services:', error);
    } else {
      setServices(data || []);
    }
    setLoading(false);
  };

  const handleEditClick = (service) => {
    setEditingId(service.id);
    setTitle(service.title);
    setGroup(service.group);
    setIcon(service.icon);
    setDesc(service.desc);
    setDetail(service.detail);
    setOrder(service.order || 0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setTitle('');
    setGroup('Özel Hukuk');
    setIcon('Briefcase');
    setDesc('');
    setDetail('');
    setOrder(0);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !detail) return alert('Lütfen tüm alanları doldurunuz.');

    setIsSubmitting(true);
    
    const serviceData = {
      title,
      group,
      icon,
      desc,
      detail,
      order: parseInt(order) || 0
    };

    if (editingId) {
      // Update
      const { error } = await supabase
        .from('services')
        .update(serviceData)
        .eq('id', editingId);
        
      if (error) {
        alert('Güncelleme hatası: ' + error.message);
      } else {
        resetForm();
        fetchServices();
      }
    } else {
      // Insert
      const { error } = await supabase
        .from('services')
        .insert([serviceData]);

      if (error) {
        alert('Ekleme hatası: ' + error.message);
      } else {
        resetForm();
        fetchServices();
      }
    }
    setIsSubmitting(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Bu çalışma alanını silmek istediğinize emin misiniz?")) return;
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);
    
    if (error) alert('Silme hatası: ' + error.message);
    else fetchServices();
  };

  return (
    <div style={{ maxWidth: '1000px', width: '100%', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ color: 'var(--color-primary)', margin: 0, fontSize: '2rem' }}>Çalışma Alanları Yönetimi</h1>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
        {/* Form Section */}
        <div style={{ background: 'white', padding: '2.5rem', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid var(--color-border)' }}>
          <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)' }}>
            <Briefcase size={20} color="var(--color-accent)"/> {editingId ? 'Çalışma Alanını Düzenle' : 'Yeni Çalışma Alanı Ekle'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Hizmet Başlığı</label>
                <input 
                  type="text" 
                  placeholder="Örn: Bilişim Hukuku" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', background: '#f8fafc', transition: 'border 0.3s', outline: 'none' }}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Hukuk Dalı (Grup)</label>
                <select 
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: '#f8fafc', fontFamily: 'inherit', outline: 'none', cursor: 'pointer' }}
                >
                  <option value="Özel Hukuk">Özel Hukuk</option>
                  <option value="Kamu Hukuku">Kamu Hukuku</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Temsili İkon</label>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <select 
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', background: '#f8fafc', fontFamily: 'inherit', outline: 'none', cursor: 'pointer', flex: 1 }}
                  >
                    {iconOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
                  </select>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'rgba(184, 145, 70, 0.1)', color: 'var(--color-accent)', borderRadius: '12px' }}>
                    {renderIconHelper(icon, 24)}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Görünüm Sırası (Order)</label>
                <input 
                  type="number" 
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', background: '#f8fafc', transition: 'border 0.3s', outline: 'none' }}
                  required
                />
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Kısa Açıklama (Kart İçeriği)</label>
              <textarea 
                placeholder="Kart üzerinde görünecek 1-2 cümlelik kısa özet..." 
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ padding: '1.2rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', background: '#f8fafc', outline: 'none', lineHeight: '1.6' }}
                required
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-primary)' }}>Detaylı Açıklama (Hizmet Detay Sayfası / Modal İçeriği)</label>
              <textarea 
                placeholder="Hizmetin kapsamını, mahkemeleri ve müvekkillere sunulan hizmetleri detaylıca anlatan metin..." 
                rows={6}
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                style={{ padding: '1.2rem', border: '1px solid var(--color-border)', borderRadius: '12px', fontFamily: 'inherit', fontSize: '0.95rem', resize: 'vertical', background: '#f8fafc', outline: 'none', lineHeight: '1.6' }}
                required
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              {editingId && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  style={{ padding: '1rem 2rem', background: '#f1f5f9', color: '#64748b', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer', fontWeight: 600 }}
                >
                  Vazgeç
                </button>
              )}
              <button disabled={isSubmitting} type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? <Loader2 size={18} className="spinner" style={{ width: '18px', height: '18px', borderLeftColor: 'white' }}/> : <Plus size={18} />} 
                {isSubmitting ? 'Kaydediliyor...' : (editingId ? 'Değişiklikleri Kaydet' : 'Hizmeti Kaydet ve Yayımla')}
              </button>
            </div>
          </form>
        </div>

        {/* List Section */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>Kayıtlı Çalışma Alanları ({services.length})</h3>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="spinner" size={30} color="var(--color-accent)"/></div>
          ) : services.length === 0 ? (
            <div style={{ background: 'white', padding: '4rem 2rem', borderRadius: '24px', border: '1px dashed var(--color-border)', textAlign: 'center' }}>
              <Briefcase size={48} color="var(--color-border)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--color-text-muted)' }}>Henüz herhangi bir çalışma alanı tanımlamadınız.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {services.map(svc => (
                <div key={svc.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem', transition: '0.3s', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.75rem', background: 'rgba(184, 145, 70, 0.1)', color: 'var(--color-accent)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontWeight: 600 }}>{svc.group}</span>
                      <span style={{ fontSize: '0.75rem', background: '#f1f5f9', color: '#64748b', padding: '0.3rem 0.6rem', borderRadius: '20px', fontWeight: 600 }}>Sıra: {svc.order}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEditClick(svc)}
                        style={{ background: '#f1f5f9', color: '#3b82f6', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                        title="Düzenle"
                      >
                        <PenTool size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(svc.id)}
                        style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }}
                        title="Sil"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', background: 'rgba(184, 145, 70, 0.08)', color: 'var(--color-accent)', borderRadius: '10px' }}>
                      {renderIconHelper(svc.icon, 20)}
                    </div>
                    <h4 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-primary)', lineHeight: '1.4' }}>{svc.title}</h4>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' }}>
                    {svc.desc}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
