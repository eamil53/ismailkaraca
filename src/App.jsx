import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import logoImage from "./assets/logo.png";
import { supabase } from "./supabaseClient";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import {
  Scale,
  ShieldCheck,
  Gavel,
  Briefcase,
  Users,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  Menu,
  X,
  ArrowUpRight,
  Globe,
  Award,
  CheckCircle2,
  Clock,
  Search,
  Tag,
} from "lucide-react";

const StarryBackground = ({
  color = "rgba(255, 255, 255, 0.8)",
  count = 50,
  drift = false,
}) => {
  const stars = React.useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => {
        const driftX = drift ? (Math.random() - 0.5) * 60 : 0;
        const driftY = drift ? (Math.random() - 0.5) * 60 - 30 : 0;

        return {
          id: i,
          top: Math.random() * 100 + "%",
          left: Math.random() * 100 + "%",
          size: Math.random() * 3 + 1.5 + "px",
          delay: Math.random() * 3,
          duration: Math.random() * 4 + 3,
          driftX,
          driftY,
        };
      }),
    [count, drift],
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      {stars.map((star) => (
        <motion.div
          key={star.id}
          style={{
            position: "absolute",
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            background: color,
            borderRadius: "50%",
            boxShadow: `0 0 8px ${color}`,
          }}
          animate={{
            opacity: [0.1, 1, 0.1],
            scale: [0.8, 1.5, 0.8],
            x: drift ? [0, star.driftX] : 0,
            y: drift ? [0, star.driftY] : 0,
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            repeatType: drift ? "reverse" : "loop",
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

const Preloader = ({ onFinish }) => {
  return (
    <motion.div
      className="preloader"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "var(--color-primary)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem",
        overflow: "hidden",
      }}
    >
      <StarryBackground count={70} />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 1,
          ease: "backOut",
          repeat: 1,
          repeatType: "reverse",
        }}
        onAnimationComplete={onFinish}
        style={{
          color: "var(--color-accent)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.img
          src={logoImage}
          alt="Karaca Hukuk Logo"
          style={{ height: "160px", width: "auto" }}
          animate={{
            filter: [
              "drop-shadow(0 0 0px rgba(212, 175, 55, 0))",
              "drop-shadow(0 0 35px rgba(212, 175, 55, 1))",
              "drop-shadow(0 0 0px rgba(212, 175, 55, 0))",
            ],
          }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.h1
          style={{
            color: "white",
            marginTop: "-1.5rem",
            letterSpacing: "4px",
            fontSize: "1.5rem",
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          KARACA HUKUK
        </motion.h1>
      </motion.div>
      <motion.div
        style={{
          width: "100px",
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{
            width: "100%",
            height: "100%",
            background: "var(--color-accent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const AdminApp = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("karaca_admin_logged_in") === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.setItem("karaca_admin_logged_in", "true");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("karaca_admin_logged_in");
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <AdminDashboard onLogout={handleLogout} />;
  }
  return <AdminLogin onLogin={handleLogin} />;
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) console.error('Error fetching blogs:', error);
      else setBlogs(data || []);
      setLoading(false);
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    "Hepsi",
    "Ceza Hukuku", "Aile Hukuku", "Gayrimenkul Hukuku", "İş Hukuku", "Tazminat Hukuku", "İcra Hukuku"
  ];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Hepsi" || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        background: "#fcfcfc",
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "100px",
      }}
    >
      <StarryBackground
        count={40}
        color="rgba(184, 145, 70, 0.08)"
        drift={true}
      />

      <div className="container">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: "2rem", textAlign: "center" }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontFamily: "'Playfair Display', serif",
              marginBottom: "1.1rem",
            }}
          >
            Hukuk Köşesi ve Güncel Yazılar
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              maxWidth: "1000px",
              margin: "0 auto",
              fontSize: "1.1rem",
            }}
          >
            Hukuki süreçler, yeni yasalar ve güncel yargı kararları hakkında
            uzman görüşlerimizi ve analizlerimizi paylaşıyoruz.
          </p>
        </motion.div>

        <div className="blog-layout">
          {/* Main Content: Blog Posts */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "5rem 2rem" }}>
                <div className="spinner" style={{ margin: "0 auto 1.5rem" }}></div>
                <p style={{ color: "var(--color-text-muted)" }}>Yazılar yükleniyor...</p>
              </div>
            ) : filteredBlogs.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "5rem 2rem",
                  background: "white",
                  borderRadius: "24px",
                  border: "1px dashed var(--color-border)",
                }}
              >
                <Search
                  size={48}
                  style={{ color: "var(--color-border)", marginBottom: "1rem" }}
                />
                <p
                  style={{
                    color: "var(--color-text-muted)",
                    fontSize: "1.2rem",
                  }}
                >
                  Aramanızla eşleşen bir yazı bulunamadı.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Hepsi");
                  }}
                  className="btn"
                  style={{ marginTop: "1.5rem", color: "var(--color-accent)" }}
                >
                  Tüm Yazıları Göster
                </button>
              </div>
            ) : (
              filteredBlogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{
                    background: "white",
                    borderRadius: "24px",
                    overflow: "hidden",
                    boxShadow: "0 4px 25px rgba(0,0,0,0.03)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.4s ease, box-shadow 0.4s ease",
                    cursor: "pointer",
                  }}
                  whileHover={{
                    transform: "translateY(-8px)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  }}
                  onClick={() => (window.location.hash = `blog/${blog.id}`)}
                >
                  <div style={{ padding: "2.5rem" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "1.5rem",
                      }}
                    >
                      <span
                        style={{
                          background: "rgba(184, 145, 70, 0.1)",
                          color: "var(--color-accent)",
                          padding: "0.4rem 1rem",
                          borderRadius: "30px",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                        }}
                      >
                        {blog.category || "Genel"}
                      </span>
                      <span
                        style={{
                          color: "var(--color-text-muted)",
                          fontSize: "0.85rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        <Clock size={14} /> {blog.date}
                      </span>
                    </div>
                    <h2
                      style={{
                        fontSize: "1.8rem",
                        marginBottom: "1rem",
                        fontFamily: "'Playfair Display', serif",
                        color: "var(--color-primary)",
                      }}
                    >
                      {blog.title}
                    </h2>
                    <p
                      style={{
                        color: "var(--color-text-muted)",
                        fontSize: "1rem",
                        lineHeight: "1.8",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        marginBottom: "2rem",
                      }}
                    >
                      {blog.content}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        color: "var(--color-accent)",
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      Devamını Oku <ArrowUpRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <aside
            className="blog-sidebar"
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            {/* Search Box */}
            <div className="glass-sidebar">
              <h4
                style={{
                  marginBottom: "1.2rem",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Search size={18} /> Arama
              </h4>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="Yazılarda ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.9rem 1rem",
                    borderRadius: "12px",
                    border: "1px solid var(--color-border)",
                    background: "#f8fafc",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              </div>
            </div>

            {/* Categories */}
            <div className="glass-sidebar">
              <h4
                style={{
                  marginBottom: "1.5rem",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <Tag size={18} /> Kategoriler
              </h4>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "0.8rem 1.2rem",
                      borderRadius: "12px",
                      border: "none",
                      background:
                        selectedCategory === cat
                          ? "rgba(184, 145, 70, 0.1)"
                          : "transparent",
                      color:
                        selectedCategory === cat
                          ? "var(--color-accent)"
                          : "var(--color-text-main)",
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                    }}
                  >
                    {cat}
                    <span
                      style={{
                        fontSize: "0.75rem",
                        background:
                          selectedCategory === cat
                            ? "var(--color-accent)"
                            : "#f1f5f9",
                        color: selectedCategory === cat ? "white" : "#64748b",
                        padding: "0.2rem 0.6rem",
                        borderRadius: "20px",
                      }}
                    >
                      {cat === "Hepsi"
                        ? blogs.length
                        : blogs.filter((b) => b.category === cat).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Sidebar */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, var(--color-primary) 0%, #1e40af 100%)",
                padding: "2.5rem",
                borderRadius: "24px",
                color: "white",
                textAlign: "center",
              }}
            >
              <Scale
                size={40}
                style={{ color: "var(--color-accent)", marginBottom: "1.5rem" }}
              />
              <h4
                style={{
                  color: "white",
                  fontSize: "1.3rem",
                  marginBottom: "1rem",
                }}
              >
                Hukuki Desteğe mi İhtiyacınız Var?
              </h4>
              <p
                style={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "0.9rem",
                  marginBottom: "1.5rem",
                }}
              >
                Uzman avukat kadromuzla yanınızdayız.
              </p>
              <button
                onClick={() => (window.location.hash = "randevu")}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "12px",
                  border: "none",
                  background: "var(--color-accent)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Hemen Randevu Al
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const BlogPostPage = ({ id }) => {
  const [blog, setBlog] = useState(null);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data: blogData, error: blogError } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();
      
      if (blogError) {
        console.error('Error fetching blog:', blogError);
      } else {
        setBlog(blogData);
        
        const { data: recentData } = await supabase
          .from('blogs')
          .select('*')
          .neq('id', id)
          .limit(3);
        
        setRecentBlogs(recentData || []);
      }
      setLoading(false);
    };

    fetchPost();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="spinner" style={{ marginBottom: "1rem" }}></div>
        <p style={{ color: "var(--color-text-muted)" }}>İçerik yükleniyor...</p>
      </div>
    );

  if (!blog)
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>Yazı bulunamadı.</p>
      </div>
    );

  return (
    <div
      style={{
        background: "white",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "100px",
      }}
    >
      <div className="container">
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "3rem",
              fontSize: "0.9rem",
            }}
          >
            <a
              href="#home"
              style={{
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Ana Sayfa
            </a>
            <ChevronRight size={14} style={{ color: "var(--color-border)" }} />
            <a
              href="#blog"
              style={{
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              Hukuk Blog
            </a>
            <ChevronRight size={14} style={{ color: "var(--color-border)" }} />
            <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>
              Makale
            </span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  background: "rgba(184, 145, 70, 0.1)",
                  color: "var(--color-accent)",
                  padding: "0.4rem 1rem",
                  borderRadius: "30px",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                {blog.category || "Hukuki Makale"}
              </span>
              <span
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Clock size={16} /> {blog.date}
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                fontFamily: "'Playfair Display', serif",
                color: "var(--color-primary)",
                marginBottom: "3rem",
                lineHeight: "1.1",
                letterSpacing: "-1px",
              }}
            >
              {blog.title}
            </h1>

            <div
              style={{
                borderTop: "1px solid var(--color-border)",
                paddingTop: "3rem",
              }}
            >
              <article
                style={{
                  fontSize: "1.2rem",
                  color: "#334155",
                  lineHeight: "1.9",
                  whiteSpace: "pre-wrap",
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                {blog.content}
              </article>
            </div>

            {/* Social Share / Interaction */}
            <div
              style={{
                marginTop: "5rem",
                padding: "3rem",
                background: "#f8fafc",
                borderRadius: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                border: "1px solid var(--color-border)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  background: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--color-accent)",
                  marginBottom: "1.5rem",
                  boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
                }}
              >
                <Gavel size={30} />
              </div>
              <h3
                style={{
                  marginBottom: "1rem",
                  color: "var(--color-primary)",
                  fontSize: "1.5rem",
                }}
              >
                Hukuki Danışmanlık Alın
              </h3>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  marginBottom: "2rem",
                  maxWidth: "500px",
                }}
              >
                Bu makaledeki konu veya diğer hukuki süreçleriniz için uzman
                ekibimizden randevu alarak profesyonel destek alabilirsiniz.
              </p>
              <div style={{ display: "flex", gap: "1rem" }}>
                <button
                  onClick={() => (window.location.hash = "randevu")}
                  className="btn btn-primary"
                  style={{ padding: "1rem 2.5rem" }}
                >
                  Hemen Randevu Al
                </button>
                <a
                  href="tel:+905337308053"
                  className="btn"
                  style={{
                    background: "white",
                    border: "1px solid var(--color-border)",
                    padding: "1rem 2rem",
                  }}
                >
                  Bizi Arayın
                </a>
              </div>
            </div>

            {/* Related Posts */}
            {recentBlogs.length > 0 && (
              <div style={{ marginTop: "6rem" }}>
                <h3
                  style={{
                    fontSize: "1.8rem",
                    marginBottom: "2.5rem",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Diğer Yazılarımız
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "2rem",
                  }}
                >
                  {recentBlogs.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => (window.location.hash = `blog/${item.id}`)}
                      style={{
                        cursor: "pointer",
                        padding: "1.5rem",
                        borderRadius: "20px",
                        border: "1px solid var(--color-border)",
                        transition: "0.3s",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-accent)",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          marginBottom: "0.5rem",
                          display: "block",
                        }}
                      >
                        {item.category || "Hukuk"}
                      </span>
                      <h4
                        style={{
                          fontSize: "1.2rem",
                          color: "var(--color-primary)",
                          marginBottom: "1rem",
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontSize: "0.9rem",
                          color: "var(--color-text-muted)",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    const url = `https://wa.me/905337308053?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8, originBottomRight: true }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            style={{
              width: "320px",
              background: "white",
              borderRadius: "16px",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              overflow: "hidden",
              marginBottom: "20px",
              border: "1px solid rgba(0,0,0,0.05)",
              transformOrigin: "bottom right",
            }}
          >
            <div
              style={{
                background: "#075e54",
                color: "white",
                padding: "1.2rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#075e54",
                }}
              >
                <Scale size={24} />
              </div>
              <div>
                <h4
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Av. İsmail Karaca
                </h4>
                <p style={{ margin: 0, fontSize: "0.8rem", opacity: 0.8 }}>
                  Çevrimiçi
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  marginLeft: "auto",
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <div
              style={{
                background: "#e5ddd5",
                padding: "1.5rem",
                minHeight: "150px",
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  background: "white",
                  padding: "1rem",
                  borderRadius: "0 12px 12px 12px",
                  fontSize: "0.9rem",
                  color: "#333",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  maxWidth: "90%",
                }}
              >
                Merhaba! Size hukuki danışmanlık konusunda nasıl yardımcı
                olabilirim?
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "#999",
                    textAlign: "right",
                    marginTop: "5px",
                  }}
                >
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </motion.div>
            </div>

            <form
              onSubmit={handleSend}
              style={{
                display: "flex",
                padding: "1rem",
                background: "#f0f0f0",
                gap: "10px",
              }}
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajınızı yazın..."
                style={{
                  flex: 1,
                  padding: "0.8rem 1rem",
                  borderRadius: "24px",
                  border: "none",
                  outline: "none",
                  fontSize: "0.9rem",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                }}
              />
              <button
                type="submit"
                style={{
                  background: "#25D366",
                  color: "white",
                  border: "none",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0 2px 5px rgba(37,211,102,0.3)",
                }}
              >
                <ChevronRight size={20} style={{ marginLeft: "2px" }} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: "#25D366",
          color: "white",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(37, 211, 102, 0.4)",
          border: "none",
          cursor: "pointer",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <motion.div
          animate={{
            scale: isOpen ? 1 : [1, 1.15, 1],
          }}
          transition={{
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isOpen ? (
            <X size={32} />
          ) : (
            <svg viewBox="0 0 24 24" width="36" height="36" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
          )}
        </motion.div>
      </motion.button>
    </div>
  );
};

const AppointmentPage = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastAppointment, setLastAppointment] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "var(--color-bg-light)",
        minHeight: "100vh",
        padding: "4rem 1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <StarryBackground
        count={30}
        color="rgba(184, 145, 70, 0.2)"
        drift={true}
      />

      {/* Top Left Back Button */}
      <a
        href="#home"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 10,
          textDecoration: "none",
          color: "var(--color-primary)",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          fontSize: "0.9rem",
          fontWeight: 600,
          background: "white",
          padding: "0.6rem 1.2rem",
          borderRadius: "30px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <ChevronRight size={18} style={{ transform: "rotate(180deg)" }} /> Ana
        Sayfaya Dön
      </a>

      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: "white",
            padding: "2.5rem 2rem",
            borderRadius: "24px",
            boxShadow: "var(--shadow-soft)",
            width: "100%",
            maxWidth: "650px",
            border: "1px solid var(--color-border)",
            margin: "auto",
          }}
        >
          {/* Header Row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "1.5rem",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "1rem",
            }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
            >
              <Scale size={28} style={{ color: "var(--color-accent)" }} />
              <h1
                style={{
                  fontSize: "1.5rem",
                  margin: 0,
                  color: "var(--color-primary)",
                }}
              >
                Randevu Planla
              </h1>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const appData = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                category: formData.get('category'),
                date: formData.get('date'),
                type: formData.get('type'),
                note: formData.get('note')
              };
              
              const { error } = await supabase
                .from('appointments')
                .insert([appData]);

              if (error) {
                alert('Gönderim hatası: ' + error.message);
              } else {
                // Email Notification
                const emailParams = {
                  from_name: appData.name,
                  phone: appData.phone,
                  category: appData.category,
                  date: appData.date,
                  type: appData.type,
                  note: appData.note,
                  to_email: 'avismailkaraca@gmail.com'
                };

                emailjs.send(
                  'service_dk86hrf',
                  'template_38c07ft',
                  emailParams,
                  '7er87R9bTKtUt82Sb'
                ).then(() => {
                  console.log('Email sent successfully');
                }).catch((err) => {
                  console.error('Email error:', err);
                });

                setLastAppointment(appData);
                setShowSuccess(true);
              }
            }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  Ad Soyad *
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="Adınız Soyadınız"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                    fontFamily: "inherit",
                    background: "#fafafa",
                  }}
                  required
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  Telefon *
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="05XX XXX XX XX"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                    fontFamily: "inherit",
                    background: "#fafafa",
                  }}
                  required
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                }}
              >
                Hukuk Alanı
              </label>
              <select
                name="category"
                style={{
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid var(--color-border)",
                  outline: "none",
                  fontFamily: "inherit",
                  background: "#fafafa",
                  cursor: "pointer",
                }}
              >
                <option value="">Seçiniz</option>
                <option value="ceza">Ceza Hukuku</option>
                <option value="aile">Aile Hukuku</option>
                <option value="gayrimenkul">Gayrimenkul Hukuku</option>
                <option value="is">İş Hukuku</option>
                <option value="diger">Genel Danışmanlık</option>
              </select>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  Tarih
                </label>
                <input
                  name="date"
                  type="date"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                    fontFamily: "inherit",
                    background: "#fafafa",
                    cursor: "pointer",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                }}
              >
                <label
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "var(--color-text-main)",
                  }}
                >
                  Görüşme Şekli
                </label>
                <select
                  name="type"
                  style={{
                    padding: "0.75rem",
                    borderRadius: "6px",
                    border: "1px solid var(--color-border)",
                    outline: "none",
                    fontFamily: "inherit",
                    background: "#fafafa",
                    cursor: "pointer",
                  }}
                >
                  <option value="yuz-yuze">Yüz Yüze (Ofis)</option>
                  <option value="online">Online (Zoom vb.)</option>
                </select>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.3rem",
              }}
            >
              <label
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: "var(--color-text-main)",
                }}
              >
                Konu Özeti (İsteğe Bağlı)
              </label>
              <textarea
                name="note"
                rows={2}
                placeholder="Kısa bir bilgi..."
                style={{
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid var(--color-border)",
                  outline: "none",
                  fontFamily: "inherit",
                  background: "#fafafa",
                  resize: "vertical",
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "0.9rem",
                justifyContent: "center",
                fontSize: "0.95rem",
                marginTop: "0.5rem",
                borderRadius: "6px",
              }}
            >
              Randevu Talebini Gönder
            </button>
            <p
              style={{
                textAlign: "center",
                fontSize: "0.7rem",
                color: "var(--color-text-muted)",
                marginTop: "0.2rem",
              }}
            >
              Bilgileriniz KVKK kapsamında korunmaktadır.
            </p>
          </form>
        </motion.div>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(10, 46, 92, 0.95)",
              backdropFilter: "blur(10px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              padding: "2rem",
              overflowY: "auto",
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              style={{
                background: "white",
                padding: "3rem 1.5rem",
                borderRadius: "32px",
                maxWidth: "500px",
                width: "100%",
                textAlign: "center",
                boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                margin: "auto",
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  damping: 12,
                  stiffness: 200,
                  delay: 0.2,
                }}
                style={{
                  width: "100px",
                  height: "100px",
                  background: "var(--color-accent)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 2rem",
                  color: "white",
                }}
              >
                <CheckCircle2 size={50} />
              </motion.div>

              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "2.2rem",
                  color: "var(--color-primary)",
                  marginBottom: "1rem",
                }}
              >
                Talebiniz Alındı
              </h2>
              <p
                style={{
                  color: "var(--color-text-muted)",
                  fontSize: "1.1rem",
                  lineHeight: "1.6",
                  marginBottom: "2.5rem",
                }}
              >
                Randevu talebiniz başarıyla sistemimize kaydedilmiştir. En kısa
                sürede belirttiğiniz iletişim numarası üzerinden size geri dönüş
                sağlanacaktır.
              </p>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => (window.location.hash = "home")}
                  className="btn"
                  style={{
                    width: "100%",
                    padding: "1.2rem",
                    justifyContent: "center",
                    fontSize: "1rem",
                    border: '1px solid var(--color-border)',
                    background: 'white'
                  }}
                >
                  Ana Sayfaya Dön
                </button>
                
                {lastAppointment && (
                  <button
                    onClick={() => {
                      const msg = `Merhaba, ben ${lastAppointment.name}. Web siteniz üzerinden ${lastAppointment.category || 'Hukuki Danışmanlık'} konusu için ${lastAppointment.date ? lastAppointment.date + ' tarihinde' : ''} bir randevu talebi oluşturdum. Detayları görüşmek isterim.`;
                      window.open(`https://wa.me/905337308053?text=${encodeURIComponent(msg)}`, '_blank');
                    }}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "1.2rem",
                      justifyContent: "center",
                      fontSize: "1rem",
                      background: '#25D366',
                      borderColor: '#25D366'
                    }}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ marginRight: '10px' }}>
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                    </svg>
                    WhatsApp ile Detayları Gönder
                  </button>
                )}
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--color-accent)",
                    fontWeight: 600,
                  }}
                >
                  Karaca Hukuk & Danışmanlık
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    // Safety timeout to ensure preloader closes even if animation fails
    const safetyTimer = setTimeout(() => setLoading(false), 3000);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      clearTimeout(safetyTimer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Ceza Hukuku",
      icon: <Gavel size={28} />,
      desc: "Soruşturma ve kovuşturma aşamalarında, sanık ve mağdur haklarının temsili.",
    },
    {
      title: "Aile Hukuku",
      icon: <Users size={28} />,
      desc: "Boşanma, velayet, nafaka ve mal rejimi uyuşmazlıklarında çözüm odaklı yaklaşım.",
    },
    {
      title: "Gayrimenkul Hukuku",
      icon: <MapPin size={28} />,
      desc: "Tapu iptal, tescil ve taşınmaz yönetimi konularında kapsamlı danışmanlık.",
    },
    {
      title: "İş Hukuku",
      icon: <Briefcase size={28} />,
      desc: "İşe iade, tazminat ve iş sözleşmelerinden doğan tüm davaların takibi.",
    },
    {
      title: "Tazminat Hukuku",
      icon: <Scale size={28} />,
      desc: "Maddi ve manevi tazminat davalarında hak kayıplarını önleyen süreç yönetimi.",
    },
    {
      title: "İcra ve İflas Hukuku",
      icon: <ShieldCheck size={28} />,
      desc: "Alacak tahsili ve borç ilişkilerinin hukuki zeminde etkin yönetilmesi.",
    },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  };

  if (currentHash === "#randevu") {
    return <AppointmentPage />;
  }

  if (currentHash === "#blog") {
    return (
      <>
        <div className="app-container">
          <nav className="navbar scrolled">
            <div className="container nav-content">
              <a
                href="#home"
                className="logo-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
              >
                <div className="logo" style={{ lineHeight: "1" }}>
                  KARACA <span>HUKUK</span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    color: "var(--color-text-muted)",
                    letterSpacing: "1.5px",
                    marginTop: "5px",
                  }}
                >
                  Av. İsmail Karaca
                </div>
              </a>
              <div className="nav-links">
                <a href="#home">Ana Sayfa</a>
                <a href="#blog" style={{ color: "var(--color-accent)" }}>
                  Blog
                </a>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
              </div>
              <div className="mobile-header-actions" style={{ alignItems: 'center', gap: '0.75rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '6px' }}
                  onClick={() => { setIsMenuOpen(false); window.location.hash = 'randevu'; }}
                >
                  Randevu
                </button>
                <button
                  className="mobile-menu-btn"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay for Blog */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  position: 'fixed',
                  top: '65px',
                  left: 0,
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 999,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {["Ana Sayfa", "Hakkımızda", "Hizmetlerimiz", "Blog", "İletişim"].map((item) => (
                    <a
                      key={item}
                      href={item === "Ana Sayfa" ? "#" : `#${item.toLowerCase().replace("ı", "i").replace(" ", "")}`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ textDecoration: 'none', color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <BlogPage />
          <WhatsAppWidget />
        </div>
      </>
    );
  }

  if (currentHash.startsWith("#blog/")) {
    const postId = currentHash.split("/")[1];
    return (
      <>
        <div className="app-container">
          <nav className="navbar scrolled">
            <div className="container nav-content">
              <a
                href="#home"
                className="logo-container"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textDecoration: "none",
                }}
              >
                <div className="logo" style={{ lineHeight: "1" }}>
                  KARACA <span>HUKUK</span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: "italic",
                    color: "var(--color-text-muted)",
                    letterSpacing: "1.5px",
                    marginTop: "5px",
                  }}
                >
                  Av. İsmail Karaca
                </div>
              </a>
              <div className="nav-links">
                <a href="#home">Ana Sayfa</a>
                <a href="#blog">Blog</a>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
              </div>
              <div className="mobile-header-actions" style={{ alignItems: 'center', gap: '0.75rem' }}>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '6px' }}
                  onClick={() => { setIsMenuOpen(false); window.location.hash = 'randevu'; }}
                >
                  Randevu
                </button>
                <button
                  className="mobile-menu-btn"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Overlay for Blog Post */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  position: 'fixed',
                  top: '65px',
                  left: 0,
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.98)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 999,
                  boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderBottom: '1px solid var(--color-border)'
                }}
              >
                <div style={{ padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {["Ana Sayfa", "Hakkımızda", "Hizmetlerimiz", "Blog", "İletişim"].map((item) => (
                    <a
                      key={item}
                      href={item === "Ana Sayfa" ? "#" : `#${item.toLowerCase().replace("ı", "i").replace(" ", "")}`}
                      onClick={() => setIsMenuOpen(false)}
                      style={{ textDecoration: 'none', color: 'var(--color-primary)', fontSize: '1.1rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)', paddingBottom: '0.75rem' }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <BlogPostPage id={postId} />
          <WhatsAppWidget />
        </div>
      </>
    );
  }

  if (currentHash === "#admin") {
    return <AdminApp />;
  }

  return (
    <>
      <AnimatePresence>
        {loading && (
          <Preloader
            onFinish={() => setTimeout(() => setLoading(false), 500)}
          />
        )}
      </AnimatePresence>

      <div
        className="app-container"
        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.8s ease" }}
      >
        {/* Navbar */}
        <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
          <div className="container nav-content">
            <motion.a
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              href="#"
              className="logo-container"
              style={{
                display: "flex",
                flexDirection: "column",
                textDecoration: "none",
              }}
            >
              <div className="logo" style={{ lineHeight: "1" }}>
                KARACA <span>HUKUK</span>
              </div>
              <div
                style={{
                  fontSize: "0.85rem",
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: "italic",
                  color: "var(--color-text-muted)",
                  letterSpacing: "1.5px",
                  marginTop: "5px",
                }}
              >
                Av. İsmail Karaca
              </div>
            </motion.a>

            <div className="nav-links">
              {[
                "Ana Sayfa",
                "Hakkımızda",
                "Hizmetlerimiz",
                "Blog",
                "İletişim",
              ].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  href={
                    item === "Ana Sayfa"
                      ? "#"
                      : `#${item.toLowerCase().replace("ı", "i").replace(" ", "")}`
                  }
                >
                  {item}
                </motion.a>
              ))}
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="btn btn-primary"
                style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem" }}
                onClick={() => (window.location.hash = "randevu")}
              >
                Randevu Planla
              </motion.button>
            </div>

            <div
              className="mobile-header-actions"
              style={{ alignItems: "center", gap: "0.75rem" }}
            >
              <button
                className="btn btn-primary"
                style={{
                  padding: "0.4rem 0.8rem",
                  fontSize: "0.8rem",
                  borderRadius: "6px",
                }}
                onClick={() => {
                  setIsMenuOpen(false);
                  window.location.hash = "randevu";
                }}
              >
                Randevu
              </button>
              <button
                className="mobile-menu-btn"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                position: "fixed",
                top: isScrolled ? "65px" : "75px",
                left: 0,
                width: "100%",
                background: "rgba(255, 255, 255, 0.98)",
                backdropFilter: "blur(10px)",
                zIndex: 999,
                boxShadow: "0 10px 20px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                borderBottom: "1px solid var(--color-border)",
                transition: "top 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              <div
                style={{
                  padding: "2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {[
                  "Ana Sayfa",
                  "Hakkımızda",
                  "Hizmetlerimiz",
                  "Blog",
                  "İletişim",
                ].map((item) => (
                  <a
                    key={item}
                    href={
                      item === "Ana Sayfa"
                        ? "#"
                        : `#${item.toLowerCase().replace("ı", "i").replace(" ", "")}`
                    }
                    onClick={() => setIsMenuOpen(false)}
                    style={{
                      textDecoration: "none",
                      color: "var(--color-primary)",
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      borderBottom: "1px solid var(--color-border)",
                      paddingBottom: "0.75rem",
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hero Section */}
        <section id="home" className="hero">
          <StarryBackground
            count={60}
            color="rgba(184, 145, 70, 0.8)"
            drift={true}
          />
          <div className="container" style={{ zIndex: 1 }}>
            <div className="hero-grid">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="hero-content"
              >
                <span className="section-tag">Güvenilir Hukuki Çözümler</span>
                <h1>
                  Analitik Yaklaşım,{" "}
                  <span style={{ color: "var(--color-accent)" }}>
                    Etkin Temsil
                  </span>
                  .
                </h1>
                <p>
                  Karaca Hukuk ve Danışmanlık olarak müvekkillerimize şeffaf
                  iletişim ve başarı odaklı hizmet sunuyoruz.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => (window.location.hash = "randevu")}
                  >
                    Randevu Planla <ChevronRight size={18} />
                  </button>
                  <button
                    className="btn"
                    style={{
                      border: "1px solid var(--color-border)",
                      color: "var(--color-primary)",
                    }}
                  >
                    Hizmetlerimiz
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 50 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="hero-img"
              >
                <img src="/hero_bright.png" alt="Karaca Hukuk Ofis" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="section">
          <div className="container">
            <div className="hero-grid">
              <motion.div {...fadeInUp} style={{ position: "relative" }}>
                <div
                  style={{
                    width: "100%",
                    height: "500px",
                    background: "#f0f4f8",
                    borderRadius: "20px",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src="/hero_bright.png"
                    alt="Hakkımızda"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.8,
                    }}
                  />
                </div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  style={{
                    position: "absolute",
                    bottom: "-30px",
                    right: "-30px",
                    background: "var(--color-primary)",
                    color: "white",
                    padding: "2.5rem",
                    borderRadius: "15px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <h3
                    style={{
                      color: "white",
                      fontSize: "2.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    15+
                  </h3>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      opacity: 0.8,
                    }}
                  >
                    Yıllık Tecrübe
                  </p>
                </motion.div>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
                <span className="section-tag">Kurumsal Kimliğimiz</span>
                <h2 className="section-title" style={{ marginBottom: "2rem" }}>
                  Hukukta Şeffaflık ve Güven Esasları
                </h2>
                <p
                  style={{
                    marginBottom: "1.5rem",
                    color: "var(--color-text-muted)",
                  }}
                >
                  Avukat İsmail Karaca tarafından kurulan Karaca Hukuk ve
                  Danışmanlık; ceza, aile, miras ve gayrimenkul başta olmak
                  üzere hukukun çeşitli alanlarında profesyonel hizmet
                  sunmaktadır.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1.5rem",
                  }}
                >
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ color: "var(--color-accent)" }}>
                      <Award size={24} />
                    </div>
                    <div>
                      <h4
                        style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}
                      >
                        Başarı Odaklı
                      </h4>
                      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                        Hedeflenen sonuca en kısa sürede ulaşım.
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <div style={{ color: "var(--color-accent)" }}>
                      <Clock size={24} />
                    </div>
                    <div>
                      <h4
                        style={{ fontSize: "0.95rem", marginBottom: "0.25rem" }}
                      >
                        Hızlı Geri Dönüş
                      </h4>
                      <p style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                        Müvekkillerin düzenli bilgilendirilmesi.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="section"
          style={{ background: "var(--color-bg-light)" }}
        >
          <div className="container">
            <motion.div
              {...fadeInUp}
              style={{ textAlign: "center", marginBottom: "5rem" }}
            >
              <span className="section-tag">Çalışma Alanlarımız</span>
              <h2 className="section-title">
                Uzmanlık Gerektiren Hukuki Süreçler
              </h2>
            </motion.div>

            <div className="practice-grid">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="card-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                  <a
                    href="#"
                    style={{
                      marginTop: "1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "var(--color-accent)",
                      textDecoration: "none",
                      fontWeight: "600",
                      fontSize: "0.85rem",
                    }}
                  >
                    DETAYLI BİLGİ <ArrowUpRight size={16} />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="section"
          style={{ background: "var(--color-accent)", padding: "5rem 0" }}
        >
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div style={{ color: "white" }}>
              <h2 style={{ fontSize: "2.5rem", color: "white" }}>
                Hukuki Yardım Alın
              </h2>
              <p style={{ color: "rgba(255,255,255,0.9)" }}>
                Uzman ekibimizle görüşmek için randevu planlayın.
              </p>
            </div>
            <button
              className="btn"
              style={{ background: "var(--color-primary)", color: "white" }}
            >
              <Phone size={18} /> +90 (533) 730 80 53
            </button>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section id="contact" className="section">
          <div className="container">
            <div className="hero-grid">
              <motion.div {...fadeInUp}>
                <span className="section-tag">İletişime Geçin</span>
                <h2 className="section-title">Biz Buradayız</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    marginTop: "2rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "var(--color-bg-light)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Phone size={20} />
                    </div>
                    <p style={{ fontWeight: "700" }}>+90 (533) 730 80 53</p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        background: "var(--color-bg-light)",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--color-primary)",
                      }}
                    >
                      <Mail size={20} />
                    </div>
                    <p style={{ fontWeight: "700" }}>
                      avismailkaraca@gmail.com
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                style={{
                  background: "var(--color-white)",
                  padding: "3rem",
                  borderRadius: "20px",
                  border: "1px solid var(--color-border)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const btn = e.target.querySelector('button');
                    const originalText = btn.innerText;
                    btn.innerText = 'Gönderiliyor...';
                    btn.disabled = true;

                    const emailParams = {
                      from_name: formData.get('user_name'),
                      email: formData.get('user_email'),
                      message: formData.get('message'),
                      to_email: 'avismailkaraca@gmail.com'
                    };

                    try {
                      await emailjs.send(
                        'service_dk86hrf',
                        'template_38c07ft',
                        emailParams,
                        '7er87R9bTKtUt82Sb'
                      );
                      alert('Mesajınız başarıyla iletildi. En kısa sürede dönüş yapılacaktır.');
                      e.target.reset();
                    } catch (err) {
                      alert('Bir hata oluştu: ' + err.message);
                    } finally {
                      btn.innerText = originalText;
                      btn.disabled = false;
                    }
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                  }}
                >
                  <input
                    type="text"
                    name="user_name"
                    placeholder="Ad Soyad"
                    required
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                  <input
                    type="email"
                    name="user_email"
                    placeholder="E-Posta"
                    required
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                      fontFamily: "inherit",
                    }}
                  />
                  <textarea
                    name="message"
                    placeholder="Mesajınız"
                    required
                    rows={5}
                    style={{
                      padding: "1rem",
                      borderRadius: "8px",
                      border: "1px solid var(--color-border)",
                      outline: "none",
                      fontFamily: "inherit",
                      resize: "none",
                    }}
                  ></textarea>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ justifyContent: "center" }}
                  >
                    Gönder
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          style={{
            background: "var(--color-primary)",
            color: "white",
            padding: "4rem 0 2rem",
          }}
        >
          <div className="container">
            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "2rem",
                textAlign: "center",
                fontSize: "0.85rem",
              }}
            >
              © 2026 Karaca Hukuk ve Danışmanlık | Tüm Hakları Saklıdır.
            </div>
          </div>
        </footer>

        <WhatsAppWidget />
      </div>
    </>
  );
};

export default App;
