# Clínica Marques dos Santos

Experiência digital premium para uma clínica de fisioterapia portuguesa.
Next.js 16 · React 19 · TypeScript · TailwindCSS 4 · Motion · GSAP · Supabase · Resend · Vercel.

> Arquitetura completa, decisões de design e modelo de dados: **[ARCHITECTURE.md](./ARCHITECTURE.md)**

## Começar

```bash
npm install
npm run dev        # http://localhost:3000
```

O site arranca em **modo demo** sem qualquer configuração: todo o conteúdo vem de
`src/content/`, a marcação online simula a confirmação e o assistente usa triagem
determinística local. Nada parte sem chaves.

## Ligar a infraestrutura real

1. Copie `.env.example` para `.env.local` e preencha as chaves.
2. Aplique o schema: `supabase db push` (ou cole `supabase/migrations/0001_schema.sql` no SQL Editor).
3. Faça deploy da função de confirmação: `supabase functions deploy booking-confirmation`
   e ligue-a a um Database Webhook no INSERT de `public.appointments`.
4. Configure os secrets da função: `RESEND_API_KEY` (email), `GOOGLE_CALENDAR_ID` +
   `GOOGLE_ACCESS_TOKEN` (calendário), `TWILIO_*` (SMS, preparado).
5. Opcional: `ANTHROPIC_API_KEY` ativa o modo generativo do assistente.

## Comandos

| Comando | Descrição |
|---|---|
| `npm run dev` | Desenvolvimento |
| `npm run build` | Build de produção |
| `npm run typecheck` | Verificação TypeScript |

## Estrutura

```
src/app          páginas (App Router) — site público, /marcar, /area-paciente, /admin
src/components   ui/ · motion/ · layout/ · sections/ · booking/ · assistant/ · patient/ · admin/
src/content      conteúdo estruturado (especialidades, equipa, FAQ, blog, …)
src/lib          supabase, seo (JSON-LD), motion tokens, utils
supabase         migrations (schema + RLS) e edge functions
```

## Qualidade

- **Acessibilidade:** WCAG 2.1 AA — skip link, foco visível, aria em acordeões/wizard/dialogs, `prefers-reduced-motion` em todas as animações.
- **SEO:** metadata por página, Open Graph, JSON-LD (`MedicalBusiness`, `FAQPage`, `MedicalTherapy`, `Article`), sitemap e robots gerados.
- **Performance:** RSC por omissão, GSAP carregado on demand, zero imagens externas, fontes via `next/font`.

## Deploy

Vercel: importar o repositório, definir as variáveis de ambiente e publicar.
Cloudflare à frente para DNS/cache/WAF (proxy laranja no domínio, SSL Full Strict).
