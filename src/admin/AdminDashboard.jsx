import { PenTool, Calendar, LogOut, Plus, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('blog');
  
  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="admin-sidebar">
        <div className="admin-sidebar-header" style={{ padding: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', margin: 0 }}>KARACA HUKUK</h2>
          <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.2rem' }}>Yönetim Paneli</p>
        </div>
        
        <div className="admin-sidebar-nav" style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem 1rem', gap: '0.5rem', flex: 1 }}>
          <button 
            onClick={() => setActiveTab('blog')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === 'blog' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', transition: '0.3s' }}
          >
            <PenTool size={20} /> Blog Yönetimi
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: activeTab === 'appointments' ? 'rgba(255,255,255,0.1)' : 'transparent', border: 'none', color: 'white', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', transition: '0.3s' }}
          >
            <Calendar size={20} /> Randevular
          </button>
        </div>
        
        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button 
            onClick={onLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', width: '100%', background: 'transparent', border: 'none', color: '#ff6b6b', borderRadius: '8px', cursor: 'pointer', textAlign: 'left', transition: '0.3s' }}
          >
            <LogOut size={20} /> Çıkış Yap
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="admin-content">
        {activeTab === 'blog' ? <BlogManager /> : <AppointmentManager />}
      </div>
    </div>
  );
};

const BlogManager = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Genel');

  const categories = ["Genel", "Ceza Hukuku", "Aile Hukuku", "Gayrimenkul Hukuku", "İş Hukuku", "Tazminat Hukuku", "İcra Hukuku"];

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching posts:', error);
    else setPosts(data || []);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title || !content) return;
    
    const { error } = await supabase
      .from('blogs')
      .insert([{ 
        title, 
        content, 
        category, 
        date: new Date().toLocaleDateString('tr-TR') 
      }]);

    if (error) {
      alert('Ekleme hatası: ' + error.message);
    } else {
      setTitle('');
      setContent('');
      setCategory('Genel');
      fetchPosts();
    }
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);
    
    if (error) alert('Silme hatası: ' + error.message);
    else fetchPosts();
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <h1 style={{ color: 'var(--color-primary)', marginBottom: '2rem' }}>Blog Yönetimi</h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: 'var(--shadow-soft)', marginBottom: '3rem' }}>
        <h3 style={{ marginBottom: '1.5rem' }}>Yeni Yazı Ekle</h3>
        <form onSubmit={handleAddPost} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <input 
            type="text" 
            placeholder="Yazı Başlığı" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontFamily: 'inherit', fontSize: '1rem' }}
            required
          />
          <textarea 
            placeholder="Yazı İçeriği..." 
            rows={6}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' }}
            required
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.9rem', fontWeight: 600 }}>Kategori Seçin</label>
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'white', fontFamily: 'inherit' }}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Plus size={18} /> Yayımla
          </button>
        </form>
      </div>

      <h3 style={{ marginBottom: '1.5rem' }}>Yayımlanan Yazılar</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Henüz blog yazısı eklenmemiş.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{post.title}</h4>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(184, 145, 70, 0.1)', color: 'var(--color-accent)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontWeight: 600 }}>{post.category || 'Genel'}</span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Tarih: {post.date}</p>
                </div>
              </div>
              <button 
                onClick={() => handleDelete(post.id)}
                style={{ background: '#fee2e2', color: '#ef4444', border: 'none', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', transition: '0.3s' }}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const AppointmentManager = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching appointments:', error);
    else setAppointments(data || []);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);
    
    if (error) alert('Silme hatası: ' + error.message);
    else fetchAppointments();
  };

  return (
    <div style={{ maxWidth: '800px', width: '100%' }}>
      <h1 style={{ color: 'var(--color-primary)', marginBottom: '2rem' }}>Gelen Randevu Talepleri</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {appointments.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>Bekleyen randevu talebi bulunmuyor.</p>
        ) : (
          appointments.map(app => (
            <div key={app.id} style={{ background: 'white', padding: '2rem', borderRadius: '16px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ color: 'var(--color-primary)', marginBottom: '0.2rem' }}>{app.name}</h3>
                  <p style={{ fontWeight: 600, color: 'var(--color-accent)' }}>{app.phone}</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <span style={{ padding: '0.4rem 0.8rem', background: '#f1f5f9', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>{app.type === 'online' ? 'Online' : 'Yüz Yüze'}</span>
                  <button onClick={() => handleDelete(app.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={20}/></button>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: '#f8fafc', padding: '1rem', borderRadius: '8px' }}>
                <div><span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block' }}>Hukuk Alanı</span><span style={{ fontWeight: 500 }}>{app.category || 'Belirtilmedi'}</span></div>
                <div><span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', display: 'block' }}>Tarih</span><span style={{ fontWeight: 500 }}>{app.date || 'Belirtilmedi'}</span></div>
              </div>
              {app.note && (
                <div style={{ marginTop: '1rem', padding: '1rem', borderLeft: '3px solid var(--color-accent)', background: '#fffbeb', borderRadius: '0 8px 8px 0' }}>
                  <p style={{ fontSize: '0.9rem', color: '#453a1e' }}>{app.note}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
