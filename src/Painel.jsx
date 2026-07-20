import React, { useEffect, useState } from "react";
import { Trophy, LogOut, CheckCircle2, Circle } from "lucide-react";
import { api } from "./lib/api";

const theme = {
  ink: "#101826",
  blueprint: "#16233D",
  blueprintLine: "#2C3E63",
  paper: "#F5F5F0",
  paperCard: "#FFFFFF",
  amber: "#E4A433",
  amberDark: "#8C5E12",
  amberBg: "#FBEDD3",
  teal: "#1C8C7C",
  tealBg: "#DCEFEC",
  copper: "#C1652E",
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

function TopNav() {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20, background: theme.ink,
      borderBottom: `0.5px solid ${theme.blueprintLine}`, padding: "0 24px",
      display: "flex", alignItems: "center", gap: 4
    }}>
      <a href="#" style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, textDecoration: "none", padding: "16px 18px", color: theme.textOnDark }}>Aula 1</a>
      <a href="#aula2" style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, textDecoration: "none", padding: "16px 18px", color: theme.textOnDark }}>Aula 2</a>
      <a href="#painel" style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, textDecoration: "none", padding: "16px 18px", color: theme.amber, borderBottom: `2px solid ${theme.amber}` }}>Minha pontuação</a>
    </div>
  );
}

const GAME_CATALOG = [
  { subject: "aula1", subjectLabel: "Aula 1", slug: "barramento", title: "Barramento Rush" },
  { subject: "aula1", subjectLabel: "Aula 1", slug: "montacpu", title: "Monta sua CPU" },
  { subject: "aula1", subjectLabel: "Aula 1", slug: "cpuougpu", title: "CPU ou GPU?" },
  { subject: "aula1", subjectLabel: "Aula 1", slug: "detetive", title: "Detetive do nvidia-smi" },
  { subject: "aula1", subjectLabel: "Aula 1", slug: "glossario", title: "Glossário Blitz" },
  { subject: "aula2", subjectLabel: "Aula 2", slug: "simdmimd", title: "SIMD ou MIMD?" },
  { subject: "aula2", subjectLabel: "Aula 2", slug: "risccisc", title: "RISC ou CISC?" },
  { subject: "aula2", subjectLabel: "Aula 2", slug: "pipeline", title: "Pipeline Rush" },
  { subject: "aula2", subjectLabel: "Aula 2", slug: "detetiveproc", title: "Detetive de Processos" },
  { subject: "aula2", subjectLabel: "Aula 2", slug: "glossario2", title: "Glossário Blitz — Aula 2" },
];

export default function Painel() {
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [user, setUser] = useState(null);
  const [scoresBySlug, setScoresBySlug] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (!api.isLoggedIn()) {
      window.location.hash = "#login";
      return;
    }
    (async () => {
      try {
        const [me, scoreData] = await Promise.all([api.me(), api.myScores()]);
        setUser(me);
        const map = {};
        scoreData.scores.forEach((s) => { map[s.gameSlug] = s.xp; });
        setScoresBySlug(map);
        setStatus("ready");
      } catch (err) {
        setErrorMsg(err.message);
        setStatus("error");
      }
    })();
  }, []);

  function handleLogout() {
    api.clearToken();
    window.location.hash = "#";
  }

  if (status === "loading") {
    return (
      <div style={{ background: theme.paper, minHeight: "100%" }}>
        <Fonts /><TopNav />
        <div style={{ padding: 60, textAlign: "center", fontFamily: fontBody, color: theme.textMuted }}>Carregando sua pontuação...</div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ background: theme.paper, minHeight: "100%" }}>
        <Fonts /><TopNav />
        <div style={{ padding: 60, textAlign: "center", fontFamily: fontBody, color: theme.textMuted }}>
          Não deu pra carregar sua pontuação: {errorMsg}
          <div style={{ marginTop: 12 }}><a href="#login" style={{ color: theme.teal }}>Fazer login de novo</a></div>
        </div>
      </div>
    );
  }

  const totalXp = Object.values(scoresBySlug).reduce((a, b) => a + b, 0);
  const subjects = ["aula1", "aula2"];

  return (
    <div style={{ background: theme.paper, minHeight: "100%" }}>
      <Fonts /><TopNav />

      <div style={{ background: theme.blueprint, padding: "36px 24px 28px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
            UC1 · Técnico em IA
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 28, color: "#F4F1E8", marginBottom: 4 }}>
            {user.name}
          </h1>
          <div style={{ fontFamily: fontBody, fontSize: 14, color: theme.textOnDark, marginBottom: 18 }}>{user.turma} · {user.email}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#101E38", padding: "10px 18px", borderRadius: 8 }}>
              <Trophy size={16} color={theme.amber} />
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, color: theme.amber }}>{totalXp} XP totais</span>
            </div>
            <button onClick={handleLogout} style={{
              display: "inline-flex", alignItems: "center", gap: 6, background: "transparent",
              border: `1px solid ${theme.blueprintLine}`, borderRadius: 8, padding: "10px 16px",
              color: theme.textOnDark, fontFamily: fontMono, fontSize: 12.5, cursor: "pointer"
            }}><LogOut size={13} /> Sair</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "32px 24px 60px" }}>
        {subjects.map((subj) => {
          const games = GAME_CATALOG.filter((g) => g.subject === subj);
          const subjectXp = games.reduce((sum, g) => sum + (scoresBySlug[g.slug] || 0), 0);
          return (
            <div key={subj} style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 18, color: theme.ink }}>{games[0].subjectLabel}</div>
                <div style={{ fontFamily: fontMono, fontSize: 13, color: theme.amberDark }}>{subjectXp} XP</div>
              </div>
              <div style={{ display: "grid", gap: 8 }}>
                {games.map((g) => {
                  const xp = scoresBySlug[g.slug];
                  const done = xp !== undefined;
                  return (
                    <div key={g.slug} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: theme.paperCard, borderRadius: 8, padding: "12px 16px",
                      border: `1px solid ${done ? theme.tealBg : "#0000000f"}`,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        {done ? <CheckCircle2 size={16} color={theme.teal} /> : <Circle size={16} color={theme.textMuted} />}
                        <span style={{ fontFamily: fontBody, fontSize: 14.5, color: done ? theme.ink : theme.textMuted }}>{g.title}</span>
                      </div>
                      <span style={{ fontFamily: fontMono, fontSize: 13, color: done ? theme.teal : theme.textMuted }}>
                        {done ? `${xp} XP` : "ainda não jogou"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
