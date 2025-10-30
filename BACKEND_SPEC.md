# Especificação Backend - Tela de Conversas

## 📋 Visão Geral

A tela de Conversas precisa de dados em tempo real do WhatsApp + CRM. Este documento detalha os endpoints e estrutura de dados necessários.

---

## 🔌 Endpoints tRPC Necessários

### 1. **conversations.list** - Lista todas as conversas

**Endpoint:** `trpc.conversations.list.useQuery()`

**Retorno esperado:**
```typescript
type ConversationListItem = {
  id: number;

  // Dados do Contato (JOIN com tabela contacts)
  contactId: number;
  contactName: string | null;
  contactPhone: string;
  contactEmail: string | null;
  contactCompany: string | null;
  contactLocation: string | null;

  // Dados CRM
  contactScore: number;
  contactPipeline: string; // "novo", "qualificado", "negociacao", "ganho", "perdido"
  contactDealValue: number; // em centavos
  contactTags: string[]; // array parseado do JSON

  // Dados da Conversa
  status: "ativa" | "finalizada" | "abandonada";
  lastMessageAt: Date;
  lastMessageContent: string; // conteúdo da última mensagem
  unreadCount: number; // quantidade de mensagens não lidas

  // Agente responsável
  agentType: "ai" | "human" | "none";
  agentName: string | null; // nome do agente de IA ou humano
  aiConfigId: number | null; // qual configuração de IA está usando

  // WhatsApp Connection
  connectionId: number;
  connectionPhone: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
};

// Array ordenado por lastMessageAt DESC
type ConversationsListResponse = ConversationListItem[];
```

**Query SQL sugerida:**
```sql
SELECT
  c.id,
  c.contactId,
  c.status,
  c.lastMessageAt,
  c.connectionId,

  -- Contato
  co.name as contactName,
  co.phoneNumber as contactPhone,
  co.email as contactEmail,
  co.company as contactCompany,
  co.status as contactPipeline,
  co.score as contactScore,
  co.dealValue as contactDealValue,
  co.tags as contactTags,

  -- Última mensagem
  (SELECT content FROM messages WHERE conversationId = c.id ORDER BY sentAt DESC LIMIT 1) as lastMessageContent,

  -- Mensagens não lidas (inbound que não foram lidas)
  (SELECT COUNT(*) FROM messages WHERE conversationId = c.id AND direction = 'inbound' AND readAt IS NULL) as unreadCount,

  -- WhatsApp Connection
  wc.phoneNumber as connectionPhone

FROM conversations c
JOIN contacts co ON c.contactId = co.id
JOIN whatsapp_connections wc ON c.connectionId = wc.id
WHERE c.userId = ?
ORDER BY c.lastMessageAt DESC
```

---

### 2. **conversations.get** - Detalhes de uma conversa específica

**Endpoint:** `trpc.conversations.get.useQuery({ id: number })`

**Retorno esperado:**
```typescript
type ConversationDetail = {
  id: number;
  status: "ativa" | "finalizada" | "abandonada";

  // Contato completo
  contact: {
    id: number;
    name: string | null;
    phone: string;
    email: string | null;
    company: string | null;
    location: string | null;
    score: number;
    pipeline: "novo" | "qualificado" | "negociacao" | "ganho" | "perdido";
    dealValue: number; // em centavos (converter para R$)
    tags: string[];
    notes: string | null;
    source: string | null;
    lastInteraction: Date | null;
  };

  // Notas CRM (pode ser parseado do campo notes ou tabela separada)
  crmNotes: Array<{
    text: string;
    author: string;
    time: Date;
  }>;

  // Tarefas/Próximos Passos (pode ser tabela separada ou JSON)
  tasks: Array<{
    text: string;
    done: boolean;
    dueDate: Date | null;
  }>;

  // Agente IA configurado
  aiConfig: {
    id: number;
    name: string;
    isActive: boolean;
  } | null;

  // Timestamps
  createdAt: Date;
  lastMessageAt: Date | null;
};
```

---

### 3. **conversations.messages** - Mensagens de uma conversa

**Endpoint:** `trpc.conversations.messages.useQuery({ conversationId: number })`

**Retorno esperado:**
```typescript
type ConversationMessage = {
  id: number;
  conversationId: number;

  // Direção e tipo
  direction: "inbound" | "outbound";
  messageType: "text" | "image" | "audio" | "video" | "document";

  // Conteúdo
  content: string;
  mediaUrl: string | null;

  // Quem enviou
  isFromAI: boolean;
  agentName: string | null; // se foi humano, nome do atendente

  // Status de entrega (apenas para outbound)
  sentAt: Date;
  deliveredAt: Date | null;
  readAt: Date | null;

  createdAt: Date;
};

// Array ordenado por sentAt ASC
type MessagesResponse = ConversationMessage[];
```

---

### 4. **conversations.sendMessage** - Enviar mensagem (MUTATION)

**Endpoint:** `trpc.conversations.sendMessage.useMutation()`

**Input:**
```typescript
type SendMessageInput = {
  conversationId: number;
  content: string;
  messageType?: "text" | "image" | "audio" | "video" | "document";
  mediaUrl?: string;
  sendViaAI?: boolean; // se true, IA processa e envia
};
```

**Retorno:**
```typescript
type SendMessageResponse = {
  success: boolean;
  messageId: number;
  sentAt: Date;
  error?: string;
};
```

**O que o backend deve fazer:**
1. Salvar mensagem na tabela `messages` (direction: "outbound", isFromAI: false)
2. Enviar via WhatsApp API (Evolution/Baileys)
3. Atualizar `lastMessageAt` na conversa
4. Se `sendViaAI: true`, acionar processamento da IA
5. Retornar sucesso/erro

---

### 5. **conversations.pauseAI** - Pausar IA em uma conversa (MUTATION)

**Endpoint:** `trpc.conversations.pauseAI.useMutation()`

**Input:**
```typescript
type PauseAIInput = {
  conversationId: number;
  paused: boolean; // true = pausar, false = retomar
};
```

**Retorno:**
```typescript
type PauseAIResponse = {
  success: boolean;
};
```

**Sugestão:** Adicionar campo `aiPaused: boolean` na tabela `conversations`

---

### 6. **conversations.markAsRead** - Marcar mensagens como lidas (MUTATION)

**Endpoint:** `trpc.conversations.markAsRead.useMutation()`

**Input:**
```typescript
type MarkAsReadInput = {
  conversationId: number;
};
```

**Retorno:**
```typescript
type MarkAsReadResponse = {
  success: boolean;
  markedCount: number;
};
```

**O que fazer:**
```sql
UPDATE messages
SET readAt = NOW()
WHERE conversationId = ?
  AND direction = 'inbound'
  AND readAt IS NULL
```

---

### 7. **conversations.updateStatus** - Atualizar status da conversa (MUTATION)

**Endpoint:** `trpc.conversations.updateStatus.useMutation()`

**Input:**
```typescript
type UpdateStatusInput = {
  conversationId: number;
  status: "ativa" | "finalizada" | "abandonada";
};
```

---

## 🔄 Atualização em Tempo Real

### Opção 1: **WebSocket (Recomendado)**

```typescript
// Frontend se inscreve em updates de conversas
const ws = new WebSocket('ws://backend/conversations');

ws.on('message', (data) => {
  // Atualiza cache do tRPC
  trpcUtils.conversations.list.invalidate();
  trpcUtils.conversations.messages.invalidate();
});
```

**Eventos que o backend deve emitir:**
- `new_message` - nova mensagem recebida
- `message_sent` - mensagem enviada com sucesso
- `message_read` - mensagem foi lida
- `conversation_updated` - status da conversa mudou

### Opção 2: **Polling** (Alternativa simples)

Frontend faz refetch a cada 3-5 segundos:
```typescript
useQuery({
  refetchInterval: 3000 // 3 segundos
});
```

---

## 📊 Mapeamento de Status

### Status da Conversa → Indicador Visual

```typescript
const statusMapping = {
  "urgent": {
    color: "red",
    icon: "AlertCircle",
    meaning: "Conversa precisa atenção urgente"
  },
  "ai": {
    color: "green",
    icon: "Bot",
    meaning: "IA está respondendo"
  },
  "you": {
    color: "yellow",
    icon: "User",
    meaning: "Aguardando resposta humana"
  },
  "resolved": {
    color: "gray",
    icon: "CheckCircle",
    meaning: "Conversa finalizada"
  }
};
```

**Sugestão:** Adicionar campo `conversationStatus` na tabela:
```sql
ALTER TABLE conversations
ADD COLUMN displayStatus ENUM('urgent', 'ai', 'you', 'resolved')
DEFAULT 'ai';
```

---

## 🎯 Dados Calculados/Derivados

Alguns dados não estão no banco e precisam ser calculados:

### `clientInitials` (Iniciais do nome)
```typescript
// Backend calcula e envia
const getInitials = (name: string | null) => {
  if (!name) return "??";
  return name.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};
```

### `time` (Tempo relativo)
```typescript
// Frontend calcula baseado em lastMessageAt
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const time = formatDistanceToNow(lastMessageAt, {
  addSuffix: true,
  locale: ptBR
}); // "há 2 minutos"
```

### `value` (Formatação de moeda)
```typescript
// Backend envia em centavos, frontend formata
const formatCurrency = (cents: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(cents / 100);
};
```

---

## 📦 Alterações no Schema Sugeridas

### Tabela `conversations`
```sql
ALTER TABLE conversations
ADD COLUMN aiPaused BOOLEAN DEFAULT FALSE,
ADD COLUMN displayStatus ENUM('urgent', 'ai', 'you', 'resolved') DEFAULT 'ai',
ADD COLUMN aiConfigId INT NULL,
ADD COLUMN assignedUserId INT NULL; -- se humano assumiu
```

### Tabela `contacts`
```sql
-- O campo 'notes' atual é text, melhor JSON estruturado
ALTER TABLE contacts
ADD COLUMN structuredNotes JSON; -- [{text, author, time}]

-- Tabela separada para tasks (melhor opção)
CREATE TABLE contact_tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  contactId INT NOT NULL,
  text TEXT NOT NULL,
  done BOOLEAN DEFAULT FALSE,
  dueDate DATETIME,
  createdAt DATETIME DEFAULT NOW(),
  FOREIGN KEY (contactId) REFERENCES contacts(id)
);
```

---

## 🔐 Segurança

Todos os endpoints devem:
1. Validar que `userId` da sessão = `userId` do recurso
2. Não permitir acesso a conversas de outros usuários
3. Rate limiting em envio de mensagens

```typescript
// Exemplo de validação
protectedProcedure
  .input(z.object({ conversationId: z.number() }))
  .query(async ({ ctx, input }) => {
    const conv = await getConversation(input.conversationId);

    if (conv.userId !== ctx.user.id) {
      throw new TRPCError({ code: 'FORBIDDEN' });
    }

    return conv;
  });
```

---

## 📝 Exemplo de Uso no Frontend

```typescript
// Lista de conversas
const { data: conversations } = trpc.conversations.list.useQuery();

// Mensagens da conversa selecionada
const { data: messages } = trpc.conversations.messages.useQuery({
  conversationId: selectedConvId
});

// Enviar mensagem
const sendMessage = trpc.conversations.sendMessage.useMutation({
  onSuccess: () => {
    // Atualiza cache
    trpcUtils.conversations.messages.invalidate();
  }
});

// Uso
sendMessage.mutate({
  conversationId: 1,
  content: "Olá!",
  messageType: "text"
});
```

---

## 🎨 Status e Cores (Padronizado)

```typescript
// Sugestão de lógica para displayStatus
const calculateDisplayStatus = (conversation) => {
  // Se tem mensagens não lidas do cliente há mais de 5min
  if (conversation.unreadCount > 0 &&
      Date.now() - conversation.lastMessageAt > 5 * 60 * 1000) {
    return "urgent";
  }

  // Se IA está respondendo
  if (!conversation.aiPaused && conversation.aiConfigId) {
    return "ai";
  }

  // Se aguarda humano
  if (conversation.aiPaused || conversation.assignedUserId) {
    return "you";
  }

  // Se finalizada
  if (conversation.status === "finalizada") {
    return "resolved";
  }

  return "ai";
};
```

---

## ✅ Checklist de Implementação

- [ ] Endpoints tRPC configurados
- [ ] Query otimizada com JOINs
- [ ] Webhook para receber mensagens do WhatsApp
- [ ] Integração com Evolution API (ou similar)
- [ ] WebSocket para updates em tempo real
- [ ] Validação de segurança (userId)
- [ ] Campos adicionais no schema
- [ ] Testes de carga

---

## 🚀 Próximos Passos

1. Backend implementa endpoints listados
2. Frontend conecta tRPC (já está configurado)
3. Remover dados mockados de `Conversas.tsx`
4. Implementar WebSocket para tempo real
5. Testar com dados reais do WhatsApp

---

**Dúvidas?** Este documento cobre tudo que preciso do backend para a tela de Conversas funcionar 100% com dados reais.
