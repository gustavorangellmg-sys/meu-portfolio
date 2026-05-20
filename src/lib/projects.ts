import jadiel from "@/assets/jadiel.jpg";
import baileCover from "@/assets/baile-cover.png";
import mgi from "@/assets/mgi.jpg";
import fornalha from "@/assets/fornalha.jpg";
import sandra from "@/assets/sandra.jpg";
import michelle from "@/assets/michelle.jpg";
import focar from "@/assets/focar.jpg";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  tagline: string;
  story: string[];
  role: string[];
  tools: string[];
  cover: string;
  accent: string; // hex for case study accent
};

export const projects: Project[] = [
  {
    slug: "jadiel-oliveira",
    title: "Jadiel Oliveira - Baile Diferente",
    client: "Jadiel Oliveira",
    category: "Branding & Identidade",
    year: "2024",
    tagline: "Uma identidade que dança entre o erudito e o popular.",
    story: [
      "Jadiel é artista, podcaster e curador de uma cena que mistura MPB, jazz e o experimental. Precisava de uma marca que soasse tão livre quanto seus sets — sem cair no clichê do flyer de balada.",
      "Buscamos referências em Bauhaus, Joan Miró e capas de vinil dos anos 70. O resultado é um sistema gráfico modular, baseado em formas orgânicas que se recombinam a cada peça — como uma improvisação.",
      "A paleta verde-musgo, terracota e creme pastel traduz o tom acústico e quente do projeto. A tipografia mistura serifa expressiva com sans condensada, criando contraste editorial.",
    ],
    role: ["Direção de arte", "Identidade visual", "Sistema de aplicação"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    cover: baileCover,
    accent: "#5a7a3a",
  },
  {
    slug: "fundacao-mgi",
    title: "Fundação MGI",
    client: "Fundação MGI",
    category: "Identidade & Sinalização",
    year: "2024",
    tagline: "Quando o design vira ponte entre pessoas e oportunidade.",
    story: [
      "A MGI atende milhares de famílias com programas sociais. O desafio era criar uma identidade calorosa, sem perder a credibilidade institucional necessária para captar recursos.",
      "Construímos personas reais — Pedro, Walter, Maria Clara — e desenhamos toda a sinalização do espaço pensando no fluxo de quem chega pela primeira vez. Cada cor, cada seta, conta uma parte da jornada.",
      "A campanha 'Rifa dos Sonhos' nasceu desse sistema: uma peça que conversa tanto com o doador corporativo quanto com a comunidade.",
    ],
    role: ["Identidade visual", "Wayfinding", "Campanha"],
    tools: ["Illustrator", "InDesign", "Photoshop"],
    cover: mgi,
    accent: "#1f5a7a",
  },
  {
    slug: "fornalha-da-guilda",
    title: "A Fornalha da Guilda",
    client: "Fornalha da Guilda",
    category: "Branding & Embalagem",
    year: "2024",
    tagline: "Um food truck que vira RPG — e o cardápio é a ficha de personagem.",
    story: [
      "Um food truck com alma medieval precisava de mais do que um logo bonito. Construímos um universo: a Fornalha é uma forja, o chef é o mestre, e cada cliente escolhe sua classe.",
      "Brochuras separadas por classe — Guerreiro, Mago, Ladino — funcionam como menus e como peças colecionáveis. A paleta steel blue + cobre martelado dá o peso de uma armadura.",
      "A tipografia tem traços manuais, como se tivessem sido gravadas a ferro. Tudo serve à mesma promessa: comer ali é entrar numa campanha.",
    ],
    role: ["Branding", "Direção de arte", "Embalagem"],
    tools: ["Illustrator", "Photoshop", "InDesign"],
    cover: fornalha,
    accent: "#c87a35",
  },
  {
    slug: "sandra-lessa",
    title: "Sandra Lessa",
    client: "Sandra Lessa",
    category: "Web & Portfólio",
    year: "2024",
    tagline: "Um portfólio que respeita o silêncio entre as obras.",
    story: [
      "Sandra é artista visual. Pediu um site que não competisse com seu trabalho — que apenas o emoldurasse.",
      "Trabalhamos com uma paleta de amarelo ocre, marrom e preto profundo, em diálogo direto com a paleta dos quadros. Serifa display nos títulos, sans neutra no corpo. Espaço em branco como protagonista.",
      "Desenhado no Figma, publicado no Framer com microinterações sutis — para que cada clique fosse uma página virada com calma.",
    ],
    role: ["UX/UI", "Direção de arte", "Desenvolvimento no-code"],
    tools: ["Figma", "Framer"],
    cover: sandra,
    accent: "#d6a23a",
  },
  {
    slug: "michelle-alarcon",
    title: "Michelle Alarcon",
    client: "Michelle Alarcon",
    category: "Landing Page & Conversão",
    year: "2025",
    tagline: "Maternidade real, design que acolhe e converte.",
    story: [
      "Michelle é mentora de mães e precisava de uma landing page que vendesse seu programa sem soar agressiva — algo difícil de equilibrar em página de conversão.",
      "A hierarquia tipográfica conduz a leitura como uma conversa: pergunta, dor, prova, promessa, CTA. Fotografia em tons quentes de blush e creme, espaços generosos, depoimentos em primeira pessoa.",
      "Resultado: uma página que conversa com a mãe cansada às 23h e ainda assim performa nos indicadores que importam.",
    ],
    role: ["UX writing", "Landing page", "Direção de arte"],
    tools: ["Figma", "Readdy"],
    cover: michelle,
    accent: "#e8a8a8",
  },
  {
    slug: "grupo-focar",
    title: "Grupo Focar",
    client: "Grupo Focar",
    category: "Site Institucional B2B",
    year: "2025",
    tagline: "Vinte anos de autoridade traduzidos em um único scroll.",
    story: [
      "Referência em certificações financeiras há mais de 20 anos, o Grupo Focar precisava de um site que comunicasse seriedade sem parecer datado.",
      "Construímos um sistema baseado em provas: 95% de aprovação, mais de 10 mil alunos, dezenas de turmas. Tudo apresentado em hierarquia clara, com tipografia institucional e azul-marinho profundo.",
      "Cada seção responde a uma objeção real de quem está prestes a investir tempo e dinheiro numa certificação. Confiança vira interface.",
    ],
    role: ["UX/UI", "Direção de arte", "Estratégia de conteúdo"],
    tools: ["Figma"],
    cover: focar,
    accent: "#1a3d7a",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
