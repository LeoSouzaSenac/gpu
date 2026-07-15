import { useState, useEffect, useRef, useMemo } from "react";
import {
  Zap, GitBranch, ArrowLeft, Trophy, Clock, Check,
  Sparkles, Layers, Search
} from "lucide-react";

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
      :root { scroll-behavior: smooth; }
      button { font-family: inherit; }
    `}</style>
  );
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

function Btn({ children, onClick, color, style, disabled }) {
  const c = color || theme.amber;
  return (
    <button onClick={onClick} disabled={disabled} style={{
      fontFamily: fontDisplay, fontWeight: 600, fontSize: 14.5,
      background: disabled ? "#3A4562" : c, color: disabled ? "#7C879E" : theme.ink,
      border: "none", borderRadius: 8, padding: "12px 22px", cursor: disabled ? "not-allowed" : "pointer",
      ...style,
    }}>{children}</button>
  );
}

function ProgressBar({ value, max, color }) {
  return (
    <div style={{ width: "100%", height: 6, background: theme.blueprintLine, borderRadius: 4, overflow: "hidden" }}>
      <div style={{ width: `${Math.min(100, (value / max) * 100)}%`, height: "100%", background: color || theme.amber, transition: "width 0.15s linear" }} />
    </div>
  );
}

function P({ children, style }) {
  return <p style={{ fontFamily: fontBody, fontSize: 15.5, lineHeight: 1.7, color: theme.textOnDark, marginBottom: 14, ...style }}>{children}</p>;
}

function ResultBlock({ rows }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      {rows.map((r) => (
        <div key={r.label} style={{ display: "flex", justifyContent: "space-between", background: "#101E38", borderRadius: 8, padding: "12px 16px" }}>
          <span style={{ fontFamily: fontMono, fontSize: 13, color: theme.textOnDark }}>{r.label}</span>
          <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 15, color: r.color }}>{r.value}</span>
        </div>
      ))}
    </div>
  );
}

function GameShell({ title, color, onExit, children }) {
  return (
    <div style={{ maxWidth: 580, margin: "0 auto", padding: "32px 20px 60px" }}>
      <button onClick={onExit} style={{
        display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "none",
        color: theme.textOnDark, fontFamily: fontMono, fontSize: 12.5, cursor: "pointer", marginBottom: 20, padding: 0
      }}><ArrowLeft size={14} /> voltar pro hub</button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 4, height: 22, background: color, borderRadius: 2 }} />
        <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: "#F4F1E8" }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

/* ============================================================ */
/* GAME 1 — BARRAMENTO RUSH (reflexo com dificuldade crescente) */
/* ============================================================ */

function LaneRound({ laneConfigs, duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [tokens, setTokens] = useState({});
  const [score, setScore] = useState(0);
  const [misses, setMisses] = useState(0);
  const spawnRef = useRef({});
  const elapsedRef = useRef(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    laneConfigs.forEach((l) => { spawnRef.current[l.key] = 500 + Math.random() * 400; });
    const tick = setInterval(() => {
      elapsedRef.current += 100;
      setTimeLeft((t) => Math.max(0, t - 100));

      setTokens((prev) => {
        const next = { ...prev };
        laneConfigs.forEach((l) => {
          const tok = next[l.key];
          if (tok) {
            const newLife = tok.life - 100;
            if (newLife <= 0) { next[l.key] = null; setMisses((m) => m + 1); }
            else next[l.key] = { ...tok, life: newLife };
          } else {
            spawnRef.current[l.key] -= 100;
            if (spawnRef.current[l.key] <= 0) {
              const maxLife = Math.max(650, 1250 - elapsedRef.current * 0.018);
              const kind = l.kind === "random" ? (Math.random() < 0.5 ? "dado" : "instrução") : l.kind;
              next[l.key] = { life: maxLife, maxLife, kind };
              const interval = Math.max(420, 1050 - elapsedRef.current * 0.03);
              spawnRef.current[l.key] = interval + Math.random() * 250;
            }
          }
        });
        return next;
      });
    }, 100);
    return () => clearInterval(tick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeLeft <= 0 && !finishedRef.current) {
      finishedRef.current = true;
      onComplete({ score, misses });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  function hit(key) {
    setTokens((prev) => {
      if (!prev[key]) return prev;
      setScore((s) => s + 1);
      return { ...prev, [key]: null };
    });
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
        <span style={{ fontFamily: fontMono, fontSize: 13, color: theme.textOnDark }}>Tempo: {(timeLeft / 1000).toFixed(1)}s</span>
        <span style={{ fontFamily: fontMono, fontSize: 13 }}>
          <span style={{ color: theme.teal }}>{score} ok</span>{"  "}
          <span style={{ color: theme.red }}>{misses} perdidos</span>
        </span>
      </div>
      <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
        {laneConfigs.map((l) => {
          const tok = tokens[l.key];
          const pct = tok ? (tok.life / tok.maxLife) * 100 : 0;
          return (
            <button key={l.key} onClick={() => hit(l.key)} disabled={!tok} style={{
              width: laneConfigs.length === 1 ? 220 : 160, height: 150, borderRadius: 14,
              border: `2px solid ${tok ? theme.amber : theme.blueprintLine}`,
              background: tok ? theme.amberBg : "#101E38", cursor: tok ? "pointer" : "default",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
              position: "relative", overflow: "hidden"
            }}>
              <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, color: tok ? theme.amberDark : theme.textMuted }}>
                {tok ? tok.kind.toUpperCase() : "aguardando..."}
              </span>
              {tok && (
                <div style={{ width: "70%", height: 5, background: "#00000022", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${pct}%`, height: "100%", background: pct > 30 ? theme.copper : theme.red, transition: "width 0.1s linear" }} />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BarramentoRush({ onFinish }) {
  const [phase, setPhase] = useState("intro");
  const [neumannResult, setNeumannResult] = useState(null);
  const [harvardResult, setHarvardResult] = useState(null);

  if (phase === "intro") {
    return (
      <GameShell title="Barramento Rush" color={theme.copper} onExit={() => onFinish(0)}>
        <P>Blocos de <strong>dado</strong> e <strong>instrução</strong> vão aparecer com um relógio contando — clique antes de expirar. A velocidade aumenta com o tempo.</P>
        <P>Rodada 1: <strong>Von Neumann</strong> — só existe UM slot. Enquanto ele está ocupado, mais nada pode aparecer, mesmo se você estiver rápido. 25 segundos.</P>
        <Btn onClick={() => setPhase("neumann")} color={theme.copper}>Começar rodada Von Neumann</Btn>
      </GameShell>
    );
  }
  if (phase === "neumann") {
    return (
      <GameShell title="Barramento Rush — Von Neumann" color={theme.copper} onExit={() => onFinish(0)}>
        <P style={{ fontSize: 14 }}>Um barramento só: clique assim que o bloco aparecer, antes da barrinha zerar.</P>
        <LaneRound
          laneConfigs={[{ key: "bus", kind: "random" }]}
          duration={25000}
          onComplete={(r) => { setNeumannResult(r); setPhase("between"); }}
        />
      </GameShell>
    );
  }
  if (phase === "between") {
    return (
      <GameShell title="Barramento Rush" color={theme.teal} onExit={() => onFinish(0)}>
        <ResultBlock rows={[
          { label: "Processados", value: neumannResult.score, color: theme.teal },
          { label: "Perdidos (expiraram)", value: neumannResult.misses, color: theme.red },
        ]} />
        <P style={{ marginTop: 16 }}>Agora a rodada <strong>Harvard</strong>: dois slots totalmente independentes, um só de dado, um só de instrução. Os dois podem estar ocupados ao mesmo tempo — mais chance de processar tudo. Mesma duração, mesma dificuldade crescente.</P>
        <Btn onClick={() => setPhase("harvard")} color={theme.teal}>Começar rodada Harvard</Btn>
      </GameShell>
    );
  }
  if (phase === "harvard") {
    return (
      <GameShell title="Barramento Rush — Harvard" color={theme.teal} onExit={() => onFinish(0)}>
        <P style={{ fontSize: 14 }}>Dois barramentos independentes — os dois cartões podem pedir atenção ao mesmo tempo.</P>
        <LaneRound
          laneConfigs={[{ key: "data", kind: "dado" }, { key: "instr", kind: "instrução" }]}
          duration={25000}
          onComplete={(r) => { setHarvardResult(r); setPhase("done"); }}
        />
      </GameShell>
    );
  }

  const nTotal = neumannResult.score + neumannResult.misses;
  const hTotal = harvardResult.score + harvardResult.misses;
  const nEff = nTotal > 0 ? Math.round((neumannResult.score / nTotal) * 100) : 0;
  const hEff = hTotal > 0 ? Math.round((harvardResult.score / hTotal) * 100) : 0;
  const xp = 12 + Math.round(((nEff + hEff) / 2 / 100) * 18);

  return (
    <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(xp)}>
      <ResultBlock rows={[
        { label: "Von Neumann — processados", value: `${neumannResult.score} de ${nTotal} (${nEff}%)`, color: theme.copper },
        { label: "Harvard — processados", value: `${harvardResult.score} de ${hTotal} (${hEff}%)`, color: theme.teal },
      ]} />
      <P style={{ marginTop: 14 }}>
        {hTotal > nTotal
          ? `No modo Harvard, ${hTotal - nTotal} blocos a mais chegaram a aparecer no mesmo tempo — porque dois caminhos independentes deixam a "fila" andar bem mais rápido do que um caminho só.`
          : "Nesse teste os totais ficaram parecidos — mas repare que, mesmo assim, o modo Harvard te dá duas chances simultâneas de reagir, o que reduz a pressão de ter que acertar o tempo perfeito toda vez."}
      </P>
      <Btn onClick={() => onFinish(xp)} style={{ marginTop: 10 }}>Concluir (+{xp} XP)</Btn>
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 2 — MONTA SUA CPU (layout corrigido + 2 estágios)       */
/* ============================================================ */

const CPU_PARTS = [
  { id: "controle", label: "Unidade de Controle" },
  { id: "alu", label: "ALU" },
  { id: "reg", label: "Registradores" },
];
const CPU_SLOTS = [
  { id: "controle", top: "12%", left: "6%", w: "40%", h: "34%" },
  { id: "alu", top: "12%", left: "50%", w: "44%", h: "34%" },
  { id: "reg", top: "54%", left: "6%", w: "88%", h: "32%" },
];

const HARVARD_PARTS = [
  { id: "instrucoes", label: "Memória de Instruções" },
  { id: "dados", label: "Memória de Dados" },
];
const HARVARD_SLOTS = [
  { id: "instrucoes", top: "10%", left: "6%", w: "88%", h: "38%" },
  { id: "dados", top: "54%", left: "6%", w: "88%", h: "38%" },
];

function AssemblyStage({ parts, slots, boxLabel, onDone }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState({});
  const [wrong, setWrong] = useState(null);
  const [order] = useState(() => shuffle(parts));

  function pickLabel(id) {
    if (Object.values(placed).includes(id)) return;
    setSelected(id === selected ? null : id);
  }
  function dropOn(slotId) {
    if (!selected || placed[slotId]) return;
    if (selected === slotId) {
      setPlaced((p) => ({ ...p, [slotId]: selected }));
      setSelected(null);
      setWrong(null);
    } else {
      setWrong(slotId);
      setTimeout(() => setWrong(null), 450);
    }
  }
  useEffect(() => {
    if (Object.keys(placed).length === parts.length) setTimeout(onDone, 400);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placed]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {order.map((p) => {
          const isPlaced = Object.values(placed).includes(p.id);
          return (
            <button key={p.id} onClick={() => pickLabel(p.id)} disabled={isPlaced} style={{
              fontFamily: fontMono, fontSize: 12.5, padding: "8px 14px", borderRadius: 6,
              border: `1.5px solid ${theme.amber}`, cursor: isPlaced ? "default" : "pointer",
              background: isPlaced ? "transparent" : (selected === p.id ? theme.amber : "transparent"),
              color: isPlaced ? theme.textMuted : (selected === p.id ? theme.ink : theme.amber),
              opacity: isPlaced ? 0.35 : 1,
            }}>{p.label}</button>
          );
        })}
      </div>
      <div style={{ position: "relative", height: 260, background: "#101E38", borderRadius: 12, border: `1px solid ${theme.blueprintLine}`, padding: 8 }}>
        <div style={{ position: "absolute", top: 6, left: 10, fontFamily: fontMono, fontSize: 10, color: theme.textMuted }}>{boxLabel}</div>
        {slots.map((s) => (
          <div key={s.id} onClick={() => dropOn(s.id)} style={{
            position: "absolute", left: s.left, width: s.w, top: s.top, height: s.h,
            border: `2px dashed ${wrong === s.id ? theme.red : (placed[s.id] ? theme.teal : theme.blueprintLine)}`,
            background: wrong === s.id ? theme.redBg + "22" : (placed[s.id] ? theme.tealBg + "22" : "transparent"),
            borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
            fontFamily: fontMono, fontSize: 12, color: placed[s.id] ? theme.teal : theme.textMuted, textAlign: "center", padding: 6
          }}>
            {placed[s.id] ? parts.find((p) => p.id === s.id).label : "?"}
          </div>
        ))}
      </div>
    </div>
  );
}

function MontaSuaCPU({ onFinish }) {
  const [stage, setStage] = useState("cpu");

  if (stage === "cpu") {
    return (
      <GameShell title="Monta sua CPU — Estágio 1: Von Neumann" color={theme.copper} onExit={() => onFinish(0)}>
        <P style={{ fontSize: 14.5 }}>Clique num rótulo, depois clique na caixa certa dentro do bloco "CPU". Errar faz a caixa piscar vermelho.</P>
        <AssemblyStage parts={CPU_PARTS} slots={CPU_SLOTS} boxLabel="CPU" onDone={() => setStage("harvard")} />
      </GameShell>
    );
  }
  if (stage === "harvard") {
    return (
      <GameShell title="Monta sua CPU — Estágio 2: Harvard" color={theme.teal} onExit={() => onFinish(15)}>
        <P style={{ fontSize: 14.5 }}>Boa! Agora monte o lado Harvard: encaixe as duas memórias separadas.</P>
        <AssemblyStage parts={HARVARD_PARTS} slots={HARVARD_SLOTS} boxLabel="Fora da CPU" onDone={() => setStage("done")} />
      </GameShell>
    );
  }
  return (
    <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(30)}>
      <P>Você montou os dois modelos: a CPU Von Neumann (Controle, ALU, Registradores) e a separação de memórias da Harvard (Instruções, Dados). É basicamente o esqueleto inteiro da Parte 1 da aula.</P>
      <Btn onClick={() => onFinish(30)}>Concluir (+30 XP)</Btn>
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 3 — CPU OU GPU? (30 tarefas, 3 níveis de dificuldade)   */
/* ============================================================ */

const TASKS_T1 = [
  { t: "Renderizar um vídeo em 4K", a: "gpu" },
  { t: "Compilar um programa", a: "cpu" },
  { t: "Rodar o sistema operacional", a: "cpu" },
  { t: "Treinar uma rede neural", a: "gpu" },
  { t: "Calcular o imposto de renda", a: "cpu" },
  { t: "Jogar um jogo em alta resolução", a: "gpu" },
  { t: "Ordenar uma lista pequena de números", a: "cpu" },
  { t: "Enviar um e-mail", a: "cpu" },
  { t: "Descompactar um arquivo .zip", a: "cpu" },
  { t: "Renderizar uma cena 3D de um filme de animação", a: "gpu" },
];
const TASKS_T2 = [
  { t: "Aplicar um filtro em todos os frames de um vídeo", a: "gpu" },
  { t: "Abrir o navegador e uma planilha ao mesmo tempo", a: "cpu" },
  { t: "Gerar uma imagem com IA (Stable Diffusion)", a: "gpu" },
  { t: "Rodar um servidor web", a: "cpu" },
  { t: "Prever o tempo com um modelo climático gigante", a: "gpu" },
  { t: "Editar um parágrafo num processador de texto", a: "cpu" },
  { t: "Minerar criptomoeda", a: "gpu" },
  { t: "Rodar um antivírus escaneando arquivos", a: "cpu" },
  { t: "Simular a física de milhares de partículas num jogo", a: "gpu" },
  { t: "Fazer backup de arquivos num HD externo", a: "cpu" },
];
const TASKS_T3 = [
  { t: "Detectar objetos numa câmera de segurança em tempo real", a: "gpu" },
  { t: "Calcular uma equação complexa, passo a passo, onde cada parte depende da anterior", a: "cpu" },
  { t: "Ajustar a cor de cada pixel de uma foto de altíssima resolução", a: "gpu" },
  { t: "Decidir qual anúncio mostrar com base em várias regras 'se isso, então aquilo'", a: "cpu" },
  { t: "Rodar um chatbot de IA respondendo sua pergunta", a: "gpu" },
  { t: "Verificar se a senha digitada bate com a senha salva", a: "cpu" },
  { t: "Testar bilhões de combinações pra tentar quebrar uma senha por força bruta", a: "gpu" },
  { t: "Decidir qual programa roda primeiro no processador (o escalonador do sistema)", a: "cpu" },
  { t: "Aplicar reconhecimento facial numa foto", a: "gpu" },
  { t: "Fazer upload de um arquivo pra nuvem", a: "cpu" },
];

function CpuOuGpu({ onFinish }) {
  const [deck] = useState(() => [...shuffle(TASKS_T1), ...shuffle(TASKS_T2), ...shuffle(TASKS_T3)]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  function answer(choice) {
    const correct = deck[idx].a === choice;
    setFeedback(correct ? "right" : "wrong");
    if (correct) { setScore((s) => s + 1); setStreak((s) => s + 1); }
    else setStreak(0);
    setTimeout(() => { setFeedback(null); setIdx((i) => i + 1); }, 500);
  }

  if (idx >= deck.length) {
    const xp = Math.round((score / deck.length) * 30);
    return (
      <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(xp)}>
        <ResultBlock rows={[{ label: "Acertos", value: `${score} / ${deck.length}`, color: theme.teal }]} />
        <Btn onClick={() => onFinish(xp)} style={{ marginTop: 16 }}>Concluir (+{xp} XP)</Btn>
      </GameShell>
    );
  }

  const task = deck[idx];
  const tier = idx < 10 ? 1 : idx < 20 ? 2 : 3;
  return (
    <GameShell title="CPU ou GPU?" color={theme.teal} onExit={() => onFinish(0)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textOnDark }}>{idx + 1} / {deck.length} · nível {tier}</span>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber }}>streak: {streak}</span>
      </div>
      <ProgressBar value={idx} max={deck.length} color={theme.teal} />
      <div style={{
        marginTop: 30, marginBottom: 30, minHeight: 90, display: "flex", alignItems: "center", justifyContent: "center",
        background: feedback === "right" ? theme.tealBg : feedback === "wrong" ? theme.redBg : "#101E38",
        borderRadius: 12, padding: 24
      }}>
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 19, textAlign: "center", color: feedback ? theme.ink : "#F4F1E8" }}>
          {feedback === "right" ? "Certo!" : feedback === "wrong" ? `Era ${task.a.toUpperCase()}` : task.t}
        </span>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <Btn onClick={() => answer("cpu")} disabled={!!feedback} color={theme.copper} style={{ flex: 1, padding: "18px 0" }}>CPU</Btn>
        <Btn onClick={() => answer("gpu")} disabled={!!feedback} color={theme.teal} style={{ flex: 1, padding: "18px 0" }}>GPU</Btn>
      </div>
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 5 — DETETIVE DO NVIDIA-SMI (20 casos)                   */
/* ============================================================ */

const SMI_CASES = [
  { story: "Um treino que deveria estar pesado, mas o painel mostra:", f: { util: "0%", mem: "1200MiB / 15360MiB", temp: "48C", proc: "No running processes found" }, opts: ["GPU-Util em 0%", "Memory-Usage ocupada", "Temp normal"], correct: "GPU-Util em 0%", explain: "Se o treino deveria estar pesado, o Util deveria estar perto de 100%. Em 0%, o código provavelmente nem está usando a GPU de verdade." },
  { story: "Cálculo pesado e contínuo:", f: { util: "100%", mem: "14800MiB / 15360MiB", temp: "89C", proc: "python3 — 14700MiB" }, opts: ["Temp em 89°C", "GPU-Util em 100%", "Processo rodando"], correct: "Temp em 89°C", explain: "89°C é bem alto — perto do ponto em que a GPU pode começar a fazer throttling pra se proteger." },
  { story: "Notebook 'terminou' há 10 minutos, mas o painel mostra:", f: { util: "0%", mem: "9000MiB / 15360MiB", temp: "55C", proc: "No running processes found" }, opts: ["Memory-Usage ocupada sem processo", "Temp normal", "GPU-Util em 0%"], correct: "Memory-Usage ocupada sem processo", explain: "Memória ocupada sem processo listado é sinal clássico de 'vazamento' — reiniciar a sessão resolve." },
  { story: "Dois alunos compartilhando a mesma GPU:", f: { util: "100%", mem: "15100MiB / 15360MiB", temp: "78C", proc: "python3(881) — python3(1204)" }, opts: ["Dois processos na lista", "GPU-Util em 100%", "Temp em 78°C"], correct: "Dois processos na lista", explain: "O Compute Mode 'Default' permite isso — dois processos dividindo a mesma GPU, o que explica a memória quase no limite." },
  { story: "Um modelo minúsculo rodando:", f: { util: "97%", mem: "180MiB / 15360MiB", temp: "60C", proc: "python3 — 150MiB" }, opts: ["Memory-Usage quase vazia", "Temp normal", "GPU-Util alto"], correct: "Memory-Usage quase vazia", explain: "Util alto com memória quase vazia sugere um modelo tão pequeno que a GPU está sendo mal aproveitada — o overhead domina." },
  { story: "No meio de um treino, o desempenho despenca de repente:", f: { util: "41%", mem: "14200MiB / 15360MiB", temp: "97C", proc: "python3 — 14000MiB" }, opts: ["Temp em 97°C", "Memory-Usage alta", "Processo ainda ativo"], correct: "Temp em 97°C", explain: "97°C é temperatura de throttling ativo — a GPU está reduzindo a própria velocidade pra não se danificar, por isso o Util caiu." },
  { story: "Duas leituras seguidas mostram a memória subindo sem parar:", f: { util: "88%", mem: "15300MiB / 15360MiB", temp: "71C", proc: "python3 — 15200MiB" }, opts: ["Memory-Usage quase no limite", "Temp normal", "GPU-Util normal"], correct: "Memory-Usage quase no limite", explain: "15300 de 15360 MiB é quase o teto da VRAM — a próxima leitura corre risco real de erro 'out of memory'." },
  { story: "Depois de um erro no meio do código, o painel mostra:", f: { util: "N/A", mem: "N/A", temp: "N/A", proc: "Unable to determine the device handle" }, opts: ["Processes com erro de leitura", "Util em N/A", "Temp em N/A"], correct: "Processes com erro de leitura", explain: "Essa mensagem indica falha de comunicação com o driver — não é uma leitura normal, e sim sinal de que a sessão precisa ser reiniciada." },
  { story: "O processo 'sumiu' mas a utilização continua alta:", f: { util: "100%", mem: "9000MiB / 15360MiB", temp: "70C", proc: "No running processes found" }, opts: ["Util alto sem processo listado", "Memory-Usage normal", "Temp normal"], correct: "Util alto sem processo listado", explain: "Util alto sem nenhum processo do seu notebook aparecendo é estranho — pode ser outro processo do sistema, ou uma leitura tirada bem no instante de transição." },
  { story: "Comparando com o dia anterior, a temperatura em repouso está mais alta:", f: { util: "0%", mem: "0MiB / 15360MiB", temp: "68C", proc: "No running processes found" }, opts: ["Temp de 68°C parada", "Memory-Usage zerada", "Util zerado"], correct: "Temp de 68°C parada", explain: "68°C com a GPU totalmente ociosa (0% util, 0 memória) é alto — o normal parado costuma ficar na faixa de 40-55°C. Pode indicar problema de resfriamento na máquina física por trás." },
  { story: "Um script roda em loop, e a cada leitura o Util oscila muito (0%, 100%, 0%, 100%):", f: { util: "0% / 100% alternando", mem: "3000MiB / 15360MiB", temp: "62C", proc: "python3 — 2900MiB" }, opts: ["GPU-Util oscilando muito", "Memory-Usage estável", "Temp normal"], correct: "GPU-Util oscilando muito", explain: "Essa oscilação sugere que o código está mandando pouco trabalho de cada vez pra GPU, com pausas no meio — geralmente sinal de que o gargalo real está em outro lugar (como o disco ou a CPU), não na GPU." },
  { story: "Comparando dois processos na mesma GPU:", f: { util: "100%", mem: "15350MiB / 15360MiB", temp: "82C", proc: "python3(200) — python3(950) — python3(1401)" }, opts: ["Três processos disputando a GPU", "Temp normal", "Util normal"], correct: "Três processos disputando a GPU", explain: "Com memória praticamente esgotada e três processos ao mesmo tempo, qualquer um deles pode falhar por falta de VRAM a qualquer momento." },
  { story: "Um aluno jura que 'a GPU não está sendo usada', mas o painel mostra:", f: { util: "3%", mem: "4200MiB / 15360MiB", temp: "58C", proc: "python3 — 4100MiB" }, opts: ["Memory-Usage ocupada com Util baixo", "Temp alta", "Processo ausente"], correct: "Memory-Usage ocupada com Util baixo", explain: "A GPU ESTÁ sendo usada (tem 4.1GB ocupados por um processo Python) — só que o processamento pesado (o cálculo em si) não está rodando nesse instante exato da leitura." },
  { story: "Logo depois de ligar a GPU pela primeira vez na sessão:", f: { util: "0%", mem: "0MiB / 15360MiB", temp: "51C", proc: "No running processes found" }, opts: ["Tudo dentro do esperado", "Temp alta", "Memory-Usage ocupada"], correct: "Tudo dentro do esperado", explain: "Esse é o estado normal de uma GPU recém-ligada, ainda sem nenhum código ter rodado — não é um problema, é o ponto de partida." },
  { story: "Depois de rodar 3 notebooks Colab diferentes na mesma conta ao mesmo tempo:", f: { util: "100%", mem: "15340MiB / 15360MiB", temp: "84C", proc: "python3(101) — python3(304) — python3(509)" }, opts: ["Memory-Usage no limite com múltiplos processos", "Temp normal", "Util baixo"], correct: "Memory-Usage no limite com múltiplos processos", explain: "Vários notebooks tentando usar a mesma GPU gratuita do Colab é uma causa comum de erro de memória — cada um 'invade' o espaço do outro." },
  { story: "A GPU está ligada, mas o código do aluno esqueceu de mandar os dados pra ela:", f: { util: "0%", mem: "50MiB / 15360MiB", temp: "50C", proc: "python3 — 40MiB" }, opts: ["Memory-Usage quase zerada durante o código", "Temp normal", "Processo ausente"], correct: "Memory-Usage quase zerada durante o código", explain: "40MiB é irrisório pra um modelo de verdade — sinal de que os tensores provavelmente ainda estão na CPU, e não foram mandados com .to('cuda')." },
  { story: "Depois de rodar torch.cuda.empty_cache():", f: { util: "0%", mem: "1200MiB / 15360MiB", temp: "56C", proc: "python3 — 1150MiB" }, opts: ["Memory-Usage ainda ocupada", "Temp alta", "Util alto"], correct: "Memory-Usage ainda ocupada", explain: "Mesmo depois de 'limpar' o cache do PyTorch, o processo ainda existe e ainda reserva memória pra si — o comando libera memória não usada, mas não zera tudo enquanto o processo Python continuar vivo." },
  { story: "Comparando um treino que roda bem, num dia em que está mais lento:", f: { util: "62%", mem: "8000MiB / 15360MiB", temp: "60C", proc: "python3 — 7900MiB" }, opts: ["GPU-Util abaixo de 100%", "Memory-Usage alta", "Temp normal"], correct: "GPU-Util abaixo de 100%", explain: "Se o mesmo código antes rodava com Util perto de 100% e agora está em 62%, a GPU está com tempo ocioso — o gargalo pode estar em outra parte do pipeline (como carregar dados do disco)." },
  { story: "Um aluno reclama que a GPU está lenta, mas o painel mostra:", f: { util: "100%", mem: "6000MiB / 15360MiB", temp: "64C", proc: "python3 — 5900MiB" }, opts: ["Tudo indicando uso saudável", "Memory-Usage baixa", "Temp alta"], correct: "Tudo indicando uso saudável", explain: "Util alto, temperatura controlada, memória confortável — esse painel não mostra problema nenhum. Se está 'lento', o gargalo não está na GPU; vale investigar o código." },
  { story: "GPU compartilhada, mas com Compute Mode diferente do padrão:", f: { util: "45%", mem: "7000MiB / 15360MiB", temp: "63C", proc: "python3 — 6900MiB (Compute M.: Exclusive_Process)" }, opts: ["Compute Mode restringindo o compartilhamento", "Temp normal", "Memory-Usage normal"], correct: "Compute Mode restringindo o compartilhamento", explain: "'Exclusive_Process' significa que só UM processo pode usar essa GPU por vez — diferente do 'Default' (que permite vários). Se outro processo tentar entrar, vai dar erro." },
];

function DetetiveSmi({ onFinish }) {
  const [deck] = useState(() => shuffle(SMI_CASES));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === deck[idx].correct) setScore((s) => s + 1);
  }
  function next() { setPicked(null); setIdx((i) => i + 1); }

  if (idx >= deck.length) {
    const xp = Math.round((score / deck.length) * 35);
    return (
      <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(xp)}>
        <ResultBlock rows={[{ label: "Diagnósticos corretos", value: `${score} / ${deck.length}`, color: theme.teal }]} />
        <Btn onClick={() => onFinish(xp)} style={{ marginTop: 16 }}>Concluir (+{xp} XP)</Btn>
      </GameShell>
    );
  }

  const c = deck[idx];
  return (
    <GameShell title="Detetive do nvidia-smi" color={theme.copper} onExit={() => onFinish(0)}>
      <div style={{ fontFamily: fontMono, fontSize: 11, color: theme.textOnDark, marginBottom: 6 }}>Caso {idx + 1} / {deck.length}</div>
      <P style={{ fontSize: 14.5 }}>{c.story}</P>
      <div style={{ background: theme.ink, borderRadius: 8, padding: 14, fontFamily: fontMono, fontSize: 12, color: "#C7D0E0", lineHeight: 1.9, marginBottom: 18 }}>
        <div>GPU-Util: <span style={{ color: theme.amber }}>{c.f.util}</span></div>
        <div>Memory-Usage: <span style={{ color: theme.amber }}>{c.f.mem}</span></div>
        <div>Temp: <span style={{ color: theme.amber }}>{c.f.temp}</span></div>
        <div>Processes: <span style={{ color: theme.amber }}>{c.f.proc}</span></div>
      </div>
      <P style={{ fontSize: 14, color: theme.textOnDark }}>Qual desses campos indica o ponto mais importante pra reparar nesse caso?</P>
      <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
        {c.opts.map((opt) => {
          const isCorrect = opt === c.correct;
          const show = picked && (opt === picked || isCorrect);
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={!!picked} style={{
              textAlign: "left", padding: "12px 16px", borderRadius: 8, cursor: picked ? "default" : "pointer",
              fontFamily: fontMono, fontSize: 13,
              background: show ? (isCorrect ? theme.tealBg : theme.redBg) : "#101E38",
              border: `1px solid ${show ? (isCorrect ? theme.teal : theme.red) : theme.blueprintLine}`,
              color: show ? theme.ink : theme.textOnDark,
            }}>{opt}</button>
          );
        })}
      </div>
      {picked && (
        <div style={{ marginTop: 16 }}>
          <div style={{ background: theme.amberBg, borderRadius: 8, padding: "12px 14px", marginBottom: 12 }}>
            <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.amberDark, lineHeight: 1.6 }}>{c.explain}</span>
          </div>
          <Btn onClick={next}>{idx + 1 >= deck.length ? "Ver resultado" : "Próximo caso"}</Btn>
        </div>
      )}
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 6 — GLOSSÁRIO BLITZ (30 termos)                         */
/* ============================================================ */

const GLOSS = [
  { term: "ALU", def: "Faz as contas de verdade dentro da CPU — soma, subtração, comparação." },
  { term: "Barramento", def: "O caminho físico por onde dado e instrução trafegam dentro do computador." },
  { term: "Gargalo de Von Neumann", def: "O travamento causado por dado e instrução dividirem o mesmo caminho." },
  { term: "Núcleo (core)", def: "Um 'trabalhador' independente dentro de um processador." },
  { term: "Paralelismo", def: "Fazer várias coisas ao mesmo tempo." },
  { term: "Latência", def: "Tempo que UMA tarefa leva pra terminar." },
  { term: "Throughput", def: "Quantidade total de tarefas terminadas num período de tempo." },
  { term: "Cache", def: "Memória pequena e rápida, perto do processador, pra dados usados com frequência." },
  { term: "VRAM", def: "A memória que existe só dentro da própria placa de vídeo." },
  { term: "Throttling", def: "A GPU reduzindo a própria velocidade pra não superaquecer." },
  { term: "PID", def: "Número que identifica um processo específico rodando no sistema." },
  { term: "CUDA", def: "Ferramentas da NVIDIA que permitem programas conversarem com a GPU." },
  { term: "GPU-Util", def: "O quanto a GPU está 'suando' agora, em porcentagem." },
  { term: "Registradores", def: "'Bolsos' rápidos dentro da CPU que guardam o número em uso naquele instante." },
  { term: "Driver", def: "Programa 'tradutor' que faz o sistema operacional conversar com o hardware." },
  { term: "Von Neumann", def: "Arquitetura onde dados e instruções compartilham a mesma memória e o mesmo barramento." },
  { term: "Harvard", def: "Arquitetura onde dados e instruções ficam em memórias e caminhos separados." },
  { term: "Unidade de Controle", def: "O 'gerente' da CPU — decide a ordem de execução das instruções, sem fazer conta nenhuma." },
  { term: "CPU", def: "Processador com poucos núcleos, cada um capaz de decisões complexas — ótimo em tarefas sequenciais." },
  { term: "GPU", def: "Processador com milhares de núcleos simples — ótimo em repetir a mesma conta em massa." },
  { term: "Compute M.", def: "O modo que define se vários processos podem usar a mesma GPU ao mesmo tempo." },
  { term: "MIG", def: "Tecnologia que divide uma GPU física em várias 'GPUs menores' independentes." },
  { term: "Bus-Id", def: "O endereço que identifica onde a GPU está fisicamente conectada na placa-mãe." },
  { term: "Persistence-M", def: "Define se a GPU fica 'pronta e esperando' ou libera tudo quando ninguém está usando." },
  { term: "ECC", def: "Tecnologia de memória que detecta (e às vezes corrige) erros que acontecem ao guardar dados." },
  { term: "Fan", def: "A velocidade do cooler que resfria a GPU." },
  { term: "Perf", def: "O estado de energia da GPU, de P0 (máximo) a P12 (economia extrema)." },
  { term: "Processo", def: "Um programa em execução no computador nesse momento." },
  { term: "Memory-Usage", def: "Quanta VRAM está ocupada agora, sobre o total disponível." },
  { term: "Watt", def: "A unidade usada pra medir quanta energia elétrica um componente está consumindo." },
];

function GlossarioBlitz({ onFinish }) {
  const [deck] = useState(() => shuffle(GLOSS));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  const options = useMemo(() => {
    if (idx >= deck.length) return [];
    const wrongDefs = shuffle(GLOSS.filter((g) => g.term !== deck[idx].term)).slice(0, 3).map((g) => g.def);
    return shuffle([deck[idx].def, ...wrongDefs]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === deck[idx].def) setScore((s) => s + 1);
    setTimeout(() => {
      setPicked(null);
      setIdx((i) => i + 1);
    }, 650);
  }

  if (idx >= deck.length) {
    const xp = Math.round((score / deck.length) * 35);
    return (
      <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(xp)}>
        <ResultBlock rows={[{ label: "Acertos", value: `${score} / ${deck.length}`, color: theme.teal }]} />
        <Btn onClick={() => onFinish(xp)} style={{ marginTop: 16 }}>Concluir (+{xp} XP)</Btn>
      </GameShell>
    );
  }

  const q = deck[idx];
  return (
    <GameShell title="Glossário Blitz" color={theme.teal} onExit={() => onFinish(0)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textOnDark }}>{idx + 1} / {deck.length}</span>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber }}>acertos: {score}</span>
      </div>
      <ProgressBar value={idx} max={deck.length} color={theme.teal} />
      <div style={{ textAlign: "center", margin: "26px 0" }}>
        <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 700, color: theme.amber }}>{q.term}</span>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {options.map((opt) => {
          const isCorrect = opt === q.def;
          const show = picked && (opt === picked || isCorrect);
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={!!picked} style={{
              textAlign: "left", padding: "12px 16px", borderRadius: 8, cursor: picked ? "default" : "pointer",
              fontFamily: fontBody, fontSize: 14,
              background: show ? (isCorrect ? theme.tealBg : theme.redBg) : "#101E38",
              border: `1px solid ${show ? (isCorrect ? theme.teal : theme.red) : theme.blueprintLine}`,
              color: show ? theme.ink : theme.textOnDark,
            }}>{opt}</button>
          );
        })}
      </div>
    </GameShell>
  );
}

/* ============================================================ */
/* HUB                                                           */
/* ============================================================ */

const GAMES = [
  { id: "barramento", title: "Barramento Rush", desc: "Reflexo cronometrado: sinta o gargalo de Von Neumann x Harvard, com dificuldade crescente.", time: "~8 min", color: theme.copper, icon: GitBranch, comp: BarramentoRush },
  { id: "montacpu", title: "Monta sua CPU", desc: "2 estágios: monte a CPU Von Neumann e depois separe as memórias da Harvard.", time: "~6 min", color: theme.copper, icon: Layers, comp: MontaSuaCPU },
  { id: "cpuougpu", title: "CPU ou GPU?", desc: "30 tarefas em 3 níveis de dificuldade — dos óbvios aos bem sutis.", time: "~9 min", color: theme.teal, icon: Zap, comp: CpuOuGpu },
  { id: "detetive", title: "Detetive do nvidia-smi", desc: "20 casos investigativos — ache o campo que denuncia o problema.", time: "~14 min", color: theme.copper, icon: Search, comp: DetetiveSmi },
  { id: "glossario", title: "Glossário Blitz", desc: "30 termos técnicos da aula, contra o relógio.", time: "~12 min", color: theme.teal, icon: Sparkles, comp: GlossarioBlitz },
];

export default function GpuGame() {
  const [screen, setScreen] = useState("hub");
  const [xp, setXp] = useState(0);
  const [completed, setCompleted] = useState({});

  function finishGame(id, points) {
    setXp((x) => x + points);
    if (points > 0) setCompleted((c) => ({ ...c, [id]: true }));
    setScreen("hub");
  }

  if (screen !== "hub") {
    const game = GAMES.find((g) => g.id === screen);
    const Comp = game.comp;
    return (
      <div style={{ background: theme.blueprint, minHeight: "100%" }}>
        <Fonts />
        <Comp key={game.id} onFinish={(pts) => finishGame(game.id, pts)} />
      </div>
    );
  }

  return (
    <div style={{ background: theme.paper, minHeight: "100%" }}>
      <Fonts />
      <div style={{ background: theme.blueprint, padding: "40px 24px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none",
          backgroundImage: `linear-gradient(${theme.blueprintLine}55 1px, transparent 1px), linear-gradient(90deg, ${theme.blueprintLine}55 1px, transparent 1px)`,
          backgroundSize: "36px 36px"
        }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <a href="#" style={{
            display: "inline-flex", alignItems: "center", gap: 6, textDecoration: "none",
            color: theme.textOnDark, fontFamily: fontMono, fontSize: 12.5, marginBottom: 18
          }}><ArrowLeft size={14} /> voltar pra aula</a>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, marginTop: 14 }}>
            UC1 · Aula 1 · Prática de fixação
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 34, color: "#F4F1E8", marginBottom: 10 }}>GPU Game</h1>
          <p style={{ fontFamily: fontBody, fontSize: 16, color: theme.textOnDark, maxWidth: 580, marginBottom: 20 }}>
            5 minigames pra fixar Von Neumann, Harvard, CPU x GPU e nvidia-smi. Cerca de 50-55 minutos de jogo, no total.
          </p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#101E38", padding: "10px 18px", borderRadius: 8 }}>
            <Trophy size={16} color={theme.amber} />
            <span style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 16, color: theme.amber }}>{xp} XP</span>
            <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textMuted }}>· {Object.keys(completed).length}/5 concluídos</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {GAMES.map((g) => {
            const Icon = g.icon;
            const done = completed[g.id];
            return (
              <button key={g.id} onClick={() => setScreen(g.id)} style={{
                textAlign: "left", background: theme.paperCard, border: `1px solid ${g.color}33`,
                borderRadius: 12, padding: 20, cursor: "pointer", position: "relative"
              }}>
                {done && (
                  <div style={{ position: "absolute", top: 14, right: 14, width: 22, height: 22, borderRadius: "50%", background: theme.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={13} color="#fff" />
                  </div>
                )}
                <div style={{ width: 38, height: 38, borderRadius: 8, background: g.color + "22", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                  <Icon size={19} color={g.color} />
                </div>
                <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 16, color: theme.ink, marginBottom: 4 }}>{g.title}</div>
                <div style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.textMuted, marginBottom: 10, lineHeight: 1.5 }}>{g.desc}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: fontMono, fontSize: 11, color: theme.textMuted }}>
                  <Clock size={11} /> {g.time}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}