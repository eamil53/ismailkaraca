import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import logoImage from "./assets/logo.png";
import ismailKaraca from "./assets/ismail_karaca.png";

// Custom Leaflet Marker Icon
const customIcon = new L.DivIcon({
  className: "custom-pin",
  html: `<div style="background-color: var(--color-accent); width: 40px; height: 40px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">
           <div style="transform: rotate(45deg); color: white; display: flex; align-items: center; justify-content: center;">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
           </div>
         </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

import { supabase } from "./supabaseClient";
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";
import { trackPageView } from "./utils/analytics";
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
  FileText,
  Building2,
  Scroll,
  ShieldAlert,
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
            marginTop: "-1rem",
            letterSpacing: "clamp(2px, 0.8vw, 5px)",
            fontSize: "clamp(0.95rem, 4.2vw, 1.6rem)",
            textAlign: "center",
            padding: "0 1.5rem",
            whiteSpace: "nowrap",
            fontFamily: "'Playfair Display', serif",
            fontWeight: 500,
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          KARACA HUKUK{" "}
          <span
            style={{
              fontFamily: "sans-serif",
              color: "var(--color-accent)",
              fontWeight: "normal",
            }}
          >
            &
          </span>{" "}
          DANIŞMANLIK
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

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      style={{
        background: "#fcfcfc",
        minHeight: "100vh",
        paddingTop: "85px",
        paddingBottom: "100px",
        position: "relative",
      }}
    >
      <style>{`
        .about-wrapper {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          gap: 4rem;
          align-items: start;
          justify-content: center;
        }
        .about-image-col {
          flex: 1 1 380px;
          max-width: 450px;
          position: relative;
          margin: 0 auto;
        }
        .about-text-col {
          flex: 1 1 500px;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }
        .about-quick-badge {
          position: absolute;
          bottom: -20px;
          right: 20px;
          background: var(--color-primary);
          color: white;
          padding: 1rem 2rem;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.2);
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 2;
        }
        @media (max-width: 991px) {
          .about-wrapper {
            flex-direction: column;
            gap: 3rem;
            align-items: center;
          }
          .about-image-col {
            flex: 1 1 auto;
            width: 100%;
            max-width: 400px;
          }
          .about-text-col {
            flex: 1 1 auto;
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          .about-wrapper {
            gap: 2.5rem;
          }
          .about-quick-badge {
            position: relative !important;
            bottom: auto !important;
            right: auto !important;
            margin: 1.5rem auto 0 !important;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05) !important;
            display: block;
            width: 100%;
            box-sizing: border-box;
          }
        }
      `}</style>

      <StarryBackground
        count={45}
        color="rgba(184, 145, 70, 0.08)"
        drift={true}
      />

      <div
        className="container"
        style={{ paddingTop: "0", paddingBottom: "1.5rem" }}
      >
        {/* Premium Header Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              fontFamily: "'Playfair Display', serif",
              color: "var(--color-primary)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "1px",
              lineHeight: "1.2",
            }}
          >
            Hakkımızda
          </h1>

          {/* Premium Gradient Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "240px",
              marginTop: "1.2rem",
              gap: "12px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, var(--color-accent))",
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                boxShadow: "0 0 8px var(--color-accent)",
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background:
                  "linear-gradient(to left, transparent, var(--color-accent))",
              }}
            ></div>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="about-wrapper">
          {/* Left Column: Premium Image Wrapper */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="about-image-col"
          >
            <div
              style={{
                position: "relative",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(184, 145, 70, 0.2)",
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.02)",
                background: "white",
                padding: "12px",
              }}
            >
              {/* Gold Accent Corner Decor */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "40px",
                  height: "40px",
                  borderTop: "3px solid var(--color-accent)",
                  borderLeft: "3px solid var(--color-accent)",
                  borderRadius: "24px 0 0 0",
                  pointerEvents: "none",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  width: "40px",
                  height: "40px",
                  borderBottom: "3px solid var(--color-accent)",
                  borderRight: "3px solid var(--color-accent)",
                  borderRadius: "0 0 24px 0",
                  pointerEvents: "none",
                }}
              ></div>

              <img
                src={ismailKaraca}
                alt="Avukat İsmail Karaca"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "16px",
                  display: "block",
                  objectFit: "cover",
                  aspectRatio: "3/4",
                }}
              />
            </div>

            {/* Quick Info Badge */}
            <div className="about-quick-badge">
              <h4
                style={{
                  margin: 0,
                  fontSize: "1.1rem",
                  fontFamily: "'Playfair Display', serif",
                  color: "white",
                }}
              >
                Av. İsmail Karaca
              </h4>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "0.8rem",
                  color: "var(--color-accent)",
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Rize Barosu - Sicil: 588
              </p>
            </div>
          </motion.div>

          {/* Right Column: Bio Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="about-text-col"
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Scale size={24} color="var(--color-accent)" />
              <h2
                style={{
                  fontSize: "1.8rem",
                  fontFamily: "'Playfair Display', serif",
                  color: "var(--color-primary)",
                  margin: 0,
                }}
              >
                Kurucu Avukat
              </h2>
            </div>

            <p
              style={{
                fontSize: "1.1rem",
                lineHeight: "1.8",
                color: "var(--color-text)",
                margin: 0,
                fontStyle: "italic",
                borderLeft: "4px solid var(--color-accent)",
                paddingLeft: "1.2rem",
              }}
            >
              Rize Barosu’na 588 sicil numarası ile kayıtlı bulunan Avukat
              İsmail Karaca, dört yıllık hukuk fakültesi eğitiminin ardından
              avukatlık stajını başarıyla tamamlamış ve akabinde Karaca Hukuk &
              Danışmanlık’ı kurarak mesleki faaliyetlerine başlamıştır.
            </p>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              Karaca Hukuk & Danışmanlık bünyesinde; ceza, aile, miras,
              gayrimenkul, iş, idare, icra ve sair hukukun çeşitli alanlarında
              bireysel ve kurumsal müvekkillere yönelik danışmanlık ve avukatlık
              hizmeti sunulmaktadır. Hukuki uyuşmazlıkların her aşamasında
              müvekkillerin hak ve menfaatlerini en üst düzeyde koruyan, hızlı,
              etkin ve sürdürülebilir çözümler üretmek temel yaklaşımımızdır.
            </p>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              Bu kapsamda, dava öncesi süreçlerin sağlıklı şekilde yönetilmesi,
              uyuşmazlıkların mümkün olan en kısa sürede ve en az maliyetle
              çözüme kavuşturulması; dava ve takip süreçlerinin ise titizlikle
              yürütülmesi esas alınmaktadır. Her bir dosya, somut olayın
              özellikleri dikkate alınarak analitik bir yaklaşımla
              değerlendirilmekte; müvekkillere sürecin her aşamasında açık ve
              anlaşılır şekilde bilgilendirme yapılmaktadır.
            </p>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: "1.8",
                color: "var(--color-text-muted)",
                margin: 0,
              }}
            >
              Karaca Hukuk & Danışmanlık, müvekkilleri ile ilişkilerinde
              karşılıklı güven ve şeffaflık ilkesini benimsemekte; üçüncü
              kişilere karşı gizlilik yükümlülüğünü titizlikle gözetmekte ve
              mesleki etik ile ahlak kurallarına sıkı sıkıya bağlı kalarak
              faaliyet göstermektedir. Müvekkil memnuniyetini esas alan hizmet
              anlayışı doğrultusunda, hukuki süreçlerin etkin bir şekilde
              yönetilmesi ve en uygun sonucun elde edilmesi hedeflenmektedir.
            </p>

            {/* Principles Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem",
              }}
            >
              {[
                {
                  title: "Gizlilik",
                  desc: "Müvekkil bilgileri üçüncü kişilere karşı en üst düzeyde korunur.",
                  icon: <ShieldCheck size={20} />,
                },
                {
                  title: "Şeffaflık",
                  desc: "Her aşamada açık ve net bilgilendirme yapılır.",
                  icon: <CheckCircle2 size={20} />,
                },
                {
                  title: "Güven",
                  desc: "Karşılıklı dürüstlük ve mesleki ahlak esas alınır.",
                  icon: <Award size={20} />,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    background: "white",
                    padding: "1.5rem",
                    borderRadius: "16px",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ color: "var(--color-accent)" }}>
                    {item.icon}
                  </div>
                  <h4
                    style={{
                      margin: 0,
                      color: "var(--color-primary)",
                      fontSize: "1.05rem",
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--color-text-muted)",
                      fontSize: "0.85rem",
                      lineHeight: "1.4",
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) console.error("Error fetching blogs:", error);
      else setBlogs(data || []);
      setLoading(false);
    };

    fetchBlogs();
    window.scrollTo(0, 0);
  }, []);

  const defaultCategories = [
    "Ceza Hukuku",
    "Aile Hukuku",
    "Gayrimenkul Hukuku",
    "İş Hukuku",
    "Tazminat Hukuku",
    "İcra Hukuku",
  ];
  const categories = [
    "Hepsi",
    ...new Set([
      ...defaultCategories,
      ...blogs.map((b) => b.category).filter(Boolean),
    ]),
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
                <div
                  className="spinner"
                  style={{ margin: "0 auto 1.5rem" }}
                ></div>
                <p style={{ color: "var(--color-text-muted)" }}>
                  Yazılar yükleniyor...
                </p>
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
        .from("blogs")
        .select("*")
        .eq("id", id)
        .single();

      if (blogError) {
        console.error("Error fetching blog:", blogError);
      } else {
        setBlog(blogData);

        const { data: recentData } = await supabase
          .from("blogs")
          .select("*")
          .neq("id", id)
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

    const encodedText = encodeURIComponent(message);
    // Mobil derin yönlendirme (deep-link) kayıplarını önlemek için doğrudan 'api.whatsapp.com' genel API'sini kullanıyoruz.
    // 'wa.me' adresleri mobil cihazlarda 302 yönlendirmesi yaptığı için telefonlardaki WhatsApp uygulaması açılırken
    // mesaj parametresi (text) işletim sistemi tarafından yolda kırpılabiliyor/yutulabiliyordu.
    const url = `https://api.whatsapp.com/send?phone=905337308053&text=${encodedText}`;

    // Mobil Safari, Chrome ve diğer tarayıcılardaki 'Popup Engelleyici' (Popup Blocker) kısıtlamalarını aşmak
    // ve WhatsApp uygulamasını güvenle tetiklemek için dinamik bir görünmez link oluşturup tetikliyoruz:
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

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
                name: formData.get("name"),
                phone: formData.get("phone"),
                category: formData.get("category"),
                date: formData.get("date"),
                type: formData.get("type"),
                note: formData.get("note"),
              };

              const { error } = await supabase
                .from("appointments")
                .insert([appData]);

              if (error) {
                alert("Gönderim hatası: " + error.message);
              } else {
                // Email Notification
                const emailParams = {
                  from_name: appData.name,
                  phone: appData.phone,
                  category: appData.category,
                  date: appData.date,
                  type: appData.type,
                  note: appData.note,
                  to_email: "avismailkaraca@gmail.com",
                };

                emailjs
                  .send(
                    "service_dk86hrf",
                    "template_38c07ft",
                    emailParams,
                    "7er87R9bTKtUt82Sb",
                  )
                  .then(() => {
                    console.log("Email sent successfully");
                  })
                  .catch((err) => {
                    console.error("Email error:", err);
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
                    border: "1px solid var(--color-border)",
                    background: "white",
                  }}
                >
                  Ana Sayfaya Dön
                </button>

                {lastAppointment && (
                  <button
                    onClick={() => {
                      window.open(
                        `https://wa.me/message/HPSVXCJVFBABC1`,
                        "_blank",
                      );
                    }}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      padding: "1.2rem",
                      justifyContent: "center",
                      fontSize: "1rem",
                      background: "#25D366",
                      borderColor: "#25D366",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="currentColor"
                      style={{ marginRight: "10px" }}
                    >
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

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("Tümü");
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allServices = [
    {
      title: "Ceza Hukuku",
      group: "Kamu Hukuku",
      icon: <Gavel size={32} />,
      desc: "Soruşturma ve kovuşturma aşamalarında, sanık ve mağdur haklarının temsili.",
      detail: "Ceza hukuku, bireylerin özgürlük ve hak kısıtlamalarıyla en doğrudan karşılaştığı son derece hassas bir alandır. Karaca Hukuk, soruşturma aşamasından (ifade alım, kolluk ve savcılık işlemleri, sorgu hakimliğindeki tutuklama ve adli kontrol incelemeleri) kovuşturma aşamasına (Ağır Ceza Mahkemeleri, Asliye Ceza Mahkemeleri ve İcra Ceza Mahkemeleri) kadar müvekkillerine savunma haklarını en üst düzeyde kullanabilmeleri için etkin bir temsil sunar. Ayrıca istinaf ve temyiz (Yargıtay) başvuru süreçlerinde de titizlikle dosya takibi yaparak hak kayıplarını engellemektedir."
    },
    {
      title: "Aile Hukuku",
      group: "Özel Hukuk",
      icon: <Users size={32} />,
      desc: "Boşanma, velayet, nafaka ve mal rejimi uyuşmazlıklarında çözüm odaklı yaklaşım.",
      detail: "Aile ve şahsın hukuku uyuşmazlıkları, taraflar açısından duygusal boyutu yüksek ve hassas süreçlerdir. Bu sebeple çalışmalarımız yüksek gizlilik, empati ve mesleki profesyonellik çerçevesinde yürütülmektedir. Anlaşmalı boşanma protokollerinin hazırlığı, çekişmeli boşanma davaları, velayet, nafaka talepleri, mal paylaşımı davaları, soybağının kurulması ve vesayet işlemleri gibi konularda yasal haklarınızı tam anlamıyla koruyacak etkin çözümler sunmaktayız."
    },
    {
      title: "Gayrimenkul ve Kira Hukuku",
      group: "Özel Hukuk",
      icon: <MapPin size={32} />,
      desc: "Tapu iptal, tescil, ortaklığın giderilmesi ve kira uyuşmazlıkları danışmanlığı.",
      detail: "Gayrimenkul ve kira hukuku, taşınmazların mülkiyeti, yönetimi ve bunlardan doğan uyuşmazlıkları kapsar. Özellikle Tapu İptal ve Tescil davaları, ortaklığın giderilmesi (izale-i şuyu) davaları, kira bedeli tespiti ve tahliye davaları, kat karşılığı inşaat sözleşmeleri, kamulaştırma davalarında taşınmaz sahiplerine ve kiracılara profesyonel danışmanlık ve dava takibi sağlamaktayız."
    },
    {
      title: "İş ve Sosyal Güvenlik Hukuku",
      group: "Özel Hukuk",
      icon: <Briefcase size={32} />,
      desc: "İşe iade, kıdem/ihbar tazminatları ve iş kazalarından doğan alacak davaları takibi.",
      detail: "İşçi ve işveren arasındaki ilişkilerin düzenlenmesi, hakların korunması ve uyuşmazlıkların çözümü temel uzmanlık alanlarımızdandır. İhbar ve kıdem tazminatı alacakları, fazla mesai, yıllık izin ücret alacakları, iş kazalarından kaynaklanan maddi ve manevi tazminat davaları ile SGK nezdinde hizmet tespiti davalarında müvekkillerimizi en iyi şekilde temsil ediyoruz. Ayrıca zorunlu iş arabuluculuğu süreçlerinde de aktif danışmanlık hizmeti sunmaktayız."
    },
    {
      title: "Tazminat Hukuku",
      group: "Özel Hukuk",
      icon: <Scale size={32} />,
      desc: "Maddi ve manevi tazminat davalarında hak kayıplarını önleyen profesyonel süreç yönetimi.",
      detail: "Tazminat hukuku, haksız fiil, sözleşmeye aykırılık veya başka bir hukuka aykırı eylem sebebiyle uğranılan maddi ve manevi zararların tazmin edilmesini amaçlar. Trafik kazalarından doğan tazminat davaları, tıbbi uygulama hataları (malpraktis) davaları, iş kazalarından doğan tazminat talepleri, kişilik haklarına saldırı gibi nedenlerle açılan maddi ve manevi tazminat davalarında müvekkillerimizin kayıplarının telafisi için süreci büyük bir titizlikle yürütmekteyiz."
    },
    {
      title: "İcra ve İflas Hukuku",
      group: "Özel Hukuk",
      icon: <ShieldCheck size={32} />,
      desc: "Alacak tahsili, icra takipleri ve borç ilişkilerinin hukuki zeminde yönetilmesi.",
      detail: "Alacakların hızlı, etkin ve hukuka uygun şekilde tahsili için icra-iflas mekanizmasının profesyonelce yönetilmesi gerekir. İlamsız, ilamlı ve kambiyo senedine dayalı icra takipleri, ihtiyati haciz kararlarının alınarak uygulanması, istihkak davaları, borca/imzaya itiraz davaları ile alacaklı veya borçlu konumdaki müvekkiller için borç tasfiyesi ve yapılandırma süreçlerinde hukuki destek sağlamaktayız."
    },
    {
      title: "Miras Hukuku",
      group: "Özel Hukuk",
      icon: <Scroll size={32} />,
      desc: "Mirasçılık belgesi alınması, vasiyetname düzenleme ve ortaklık paylaşımları.",
      detail: "Miras hukuku, vefat eden bir kimsenin mal varlığının yasal ve atanmış mirasçılar arasında nasıl paylaştırılacağını düzenler. Veraset ilamı (mirasçılık belgesi) alınması, miras paylaşımları ve miras taksim sözleşmelerinin hazırlanması, vasiyetname ve mirasçı atama sözleşmelerinin yasal usullere uygun düzenlenmesi, tenkis ve muris muvazaası (mirastan mal kaçırma) davaları ile mirası reddetme (reddi miras) davalarında kapsamlı ve güvenilir danışmanlık hizmeti sunmaktayız."
    },
    {
      title: "İdare ve Vergi Hukuku",
      group: "Kamu Hukuku",
      icon: <Globe size={32} />,
      desc: "İdari işlemlerin iptali, tam yargı davaları ve vergi cezaları uyuşmazlıkları.",
      detail: "Kamu kurumlarının yasalara aykırı eylem ve işlemlerine karşı bireylerin ve şirketlerin haklarını korumak hukuk devletinin gereğidir. İdari işlemlerin iptali davaları, idari para cezalarına karşı iptal başvuruları, tam yargı (tazminat) davaları, devlet memurları disiplin ve atama davaları ile haksız vergi tarhiyatı ve cezalarına karşı açılacak davalarda profesyonel dava takip hizmeti vermekteyiz."
    },
    {
      title: "Ticaret ve Şirketler Hukuku",
      group: "Özel Hukuk",
      icon: <Building2 size={32} />,
      desc: "Şirket kuruluşu, ticari sözleşmeler, birleşmeler ve ticari alacak davaları.",
      detail: "Şirketlerin ticari faaliyetlerini güvenli bir hukuki zeminde sürdürebilmeleri için koruyucu hukuk ve danışmanlık hizmeti sunmaktayız. Şirket kuruluş işlemleri, genel kurul kararlarının hukuki denetimi, ticari sözleşmelerin hazırlanması ve analizi, şirket birleşme ve devralmaları, haksız rekabet davaları ve ticari alacak/tazminat davalarında profesyonel danışmanlık ve avukatlık hizmeti sağlamaktayız."
    },
    {
      title: "Tüketici Hukuku",
      group: "Özel Hukuk",
      icon: <ShieldAlert size={32} />,
      desc: "Ayıplı mal ve hizmet uyuşmazlıkları, Tüketici Hakem Heyeti başvuruları.",
      detail: "Tüketicilerin ve satıcıların haklarının korunması, tüketici uyuşmazlıklarının çözümü için Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri nezdinde temsil sağlıyoruz. Satın alınan ayıplı mal ve hizmetlerden doğan hak talepleri, tüketici sözleşmelerindeki haksız şartlar, konut ve tatil paketlerine dair tüketici davaları gibi konularda yasal haklarınızı koruyoruz."
    }
  ];

  const filteredServices = allServices.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.detail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = selectedGroup === "Tümü" || service.group === selectedGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <div
      style={{
        background: "#fcfcfc",
        minHeight: "100vh",
        paddingTop: "120px",
        paddingBottom: "100px",
        position: "relative"
      }}
    >
      <StarryBackground
        count={50}
        color="rgba(184, 145, 70, 0.08)"
        drift={true}
      />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            textAlign: "center",
            marginBottom: "3.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <span className="section-tag">Hizmetlerimiz</span>
          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontFamily: "'Playfair Display', serif",
              color: "var(--color-primary)",
              margin: 0,
              fontWeight: 700,
              letterSpacing: "1px",
              lineHeight: "1.2"
            }}
          >
            Çalışma Alanlarımız
          </h1>
          <p
            style={{
              color: "var(--color-text-muted)",
              marginTop: "1rem",
              maxWidth: "650px",
              fontSize: "1.05rem",
              lineHeight: "1.6"
            }}
          >
            Karaca Hukuk & Danışmanlık olarak hukukun farklı disiplinlerinde uzmanlaşmış yaklaşımlarla güvenilir ve çözüm odaklı avukatlık hizmeti sunuyoruz.
          </p>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              maxWidth: "240px",
              marginTop: "1.5rem",
              gap: "12px"
            }}
          >
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(to right, transparent, var(--color-accent))"
              }}
            ></div>
            <div
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "var(--color-accent)",
                boxShadow: "0 0 8px var(--color-accent)"
              }}
            ></div>
            <div
              style={{
                flex: 1,
                height: "1px",
                background: "linear-gradient(to left, transparent, var(--color-accent))"
              }}
            ></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="services-filter-bar"
        >
          <div className="services-filter-tabs">
            {["Tümü", "Özel Hukuk", "Kamu Hukuku"].map((group) => (
              <button
                key={group}
                onClick={() => setSelectedGroup(group)}
                style={{
                  padding: "0.6rem 1.5rem",
                  borderRadius: "30px",
                  border: "1px solid",
                  borderColor: selectedGroup === group ? "var(--color-accent)" : "var(--color-border)",
                  background: selectedGroup === group ? "rgba(184, 145, 70, 0.08)" : "transparent",
                  color: selectedGroup === group ? "var(--color-accent)" : "var(--color-text-muted)",
                  fontWeight: selectedGroup === group ? "700" : "500",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                  transition: "all 0.3s ease"
                }}
              >
                {group}
              </button>
            ))}
          </div>

          <div className="services-search-box">
            <span
              style={{
                position: "absolute",
                left: "1.2rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-text-muted)",
                display: "flex",
                alignItems: "center"
              }}
            >
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Çalışma alanlarında ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem 1rem 0.75rem 2.8rem",
                borderRadius: "30px",
                border: "1px solid var(--color-border)",
                outline: "none",
                fontSize: "0.9rem",
                fontFamily: "inherit",
                background: "#fafafa",
                transition: "all 0.3s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--color-accent)";
                e.target.style.background = "white";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--color-border)";
                e.target.style.background = "#fafafa";
              }}
            />
          </div>
        </motion.div>

        {filteredServices.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "4rem 2rem",
              background: "white",
              borderRadius: "24px",
              border: "1px dashed var(--color-border)",
              maxWidth: "600px",
              margin: "2rem auto"
            }}
          >
            <Search size={40} style={{ color: "var(--color-accent)", opacity: 0.5, marginBottom: "1rem" }} />
            <h3 style={{ fontSize: "1.3rem", color: "var(--color-primary)", marginBottom: "0.5rem" }}>
              Sonuç Bulunamadı
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.95rem" }}>
              Arama kriterlerinize uygun çalışma alanı bulunamadı. Lütfen kelimeyi değiştirmeyi deneyin.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedGroup("Tümü");
              }}
              className="btn btn-primary"
              style={{ marginTop: "1.5rem", padding: "0.6rem 1.5rem", borderRadius: "30px", fontSize: "0.85rem" }}
            >
              Filtreleri Temizle
            </button>
          </motion.div>
        ) : (
          <div className="practice-grid">
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <motion.div
                  layout
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: "100%",
                    background: "white",
                    position: "relative",
                    overflow: "hidden"
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "1rem",
                      right: "1.5rem",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      background: "rgba(184, 145, 70, 0.08)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "10px"
                    }}
                  >
                    {service.group}
                  </span>

                  <div>
                    <div className="card-icon" style={{ marginTop: "0.5rem" }}>{service.icon}</div>
                    <h3 style={{ fontSize: "1.4rem", color: "var(--color-primary)" }}>{service.title}</h3>
                    <p style={{ fontSize: "0.9rem", lineHeight: "1.6", color: "var(--color-text-muted)" }}>
                      {service.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedService(service)}
                    style={{
                      marginTop: "2rem",
                      alignSelf: "flex-start",
                      background: "none",
                      border: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      color: "var(--color-accent)",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      padding: "0",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease"
                    }}
                  >
                    DETAYLI BİLGİ <ArrowUpRight size={16} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: "6rem",
            background: "linear-gradient(135deg, var(--color-primary) 0%, #153866 100%)",
            padding: "4rem 2rem",
            borderRadius: "32px",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            border: "1px solid rgba(184, 145, 70, 0.2)",
            boxShadow: "0 20px 50px rgba(10, 46, 92, 0.15)"
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-50px",
              right: "-50px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(184, 145, 70, 0.05)",
              pointerEvents: "none"
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-50px",
              left: "-50px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background: "rgba(255, 255, 255, 0.02)",
              pointerEvents: "none"
            }}
          />

          <h2 style={{ color: "white", fontSize: "2rem", marginBottom: "1rem" }}>
            Hukuki Danışmanlık ve Destek Alın
          </h2>
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              fontSize: "1rem",
              lineHeight: "1.6"
            }}
          >
            Çalışma alanlarımızla ilgili daha fazla bilgi edinmek ya da uyuşmazlığınızın çözümü için hemen randevu talebi oluşturabilirsiniz.
          </p>

          <div className="services-cta-actions">
            <button
              onClick={() => (window.location.hash = "randevu")}
              className="btn btn-accent"
              style={{
                padding: "1rem 2.5rem",
                borderRadius: "30px",
                fontWeight: "700"
              }}
            >
              Hemen Randevu Al
            </button>
            <button
              onClick={() => {
                window.open("https://api.whatsapp.com/send?phone=905337308053", "_blank");
              }}
              className="btn"
              style={{
                background: "#25D366",
                borderColor: "#25D366",
                color: "white",
                padding: "1rem 2.5rem",
                borderRadius: "30px",
                fontWeight: "700"
              }}
            >
              WhatsApp ile Sor
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedService && (
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
              background: "rgba(10, 46, 92, 0.7)",
              backdropFilter: "blur(12px)",
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1.5rem"
            }}
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="services-modal-body"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedService(null)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  background: "none",
                  border: "none",
                  color: "var(--color-text-muted)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  backgroundColor: "#f5f7fa"
                }}
              >
                <X size={20} />
              </button>

              <div className="services-modal-header">
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    backgroundColor: "rgba(184, 145, 70, 0.1)",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-accent)",
                    flexShrink: 0
                  }}
                >
                  {selectedService.icon}
                </div>
                <div>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                      letterSpacing: "1px"
                    }}
                  >
                    {selectedService.group}
                  </span>
                  <h2
                    style={{
                      margin: "2px 0 0 0",
                      fontSize: "1.6rem",
                      color: "var(--color-primary)",
                      fontFamily: "'Playfair Display', serif"
                    }}
                  >
                    {selectedService.title}
                  </h2>
                </div>
              </div>

              <div
                style={{
                  borderTop: "1px solid var(--color-border)",
                  borderBottom: "1px solid var(--color-border)",
                  padding: "1.5rem 0",
                  marginBottom: "2rem"
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.8",
                    color: "#334155",
                    margin: 0
                  }}
                >
                  {selectedService.detail}
                </p>
              </div>

              <div className="services-modal-actions">
                <button
                  onClick={() => {
                    setSelectedService(null);
                    window.location.hash = "randevu";
                  }}
                  className="btn btn-primary"
                  style={{
                    padding: "0.75rem 1.8rem",
                    fontSize: "0.9rem",
                    borderRadius: "30px",
                    fontWeight: "600"
                  }}
                >
                  Randevu Planla
                </button>
                <button
                  onClick={() => {
                    const waText = encodeURIComponent(`Merhaba, ${selectedService.title} konusuyla ilgili bilgi almak istiyorum.`);
                    window.open(`https://api.whatsapp.com/send?phone=905337308053&text=${waText}`, "_blank");
                  }}
                  className="btn"
                  style={{
                    background: "#25D366",
                    borderColor: "#25D366",
                    color: "white",
                    padding: "0.75rem 1.8rem",
                    fontSize: "0.9rem",
                    borderRadius: "30px",
                    fontWeight: "600"
                  }}
                >
                  WhatsApp'tan Yazın
                </button>
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
    // Record page view on load and whenever hash changes
    trackPageView(currentHash);
  }, [currentHash]);

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

  useEffect(() => {
    if (!currentHash) return;

    // Hash to Section ID mapping for homepage scrolling
    const hashToId = {
      "#hizmetlerimiz": "services",
      "#iletisim": "contact",
      "#about": "about",
      "#home": "home",
    };

    const targetId = hashToId[currentHash];
    if (targetId) {
      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 150);
    }
  }, [currentHash]);

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

  if (currentHash === "#calisma-alanlarimiz") {
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
                <a href="#hakkimizda">Hakkımızda</a>
                <a href="#calisma-alanlarimiz" style={{ color: "var(--color-accent)" }}>
                  Hizmetlerimiz
                </a>
                <a href="#blog">Blog</a>
                <a href="#iletisim">İletişim</a>
                <button
                  className="btn btn-primary"
                  style={{ padding: "0.6rem 1.5rem", fontSize: "0.85rem" }}
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
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
                  top: "65px",
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
                          : item === "Hizmetlerimiz"
                          ? "#calisma-alanlarimiz"
                          : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
                      }
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        textDecoration: "none",
                        color: item === "Hizmetlerimiz" ? "var(--color-accent)" : "var(--color-primary)",
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

          <ServicesPage />

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
                © 2026 Karaca Hukuk & Danışmanlık | Tüm Hakları Saklıdır.
              </div>
            </div>
          </footer>

          <WhatsAppWidget />
        </div>
      </>
    );
  }

  if (currentHash === "#hakkimizda") {
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
                <a href="#hakkimizda" style={{ color: "var(--color-accent)" }}>
                  Hakkımızda
                </a>
                <a href="#calisma-alanlarimiz">Hizmetlerimiz</a>
                <a href="#blog">Blog</a>
                <a href="#iletisim">İletişim</a>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
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
                  top: "65px",
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
                          : item === "Hizmetlerimiz"
                          ? "#calisma-alanlarimiz"
                          : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
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

          <AboutPage />

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
                © 2026 Karaca Hukuk & Danışmanlık | Tüm Hakları Saklıdır.
              </div>
            </div>
          </footer>

          <WhatsAppWidget />
        </div>
      </>
    );
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
                <a href="#hakkimizda">Hakkımızda</a>
                <a href="#calisma-alanlarimiz">Hizmetlerimiz</a>
                <a href="#blog">Blog</a>
                <a href="#iletisim">İletişim</a>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
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

          {/* Mobile Menu Overlay for Blog */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  position: "fixed",
                  top: "65px",
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
                          : item === "Hizmetlerimiz"
                          ? "#calisma-alanlarimiz"
                          : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
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
                <a href="#hakkimizda">Hakkımızda</a>
                <a href="#calisma-alanlarimiz">Hizmetlerimiz</a>
                <a href="#blog" style={{ color: "var(--color-accent)" }}>
                  Blog
                </a>
                <a href="#iletisim">İletişim</a>
                <button
                  className="btn btn-primary"
                  onClick={() => (window.location.hash = "randevu")}
                >
                  Randevu Planla
                </button>
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

          {/* Mobile Menu Overlay for Blog Post */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  position: "fixed",
                  top: "65px",
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
                          : item === "Hizmetlerimiz"
                          ? "#calisma-alanlarimiz"
                          : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
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
                      : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
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
                        : `#${item.toLowerCase().replace(/ı/g, "i").replace(" ", "")}`
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
                  Karaca Hukuk & Danışmanlık olarak müvekkillerimize şeffaf
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
                {/* <motion.div
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
                </motion.div> */}
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
                  Avukat İsmail Karaca tarafından kurulan Karaca Hukuk &
                  Danışmanlık, hukukun çeşitli alanlarında profesyonel avukatlık
                  ve danışmanlık hizmeti sunmaktadır.
                </p>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
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
                    href="#calisma-alanlarimiz"
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

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "4rem",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => (window.location.hash = "calisma-alanlarimiz")}
                className="btn btn-primary"
                style={{
                  background: "linear-gradient(135deg, var(--color-primary) 0%, #173d73 100%)",
                  borderColor: "var(--color-accent)",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  color: "white",
                  padding: "1.1rem 3rem",
                  borderRadius: "30px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  boxShadow: "0 10px 25px rgba(10, 46, 92, 0.15)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  cursor: "pointer",
                }}
              >
                Tüm Çalışma Alanlarımız <ArrowUpRight size={18} style={{ color: "var(--color-accent)" }} />
              </motion.button>
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
            <a
              href="tel:+905337308053"
              className="btn"
              style={{
                background: "var(--color-primary)",
                color: "white",
                textDecoration: "none",
              }}
            >
              <Phone size={18} /> +90 (533) 730 80 53
            </a>
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
                  <div
                    style={{
                      display: "flex",
                      gap: "1.5rem",
                      alignItems: "flex-start",
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
                        flexShrink: 0,
                      }}
                    >
                      <MapPin size={20} />
                    </div>
                    <p
                      style={{
                        fontWeight: "700",
                        lineHeight: "1.6",
                        textAlign: "left",
                      }}
                    >
                      Çarşı Mah. Kazım Karabekir Cad.
                      <br />
                      Kuyumcular Sk. Kutlu Han Kat:3 No:407
                      <br />
                      Merkez/RİZE
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
                    const btn = e.target.querySelector("button");
                    const originalText = btn.innerText;
                    btn.innerText = "Gönderiliyor...";
                    btn.disabled = true;

                    const emailParams = {
                      from_name: formData.get("user_name"),
                      email: formData.get("user_email"),
                      message: formData.get("message"),
                      to_email: "avismailkaraca@gmail.com",
                    };

                    try {
                      await emailjs.send(
                        "service_dk86hrf",
                        "template_38c07ft",
                        emailParams,
                        "7er87R9bTKtUt82Sb",
                      );
                      alert(
                        "Mesajınız başarıyla iletildi. En kısa sürede dönüş yapılacaktır.",
                      );
                      e.target.reset();
                    } catch (err) {
                      alert("Bir hata oluştu: " + err.message);
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

          {/* Custom Interactive Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{
              width: "100%",
              height: "450px",
              marginTop: "5rem",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              border: "1px solid var(--color-border)",
              zIndex: 0,
              position: "relative",
            }}
          >
            <MapContainer
              center={[41.02445836843119, 40.518543870827614]}
              zoom={16}
              scrollWheelZoom={false}
              style={{ height: "100%", width: "100%", zIndex: 1 }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
              <Marker
                position={[41.02445836843119, 40.518543870827614]}
                icon={customIcon}
              >
                <Popup className="custom-popup">
                  <div style={{ textAlign: "center", padding: "0.5rem" }}>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        color: "var(--color-primary)",
                        margin: "0 0 0.5rem 0",
                        fontSize: "1.1rem",
                      }}
                    >
                      Karaca Hukuk{" "}
                      <span
                        style={{
                          fontFamily: "sans-serif",
                          color: "var(--color-accent)",
                        }}
                      >
                        &
                      </span>{" "}
                      Danışmanlık
                    </h3>
                    <p
                      style={{
                        margin: "0",
                        color: "var(--color-text-muted)",
                        fontSize: "0.85rem",
                        lineHeight: "1.4",
                      }}
                    >
                      Çarşı Mah. Kazım Karabekir Cad.
                      <br />
                      Kuyumcular Sk. Kutlu Han Kat:3 No:407
                      <br />
                      Merkez/RİZE
                    </p>
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=41.02445836843119,40.518543870827614"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-block",
                        background: "var(--color-accent)",
                        color: "white",
                        padding: "0.5rem 1rem",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                      }}
                    >
                      Yol Tarifi Al
                    </a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>
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
              © 2026 Karaca Hukuk & Danışmanlık | Tüm Hakları Saklıdır.
            </div>
          </div>
        </footer>

        <WhatsAppWidget />
      </div>
    </>
  );
};

export default App;
