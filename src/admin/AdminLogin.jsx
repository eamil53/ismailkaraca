import React, { useState } from "react";
import { motion } from "framer-motion";
import { Lock, User, ShieldCheck, ArrowRight } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "av.karaca" && password === "karaca123") {
      onLogin();
    } else {
      setError("Hatalı kullanıcı adı veya şifre.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "2rem",
        "--color-accent": "#b89146",
      }}
    >
      {/* Background Decor */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background: "var(--color-accent)",
          borderRadius: "50%",
          filter: "blur(150px)",
          opacity: 0.1,
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          bottom: "-10%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "#3b82f6",
          borderRadius: "50%",
          filter: "blur(200px)",
          opacity: 0.05,
        }}
      ></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "24px",
          padding: "3rem 2.5rem",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          zIndex: 1,
          position: "relative",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "rgba(184, 145, 70, 0.1)",
              border: "1px solid rgba(184, 145, 70, 0.2)",
              marginBottom: "1.5rem",
              color: "var(--color-accent)",
            }}
          >
            <ShieldCheck size={32} />
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.8rem",
              color: "white",
              margin: "0 0 0.5rem 0",
              letterSpacing: "1px",
            }}
          >
            KARACA HUKUK
          </h1>
          <p style={{ color: "#94a3b8", fontSize: "0.9rem", margin: 0 }}>
            Yönetim Paneli Girişi
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.2)",
                color: "#ef4444",
                padding: "0.8rem 1rem",
                borderRadius: "12px",
                fontSize: "0.85rem",
                textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "1rem",
                color: "#64748b",
              }}
            >
              <User size={20} />
            </div>
            <input
              type="text"
              placeholder="Kullanıcı Adı"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-accent)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")
              }
            />
          </div>

          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: "1rem",
                color: "#64748b",
              }}
            >
              <Lock size={20} />
            </div>
            <input
              type="password"
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "1rem 1rem 1rem 3rem",
                background: "rgba(15, 23, 42, 0.6)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                fontSize: "1rem",
                outline: "none",
                transition: "all 0.3s",
                fontFamily: "inherit",
              }}
              onFocus={(e) =>
                (e.target.style.borderColor = "var(--color-accent)")
              }
              onBlur={(e) =>
                (e.target.style.borderColor = "rgba(255, 255, 255, 0.1)")
              }
            />
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "1.2rem",
              background: "var(--color-accent)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
              transition: "all 0.3s",
              boxShadow: "0 4px 15px rgba(184, 145, 70, 0.3)",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#a37f3d";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "var(--color-accent)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            Sisteme Giriş Yap <ArrowRight size={20} />
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: "2.5rem",
            fontSize: "0.85rem",
            color: "#64748b",
            letterSpacing: "0.5px",
          }}
        >
          <a
            href="#home"
            style={{
              color: "#94a3b8",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseOver={(e) => (e.target.style.color = "white")}
            onMouseOut={(e) => (e.target.style.color = "#94a3b8")}
          >
            ← Siteye Geri Dön
          </a>
          <br />
          <br />
          &copy; {new Date().getFullYear()} Karaca Hukuk
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
