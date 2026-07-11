import React, { useState } from "react";
import {
  Cpu,  Terminal, PlayCircle, ChevronDown, Check,
  Info, ArrowRight, FolderOpen, Settings2 
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

function PhotoCard({ src, alt, caption, credit, dark }) {
  return (
    <div style={{
      borderRadius: 10, overflow: "hidden", filter: "grayscale(1)",
      border: `0.5px solid ${dark ? theme.blueprintLine : theme.blueprintLine2 + "33"}`,
    }}>
      <img src={src} alt={alt} style={{ width: "100%", display: "block", aspectRatio: "4/3", objectFit: "cover" }} />
      <div style={{ background: theme.ink, padding: "8px 10px" }}>
        <div style={{ fontFamily: fontMono, fontSize: 10.5, color: theme.textOnDark }}>{caption}</div>
        {credit && <div style={{ fontFamily: fontMono, fontSize: 9, color: "#5B6472", marginTop: 2 }}>{credit}</div>}
      </div>
    </div>
  );
}

function NeumannDiagram() {
  return (
    <svg viewBox="0 0 560 200" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagrama da arquitetura Von Neumann: uma memória e um barramento único ligando à CPU">
      <rect x="20" y="70" width="150" height="60" rx="6" fill="none" stroke={theme.copper} strokeWidth="1.5" />
      <text x="95" y="95" textAnchor="middle" fontFamily={fontDisplay} fontSize="13" fill={theme.copper}>Memória</text>
      <text x="95" y="113" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.copper}>dados + instruções</text>

      <line x1="170" y1="100" x2="330" y2="100" stroke={theme.copper} strokeWidth="3" />
      <text x="250" y="88" textAnchor="middle" fontFamily={fontMono} fontSize="10" fill={theme.copper}>barramento único</text>

      <rect x="330" y="40" width="210" height="120" rx="6" fill="none" stroke={theme.copper} strokeWidth="1.5" />
      <text x="435" y="60" textAnchor="middle" fontFamily={fontDisplay} fontSize="13" fill={theme.copper}>CPU</text>
      <rect x="345" y="70" width="80" height="34" rx="4" fill="none" stroke={theme.copper} strokeWidth="1" />
      <text x="385" y="91" textAnchor="middle" fontFamily={fontMono} fontSize="9" fill={theme.copper}>Controle</text>
      <rect x="435" y="70" width="80" height="34" rx="4" fill="none" stroke={theme.copper} strokeWidth="1" />
      <text x="475" y="91" textAnchor="middle" fontFamily={fontMono} fontSize="9" fill={theme.copper}>ALU</text>
      <rect x="345" y="115" width="170" height="30" rx="4" fill="none" stroke={theme.copper} strokeWidth="1" />
      <text x="430" y="134" textAnchor="middle" fontFamily={fontMono} fontSize="9" fill={theme.copper}>Registradores</text>
    </svg>
  );
}

function HarvardDiagram() {
  return (
    <svg viewBox="0 0 560 220" style={{ width: "100%", height: "auto" }} role="img" aria-label="Diagrama da arquitetura Harvard: memórias e barramentos separados para dados e instruções">
      <rect x="10" y="30" width="150" height="50" rx="6" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="85" y="60" textAnchor="middle" fontFamily={fontDisplay} fontSize="12" fill={theme.teal}>Memória de instruções</text>

      <rect x="10" y="140" width="150" height="50" rx="6" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="85" y="170" textAnchor="middle" fontFamily={fontDisplay} fontSize="12" fill={theme.teal}>Memória de dados</text>

      <line x1="160" y1="55" x2="330" y2="80" stroke={theme.teal} strokeWidth="2.5" />
      <line x1="160" y1="165" x2="330" y2="115" stroke={theme.teal} strokeWidth="2.5" />
      <text x="220" y="45" fontFamily={fontMono} fontSize="9" fill={theme.teal}>caminho 1</text>
      <text x="220" y="195" fontFamily={fontMono} fontSize="9" fill={theme.teal}>caminho 2</text>

      <rect x="330" y="55" width="210" height="105" rx="6" fill="none" stroke={theme.teal} strokeWidth="1.5" />
      <text x="435" y="80" textAnchor="middle" fontFamily={fontDisplay} fontSize="13" fill={theme.teal}>CPU</text>
      <text x="435" y="100" textAnchor="middle" fontFamily={fontMono} fontSize="9" fill={theme.teal}>busca instrução e</text>
      <text x="435" y="114" textAnchor="middle" fontFamily={fontMono} fontSize="9" fill={theme.teal}>acessa dado ao mesmo tempo</text>
    </svg>
  );
}

function CoreGrid() {
  const gpuDots = Array.from({ length: 240 });
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
      <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: theme.copperDark, marginBottom: 4 }}>CPU — 8 professores de doutorado</div>
        <div style={{ fontFamily: fontBody, fontSize: 13, color: theme.textMuted, marginBottom: 14 }}>poucos, mas resolvem qualquer coisa complexa</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ aspectRatio: "1", background: theme.copperBg, border: `1px solid ${theme.copper}`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Cpu size={18} color={theme.copperDark} />
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 20 }}>
        <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: theme.tealDark, marginBottom: 4 }}>GPU — 5.000 alunos do 6º ano</div>
        <div style={{ fontFamily: fontBody, fontSize: 13, color: theme.textMuted, marginBottom: 14 }}>cada quadradinho representa ~21 alunos</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(24, 1fr)", gap: 2 }}>
          {gpuDots.map((_, i) => (
            <div key={i} style={{ aspectRatio: "1", background: theme.teal, borderRadius: 1.5 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipSpaceBar() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 8 }}>
      {[
        { label: "CPU", sub: "espaço do chip", cache: 55, calc: 30, ctrl: 15, color: theme.copper, bg: theme.copperBg, dark: theme.copperDark },
        { label: "GPU", sub: "espaço do chip", cache: 10, calc: 82, ctrl: 8, color: theme.teal, bg: theme.tealBg, dark: theme.tealDark },
      ].map((chip) => (
        <div key={chip.label} style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 20 }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15, color: chip.dark, marginBottom: 2 }}>{chip.label}</div>
          <div style={{ fontFamily: fontBody, fontSize: 13, color: theme.textMuted, marginBottom: 14 }}>{chip.sub}</div>
          <div style={{ display: "flex", height: 28, borderRadius: 6, overflow: "hidden" }}>
            <div style={{ width: `${chip.cache}%`, background: chip.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fontMono, fontSize: 9.5, color: chip.dark }}>{chip.cache}%</span>
            </div>
            <div style={{ width: `${chip.calc}%`, background: chip.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fontMono, fontSize: 9.5, color: "#fff" }}>{chip.calc}%</span>
            </div>
            <div style={{ width: `${chip.ctrl}%`, background: theme.ink, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: fontMono, fontSize: 9, color: "#fff" }}>{chip.ctrl}%</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 10, fontFamily: fontMono, fontSize: 10.5, color: theme.textMuted, flexWrap: "wrap" }}>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: chip.bg, marginRight: 4, border: `1px solid ${chip.dark}` }} />cache</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: chip.color, marginRight: 4 }} />cálculo (ALUs)</span>
            <span><span style={{ display: "inline-block", width: 8, height: 8, background: theme.ink, marginRight: 4 }} />controle</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DiagramLegend({ items, color, bg, text }) {
  return (
    <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
      {items.map((item) => (
        <div key={item.term} style={{ display: "flex", gap: 12, background: bg, borderRadius: 8, padding: "12px 14px" }}>
          <span style={{ fontFamily: fontMono, fontSize: 12.5, fontWeight: 500, color: color, flexShrink: 0, minWidth: 118 }}>{item.term}</span>
          <span style={{ fontFamily: fontBody, fontSize: 14, color: text, lineHeight: 1.6 }}>{item.desc}</span>
        </div>
      ))}
    </div>
  );
}

const SMI_FIELDS = {
  driver: { label: "Driver Version", desc: "Um driver é um 'tradutor': um programinha que faz o sistema operacional conseguir conversar com uma peça de hardware específica — nesse caso, a placa de vídeo. Sem ele, o computador nem enxergaria a GPU direito. Esse número é só a versão desse tradutor instalada na máquina do Colab — raramente você vai precisar se preocupar com isso." },
  cuda: { label: "CUDA Version", desc: "CUDA é um conjunto de ferramentas criado pela própria NVIDIA que permite que programas — como o PyTorch, que vamos usar nos exercícios — mandem tarefas de cálculo direto pra GPU processar. Sem o CUDA instalado, o Python simplesmente não saberia como 'falar' com a GPU. Esse número é só a versão dele." },
  gpuIndex: { label: "GPU (índice)", desc: "O número que identifica essa placa de vídeo dentro do sistema. Um computador pode ter várias GPUs; cada uma recebe um número, começando do 0. Como o Colab te dá acesso a só uma GPU por vez, esse número é sempre 0." },
  name: { label: "Name", desc: "O modelo da placa de vídeo que o Colab sorteou pra você nessa sessão — aqui, uma Tesla T4, um modelo de GPU pensado especificamente pra tarefas de Inteligência Artificial (e não pra rodar jogos, por exemplo)." },
  persistence: { label: "Persistence-M", desc: "'Modo de persistência'. Quando nenhum programa está usando a GPU, ela pode ficar 'ligada e pronta', esperando a próxima tarefa (persistência ligada), ou 'desligar e liberar tudo' até ser chamada de novo (persistência em Off — o padrão do Colab). Isso só muda o tempo que a GPU leva pra começar a trabalhar; não muda o resultado dos seus cálculos." },
  busid: { label: "Bus-Id", desc: "Lembra do barramento que vimos lá em cima — aquele 'caminho' por onde a informação viaja dentro do computador? Esse código é tipo o endereço de rua da GPU dentro desse caminho: a posição exata onde ela está conectada fisicamente na placa-mãe. Você não precisa decifrar o formato do número — ele só serve pra identificar, sem confusão, qual peça de hardware é aquela, caso existisse mais de uma GPU no mesmo computador." },
  dispa: { label: "Disp.A", desc: "'Display Active' — se essa GPU está, nesse exato momento, mandando imagem pra algum monitor físico conectado nela. No Colab é sempre 'Off', porque o computador que está rodando sua GPU é um servidor do Google guardado num galpão gigante de máquinas (chamado data center) — sem teclado, sem mouse e sem monitor. Você só acessa ele pela internet." },
  ecc: { label: "Volatile Uncorr. ECC", desc: "ECC é uma tecnologia de memória capaz de perceber (e às vezes corrigir sozinha) pequenos erros que acontecem naturalmente ao guardar informação eletronicamente. Esse número conta quantos erros aconteceram que a memória NÃO conseguiu corrigir sozinha. Em 0, está tudo saudável — nenhum erro desse tipo rolou." },
  fan: { label: "Fan", desc: "A velocidade do cooler (a ventoinha que resfria a GPU), em porcentagem da velocidade máxima dela. Aparece 'N/A' (não disponível) no Colab porque, de novo, você está usando um computador remoto — essa leitura de hardware físico não chega até a sua tela." },
  temp: { label: "Temp", desc: "A temperatura do chip agora, em graus Celsius. Quanto mais a GPU trabalha, mais ela esquenta — por isso essa é uma das primeiras coisas que vale acompanhar enquanto um cálculo pesado está rodando." },
  perf: { label: "Perf", desc: "O 'estado de energia' da GPU nesse momento, numa escala que vai de P0 (rodando no máximo da capacidade) até P12 (quase hibernando, economizando energia ao extremo). Isso é escolhido automaticamente pela própria GPU, dependendo de quanto trabalho ela tem pra fazer a cada instante." },
  pwr: { label: "Pwr:Usage/Cap", desc: "Quanta energia elétrica a GPU está consumindo agora (Usage), comparado ao máximo que ela tem permissão de consumir (Cap, de 'capacidade' — o teto de segurança definido pelo fabricante). Watt (W) é só a unidade que medimos energia elétrica. Uma GPU trabalhando pesado consome bem mais watts do que uma parada." },
  mem: { label: "Memory-Usage", desc: "Quanto da VRAM está sendo usado agora, sobre o total disponível. VRAM é uma memória especial que existe só dentro da própria placa de vídeo — bem diferente da memória RAM comum do resto do computador — e é onde a GPU guarda os dados que está processando naquele momento (por exemplo, as matrizes de números de uma rede neural)." },
  util: { label: "GPU-Util", desc: "O quanto a GPU está 'suando' agora, em porcentagem. 0% significa que ela está parada, sem nada pra calcular. Perto de 100% significa que ela está trabalhando no limite máximo da capacidade dela, sem folga nenhuma." },
  computeM: { label: "Compute M.", desc: "O 'modo de compartilhamento' da GPU. Um processo é, de forma simples, um programa rodando no computador nesse momento — por exemplo, o seu notebook do Colab, enquanto está executando código, é um processo. No modo 'Default' (o mais comum, e o único que você vai encontrar no Colab), vários processos diferentes conseguem usar a mesma GPU ao mesmo tempo, sem que um trave o outro." },
  migM: { label: "MIG M.", desc: "'Multi-Instance GPU': uma tecnologia que permite fatiar uma GPU cara e potente em várias 'GPUs menores' independentes, cada uma dedicada a uma pessoa ou tarefa diferente — parecido com dividir uma pizza grande em pedaços pra várias pessoas comerem ao mesmo tempo, cada uma com o seu. A GPU T4 do Colab não tem esse recurso ligado, por isso aparece sempre 'N/A' (não se aplica)." },
  procGpu: { label: "GPU (processo)", desc: "A mesma ideia do índice lá de cima, mas agora do ponto de vista do processo: diz qual GPU esse programa específico está usando. Como só existe a GPU 0 no Colab, esse número é sempre 0." },
  gi: { label: "GI ID", desc: "'Group Instance ID'. Esse número só existe de fato quando a GPU está fatiada com a tecnologia MIG que acabamos de explicar (a 'pizza dividida'). Como a T4 do Colab não usa MIG, esse campo sempre aparece como N/A — não se aplica aqui." },
  ci: { label: "CI ID", desc: "'Compute Instance ID' — a mesma lógica do GI ID, também relacionada ao MIG. Sem MIG (como no Colab), esse campo também aparece sempre como N/A." },
  pid: { label: "PID", desc: "'Process Identifier' (Identificador de Processo). Lembra que explicamos que um processo é um programa rodando no computador? O sistema operacional dá um número único pra cada processo em execução, só pra conseguir controlar e diferenciar cada um deles — mesmo que dois processos sejam do mesmo programa. Esse é o número do processo do seu notebook Python nesse momento." },
  type: { label: "Type", desc: "O tipo de trabalho que esse processo está pedindo da GPU. 'C' significa Compute — cálculo matemático puro, como treinar uma rede neural (que é exatamente o nosso caso). Existe também o tipo 'G' (Graphics), usado quando a GPU está desenhando uma imagem numa tela — o que não acontece aqui, já que o Colab não tem monitor." },
  procname: { label: "Process name", desc: "O caminho, dentro do sistema de arquivos, de onde está guardado o programa que está usando a GPU agora. Aqui aparece o caminho até o Python, porque é o Python — rodando por trás do seu notebook Colab — quem está mandando os comandos pra GPU calcular." },
  procmem: { label: "GPU Memory Usage", desc: "Quanta VRAM esse processo específico está ocupando — nesse caso, o Python do seu notebook, que criou as matrizes/tensores que estão guardados na memória da GPU nesse momento." },
};

function tokenize(line, tokens) {
  const segments = [];
  let remaining = line;
  tokens.forEach(({ text, key }) => {
    const idx = remaining.indexOf(text);
    if (idx === -1) return;
    if (idx > 0) segments.push(remaining.slice(0, idx));
    segments.push({ text, key });
    remaining = remaining.slice(idx + text.length);
  });
  segments.push(remaining);
  return segments;
}

function SmiRow({ line, tokens, active, setActive }) {
  const segments = tokens ? tokenize(line, tokens) : [line];
  return (
    <div style={{ whiteSpace: "pre", fontFamily: fontMono, fontSize: 11.5, lineHeight: 1.55, color: "#9AA5B8" }}>
      {segments.map((seg, i) =>
        typeof seg === "string" ? (
          <span key={i}>{seg}</span>
        ) : (
          <span
            key={i}
            onClick={() => setActive(seg.key)}
            style={{
              cursor: "pointer",
              background: active === seg.key ? theme.amber : "transparent",
              color: active === seg.key ? theme.ink : "#E4E8F1",
            }}
          >
            {seg.text}
          </span>
        )
      )}
    </div>
  );
}

function NvidiaSmiPanel() {
  const [active, setActive] = useState("util");

  const L = {
    b1: "+-----------------------------------------------------------------------------------------+",
    l2: "| NVIDIA-SMI 580.82.07              Driver Version: 580.82.07      CUDA Version: 13.0     |",
    b3: "+-----------------------------------------+------------------------+----------------------+",
    l4: "| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |",
    l5: "| Fan  Temp   Perf          Pwr:Usage/Cap |           Memory-Usage | GPU-Util  Compute M. |",
    l6: "|                                         |                        |               MIG M. |",
    b7: "|=========================================+========================+======================|",
    l8: "|   0  Tesla T4                       Off |   00000000:00:04.0 Off |                    0 |",
    l9: "| N/A   71C    P0             33W /   70W |    1665MiB /  15360MiB |      0%      Default |",
    l10: "|                                         |                        |                  N/A |",
    b11: "+-----------------------------------------+------------------------+----------------------+",
    b12: "+-----------------------------------------------------------------------------------------+",
    l13: "| Processes:                                                                              |",
    l14: "|  GPU   GI   CI              PID   Type   Process name                        GPU Memory |",
    l15: "|        ID   ID                                                               Usage      |",
    b16: "|=========================================================================================|",
    l17: "|    0   N/A  N/A            1045      C   /usr/bin/python3                       1662MiB |",
    b18: "+-----------------------------------------------------------------------------------------+",
  };

  const T = {
    l2: [{ text: "580.82.07", key: "driver" }, { text: "13.0", key: "cuda" }],
    l4: [{ text: "GPU  Name", key: "name" }, { text: "Persistence-M", key: "persistence" }, { text: "Bus-Id", key: "busid" }, { text: "Disp.A", key: "dispa" }, { text: "Volatile Uncorr. ECC", key: "ecc" }],
    l5: [{ text: "Fan", key: "fan" }, { text: "Temp", key: "temp" }, { text: "Perf", key: "perf" }, { text: "Pwr:Usage/Cap", key: "pwr" }, { text: "Memory-Usage", key: "mem" }, { text: "GPU-Util", key: "util" }, { text: "Compute M.", key: "computeM" }],
    l6: [{ text: "MIG M.", key: "migM" }],
    l8: [{ text: "0", key: "gpuIndex" }, { text: "Tesla T4", key: "name" }, { text: "Off", key: "persistence" }, { text: "00000000:00:04.0", key: "busid" }, { text: "Off", key: "dispa" }, { text: "0", key: "ecc" }],
    l9: [{ text: "N/A", key: "fan" }, { text: "71C", key: "temp" }, { text: "P0", key: "perf" }, { text: "33W /   70W", key: "pwr" }, { text: "1665MiB /  15360MiB", key: "mem" }, { text: "0%", key: "util" }, { text: "Default", key: "computeM" }],
    l10: [{ text: "N/A", key: "migM" }],
    l14: [{ text: "GPU", key: "procGpu" }, { text: "GI", key: "gi" }, { text: "CI", key: "ci" }, { text: "PID", key: "pid" }, { text: "Type", key: "type" }, { text: "Process name", key: "procname" }, { text: "GPU Memory", key: "procmem" }],
    l15: [{ text: "ID", key: "gi" }, { text: "ID", key: "ci" }, { text: "Usage", key: "procmem" }],
    l17: [{ text: "0", key: "procGpu" }, { text: "N/A", key: "gi" }, { text: "N/A", key: "ci" }, { text: "1045", key: "pid" }, { text: "C", key: "type" }, { text: "/usr/bin/python3", key: "procname" }, { text: "1662MiB", key: "procmem" }],
  };

  const dim = { whiteSpace: "pre", fontFamily: fontMono, fontSize: 11.5, lineHeight: 1.55, color: "#5B6472" };

  return (
    <div style={{ background: theme.ink, borderRadius: 10, border: `0.5px solid ${theme.blueprintLine}`, overflow: "hidden" }}>
      <div style={{ padding: "14px 18px", fontFamily: fontMono, fontSize: 11.5, color: "#8892A6", borderBottom: `0.5px solid ${theme.blueprintLine}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span>saída do comando <span style={{ color: theme.amber }}>!nvidia-smi</span> no Google Colab</span>
        <span style={{ fontSize: 10.5, opacity: 0.7 }}>clique nos termos coloridos ↓</span>
      </div>
      <div style={{ padding: "18px 18px 4px", overflowX: "auto" }}>
        <div style={dim}>{L.b1}</div>
        <SmiRow line={L.l2} tokens={T.l2} active={active} setActive={setActive} />
        <div style={dim}>{L.b3}</div>
        <SmiRow line={L.l4} tokens={T.l4} active={active} setActive={setActive} />
        <SmiRow line={L.l5} tokens={T.l5} active={active} setActive={setActive} />
        <SmiRow line={L.l6} tokens={T.l6} active={active} setActive={setActive} />
        <div style={dim}>{L.b7}</div>
        <SmiRow line={L.l8} tokens={T.l8} active={active} setActive={setActive} />
        <SmiRow line={L.l9} tokens={T.l9} active={active} setActive={setActive} />
        <SmiRow line={L.l10} tokens={T.l10} active={active} setActive={setActive} />
        <div style={dim}>{L.b11}</div>
        <div style={dim}>&nbsp;</div>
        <div style={dim}>{L.b12}</div>
        <div style={dim}>{L.l13}</div>
        <SmiRow line={L.l14} tokens={T.l14} active={active} setActive={setActive} />
        <SmiRow line={L.l15} tokens={T.l15} active={active} setActive={setActive} />
        <div style={dim}>{L.b16}</div>
        <SmiRow line={L.l17} tokens={T.l17} active={active} setActive={setActive} />
        <div style={dim}>{L.b18}</div>
      </div>
      <div style={{ padding: "6px 18px 18px" }}>
        <div style={{ fontFamily: fontBody, fontSize: 14, color: "#DCE1EC", lineHeight: 1.6, background: "#1B2947", padding: "12px 14px", borderRadius: 6, border: `0.5px solid ${theme.blueprintLine}` }}>
          <strong style={{ color: theme.amber, fontWeight: 500 }}>{SMI_FIELDS[active].label}:</strong> {SMI_FIELDS[active].desc}
        </div>
      </div>
    </div>
  );
}

/* ---------- Colab mockup ---------- */

function ColabMockup() {
  return (
    <div style={{ background: "#fff", borderRadius: 10, border: `0.5px solid ${theme.blueprintLine2}33`, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
      <div style={{ background: "#F8F9FA", padding: "10px 16px", borderBottom: "1px solid #E4E6EA", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E4E6EA" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E4E6EA" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", background: "#E4E6EA" }} />
        </div>
        <span style={{ fontFamily: fontDisplay, fontSize: 12.5, color: "#444" }}>colab.research.google.com</span>
      </div>
      <div style={{ padding: "14px 16px", borderBottom: "1px solid #E4E6EA", display: "flex", gap: 18, fontFamily: fontDisplay, fontSize: 12.5, color: "#5B6472" }}>
        <span>Arquivo</span><span>Editar</span><span>Exibir</span><span>Inserir</span>
        <span style={{ background: theme.amberBg, color: theme.amberDark, padding: "2px 8px", borderRadius: 4, fontWeight: 500 }}>Ambiente de execução</span>
        <span>Ferramentas</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ background: "#F8F9FA", border: "1px solid #E4E6EA", borderRadius: 8, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <PlayCircle size={20} color={theme.tealDark} />
          <span style={{ fontFamily: fontMono, fontSize: 12.5, color: "#333" }}>!nvidia-smi</span>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ background: theme.ink, color: "#fff", fontFamily: fontDisplay, fontSize: 11.5, padding: "8px 14px", borderRadius: 6, display: "flex", alignItems: "center", gap: 6 }}>
            <Settings2 size={13} /> Alterar tipo de ambiente de execução
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Exercises ---------- */

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
              <span style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.textMuted, lineHeight: 1.6 }}>
                Repara que isso ainda não é "programar" em Python — é um comando de terminal (Linux) pronto, chamado direto de dentro da célula com um <code style={{ fontFamily: fontMono }}>!</code> na frente. A gente ainda não escreveu nenhuma linha de código nosso aqui.
              </span>
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
              <div style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>Pra responder</div>
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

const navItems = [
  { id: "hook", label: "O gancho" },
  { id: "von-neumann", label: "Von Neumann" },
  { id: "harvard", label: "Harvard" },
  { id: "cpu-gpu", label: "CPU x GPU" },
  { id: "nvidia-smi", label: "nvidia-smi" },
  { id: "colab", label: "Google Colab" },
  { id: "exercicios", label: "Exercícios" },
];

function Nav() {
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10, background: theme.blueprint,
      borderBottom: `0.5px solid ${theme.blueprintLine}`, padding: "0 24px",
      display: "flex", alignItems: "center", gap: 20, overflowX: "auto"
    }}>
      <span style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 13, color: theme.amber, padding: "14px 0", whiteSpace: "nowrap" }}>UC1 · AULA 1</span>
      {navItems.map((it) => (
        <a key={it.id} href={`#${it.id}`} style={{
          fontFamily: fontMono, fontSize: 12, color: theme.textOnDark, textDecoration: "none",
          padding: "14px 0", whiteSpace: "nowrap", opacity: 0.85
        }}>{it.label}</a>
      ))}
    </div>
  );
}

/* ---------- Main ---------- */

export default function App() {
  return (
    <div style={{ background: theme.paper, minHeight: "100%" }}>
      <Fonts />
      <Nav />

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
            Como um computador pensa <span style={{ color: theme.amber }}>(e por que isso importa pra IA)</span>
          </h1>
          <P dark style={{ fontSize: 18.5, maxWidth: 600 }}>
            Antes de treinar qualquer rede neural, existe uma pergunta mais fundamental escondida por baixo de tudo:
          </P>
          <div style={{ borderLeft: `3px solid ${theme.amber}`, paddingLeft: 20, margin: "28px 0" }}>
            <p style={{ fontFamily: fontBody, fontStyle: "italic", fontSize: 22, lineHeight: 1.5, color: "#F4F1E8" }}>
              "Por que treinar uma Inteligência Artificial sem GPU pode levar dias inteiros, e com GPU leva só algumas horas?"
            </p>
          </div>
          <P dark style={{ fontSize: 16, color: theme.textOnDark }}>
            É essa pergunta que guia essa aula inteira. E a resposta começa lá dentro do chip — no jeito como um computador é organizado por dentro.
          </P>
        </div>
      </Section>

      {/* POR QUE HARDWARE */}
      <Section>
        <Eyebrow color={theme.copper}>Antes de começar</Eyebrow>
        <H2>Por que estudar hardware, se o curso é de IA?</H2>
        <P>
          Pensa assim: antes de aprender a pilotar um carro de corrida, ajuda saber como um motor funciona. Você não precisa virar mecânico — mas entender por que um motor mais potente anda mais rápido muda completamente a forma como você pilota.
        </P>
        <P>
          É a mesma coisa aqui. Toda Inteligência Artificial — por mais "mágica" que pareça de fora — no final das contas é só um computador fazendo uma quantidade <em>absurda</em> de continhas de matemática. E quem faz essas continhas, fisicamente, é a <Term>CPU</Term> e a <Term>GPU</Term>.
        </P>
        <P>
          Sem entender como esse hardware funciona, muita coisa que vem depois no curso (tipo por que Machine Learning é tão mais rápido em GPU) vira decoreba, sem compreensão real do porquê.
        </P>
      </Section>

      {/* VON NEUMANN */}
      <Section dark id="von-neumann">
        <Eyebrow>Parte 1 — duas formas de organizar um computador</Eyebrow>
        <H2 dark>Von Neumann: o computador "de uma pista só"</H2>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
          <div style={{ flex: "1 1 380px", minWidth: 280 }}>
            <P dark>
              Imagina uma cozinha pequena, com uma única bancada. Nela, o cozinheiro tanto guarda os ingredientes quanto lê a receita — só que ele só consegue fazer uma coisa de cada vez: ou pega um ingrediente, ou lê o próximo passo. Nunca os dois ao mesmo tempo, porque só existe uma bancada.
            </P>
            <P dark>
              Essa é a <strong style={{ color: "#F4F1E8" }}>Arquitetura Von Neumann</strong>, descrita em 1945 pelo matemático John von Neumann. É o modelo por trás de praticamente todo computador comum — seu notebook, seu celular, o servidor de qualquer empresa.
            </P>
          </div>
          <div style={{
            flex: "0 0 160px", borderRadius: 10, overflow: "hidden",
            border: `0.5px solid ${theme.blueprintLine}`, filter: "grayscale(1)"
          }}>
            <img
              src="https://commons.wikimedia.org/wiki/Special:FilePath/JohnvonNeumann-LosAlamos.jpg"
              alt="Retrato de John von Neumann"
              style={{ width: "100%", display: "block" }}
            />
            <div style={{ background: theme.ink, padding: "8px 10px", fontFamily: fontMono, fontSize: 10.5, color: theme.textOnDark }}>
              John von Neumann (1903–1957)
            </div>
          </div>
        </div>

        <div style={{ background: "#101E38", borderRadius: 12, padding: 24, marginTop: 20, marginBottom: 8 }}>
          <NeumannDiagram />
        </div>
        <DiagramLegend
          color={theme.amber}
          bg="#101E38"
          text={theme.textOnDark}
          items={[
            { term: "Memória", desc: "onde tudo fica guardado: tanto as instruções (a 'receita', o programa) quanto os dados (os 'ingredientes', os números que a receita usa)." },
            { term: "Barramento único", desc: "o caminho físico — fios numa placa de circuito — por onde as informações trafegam entre a memória e a CPU. Como só existe um caminho, só passa uma coisa de cada vez." },
            { term: "Unidade de Controle", desc: "o 'gerente' da CPU. Não faz conta nenhuma — só decide a ordem certa de executar cada instrução do programa, uma de cada vez." },
            { term: "ALU (Unidade Lógica e Aritmética)", desc: "quem realmente 'põe a mão na massa': faz as contas (soma, subtração, multiplicação) e as comparações lógicas (tipo 'esse número é maior que aquele?')." },
            { term: "Registradores", desc: "pequenos 'bolsos' de memória, minúsculos mas extremamente rápidos, dentro da própria CPU — guardam, por um instante, o número que a ALU está usando bem naquela hora, pra não precisar buscar na memória principal (mais devagar) toda vez." },
          ]}
        />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24, marginBottom: 8 }}>
          <div style={{ background: "#101E38", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: theme.amber, marginBottom: 6 }}>Vantagem</div>
            <P dark style={{ fontSize: 14.5, marginBottom: 0 }}>Simples e barato de projetar: um único tipo de memória, um único caminho.</P>
          </div>
          <div style={{ background: "#101E38", borderRadius: 10, padding: "16px 18px" }}>
            <div style={{ fontFamily: fontDisplay, fontSize: 13, fontWeight: 600, color: theme.copper, marginBottom: 6 }}>Problema — o "gargalo"</div>
            <P dark style={{ fontSize: 14.5, marginBottom: 0 }}>Como só existe uma bancada, o processador nunca busca uma instrução nova e lê/escreve um dado ao mesmo tempo. Trava o ritmo.</P>
          </div>
        </div>
      </Section>

      {/* HARVARD */}
      <Section id="harvard">
        <Eyebrow color={theme.teal}>Parte 1 — continuação</Eyebrow>
        <H2>Harvard: o computador "de duas pistas"</H2>
        <P>
          Agora imagina a mesma cozinha, só que com <strong>duas bancadas separadas</strong>: uma só pra ingredientes, outra só pra receita. Agora o cozinheiro pega um ingrediente com uma mão e lê a receita com a outra, ao mesmo tempo. Mais rápido.
        </P>
        <P>
          Essa é a <strong>Arquitetura Harvard</strong>: dados e instruções ficam em memórias separadas, cada uma com seu próprio caminho. É usada em coisas mais simples e especializadas — como um Arduino — e, principalmente pro nosso curso, é também a <em>filosofia</em> por trás de como as GPUs modernas foram desenhadas.
        </P>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 8 }}>
          <div style={{ flex: "1 1 380px", minWidth: 280 }}>
            <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: 24 }}>
              <HarvardDiagram />
            </div>
          </div>
          <div style={{ flex: "0 0 160px" }}>
            <PhotoCard
              src="https://commons.wikimedia.org/wiki/Special:FilePath/Arduino%20Uno%20-%20R3.jpg"
              alt="Fotografia de uma placa Arduino Uno"
              caption="Um Arduino Uno"
              credit="foto: Wikimedia Commons"
            />
          </div>
        </div>
        <DiagramLegend
          color={theme.tealDark}
          bg={theme.tealBg}
          text="#1B4640"
          items={[
            { term: "Memória de instruções", desc: "guarda só a 'receita' — a sequência de comandos que o programa vai executar. Tem seu próprio caminho exclusivo até a CPU." },
            { term: "Memória de dados", desc: "guarda só os 'ingredientes' — os números e informações sobre os quais as instruções vão operar. Tem outro caminho, separado do primeiro." },
            { term: "Caminho 1 e caminho 2", desc: "dois barramentos independentes (dois 'fios' diferentes). Um leva instrução, o outro leva dado — e os dois podem estar sendo usados ao mesmo tempo, sem fila." },
          ]}
        />
        <div style={{ marginTop: 16 }} />
        <div style={{ display: "flex", gap: 10, background: theme.tealBg, borderRadius: 8, padding: "14px 16px" }}>
          <Info size={17} color={theme.tealDark} style={{ flexShrink: 0, marginTop: 2 }} />
          <P style={{ margin: 0, fontSize: 14.5, color: theme.tealDark }}>
            Curiosidade: até os processadores comuns (Von Neumann) roubam um pouco dessa ideia na memória mais rápida deles (o cache L1), separando fisicamente onde guardam dado de onde guardam instrução — só pra ganhar um pouco dessa velocidade extra.
          </P>
        </div>
      </Section>

      {/* CPU vs GPU */}
      <Section dark id="cpu-gpu">
        <Eyebrow>Parte 2 — a diferença que importa pra IA</Eyebrow>
        <H2 dark>CPU x GPU: 8 professores contra 5.000 alunos</H2>
        <P dark>
          Imagina uma prova com <strong style={{ color: "#F4F1E8" }}>5.000 continhas de somar</strong> (tipo "4 + 7", "12 + 3"...).
        </P>
        <P dark>
          A <Term>CPU</Term> é como <strong style={{ color: "#F4F1E8" }}>8 professores de matemática com doutorado</strong>: cada um resolve qualquer coisa, de continha simples a equação complicada — mas são só 8 pessoas. A <Term>GPU</Term> é como <strong style={{ color: "#F4F1E8" }}>5.000 alunos do 6º ano</strong>: cada um, sozinho, só sabe fazer continha simples — mas são 5.000 fazendo ao mesmo tempo.
        </P>
        <div style={{ background: theme.paperCard, borderRadius: 14, padding: 20, marginTop: 8 }}>
          <CoreGrid />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <PhotoCard
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Cpu.jpg"
            alt="Fotografia de um processador (CPU) real"
            caption="Uma CPU de verdade"
            credit="foto: Wikimedia Commons"
          />
          <PhotoCard
            src="https://commons.wikimedia.org/wiki/Special:FilePath/ASUS%20NVIDIA%20GeForce%20210%20silent%20graphics%20card%20with%20HDMI.JPG"
            alt="Fotografia de uma placa de vídeo (GPU) real"
            caption="Uma GPU de verdade (placa de vídeo)"
            credit="foto: Wikimedia Commons"
          />
        </div>
        <P dark style={{ marginTop: 24 }}>
          Treinar uma rede neural é, na prática, fazer uma quantidade gigantesca de contas simples repetidas — multiplicações de matrizes. É exatamente a prova das 5.000 continhas. Por isso a GPU "voa" nessa tarefa específica.
        </P>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 1, background: theme.blueprintLine, borderRadius: 10, overflow: "hidden", marginTop: 24, marginBottom: 8 }}>
          {[
            { label: "Trabalhadores", cpu: "Poucos, cada um muito esperto", gpu: "Milhares, cada um simples" },
            { label: "Boa em", cpu: "Decisões complexas, uma de cada vez", gpu: "Repetir a mesma continha, em massa" },
            { label: "Papel na IA", cpu: "Gerencia o sistema todo", gpu: "Faz o treino pesado da rede neural" },
          ].map((row) => (
            <React.Fragment key={row.label}>
              <div style={{ background: theme.blueprint, padding: 14 }}>
                <div style={{ fontFamily: fontMono, fontSize: 10.5, color: theme.textOnDark, opacity: 0.7 }}>{row.label}</div>
              </div>
              <div style={{ background: theme.blueprint, padding: 14 }}>
                <div style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.copper }}>{row.cpu}</div>
              </div>
              <div style={{ background: theme.blueprint, padding: 14 }}>
                <div style={{ fontFamily: fontBody, fontSize: 13.5, color: theme.teal }}>{row.gpu}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginTop: 28, fontFamily: fontMono, fontSize: 12.5 }}>
          <div><span style={{ color: theme.amber }}>núcleo (core):</span> <span style={{ color: theme.textOnDark }}>um "trabalhador" dentro do processador</span></div>
          <div><span style={{ color: theme.amber }}>paralelismo:</span> <span style={{ color: theme.textOnDark }}>fazer várias coisas ao mesmo tempo</span></div>
          <div><span style={{ color: theme.amber }}>latência:</span> <span style={{ color: theme.textOnDark }}>tempo pra terminar UMA tarefa</span></div>
          <div><span style={{ color: theme.amber }}>throughput:</span> <span style={{ color: theme.textOnDark }}>total de tarefas terminadas num tempo</span></div>
        </div>
      </Section>

      {/* DE VERDADE, O QUE ISSO SIGNIFICA */}
      <Section>
        <Eyebrow color={theme.copper}>Tirando a analogia do papel</Eyebrow>
        <H2>Peraí — professores e alunos são o quê, de verdade?</H2>
        <P>
          Analogia é bom pra criar a intuição, mas só serve de verdade se a gente conseguir "traduzir" ela de volta pro hardware real. Então vamos responder direto:
        </P>

        <div style={{ display: "grid", gap: 14, marginTop: 8 }}>
          <div style={{ background: theme.paperCard, border: `1px solid ${theme.copper}33`, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15.5, color: theme.copperDark, marginBottom: 8 }}>
              Os "8 professores" — o que são, na vida real?
            </div>
            <P style={{ marginBottom: 0, fontSize: 15 }}>
              São os <strong>núcleos (cores) físicos</strong> da CPU — pedacinhos de silício, dentro do mesmo chip, cada um capaz de executar um programa inteiro sozinho, do começo ao fim, com direito a tomar decisões complexas ("se isso, então aquilo"). Um processador de notebook comum tem hoje entre 4 e 16 desses núcleos. Cada um é, literalmente, um "professor": completo, versátil, mas em pouca quantidade.
            </P>
          </div>

          <div style={{ background: theme.paperCard, border: `1px solid ${theme.teal}33`, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15.5, color: theme.tealDark, marginBottom: 8 }}>
              Os "5.000 alunos" — o que são, na vida real?
            </div>
            <P style={{ marginBottom: 0, fontSize: 15 }}>
              São os <strong>núcleos CUDA</strong> (o nome que a NVIDIA dá aos núcleos de uma GPU) — versões muito mais simples de núcleo, capazes basicamente só de multiplicar e somar números, sem tomar decisões complicadas. Só que existem aos milhares dentro do mesmo chip: a GPU T4 que o Colab te dá, por exemplo, tem <strong>2.560 núcleos CUDA</strong>. É a mesma ideia da CPU, só que trocando "poucos e espertos" por "muitíssimos e simples".
            </P>
          </div>

          <div style={{ background: theme.paperCard, border: `1px solid ${theme.copper}33`, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15.5, color: theme.copperDark, marginBottom: 8 }}>
              Se a CPU serve pra qualquer coisa, pra que serve a GPU então?
            </div>
            <P style={{ marginBottom: 0, fontSize: 15 }}>
              A GPU nasceu resolvendo um problema bem específico: desenhar milhões de pixels na tela, toda vez que uma imagem muda (jogos, vídeos). Calcular a cor de um pixel é uma continha simples — e a tela inteira precisa disso, repetido milhões de vezes, 60 vezes por segundo. Ou seja: desde o início, a GPU foi construída pra <strong>uma coisa só</strong> — repetir a mesma continha simples, em cima de uma quantidade gigantesca de dados diferentes, ao mesmo tempo. Anos depois, alguém percebeu que treinar uma rede neural é exatamente esse mesmo tipo de problema (só que a "continha" agora é matemática de rede neural, não cor de pixel) — e a GPU passou a ser usada pra IA também.
            </P>
          </div>

          <div style={{ background: theme.paperCard, border: `1px solid ${theme.teal}33`, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15.5, color: theme.tealDark, marginBottom: 8 }}>
              Se ela só sabe fazer coisa simples, a GPU é "burra"?
            </div>
            <P style={{ marginBottom: 0, fontSize: 15 }}>
              Não — ela é <strong>especialista</strong>, não burra. Pensa numa linha de produção de fábrica: um único operário que só sabe apertar um parafuso, o dia inteiro, não é "burro" — ele é extremamente eficiente naquilo, e a fábrica precisa de milhares dele trabalhando ao mesmo tempo pra montar um carro rápido. Só que essa mesma fábrica ainda precisa de um gerente (a CPU) pra decidir o que fazer, coordenar as etapas e resolver imprevistos. É exatamente por isso que um computador com GPU <em>continua tendo</em> uma CPU — a GPU nunca substitui a CPU, ela só assume a parte do trabalho que é "muita conta simples repetida", enquanto a CPU continua cuidando de tudo que exige decisão e coordenação.
            </P>
          </div>

          <div style={{ background: theme.paperCard, border: `1px solid ${theme.copper}33`, borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 15.5, color: theme.copperDark, marginBottom: 8 }}>
              Então pra que ela serve dentro da Inteligência Artificial, especificamente?
            </div>
            <P style={{ marginBottom: 0, fontSize: 15 }}>
              Uma rede neural, por dentro, é basicamente uma sequência gigantesca de multiplicações de matrizes (tabelas de números) — cada "neurônio" faz a mesma operação matemática simples (multiplicar entradas por pesos e somar), só que repetida milhões ou bilhões de vezes, pra cada dado de treino. Cada um dos milhares de núcleos CUDA da GPU pega um pedacinho dessa conta gigante e resolve ao mesmo tempo que todos os outros — em vez de resolver uma conta de cada vez (como a CPU faria), a GPU resolve milhares delas simultaneamente. É exatamente essa divisão de trabalho em massa que faz o treino de dias virar treino de horas.
            </P>
          </div>
        </div>
      </Section>
      <Section>
        <Eyebrow color={theme.copper}>Por dentro do chip</Eyebrow>
        <H2>Onde cada chip "gasta" seu espaço</H2>
        <P>
          Se você abrisse os dois chips e olhasse o espaço interno, veria uma diferença enorme de prioridade. A <Term>CPU</Term> reserva bastante espaço pra <strong>memória cache</strong> e pra sistemas de controle sofisticados.
        </P>
        <P>
          Cache é uma "gaveta" de memória pequena, mas extremamente rápida, encostada bem perto do processador — bem mais rápida (e mais cara de fabricar) do que a memória principal do computador. A ideia é simples: se a CPU acabou de usar um número, é bem provável que ela vá precisar dele de novo daqui a pouco. Em vez de ir buscar esse número lá na memória principal (um caminho mais longo e mais lento) toda vez, ela guarda uma cópia na cache, por perto, pra pegar rapidinho na próxima vez. É tipo deixar os temperos que você mais usa do lado do fogão, em vez de ir até a despensa toda hora.
        </P>
        <P>
          Já a <Term>GPU</Term> joga quase todo o espaço em <strong>ALUs</strong> — as "calculadoras" (o mesmo componente que vimos no diagrama da CPU, só que aqui replicado aos milhares). Ela abre mão de ter uma cache grande e sofisticada e aposta tudo em ter muita gente calculando ao mesmo tempo.
        </P>
        <ChipSpaceBar />
      </Section>

      {/* NVIDIA-SMI */}
      <Section dark id="nvidia-smi">
        <Eyebrow>Parte 3 — vendo a GPU trabalhar</Eyebrow>
        <H2 dark>O painel da GPU: nvidia-smi</H2>
        <P dark>
          O <Term>nvidia-smi</Term> é tipo o painel do carro da sua GPU: mostra o que está acontecendo com ela agora. É exatamente essa tabela cheia de letrinhas que aparece toda vez que você roda <Term>!nvidia-smi</Term> no Colab — clique em qualquer termo destacado pra entender o que ele significa.
        </P>
        <NvidiaSmiPanel />
      </Section>

      {/* COLAB */}
      <Section id="colab">
        <Eyebrow color={theme.teal}>Ferramenta de hoje</Eyebrow>
        <H2>O que é o Google Colab</H2>
        <P>
          Como nosso laboratório não tem placas de GPU física, vamos usar o <strong>Google Colab</strong>: um serviço gratuito do Google que empresta uma GPU na nuvem por um tempo, direto no navegador — sem instalar nada.
        </P>
        <div style={{ marginBottom: 20 }}>
          <PhotoCard
            src="https://commons.wikimedia.org/wiki/Special:FilePath/Google%20Data%20Center%2C%20The%20Dalles.jpg"
            alt="Fotografia de um data center do Google"
            caption="Um data center real do Google — é daqui que vem a 'nuvem'"
            credit="foto: Wikimedia Commons"
          />
        </div>
        <P style={{ fontSize: 14.5, color: theme.textMuted, marginTop: -8 }}>
          "GPU na nuvem" não é nada abstrato: é literalmente uma GPU física, ligada, dentro de um prédio como esse — só que em vez de estar debaixo da sua mesa, está guardada num galpão gigante do Google, e você acessa ela pela internet.
        </P>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <FolderOpen size={16} color={theme.tealDark} />
          <span style={{ fontFamily: fontMono, fontSize: 13, color: theme.tealDark }}>colab.research.google.com</span>
        </div>
        <ColabMockup />
        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: fontMono, fontSize: 11.5, color: theme.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 10 }}>Pra navegar por ele</div>
          {[
            { icon: PlayCircle, text: "Cada bloco cinza é uma célula de código. Clique no triângulo (▶) à esquerda pra rodar só aquela célula." },
            { icon: Settings2, text: `Vá em "Ambiente de execução → Alterar tipo de ambiente de execução → Acelerador de hardware → GPU (T4)" pra ligar a GPU no seu notebook.` },
            { icon: Terminal, text: `Comandos de terminal (Linux) rodam dentro de uma célula com um "!" na frente, tipo !nvidia-smi.` },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: theme.tealBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={15} color={theme.tealDark} />
                </div>
                <P style={{ margin: 0, fontSize: 15 }}>{item.text}</P>
              </div>
            );
          })}
        </div>
      </Section>

      {/* RESUMO */}
      <Section dark>
        <Eyebrow>Resumo rápido</Eyebrow>
        <div style={{ display: "grid", gap: 10 }}>
          {[
            "Von Neumann: um caminho só pra dado e instrução — simples, mas trava (gargalo).",
            "Harvard: caminhos separados — mais rápido, é a base filosófica da GPU.",
            "CPU: poucos núcleos fortes, ótima em tarefas complexas e sequenciais.",
            "GPU: milhares de núcleos simples, ótima em repetir contas simples em massa.",
            "nvidia-smi: o painel que mostra utilização, memória, temperatura e processos da GPU.",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Check size={16} color={theme.amber} style={{ flexShrink: 0, marginTop: 4 }} />
              <span style={{ fontFamily: fontBody, fontSize: 15.5, color: theme.textOnDark, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* EXERCÍCIOS */}
      <Section id="exercicios">
        <Eyebrow color={theme.amberDark}>Prática de hoje</Eyebrow>
        <H2>Exercícios — tudo no Google Colab</H2>
        <div style={{ display: "flex", gap: 10, background: theme.amberBg, borderRadius: 8, padding: "14px 16px", marginBottom: 28 }}>
          <Info size={17} color={theme.amberDark} style={{ flexShrink: 0, marginTop: 2 }} />
          <P style={{ margin: 0, fontSize: 14.5, color: theme.amberDark }}>
            Abra <strong>colab.research.google.com</strong>, crie um notebook novo e ligue a GPU (Ambiente de execução → Alterar tipo de ambiente de execução → GPU T4) antes de começar.
          </P>
        </div>

        <div style={{ background: theme.paperCard, border: `0.5px solid ${theme.blueprintLine2}22`, borderRadius: 12, padding: "22px 24px", marginBottom: 28 }}>
          <div style={{ fontFamily: fontDisplay, fontWeight: 600, fontSize: 17, color: theme.ink, marginBottom: 10 }}>
            Antes de começar: o que é Python, rapidinho?
          </div>
          <P style={{ fontSize: 15, marginBottom: 14 }}>
            Python é uma <strong>linguagem de programação</strong> — um jeito de escrever instruções pro computador executar, seguindo regras bem rígidas (diferente do português, o computador não perdoa erro de "gramática"). É a linguagem mais usada em Inteligência Artificial hoje, porque é relativamente fácil de ler (parece quase inglês comum) e tem muitas "caixas de ferramentas" prontas — chamadas de <strong>bibliotecas</strong> — pra tarefas de IA, como a que vamos usar aqui: o <Term>PyTorch</Term>.
          </P>
          <P style={{ fontSize: 15, marginBottom: 0 }}>
            Alguns termos que vão aparecer no código dos próximos exercícios, explicados antes de você encontrar eles:
          </P>
          <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
            {[
              { term: "import", desc: "pedir emprestada uma biblioteca pronta, feita por outra pessoa, pra poder usar ela no seu código. Tipo pegar uma caixa de ferramentas específica antes de começar a trabalhar." },
              { term: "variável", desc: "uma 'caixinha com nome' que guarda um valor (um número, um texto...) pra você usar de novo mais tarde, sem precisar repetir o valor toda hora. Em tamanho = 15000, tamanho é o nome da caixinha." },
              { term: "função (def)", desc: "um bloco de instruções que você empacota com um nome, pra poder 'chamar' (executar) inteiro depois, quantas vezes quiser, sem reescrever tudo de novo." },
              { term: "for (loop)", desc: "um jeito de repetir a mesma linha de código várias vezes, sem copiar e colar ela manualmente. for i in range(10): significa 'repita isso aqui 10 vezes'." },
              { term: "# (comentário)", desc: "qualquer linha começando com # é ignorada pelo Python — serve só pra gente humano deixar anotações explicando o código pra quem for ler depois." },
            ].map((t) => (
              <div key={t.term} style={{ display: "flex", gap: 12, background: theme.paper, borderRadius: 8, padding: "10px 12px" }}>
                <code style={{ fontFamily: fontMono, fontSize: 12, color: theme.copperDark, flexShrink: 0, minWidth: 90 }}>{t.term}</code>
                <span style={{ fontFamily: fontBody, fontSize: 14, color: "#333229", lineHeight: 1.6 }}>{t.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <Exercise
          n={1}
          title="Primeiro contato: tirando uma foto da GPU"
          intro="Numa célula de código, rode:"
          code={`!nvidia-smi`}
          notCode
          expectedOutput={`Tesla T4              N/A   51C   P8   11W /  70W  |    0MiB / 15360MiB  |   0%   Default
No running processes found`}
          expectedOutputNotes={[
            { term: "51C, 11W, 0%", desc: "logo no início da sessão, é normal ver temperatura baixa, pouca energia consumida e 0% de uso — a GPU está ligada, mas ainda ociosa." },
            { term: "0MiB / 15360MiB", desc: "nenhuma memória ocupada ainda, porque nenhum programa criou nada na GPU até agora." },
            { term: "No running processes found", desc: "nenhum processo usando a GPU nesse instante — normal, já que você acabou de rodar o primeiro comando da aula." },
            { term: "(tabela completa)", desc: "essa é só a parte mais importante resumida — a explicação de cada campo, um por um, está na seção 'O painel da GPU: nvidia-smi' mais acima na página." },
          ]}
          questions={[
            "Qual o modelo da GPU que o Colab te deu?",
            "Quantos MiB de VRAM ela tem no total?",
            "Qual a temperatura dela agora, parada?",
            "Tem algum processo rodando nela nesse momento? Qual?",
          ]}
          defaultOpen
        />

        <Exercise
          n={2}
          title="Acompanhando a GPU trabalhando (sem loop infinito)"
          intro="Tira uma sequência de 10 leituras da GPU enquanto ela calcula por trás dos panos — termina sozinho, sem precisar clicar em stop."
          code={`import torch
import subprocess
import threading
import time

tamanho = 15000
a = torch.rand(tamanho, tamanho, device="cuda")
b = torch.rand(tamanho, tamanho, device="cuda")

def calculo_pesado():
    for i in range(300):
        resultado = torch.matmul(a, b)
    torch.cuda.synchronize()

thread = threading.Thread(target=calculo_pesado)
thread.start()

for i in range(10):
    saida = subprocess.run(
        ["nvidia-smi", "--query-gpu=utilization.gpu,memory.used,temperature.gpu", "--format=csv"],
        capture_output=True, text=True
    )
    print(f"Leitura {i+1}:")
    print(saida.stdout)
    time.sleep(1)

thread.join()
print("Cálculo terminado.")`}
          walkthrough={[
            { line: "import torch / subprocess / threading / time", desc: "pega emprestadas 4 bibliotecas prontas: torch sabe conversar com a GPU; subprocess roda comandos de terminal de dentro do Python; threading permite rodar duas coisas 'ao mesmo tempo'; time mexe com tempo e pausas." },
            { line: "tamanho = 15000", desc: "cria uma variável chamada tamanho, guardando o número 15000, pra usar mais abaixo sem repetir o número." },
            { line: "a = torch.rand(tamanho, tamanho, device=\"cuda\")", desc: "cria uma tabela gigante (15000 x 15000) de números aleatórios, e já manda ela direto pra dentro da memória da GPU (é isso que device=\"cuda\" faz)." },
            { line: "def calculo_pesado():", desc: "empacota as linhas de baixo (indentadas) num bloco com nome — uma função — que a gente pode 'chamar' pra executar inteira depois." },
            { line: "for i in range(300): resultado = torch.matmul(a, b)", desc: "repete a multiplicação das duas tabelas gigantes 300 vezes seguidas — só pra garantir que o cálculo demore um tempinho, dando chance de flagrar a GPU no meio do processo." },
            { line: "torch.cuda.synchronize()", desc: "espera a GPU realmente terminar tudo que estava fazendo, antes de deixar o código seguir em frente." },
            { line: "thread = threading.Thread(...) / thread.start()", desc: "aqui está o truque: em vez de esperar o cálculo pesado acabar pra só depois fazer as leituras, a gente manda ele rodar 'em paralelo' (numa linha de execução separada), enquanto o resto do código continua." },
            { line: "for i in range(10): ...", desc: "um segundo loop, separado do de cima — esse faz 10 leituras da GPU, uma de cada vez." },
            { line: "subprocess.run([...], capture_output=True, text=True)", desc: "roda o comando nvidia-smi como se fosse no terminal, só que guarda o resultado numa variável em vez de só mostrar na tela." },
            { line: "print(...)", desc: "mostra alguma coisa na tela — é como o Python 'fala' com a gente." },
            { line: "time.sleep(1)", desc: "pausa a execução por 1 segundo antes de repetir o loop de novo." },
            { line: "thread.join()", desc: "espera o cálculo pesado (que ficou rodando 'nos bastidores' lá atrás) realmente terminar, antes do programa acabar de vez." },
          ]}
          tip="O cálculo roda em segundo plano (outra thread) enquanto o for faz 10 leituras, uma por segundo. Termina sozinho — sem loop infinito."
          expectedOutput={`Leitura 1:
utilization.gpu [%], memory.used [MiB], temperature.gpu
3 %, 1827 MiB, 62

Leitura 2:
utilization.gpu [%], memory.used [MiB], temperature.gpu
100 %, 3577 MiB, 65

(... mais leituras ...)

Cálculo terminado.`}
          expectedOutputNotes={[
            { term: "utilization.gpu [%], ...", desc: "essa linha é só o cabeçalho — o nome de cada coluna. Ela se repete em toda leitura porque cada chamada ao nvidia-smi é independente e sempre manda o cabeçalho junto com o valor." },
            { term: "3 %, 1827 MiB, 62", desc: "os valores de verdade, na mesma ordem do cabeçalho: 3% de uso, 1827 MiB de memória ocupada, 62°C de temperatura." },
            { term: "100 % (a partir da leitura 2)", desc: "assim que o loop de 300 multiplicações começa a rodar de verdade, a utilização pula pra perto de 100% — e costuma ficar assim até o cálculo terminar." },
            { term: "Cálculo terminado.", desc: "é a última linha do código (fora do loop de leituras) — só aparece depois que a thread do cálculo pesado realmente finalizou." },
          ]}
          questions={[
            "Em quais das 10 leituras o utilization.gpu apareceu alto (perto de 100%)?",
            "A temperature.gpu subiu ao longo das leituras? Quanto, do início ao fim?",
            "Se aumentar o tamanho pra 18000 ou o range pra 500, o que muda na quantidade de leituras no pico? Teste.",
          ]}
        />

        <Exercise
          n={3}
          title="A corrida: CPU x GPU, valendo a analogia da prova"
          intro="O exercício mais importante do dia: provar com números reais a analogia dos '8 professores contra 5.000 alunos'."
          code={`import torch
import time

tamanho = 8000

# --- Rodando na CPU ---
a_cpu = torch.rand(tamanho, tamanho)
b_cpu = torch.rand(tamanho, tamanho)

inicio = time.time()
resultado_cpu = torch.matmul(a_cpu, b_cpu)
tempo_cpu = time.time() - inicio
print(f"Tempo na CPU: {tempo_cpu:.4f} segundos")

# --- Rodando na GPU ---
a_gpu = a_cpu.to("cuda")
b_gpu = b_cpu.to("cuda")

torch.cuda.synchronize()
inicio = time.time()
resultado_gpu = torch.matmul(a_gpu, b_gpu)
torch.cuda.synchronize()
tempo_gpu = time.time() - inicio
print(f"Tempo na GPU: {tempo_gpu:.4f} segundos")

print(f"\\nA GPU foi {tempo_cpu / tempo_gpu:.1f}x mais rápida que a CPU")`}
          walkthrough={[
            { line: "# --- Rodando na CPU ---", desc: "linha começando com # é um comentário — o Python ignora completamente. Serve só de anotação pra organizar o código pra quem for ler." },
            { line: "a_cpu = torch.rand(tamanho, tamanho)", desc: "cria a tabela de números aleatórios, mas sem device=\"cuda\" — então ela fica guardada na memória comum do computador (RAM), não na GPU." },
            { line: "inicio = time.time()", desc: "guarda 'que horas são agora' numa variável — é o 'start' do cronômetro." },
            { line: "resultado_cpu = torch.matmul(a_cpu, b_cpu)", desc: "multiplica as duas tabelas. Como as duas estão na CPU, a conta inteira roda usando só a CPU." },
            { line: "tempo_cpu = time.time() - inicio", desc: "pega a hora de agora e subtrai a hora do início — o resultado é quantos segundos a conta demorou." },
            { line: 'print(f"Tempo na CPU: {tempo_cpu:.4f} segundos")', desc: "mostra o resultado na tela. O f\"...\" permite colocar o valor de uma variável dentro do texto; :.4f significa 'mostra só 4 casas decimais'." },
            { line: 'a_gpu = a_cpu.to("cuda")', desc: "pega a tabela que já existia na CPU e manda uma cópia dela pra dentro da GPU." },
            { line: "(o resto se repete, agora medindo o tempo na GPU)", desc: "as mesmas linhas de cronômetro e multiplicação, só que dessa vez usando a_gpu e b_gpu — por isso a conta roda na GPU." },
            { line: "tempo_cpu / tempo_gpu", desc: "divide um tempo pelo outro, pra descobrir quantas vezes mais rápida a GPU foi em relação à CPU." },
          ]}
          expectedOutput={`Tempo na CPU: 11.3213 segundos
Tempo na GPU: 0.0847 segundos

A GPU foi 133.7x mais rápida que a CPU`}
          expectedOutputNotes={[
            { term: "Tempo na CPU", desc: "em segundos, com 4 casas decimais. Pra uma matriz 8000×8000, algo entre alguns segundos e uns 15-20 segundos é normal — depende de quão ocupada está a CPU virtual do Colab naquele momento." },
            { term: "Tempo na GPU", desc: "geralmente um número bem menor, às vezes menos de 1 segundo — é exatamente pra esse tipo de conta que a GPU foi desenhada." },
            { term: "A GPU foi Nx mais rápida", desc: "resultado da divisão de um tempo pelo outro. É comum ver algo entre 50x e 200x — o número exato varia de sessão pra sessão, dependendo de qual GPU física o Colab te deu." },
          ]}
          questions={[
            "Isso bate com a analogia dos professores x alunos? Explique com suas palavras.",
            "Troque o tamanho para 500 (bem menor) e rode de novo. A diferença ficou maior, menor, ou quase sumiu? Por quê?",
          ]}
        />

        <Exercise
          n={4}
          title="Exportando dados como uma pessoa de dados de verdade"
          intro="Times de dados raramente olham as coisas na mão — eles exportam pra uma planilha e analisam depois."
          code={`!nvidia-smi --query-gpu=timestamp,utilization.gpu,memory.used,temperature.gpu --format=csv`}
          notCode
          expectedOutput={`timestamp, utilization.gpu [%], memory.used [MiB], temperature.gpu
2026/07/10 21:17:51.123, 0 %, 0 MiB, 51`}
          expectedOutputNotes={[
            { term: "timestamp", desc: "primeira linha: só o cabeçalho, nome de cada coluna. Segunda linha: os valores de verdade, na mesma ordem." },
            { term: "2026/07/10 21:17:51.123", desc: "a data e a hora exatas dessa leitura (até milissegundos) — é justamente esse dado que permite depois montar um gráfico da GPU ao longo do tempo." },
          ]}
          questions={[
            "Copie a saída e cole numa planilha (Google Sheets ou Excel), separando por vírgula.",
            "Rode o Exercício 2 de novo e, repetidamente, rode esse comando durante o processo, colando cada linha nova.",
            "Monte um gráfico de linha com a utilization.gpu ao longo do tempo — deve aparecer um 'morro'.",
          ]}
        />

        <Exercise
          n={5}
          title="Diagrama à mão: Von Neumann x Harvard"
          intro="Sem computador dessa vez — só pra desenhar (papel, ou Excalidraw/Miro)."
          questions={[
            "Desenhe a Von Neumann: uma memória, um barramento, e a CPU com Controle, ALU e Memória.",
            "Desenhe a Harvard ao lado: duas memórias separadas, dois barramentos.",
            "Escreva embaixo de cada uma a vantagem e a desvantagem.",
            "Bônus: por que um Arduino se beneficia mais da Harvard do que um notebook comum se beneficiaria?",
          ]}
        />

        <Exercise
          n={6}
          title="Jogo da memória dos termos técnicos"
          intro="Em dupla: cada aluno escreve 10 termos técnicos de hoje em cartões, e as 10 definições em cartões separados e embaralhados."
          questions={[
            "Troquem os cartões com outra dupla e montem os pares corretos no menor tempo possível.",
            "Quem errar um par precisa explicar por que errou — ajuda a fixar o motivo da confusão.",
          ]}
        />

        <Exercise
          n={7}
          title="Explicando com suas palavras (checagem final)"
          intro="Sem colar no material, respondam em um parágrafo curto (4-5 frases) a pergunta que abriu a aula:"
          tip={`"Por que treinar uma Inteligência Artificial sem GPU pode levar dias, e com GPU pode levar só algumas horas?"`}
          questions={[
            "A resposta precisa usar, obrigatoriamente, as palavras: núcleo, paralelo (ou paralelismo) e matriz.",
            "Se você conseguir responder sozinho, sem consultar nada, é sinal de que o conteúdo realmente ficou claro.",
          ]}
        />
      </Section>

      {/* FOOTER */}
      <Section dark style={{ paddingTop: 48, paddingBottom: 48 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <ArrowRight size={16} color={theme.amber} />
          <span style={{ fontFamily: fontMono, fontSize: 12, color: theme.amber, textTransform: "uppercase", letterSpacing: "0.06em" }}>Próxima aula</span>
        </div>
        <P dark style={{ margin: 0, fontSize: 15.5 }}>
          SIMD, MIMD, RISC e CISC — vamos entender, com mais profundidade técnica, exatamente por que a GPU é fisicamente desenhada do jeito que é.
        </P>
      </Section>
    </div>
  );
}