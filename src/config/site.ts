// ATENÇÃO: telefone, WhatsApp e redes sociais abaixo são placeholders.
// Substitua pelos dados reais da LuHao Mobiliza antes de publicar.
export const siteConfig = {
  name: 'LuHao Mobiliza',
  fullName: 'LuHao Mobiliza | Fleet & Mobility',
  url: 'https://luhao-mobiliza.com.br',
  logo: '/images/logo/logo-mobiliza-branco.png',
  logoDark: '/images/logo/logo-mobiliza-azul.png',
  logoAlt: 'LuHao Mobiliza | Fleet & Mobility',
  favicon: '/favicon.svg',
  email: 'contato@luhao-mobiliza.com.br',
  phoneLabel: '+55 11 0000-0000',
  phoneHref: 'tel:+551100000000',
  whatsappNumber: '5511000000000',
  whatsappDefaultMessage:
    'Olá, quero falar com a LuHao Mobiliza sobre consultoria independente de mobilidade corporativa e gestão de frotas.',
  address: 'São Paulo, SP',
  social: {
    linkedin: 'https://www.linkedin.com/company/luhao-mobiliza/',
    instagram: 'https://www.instagram.com/luhaomobiliza/',
  },
};

export const mainNav = [
  { label: 'Início', href: '/' },
  { label: 'Metodologia MOVE®', href: '/metodologia' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Case', href: '/cases' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
];

export function getWhatsAppUrl(message = siteConfig.whatsappDefaultMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
