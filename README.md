# Portfólio UGC · Sâmela Laura

Site portfólio de criadora de conteúdo UGC. Feito em [Astro](https://astro.build) (estático) e publicado em
[Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) com um Worker pequeno para contato.

## Estrutura

```
src/
  config/site.ts      # textos, links e itens editáveis (procure por TODO)
  components/         # uma seção por componente
  assets/             # fotos (otimizadas para WebP no build)
  pages/index.astro   # monta a página
worker/index.ts       # rotas /whatsapp, /email e POST /api/contato
wrangler.jsonc        # configuração da Cloudflare
```

## Rodar localmente

```bash
npm install
npm run dev        # só o site, http://localhost:4321 (rotas do Worker não funcionam)
npm run preview    # build + Worker local, http://localhost:8787
```

Para testar as rotas do Worker localmente, copie `.dev.vars.example` para `.dev.vars` e preencha.

## Variáveis e secrets

Telefone e e-mail **não ficam no código nem no HTML**. O site linka para `/whatsapp` e `/email`, e o Worker
redireciona lendo estes secrets:

| Nome               | Uso                                                   |
| ------------------ | ----------------------------------------------------- |
| `WHATSAPP_NUMBER`  | Número com DDI e DDD, só dígitos (ex.: `5583999999999`) |
| `CONTACT_EMAIL`    | E-mail aberto pelo botão "Enviar um e-mail"           |
| `CONTACT_TO_EMAIL` | E-mail que recebe os pedidos do formulário            |
| `RESEND_API_KEY`   | Chave da API do [Resend](https://resend.com)          |
| `RESEND_FROM`      | Remetente verificado no Resend                        |

Em produção, cadastre em **Cloudflare > Workers & Pages > site-portfolio-ugc > Settings > Variables and Secrets**
(tipo *Secret*) ou via CLI:

```bash
npx wrangler secret put WHATSAPP_NUMBER
```

Sem domínio próprio verificado no Resend, use `RESEND_FROM="Portfólio <onboarding@resend.dev>"`: nesse modo o Resend
só entrega para o e-mail dono da conta Resend.

## Deploy

Deploy contínuo pela integração Git da Cloudflare (Workers Builds): cada push na `main` publica; PRs geram preview.

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

Deploy manual: `npm run deploy`.

## Pendências (TODO)

Em `src/config/site.ts`:

- `mediaKitUrl`: PDF do mídia kit (botão fica oculto enquanto for `null`)
- `ebookUrl`: link do e-book (botão fica oculto enquanto for `null`)
- `deliveryDays` e `adRightsDays`: prazo de entrega e licença para anúncios
- `reelUrl` de cada item do portfólio (hoje aponta para o perfil)
