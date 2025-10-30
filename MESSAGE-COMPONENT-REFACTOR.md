# 🔄 Refatoração: Componente de Mensagem WhatsApp

## 🎯 Objetivo

Transformar a renderização de mensagens em um **componente reutilizável** ao invés de código inline, criando mensagens como objetos visuais reais, exatamente como no WhatsApp Web.

---

## ❌ Problema Anterior

### **Código Inline e Hardcoded**

```tsx
// ❌ ANTES: Tudo inline no map
{messages.map((msg) => {
  const messageStyles = { ... };  // Estilos definidos dentro do map
  return (
    <div>
      {/* 280+ linhas de JSX repetitivo */}
      {/* Estados globais (messageMenuOpen, reactionPickerOpen) */}
      {/* Lógica espalhada */}
    </div>
  );
})}
```

**Problemas:**
- ❌ Código gigante e difícil de manter (280+ linhas no map)
- ❌ Estilos hardcoded ao invés de objetos visuais
- ❌ Impossível reutilizar em outros lugares
- ❌ Estados globais poluindo o componente pai
- ❌ Difícil de testar isoladamente
- ❌ Não encapsula a lógica da mensagem

---

## ✅ Solução: Componente WhatsAppMessage

### **Estrutura do Componente**

```tsx
// ✅ AGORA: Componente reutilizável
function WhatsAppMessage({
  message,
  clientName,
  isEditing,
  editingText,
  reactions,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
  onCopyMessage,
  onDeleteMessage,
  onAddReaction,
}: WhatsAppMessageProps) {
  // Estados INTERNOS do componente
  const [menuOpen, setMenuOpen] = useState(false);
  const [reactionPickerOpen, setReactionPickerOpen] = useState(false);

  // Estilos como OBJETO visual
  const messageStyles = {
    client: { ... },
    ai: { ... },
    you: { ... }
  };

  return (
    // JSX da mensagem
  );
}
```

### **Uso Simplificado**

```tsx
// ✅ No componente pai: APENAS 13 linhas!
{messages.map((msg) => (
  <WhatsAppMessage
    key={msg.id}
    message={msg}
    clientName={selectedConversation?.clientName}
    isEditing={editingMessageId === msg.id}
    editingText={editingMessageText}
    reactions={messageReactions[msg.id] || []}
    onStartEdit={handleStartEditMessage}
    onSaveEdit={handleSaveEditMessage}
    onCancelEdit={handleCancelEditMessage}
    onEditTextChange={setEditingMessageText}
    onCopyMessage={handleCopyMessage}
    onDeleteMessage={handleDeleteMessage}
    onAddReaction={handleAddReaction}
  />
))}
```

---

## 🏗️ Arquitetura do Componente

### **1. Props Interface**

```typescript
type WhatsAppMessageProps = {
  message: Message;                  // Dados da mensagem
  clientName?: string;               // Nome do cliente (para mensagens recebidas)
  isEditing: boolean;                // Se está em modo edição
  editingText: string;               // Texto sendo editado
  reactions: string[];               // Reações desta mensagem
  onStartEdit: (id: string, content: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
  onCopyMessage: (content: string) => void;
  onDeleteMessage: (id: string) => void;
  onAddReaction: (id: string, emoji: string) => void;
};
```

### **2. Estados Internos**

```typescript
// Cada instância do componente gerencia seus próprios estados
const [menuOpen, setMenuOpen] = useState(false);
const [reactionPickerOpen, setReactionPickerOpen] = useState(false);
```

**Benefício:** Não polui o componente pai com estados globais.

### **3. Estilos como Objeto Visual**

```typescript
const messageStyles = {
  client: {
    align: "justify-start",
    bgColor: "bg-white",              // WhatsApp branco
    textColor: "text-[#111827]",
    shadow: "shadow-sm",
    borderColor: "border-[#E5E7EB]",
    nameColor: "text-[#111827]",
    buttonsPosition: "-right-20",     // Botões à direita
    menuPosition: "left-0",           // Menu alinhado à esquerda
  },
  ai: {
    align: "justify-end",
    bgColor: "bg-[#D9FDD3]",          // Verde WhatsApp
    textColor: "text-[#111827]",
    shadow: "shadow-sm",
    borderColor: "border-[#D9FDD3]",
    nameColor: "text-[#FF5A2A]",      // Laranja do sistema
    buttonsPosition: "-left-20",      // Botões à esquerda
    menuPosition: "right-0",          // Menu alinhado à direita
  },
  you: {
    // Igual a 'ai'
  }
};

const style = messageStyles[msg.sender];
```

**Cores WhatsApp Oficiais:**
- Cliente: `bg-white` (branco)
- IA/Você: `bg-[#D9FDD3]` (verde claro)
- Botões: `bg-[#F0F2F5]` (cinza claro)
- Ícones: `text-[#54656F]` (cinza escuro)

---

## 🎨 Estrutura Visual da Mensagem

### **Hierarquia Completa**

```
┌─────────────────────────────────────────────────────────┐
│ CABEÇALHO (Nome + Horário)                              │
│ ┌─────────────────────────────────────────────────────┐│
│ │ CONTAINER DA MENSAGEM (relative inline-block)       ││
│ │                                                      ││
│ │   ┌──────────────────────────────────┐              ││
│ │   │ BOLHA DA MENSAGEM                │  [Botões]    ││
│ │   │  • Conteúdo                      │   ↑ Chevron  ││
│ │   │  • Indicador "editada"           │   ↓ Emoji    ││
│ │   │  • Status (✓✓)                   │              ││
│ │   │  • Reações abaixo (absolute)     │              ││
│ │   └──────────────────────────────────┘              ││
│ │                                                      ││
│ │   [Menu de ações - aparece ao clicar chevron]       ││
│ │   [Picker de reações - aparece ao clicar emoji]     ││
│ └─────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────┘
```

### **Posicionamento dos Elementos**

#### **Mensagem do Cliente (esquerda):**
```
Carlos Silva    14:30
┌─────────────────────────┐
│ Olá! Tudo bem?          │                 [▼][😊]
└─────────────────────────┘                 (hover)
 😊👍  ← reações
```

#### **Mensagem IA/Você (direita):**
```
                14:32    🤖 IA Vendas
   [😊][▼]  ┌─────────────────────────┐
   (hover)  │ Sim! Como posso ajudar? │
            └─────────────────────────┘
                              Lido ✓✓
                                  😊👍  ← reações
```

---

## 🔧 Elementos do Componente

### **1. Cabeçalho (Nome + Horário)**

```tsx
{msg.sender === "client" ? (
  // Cliente: Nome à esquerda, horário à direita
  <div className="flex items-center gap-2 mb-1">
    <span className={`text-sm font-bold ${style.nameColor}`}>
      {clientName}
    </span>
    <span className="text-xs text-[#6B7280]">{msg.time}</span>
  </div>
) : (
  // IA/Você: Horário à esquerda, nome + ícone à direita
  <div className="flex items-center justify-end gap-2 mb-1">
    <span className="text-xs text-[#6B7280]">{msg.time}</span>
    {msg.agentName && (
      <div className="flex items-center gap-1">
        {msg.sender === "ai" && <Bot size={14} />}
        {msg.sender === "you" && <User size={14} />}
        <span className={`text-sm font-bold ${style.nameColor}`}>
          {msg.agentName}
        </span>
      </div>
    )}
  </div>
)}
```

### **2. Bolha da Mensagem**

```tsx
<div className={`
  ${style.bgColor}
  ${style.textColor}
  ${style.shadow}
  rounded-lg
  px-3 py-2
  relative
  border ${style.borderColor}
  min-w-[60px]
`}>
  {/* Conteúdo */}
  <div className="text-sm leading-relaxed">
    {msg.content.split("\n").map((line, i) => (
      <p key={i}>{line}</p>
    ))}
  </div>

  {/* Indicador de editada */}
  {msg.edited && (
    <span className="text-xs italic text-[#667781] ml-1">
      editada
    </span>
  )}

  {/* Status (apenas mensagens enviadas) */}
  {msg.sender !== "client" && msg.status && (
    <div className="flex items-center justify-end gap-1 mt-0.5">
      <span className="text-xs text-[#667781]">
        {msg.status === "read" && <CheckCheck className="text-blue-500" />}
        {msg.status === "delivered" && <CheckCheck />}
        {msg.status === "sent" && <Check />}
      </span>
    </div>
  )}

  {/* Reações - grudadas na bolha */}
  {reactions.length > 0 && (
    <div className={`absolute -bottom-2 ${...} flex gap-1 z-10`}>
      {reactions.map((emoji, idx) => (
        <span className="bg-white border rounded-full px-1.5 py-0.5">
          {emoji}
        </span>
      ))}
    </div>
  )}
</div>
```

### **3. Botões de Ação (Hover)**

```tsx
<div className={`
  absolute top-0 ${style.buttonsPosition}
  opacity-0 group-hover:opacity-100
  transition-opacity flex flex-col gap-1
`}>
  {/* Chevron (menu) - ACIMA */}
  <button
    className="bg-[#F0F2F5] rounded-full p-1.5"
    onClick={() => {
      setMenuOpen(!menuOpen);
      setReactionPickerOpen(false);
    }}
  >
    <ChevronDown size={16} className="text-[#54656F]" />
  </button>

  {/* Emoji (reações) - ABAIXO */}
  <button
    className="bg-[#F0F2F5] rounded-full p-1.5"
    onClick={() => {
      setReactionPickerOpen(!reactionPickerOpen);
      setMenuOpen(false);
    }}
  >
    <Smile size={16} className="text-[#54656F]" />
  </button>
</div>
```

**Posicionamento:**
- Cliente: `-right-20` (20 unidades à direita da bolha)
- IA/Você: `-left-20` (20 unidades à esquerda da bolha)

### **4. Seletor de Reações (Horizontal)**

```tsx
{reactionPickerOpen && (
  <div className={`
    absolute top-0
    ${msg.sender === "client" ? "-right-[320px]" : "-left-[320px]"}
    bg-white rounded-full shadow-2xl border px-3 py-2 z-50
  `}>
    <div className="flex items-center gap-2">
      {['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉'].map((emoji) => (
        <button
          className="text-2xl hover:scale-125"
          onClick={() => {
            onAddReaction(msg.id, emoji);
            setReactionPickerOpen(false);
          }}
        >
          {emoji}
        </button>
      ))}
      <button className="text-xl" onClick={() => console.log("➕ Mais")}>
        ➕
      </button>
    </div>
  </div>
)}
```

**Layout:**
- 7 emojis rápidos + botão ➕
- Horizontal (não vertical)
- Aparece ao lado do botão de emoji
- Cliente: à direita (`-right-[320px]`)
- IA/Você: à esquerda (`-left-[320px]`)

### **5. Menu de Ações**

```tsx
{menuOpen && (
  <div className={`
    absolute ${style.menuPosition} top-full mt-2
    bg-white rounded-lg shadow-xl border py-1 w-48 z-50
  `}>
    <button onClick={() => console.log("Responder")}>
      <Reply size={16} /> Responder
    </button>

    {msg.sender !== "client" && (
      <button onClick={() => onStartEdit(msg.id, msg.content)}>
        <Edit size={16} /> Editar
      </button>
    )}

    <button onClick={() => onCopyMessage(msg.content)}>
      <Copy size={16} /> Copiar
    </button>

    <button onClick={() => console.log("Fixar")}>
      <Pin size={16} /> Fixar
    </button>

    {msg.sender !== "client" && (
      <button className="text-red-600" onClick={() => onDeleteMessage(msg.id)}>
        <Trash2 size={16} /> Deletar
      </button>
    )}
  </div>
)}
```

**Posicionamento:**
- Cliente: `left-0` (alinhado à esquerda da bolha)
- IA/Você: `right-0` (alinhado à direita da bolha)

### **6. Modo Edição**

```tsx
{isEditing ? (
  <div className="bg-white border-2 border-[#FF5A2A] rounded-lg px-4 py-2 shadow-lg min-w-[300px]">
    <Textarea
      value={editingText}
      onChange={(e) => onEditTextChange(e.target.value)}
      autoFocus
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          onSaveEdit();
        }
        if (e.key === 'Escape') {
          onCancelEdit();
        }
      }}
    />
    <div className="flex gap-2 justify-end mt-2">
      <Button variant="ghost" onClick={onCancelEdit}>
        Cancelar
      </Button>
      <Button className="bg-[#FF5A2A]" onClick={onSaveEdit}>
        Salvar
      </Button>
    </div>
  </div>
) : (
  // Bolha normal
)}
```

---

## 📦 Benefícios da Refatoração

### **1. Encapsulamento**
✅ Toda a lógica da mensagem está em um único componente
✅ Estados internos (menu, picker) não vazam para o pai
✅ Fácil de entender e modificar

### **2. Reutilização**
✅ Pode ser usado em qualquer lugar (lista de mensagens, preview, histórico)
✅ Props padronizadas e documentadas
✅ Comportamento consistente

### **3. Manutenibilidade**
✅ Código pai reduzido de 280+ linhas para 13 linhas
✅ Mudanças no design afetam apenas 1 arquivo
✅ Testes isolados possíveis

### **4. Performance**
✅ Cada mensagem gerencia seus próprios estados
✅ Re-renders limitados ao componente específico
✅ Não re-renderiza todas as mensagens ao abrir 1 menu

### **5. Escalabilidade**
✅ Fácil adicionar novos recursos (star, forward, etc)
✅ Pode extrair para arquivo separado quando crescer
✅ Pronto para storybook/testes

---

## 🔄 Comparação: Antes vs Depois

### **ANTES: Código Inline**

```tsx
// No componente pai: 280+ linhas
{messages.map((msg) => {
  const messageStyles = { ... };
  const style = messageStyles[msg.sender];

  return (
    <div>
      {/* Cabeçalho */}
      {msg.sender === "client" ? (
        <div>...</div>
      ) : (
        <div>...</div>
      )}

      {/* Bolha */}
      <div className={`${style.bgColor} ...`}>...</div>

      {/* Botões */}
      <div className={`absolute ${msg.sender === "client" ? "-right-20" : "-left-20"} ...`}>
        <button onClick={() => setReactionPickerOpen(msg.id)}>...</button>
        <button onClick={() => setMessageMenuOpen(msg.id)}>...</button>
      </div>

      {/* Menu */}
      {messageMenuOpen === msg.id && (
        <div>
          <button>Responder</button>
          <button>Editar</button>
          {/* ... mais 5 botões */}
        </div>
      )}

      {/* Picker de reações */}
      {reactionPickerOpen === msg.id && (
        <div>
          {['👍', '❤️', ...].map(emoji => (
            <button onClick={() => handleAddReaction(msg.id, emoji)}>
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Reações exibidas */}
      {messageReactions[msg.id] && (
        <div>...</div>
      )}
    </div>
  );
})}

// Estados globais poluindo o componente pai:
const [messageMenuOpen, setMessageMenuOpen] = useState<string | null>(null);
const [reactionPickerOpen, setReactionPickerOpen] = useState<string | null>(null);

// useEffect global:
useEffect(() => {
  const handleClickOutside = () => {
    setMessageMenuOpen(null);
    setReactionPickerOpen(null);
  };
  document.addEventListener('click', handleClickOutside);
}, [messageMenuOpen, reactionPickerOpen]);
```

### **DEPOIS: Componente Limpo**

```tsx
// No componente pai: 13 linhas limpas
{messages.map((msg) => (
  <WhatsAppMessage
    key={msg.id}
    message={msg}
    clientName={selectedConversation?.clientName}
    isEditing={editingMessageId === msg.id}
    editingText={editingMessageText}
    reactions={messageReactions[msg.id] || []}
    onStartEdit={handleStartEditMessage}
    onSaveEdit={handleSaveEditMessage}
    onCancelEdit={handleCancelEditMessage}
    onEditTextChange={setEditingMessageText}
    onCopyMessage={handleCopyMessage}
    onDeleteMessage={handleDeleteMessage}
    onAddReaction={handleAddReaction}
  />
))}

// ✅ ZERO estados globais de UI
// ✅ ZERO useEffect para menus
// ✅ Toda a lógica encapsulada no componente
```

---

## 📊 Métricas de Melhoria

| Métrica | Antes | Depois | Melhoria |
|---------|-------|--------|----------|
| **Linhas no map** | 280+ | 13 | 🟢 **95% redução** |
| **Estados globais** | 2 | 0 | 🟢 **100% redução** |
| **useEffects** | 1 compartilhado | 0 | 🟢 **Eliminado** |
| **Reutilizável** | ❌ Não | ✅ Sim | 🟢 **Sim** |
| **Testável** | ❌ Difícil | ✅ Fácil | 🟢 **Isolado** |
| **Manutenção** | ❌ Alta complexidade | ✅ Baixa complexidade | 🟢 **Simples** |

---

## 🎯 Próximos Passos

### **1. Extrair para Arquivo Separado**
```bash
# Quando o componente crescer muito:
client/src/components/WhatsAppMessage.tsx
client/src/components/WhatsAppMessage.types.ts
```

### **2. Adicionar Testes**
```typescript
describe('WhatsAppMessage', () => {
  it('renders client message correctly', () => { ... });
  it('shows menu on chevron click', () => { ... });
  it('adds reaction on emoji click', () => { ... });
  it('enters edit mode when edit is clicked', () => { ... });
});
```

### **3. Storybook**
```typescript
// stories/WhatsAppMessage.stories.tsx
export default {
  title: 'Components/WhatsAppMessage',
  component: WhatsAppMessage,
};

export const ClientMessage = { ... };
export const AIMessage = { ... };
export const WithReactions = { ... };
export const EditMode = { ... };
```

### **4. Adicionar Recursos**
- [ ] Star/Favoritar mensagem
- [ ] Forward (encaminhar)
- [ ] Reply (responder citando)
- [ ] Mensagens de áudio/vídeo
- [ ] Mensagens com anexos
- [ ] Mensagens deletadas ("Esta mensagem foi apagada")

---

## ✅ Resultado Final

### **Mensagem como Objeto Visual Real**

✅ **Estrutura clara:** Cabeçalho → Bolha → Botões → Menus
✅ **Encapsulamento:** Toda lógica no componente
✅ **Cores WhatsApp:** Verde (#D9FDD3) e branco oficiais
✅ **Posicionamento correto:** Botões ao lado, menus alinhados
✅ **Estados isolados:** Cada mensagem gerencia seu estado
✅ **Reutilizável:** Props padronizadas e documentadas
✅ **Manutenível:** 95% menos código no componente pai
✅ **Escalável:** Fácil adicionar novos recursos

**A mensagem agora é um componente autônomo e profissional, exatamente como no WhatsApp Web! 🚀**
