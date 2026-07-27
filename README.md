# LuHao Mobiliza — site institucional (Astro)

Site institucional da LuHao Mobiliza | Fleet & Mobility, construído em [Astro](https://astro.build), espelhando a arquitetura técnica do site da LuHao Marketing (`luhao-astro`): build 100% estático, sem framework de UI, CSS por componente com tokens de marca (`--lm-navy`, `--lm-pink`, `--lm-purple`, `--lm-cyan`).

## Estrutura

```
src/
  components/   Header, Footer, CTA, Icon, FloatingWhatsApp, Tracking
  config/site.ts  Dados de contato, navegação, WhatsApp (ATENÇÃO: placeholders)
  layouts/BaseLayout.astro
  pages/        index, metodologia, sobre, cases, blog, contato, 404
  styles/global.css  Tokens de marca e utilitários
public/images/logo/  Logos oficiais (azul e branco)
.do/app.yaml    Especificação do App Platform (Digital Ocean)
```

## Comandos

| Comando           | Ação                                      |
| ------------------ | ----------------------------------------- |
| `npm install`       | Instala dependências                      |
| `npm run dev`       | Servidor local em `localhost:4321`        |
| `npm run build`     | Build de produção em `./dist/`            |
| `npm run preview`   | Preview do build local                    |

## Antes de publicar — checklist

Este projeto foi entregue com conteúdo real (metodologia MOVE®, produtos, case ilustrativo Alpha Engenharia), mas alguns dados de contato são **placeholders** e precisam ser substituídos antes do lançamento:

- [ ] `src/config/site.ts`: telefone (`phoneLabel`/`phoneHref`), número de WhatsApp (`whatsappNumber`), e-mail, links de LinkedIn/Instagram
- [ ] `.env` (criar a partir de `.env.example`): IDs de Google Analytics, Google Ads e Meta Pixel, se forem usados
- [ ] Favicon (`public/favicon.svg`) — está com um ícone provisório na paleta da marca; troque se tiver um ícone oficial
- [ ] Revisar `public/images/fundo-mobiliza.png` (usado como imagem de Open Graph) e trocar por uma arte final se desejar

## Deploy

Veja [`DEPLOY.md`](./DEPLOY.md) para o passo a passo completo de publicação no GitHub + Digital Ocean App Platform e configuração de DNS do domínio `luhao-mobiliza.com.br`.
