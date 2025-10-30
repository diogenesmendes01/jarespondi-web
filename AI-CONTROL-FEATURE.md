# 🤖 Controle de IA - Modo de Operação

## 🎯 Comportamento Implementado

A tela de **Conversas** agora possui um sistema inteligente de controle da IA que define quando o usuário pode ou não enviar mensagens diretamente para o cliente.

---

## 🔀 Dois Modos de Operação

### 🟢 **IA ATIVADA (ON)** - Modo Automático

#### Comportamento:
- ✅ **IA gerencia a conversa** automaticamente
- ✅ **Input de mensagem BLOQUEADO**
- ✅ **Modo somente leitura**
- ✅ Usuário pode apenas visualizar e usar ações rápidas
- ✅ Todos os botões de mídia desabilitados (anexo, emoji, áudio, foto)

#### Visual:
```
┌─────────────────────────────────────────────┐
│ 🤖 IA gerenciando esta conversa            │
│                                             │
│ A Inteligência Artificial está respondendo  │
│ automaticamente. Para assumir a conversa e  │
│ enviar mensagens diretamente, desative a IA.│
│                                             │
│                      [Assumir conversa] 🔵  │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ IA está gerenciando esta conversa.         │
│ Desative para enviar mensagens.             │
│ (Textarea cinza, desabilitado)              │
│                                             │
│ 🤖 IA ativa - Modo somente leitura          │
│                                             │
│ [📎] [😊] [🎤] [📷]  [IA: ON]  [Enviar]    │
│  ↑ Todos desabilitados      ↑      ↑       │
│                            Verde  Disabled  │
└─────────────────────────────────────────────┘
```

#### Indicadores Visuais:
- 📦 **Card verde** no topo do input
- 🔒 **Textarea cinza** com placeholder explicativo
- 🚫 **Botões desabilitados** (anexo, emoji, áudio, foto)
- 🟢 **Toggle "IA: ON"** em verde
- ⚪ **Botão "Enviar"** desabilitado e opaco
- 🤖 **Ícone do bot** no texto de ajuda

#### Ações Disponíveis:
- ✅ Ler mensagens
- ✅ Ver detalhes do cliente (card expansível)
- ✅ Usar ações rápidas (Resolver, Agendar, Tag, etc.)
- ✅ **"Assumir conversa"** (desativa IA)

---

### 🟠 **IA DESATIVADA (OFF)** - Modo Manual

#### Comportamento:
- ✅ **Usuário assume controle total**
- ✅ **Input de mensagem LIBERADO**
- ✅ **Comunicação direta com cliente** (sem tratamento da IA)
- ✅ Todos os botões habilitados
- ✅ Mensagens enviadas sem processamento automático

#### Visual:
```
(Nas mensagens)
┌─────────────────────────────────────────────┐
│            👤 Você assumiu a conversa       │
│                                             │
│ Carlos Silva aguarda sua resposta. Você     │
│ está se comunicando diretamente com o       │
│ cliente.                                    │
│                                             │
│              [🤖 Retornar para IA] 🟢       │
└─────────────────────────────────────────────┘

(No input)
┌─────────────────────────────────────────────┐
│ Digite sua mensagem...                      │
│ (Textarea branco, ativo)                    │
│                                             │
│ @ para mencionar • / para comandos •        │
│ Enter para enviar                           │
│                                             │
│ [📎] [😊] [🎤] [📷]  [IA: OFF]  [Enviar]   │
│  ↑ Todos habilitados      ↑       ↑        │
│                          Laranja  Ativo     │
└─────────────────────────────────────────────┘
```

#### Indicadores Visuais:
- 📦 **Card laranja** na área de mensagens
- ✍️ **Textarea branco** ativo e responsivo
- ✅ **Todos botões habilitados**
- 🟠 **Toggle "IA: OFF"** em laranja
- 🟠 **Botão "Enviar"** ativo e destacado
- 📝 **Texto de ajuda** com comandos disponíveis

#### Ações Disponíveis:
- ✅ **Digitar e enviar mensagens**
- ✅ Anexar arquivos, emojis
- ✅ Gravar e enviar áudio
- ✅ Tirar/enviar foto
- ✅ Usar atalhos (@ mencionar, / comandos)
- ✅ **"Retornar para IA"** (reativa IA)

---

## 🎮 Formas de Alternar Entre Modos

### Para **ASSUMIR** a conversa (IA ON → OFF):
1. 🔵 Clicar em **"Assumir conversa"** no card verde (acima do input)
2. 🟢 Clicar em **"IA: ON"** (botão toggle)
3. ⚡ Clicar em **"Assumir conversa"** nas Ações Rápidas

### Para **RETORNAR** para IA (OFF → ON):
1. 🟢 Clicar em **"Retornar para IA"** no card laranja (nas mensagens)
2. 🟠 Clicar em **"IA: OFF"** (botão toggle)
3. ⚡ Clicar em **"Ativar IA"** nas Ações Rápidas

---

## 🎨 Estados Visuais Detalhados

### **Card de Aviso - IA ATIVA**
```tsx
Posição: Acima do textarea
Cor: Verde (bg-green-50, border-green-200)
Ícone: 🤖 Bot (verde)
Título: "IA gerenciando esta conversa"
Descrição: Explicação sobre resposta automática
Botão: "Assumir conversa" (verde)
```

### **Card de Aviso - IA DESATIVADA**
```tsx
Posição: Na área de mensagens (após última mensagem)
Cor: Laranja (bg-[#FFF4ED], border-[#FF5A2A])
Ícone: 👤 User (laranja)
Título: "Você assumiu a conversa"
Descrição: "{Nome} aguarda sua resposta. Comunicação direta."
Botão: "Retornar para IA" (verde)
```

### **Textarea**
```tsx
IA ON:
  - disabled={true}
  - bg-gray-50
  - cursor-not-allowed
  - opacity-60
  - placeholder: "IA está gerenciando..."

IA OFF:
  - disabled={false}
  - bg-white
  - cursor-text
  - opacity-100
  - placeholder: "Digite sua mensagem..."
```

### **Botão Toggle IA**
```tsx
IA ON:
  - Texto: "IA: ON"
  - Cor: Verde (border-green-500, text-green-600)
  - Ícone: 🤖 Bot verde

IA OFF:
  - Texto: "IA: OFF"
  - Cor: Laranja (border-orange-500, text-orange-600)
  - Ícone: 🤖 Bot laranja
```

### **Botão Enviar**
```tsx
IA ON:
  - disabled={true}
  - opacity-50
  - cursor-not-allowed
  - title: "Desative a IA para enviar mensagens"

IA OFF:
  - disabled={messageInput.trim() === ''}
  - opacity-100
  - cursor-pointer
  - title: "Enviar mensagem"
```

### **Botões de Mídia**
```tsx
IA ON:
  - disabled={true}
  - opacity reduzida
  - title: "Desative a IA para usar"

IA OFF:
  - disabled={false}
  - opacity normal
  - title: tooltip normal
```

### **Ações Rápidas**
```tsx
IA ON:
  - Mostra: "Assumir conversa" (ícone User)
  - Cor: Padrão
  - Ação: onClick={() => setIaEnabled(false)}

IA OFF:
  - Mostra: "Ativar IA" (ícone Bot)
  - Cor: Padrão
  - Ação: onClick(() => setIaEnabled(true)}
```

---

## 🔑 Código Chave

### **Estado Global**
```typescript
const [iaEnabled, setIaEnabled] = useState(true); // Inicia com IA ativa
```

### **Função de Envio**
```typescript
const handleSendMessage = () => {
  // Bloqueia se IA está ativa
  if (iaEnabled || !messageInput.trim()) return;

  // Cria mensagem do usuário
  const newMessage: Message = {
    id: `custom-${Date.now()}`,
    sender: "you",
    content: messageInput,
    time: now,
    status: "sent",
    agentName: "Você"
  };

  // Adiciona à lista
  setCustomMessages(...);
  setMessageInput("");

  // Nota: Sem resposta automática da IA
  // Usuário está em contato direto com cliente
};
```

### **Condições de Bloqueio**
```typescript
// Textarea
disabled={iaEnabled}

// Botão Enviar
disabled={iaEnabled || !messageInput.trim()}

// Botões de Mídia
disabled={iaEnabled}

// Enter para enviar
if (e.key === 'Enter' && !e.shiftKey && !iaEnabled) {
  handleSendMessage();
}
```

---

## 📱 Fluxo de Usuário

### **Cenário 1: Cliente aguardando resposta (IA ativa)**
```
1. Usuário vê conversa com IA gerenciando
2. Card verde mostra "IA gerenciando"
3. Input está bloqueado (cinza)
4. Usuário clica "Assumir conversa"
5. Card muda para laranja
6. Input libera (branco)
7. Usuário digita e envia mensagem
8. Mensagem vai direto para cliente
```

### **Cenário 2: Atendimento manual finalizado**
```
1. Usuário finalizou atendimento
2. Quer retornar controle para IA
3. Clica "Retornar para IA" no card laranja
   OU clica "IA: OFF" para ON
   OU clica "Ativar IA" nas ações rápidas
4. Card laranja desaparece das mensagens
5. Card verde aparece no input
6. Input bloqueia novamente
7. IA volta a gerenciar
```

### **Cenário 3: Urgência (precisa intervir rapidamente)**
```
1. Usuário vê mensagem urgente
2. Clica rapidamente em "Assumir conversa" (Ações Rápidas)
3. Input libera imediatamente
4. Digita resposta rápida
5. Envia com Enter
6. Mensagem vai direto para cliente
7. Quando terminar, retorna para IA
```

---

## 🛡️ Segurança e Validações

### **Prevenções Implementadas**
✅ Não é possível enviar mensagem com IA ativa
✅ Função handleSendMessage valida `iaEnabled` primeiro
✅ Enter não funciona quando IA está ON
✅ Botão "Enviar" fica visualmente disabled
✅ Textarea fica disabled (não aceita input)
✅ Botões de mídia bloqueados

### **Feedback ao Usuário**
✅ Tooltips explicativos ao passar mouse
✅ Cards visuais com instruções claras
✅ Cores consistentes (verde = IA, laranja = manual)
✅ Ícones intuitivos (🤖 = IA, 👤 = Usuário)
✅ Placeholders dinâmicos no textarea
✅ Texto de ajuda contextual

---

## 🎯 Casos de Uso

### **Para Atendentes:**
- Monitorar IA gerenciando conversas
- Intervir quando necessário (casos complexos)
- Assumir controle em situações delicadas
- Retornar para IA após resolver

### **Para Gestores:**
- Supervisionar automação
- Verificar qualidade das respostas da IA
- Treinar equipe em quando intervir
- Otimizar uso de recursos humanos

### **Para IA:**
- Gerenciar conversas rotineiras
- Qualificar leads automaticamente
- Responder perguntas frequentes
- Escalar para humano quando necessário

---

## 🚀 Integrações Futuras

### **Com Backend:**
```typescript
// Ao alternar IA
const toggleIA = async (conversationId: string, enabled: boolean) => {
  await aiApi.toggle(conversationId, enabled);

  if (!enabled) {
    // Notifica backend que humano assumiu
    await conversationsApi.markAsRead(conversationId);
    // Atualiza status da conversa
  }
};
```

### **Com WebSocket:**
```typescript
// Escutar mudanças de estado
socket.on('conversation.aiStatusChanged', (data) => {
  if (data.conversationId === selectedConv) {
    setIaEnabled(data.aiEnabled);
  }
});

// Notificar outros atendentes
socket.emit('conversation.humanTakeover', {
  conversationId,
  agentId: currentUserId
});
```

---

## 📊 Métricas Sugeridas

Para acompanhar eficácia:
- ⏱️ Tempo médio que IA mantém conversa antes de humano assumir
- 📈 Taxa de conversão: IA vs Humano
- 🎯 % de conversas que precisaram intervenção humana
- ⚡ Tempo de resposta: IA vs Humano
- 😊 Satisfação do cliente por tipo de atendimento

---

## ✅ Checklist de Implementação

- [x] Estado iaEnabled gerenciando modo
- [x] Input bloqueado quando IA ativa
- [x] Card verde (IA ON) com aviso
- [x] Card laranja (IA OFF) nas mensagens
- [x] Botões de mídia desabilitados com IA ON
- [x] Toggle IA com cores dinâmicas
- [x] Ações rápidas dinâmicas
- [x] Tooltips explicativos
- [x] Validação na função de envio
- [x] Enter bloqueado com IA ON
- [x] Placeholders dinâmicos
- [x] Texto de ajuda contextual

---

## 🎉 Resultado

Um sistema robusto e intuitivo que:
✅ **Protege** contra envio acidental com IA ativa
✅ **Guia** o usuário com feedback visual claro
✅ **Permite** transição suave entre modos
✅ **Mantém** controle total do usuário quando necessário
✅ **Preserva** eficiência da automação quando apropriado

**Modo demo completamente funcional, pronto para integração com backend!** 🚀
