# Clínica Marques dos Santos — Arquitetura

> Uma experiência digital premium para uma clínica de fisioterapia portuguesa.
> Referências de qualidade: Apple, Linear, Stripe, Raycast, Notion, Arc.

---

## 1. Princípios

1. **Calma antes de tudo.** Cada animação existe para acalmar, nunca para impressionar.
   Durações longas (0.6–1.2s), easings suaves (`cubic-bezier(0.22, 1, 0.36, 1)`), deslocamentos curtos (≤ 24px).
2. **Branco é o material.** O espaço em branco é tratado como material de construção — a hierarquia nasce do espaço, não de linhas ou caixas.
3. **Nada parece template.** Grelha própria de 12 colunas com margens generosas, tipografia com tracking apertado em display, componentes desenhados à medida.
4. **Progressive enhancement.** Tudo funciona sem JavaScript (conteúdo, SEO, navegação); as animações e o tempo real são camadas por cima.
5. **`prefers-reduced-motion` é lei.** Todas as animações respeitam a preferência do utilizador.

## 2. Stack

| Camada | Tecnologia | Papel |
|---|---|---|
| Framework | Next.js 16 (App Router, RSC) | Rendering híbrido, streaming, metadata API |
| UI | React 19 + TypeScript | Componentes |
| Estilos | TailwindCSS 4 | Design tokens em CSS, zero-config |
| Micro-animações | Motion (`motion/react`) | Reveals, hovers, layout animations |
| Scroll cinematográfico | GSAP + ScrollTrigger | Parallax, pinning, progresso de scroll |
| Backend | Supabase | Auth, Postgres + RLS, Storage, Edge Functions, Realtime |
| Email | Resend | Confirmações de marcação (via Edge Function) |
| Deploy | Vercel + Cloudflare | Edge, cache, DNS |

**Three.js — decisão deliberada de não usar.** O brief pede Three.js "apenas quando acrescentar valor".
Para uma clínica de saúde, um canvas WebGL no hero custa ~150KB de JS e bateria em mobile sem acrescentar
confiança. Em substituição, o hero usa um campo de gradientes animados em CSS/canvas 2D (< 2KB), que
transmite a mesma serenidade com custo quase nulo. Se no futuro se justificar (ex.: visualização 3D de
anatomia na página de tecnologia), o ponto de integração é `src/components/three/`.

## 3. Estrutura de pastas

```
src/
├── app/
│   ├── (site)/               # Páginas públicas (layout com Header/Footer)
│   │   ├── page.tsx          # Home — hero + todas as secções
│   │   ├── sobre/  equipa/  especialidades/[slug]/  tratamentos/
│   │   ├── tecnologia/  casos-clinicos/  faq/  blog/[slug]/  contacto/
│   │   └── marcar/           # Sistema de marcações (wizard)
│   ├── (auth)/login/         # Autenticação Supabase
│   ├── area-paciente/        # Área do paciente (protegida)
│   ├── admin/                # Painel admin (protegida, role=admin)
│   ├── api/                  # Route handlers: marcações, contacto, assistente
│   ├── sitemap.ts  robots.ts  manifest.ts
│   └── layout.tsx  globals.css  not-found.tsx
├── components/
│   ├── ui/                   # Primitivas: Button, Card, Input, Badge, …
│   ├── motion/               # Sistema de animação: Reveal, Stagger, Parallax, CountUp
│   ├── layout/               # Header, Footer, navegação mobile
│   ├── sections/             # Secções da home (Hero, Equipa, FAQ, …)
│   ├── booking/              # Wizard de marcação (calendário, horários)
│   └── assistant/            # Assistente IA (triagem + dúvidas)
├── lib/
│   ├── supabase/             # Clientes browser/server + middleware de sessão
│   ├── seo.ts                # JSON-LD: MedicalBusiness, FAQPage, Physician
│   └── utils.ts              # cn(), formatadores pt-PT
└── content/                  # Conteúdo estruturado (especialidades, equipa, FAQ, …)
supabase/
├── migrations/               # Schema SQL completo com RLS
└── functions/                # Edge Functions (email de confirmação via Resend)
```

## 4. Modelo de dados (Supabase)

- `profiles` — extensão de `auth.users` com `role` (`patient | professional | admin`)
- `professionals` — equipa clínica (bio, especialidades, ordem)
- `specialties` / `treatments` — catálogo clínico (slug, duração, preço)
- `availability` — janelas semanais por profissional
- `appointments` — marcações (estado: `pending → confirmed → completed / cancelled`)
- `patient_documents`, `exercise_plans`, `clinical_reports`, `payments` — área do paciente
- `testimonials`, `blog_posts`, `faqs`, `clinical_cases` — gestão de conteúdos
- `contact_messages`, `assistant_conversations` — comunicação

**RLS em todas as tabelas.** Pacientes só veem os próprios dados; conteúdo público é `select` anónimo
apenas quando `published = true`; escrita de gestão exige `role = 'admin'`.

**Realtime:** canal `appointments` para o painel admin ver marcações a chegar ao vivo.

**Modo demo:** sem variáveis de ambiente Supabase, o site funciona com dados de `src/content/`
e a marcação simula confirmação — o build e a demo nunca dependem de infraestrutura.

## 5. Sistema de marcações

Wizard de 4 passos (`/marcar`): **Tratamento → Profissional → Data e hora → Confirmação**.
Calendário próprio (sem dependências), slots gerados a partir de `availability` menos `appointments`
existentes. Submissão → `POST /api/appointments` → insert com estado `pending` → Edge Function
`booking-confirmation` envia email (Resend) e cria evento Google Calendar (hook preparado).
SMS: coluna `sms_opt_in` + hook preparado para provider (ex.: Twilio) na mesma função.

## 6. Assistente IA

Widget flutuante, calmo, presente em todas as páginas públicas.
- **Triagem determinística** (sempre disponível): recolha de sintomas → sugestão de especialidade →
  encaminhamento para marcação com contexto pré-preenchido.
- **Modo generativo** (`ANTHROPIC_API_KEY` presente): `POST /api/assistant` com system prompt clínico
  restrito — nunca diagnostica, sempre encaminha para profissionais.
- Guardrails: disclaimers de não-diagnóstico, deteção de red flags (dor torácica, trauma) → indicação 112.

## 7. Sistema de animação

| Nome | Ferramenta | Uso |
|---|---|---|
| `Reveal` | Motion + IntersectionObserver | Entrada de qualquer elemento ao entrar no viewport |
| `Stagger` | Motion | Grupos de cards com atraso em cascata (60–90ms) |
| `Parallax` | GSAP ScrollTrigger | Deslocamento subtil (≤ 8%) de imagens e fundos |
| `CountUp` | rAF próprio | Métricas (avaliações, anos de experiência) |
| `MagneticHover` | Motion springs | Botões primários — atração subtil ao cursor |
| Scroll progress | GSAP | Barra de leitura no blog |

Tokens de movimento centralizados em `src/lib/motion.ts` (durações, easings, variants) —
uma única fonte de verdade garante que todo o site "respira" ao mesmo ritmo.

## 8. SEO

- Metadata API do Next: títulos, descrições, Open Graph e Twitter em todas as páginas
- JSON-LD: `MedicalBusiness` + `LocalBusiness` (global), `FAQPage` (FAQ), `Physician` (equipa),
  `MedicalTherapy` (especialidades), `Article` (blog)
- `sitemap.ts` e `robots.ts` gerados; URLs canónicos; `lang="pt-PT"`
- Conteúdo 100% server-rendered — nada de conteúdo atrás de JS

## 9. Acessibilidade (WCAG 2.1 AA)

- Contraste ≥ 4.5:1 em todo o texto (paleta validada)
- Skip link, landmarks semânticos, foco visível custom (`:focus-visible`)
- Navegação completa por teclado (wizard, FAQ, menus, assistente)
- `aria-*` em acordeões, dialogs, estados do wizard; `prefers-reduced-motion` global

## 10. Performance

- RSC por omissão; `"use client"` apenas em folhas interativas
- Fontes via `next/font` (zero layout shift, `display: swap`)
- Sem imagens externas: gradientes e SVG inline no lugar de fotografia stock
- GSAP carregado apenas nos componentes que o usam; code-splitting por rota
- Alvo: Lighthouse ≥ 95 em todas as categorias, LCP < 1.5s, CLS 0
