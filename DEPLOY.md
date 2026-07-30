# Publicando a LuHao Mobiliza (GitHub + Digital Ocean App Platform)

Este guia assume que você já tem o domínio `luhao-mobiliza.com.br` registrado, mas ainda não configurou o App no Digital Ocean. Como esta sessão não tem acesso a token do GitHub nem do Digital Ocean, os passos abaixo devem ser executados por você — os comandos de terminal já estão prontos para copiar/colar.

## 0. Preencher os placeholders

Antes de publicar, edite `src/config/site.ts` com telefone, WhatsApp e redes sociais reais (estão marcados com `ATENÇÃO` no topo do arquivo). Veja o checklist completo no [`README.md`](./README.md).

## 1. Criar o repositório no GitHub

Crie um repositório vazio (sem README/gitignore) em https://github.com/new, por exemplo `mhaola/luhao-mobiliza-astro` — mesmo padrão de nome usado no `.do/app.yaml` deste projeto. Se usar outro nome ou outra conta, ajuste o campo `github.repo` em `.do/app.yaml` antes do passo 3.

Depois, na pasta do projeto:

```bash
cd /c/Users/Mauricio/luhao-mobiliza-astro
git init
git add .
git commit -m "Site institucional da LuHao Mobiliza"
git branch -M main
git remote add origin https://github.com/mhaola/luhao-mobiliza-astro.git
git push -u origin main
```

## 2. Criar o App no Digital Ocean

1. Acesse https://cloud.digitalocean.com/apps e clique em **Create App**.
2. Escolha **GitHub** como fonte e autorize o acesso ao repositório `luhao-mobiliza-astro`, branch `main`.
3. O Digital Ocean detecta automaticamente o arquivo `.do/app.yaml` deste projeto e sugere a configuração como **Static Site**:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Confirme o plano (Static Sites têm um plano gratuito no App Platform, com limite de banda/builds) e clique em **Create Resources**.
5. Aguarde o primeiro build. Ele deve levar 1–2 minutos.

Se preferir configurar manualmente em vez de usar o `.do/app.yaml`:
- **Type**: Static Site
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment**: Node.js

## 3. Variáveis de ambiente

Todo o rastreamento (GA4, Meta Pixel, e futuras tags) é centralizado no Google Tag Manager. Adicione em **Settings → App-Level Environment Variables** (ou nas envs do componente `web`):

- `PUBLIC_GTM_ID` — ID do container do GTM (formato `GTM-XXXXXXX`)

Essa variável é lida em build time pelo componente `Tracking.astro`. As tags de GA4 e Meta Pixel em si são configuradas dentro do próprio container do GTM (tagmanager.google.com), não no código do site.

## 4. Apontar o domínio `luhao-mobiliza.com.br`

Dentro do App criado:

1. Vá em **Settings → Domains → Add Domain**.
2. Adicione `luhao-mobiliza.com.br` (Primary) e `www.luhao-mobiliza.com.br` (Alias) — já estão pré-configurados no `.do/app.yaml`.
3. O Digital Ocean vai indicar os registros de DNS necessários. Normalmente:
   - Se o domínio usa os **nameservers da Digital Ocean** (`ns1.digitalocean.com`, `ns2.digitalocean.com`, `ns3.digitalocean.com`): adicione o domínio primeiro em **Networking → Domains** e a Digital Ocean cria os registros automaticamente ao vincular o App.
   - Se o domínio permanece no **registrador atual** (ex: Registro.br), crie manualmente:
     - Um registro **CNAME** de `www` apontando para o hostname `.ondigitalocean.app` que a Digital Ocean exibir na tela de domínios do App.
     - Para o domínio raiz (`luhao-mobiliza.com.br` sem `www`), use um registro **ALIAS**/**ANAME** se o seu provedor de DNS suportar, ou os registros **A** que a Digital Ocean indicar na tela (a DO mostra os IPs corretos ao adicionar o domínio).
4. Aguarde a propagação de DNS (pode levar de minutos a algumas horas) e a emissão automática do certificado SSL (Let's Encrypt) pela Digital Ocean.

## 5. Deploys seguintes

Com `deploy_on_push: true`, qualquer `git push` para a branch `main` dispara um novo build e deploy automaticamente. Não é necessário repetir os passos 1–4.

## Resumo do que este projeto já resolve

- ✅ Site Astro completo com conteúdo real (metodologia MOVE®, produtos, case ilustrativo)
- ✅ `astro.config.mjs` com `site: https://luhao-mobiliza.com.br` e sitemap automático
- ✅ `.do/app.yaml` pronto para o Digital Ocean detectar como Static Site
- ✅ `robots.txt` e sitemap apontando para o domínio final
- ⬜ Criar o repositório remoto e fazer o push (passo 1 acima — requer sua conta GitHub)
- ⬜ Criar o App no dashboard do Digital Ocean (passo 2 acima — requer sua conta Digital Ocean)
- ⬜ Configurar o DNS do domínio no registrador (passo 4 acima)
