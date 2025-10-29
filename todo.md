# Sistema WhatsApp IA - TODO

## ✅ Concluído

### Design System & Branding
- [x] Implementar paleta de cores quente (laranja #FF5A2A, marrom #2A1A16, bege #FFF9F6)
- [x] Remover todos os azuis do projeto
- [x] Tipografia bold e direta focada em resultados
- [x] Logo real (logo.png) implementada em todas as páginas
- [x] Logo aumentada para 140px em Login e Register
- [x] Responsividade completa mobile-first

### Landing Page
- [x] Header com navegação e CTAs
- [x] Hero section com CTAs principais
- [x] Seção de problemas que resolve (4 pain points)
- [x] Como funciona (4 passos)
- [x] Features principais com bordas animadas
- [x] Pricing com 4 planos e toggle mensal/anual (cálculo automático de desconto)
- [x] Carrossel responsivo de pricing cards em mobile
- [x] Avaliações de clientes (6 depoimentos)
- [x] Menu hamburguer mobile com sidebar lateral
- [x] Tipografia responsiva em todas as seções
- [x] Footer completo

### Autenticação
- [x] Página de Login com validações
- [x] Página de Cadastro com validações
- [x] Logo real nas páginas de Login e Register (140px)
- [x] Integração com Google OAuth
- [x] Responsividade mobile

### Onboarding
- [x] Wizard de 6 steps (boas-vindas, escolha conexão, QR code, sucesso, config IA, finalização)
- [x] Progress indicator visual (movido para área dedicada)
- [x] Vídeo responsivo
- [x] Logo real implementada
- [x] Remover emojis para visual profissional
- [x] Responsividade completa

### Dashboard
- [x] Layout com sidebar de navegação
- [x] Métricas principais (conversas, leads, taxa resposta, tempo médio)
- [x] Ações rápidas
- [x] Alertas recentes
- [x] Menu hamburguer mobile
- [x] Logo real na sidebar (100x80px, margem esquerda 53px)
- [x] Responsividade completa

### WhatsApp & Agentes
- [x] Página de gerenciamento de números WhatsApp
- [x] Modal de configuração de agente (6 passos completos)
- [x] Sistema multi-agente com triggers e prioridades
- [x] Responsividade

### CRM Avançado
- [x] 4 abas (IA, Notas, Financeiro, Atividade)
- [x] Insights da IA com ações sugeridas
- [x] Sistema de ações rápidas (8 modais funcionais)
- [x] Discussão interna tipo Slack (opcional com toggle)
- [x] Timeline de atividades
- [x] Reset de aba ao trocar contato
- [x] Responsividade

### Base de Conhecimento
- [x] Sidebar de filtros (categorias, fontes, status)
- [x] 4 métodos de adição de conteúdo (Manual, Upload, Website, FAQ)
- [x] Listagem em cards
- [x] Modais funcionais para cada método

### Refatoração & Code Quality
- [x] Criar componente Sidebar reutilizável
- [x] Refatorar Dashboard para usar Sidebar component
- [x] Refatorar WhatsAppAgents para usar Sidebar component
- [x] Refatorar CRMNew para usar Sidebar component
- [x] Refatorar BaseConhecimento para usar Sidebar component
- [x] Corrigir todos os erros de nested anchor tags (<a> dentro de <Link>)
  - [x] Dashboard
  - [x] WhatsAppAgents
  - [x] Login
  - [x] Register
- [x] Corrigir bug de aiConfig retornando undefined (Settings page)
- [x] Padronizar todas as rotas com prefixo /dashboard/
- [x] Criar arquivo menuItems.ts com navegação padronizada
- [x] Atualizar todas as páginas para usar dashboardMenuItems

### Database Schema
- [x] Tabela de usuários
- [x] Tabela de contatos (CRM)
- [x] Tabela de conversas
- [x] Tabela de mensagens
- [x] Tabela de campanhas
- [x] Tabela de conexões WhatsApp
- [x] Tabela de agentes IA
- [x] Tabela de alertas
- [x] Tabela de configurações IA
- [x] Tabela de integrações
- [x] Tabela de conhecimento (knowledge base)

## 🔄 Em Progresso

### CRUD de Contatos (CRM)
- [x] Implementar modal de adicionar contato
- [x] Implementar modal de editar contato
- [x] Implementar funcionalidade de remover contato
- [x] Gerenciamento de estado local (useState)
- [x] Validações de formulário
- [x] Feedback visual (toasts)
- [x] Botões de editar e remover em cada contato
- [x] Botão de adicionar novo contato no header

## 📋 Backlog (Próximas Features)

### Páginas Faltantes
- [ ] Página de Conversas (chat interface)
- [ ] Página de Campanhas (criação e gerenciamento)
- [ ] Página de Analytics (gráficos e métricas detalhadas)

### Integrações Backend
- [ ] Conectar tRPC routes com dados reais do banco
- [ ] Implementar integração WhatsApp Web
- [ ] Implementar integração WhatsApp Official API
- [ ] Integrar Claude API para agentes IA
- [ ] Sistema de webhooks para mensagens

### Features Avançadas
- [ ] Sistema de templates de mensagens
- [ ] Automações e workflows
- [ ] Relatórios exportáveis
- [ ] Sistema de notificações em tempo real
- [ ] Multi-tenancy completo
- [ ] Sistema de permissões por usuário

### Melhorias UX
- [ ] Loading states em todas as ações
- [ ] Error boundaries e tratamento de erros
- [ ] Toasts de confirmação em todas as ações
- [ ] Skeleton loaders
- [ ] Animações de transição

### Testes & QA
- [ ] Testes unitários
- [ ] Testes de integração
- [ ] Testes E2E
- [ ] Performance optimization
- [ ] SEO optimization

## 🐛 Bugs Conhecidos

(Nenhum bug conhecido no momento - todos corrigidos!)

## 📝 Notas Técnicas

### Estrutura do Projeto
- **Frontend**: React + TypeScript + Wouter + Tailwind CSS
- **Backend**: tRPC + Express + Drizzle ORM
- **Database**: MySQL/TiDB
- **Auth**: Manus OAuth

### Componentes Reutilizáveis
- `Sidebar.tsx`: Navegação principal (usado em Dashboard, CRM, WhatsApp, BaseConhecimento)
- Todos os componentes shadcn/ui em `client/src/components/ui/`

### Convenções
- **Cores**: Usar variáveis CSS do tema (--primary, --foreground, etc)
- **Responsividade**: Mobile-first com breakpoints md: e lg:
- **Tipografia**: text-sm/base/lg/xl com variações md: e lg:
- **Espaçamento**: p-4 md:p-6 lg:p-8 (padrão para padding responsivo)
- **Links**: Nunca usar `<a>` dentro de `<Link>` - passar className direto no Link

### Bugs Corrigidos Recentemente
1. ✅ Nested anchor tags em todas as páginas (Dashboard, WhatsApp, Login, Register)
2. ✅ aiConfig.get retornando undefined (agora retorna objeto padrão)
3. ✅ Sidebar duplicada em múltiplas páginas (agora usa componente único)
4. ✅ Logo usando texto ao invés de imagem em Login/Register
5. ✅ Tamanho da logo inconsistente (padronizado em 140px)

### Migração DashboardLayout para Sidebar
- [x] Migrar Analytics.tsx para usar Sidebar
- [x] Migrar Campanhas.tsx para usar Sidebar
- [x] Migrar Conversas.tsx para usar Sidebar
- [x] Todas as 8 páginas do dashboard agora usam Sidebar consistente

## 🐛 Bugs Conhecidos

(Nenhum bug conhecido no momento - todos corrigidos!)

## 🐛 Bugs Reportados

- [x] Overlay dos modais muito transparente - ajustado para 80% de opacidade
- [x] Conteúdo do modal transparente - forçado bg-white no DialogContent
- [x] Dropdown de status no modal ficando transparente - forçado bg-white no SelectContent

## 🔄 Refatoração de Configurações

- [x] Remover WhatsApp e Base de Conhecimento da sidebar
- [x] Criar página Configurações com abas (tabs)
- [x] Aba WhatsApp - estrutura criada (conteúdo será migrado)
- [x] Aba Base de Conhecimento - estrutura criada (conteúdo será migrado)
- [x] Aba Regras de Negócio - estrutura criada (nova seção)
- [x] Atualizar menuItems.ts removendo itens da sidebar
- [ ] Migrar conteúdo da página WhatsAppAgents para aba WhatsApp
- [ ] Migrar conteúdo da página BaseConhecimento para aba Base de Conhecimento
- [ ] Implementar funcionalidades na aba Regras de Negócio
