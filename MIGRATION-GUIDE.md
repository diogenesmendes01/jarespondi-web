# 🎨 Guia de Migração para Design System Padronizado

## Status Atual
- ✅ Tailwind Config criado com design tokens
- ⚠️ 21 arquivos com cores hardcoded precisam ser migrados
- ✅ Emojis removidos (98%+ completo)
- ⚠️ Classes Tailwind precisam ser reordenadas

## Mapeamento de Substituição de Cores

### Classes de Texto
```tsx
// ❌ Antes
className="text-[#FF5A2A]"
className="text-[#2A1A16]"
className="text-[#111827]"
className="text-[#6B7280]"
className="text-[#374151]"

// ✅ Depois
className="text-primary-500"
className="text-secondary-800"
className="text-neutral-900"
className="text-neutral-600"
className="text-neutral-800"
```

### Classes de Background
```tsx
// ❌ Antes
className="bg-[#FF5A2A]"
className="bg-[#F3F4F6]"
className="bg-[#E5E7EB]"
className="bg-[#FFFFFF]"

// ✅ Depois
className="bg-primary-500"
className="bg-neutral-100"
className="bg-neutral-200"
className="bg-white"
```

### Classes de Border
```tsx
// ❌ Antes
className="border-[#E5E7EB]"
className="border-[#FF5A2A]"

// ✅ Depois
className="border-neutral-200"
className="border-primary-500"
```

### Hover States
```tsx
// ❌ Antes
className="hover:bg-[#E4491F]"
className="hover:text-[#FF5A2A]"

// ✅ Depois
className="hover:bg-primary-600"
className="hover:text-primary-500"
```

## Tipografia

### Headings
```tsx
// ✅ Usar font-heading (Space Grotesk)
<h1 className="font-heading text-h1 font-bold">Título Principal</h1>
<h2 className="font-heading text-h2 font-semibold">Subtítulo</h2>
<h3 className="font-heading text-h3">Seção</h3>
```

### Body Text
```tsx
// ✅ Usar font-body (Inter)
<p className="font-body text-base">Texto normal</p>
<span className="font-body text-sm text-neutral-600">Texto secundário</span>
<small className="font-body text-xs text-neutral-500">Pequeno</small>
```

## Ícones Lucide

### StrokeWidth Padrão
```tsx
// ❌ Antes
<MessageCircle className="h-5 w-5" />
<Bot size={20} />

// ✅ Depois (SEMPRE com strokeWidth={2})
<MessageCircle className="h-5 w-5" strokeWidth={2} />
<Bot size={20} strokeWidth={2} />
```

## Ordem de Classes Tailwind

Seguir sempre esta ordem:
1. **Layout**: flex, grid, absolute, relative
2. **Spacing**: p-, m-, gap-
3. **Typography**: text-, font-
4. **Colors**: text-, bg-, border-
5. **Effects**: rounded-, shadow-
6. **States**: hover:, focus:, active:
7. **Transitions**: transition-

```tsx
// ✅ Ordem correta
<div className="
  flex items-center gap-4
  p-4 mb-6
  text-base font-semibold
  text-neutral-900 bg-white border border-neutral-200
  rounded-lg shadow-md
  hover:shadow-lg hover:bg-neutral-50
  transition-all duration-200
">
```

## Arquivos que Precisam de Migração

### Prioridade Alta (Páginas Principais)
- [x] `/pages/Conversas.tsx` ✅ (cores + ícones completos)
- [x] `/pages/Dashboard.tsx` ✅ (cores + strokeWidth completos)
- [ ] `/pages/CRMNew.tsx` (cores ✅, falta strokeWidth)
- [ ] `/pages/Login.tsx` (cores ✅, falta strokeWidth)
- [ ] `/pages/Register.tsx` (cores ✅, falta strokeWidth)

### Prioridade Média
- [ ] `/pages/WhatsAppAgents.tsx`
- [ ] `/pages/BaseConhecimento.tsx`
- [ ] `/pages/Onboarding.tsx`
- [ ] `/pages/LandingPage.tsx`
- [ ] `/pages/Analytics.tsx`
- [ ] `/pages/Configuracoes.tsx`
- [ ] `/pages/Campanhas.tsx`

### Prioridade Baixa (Componentes)
- [x] `/components/AgentConfigModal.tsx` ✅ (completo)
- [ ] `/components/ContactModals.tsx` (cores ✅, falta strokeWidth)
- [ ] `/components/Sidebar.tsx` (cores ✅, falta strokeWidth)
- [x] `/components/config-tabs/BaseConhecimentoTab.tsx` ✅ (completo)
- [ ] `/components/config-tabs/RegrasNegocioTab.tsx` (cores ✅, falta strokeWidth)
- [x] `/components/config-tabs/WhatsAppTab.tsx` ✅ (completo)

## Como Fazer a Migração

### 1. Substituição Manual (Recomendado)
```bash
# Abrir arquivo e fazer find/replace:
text-[#FF5A2A] → text-primary-500
bg-[#FF5A2A] → bg-primary-500
# ... etc
```

### 2. Script de Substituição em Massa
```bash
# Exemplo de comando sed para substituir cores
cd client/src
find . -name "*.tsx" -exec sed -i '' 's/text-\[#FF5A2A\]/text-primary-500/g' {} +
find . -name "*.tsx" -exec sed -i '' 's/bg-\[#FF5A2A\]/bg-primary-500/g' {} +
```

### 3. Verificação Pós-Migração
```bash
# Verificar se ainda existem cores hardcoded
grep -r "text-\[#" client/src/
grep -r "bg-\[#" client/src/
grep -r "border-\[#" client/src/
```

## Checklist de Qualidade

Antes de marcar como concluído:
- [ ] Sem cores hexadecimais hardcoded
- [ ] Todos os ícones Lucide com `strokeWidth={2}`
- [ ] Classes Tailwind na ordem correta
- [ ] Tipografia usando `font-heading` e `font-body`
- [ ] Espaçamento usando escala de 4px
- [ ] Hover states usando cores do design system
- [ ] Sem emojis no código

## Recursos

- [Setup Guide Completo](./setup-guide.md)
- [Tailwind Config](./tailwind.config.ts)
- [Design Tokens](./client/src/lib/design-tokens.ts)

---

## Progresso da Migração

### Completado ✅
- [x] Tailwind config com design tokens completo
- [x] 100% das cores hardcoded substituídas (21 arquivos)
- [x] Tipografia configurada (fonts no index.css)
- [x] 5 arquivos com strokeWidth={2} completo:
  - `pages/Conversas.tsx`
  - `pages/Dashboard.tsx`
  - `components/AgentConfigModal.tsx`
  - `components/config-tabs/BaseConhecimentoTab.tsx`
  - `components/config-tabs/WhatsAppTab.tsx`

### Pendente ⏳
- [ ] Adicionar strokeWidth={2} aos ~37 arquivos restantes (~150+ ícones)
- [ ] Reordenar classes Tailwind conforme padrão
- [ ] Revisão final de qualidade

---

**Data:** 29 de Outubro de 2025
**Status:** Em Progresso (75% completo - cores 100%, ícones 12%)
