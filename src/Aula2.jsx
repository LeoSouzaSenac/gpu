import React, { useState } from "react";
import { ChevronDown, Check, Info, ArrowRight } from "lucide-react";

const theme = {
  ink: "#101826",
  blueprint: "#16233D",
  blueprintLine: "#2C3E63",
  blueprintLine2: "#243356",
  paper: "#F5F5F0",
  paperCard: "#FFFFFF",
  copper: "#C1652E",
  copperDark: "#8C441C",
  copperBg: "#F7E6DA",
  teal: "#1C8C7C",
  tealDark: "#0F5A4E",
  tealBg: "#DCEFEC",
  amber: "#E4A433",
  amberDark: "#8C5E12",
  amberBg: "#FBEDD3",
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
      :root { scroll-behavior: smooth; }
    `}</style>
  );
}

function Eyebrow({ children, color }) {
  return (
    <div style={{
      fontFamily: fontMono, fontSize: 12, letterSpacing: "0.08em",
      color: color || theme.amber, textTransform: "uppercase", marginBottom: 10,
      display: "flex", alignItems: "center", gap: 8
    }}>
      <span style={{ width: 20, height: 1, background: color || theme.amber, display: "inline-block" }} />
      {children}
    </div>
  );
}

function CodeBlock({ code, dim }) {
  return (
    <pre style={{
      fontFamily: fontMono, fontSize: 12.5, lineHeight: 1.7,
      background: theme.ink, color: dim ? "#8892A6" : "#E4E8F1",
      padding: "18px 20px", borderRadius: 6, overflowX: "auto",
      border: `0.5px solid ${theme.blueprintLine}`, margin: 0
    }}>
      <code>{code}</code>
    </pre>
  );
}

function Section({ id, dark, children, style }) {
  return (
    <section id={id} style={{
      background: dark ? theme.blueprint : theme.paper,
      color: dark ? theme.textOnDark : theme.ink,
      padding: "72px 24px",
      position: "relative",
      ...style
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function H2({ children, dark }) {
  return (
    <h2 style={{
      fontFamily: fontDisplay, fontWeight: 600, fontSize: 32,
      color: dark ? "#F4F1E8" : theme.ink, marginBottom: 20, lineHeight: 1.2
    }}>{children}</h2>
  );
}

function P({ children, dark, style }) {
  return (
    <p style={{
      fontFamily: fontBody, fontSize: 17, lineHeight: 1.75,
      color: dark ? theme.textOnDark : "#333229", marginBottom: 18, ...style
    }}>{children}</p>
  );
}

function Term({ children }) {
  return <span style={{ fontFamily: fontMono, fontSize: "0.9em", background: theme.amberBg, color: theme.amberDark, padding: "1px 6px", borderRadius: 4 }}>{children}</span>;
}

function PhotoCard({ src, alt, caption, credit }) {
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", filter: "grayscale(1)", border: `0.5px solid ${theme.blueprintLine}` }}>
      <img src={src} alt={alt} style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} />
      <div style={{ background: theme.ink, padding: "8px 10px" }}>
        <div style={{ fontFamily: fontMono, fontSize: 10.5, color: theme.textOnDark }}>{caption}</div>
        {credit && <div style={{ fontFamily: fontMono, fontSize: 9, color: "#5B6472", marginTop: 2 }}>{credit}</div>}
      </div>
    </div>
  );
}

function DiagramLegend({ items, color, bg, text }) {
  return (
    <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
      {items.map((item) => (
        <div key={item.term} style={{ display: "flex", gap: 12, background: bg, borderRadius: 8, padding: "12px 14px" }}>
          <span style={{ fontFamily: fontMono, fontSize: 12.5, fontWeight: 500, color: color, flexShrink: 0, minWidth: 130 }}>{item.term}</span>
          <span style={{ fontFamily: fontBody, fontSize: 14, color: text, lineHeight: 1.6 }}>{item.desc}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------- Diagrams ---------- */

function SimdDiagram() {
  return (
    <svg viewBox="0 0 560 220" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagrama SIMD: uma instrução, vários dados processados ao mesmo tempo">
      <rect x="210" y="15" width="140" height="40" rx="6" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="280" y="40" textAnchor="middle" fontFamily={fontMono} fontSize="11" fill={theme.teal}>1 instrução: SOMAR</text>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <line x1="280" y1="55" x2={80 + i * 135} y2="100" stroke={theme.teal} strokeWidth="1.5" />
          <rect x={80 + i * 135 - 55} y="100" width="110" height="40" rx="6" fill="none" stroke={theme.teal} strokeWidth="1.5" />
          <text x={80 + i * 135} y="124" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.teal}>ALU {i + 1}</text>
          <rect x={80 + i * 135 - 55} y="155" width="110" height="34" rx="6" fill={theme.tealBg} stroke={theme.teal} strokeWidth="1" />
          <text x={80 + i * 135} y="177" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.tealDark}>dado {i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

function MimdDiagram() {
  return (
    <svg viewBox="0 0 560 220" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagrama MIMD: vários núcleos, cada um com sua própria instrução e dado">
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={80 + i * 135 - 55} y="30" width="110" height="40" rx="6" fill="none" stroke={theme.copper} strokeWidth="1.5" />
          <text x={80 + i * 135} y="54" textAnchor="middle" fontFamily={fontMono} fontSize="9.5" fill={theme.copper}>instrução {i + 1}</text>
          <line x1={80 + i * 135} y1="70" x2={80 + i * 135} y2="100" stroke={theme.copper} strokeWidth="1.5" />
          <rect x={80 + i * 135 - 55} y="100" width="110" height="40" rx="6" fill="none" stroke={theme.copper} strokeWidth="1.5" />
          <text x={80 + i * 135} y="124" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.copper}>Núcleo {i + 1}</text>
          <rect x={80 + i * 135 - 55} y="155" width="110" height="34" rx="6" fill={theme.copperBg} stroke={theme.copper} strokeWidth="1" />
          <text x={80 + i * 135} y="177" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.copperDark}>dado {i + 1}</text>
        </g>
      ))}
    </svg>
  );
}

function PipelineGrid() {
  const stages = ["F", "D", "E", "M", "W"];
  const stageNames = { F: "Busca", D: "Decodifica", E: "Executa", M: "Memória", W: "Escreve" };
  const instructions = [0, 1, 2, 3];
  const cycles = 8;
  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: `70px repeat(${cycles}, 42px)`, gap: 3, minWidth: 450 }}>
          <div />
          {Array.from({ length: cycles }).map((_, c) => (
            <div key={c} style={{ fontFamily: fontMono, fontSize: 10, color: theme.textMuted, textAlign: "center" }}>{c + 1}</div>
          ))}
          {instructions.map((instr) => (
            <React.Fragment key={instr}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: theme.textOnDark, display: "flex", alignItems: "center" }}>I{instr + 1}</div>
              {Array.from({ length: cycles }).map((_, c) => {
                const stageIdx = c - instr;
                const stage = stageIdx >= 0 && stageIdx < stages.length ? stages[stageIdx] : null;
                return (
                  <div key={c} style={{
                    height: 30, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center",
                    background: stage ? theme.amberBg : "transparent", border: stage ? `1px solid ${theme.amber}` : "1px solid transparent",
                    fontFamily: fontMono, fontSize: 11, fontWeight: 700, color: theme.amberDark
                  }}>{stage}</div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 14, fontFamily: fontMono, fontSize: 10.5, color: theme.textOnDark }}>
        {stages.map((s) => (
          <span key={s}><strong style={{ color: theme.amber }}>{s}</strong> = {stageNames[s]}</span>
        ))}
      </div>
    </div>
  );
}

function ProcessStateDiagram() {
  return (
    <svg viewBox="0 0 560 260" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagrama de estados de um processo: Novo, Pronto, Executando, Bloqueado, Terminado">
      <rect x="20" y="110" width="100" height="40" rx="20" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="70" y="134" textAnchor="middle" fontFamily={fontMono} fontSize="11" fill={theme.teal}>Novo</text>

      <rect x="170" y="110" width="100" height="40" rx="20" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="220" y="134" textAnchor="middle" fontFamily={fontMono} fontSize="11" fill={theme.teal}>Pronto</text>

      <rect x="320" y="110" width="120" height="40" rx="20" fill={theme.tealBg} stroke={theme.teal} strokeWidth="1.5" />
      <text x="380" y="134" textAnchor="middle" fontFamily={fontMono} fontSize="11" fill={theme.tealDark}>Executando</text>

      <rect x="320" y="20" width="120" height="40" rx="20" fill="none" stroke={theme.copper} strokeWidth="1.5" />
      <text x="380" y="44" textAnchor="middle" fontFamily={fontMono} fontSize="11" fill={theme.copper}>Bloqueado</text>

      <rect x="480" y="110" width="70" height="40" rx="20" fill="none" stroke={theme.textMuted} strokeWidth="1.5" />
      <text x="515" y="134" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.textMuted}>Fim</text>

      <line x1="120" y1="130" x2="170" y2="130" stroke={theme.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="270" y1="130" x2="320" y2="130" stroke={theme.teal} strokeWidth="1.5" markerEnd="url(#arrow)" />
      <line x1="440" y1="130" x2="480" y2="130" stroke={theme.textMuted} strokeWidth="1.5" markerEnd="url(#arrow)" />

      <path d="M 380 110 Q 320 80 320 55" fill="none" stroke={theme.copper} strokeWidth="1.5" markerEnd="url(#arrowc)" />
      <path d="M 380 60 Q 300 90 270 118" fill="none" stroke={theme.copper} strokeWidth="1.5" markerEnd="url(#arrowc)" />
      <text x="330" y="88" fontFamily={fontMono} fontSize="8.5" fill={theme.copper}>espera E/S</text>

      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={theme.teal} />
        </marker>
        <marker id="arrowc" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill={theme.copper} />
        </marker>
      </defs>
    </svg>
  );
}

/* ---------- Code walkthrough / expected output (mesmo padrão da Aula 1) ---------- */

function CodeWalkthrough({ items }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
        O que cada parte faz
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 12, background: theme.amberBg, borderRadius: 8, padding: "10px 12px" }}>
            <code style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.amberDark, flexShrink: 0, whiteSpace: "nowrap", alignSelf: "flex-start", paddingTop: 1 }}>{item.line}</code>
            <span style={{ fontFamily: fontBody, fontSize: 14, color: "#4A3B1E", lineHeight: 1.6 }}>{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpectedOutput({ output, notes }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>
        Saída esperada
      </div>
      <CodeBlock code={output} dim />
      {notes && (
        <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
          {notes.map((n, i) => (
            <div key={i} style={{ display: "flex", gap: 12, background: theme.tealBg, borderRadius: 8, padding: "10px 12px" }}>
              <code style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.tealDark, flexShrink: 0, whiteSpace: "nowrap", alignSelf: "flex-start", paddingTop: 1 }}>{n.term}</code>
              <span style={{ fontFamily: fontBody, fontSize: 14, color: "#1B4640", lineHeight: 1.6 }}>{n.desc}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Exercise({ n, title, intro, code, questions, tip, defaultOpen, walkthrough, notCode, expectedOutput, expectedOutputNotes }) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ background: theme.paperCard, borderRadius: 12, border: `0.5px solid ${theme.blueprintLine2}22`, marginBottom: 16, overflow: "hidden" }}>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "18px 22px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: theme.amberBg, color: theme.amberDark,
            display: "flex", alignItems: "center", justifyContent: "center", fontFamily: fontDisplay, fontWeight: 600, fontSize: 14, flexShrink: 0
          }}>{n}</div>
          <span style={{ fontFamily: fontDisplay, fontWeight: 500, fontSize: 16.5, color: theme.ink }}>{title}</span>
        </div>
        <ChevronDown size={18} color={theme.textMuted} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.15s", flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ padding: "0 22px 24px", marginLeft: 46 }}>
          {intro && <P style={{ fontSize: 15.5, marginBottom: 14 }}>{intro}</P>}
          {notCode && (
            <div style={{ display: "flex", gap: 10, background: "#EEE", borderRadius: 8, padding: "10px 14px", marginBottom: 14 }}>
              <Info size={15} color={theme.textMuted} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.textMuted, lineHeight: 1.6 }}>{notCode}</span>
            </div>
          )}
          {code && <div style={{ marginBottom: 14 }}><CodeBlock code={code} /></div>}
          {walkthrough && <CodeWalkthrough items={walkthrough} />}
          {expectedOutput && <ExpectedOutput output={expectedOutput} notes={expectedOutputNotes} />}
          {tip && (
            <div style={{ display: "flex", gap: 10, background: theme.tealBg, borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
              <Info size={16} color={theme.tealDark} style={{ flexShrink: 0, marginTop: 2 }} />
              <span style={{ fontFamily: fontBody, fontSize: 14.5, color: theme.tealDark, lineHeight: 1.6 }}>{tip}</span>
            </div>
          )}
          {questions && (
            <div>
              <div style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Pra responder / entregar</div>
              <ol style={{ paddingLeft: 20, margin: 0 }}>
                {questions.map((q, i) => (
                  <li key={i} style={{ fontFamily: fontBody, fontSize: 15, color: "#333229", marginBottom: 6, lineHeight: 1.6 }}>{q}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Nav ---------- */

function TopNav({ active }) {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 20, background: theme.ink,
      borderBottom: `0.5px solid ${theme.blueprintLine}`, padding: "0 24px",
      display: "flex", alignItems: "center", gap: 4
    }}>
      <a href="#" style={{
        fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, textDecoration: "none",
        padding: "16px 18px", color: active === "aula1" ? theme.amber : theme.textOnDark,
        borderBottom: active === "aula1" ? `2px solid ${theme.amber}` : "2px solid transparent"
      }}>Aula 1</a>
      <a href="#aula2" style={{
        fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, textDecoration: "none",
        padding: "16px 18px", color: active === "aula2" ? theme.amber : theme.textOnDark,
        borderBottom: active === "aula2" ? `2px solid ${theme.amber}` : "2px solid transparent"
      }}>Aula 2</a>
    </div>
  );
}

/* ---------- Main ---------- */

export default function Aula2() {
  return (
    <div style={{ background: theme.paper, minHeight: "100%" }}>
      <Fonts />
      <TopNav active="aula2" />

      {/* HERO */}
      <Section dark id="hook" style={{ paddingTop: 88, paddingBottom: 88 }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none",
          backgroundImage: `linear-gradient(${theme.blueprintLine}55 1px, transparent 1px), linear-gradient(90deg, ${theme.blueprintLine}55 1px, transparent 1px)`,
          backgroundSize: "36px 36px"
        }} />
        <div style={{ position: "relative" }}>
          <Eyebrow>Técnico em inteligência artificial · Senac RS</Eyebrow>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 40, lineHeight: 1.15, color: "#F4F1E8", marginBottom: 24, maxWidth: 620 }}>
            Por que a GPU foi desenhada assim <span style={{ color: theme.amber }}>(a resposta tem nome técnico)</span>
          </h1>
          <P dark style={{ fontSize: 18.5, maxWidth: 600 }}>
            Na Aula 1, vimos que a GPU tem milhares de núcleos simples, e a CPU tem poucos núcleos poderosos. Isso não é acidente — existe uma classificação formal, criada nos anos 1960, que descreve exatamente essa diferença.
          </P>
          <div style={{ borderLeft: `3px solid ${theme.amber}`, paddingLeft: 20, margin: "28px 0" }}>
            <p style={{ fontFamily: fontBody, fontStyle: "italic", fontSize: 22, lineHeight: 1.5, color: "#F4F1E8" }}>
              Hoje: SIMD, MIMD, RISC, CISC, Pipeline — e como um computador gerencia dezenas de programas "ao mesmo tempo" sem ter dezenas de processadores.
            </p>
          </div>
        </div>
      </Section>

      {/* PARALELISMO */}
      <Section>
        <Eyebrow color={theme.copper}>O conceito por trás de tudo hoje</Eyebrow>
        <H2>O que é, de fato, paralelismo?</H2>
        <P>
          Antes de entrar nos nomes técnicos, vale fixar uma ideia simples: <strong>paralelismo é fazer mais de uma coisa ao mesmo tempo, de verdade</strong> — não uma coisa rapidinho depois da outra (o que dá a ilusão de simultaneidade), mas duas ou mais coisas acontecendo no mesmo instante exato.
        </P>
        <P>
          Pensa em duas pessoas lavando louça: se só existe 1 pia, cada uma lava um prato por vez, alternando — isso não é paralelismo, é só revezamento rápido. Agora, se existem 2 pias, cada pessoa numa, lavando ao mesmo tempo — isso sim é paralelismo: duas coisas acontecendo simultaneamente, de verdade, porque existe hardware duplicado (2 pias) pra sustentar isso.
        </P>
        <P>
          Hoje vamos ver paralelismo aparecendo em 4 lugares completamente diferentes dentro de um computador — desde o circuito mais interno da GPU até o sistema operacional gerenciando dezenas de programas. Cada seção de hoje é, no fundo, uma resposta diferente pra mesma pergunta: <em>"como fazer mais de uma coisa ao mesmo tempo, com hardware limitado?"</em>
        </P>
      </Section>

      {/* TAXONOMIA DE FLYNN */}
      <Section>
        <Eyebrow color={theme.copper}>Ponto de partida</Eyebrow>
        <H2>A Taxonomia de Flynn</H2>
        <P>
          Em 1966, o pesquisador Michael Flynn propôs uma forma simples de classificar qualquer processador: perguntar duas coisas. Quantas <strong>instruções</strong> ele processa por vez, e quantos <strong>dados</strong> ele processa por vez.
        </P>
        <P>
          Cruzando essas duas perguntas (uma ou várias instruções, um ou vários dados), surgem 4 categorias. As duas que interessam pro nosso curso — porque são exatamente CPU e GPU — são <Term>SIMD</Term> e <Term>MIMD</Term>.
        </P>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: theme.blueprintLine2 + "33", borderRadius: 10, overflow: "hidden" }}>
          {[
            { name: "SISD", desc: "1 instrução, 1 dado por vez", note: "um processador simples e antigo, sem paralelismo nenhum" },
            { name: "SIMD", desc: "1 instrução, vários dados ao mesmo tempo", note: "a lógica por trás da GPU" },
            { name: "MISD", desc: "várias instruções, 1 dado só", note: "raríssimo — usado em sistemas de altíssima tolerância a falha (ex: controle de voo de aeronaves)" },
            { name: "MIMD", desc: "várias instruções, vários dados, cada núcleo independente", note: "a lógica por trás da CPU multi-núcleo" },
          ].map((c) => (
            <div key={c.name} style={{ background: theme.paperCard, padding: 18 }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, color: theme.ink, marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontFamily: fontMono, fontSize: 12, color: theme.copperDark, marginBottom: 8 }}>{c.desc}</div>
              <div style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.textMuted, lineHeight: 1.5 }}>{c.note}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* SIMD */}
      <Section dark id="simd">
        <Eyebrow>SIMD — a lógica da GPU</Eyebrow>
        <H2 dark>Single Instruction, Multiple Data</H2>
        <P dark>
          <Term>SIMD</Term> (Single Instruction, Multiple Data — Instrução Única, Múltiplos Dados) significa: a mesma instrução é aplicada, no mesmo instante, sobre vários pedaços de dado diferentes.
        </P>
        <P dark>
          Lembra da prova das 5.000 continhas da Aula 1? A instrução é sempre a mesma ("some esses dois números"), mas cada núcleo da GPU aplica ela sobre um par de números diferente, todos ao mesmo tempo. É exatamente isso que SIMD descreve, formalmente.
        </P>
        <div style={{ background: "#101E38", borderRadius: 12, padding: 24, marginBottom: 8 }}>
          <SimdDiagram />
        </div>
        <DiagramLegend
          color={theme.teal}
          bg="#101E38"
          text={theme.textOnDark}
          items={[
            { term: "1 instrução", desc: "um único comando (ex: 'somar') é decodificado uma vez só, e distribuído pra todos os núcleos." },
            { term: "Vários ALUs", desc: "cada núcleo recebe a mesma instrução, mas aplica ela sobre um dado diferente do seu vizinho." },
            { term: "Dados diferentes", desc: "é aqui que está o paralelismo: 4 (ou 5.000) contas idênticas, rodando ao mesmo tempo, sobre números diferentes." },
          ]}
        />
        <P dark style={{ marginTop: 20 }}>
          Isso não é exclusivo de GPU, aliás — CPUs modernas também têm um "SIMD de bolso": instruções especiais (como as famílias <Term>SSE</Term> e <Term>AVX</Term> da Intel/AMD) que permitem a própria CPU aplicar uma operação sobre vários números de uma vez, dentro de um único núcleo. É um SIMD em escala pequena — e é exatamente isso que bibliotecas como o NumPy exploram por baixo dos panos (o Exercício 1 de hoje prova isso na prática).
        </P>
      </Section>

      {/* MIMD */}
      <Section id="mimd">
        <Eyebrow color={theme.copper}>MIMD — a lógica da CPU</Eyebrow>
        <H2>Multiple Instruction, Multiple Data</H2>
        <P>
          <Term>MIMD</Term> (Multiple Instruction, Multiple Data — Múltiplas Instruções, Múltiplos Dados) significa: cada núcleo é totalmente independente, com sua própria instrução e seu próprio dado, sem precisar fazer a mesma coisa que o núcleo vizinho.
        </P>
        <P>
          É exatamente o modelo de uma CPU multi-núcleo moderna: um núcleo pode estar compilando um programa, outro pode estar tocando música, outro pode estar rodando o navegador — cada um seguindo seu próprio caminho, de forma independente.
        </P>
        <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 24, marginBottom: 8 }}>
          <MimdDiagram />
        </div>
        <DiagramLegend
          color={theme.copperDark}
          bg={theme.copperBg}
          text="#4A2E14"
          items={[
            { term: "Instruções diferentes", desc: "cada núcleo decodifica e executa seu próprio programa — não precisam estar sincronizados." },
            { term: "Núcleos independentes", desc: "cada um tem sua própria Unidade de Controle e ALU, completos, como vimos no diagrama de Von Neumann." },
            { term: "Dados diferentes", desc: "cada núcleo trabalha sobre seu próprio conjunto de dados, sem relação com o que os outros estão processando." },
          ]}
        />
        <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: theme.blueprintLine2 + "33", borderRadius: 10, overflow: "hidden" }}>
          {[
            { label: "Categoria", cpu: "MIMD", gpu: "SIMD" },
            { label: "Ideal pra", cpu: "tarefas diferentes, ao mesmo tempo", gpu: "a MESMA tarefa, repetida em massa" },
            { label: "Flexibilidade", cpu: "alta — cada núcleo faz o que quiser", gpu: "baixa — todos os núcleos seguem a mesma instrução" },
            { label: "Exemplo do curso", cpu: "rodar o notebook Colab inteiro", gpu: "multiplicar a matriz de pesos da rede neural" },
          ].map((row) => (
            <React.Fragment key={row.label}>
              <div style={{ background: theme.paperCard, padding: 14, gridColumn: "1 / -1", borderTop: row.label !== "Categoria" ? `1px solid ${theme.blueprintLine2}22` : "none" }}>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, color: theme.textMuted, marginBottom: 6 }}>{row.label}</div>
                <div style={{ display: "flex", gap: 20 }}>
                  <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.copperDark, flex: 1 }}><strong>CPU:</strong> {row.cpu}</span>
                  <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.tealDark, flex: 1 }}><strong>GPU:</strong> {row.gpu}</span>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </Section>

      {/* RISC x CISC */}
      <Section dark id="risc-cisc">
        <Eyebrow>Duas filosofias de design</Eyebrow>
        <H2 dark>RISC x CISC</H2>
        <P dark>
          Além de "quantas instruções processa por vez" (SIMD/MIMD), existe outra pergunta importante: "as instruções em si são simples ou complexas?" Essa pergunta separa os processadores em duas filosofias de projeto.
        </P>
        <P dark>
          <Term>CISC</Term> (Complex Instruction Set Computer — Computador com Conjunto Complexo de Instruções): poucas instruções, mas cada uma faz bastante coisa de uma vez só. <Term>RISC</Term> (Reduced Instruction Set Computer — Computador com Conjunto Reduzido de Instruções): instruções simples e curtas, cada uma faz uma coisa só — e você combina várias pra fazer algo complexo.
        </P>

        <P dark style={{ fontSize: 15, color: theme.textOnDark }}>Exemplo concreto — somar dois números que estão guardados na memória e guardar o resultado:</P>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 14 }}>
          <div style={{ background: "#101E38", borderRadius: 10, padding: 18 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: theme.copper, marginBottom: 10 }}>CISC — 1 instrução complexa</div>
            <CodeBlock code={`ADD [C], [A], [B]`} />
          </div>
          <div style={{ background: "#101E38", borderRadius: 10, padding: 18 }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: theme.teal, marginBottom: 10 }}>RISC — 4 instruções simples</div>
            <CodeBlock code={`LOAD R1, [A]\nLOAD R2, [B]\nADD  R3, R1, R2\nSTORE [C], R3`} />
          </div>
        </div>

        <div style={{ background: theme.amberBg, borderRadius: 10, padding: "16px 18px", marginBottom: 24 }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13.5, color: theme.amberDark, marginBottom: 10 }}>
            Peraí — que "linguagem" é essa no código acima?
          </div>
          <P style={{ fontSize: 14.5, color: "#4A3B1E", marginBottom: 10 }}>
            Não é nenhuma linguagem de programação de verdade (não é Python) — é uma representação simplificada de <strong>Assembly</strong>, a linguagem mais "crua" possível, bem perto do que o processador realmente entende. Cada palavra tem um significado específico:
          </P>
          <div style={{ display: "grid", gap: 8 }}>
            {[
              { term: "[A], [B], [C]", desc: "os colchetes significam 'o valor guardado no endereço de memória A' (não o endereço em si, mas o número que está guardado lá dentro)." },
              { term: "R1, R2, R3", desc: "são registradores — lembra deles? São os 'bolsos rápidos' dentro da CPU que vimos na Aula 1, usados pra guardar um número por um instante, sem precisar ir até a memória de novo." },
              { term: "LOAD", desc: "'carregar': pega um valor que está na memória e traz pra dentro de um registrador." },
              { term: "STORE", desc: "'guardar': faz o caminho inverso — pega o valor que está num registrador e escreve ele de volta na memória." },
              { term: "ADD", desc: "soma dois valores. No exemplo CISC, ela soma os valores de A e B e já guarda direto em C, tudo numa instrução só. No exemplo RISC, ela só soma o que já está nos registradores R1 e R2, guardando em R3 — quem busca e quem guarda são instruções separadas (LOAD e STORE)." },
            ].map((t) => (
              <div key={t.term} style={{ display: "flex", gap: 12, background: "#FBEDD3", borderRadius: 8, padding: "8px 10px" }}>
                <code style={{ fontFamily: fontMono, fontSize: 12, color: theme.amberDark, flexShrink: 0, minWidth: 90 }}>{t.term}</code>
                <span style={{ fontFamily: fontBody, fontSize: 13.5, color: "#4A3B1E", lineHeight: 1.6 }}>{t.desc}</span>
              </div>
            ))}
          </div>
          <P style={{ fontSize: 14.5, color: "#4A3B1E", marginTop: 10, marginBottom: 0 }}>
            Repare a diferença estrutural: a versão CISC faz "busca A, busca B, soma, guarda em C" tudo dentro de uma única instrução (o processador esconde essa complexidade internamente). A versão RISC obriga você a escrever cada um desses passos separadamente — mais linhas de código, só que cada linha é simples e previsível.
          </P>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {[
            {
              label: "Tamanho das instruções",
              cisc: "variável (algumas curtas, outras longas)",
              risc: "fixo — todas do mesmo tamanho",
              why: "Numa CPU RISC, toda instrução ocupa, por exemplo, sempre 32 bits — nem mais, nem menos. Isso pode parecer um detalhe pequeno, mas faz uma diferença enorme: como o processador já sabe de antemão exatamente onde cada instrução termina e a próxima começa, ele consegue ir buscando e preparando várias instruções seguidas, em fila, sem precisar 'ler primeiro pra saber o tamanho'. Numa CISC, como cada instrução pode ter um tamanho diferente, o processador precisa primeiro examinar uma instrução pra descobrir onde ela termina, antes de saber onde a próxima começa — um trabalho extra, repetido a cada instrução."
            },
            {
              label: "Instruções por tarefa",
              cisc: "poucas, mas complexas de decodificar",
              risc: "mais instruções, mas cada uma é rápida",
              why: "É o trade-off que o próprio exemplo acima mostra: 1 instrução CISC versus 4 instruções RISC pra fazer a mesma soma. A CISC 'economiza linhas', mas essa 1 instrução é mais complicada de interpretar (decodificar) internamente. A RISC precisa de mais linhas, mas cada uma é tão simples que decodificar ela quase não toma tempo nenhum — no fim, a soma total pode ser tão rápida quanto (ou mais rápida que) a versão CISC."
            },
            {
              label: "Facilidade de pipeline",
              cisc: "difícil (instruções irregulares atrapalham)",
              risc: "fácil",
              why: "Vamos ver isso em detalhe na próxima seção, mas o resumo é: pipeline funciona bem quando toda instrução gasta um tempo previsível em cada etapa. Como as instruções RISC são uniformes (mesmo tamanho, complexidade parecida), é fácil garantir esse ritmo constante. Já numa CISC, uma instrução complexa pode 'travar' uma etapa do pipeline por mais tempo que as outras, quebrando o ritmo e obrigando a arquitetura a usar truques bem mais elaborados pra não perder desempenho."
            },
            {
              label: "Exemplos reais",
              cisc: "x86 / x86-64 (Intel, AMD)",
              risc: "ARM (celulares, Apple M1/M2/M3), RISC-V",
              why: "Se o processador do seu notebook é Intel ou AMD, ele é CISC (por fora, pelo menos — veja o Exercício 2, que mostra uma reviravolta interessante nisso). Se é um celular, um Raspberry Pi, ou um Mac recente (a partir de 2020), ele é RISC."
            },
          ].map((row) => (
            <div key={row.label} style={{ background: "#101E38", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{ fontFamily: fontMono, fontSize: 11, color: theme.textOnDark, opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 8 }}>{row.label}</div>
              <div style={{ display: "flex", gap: 16, marginBottom: 10, flexWrap: "wrap" }}>
                <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.copper, flex: "1 1 200px" }}><strong>CISC:</strong> {row.cisc}</span>
                <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.teal, flex: "1 1 200px" }}><strong>RISC:</strong> {row.risc}</span>
              </div>
              <P dark style={{ fontSize: 13.5, color: theme.textOnDark, marginBottom: 0 }}>{row.why}</P>
            </div>
          ))}
        </div>

        <P dark style={{ marginTop: 24 }}>
          E a GPU, nessa história? Os núcleos CUDA de uma GPU seguem uma filosofia bem próxima do RISC: instruções pequenas, simples, previsíveis — exatamente o tipo de instrução que dá pra replicar aos milhares dentro do mesmo chip sem gastar espaço demais com a complexidade de decodificação.
        </P>
      </Section>

      {/* PIPELINE */}
      <Section id="pipeline">
        <Eyebrow color={theme.copper}>Uma técnica que RISC facilita</Eyebrow>
        <H2>Pipeline: a linha de produção da CPU</H2>
        <P>
          Uma instrução não é executada de uma vez só — ela passa por etapas. No modelo clássico de 5 estágios: <Term>Busca</Term> a instrução na memória, <Term>Decodifica</Term> o que ela pede, <Term>Executa</Term> o cálculo na ALU, acessa a <Term>Memória</Term> se precisar, e <Term>Escreve</Term> o resultado de volta.
        </P>
        <PhotoCard
          src="https://commons.wikimedia.org/wiki/Special:FilePath/Ford_assembly_line_-_1913.jpg"
          alt="Linha de montagem da Ford em 1913"
          caption="A linha de montagem de Henry Ford, 1913 — a mesma lógica do pipeline"
          credit="foto: Wikimedia Commons"
        />
        <P style={{ marginTop: 20 }}>
          Sem pipeline, o processador esperaria uma instrução terminar as 5 etapas completamente antes de começar a próxima — desperdiçando tempo, porque enquanto uma instrução está na etapa "Executa", as outras 4 etapas ficam paradas, sem fazer nada. A ideia do pipeline, copiada diretamente da linha de montagem industrial, é começar a próxima instrução assim que a etapa anterior libera espaço — sem esperar a primeira terminar tudo.
        </P>
        <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 20, marginBottom: 8 }}>
          <PipelineGrid />
        </div>
        <P style={{ fontSize: 14.5, color: theme.textMuted }}>
          Repare: no ciclo 5, as quatro instruções estão todas em andamento ao mesmo tempo, cada uma numa etapa diferente — é exatamente como 4 carros, em pontos diferentes da linha de montagem, sendo montados ao mesmo tempo.
        </P>
        <P>
          É aqui que a conexão com RISC fica clara: como toda instrução RISC tem o mesmo tamanho e uma estrutura simples e previsível, é fácil garantir que cada etapa do pipeline demore exatamente 1 ciclo. Já numa CISC, com instruções de tamanho e complexidade variável, uma etapa pode "travar" esperando outra — dificultando (ou exigindo truques bem mais complexos) pra manter o pipeline fluindo direito.
        </P>
      </Section>

      {/* PROCESSOS E THREADS */}
      <Section dark id="processos">
        <Eyebrow>Voltando pro nvidia-smi</Eyebrow>
        <H2 dark>Processos e Threads</H2>
        <P dark>
          Lembra da coluna <Term>Processes</Term> que vimos na Aula 1, com aquele número de <Term>PID</Term>? Chegou a hora de entender o que é, de verdade, um processo — e como o sistema operacional consegue "fingir" que está rodando dezenas de programas ao mesmo tempo, mesmo tendo poucos núcleos.
        </P>
        <P dark>
          Um <strong style={{ color: "#F4F1E8" }}>processo</strong> é um programa em execução — com sua própria fatia de memória, só dele, que nenhum outro processo pode acessar diretamente. Quando você abre o navegador, o sistema operacional cria um processo pra ele; quando você roda seu notebook do Colab, o Python vira outro processo.
        </P>

        <div style={{ background: "#101E38", borderRadius: 12, padding: 24, marginTop: 12, marginBottom: 8 }}>
          <ProcessStateDiagram />
        </div>
        <DiagramLegend
          color={theme.amber}
          bg="#101E38"
          text={theme.textOnDark}
          items={[
            { term: "Novo", desc: "o processo acabou de ser criado, mas o sistema operacional ainda está preparando o espaço de memória pra ele." },
            { term: "Pronto", desc: "o processo está pronto pra rodar, só esperando sua vez de usar um núcleo — é aqui que fica a 'fila'." },
            { term: "Executando", desc: "o processo está, nesse exato instante, usando um núcleo de verdade." },
            { term: "Bloqueado", desc: "o processo parou porque está esperando algo externo (ler um arquivo do disco, uma resposta de rede) — nesse meio tempo, o núcleo é liberado pra outro processo rodar." },
            { term: "Fim", desc: "o processo terminou (ou foi encerrado) e libera toda a memória que estava usando." },
          ]}
        />

        <P dark style={{ marginTop: 20 }}>
          Com poucos núcleos e dezenas de processos "prontos", o sistema operacional troca entre eles rapidamente (milissegundos), dando a ilusão de que tudo roda ao mesmo tempo — mesmo numa CPU de 8 núcleos rodando 200 processos.
        </P>

        <div style={{ marginTop: 28, background: "#101E38", borderRadius: 10, padding: "18px 20px" }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: theme.teal, marginBottom: 8 }}>E uma thread?</div>
          <P dark style={{ fontSize: 15 }}>
            Pensa num processo como uma <strong style={{ color: "#F4F1E8" }}>casa inteira</strong>: ela tem seu próprio endereço, suas próprias paredes, sua própria geladeira — nada disso é compartilhado com a casa do vizinho (outro processo). Uma <strong style={{ color: "#F4F1E8" }}>thread</strong> é como uma <strong style={{ color: "#F4F1E8" }}>pessoa morando dentro dessa casa</strong>: pode ter mais de uma pessoa (mais de uma thread) morando na mesma casa (o mesmo processo), e todas elas compartilham a mesma geladeira, a mesma cozinha, os mesmos móveis — ou seja, a mesma memória.
          </P>
          <P dark style={{ fontSize: 15 }}>
            Cada pessoa (thread) pode estar fazendo uma tarefa diferente ao mesmo tempo — uma lavando louça, outra assistindo TV — mas se as duas tentarem mexer na mesma coisa ao mesmo tempo (tipo os dois tentando pegar o último ovo da geladeira), pode dar confusão. É exatamente isso que o Exercício 6 de hoje mostra na prática.
          </P>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16, marginBottom: 4 }}>
            <div style={{ background: theme.blueprint, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, color: theme.copper, marginBottom: 6 }}>Processo (a casa)</div>
              <P dark style={{ fontSize: 13.5, marginBottom: 0 }}>Memória isolada — nenhum outro processo enxerga ou mexe nela sem permissão especial.</P>
            </div>
            <div style={{ background: theme.blueprint, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, color: theme.teal, marginBottom: 6 }}>Thread (o morador)</div>
              <P dark style={{ fontSize: 13.5, marginBottom: 0 }}>Compartilha a memória com as outras threads do mesmo processo — mais rápido de comunicar, mas mais arriscado.</P>
            </div>
          </div>
          <P dark style={{ fontSize: 15, marginTop: 12, marginBottom: 0 }}>
            Foi exatamente esse compartilhamento que usamos no Exercício 2 da Aula 1, quando criamos uma <Term>thread</Term> pra rodar o cálculo pesado "ao mesmo tempo" que o resto do código lia a GPU — as duas partes do código, rodando em threads diferentes, conseguiam "ver" as mesmas variáveis.
          </P>
        </div>
      </Section>

      {/* CONCLUSÃO */}
      <Section dark>
        <Eyebrow>Fechando o quadro</Eyebrow>
        <H2 dark>Onde tudo isso se encontra</H2>
        <P dark>
          Hoje vimos 4 assuntos que, à primeira vista, parecem soltos: SIMD/MIMD, RISC/CISC, Pipeline, e Processos/Threads. Eles não são temas separados por acaso — são <strong style={{ color: "#F4F1E8" }}>4 respostas diferentes pra mesma pergunta</strong> ("como fazer mais de uma coisa ao mesmo tempo?"), cada uma respondendo em um nível diferente do computador. Olha só como eles se encaixam, do nível mais interno do chip até o nível mais visível pra você, usuário:
        </P>

        <div style={{ display: "grid", gap: 10, marginTop: 20 }}>
          {[
            { n: "1", label: "Dentro de 1 núcleo, ao longo do tempo", desc: "Pipeline — sobrepõe as etapas de várias instruções, uma logo atrás da outra, pra não deixar nenhuma parte da CPU parada.", color: theme.copper },
            { n: "2", label: "Dentro de 1 núcleo, no mesmo instante", desc: "SIMD — uma única instrução processa vários dados ao mesmo tempo (as instruções AVX da CPU, ou cada núcleo CUDA da GPU).", color: theme.teal },
            { n: "3", label: "Entre vários núcleos", desc: "MIMD — cada núcleo roda seu próprio programa, de forma totalmente independente dos outros.", color: theme.copper },
            { n: "4", label: "Acima do hardware, gerenciado pelo sistema operacional", desc: "Processos e Threads — dezenas de programas 'dividindo' os poucos núcleos disponíveis, trocando de vez em quando (milissegundos) pra dar a ilusão de simultaneidade total.", color: theme.teal },
          ].map((item) => (
            <div key={item.n} style={{ display: "flex", gap: 16, background: "#101E38", borderRadius: 10, padding: "16px 18px" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%", background: item.color + "22", border: `1.5px solid ${item.color}`,
                display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontFamily: fontDisplay, fontWeight: 700, fontSize: 13, color: item.color
              }}>{item.n}</div>
              <div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 14.5, color: "#F4F1E8", marginBottom: 4 }}>{item.label}</div>
                <P dark style={{ fontSize: 14, marginBottom: 0 }}>{item.desc}</P>
              </div>
            </div>
          ))}
        </div>

        <P dark style={{ marginTop: 24 }}>
          E o RISC x CISC? Ele não é um 5º nível — é a decisão de <em>design</em> que torna os níveis 1 e 2 possíveis (ou difíceis). Instruções RISC, simples e de tamanho fixo, são o que permite um pipeline fluir sem travar (nível 1) e o que permite replicar milhares de núcleos simples numa GPU (nível 2). É por isso que a GPU — pensada pra SIMD em escala gigante — se aproxima tanto do RISC, e a CPU tradicional — pensada pra fazer poucas coisas complexas bem feitas — historicamente puxou mais pro CISC.
        </P>
        <P dark style={{ marginBottom: 0 }}>
          No fim, a pergunta que abriu a Aula 1 ("por que treinar IA sem GPU leva dias?") e a pergunta que abriu a Aula 2 ("por que a GPU foi desenhada assim?") são a mesma pergunta, vista de dois ângulos — e agora você tem o vocabulário técnico completo pra responder ela em qualquer um dos 4 níveis.
        </P>
      </Section>

      {/* RESUMO */}
      <Section>
        <Eyebrow color={theme.copper}>Resumo rápido</Eyebrow>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            "SIMD: 1 instrução, vários dados ao mesmo tempo — a lógica da GPU.",
            "MIMD: várias instruções, vários dados, núcleos independentes — a lógica da CPU multi-núcleo.",
            "CISC: instruções poucas e complexas (x86). RISC: instruções muitas e simples (ARM) — mais fácil de fazer pipeline.",
            "Pipeline: sobrepor as etapas (Busca, Decodifica, Executa, Memória, Escreve) de várias instruções ao mesmo tempo.",
            "Processo: um programa em execução, com memória própria — passa pelos estados Novo, Pronto, Executando, Bloqueado, Fim.",
            "Thread: uma linha de execução dentro de um processo, compartilhando memória com as outras threads do mesmo processo.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Check size={16} color={theme.copper} style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontFamily: fontBody, fontSize: 15.5, color: "#333229", lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* EXERCÍCIOS */}
      <Section dark id="exercicios">
        <Eyebrow>Prática de hoje</Eyebrow>
        <H2 dark>Exercícios</H2>
        <P dark style={{ fontSize: 15 }}>
          Seis exercícios — parte no Google Colab, parte de pesquisa e análise, parte de cálculo. Nenhum é decoreba: o objetivo é aplicar os conceitos de hoje em situações reais.
        </P>

        <Exercise
          n={1}
          title="SIMD na prática: loop escalar x vetorização com Numpy"
          intro="Vamos provar, com números reais, que SIMD não é exclusividade de GPU — a própria CPU já tem um 'SIMD de bolso' (instruções AVX/SSE), e o Numpy usa isso por baixo dos panos."
          code={`import numpy as np
import time

tamanho = 5_000_000
a = list(range(tamanho))
b = list(range(tamanho))

# Soma escalar: um par de números de cada vez (sem SIMD)
inicio = time.time()
resultado_escalar = [a[i] + b[i] for i in range(tamanho)]
tempo_escalar = time.time() - inicio
print(f"Tempo escalar (loop puro): {tempo_escalar:.4f} segundos")

# Soma vetorizada: Numpy aplica a soma em blocos de números de uma vez (SIMD)
a_np = np.array(a)
b_np = np.array(b)

inicio = time.time()
resultado_vetorizado = a_np + b_np
tempo_vetorizado = time.time() - inicio
print(f"Tempo vetorizado (Numpy): {tempo_vetorizado:.4f} segundos")

print(f"\\nO Numpy foi {tempo_escalar / tempo_vetorizado:.1f}x mais rápido")`}
          walkthrough={[
            { line: "a = list(range(tamanho))", desc: "cria uma lista comum do Python com 5 milhões de números — sem nenhuma otimização especial." },
            { line: "[a[i] + b[i] for i in range(tamanho)]", desc: "soma os números um par de cada vez, em sequência — o jeito 'escalar', sem SIMD." },
            { line: "a_np = np.array(a)", desc: "converte a lista pra um array do Numpy — uma estrutura de dados feita sob medida pra operações vetorizadas." },
            { line: "a_np + b_np", desc: "aqui mora o SIMD: o Numpy manda pra CPU uma única instrução que soma vários números de uma vez (usando as instruções AVX/SSE do processador), em vez de somar um por um." },
          ]}
          expectedOutput={`Tempo escalar (loop puro): 0.8123 segundos
Tempo vetorizado (Numpy): 0.0187 segundos

O Numpy foi 43.4x mais rápido`}
          expectedOutputNotes={[
            { term: "Tempo escalar", desc: "esse valor varia bastante, mas costuma ficar na casa de alguns décimos de segundo pra 5 milhões de números — o Python puro processa um de cada vez." },
            { term: "Tempo vetorizado", desc: "geralmente uma ordem de grandeza menor — é o SIMD da própria CPU entrando em ação, mesmo sem usar GPU nenhuma." },
          ]}
          questions={[
            "Quantas vezes mais rápido o Numpy foi, no seu teste?",
            "Isso é SIMD ou MIMD? Justifique usando a definição de cada um.",
            "Compare esse resultado com o da corrida CPU x GPU da Aula 1 (Exercício 3). Por que a diferença de velocidade ali foi tão maior do que aqui?",
          ]}
          defaultOpen
        />

        <Exercise
          n={2}
          title="Classificando processadores reais: RISC ou CISC?"
          intro="Pesquisa — sem Colab. Pra cada processador abaixo, identifique se ele segue a filosofia RISC ou CISC, e cite pelo menos uma fonte."
          notCode="Isso é uma tarefa de pesquisa e análise, não envolve escrever código."
          questions={[
            "Intel Core i9 (14ª geração) — RISC ou CISC?",
            "Apple M3 — RISC ou CISC?",
            "ARM Cortex-A78 (usado em boa parte dos celulares Android) — RISC ou CISC?",
            "AMD Ryzen 9 — RISC ou CISC?",
            "Um núcleo CUDA de uma GPU NVIDIA — se aproxima mais de qual filosofia, e por quê?",
            "Bônus: as CPUs Intel/AMD modernas são CISC 'por fora', mas por dentro traduzem cada instrução CISC em microinstruções parecidas com RISC antes de executar. Pesquise esse conceito (chamado de 'micro-ops') e explique, em 2-3 frases, por que os fabricantes fazem isso.",
          ]}
        />

        <Exercise
          n={3}
          title="Detetive de processos: interpretando ps aux e top no Colab"
          intro="Vamos olhar processos reais rodando na máquina do Colab e relacionar com o diagrama de estados que vimos hoje."
          code={`!ps aux
!top -bn1 | head -20`}
          walkthrough={[
            { line: "ps aux", desc: "lista todos os processos rodando no sistema nesse instante — cada linha é um processo, com colunas como PID, %CPU, %MEM e o comando que o iniciou." },
            { line: "top -bn1", desc: "mostra uma 'foto única' (por isso o -bn1) do monitor de processos, parecido com o Gerenciador de Tarefas do Windows — inclui a coluna STAT, que mostra o estado do processo." },
            { line: "head -20", desc: "corta a saída nas primeiras 20 linhas, só pra não poluir a tela com processos demais." },
          ]}
          expectedOutput={`USER   PID  %CPU %MEM    VSZ   RSS TTY  STAT START   TIME COMMAND
root     1   0.0  0.1  6100  3400 ?    Ss   10:02   0:00 /sbin/docker-init
root     7   0.2  1.2 856000 98000 ?  Sl   10:02   0:03 /usr/bin/python3 ...
root    42   0.0  0.0      0     0 ?  Z    10:05   0:00 [defunct]`}
          expectedOutputNotes={[
            { term: "STAT: S", desc: "'Sleeping' — o processo está parado, esperando algo (bem parecido com o estado 'Bloqueado' que vimos no diagrama)." },
            { term: "STAT: R", desc: "'Running' — o processo está, nesse instante, usando um núcleo de verdade (o estado 'Executando')." },
            { term: "STAT: Z", desc: "'Zombie' — um processo que já terminou, mas cujo 'registro' ainda não foi limpo pelo sistema operacional." },
          ]}
          questions={[
            "Quantos processos apareceram na sua saída do ps aux?",
            "Ache pelo menos um processo com STAT igual a S (Sleeping) e um com R (Running), se houver. O que você acha que o processo em S está esperando?",
            "Compare a coluna PID daqui com o PID que aparecia no nvidia-smi da Aula 1 — são o mesmo tipo de número (identificador de processo)? O processo Python do seu notebook aparece nas duas listas?",
          ]}
        />

        <Exercise
          n={4}
          title="Calculando o ganho real de um pipeline"
          intro="Exercício quantitativo, sem computador — só matemática. Considere um pipeline de 5 estágios (Busca, Decodifica, Executa, Memória, Escreve), 1 ciclo por estágio."
          notCode="Papel e caneta (ou calculadora). Mostre o cálculo, não só o resultado final."
          questions={[
            "Sem pipeline (uma instrução só começa depois que a anterior termina TUDO): quantos ciclos levam 4 instruções? E 10 instruções? (fórmula: N instruções × 5 ciclos)",
            "Com pipeline (como no diagrama que vimos): quantos ciclos levam 4 instruções? E 10 instruções? (fórmula: 5 ciclos pra 'encher' o pipeline + 1 ciclo por instrução extra)",
            "Calcule o speedup (quantas vezes mais rápido) do pipeline pra 4 instruções, e de novo pra 10 instruções. O speedup aumenta, diminui, ou fica igual conforme o número de instruções cresce?",
            "Bônus: se o número de instruções crescesse até o infinito, pra que valor o speedup se aproximaria? (Dica: pense no que acontece com o '+5 ciclos iniciais' quando N é gigante.)",
          ]}
        />

        <Exercise
          n={5}
          title="Estudo de caso: por que a Apple trocou de CISC pra RISC"
          intro="Em 2020, a Apple anunciou que ia parar de usar processadores Intel (x86, CISC) nos Macs, e passar a usar chips próprios (Apple Silicon: M1, M2, M3...), baseados em ARM (RISC)."
          notCode="Pesquisa + um parágrafo de análise escrita, conectando com os conceitos técnicos de hoje."
          questions={[
            "Pesquise e liste pelo menos 2 vantagens reais que a Apple (ou analistas de mercado) apontaram nessa migração — cite as fontes.",
            "Escreva um parágrafo (5-8 frases) conectando essas vantagens com os conceitos de RISC vistos hoje: simplicidade de instrução, facilidade de pipeline, e o que isso significa pra consumo de energia (importante pra bateria de notebook).",
            "Esse tipo de decisão (trocar toda uma linha de produtos de arquitetura) também está acontecendo em outros lugares — pesquise se alguma empresa de servidores de nuvem (AWS, Google, Microsoft) também está usando chips ARM próprios nos seus data centers, e por quê isso pode interessar especificamente pra quem treina modelos de IA em larga escala.",
          ]}
        />

        <Exercise
          n={6}
          title="Threads compartilhando memória — e o problema que isso pode causar"
          intro="Vamos revisitar as threads que já usamos na Aula 1, mas agora prestando atenção num detalhe importante: threads do MESMO processo compartilham a mesma memória. Isso é poderoso — mas também arriscado."
          code={`import threading

contador = 0

def incrementar():
    global contador
    for _ in range(100000):
        contador += 1

threads = [threading.Thread(target=incrementar) for _ in range(4)]

for t in threads:
    t.start()
for t in threads:
    t.join()

print(f"Contador final: {contador}")
print(f"Valor esperado: {4 * 100000}")`}
          walkthrough={[
            { line: "contador = 0", desc: "uma única variável, guardada na memória do processo — vai ser compartilhada por todas as threads." },
            { line: "def incrementar(): ... contador += 1", desc: "cada thread vai somar 1 ao contador, 100 mil vezes seguidas." },
            { line: "threads = [threading.Thread(...) for _ in range(4)]", desc: "cria 4 threads, todas rodando essa mesma função, dentro do MESMO processo Python — por isso todas enxergam e mexem na mesma variável contador." },
            { line: "t.start() / t.join()", desc: "dispara as 4 threads (rodando ao mesmo tempo) e depois espera todas terminarem antes de seguir." },
          ]}
          expectedOutput={`Contador final: 342917
Valor esperado: 400000`}
          expectedOutputNotes={[
            { term: "Contador final ≠ esperado", desc: "isso não é bug do seu código — é um problema clássico chamado 'condição de corrida' (race condition): duas threads tentam ler e escrever a mesma variável ao mesmo tempo, e uma delas acaba 'pisando' no resultado da outra." },
          ]}
          tip="Rode essa célula várias vezes seguidas. É bem provável que o número final mude a cada execução — e raramente bata exatamente com o valor esperado."
          questions={[
            "Rode o código pelo menos 3 vezes. O contador final deu igual nas 3 vezes? Deu igual ao valor esperado (400000) em alguma delas?",
            "Com suas palavras: por que threads que compartilham a mesma variável podem produzir um resultado 'errado', mesmo que cada uma, sozinha, esteja fazendo a conta certa?",
            "Isso aconteceria da mesma forma se, em vez de 4 threads do mesmo processo, fossem 4 processos separados, cada um com sua própria cópia da variável contador? Justifique usando a diferença entre processo e thread vista hoje.",
          ]}
        />
      </Section>

      {/* LINK PRO JOGO */}
      <Section>
        <Eyebrow color={theme.teal}>Pra fixar tudo isso</Eyebrow>
        <H2>Bora jogar? — GPU Game 2</H2>
        <P>
          5 minigames pra praticar exatamente o que foi visto hoje: classificar SIMD x MIMD, RISC x CISC, calcular estágios de pipeline, investigar processos reais como um detetive, e o glossário todo, contra o relógio.
        </P>
        <a href="#jogo2" style={{ textDecoration: "none" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, background: theme.teal, color: "#fff",
            fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, padding: "14px 24px", borderRadius: 8
          }}>
            Jogar GPU Game 2 <ArrowRight size={16} />
          </div>
        </a>
      </Section>

      {/* FOOTER */}
      <Section dark style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <ArrowRight size={16} color={theme.amber} />
          <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.06em" }}>Próxima aula</span>
        </div>
        <P dark style={{ margin: 0, fontSize: 15.5 }}>
          Fundamentos de Redes de Computadores — TCP, UDP, endereçamento IPv4 e IPv6, e os primeiros passos com Linux de verdade.
        </P>
      </Section>
    </div>
  );
}