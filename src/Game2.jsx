import { useState, useMemo } from "react";
import {
  ArrowLeft, Trophy, Clock, Check, Sparkles, Layers, Search, GitCommit, Workflow
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
/* GAME 1 — SIMD OU MIMD?                                       */
/* ============================================================ */

const SIMD_T1 = [
  { t: "Aplicar o mesmo filtro em todos os pixels de uma imagem, ao mesmo tempo", a: "simd" },
  { t: "Um núcleo compilando código enquanto outro toca música", a: "mimd" },
  { t: "Multiplicar cada elemento de uma matriz gigante pela mesma constante", a: "simd" },
  { t: "Cada thread do seu notebook rodando uma tarefa completamente diferente", a: "mimd" },
  { t: "Somar dois vetores de números, elemento por elemento, tudo simultâneo", a: "simd" },
  { t: "8 núcleos de CPU, cada um rodando um programa diferente", a: "mimd" },
  { t: "GPU aplicando a mesma ativação (ReLU) em milhares de neurônios ao mesmo tempo", a: "simd" },
  { t: "Um servidor rodando processos de usuários diferentes, cada um fazendo algo distinto", a: "mimd" },
];
const SIMD_T2 = [
  { t: "Instrução AVX da CPU somando 8 números de uma vez", a: "simd" },
  { t: "Renderizar cada pixel de um frame com o mesmo cálculo de iluminação", a: "simd" },
  { t: "Um núcleo lidando com rede, outro com disco, outro com cálculo — tarefas diferentes", a: "mimd" },
  { t: "Aplicar a mesma transformação de cor em todos os frames de um vídeo, em paralelo", a: "simd" },
  { t: "Sistema operacional escalonando processos diferentes entre os núcleos disponíveis", a: "mimd" },
  { t: "Multiplicação de matrizes numa rede neural (cada núcleo faz a mesma operação sobre dados diferentes)", a: "simd" },
  { t: "Um cluster de servidores, cada máquina rodando uma parte diferente de um sistema", a: "mimd" },
  { t: "Comprimir um arquivo aplicando o mesmo algoritmo em blocos diferentes, paralelamente", a: "simd" },
];
const SIMD_T3 = [
  { t: "Uma GPU dividida em dois grupos de núcleos, cada grupo rodando uma tarefa diferente ao mesmo tempo", a: "mimd" },
  { t: "4 núcleos de CPU rodando, todos ao mesmo tempo, a mesma instrução de criptografia sobre pedaços diferentes de um arquivo", a: "simd" },
  { t: "Um supercomputador vetorial antigo (Cray-1) aplicando uma única instrução sobre um vetor inteiro de números", a: "simd" },
  { t: "Um chip com 200 núcleos simples, mas metade seguindo um programa e a outra metade seguindo outro", a: "mimd" },
  { t: "As instruções AVX de uma CPU moderna, somando 8 números numa única operação", a: "simd" },
  { t: "Um data center com centenas de servidores, cada um processando requisições diferentes de usuários", a: "mimd" },
  { t: "Aplicar o mesmo ajuste de brilho em cada pixel de uma foto, todos ao mesmo tempo", a: "simd" },
  { t: "Um time de desenvolvedores, cada um trabalhando numa parte diferente do mesmo projeto, em paralelo", a: "mimd" },
];

function SimdOuMimd({ onFinish }) {
  const [deck] = useState(() => [...shuffle(SIMD_T1), ...shuffle(SIMD_T2), ...shuffle(SIMD_T3)]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  function answer(choice) {
    const correct = deck[idx].a === choice;
    setFeedback(correct ? "right" : "wrong");
    if (correct) { setScore((s) => s + 1); setStreak((s) => s + 1); }
    else setStreak(0);
    setTimeout(() => { setFeedback(null); setIdx((i) => i + 1); }, 550);
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
  const tier = idx < 8 ? 1 : idx < 16 ? 2 : 3;
  return (
    <GameShell title="SIMD ou MIMD?" color={theme.teal} onExit={() => onFinish(0)}>
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
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 18, textAlign: "center", color: feedback ? theme.ink : "#F4F1E8" }}>
          {feedback === "right" ? "Certo!" : feedback === "wrong" ? `Era ${task.a.toUpperCase()}` : task.t}
        </span>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <Btn onClick={() => answer("simd")} disabled={!!feedback} color={theme.teal} style={{ flex: 1, padding: "18px 0" }}>SIMD</Btn>
        <Btn onClick={() => answer("mimd")} disabled={!!feedback} color={theme.copper} style={{ flex: 1, padding: "18px 0" }}>MIMD</Btn>
      </div>
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 2 — RISC OU CISC?                                       */
/* ============================================================ */

const RC_T1 = [
  { t: "Intel Core i9 (usado na maioria dos PCs Windows)", a: "cisc" },
  { t: "Apple M3 (Macs recentes)", a: "risc" },
  { t: "ARM Cortex-A78 (celulares Android)", a: "risc" },
  { t: "AMD Ryzen 9", a: "cisc" },
  { t: "Raspberry Pi (processador ARM)", a: "risc" },
  { t: "Processador Intel Pentium (anos 90/2000)", a: "cisc" },
  { t: "RISC-V (arquitetura aberta, crescendo em popularidade)", a: "risc" },
  { t: "Snapdragon (processador de celulares Qualcomm, baseado em ARM)", a: "risc" },
];
const RC_T2 = [
  { t: "Instruções de tamanho fixo, todas com 32 bits", a: "risc" },
  { t: "Uma única instrução que lê da memória, soma e grava o resultado de volta", a: "cisc" },
  { t: "Poucas instruções no total, cada uma fazendo uma coisa simples", a: "risc" },
  { t: "Instruções de tamanho variável, algumas curtas, outras bem longas", a: "cisc" },
  { t: "Design pensado pra manter o pipeline fluindo sem travar", a: "risc" },
  { t: "Centenas de instruções diferentes disponíveis, muitas raramente usadas", a: "cisc" },
  { t: "Precisa de mais instruções pra fazer a mesma tarefa, mas cada uma é rápida", a: "risc" },
  { t: "Compatibilidade histórica com décadas de software legado motivou manter a complexidade", a: "cisc" },
];
const RC_T3 = [
  { t: "x86 moderno traduzindo instruções complexas em microinstruções simples antes de executar (por fora)", a: "cisc" },
  { t: "Processador otimizado pra rodar em bateria de celular, priorizando baixo consumo de energia", a: "risc" },
  { t: "Chip dos anos 1970-80, quando memória era cara e reduzir o tamanho do programa era prioridade", a: "cisc" },
  { t: "Núcleos CUDA de uma GPU NVIDIA", a: "risc" },
  { t: "Instrução única capaz de executar sozinha um loop inteiro de cópia de memória", a: "cisc" },
  { t: "Decodificador de instrução simples o bastante pra replicar centenas de vezes no mesmo chip", a: "risc" },
  { t: "Arquitetura escolhida pra maximizar duração de bateria e reduzir aquecimento em notebooks", a: "risc" },
  { t: "Processador cujo fabricante prioriza rodar, sem recompilar, programas escritos há 20 anos", a: "cisc" },
];

function RiscOuCisc({ onFinish }) {
  const [deck] = useState(() => [...shuffle(RC_T1), ...shuffle(RC_T2), ...shuffle(RC_T3)]);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState(null);

  function answer(choice) {
    const correct = deck[idx].a === choice;
    setFeedback(correct ? "right" : "wrong");
    if (correct) { setScore((s) => s + 1); setStreak((s) => s + 1); }
    else setStreak(0);
    setTimeout(() => { setFeedback(null); setIdx((i) => i + 1); }, 550);
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
  const tier = idx < 8 ? 1 : idx < 16 ? 2 : 3;
  return (
    <GameShell title="RISC ou CISC?" color={theme.copper} onExit={() => onFinish(0)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textOnDark }}>{idx + 1} / {deck.length} · nível {tier}</span>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber }}>streak: {streak}</span>
      </div>
      <ProgressBar value={idx} max={deck.length} color={theme.copper} />
      <div style={{
        marginTop: 30, marginBottom: 30, minHeight: 90, display: "flex", alignItems: "center", justifyContent: "center",
        background: feedback === "right" ? theme.tealBg : feedback === "wrong" ? theme.redBg : "#101E38",
        borderRadius: 12, padding: 24
      }}>
        <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 17, textAlign: "center", color: feedback ? theme.ink : "#F4F1E8" }}>
          {feedback === "right" ? "Certo!" : feedback === "wrong" ? `Era ${task.a.toUpperCase()}` : task.t}
        </span>
      </div>
      <div style={{ display: "flex", gap: 14 }}>
        <Btn onClick={() => answer("risc")} disabled={!!feedback} color={theme.teal} style={{ flex: 1, padding: "18px 0" }}>RISC</Btn>
        <Btn onClick={() => answer("cisc")} disabled={!!feedback} color={theme.copper} style={{ flex: 1, padding: "18px 0" }}>CISC</Btn>
      </div>
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 3 — PIPELINE RUSH (quiz de estágio por ciclo)           */
/* ============================================================ */

const STAGE_NAMES = ["Busca", "Decodifica", "Executa", "Memória", "Escreve"];
const ALL_ANSWERS = [...STAGE_NAMES, "Ainda não começou", "Já terminou"];

function stageFor(instrIdx, cycle) {
  const stageIdx = (cycle - 1) - instrIdx;
  if (stageIdx < 0) return "Ainda não começou";
  if (stageIdx >= STAGE_NAMES.length) return "Já terminou";
  return STAGE_NAMES[stageIdx];
}

function makeRound() {
  const instrIdx = Math.floor(Math.random() * 5); // I1..I5
  const cycle = 1 + Math.floor(Math.random() * 11); // 1..11
  const correct = stageFor(instrIdx, cycle);
  const distractors = shuffle(ALL_ANSWERS.filter((a) => a !== correct)).slice(0, 3);
  return { instrIdx, cycle, correct, options: shuffle([correct, ...distractors]) };
}

function PipelineRush({ onFinish }) {
  const TOTAL = 15;
  const [rounds] = useState(() => Array.from({ length: TOTAL }, makeRound));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === rounds[idx].correct) setScore((s) => s + 1);
  }
  function next() { setPicked(null); setIdx((i) => i + 1); }

  if (idx >= TOTAL) {
    const xp = Math.round((score / TOTAL) * 30);
    return (
      <GameShell title="Resultado" color={theme.amber} onExit={() => onFinish(xp)}>
        <ResultBlock rows={[{ label: "Acertos", value: `${score} / ${TOTAL}`, color: theme.teal }]} />
        <Btn onClick={() => onFinish(xp)} style={{ marginTop: 16 }}>Concluir (+{xp} XP)</Btn>
      </GameShell>
    );
  }

  const r = rounds[idx];
  const n = r.instrIdx + 1;
  return (
    <GameShell title="Pipeline Rush" color={theme.copper} onExit={() => onFinish(0)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textOnDark }}>{idx + 1} / {TOTAL}</span>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber }}>acertos: {score}</span>
      </div>
      <ProgressBar value={idx} max={TOTAL} color={theme.copper} />
      <div style={{ textAlign: "center", margin: "28px 0" }}>
        <span style={{ fontFamily: fontMono, fontSize: 15, color: theme.textOnDark }}>Pipeline de 5 estágios (Busca, Decodifica, Executa, Memória, Escreve). Instrução I{n} entra em Busca no ciclo {n}.</span>
        <div style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 22, color: theme.amber, marginTop: 14 }}>
          No ciclo {r.cycle}, em que etapa está a instrução I{n}?
        </div>
      </div>
      <div style={{ display: "grid", gap: 10 }}>
        {r.options.map((opt) => {
          const isCorrect = opt === r.correct;
          const show = picked && (opt === picked || isCorrect);
          return (
            <button key={opt} onClick={() => choose(opt)} disabled={!!picked} style={{
              textAlign: "left", padding: "12px 16px", borderRadius: 8, cursor: picked ? "default" : "pointer",
              fontFamily: fontMono, fontSize: 13.5,
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
            <span style={{ fontFamily: fontBody, fontSize: 14, color: theme.amberDark, lineHeight: 1.6 }}>
              I{n} entra em Busca no ciclo {n}. No ciclo {r.cycle}, isso é a etapa número {r.cycle - n + 1} da instrução — {r.correct === "Ainda não começou" ? "número negativo, ou seja, ela nem começou ainda." : r.correct === "Já terminou" ? "além da 5ª etapa, ou seja, ela já terminou." : `que corresponde a '${r.correct}'.`}
            </span>
          </div>
          <Btn onClick={next}>{idx + 1 >= TOTAL ? "Ver resultado" : "Próxima"}</Btn>
        </div>
      )}
    </GameShell>
  );
}

/* ============================================================ */
/* GAME 4 — DETETIVE DE PROCESSOS                                */
/* ============================================================ */

const PROC_CASES = [
  { story: "Um processo aparece assim no ps aux:", snippet: "root  4021  Z  [python3] <defunct>", opts: ["Zumbi: já terminou, aguardando o pai 'coletar' seu status", "Rodando normalmente", "Erro de permissão"], correct: "Zumbi: já terminou, aguardando o pai 'coletar' seu status", explain: "STAT 'Z' significa que o processo já terminou de executar, mas ainda ocupa uma entrada na tabela de processos até o processo pai confirmar que leu o resultado dele." },
  { story: "Um processo aparece com STAT 'D':", snippet: "root  1187  D  [kworker/writeback]", opts: ["Esperando entrada/saída de disco, não pode ser interrompido facilmente", "Processo travado permanentemente", "Processo terminando"], correct: "Esperando entrada/saída de disco, não pode ser interrompido facilmente", explain: "'D' (uninterruptible sleep) é um tipo especial de espera, geralmente por disco — o processo não responde a sinais de interrupção enquanto está nesse estado." },
  { story: "O %CPU de um único processo mostra 385%:", snippet: "user  2290  385%  python3 treino.py", opts: ["Processo usando múltiplos núcleos ao mesmo tempo (multithread)", "Erro de leitura do sistema", "Processo com vazamento de memória"], correct: "Processo usando múltiplos núcleos ao mesmo tempo (multithread)", explain: "Em ferramentas como top/ps, %CPU pode passar de 100% quando um processo usa mais de um núcleo simultaneamente — 385% significa quase 4 núcleos ocupados ao mesmo tempo." },
  { story: "Um processo tem PPID = 1, mas era filho de outro processo que já não existe mais:", snippet: "user  5500  PPID=1  node server.js", opts: ["Processo órfão, adotado pelo processo init (PID 1)", "Processo travado", "Erro de duplicação"], correct: "Processo órfão, adotado pelo processo init (PID 1)", explain: "Quando o processo pai termina antes do filho, o sistema operacional 're-adota' o filho, atribuindo o processo init (PID 1) como novo pai — por isso o PPID aparece como 1." },
  { story: "Dois processos com o mesmo COMMAND aparecem ao mesmo tempo, cada um com STAT R:", snippet: "user 881  R  python3 notebook.py\nuser 1204 R  python3 notebook.py", opts: ["Dois processos independentes, cada um num núcleo — MIMD na prática", "Um erro de duplicação do sistema", "Processo clonado por engano"], correct: "Dois processos independentes, cada um num núcleo — MIMD na prática", explain: "Nada de errado aqui: são dois alunos (ou dois notebooks) rodando o mesmo programa, cada um em seu próprio processo — exatamente o modelo MIMD que vimos hoje, aplicado na prática." },
  { story: "A coluna NI (nice) de um processo mostra -20:", snippet: "root  330  NI=-20  dbus-daemon", opts: ["Prioridade máxima — nice -20 é o valor mais alto de prioridade possível", "Processo quase sem prioridade nenhuma", "Erro de configuração do sistema"], correct: "Prioridade máxima — nice -20 é o valor mais alto de prioridade possível", explain: "O valor de 'nice' vai de -20 (prioridade máxima) a 19 (prioridade mínima) — quanto menor o número, mais cedo o escalonador tende a dar o núcleo pra esse processo." },
  { story: "Um processo mostra VSZ bem alto, mas RSS bem baixo:", snippet: "user 900  VSZ=8000000  RSS=12000  chrome", opts: ["Reservou bastante memória virtual, mas usa pouca RAM física de fato", "Processo com erro grave de memória", "Processo prestes a travar"], correct: "Reservou bastante memória virtual, mas usa pouca RAM física de fato", explain: "VSZ é o total de memória virtual que o processo reservou (endereços que ele PODE usar); RSS é quanto de memória física (RAM) ele está realmente ocupando agora. É normal os dois números serem bem diferentes." },
  { story: "O TIME acumulado de um processo é altíssimo, mas o %CPU agora é 0%:", snippet: "user 610  TIME=14:32:09  %CPU=0%  servidor", opts: ["Já usou bastante CPU no passado, mas está ocioso/bloqueado agora", "Processo com erro de contabilização", "Processo recém-criado"], correct: "Já usou bastante CPU no passado, mas está ocioso/bloqueado agora", explain: "TIME é o total acumulado de tempo de CPU já USADO pelo processo desde que começou — não tem relação direta com o que ele está fazendo agora. Um processo pode ter horas de TIME acumulado e estar, nesse instante, parado em 'Bloqueado' esperando uma requisição de rede." },
  { story: "Um 'top' mostra load average de 8.2, numa máquina com só 4 núcleos:", snippet: "load average: 8.20, 7.85, 6.40", opts: ["Sistema sobrecarregado: mais processos 'prontos' do que núcleos disponíveis", "Erro de leitura do sensor", "Os núcleos estão todos ociosos"], correct: "Sistema sobrecarregado: mais processos 'prontos' do que núcleos disponíveis", explain: "Load average acima do número de núcleos significa que, em média, existem mais processos no estado 'Pronto' esperando vez do que núcleos livres pra atendê-los — a fila está mais cheia do que a capacidade de atendimento." },
  { story: "Um processo aparece com STAT 'T':", snippet: "user 777  T  vim arquivo.txt", opts: ["Parado/suspenso (ex: pausado com Ctrl+Z), não está executando nem esperando", "Terminando naturalmente", "Travado por erro de driver"], correct: "Parado/suspenso (ex: pausado com Ctrl+Z), não está executando nem esperando", explain: "'T' (stopped) indica um processo deliberadamente pausado — geralmente porque alguém apertou Ctrl+Z no terminal, ou porque está sendo depurado (traced)." },
  { story: "Com o comando ps -eLf, o mesmo PID aparece em várias linhas, cada uma com um LWP diferente:", snippet: "user 2001  LWP=2001  python3\nuser 2001  LWP=2002  python3\nuser 2001  LWP=2003  python3", opts: ["São threads diferentes do mesmo processo, compartilhando a mesma memória", "São processos duplicados por erro", "Cada linha é um núcleo físico separado"], correct: "São threads diferentes do mesmo processo, compartilhando a mesma memória", explain: "LWP (Lightweight Process) é como o Linux identifica cada thread. Mesmo PID, LWPs diferentes = múltiplas threads do MESMO processo, todas compartilhando a mesma fatia de memória — exatamente o conceito de thread que vimos hoje." },
  { story: "O mesmo PID que aparece no ps aux também aparece na coluna Processes do nvidia-smi:", snippet: "ps aux → PID 1045 python3\nnvidia-smi → PID 1045 python3 1662MiB", opts: ["É o mesmo processo, visto por duas ferramentas diferentes — uma pelo lado da CPU, outra pelo lado da GPU", "É uma coincidência de numeração", "Um dos dois números está errado"], correct: "É o mesmo processo, visto por duas ferramentas diferentes — uma pelo lado da CPU, outra pelo lado da GPU", explain: "PID é único no sistema operacional inteiro — se o mesmo número aparece no ps aux (visão geral de processos) e no nvidia-smi (processos usando a GPU), é porque é exatamente o mesmo processo, só que cada ferramenta está olhando um recurso diferente que ele está usando." },
  { story: "Um processo mostra 100% de %CPU continuamente, por horas, sem nunca parecer 'Bloqueado':", snippet: "user 3321  R  100%  script.py (14h de execução)", opts: ["Pode ser um loop infinito — o processo nunca libera o núcleo pra esperar nada", "É sempre um sinal de programa otimizado", "É impossível, deve ser erro de leitura"], correct: "Pode ser um loop infinito — o processo nunca libera o núcleo pra esperar nada", explain: "Um processo saudável normalmente alterna entre Executando e Bloqueado (esperando disco, rede, etc). Ficar preso em 100% por horas, sempre 'Pronto/Executando' e nunca 'Bloqueado', é um sinal clássico de bug — um loop que nunca espera por nada." },
  { story: "O mesmo programa aparece duas vezes no ps aux, com PIDs diferentes, cada cópia com sua própria RSS:", snippet: "user 100  RSS=200MB  notebook.py\nuser 205  RSS=200MB  notebook.py", opts: ["São duas instâncias separadas do mesmo programa, cada uma com sua própria memória isolada", "É o mesmo processo contado duas vezes por erro", "As duas instâncias compartilham a mesma memória"], correct: "São duas instâncias separadas do mesmo programa, cada uma com sua própria memória isolada", explain: "Processos são isolados por padrão — mesmo rodando exatamente o mesmo código, cada execução ganha seu próprio PID e sua própria fatia de memória, sem compartilhar nada automaticamente (diferente de threads do mesmo processo)." },
  { story: "Um processo trava a máquina toda ao consumir toda a RAM disponível, e o kernel precisa agir:", snippet: "dmesg → Out of memory: Killed process 4402 (chrome)", opts: ["O OOM Killer do Linux encerrou o processo à força pra salvar o sistema", "O processo terminou naturalmente", "É um erro de permissão"], correct: "O OOM Killer do Linux encerrou o processo à força pra salvar o sistema", explain: "Quando a memória do sistema se esgota, o Linux tem um mecanismo (o OOM Killer, 'Out Of Memory Killer') que escolhe um processo — geralmente o que mais consome memória — e o encerra à força, pra evitar que o sistema inteiro trave." },
  { story: "Um processo aparece na lista com STAT 'S+':", snippet: "user 620  S+  vim notas.txt", opts: ["Dormindo (Sleeping) e rodando em primeiro plano no terminal (o '+')", "Travado, aguardando reinício", "Terminando com erro"], correct: "Dormindo (Sleeping) e rodando em primeiro plano no terminal (o '+')", explain: "O '+' depois da letra de estado indica que o processo está em primeiro plano (foreground) no terminal que o iniciou — diferente de processos rodando em segundo plano (background), sem o '+'." },
];

function DetetiveProcessos({ onFinish }) {
  const [deck] = useState(() => shuffle(PROC_CASES));
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
    <GameShell title="Detetive de Processos" color={theme.copper} onExit={() => onFinish(0)}>
      <div style={{ fontFamily: fontMono, fontSize: 11, color: theme.textOnDark, marginBottom: 6 }}>Caso {idx + 1} / {deck.length}</div>
      <P style={{ fontSize: 14.5 }}>{c.story}</P>
      <div style={{ background: theme.ink, borderRadius: 8, padding: 14, fontFamily: fontMono, fontSize: 12, color: "#C7D0E0", lineHeight: 1.7, marginBottom: 18, whiteSpace: "pre-wrap" }}>
        {c.snippet}
      </div>
      <P style={{ fontSize: 14, color: theme.textOnDark }}>O que está acontecendo aqui?</P>
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
/* GAME 5 — GLOSSÁRIO BLITZ — AULA 2                             */
/* ============================================================ */

const GLOSS2 = [
  { term: "SIMD", def: "Instrução Única, Múltiplos Dados — a mesma operação aplicada a vários dados ao mesmo tempo." },
  { term: "MIMD", def: "Múltiplas Instruções, Múltiplos Dados — núcleos totalmente independentes, cada um com sua própria instrução." },
  { term: "SISD", def: "Instrução Única, Dado Único — um processador simples, sem paralelismo, processando um dado de cada vez." },
  { term: "MISD", def: "Múltiplas Instruções, Dado Único — raríssimo; várias instruções diferentes processando o mesmo dado." },
  { term: "Taxonomia de Flynn", def: "Classificação de 1966 que separa processadores em 4 categorias, baseada em quantas instruções e dados eles processam por vez." },
  { term: "RISC", def: "Reduced Instruction Set Computer — poucas instruções, todas simples e de tamanho fixo." },
  { term: "CISC", def: "Complex Instruction Set Computer — instruções poderosas, que fazem várias operações de uma vez, de tamanho variável." },
  { term: "AVX / SSE", def: "Famílias de instruções SIMD dentro de CPUs comuns, que somam ou multiplicam vários números numa única operação." },
  { term: "Pipeline", def: "Técnica que sobrepõe as etapas de várias instruções ao mesmo tempo, como uma linha de montagem." },
  { term: "Busca (Fetch)", def: "Primeira etapa do pipeline: buscar a instrução na memória." },
  { term: "Decodifica", def: "Etapa do pipeline em que a CPU interpreta o que a instrução está pedindo." },
  { term: "Executa", def: "Etapa do pipeline em que a ALU realmente faz o cálculo." },
  { term: "Memória (etapa)", def: "Etapa do pipeline em que a instrução acessa a memória, se precisar." },
  { term: "Escreve (Write-back)", def: "Última etapa do pipeline: o resultado é gravado de volta." },
  { term: "Micro-ops", def: "Microinstruções simples, parecidas com RISC, em que CPUs CISC modernas traduzem cada instrução complexa antes de executar." },
  { term: "Processo", def: "Um programa em execução, com sua própria fatia de memória." },
  { term: "Thread", def: "Uma linha de execução dentro de um processo, compartilhando memória com as outras threads do mesmo processo." },
  { term: "Estado Novo", def: "O processo acabou de ser criado; o sistema ainda está preparando o espaço de memória pra ele." },
  { term: "Estado Pronto", def: "O processo está pronto pra rodar, esperando sua vez de usar um núcleo." },
  { term: "Estado Executando", def: "O processo está, nesse instante, usando um núcleo de verdade." },
  { term: "Estado Bloqueado", def: "O processo parou porque está esperando algo externo, como uma resposta de disco ou rede." },
  { term: "Condição de corrida", def: "Quando duas threads tentam ler e escrever a mesma variável ao mesmo tempo, e uma acaba 'pisando' no resultado da outra." },
  { term: "PID", def: "Número que identifica um processo específico rodando no sistema." },
  { term: "PPID", def: "O PID do processo 'pai' que criou esse processo." },
  { term: "Processo órfão", def: "Um processo cujo pai foi encerrado, e que passou a ser adotado pelo processo init (PID 1)." },
  { term: "Processo zumbi", def: "Um processo que já terminou, mas cujo status ainda não foi 'coletado' pelo processo pai." },
  { term: "Escalonador", def: "A parte do sistema operacional que decide qual processo pronto vai usar o núcleo a seguir." },
  { term: "ARM", def: "Uma arquitetura RISC, usada em celulares e nos chips Apple Silicon (M1, M2, M3)." },
  { term: "x86", def: "Uma arquitetura CISC, usada pela maioria dos PCs e servidores tradicionais." },
  { term: "Núcleo CUDA", def: "O núcleo de processamento de uma GPU NVIDIA — simples e numeroso, seguindo uma filosofia próxima do RISC." },
];

function GlossarioBlitz2({ onFinish }) {
  const [deck] = useState(() => shuffle(GLOSS2));
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);

  const options = useMemo(() => {
    if (idx >= deck.length) return [];
    const wrongDefs = shuffle(GLOSS2.filter((g) => g.term !== deck[idx].term)).slice(0, 3).map((g) => g.def);
    return shuffle([deck[idx].def, ...wrongDefs]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  function choose(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === deck[idx].def) setScore((s) => s + 1);
    setTimeout(() => { setPicked(null); setIdx((i) => i + 1); }, 650);
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
    <GameShell title="Glossário Blitz — Aula 2" color={theme.teal} onExit={() => onFinish(0)}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.textOnDark }}>{idx + 1} / {deck.length}</span>
        <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber }}>acertos: {score}</span>
      </div>
      <ProgressBar value={idx} max={deck.length} color={theme.teal} />
      <div style={{ textAlign: "center", margin: "26px 0" }}>
        <span style={{ fontFamily: fontMono, fontSize: 22, fontWeight: 700, color: theme.amber }}>{q.term}</span>
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
/* TOP NAV + HUB                                                 */
/* ============================================================ */

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

const GAMES = [
  { id: "simdmimd", title: "SIMD ou MIMD?", desc: "24 cenários em 3 níveis de dificuldade — dos óbvios aos bem sutis.", time: "~8 min", color: theme.teal, icon: Workflow, comp: SimdOuMimd },
  { id: "risccisc", title: "RISC ou CISC?", desc: "24 itens: processadores reais e características de design.", time: "~8 min", color: theme.copper, icon: GitCommit, comp: RiscOuCisc },
  { id: "pipeline", title: "Pipeline Rush", desc: "Calcule em qual estágio uma instrução está, ciclo a ciclo.", time: "~9 min", color: theme.copper, icon: Layers, comp: PipelineRush },
  { id: "detetiveproc", title: "Detetive de Processos", desc: "16 casos investigativos com ps aux e top — estados, zumbis, órfãos.", time: "~12 min", color: theme.teal, icon: Search, comp: DetetiveProcessos },
  { id: "glossario2", title: "Glossário Blitz — Aula 2", desc: "30 termos novos: SIMD, RISC, pipeline, processos e mais.", time: "~12 min", color: theme.amber, icon: Sparkles, comp: GlossarioBlitz2 },
];

export default function GpuGame2() {
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
        <TopNav active="aula2" />
        <Comp key={game.id} onFinish={(pts) => finishGame(game.id, pts)} />
      </div>
    );
  }

  return (
    <div style={{ background: theme.paper, minHeight: "100%" }}>
      <Fonts />
      <TopNav active="aula2" />
      <div style={{ background: theme.blueprint, padding: "40px 24px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.35, pointerEvents: "none",
          backgroundImage: `linear-gradient(${theme.blueprintLine}55 1px, transparent 1px), linear-gradient(90deg, ${theme.blueprintLine}55 1px, transparent 1px)`,
          backgroundSize: "36px 36px"
        }} />
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
          <div style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>
            UC1 · Aula 2 · Prática de fixação
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontWeight: 700, fontSize: 34, color: "#F4F1E8", marginBottom: 10 }}>GPU Game 2</h1>
          <p style={{ fontFamily: fontBody, fontSize: 16, color: theme.textOnDark, maxWidth: 580, marginBottom: 20 }}>
            5 minigames pra fixar SIMD, MIMD, RISC, CISC, Pipeline e Processos. Cerca de 45-50 minutos de jogo, no total.
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