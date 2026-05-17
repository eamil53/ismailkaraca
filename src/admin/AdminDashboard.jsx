import React, { useState, useEffect } from 'react';
import { PenTool, Calendar, LogOut, Plus, Trash2, LayoutDashboard, FileText, Users, Phone, Loader2, ArrowRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

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
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'blog' && <BlogManager />}
        {activeTab === 'appointments' && <AppointmentManager />}
      </div>
    </div>
  );
};

const Overview = () => {
  const [stats, setStats] = useState({ blogs: 0, appointments: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: blogCount } = await supabase.from('blogs').select('*', { count: 'exact', head: true });
      const { count: appCount } = await supabase.from('appointments').select('*', { count: 'exact', head: true });
      setStats({ blogs: blogCount || 0, appointments: appCount || 0 });
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}><Loader2 className="spinner" size={40} color="var(--color-accent)"/></div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      <h1 style={{ color: 'var(--color-primary)', marginBottom: '0.5rem', fontSize: '2rem' }}>Hoş Geldiniz, İsmail Bey</h1>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem' }}>İşte sisteminizin güncel durumu.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
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
      const { error } = await supabase
        .from('blogs')
        .update({ 
          title, 
          content, 
          category: finalCategory 
        })
        .eq('id', editingPostId);
        
      if (error) {
        alert('Güncelleme hatası: ' + error.message);
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

export default AdminDashboard;
