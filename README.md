# LuHao Mobiliza — site institucional (Astro)

Site institucional da LuHao Mobiliza | Fleet & Mobility, construído em [Astro](https://astro.build), espelhando a arquitetura técnica do site da LuHao Marketing (`luhao-astro`): build 100% estático, sem framework de UI, CSS por componente com tokens de marca (`--lm-navy`, `--lm-pink`, `--lm-purple`, `--lm-cyan`).

## Estrutura

```
src/
  components/   Header, Footer, CTA, Icon, FloatingWhatsApp, Tracking
  config/site.ts  Dados de contato, navegação, WhatsApp (ATENÇÃO: placeholders)
  content.config.ts  Schema da collection "blog" (ver seção Blog abaixo)
  content/blog/*.md  Artigos do blog (markdown + frontmatter)
  layouts/BaseLayout.astro
  pages/        index, metodologia, sobre, cases, contato, 404
  pages/blog.astro       Listagem dinâmica dos artigos
  pages/blog/[slug].astro  Template de artigo individual
  styles/global.css  Tokens de marca e utilitários
public/images/logo/  Logos oficiais (azul e branco)
public/images/blog/  Imagens de capa dos artigos (geradas por automação)
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
- [ ] Revisar `public/images/fundo-mobiliza.png` (usado como imagem de Open Graph) e trocar por uma arte final se desejar

## Blog: collection, schema e automação de artigos

O blog usa a Content Collections API nativa do Astro (`src/content.config.ts`), não uma pasta solta de markdown. Isso dá validação de schema em build time — se um artigo publicado tiver um campo obrigatório faltando ou de tipo errado, o build falha em vez de gerar uma página quebrada.

**Onde ficam os artigos:** `src/content/blog/{slug}.md`
**Onde ficam as imagens de capa:** `public/images/blog/{slug}.png`
**Rota do artigo:** `/blog/{slug}` (definida em `src/pages/blog/[slug].astro`, via `getStaticPaths` + `getCollection('blog')`)
**Listagem:** `/blog` (`src/pages/blog.astro`) lista os artigos publicados ordenados por `pubDate` desc, e mantém uma seção "em produção" para temas ainda não escritos.

### Campos de frontmatter aceitos (`src/content.config.ts`)

| Campo | Tipo | Obrigatório | Observação |
| --- | --- | --- | --- |
| `title` | string | Sim | |
| `slug` | string | Não | Se ausente, usa o nome do arquivo |
| `canonical` | string | Não | Informativo; a tag `<link rel="canonical">` é gerada automaticamente pela URL real |
| `metaDescription` | string | Sim | Usada como `<meta description>` e no resumo da listagem |
| `focusKeyword` | string | Não | |
| `secondaryKeywords` | string[] | Não | Default `[]` |
| `pubDate` | date (`AAAA-MM-DD`) | Sim | |
| `author` | string | Não | Default `"LuHao Mobiliza"` |
| `categories` | string[] | Não | Default `[]`; a primeira aparece como tag no card da listagem |
| `tags` | string[] | Não | Default `[]` |
| `featuredImage` | string (path) | Não | Ex: `/images/blog/{slug}.png` |
| `featuredImageAlt` | string | Não | |
| `ctaBanner` | string | Não | Aceito para compatibilidade; não altera o CTA no momento (o site só tem um CTA institucional) |

Este contrato é **compatível com o workflow n8n "Gerador de Artigos SEO para a LuHao - Astro"** já usado pela LuHao Marketing — o mesmo workflow pode ser duplicado e apontado para o repositório `luhao-mobiliza-astro` trocando apenas o repo de destino no node "Preparar payload GitHub" e o domínio usado para montar o `canonical` (`https://luhao-mobiliza.com.br`). O node "Gerar Markdown Astro" já escreve exatamente nesses campos, no caminho `src/content/blog/{slug}.md`, com a imagem em `public/images/blog/{slug}.png`.

Há um artigo de exemplo publicado (`src/content/blog/tco-de-frota-o-que-fica-de-fora-da-conta.md`) que serve de referência de formato.

## Deploy

Veja [`DEPLOY.md`](./DEPLOY.md) para o passo a passo completo de publicação no GitHub + Digital Ocean App Platform e configuração de DNS do domínio `luhao-mobiliza.com.br`.
