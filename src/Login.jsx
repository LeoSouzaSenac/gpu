import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { api } from "./lib/api";

const theme = {
  ink: "#101826",
  blueprint: "#16233D",
  blueprintLine: "#2C3E63",
  paperCard: "#FFFFFF",
  amber: "#E4A433",
  teal: "#1C8C7C",
  red: "#C1432E",
  redBg: "#F7DAD6",
  textMuted: "#5B6472",
  textOnDark: "#C7D0E0",
};

const fontDisplay = "'Space Grotesk', sans-serif";
const fontBody = "'Literata', Georgia, serif";
const fontMono = "'JetBrains Mono', monospace";

function Fonts() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Literata:opsz,wght@6..72,400;6..72,500;6..72,600&family=JetBrains+Mono:wght@400;500;700&display=swap');
    `}</style>
  );
}

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontFamily: fontMono, fontSize: 12, color: theme.textOnDark, marginBottom: 6 }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%", boxSizing: "border-box", padding: "12px 14px", borderRadius: 8,
  border: `1px solid ${theme.blueprintLine}`, background: "#101E38", color: "#F4F1E8",
  fontFamily: fontBody, fontSize: 15, outline: "none",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await api.login({ email, password });
      api.setToken(token);
      window.location.hash = "#painel";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: theme.blueprint, minHeight: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <Fonts />
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, textAlign: "center" }}>
          UC1 · Técnico em IA
        </div>
        <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 26, color: "#F4F1E8", marginBottom: 24, textAlign: "center" }}>
          Entrar
        </h1>

        <form onSubmit={handleSubmit} style={{ background: theme.paperCard, borderRadius: 12, padding: 28 }}>
          <Field label="Email">
            <input type="email" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} required />
          </Field>
          <Field label="Senha">
            <input type="password" style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} required />
          </Field>

          {error && (
            <div style={{ display: "flex", gap: 8, background: theme.redBg, borderRadius: 8, padding: "10px 12px", marginBottom: 16 }}>
              <AlertCircle size={15} color={theme.red} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.red }}>{error}</span>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: "100%", fontFamily: fontDisplay, fontWeight: 600, fontSize: 15,
            background: loading ? "#ccc" : theme.amber, color: theme.ink, border: "none",
            borderRadius: 8, padding: "13px 0", cursor: loading ? "not-allowed" : "pointer"
          }}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div style={{ textAlign: "center", marginTop: 18 }}>
            <span style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.textMuted }}>Ainda não tem conta? </span>
            <a href="#cadastro" style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.teal }}>Criar conta</a>
          </div>
        </form>
      </div>
    </div>
  );
}
