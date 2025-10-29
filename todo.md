# Sistema WhatsApp IA - TODO

## Design System
- [ ] Implementar paleta de cores completa (Primary Blue, Secondary Orange, Success, Warning, Danger)
- [ ] Configurar tipografia Inter com tamanhos corretos
- [ ] Aplicar sistema de espaçamento 8px grid
- [ ] Criar componentes base (botões, inputs, cards) com specs corretas

## Landing Page (/)
- [x] Header com navegação e CTAs
- [x] Hero Section com headline e visual
- [x] Social Proof Section
- [x] Problema Section (4 pain points)
- [x] Solução Section (Como Funciona - 4 passos)
- [x] Features Section (6 feature cards)
- [x] Pricing Section (4 planos)
- [x] FAQ Section (accordion)
- [x] CTA Final
- [x] Footer completo

## Login (/login)
- [x] Layout centralizado com card
- [x] Campos de email e senha
- [x] Checkbox "Lembrar de mim"
- [x] Botão de login
- [x] Opção "Continuar com Google"
- [x] Links para recuperação e cadastro

## Cadastro (/register)
- [x] Campos: Nome, Email, Telefone, Senha
- [x] Indicador de força da senha
- [x] Checkbox de termos de uso
- [x] Validações em tempo real

## Onboarding Wizard (/onboarding)
- [x] Step 1: Boas-vindas com vídeo
- [x] Step 2: Escolher tipo de conexão (Web vs API)
- [x] Step 3: QR Code para conectar WhatsApp
- [x] Step 4: Confirmação de sucesso
- [x] Step 5: Configurar agente IA (nome, tipo, tom)
- [x] Step 6: Finalização com teste

## Dashboard (área logada)
- [ ] Refazer layout seguindo design system
- [ ] Métricas principais
- [ ] Gráficos e visualizações

## Módulos (área logada)
- [ ] Conversas
- [ ] CRM
- [ ] Campanhas
- [ ] Analytics
- [ ] Configurações

## Infraestrutura
- [x] Schema do banco de dados
- [x] Rotas tRPC
- [ ] Autenticação completa
- [ ] Integração WhatsApp Web
- [ ] Integração WhatsApp API
- [ ] Integração com IA

## Bugs e Ajustes
- [x] Criar rota /dashboard
- [x] Criar página Dashboard completa com métricas
- [x] Adicionar navegação lateral (sidebar)


## Nova Arquitetura: Múltiplos Números e Agentes

### Página: Gerenciamento WhatsApp & Agentes (/dashboard/whatsapp)
- [ ] Lista de números WhatsApp conectados
- [ ] Expandir/colapsar cada número
- [ ] Ver agentes ativos por número
- [ ] Botão "Adicionar Número"
- [ ] Botão "Adicionar Agente" por número
- [ ] Status de conexão (conectado/desconectado)
- [ ] Tipo de conexão (Web/API)

### Modal: Configurar Agente (6 passos)
- [x] Step 1: Básico (nome, descrição, número)
- [x] Step 2: Triggers (primeira mensagem, palavras-chave, horário, tag CRM, score, status pipeline)
- [x] Step 3: Personalidade (system prompt, temperatura, max tokens, templates)
- [x] Step 4: Ações Automáticas (atualizar CRM, agendar follow-ups, transferir agente, integrar calendário, criar tarefas, notificar humano)
- [x] Step 5: Handoff (quando passar pra humano, mensagem ao transferir, notificar quem)
- [x] Step 6: Revisão (resumo de tudo, testar agente, salvar ativo/inativo)

### Sistema de Roteamento Inteligente
- [ ] Analisar mensagem do cliente
- [ ] Verificar triggers de cada agente
- [ ] Sistema de prioridade (match exato > prioridade manual > contexto > fallback)
- [ ] Ativar agente correto

### CRM Expandido - Nova Sidebar

#### Aba: 🤖 IA
- [x] Resumo automático da IA (contexto, interesse, objeções, motivação)
- [x] Próximas ações sugeridas (com botões de ação)
- [x] Alertas (mencionou concorrente, sem resposta, probabilidade conversão)
- [x] Intenção detectada (primária e secundária)
- [x] Sentimento (barra de progresso, tendência)

#### Aba: 📝 Notas
- [x] Campo para adicionar nota (privada/pública)
- [x] Botão "IA: Gerar Resumo"
- [x] Notas fixadas (com opção de fixar/desfixar)
- [x] Notas regulares (timeline de todas as notas)
- [x] Notas automáticas da IA
- [x] Notas da equipe

#### Aba: 💵 Financeiro
- [x] Total gasto, ticket médio, número de compras
- [x] Histórico de transações
- [x] Proposta atual (valor, status, validade)
- [x] Botões: Ver nota fiscal, Ver proposta, Editar, Reenviar

#### Aba: 📊 Atividade
- [x] Timeline completa (já existe, manter)

### Ações Rápidas no CRM
- [x] 📧 Enviar Mensagem
- [x] 📞 Ligar (em breve)
- [x] 📅 Agendar Follow-up
- [x] 📝 Criar Tarefa
- [x] 🎯 Mudar Status
- [x] 🏷️ Adicionar Tag
- [x] 💰 Nova Proposta
- [x] 🤖 Atribuir para IA (modal com instrução específica)
- [x] 👤 Transferir p/ Humano
- [ ] 📋 Duplicar Contato
- [ ] 🗑️ Arquivar Contato

### Modal: Instruir IA
- [ ] Campo de texto para instrução específica
- [ ] Quando executar (agora / quando cliente responder)
- [ ] Qual agente deve executar (dropdown)
- [ ] Checkbox: Notificar-me quando IA executar

### Discussão Interna (tipo Slack)
- [x] Lista de comentários da equipe
- [x] Comentários automáticos da IA
- [x] Campo para adicionar comentário
- [x] Sistema de menções (@usuario)
- [x] Reações (👍, etc)
- [x] Botão "Executar sugestão" em comentários da IA
- [x] Anexar arquivos

## Branding
- [x] Atualizar todas as páginas para usar logo JáRespondi
- [x] Mudar nome de JáResponde para JáRespondi em todos os lugares


## Bugs
- [x] CRM: Discussão interna aparecendo automaticamente - deve ser opcional (botão para abrir/fechar)

- [x] CRM: Ajustar ações sugeridas pela IA - deixar claro que é a IA quem executa, mostrar agendamento/prazo

- [x] CRM: Implementar funcionalidades nos botões de ações rápidas (enviar mensagem, agendar follow-up, criar tarefa, etc)

- [x] CRM: Bug ao trocar de contato - conteúdo das abas não atualiza corretamente

- [x] Atualizar design system completo com novas cores (laranja #FF5A2A, marrom #2A1A16, bege #FFF9F6)
- [ ] Atualizar todas as páginas com novo design system
- [x] Ajustar tipografia para ser mais direta e focada em resultados

- [x] Remover TODOS os azuis do projeto e substituir por laranja #FF5A2A

- [x] Corrigir duplicação de style no logo
- [x] Remover emojis das features (deixar mais profissional)

- [x] Implementar cálculo de preço anual (mensal x12 com 20% desconto) no toggle Mensal/Anual
- [x] Adicionar borda laranja animada girando nos cards de features
- [x] Aumentar mais o tamanho do logo (100x90px)
- [ ] Tornar pricing cards responsivo com carrossel (2 cards + setas em mobile)
- [x] Remover seção FAQ e substituir por avaliações de clientes

- [x] Corrigir borda laranja animada nos cards de features (remover div interna, aplicar animação corretamente)
- [x] Implementar carrossel responsivo para pricing cards (2 cards + setas em mobile)

- [x] Bug: Setas de navegação do carrossel de preços não estão aparecendo em mobile

- [x] Bug: Cards do carrossel mobile ficaram muito grandes, precisa ajustar tamanho

- [x] Bug: Tipografia não responsiva em mobile - textos muito grandes, precisa reduzir fontes

- [x] Implementar menu hamburguer mobile no header com sidebar de navegação

- [x] Ajustar espaçamento entre botões no hero section (muito grudados)
