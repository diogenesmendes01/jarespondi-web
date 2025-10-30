# 📱 API Frontend - Conversas WhatsApp

Guia simplificado para integração do frontend com o backend de WhatsApp.

---

## 🎯 Base URL

```
Production:  https://api.seudominio.com
Development: http://localhost:3000
WebSocket:   ws://localhost:3000/ws
```

---

## 🧠 FILOSOFIA: BACKEND INTELIGENTE, FRONTEND "BURRO"

### Princípio Fundamental

**O frontend NÃO deve ter lógica de negócio.** Todos os dados vêm do backend:
- ✅ Já tratados
- ✅ Já enriquecidos
- ✅ Já formatados
- ✅ Prontos para renderizar

### O que o Backend Faz:

#### 1. 🏢 **Enriquecimento com CRM**
```typescript
// ❌ Frontend NÃO faz isso:
const isLead = contact.email && !contact.customerId;

// ✅ Backend já envia:
contact.crm.type = "LEAD"
contact.crm.isRegistered = true
```

#### 2. 📝 **Nomes Inteligentes**
```typescript
// Backend decide prioridade:
displayName = crm.name || whatsapp.pushName || phoneNumber

// Frontend só renderiza:
<h3>{contact.displayName}</h3>
```

#### 3. 🎨 **UI Pronta**
```typescript
// Backend gera:
avatar: {
  url: "...",
  fallback: "JS",  // Iniciais
  color: "#4CAF50"  // Cor consistente
}

// Frontend usa direto:
<Avatar src={avatar.url} fallback={avatar.fallback} color={avatar.color} />
```

#### 4. 📊 **Métricas Calculadas**
```typescript
// ❌ Frontend NÃO calcula:
const avgResponse = messages.reduce(...) / messages.length;

// ✅ Backend já envia:
metrics.avgResponseTime = 125  // segundos
```

#### 5. 💰 **Dados Comerciais**
```typescript
// Backend enriquece:
crm.pipeline = {
  stage: "Proposta Enviada",
  dealValue: 2500.00,
  probability: 75
}
```

#### 6. 🤖 **IA Integrada**
```typescript
// Backend processa:
ai: {
  sentiment: "POSITIVE",
  nextBestAction: "Enviar proposta",
  intents: ["pricing_inquiry"]
}
```

### Exemplos Práticos:

#### ❌ **ERRADO** (Frontend tem lógica)

```typescript
// Frontend fazendo tratamento
function ContactCard({ contact }) {
  // ❌ Lógica de negócio no frontend
  const displayName = contact.crmName 
    || contact.whatsappName 
    || contact.phoneNumber;
  
  // ❌ Decisão de cor no frontend
  const avatarColor = contact.phoneNumber.length % 2 === 0 
    ? 'blue' 
    : 'green';
  
  // ❌ Cálculo no frontend
  const isVip = contact.totalPurchases > 5000;
  
  return (
    <div>
      <Avatar color={avatarColor}>{displayName[0]}</Avatar>
      <h3>{displayName}</h3>
      {isVip && <Badge>VIP</Badge>}
    </div>
  );
}
```

#### ✅ **CORRETO** (Frontend só renderiza)

```typescript
// Frontend renderizando dados prontos
function ContactCard({ contact }) {
  // ✅ Tudo vem pronto do backend
  return (
    <div>
      <Avatar 
        src={contact.avatar.url}
        fallback={contact.avatar.fallback}
        color={contact.avatar.color}
      />
      <h3>{contact.displayName}</h3>
      
      {contact.crm.isRegistered && (
        <Badge color={contact.crm.statusColor}>
          {contact.crm.status}
        </Badge>
      )}
      
      {contact.crm.type === 'VIP' && (
        <VipBadge />
      )}
    </div>
  );
}
```

---

## 📋 DADOS QUE VÊM DO BACKEND (Completo)

### 1. **Informações Básicas** (sempre presentes)
```typescript
{
  id: string
  displayName: string        // Nome tratado (CRM > WhatsApp > Phone)
  phoneNumber: string        // Formatado
  avatar: {
    url: string
    fallback: string         // Iniciais
    color: string           // Cor hex
  }
}
```

### 2. **Dados do CRM** (se cadastrado)
```typescript
crm: {
  isRegistered: boolean
  customerId: string
  type: "LEAD" | "CUSTOMER" | "PROSPECT" | "VIP"
  status: "NEW" | "QUALIFIED" | "NEGOTIATING" | "WON" | "LOST"
  statusColor: string        // Cor hex
  company: string
  email: string
  phone: string
  tags: string[]
  
  assignedTo: {              // Responsável
    id: string
    name: string
    avatar: string
  }
  
  pipeline: {                // Funil de vendas
    stage: string
    stageColor: string
    dealValue: number
    currency: string
    probability: number
  }
  
  summary: {
    firstContactDate: string
    lastPurchaseDate: string
    totalPurchases: number
    lifetimeValue: number
  }
}
```

### 3. **Métricas** (calculadas pelo backend)
```typescript
metrics: {
  avgResponseTime: number    // segundos
  lastResponseTime: number
  totalMessages: number
  sentiment: "POSITIVE" | "NEUTRAL" | "NEGATIVE"
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT"
  priorityColor: string      // Cor hex
}
```

### 4. **IA/Automação** (processado pelo backend)
```typescript
ai: {
  autoReplyEnabled: boolean
  lastAiSuggestion: string
  intents: string[]          // Intenções detectadas
  nextBestAction: string     // Próxima ação sugerida
  confidence: number         // 0-1
}
```

### 5. **Labels/Tags** (gerenciadas pelo sistema)
```typescript
labels: [
  {
    id: string
    name: string
    color: string            // Cor hex
    icon: string             // Ícone (opcional)
  }
]
```

### 6. **Mídia** (já processada)
```typescript
media: {
  id: string
  type: "IMAGE" | "VIDEO" | "AUDIO" | "DOCUMENT"
  url: string                // URL assinada, pronta para uso
  thumbnailUrl: string       // Se aplicável
  mimeType: string
  size: number
  sizeFormatted: string      // "1.5 MB"
  fileName: string
  
  // Para imagem/vídeo
  width?: number
  height?: number
  
  // Para áudio/vídeo
  duration?: number
  durationFormatted?: string // "00:15"
  
  // Para áudio
  transcription?: {
    text: string
    confidence: number
    language: string
  }
  
  downloadStatus: "PENDING" | "COMPLETED" | "FAILED"
  expiresAt: string          // Quando o link expira
}
```

### 7. **Metadados** (informações do sistema)
```typescript
metadata: {
  provider: "BAILEYS" | "META_API"
  deliveredAt: string
  readAt: string
  editedAt: string
  isForwarded: boolean
  isAiGenerated: boolean
  aiModel: string
  aiConfidence: number
}
```

---

## 🎯 REGRAS DE OURO

### Para o Frontend:

1. ✅ **NUNCA** calcule métricas
2. ✅ **NUNCA** tome decisões de negócio
3. ✅ **NUNCA** formate datas/valores além do básico
4. ✅ **NUNCA** decida cores/estilos baseados em lógica
5. ✅ **SEMPRE** renderize o que vem do backend

### Para o Backend:

1. ✅ **SEMPRE** envie dados prontos para usar
2. ✅ **SEMPRE** enriqueça com CRM
3. ✅ **SEMPRE** calcule métricas
4. ✅ **SEMPRE** formate valores (datas, moedas, tamanhos)
5. ✅ **SEMPRE** inclua contexto necessário

---

## 🔐 Autenticação

Todas as requisições precisam do header:

```http
Authorization: Bearer {seu_token_jwt}
```

---

## 📨 1. LISTAR CONVERSAS

Lista todas as conversas ativas do usuário.

### Request

```http
GET /api/conversations
```

**Query Parameters (opcionais):**
```
?status=active          # active | archived | spam
?unread=true           # Apenas não lidas
?page=1                # Paginação
&limit=20              # Itens por página
```

### Response

```json
{
  "data": [
    {
      "id": "conv-uuid-123",
      
      // 👤 DADOS DO CONTATO (já enriquecidos do CRM)
      "contact": {
        "id": "contact-uuid-456",
        "phoneNumber": "5511999999999",
        "isGroup": false,
        
        // Nome já tratado (prioridade: CRM > WhatsApp > Número)
        "displayName": "João Silva",
        "whatsappName": "João S.",  // Nome original do WhatsApp
        
        // Avatar já processado
        "avatar": {
          "url": "https://cdn.example.com/avatars/joao.jpg",
          "fallback": "JS",  // Iniciais para fallback
          "color": "#4CAF50"  // Cor gerada para o avatar
        },
        
        // 🏢 DADOS DO CRM (se cadastrado)
        "crm": {
          "isRegistered": true,
          "customerId": "crm-customer-789",
          "type": "LEAD",  // LEAD | CUSTOMER | PROSPECT | VIP
          "status": "QUALIFIED",  // NEW | CONTACTED | QUALIFIED | NEGOTIATING | WON | LOST
          "company": "Tech Solutions LTDA",
          "email": "joao@techsolutions.com",
          "tags": ["Premium", "Interested in Plan Pro"],
          
          // Responsável comercial
          "assignedTo": {
            "id": "user-uuid-111",
            "name": "Maria Vendedora",
            "avatar": "https://cdn.example.com/avatars/maria.jpg"
          },
          
          // Etapa do funil
          "pipeline": {
            "stage": "Proposta Enviada",
            "stageColor": "#FF9800",
            "dealValue": 2500.00,
            "currency": "BRL",
            "probability": 75
          },
          
          // Histórico resumido
          "summary": {
            "firstContactDate": "2024-12-10T10:00:00Z",
            "lastPurchaseDate": "2024-11-15T14:30:00Z",
            "totalPurchases": 3,
            "lifetimeValue": 8750.00
          }
        }
      },
      
      // 💬 ÚLTIMA MENSAGEM
      "lastMessage": {
        "id": "msg-uuid-789",
        "type": "TEXT",
        "content": "Olá, tudo bem?",
        "timestamp": "2025-01-15T14:30:00Z",
        "direction": "INBOUND",
        "preview": "Olá, tudo bem?"  // Preview já truncado (70 chars)
      },
      
      // 📊 METADADOS DA CONVERSA
      "unreadCount": 3,
      "isUnread": true,
      "status": "active",  // active | archived | spam
      "lastMessageAt": "2025-01-15T14:30:00Z",
      
      // 🏷️ LABELS/TAGS (gerenciadas pelo sistema)
      "labels": [
        {
          "id": "label-1",
          "name": "Urgente",
          "color": "#F44336"
        },
        {
          "id": "label-2",
          "name": "Suporte Técnico",
          "color": "#2196F3"
        }
      ],
      
      // ⏱️ MÉTRICAS ÚTEIS (calculadas pelo backend)
      "metrics": {
        "avgResponseTime": 125,  // segundos
        "lastResponseTime": 45,
        "totalMessages": 87,
        "sentiment": "POSITIVE",  // POSITIVE | NEUTRAL | NEGATIVE
        "priority": "HIGH"  // LOW | MEDIUM | HIGH | URGENT
      },
      
      // 🤖 IA/AUTOMAÇÃO
      "ai": {
        "autoReplyEnabled": true,
        "lastAiSuggestion": "Cliente perguntou sobre preços. Sugerir envio de tabela.",
        "intents": ["pricing_inquiry", "product_demo_request"],
        "nextBestAction": "Enviar proposta comercial"
      }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 145,
    "totalPages": 8
  }
}
```

---

## 💬 2. OBTER MENSAGENS DE UMA CONVERSA

Busca todas as mensagens de um contato específico.

### Request

```http
GET /api/conversations/{conversationId}/messages
```

**Query Parameters (opcionais):**
```
?page=1
&limit=50              # Padrão: 50
&before=2025-01-15     # Mensagens antes desta data
```

### Response

```json
{
  "data": [
    {
      "id": "msg-uuid-001",
      "conversationId": "conv-uuid-123",
      "type": "TEXT",
      "content": "Oi! Como posso ajudar?",
      "direction": "OUTBOUND",
      "status": "READ",
      "timestamp": "2025-01-15T14:25:00Z",
      
      // 👤 REMETENTE (já processado)
      "sender": {
        "type": "AGENT",  // AGENT | CUSTOMER | AI | SYSTEM
        "id": "user-uuid-111",
        "name": "Maria Vendedora",
        "avatar": "https://cdn.example.com/avatars/maria.jpg"
      },
      
      // 🔗 CONTEXTO (se for resposta)
      "replyTo": null,
      
      // 📎 MÍDIA
      "media": null,
      
      // 🏷️ METADATA (informações adicionais)
      "metadata": {
        "provider": "BAILEYS",  // BAILEYS | META_API
        "deliveredAt": "2025-01-15T14:25:05Z",
        "readAt": "2025-01-15T14:25:30Z",
        "editedAt": null,
        "isForwarded": false
      }
    },
    
    {
      "id": "msg-uuid-002",
      "conversationId": "conv-uuid-123",
      "type": "IMAGE",
      "content": null,
      "caption": "Veja esta foto",
      "direction": "INBOUND",
      "status": "DELIVERED",
      "timestamp": "2025-01-15T14:26:30Z",
      
      "sender": {
        "type": "CUSTOMER",
        "id": "contact-uuid-456",
        "name": "João Silva",
        "avatar": "https://cdn.example.com/avatars/joao.jpg"
      },
      
      "replyTo": null,
      
      // 🖼️ MÍDIA JÁ PROCESSADA
      "media": {
        "id": "media-uuid-003",
        "type": "IMAGE",
        
        // URLs já assinadas e prontas para uso
        "url": "https://cdn.example.com/images/abc123.jpg?token=xyz&expires=1234567890",
        "thumbnailUrl": "https://cdn.example.com/thumbs/abc123.jpg?token=xyz",
        
        // Informações úteis
        "mimeType": "image/jpeg",
        "size": 1024567,
        "sizeFormatted": "1.02 MB",  // Já formatado
        "fileName": "photo.jpg",
        
        // Dimensões (se imagem/vídeo)
        "width": 1920,
        "height": 1080,
        
        // Status do download
        "downloadStatus": "COMPLETED",  // PENDING | DOWNLOADING | COMPLETED | FAILED
        "expiresAt": "2025-01-15T18:00:00Z"  // Quando o link expira
      },
      
      "metadata": {
        "provider": "BAILEYS",
        "deliveredAt": "2025-01-15T14:26:32Z"
      }
    },
    
    {
      "id": "msg-uuid-003",
      "conversationId": "conv-uuid-123",
      "type": "AUDIO",
      "content": null,
      "direction": "INBOUND",
      "status": "DELIVERED",
      "timestamp": "2025-01-15T14:28:00Z",
      
      "sender": {
        "type": "CUSTOMER",
        "id": "contact-uuid-456",
        "name": "João Silva",
        "avatar": "https://cdn.example.com/avatars/joao.jpg"
      },
      
      "replyTo": null,
      
      // 🎤 ÁUDIO JÁ PROCESSADO
      "media": {
        "id": "media-uuid-004",
        "type": "AUDIO",
        "url": "https://cdn.example.com/audio/xyz789.ogg?token=xyz",
        "mimeType": "audio/ogg",
        "size": 45678,
        "sizeFormatted": "45.67 KB",
        "duration": 15,  // segundos
        "durationFormatted": "00:15",  // Já formatado
        "isVoiceNote": true,
        
        // 🤖 TRANSCRIÇÃO (se disponível)
        "transcription": {
          "text": "Olá, gostaria de saber mais informações sobre o produto.",
          "confidence": 0.95,
          "language": "pt-BR"
        },
        
        "downloadStatus": "COMPLETED"
      },
      
      "metadata": {
        "provider": "BAILEYS"
      }
    },
    
    {
      "id": "msg-uuid-004",
      "conversationId": "conv-uuid-123",
      "type": "TEXT",
      "content": "Claro! Qual produto você tem interesse?",
      "direction": "OUTBOUND",
      "status": "SENT",
      "timestamp": "2025-01-15T14:29:00Z",
      
      "sender": {
        "type": "AI",  // Resposta da IA
        "id": "ai-assistant",
        "name": "Assistente IA",
        "avatar": "https://cdn.example.com/avatars/ai.png"
      },
      
      "replyTo": {
        "id": "msg-uuid-003",
        "content": "Olá, gostaria de saber mais...",
        "preview": "Olá, gostaria de saber mais..."  // Truncado
      },
      
      "media": null,
      
      "metadata": {
        "provider": "META_API",
        "isAiGenerated": true,  // Flag importante
        "aiModel": "gpt-4",
        "aiConfidence": 0.92
      }
    }
  ],
  
  "pagination": {
    "page": 1,
    "limit": 50,
    "total": 234,
    "hasMore": true
  },
  
  // 📊 CONTEXTO ADICIONAL DA CONVERSA (útil para UI)
  "conversationContext": {
    "contact": {
      "id": "contact-uuid-456",
      "displayName": "João Silva",
      "avatar": {
        "url": "https://cdn.example.com/avatars/joao.jpg",
        "fallback": "JS",
        "color": "#4CAF50"
      },
      "crm": {
        "isRegistered": true,
        "type": "LEAD",
        "status": "QUALIFIED",
        "company": "Tech Solutions LTDA"
      }
    },
    "unreadCount": 0,
    "isTyping": false
  }
}
```

---

## 📤 3. ENVIAR MENSAGEM DE TEXTO

Envia uma mensagem de texto simples.

### Request

```http
POST /api/conversations/{conversationId}/messages
Content-Type: application/json
```

```json
{
  "type": "TEXT",
  "content": "Olá! Obrigado pelo contato.",
  "replyTo": "msg-uuid-002"  // Opcional: responder mensagem específica
}
```

### Response

```json
{
  "id": "msg-uuid-new",
  "conversationId": "conv-uuid-123",
  "type": "TEXT",
  "content": "Olá! Obrigado pelo contato.",
  "direction": "OUTBOUND",
  "status": "SENT",
  "timestamp": "2025-01-15T14:30:00Z",
  "provider": "BAILEYS",
  "replyTo": "msg-uuid-002"
}
```

---

## 🖼️ 4. ENVIAR IMAGEM

Envia uma imagem com legenda opcional.

### Request (Multipart Form)

```http
POST /api/conversations/{conversationId}/messages/media
Content-Type: multipart/form-data
```

**Form Data:**
```
type: IMAGE
file: [arquivo.jpg]
caption: "Veja esta imagem" (opcional)
replyTo: msg-uuid-002 (opcional)
```

### OU Request (Base64)

```http
POST /api/conversations/{conversationId}/messages
Content-Type: application/json
```

```json
{
  "type": "IMAGE",
  "media": {
    "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
    "caption": "Veja esta imagem"
  },
  "replyTo": "msg-uuid-002"
}
```

### Response

```json
{
  "id": "msg-uuid-new",
  "conversationId": "conv-uuid-123",
  "type": "IMAGE",
  "content": null,
  "caption": "Veja esta imagem",
  "direction": "OUTBOUND",
  "status": "SENT",
  "timestamp": "2025-01-15T14:35:00Z",
  "media": {
    "id": "media-uuid-new",
    "type": "IMAGE",
    "url": "https://cdn.example.com/images/xyz.jpg",
    "thumbnailUrl": "https://cdn.example.com/thumbs/xyz.jpg",
    "mimeType": "image/jpeg",
    "size": 856432
  }
}
```

---

## 🎥 5. ENVIAR VÍDEO

Envia um vídeo com legenda opcional.

### Request (Multipart Form)

```http
POST /api/conversations/{conversationId}/messages/media
Content-Type: multipart/form-data
```

**Form Data:**
```
type: VIDEO
file: [video.mp4]
caption: "Confira este vídeo" (opcional)
```

### Response

```json
{
  "id": "msg-uuid-video",
  "conversationId": "conv-uuid-123",
  "type": "VIDEO",
  "caption": "Confira este vídeo",
  "direction": "OUTBOUND",
  "status": "SENT",
  "timestamp": "2025-01-15T14:40:00Z",
  "media": {
    "id": "media-uuid-video",
    "type": "VIDEO",
    "url": "https://cdn.example.com/videos/abc.mp4",
    "thumbnailUrl": "https://cdn.example.com/thumbs/abc.jpg",
    "mimeType": "video/mp4",
    "size": 5242880,
    "duration": 30
  }
}
```

---

## 🎤 6. ENVIAR ÁUDIO

Envia um áudio (como nota de voz ou arquivo de áudio).

### Request (Multipart Form)

```http
POST /api/conversations/{conversationId}/messages/media
Content-Type: multipart/form-data
```

**Form Data:**
```
type: AUDIO
file: [audio.ogg ou audio.mp3]
isVoiceNote: true  (opcional, padrão: false)
```

### OU Request (Base64 para gravação do navegador)

```http
POST /api/conversations/{conversationId}/messages
Content-Type: application/json
```

```json
{
  "type": "AUDIO",
  "media": {
    "base64": "data:audio/ogg;base64,T2dnUwAC...",
    "mimeType": "audio/ogg",
    "isVoiceNote": true
  }
}
```

### Response

```json
{
  "id": "msg-uuid-audio",
  "conversationId": "conv-uuid-123",
  "type": "AUDIO",
  "direction": "OUTBOUND",
  "status": "SENT",
  "timestamp": "2025-01-15T14:45:00Z",
  "media": {
    "id": "media-uuid-audio",
    "type": "AUDIO",
    "url": "https://cdn.example.com/audio/voice.ogg",
    "mimeType": "audio/ogg",
    "size": 34567,
    "duration": 8,
    "isVoiceNote": true
  }
}
```

---

## 📎 7. ENVIAR DOCUMENTO

Envia um documento (PDF, DOC, XLS, etc).

### Request (Multipart Form)

```http
POST /api/conversations/{conversationId}/messages/media
Content-Type: multipart/form-data
```

**Form Data:**
```
type: DOCUMENT
file: [documento.pdf]
caption: "Segue o documento solicitado" (opcional)
```

### Response

```json
{
  "id": "msg-uuid-doc",
  "conversationId": "conv-uuid-123",
  "type": "DOCUMENT",
  "caption": "Segue o documento solicitado",
  "direction": "OUTBOUND",
  "status": "SENT",
  "timestamp": "2025-01-15T14:50:00Z",
  "media": {
    "id": "media-uuid-doc",
    "type": "DOCUMENT",
    "url": "https://cdn.example.com/docs/contrato.pdf",
    "mimeType": "application/pdf",
    "size": 234567,
    "fileName": "contrato.pdf"
  }
}
```

---

## 📥 8. BAIXAR MÍDIA

Obter URL de download de uma mídia.

### Request

```http
GET /api/media/{mediaId}
```

### Response

```json
{
  "id": "media-uuid-003",
  "type": "IMAGE",
  "url": "https://cdn.example.com/images/abc123.jpg",
  "thumbnailUrl": "https://cdn.example.com/thumbs/abc123.jpg",
  "mimeType": "image/jpeg",
  "size": 1024567,
  "fileName": "photo.jpg",
  "downloadUrl": "https://cdn.example.com/download/abc123?token=xyz",
  "expiresAt": "2025-01-15T18:00:00Z"
}
```

**Download direto:**
```http
GET /api/media/{mediaId}/download
```
Retorna o arquivo diretamente (binary).

---

## ✅ 9. MARCAR COMO LIDA

Marca uma ou mais mensagens como lidas.

### Request

```http
PATCH /api/conversations/{conversationId}/read
Content-Type: application/json
```

```json
{
  "messageIds": ["msg-uuid-001", "msg-uuid-002"]
}
```

### OU marcar conversa inteira

```http
PATCH /api/conversations/{conversationId}/mark-read
```

### Response

```json
{
  "success": true,
  "markedCount": 2
}
```

---

## 🔔 10. WEBSOCKET - EVENTOS EM TEMPO REAL

Conecte ao WebSocket para receber atualizações em tempo real.

### Conexão

```javascript
const socket = io('ws://localhost:3000/ws', {
  auth: {
    token: 'seu_jwt_token'
  }
});
```

### Eventos que o FRONTEND RECEBE:

#### 📨 Nova Mensagem Recebida

```javascript
socket.on('message.received', (data) => {
  console.log('Nova mensagem:', data);
});
```

**Payload:**
```json
{
  "conversationId": "conv-uuid-123",
  "message": {
    "id": "msg-uuid-new",
    "type": "TEXT",
    "content": "Oi! Tudo bem?",
    "direction": "INBOUND",
    "timestamp": "2025-01-15T15:00:00Z",
    "contact": {
      "id": "contact-uuid-456",
      "name": "João Silva",
      "phoneNumber": "5511999999999"
    }
  }
}
```

#### ✅ Status da Mensagem Atualizado

```javascript
socket.on('message.status', (data) => {
  console.log('Status atualizado:', data);
});
```

**Payload:**
```json
{
  "messageId": "msg-uuid-001",
  "conversationId": "conv-uuid-123",
  "status": "READ",
  "timestamp": "2025-01-15T15:05:00Z"
}
```

**Status possíveis:**
- `PENDING` - Aguardando envio
- `SENT` - Enviada
- `DELIVERED` - Entregue
- `READ` - Lida
- `FAILED` - Falhou

#### 🔄 Digitando...

```javascript
socket.on('contact.typing', (data) => {
  console.log('Digitando:', data);
});
```

**Payload:**
```json
{
  "conversationId": "conv-uuid-123",
  "contactId": "contact-uuid-456",
  "isTyping": true
}
```

#### 🟢 Status de Conexão da Conta

```javascript
socket.on('account.status', (data) => {
  console.log('Status da conta:', data);
});
```

**Payload:**
```json
{
  "accountId": "account-uuid-789",
  "status": "CONNECTED",
  "provider": "BAILEYS"
}
```

### Eventos que o FRONTEND ENVIA:

#### 📝 Notificar que está digitando

```javascript
socket.emit('typing.start', {
  conversationId: 'conv-uuid-123'
});

// Parar de digitar
socket.emit('typing.stop', {
  conversationId: 'conv-uuid-123'
});
```

---

## 📋 TIPOS DE MENSAGEM

### Enum: MessageType

```typescript
type MessageType = 
  | 'TEXT'      // Texto simples
  | 'IMAGE'     // Imagem (jpg, png, gif, webp)
  | 'VIDEO'     // Vídeo (mp4, mov)
  | 'AUDIO'     // Áudio (ogg, mp3, m4a)
  | 'DOCUMENT'  // Documento (pdf, doc, xls, etc)
  | 'STICKER'   // Sticker/figurinha
  | 'LOCATION'  // Localização
  | 'CONTACT';  // Contato VCard
```

### Enum: MessageDirection

```typescript
type MessageDirection = 
  | 'INBOUND'   // Recebida (cliente enviou)
  | 'OUTBOUND'; // Enviada (você enviou)
```

### Enum: MessageStatus

```typescript
type MessageStatus = 
  | 'PENDING'   // Aguardando envio
  | 'SENT'      // Enviada
  | 'DELIVERED' // Entregue ao destinatário
  | 'READ'      // Lida pelo destinatário
  | 'FAILED';   // Falha no envio
```

---

## 🎨 EXEMPLOS PRÁTICOS

### React: Listar Conversas

```typescript
import { useState, useEffect } from 'react';

function ConversationList() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/conversations', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setConversations(data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {conversations.map(conv => (
        <div key={conv.id}>
          <img src={conv.contact.profilePictureUrl} />
          <h3>{conv.contact.name}</h3>
          <p>{conv.lastMessage.content}</p>
          {conv.unreadCount > 0 && (
            <span>{conv.unreadCount}</span>
          )}
        </div>
      ))}
    </div>
  );
}
```

### React: Enviar Mensagem de Texto

```typescript
const sendTextMessage = async (conversationId: string, text: string) => {
  try {
    const response = await fetch(`/api/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'TEXT',
        content: text
      })
    });
    
    const message = await response.json();
    console.log('Mensagem enviada:', message);
    return message;
  } catch (error) {
    console.error('Erro ao enviar:', error);
  }
};
```

### React: Enviar Imagem (do input file)

```typescript
const sendImage = async (conversationId: string, file: File, caption?: string) => {
  const formData = new FormData();
  formData.append('type', 'IMAGE');
  formData.append('file', file);
  if (caption) {
    formData.append('caption', caption);
  }

  try {
    const response = await fetch(
      `/api/conversations/${conversationId}/messages/media`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      }
    );
    
    const message = await response.json();
    return message;
  } catch (error) {
    console.error('Erro ao enviar imagem:', error);
  }
};

// Uso no componente
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      sendImage(conversationId, file, 'Veja esta foto');
    }
  }}
/>
```

### React: Gravar e Enviar Áudio

```typescript
import { useState, useRef } from 'react';

function VoiceRecorder({ conversationId }: { conversationId: string }) {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    chunksRef.current = [];

    mediaRecorder.ondataavailable = (e) => {
      chunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunksRef.current, { type: 'audio/ogg' });
      await sendAudio(blob);
    };

    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const sendAudio = async (blob: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      const base64 = reader.result as string;
      
      const response = await fetch(
        `/api/conversations/${conversationId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            type: 'AUDIO',
            media: {
              base64,
              mimeType: 'audio/ogg',
              isVoiceNote: true
            }
          })
        }
      );
      
      const message = await response.json();
      console.log('Áudio enviado:', message);
    };
  };

  return (
    <div>
      {!recording ? (
        <button onClick={startRecording}>🎤 Gravar</button>
      ) : (
        <button onClick={stopRecording}>⏹️ Enviar</button>
      )}
    </div>
  );
}
```

### React: WebSocket Integration

```typescript
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

function useWhatsAppSocket(token: string) {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const newSocket = io('ws://localhost:3000/ws', {
      auth: { token }
    });

    // Nova mensagem recebida
    newSocket.on('message.received', (data) => {
      setMessages(prev => [...prev, data.message]);
      
      // Tocar som de notificação
      new Audio('/notification.mp3').play();
    });

    // Status atualizado
    newSocket.on('message.status', (data) => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === data.messageId 
            ? { ...msg, status: data.status }
            : msg
        )
      );
    });

    // Digitando
    newSocket.on('contact.typing', (data) => {
      console.log('Contato digitando:', data);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [token]);

  const sendTyping = (conversationId: string, isTyping: boolean) => {
    if (socket) {
      socket.emit(isTyping ? 'typing.start' : 'typing.stop', {
        conversationId
      });
    }
  };

  return { socket, messages, sendTyping };
}
```

---

## ⚠️ LIMITES E RESTRIÇÕES

### Tamanhos Máximos

```typescript
const LIMITS = {
  TEXT_MESSAGE: 4096,        // 4KB (caracteres)
  IMAGE_SIZE: 5 * 1024 * 1024,    // 5MB
  VIDEO_SIZE: 16 * 1024 * 1024,   // 16MB
  AUDIO_SIZE: 16 * 1024 * 1024,   // 16MB
  DOCUMENT_SIZE: 100 * 1024 * 1024, // 100MB
};
```

### Formatos Aceitos

```typescript
const ACCEPTED_FORMATS = {
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  VIDEO: ['.mp4', '.mov', '.3gp'],
  AUDIO: ['.mp3', '.ogg', '.m4a', '.aac'],
  DOCUMENT: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.txt']
};
```

### Rate Limiting

```
- 20 mensagens/minuto por conversa
- 100 mensagens/minuto por conta
- 1000 mensagens/dia por conta (ajustável por tier)
```

---

## 🚨 TRATAMENTO DE ERROS

### Códigos de Erro Comuns

```typescript
// 400 - Bad Request
{
  "error": "INVALID_FILE_TYPE",
  "message": "Tipo de arquivo não suportado",
  "details": {
    "allowedTypes": [".jpg", ".png", ".gif"]
  }
}

// 413 - Payload Too Large
{
  "error": "FILE_TOO_LARGE",
  "message": "Arquivo muito grande",
  "details": {
    "maxSize": 5242880,
    "receivedSize": 7340032
  }
}

// 429 - Too Many Requests
{
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Muitas requisições",
  "details": {
    "limit": 20,
    "window": "1 minute",
    "retryAfter": 45
  }
}

// 503 - Service Unavailable
{
  "error": "WHATSAPP_DISCONNECTED",
  "message": "Conta WhatsApp desconectada",
  "details": {
    "accountId": "account-uuid",
    "reconnecting": true
  }
}
```

### Exemplo de Tratamento

```typescript
const handleError = (error: any) => {
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        alert(`Erro: ${data.message}`);
        break;
      case 413:
        alert('Arquivo muito grande. Máximo: 5MB');
        break;
      case 429:
        alert(`Muitas requisições. Aguarde ${data.details.retryAfter}s`);
        break;
      case 503:
        alert('WhatsApp desconectado. Reconectando...');
        break;
      default:
        alert('Erro ao enviar mensagem');
    }
  }
};
```

---

## 📝 NOTAS IMPORTANTES

### 🔄 Status de Mensagens

1. **PENDING** → Mensagem criada, aguardando envio
2. **SENT** → Enviada para WhatsApp (1 check ✓)
3. **DELIVERED** → Entregue ao destinatário (2 checks ✓✓)
4. **READ** → Lida pelo destinatário (2 checks azuis ✓✓)

### 📱 Tipos de Mídia

- **Imagens**: Thumbnail é gerado automaticamente
- **Vídeos**: Thumbnail é gerado do primeiro frame
- **Áudios**: Duração é calculada automaticamente
- **Documentos**: Ícone baseado na extensão

### ⚡ Performance

- Use **paginação** nas conversas e mensagens
- Implemente **lazy loading** para mensagens antigas
- Use **WebSocket** para updates em tempo real
- **Cache** avatares e thumbnails localmente
- Use **virtual scroll** para listas grandes

### 🔒 Segurança

- Sempre valide o token JWT
- Valide tamanho de arquivos no frontend
- Sanitize inputs antes de enviar
- Não exponha tokens no localStorage (use httpOnly cookies)

---

## ✅ Checklist Frontend

- [ ] Implementar autenticação JWT
- [ ] Listar conversas com paginação
- [ ] Exibir mensagens de uma conversa
- [ ] Enviar mensagem de texto
- [ ] Enviar imagem com preview
- [ ] Enviar vídeo com preview
- [ ] Gravar e enviar áudio
- [ ] Enviar documentos
- [ ] Marcar mensagens como lidas
- [ ] WebSocket para tempo real
- [ ] Indicador "digitando..."
- [ ] Status de mensagem (✓, ✓✓)
- [ ] Download de mídias
- [ ] Tratamento de erros
- [ ] Loading states
- [ ] Otimistic UI updates

---

**Documentação gerada em:** Outubro 2025  
**Versão da API:** 1.0.0  
**Base URL:** `http://localhost:3000/api`