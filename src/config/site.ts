/**
 * Conteúdo editável do site.
 *
 * Dados pessoais sensíveis (WhatsApp, e-mail) NÃO ficam aqui: o site linka
 * para /whatsapp e /email, e o Worker redireciona lendo secrets da Cloudflare.
 * Veja README.md > "Variáveis e secrets".
 *
 * Itens marcados com TODO precisam ser preenchidos antes de divulgar o site.
 */

export const site = {
  name: 'Sâmela Laura',
  role: 'Criadora de conteúdo UGC',
  city: 'João Pessoa, PB',
  description:
    'Vídeos UGC que mostram o seu produto na rotina de uma família de verdade, e fazem quem assiste confiar na sua marca.',
  instagram: {
    handle: '@samela_laura',
    url: 'https://www.instagram.com/samela_laura/',
  },
  // TODO: link do PDF do mídia kit (ex.: '/midia-kit.pdf' com o arquivo em public/). null esconde o botão.
  mediaKitUrl: null as string | null,
  // TODO: link do site do e-book. null esconde o botão.
  ebookUrl: null as string | null,
  statsUpdatedAt: 'nov/2026',
};

/** Rotas servidas pelo Worker (worker/index.ts). */
export const contactRoutes = {
  whatsapp: '/whatsapp',
  email: '/email',
  form: '/api/contato',
};

export type PortfolioItem = {
  title: string;
  type: string;
  goal: string;
  image: 'cif' | 'omo' | 'hoomy' | 'odontologia';
  reelUrl: string;
};

// TODO: trocar reelUrl pelo link de cada Reel (hoje aponta para o perfil).
export const portfolio: PortfolioItem[] = [
  {
    title: 'CIF Limpeza Milagrosa',
    type: 'Review',
    goal: 'Demonstração que prova o resultado na prática · via Home Tester Club',
    image: 'cif',
    reelUrl: site.instagram.url,
  },
  {
    title: 'OMO Todo Ciclo',
    type: 'Unboxing',
    goal: 'Unboxing que apresenta o produto e seus diferenciais · via Home Tester Club',
    image: 'omo',
    reelUrl: site.instagram.url,
  },
  {
    title: 'Travesseiro Confort Hoomy',
    type: 'Narração em off',
    goal: 'Narração que transmite a sensação de conforto · via Home Tester Club',
    image: 'hoomy',
    reelUrl: site.instagram.url,
  },
  {
    title: 'Specially Odontologia Humanizada',
    type: 'Odontopediatria · Narração em off',
    goal: 'Narração que acolhe os pais e mostra um atendimento humanizado',
    image: 'odontologia',
    reelUrl: site.instagram.url,
  },
];

export const metrics = [
  { value: '5,1 mil', label: 'seguidores no Instagram' },
  { value: '10,9 mil', label: 'visualizações em média por vídeo' },
];

export const brands = [
  'Home Tester Club',
  'Clubinho Corações Preciosos',
  'Mara Ilustradora',
  'Specially Odontologia',
];

export const niches = ['Casa e decoração', 'Maternidade e bebês', 'Saúde e bem-estar'];

export const services = [
  {
    icon: 'video',
    title: 'Para anúncios',
    items: [
      'Vídeos para Meta Ads e TikTok Ads',
      'Variações de gancho para testes',
      'Depoimento para a câmera',
      'Antes e depois',
      'Demonstração de produto',
    ],
  },
  {
    icon: 'camera',
    title: 'Para as redes da sua marca',
    items: [
      'Review e opinião sincera',
      'Unboxing',
      'Tutorial passo a passo',
      'Storytelling e POV',
      'Rotina com o produto',
      'Narração em off',
      'Postagem em collab no meu perfil',
      'Stories',
    ],
  },
  {
    icon: 'sparkles',
    title: 'Fotos de produto',
    items: [
      'Produto em fundo neutro',
      'Lifestyle com o produto em uso',
      'Fotos segurando ou usando o produto',
    ],
  },
] as const;

export const howIWork = [
  { icon: 'ratio', label: 'Formatos', text: '9:16, 4:5, 1:1 e 16:9' },
  { icon: 'timer', label: 'Duração', text: 'Vídeos de 30 a 60 segundos' },
  { icon: 'calendar', label: 'Prazo', text: 'Combinado com você conforme o projeto, após receber o produto' },
  { icon: 'refresh', label: 'Revisões', text: 'Até 3 incluídas' },
  {
    icon: 'badge',
    label: 'Direitos de uso para anúncios',
    text: 'Uso orgânico incluído. Período para anúncios combinado com você, cobrado à parte',
  },
  {
    icon: 'handshake',
    label: 'Roteiro e edição inclusos',
    text: 'Arquivos prontos para postar, com cortes, legendas e trilha.',
  },
] as const;

export const contentTypes = ['Vídeo UGC', 'Vídeo para anúncio', 'Fotos de produto', 'Collab no meu perfil', 'Outro'];

export const nav = [
  { href: '#inicio', label: 'Início' },
  { href: '#portfolio', label: 'Portfólio' },
  { href: '#resultados', label: 'Resultados' },
  { href: '#sobre', label: 'Sobre mim' },
  { href: '#servicos', label: 'Serviços' },
  { href: '#como-trabalho', label: 'Como trabalho' },
  { href: '#contato', label: 'Contato' },
];
