# 📘 JáRespondi - Guia de Estilo de Código
## Padrões e Convenções do Front-end

**Versão:** 1.0  
**Data:** Outubro 2025  
**Stack:** Next.js 14+ • React 18+ • TypeScript • Tailwind CSS

---

## 📑 ÍNDICE

1. [Design System](#1-design-system)
2. [Estrutura de Arquivos](#2-estrutura-de-arquivos)
3. [Nomenclatura](#3-nomenclatura)
4. [TypeScript](#4-typescript)
5. [React Components](#5-react-components)
6. [Estilização](#6-estilização)
7. [Estados e Hooks](#7-estados-e-hooks)
8. [Formulários](#8-formulários)
9. [Fetch e API](#9-fetch-e-api)
10. [Testes](#10-testes)
11. [Performance](#11-performance)
12. [Acessibilidade](#12-acessibilidade)
13. [Git e Commits](#13-git-e-commits)

---

## 1. DESIGN SYSTEM

### 1.1 Cores

```tsx
// ✅ SEMPRE usar as cores do design system
import { tokens } from '@/design-tokens'

// Correto
<div style={{ color: tokens.colors.primary[500] }}>

// Com Tailwind (preferido)
<div className="text-primary-500 bg-secondary-800">

// ❌ NUNCA usar cores hardcoded
<div style={{ color: '#FF5A2A' }}>  // ❌ ERRADO
<div className="text-[#FF5A2A]">    // ❌ ERRADO
```

**Paleta Principal:**
```typescript
Primary (Laranja):   #FF5A2A
Secondary (Café):    #2A1A16
Success (Verde):     #1D7A4E
Error (Vermelho):    #EF4444
Warning (Âmbar):     #F59E0B
Info (Azul):         #3B82F6

Neutrals:
- 50 (mais claro):   #FAFAFA
- 900 (mais escuro): #171717
```

### 1.2 Tipografia

```tsx
// ✅ SEMPRE usar as fontes do design system

// Títulos - Space Grotesk
<h1 className="font-heading text-h1 font-bold">Conversas</h1>
<h2 className="font-heading text-h2 font-semibold">Filtros</h2>
<h3 className="font-heading text-h3 font-semibold">Carlos Silva</h3>

// Corpo de texto - Inter
<p className="font-body text-base">Descrição normal</p>
<p className="font-body text-sm text-neutral-600">Texto secundário</p>
<span className="font-body text-xs text-neutral-500">Timestamp</span>

// Labels (botões, badges) - Inter
<button className="font-body text-sm font-semibold">Enviar</button>
```

**Hierarquia de Tamanhos:**
```
Display:  72px, 60px, 48px, 36px, 30px (hero sections)
Heading:  h1(30px), h2(24px), h3(20px), h4(18px), h5(16px), h6(14px)
Body:     xl(20px), lg(18px), base(16px), sm(14px), xs(12px)
Label:    lg(16px), md(14px), sm(12px), xs(11px)
```

### 1.3 Espaçamento

```tsx
// ✅ SEMPRE usar escala de 4px
const spacing = {
  0: '0px',
  1: '4px',    // 0.25rem
  2: '8px',    // 0.5rem
  3: '12px',   // 0.75rem
  4: '16px',   // 1rem (padrão)
  5: '20px',   // 1.25rem
  6: '24px',   // 1.5rem
  8: '32px',   // 2rem
  10: '40px',  // 2.5rem
  12: '48px',  // 3rem
  16: '64px',  // 4rem
}

// Uso com Tailwind
<div className="p-4 mb-6 gap-3">  // padding 16px, margin-bottom 24px, gap 12px
<div className="space-y-4">        // vertical spacing de 16px entre filhos
```

**Padrões Comuns:**
```tsx
// Card padding
<div className="p-4 md:p-6">      // 16px mobile, 24px desktop

// Section spacing
<section className="mb-8 md:mb-12"> // 32px mobile, 48px desktop

// Form field spacing
<div className="space-y-4">        // 16px entre campos

// Button gap (ícone + texto)
<button className="gap-2">         // 8px
```

### 1.4 Ícones

```tsx
// ✅ SEMPRE usar Lucide React
import { MessageCircle, Send, Bot, User } from 'lucide-react'

// Tamanhos padrão
<MessageCircle size={16} />  // sm - labels, badges
<MessageCircle size={20} />  // md - botões, inputs (padrão)
<MessageCircle size={24} />  // lg - headers, cards
<MessageCircle size={32} />  // xl - empty states

// Com cor do design system
<Bot size={20} className="text-primary-500" />
<User size={20} className="text-neutral-600" />

// Stroke width consistente
<MessageCircle size={20} strokeWidth={2} />  // padrão
```

**Ícones Principais do Produto:**
```typescript
// Navegação
LayoutDashboard, MessageCircle, Users, BarChart3, Settings

// Status IA
Bot (ativa), User (humano), Clock (aguardando), 
CheckCircle (resolvida), Pause, Play

// Ações
Send, Paperclip, Smile, Mic, Camera, Tag, Calendar

// CRM
Flame (quente), Thermometer (morno), Snowflake (frio), 
Star (favorito), TrendingUp (score), DollarSign (valor)
```

### 1.5 Sombras (Elevação)

```tsx
// Hierarquia de elevação
<div className="shadow-xs">    // Muito sutil (borders)
<div className="shadow-sm">    // Cards, inputs padrão
<div className="shadow-md">    // Cards hover, dropdowns
<div className="shadow-lg">    // Modals, drawers
<div className="shadow-xl">    // Notificações importantes

// Sombras coloridas (hover de botões)
<button className="hover:shadow-primary-glow">  // Laranja
<button className="hover:shadow-success-glow">  // Verde
```

---

## 2. ESTRUTURA DE ARQUIVOS

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   └── cadastro/
│   ├── (dashboard)/
│   │   ├── conversas/
│   │   ├── crm/
│   │   └── analytics/
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
│
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # Componentes base (Button, Input, Card)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   └── index.ts              # Barrel export
│   │
│   ├── chat/                     # Componentes específicos de chat
│   │   ├── MessageBubble.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ConversationCard.tsx
│   │   └── index.ts
│   │
│   ├── crm/                      # Componentes de CRM
│   │   ├── ContactCard.tsx
│   │   ├── ScoreBadge.tsx
│   │   └── index.ts
│   │
│   └── layout/                   # Layout components
│       ├── Header.tsx
│       ├── Sidebar.tsx
│       └── Footer.tsx
│
├── lib/                          # Utilitários e configurações
│   ├── api.ts                    # Cliente de API
│   ├── utils.ts                  # Funções utilitárias
│   ├── validations.ts            # Schemas de validação (Zod)
│   └── constants.ts              # Constantes
│
├── hooks/                        # Custom hooks
│   ├── useChat.ts
│   ├── useConversations.ts
│   └── useMediaQuery.ts
│
├── types/                        # TypeScript types/interfaces
│   ├── chat.ts
│   ├── user.ts
│   ├── conversation.ts
│   └── api.ts
│
├── contexts/                     # React contexts
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ChatContext.tsx
│
├── services/                     # API services
│   ├── chatService.ts
│   ├── userService.ts
│   └── crmService.ts
│
├── config/                       # Configurações
│   ├── env.ts                    # Variáveis de ambiente tipadas
│   └── site.ts                   # Metadados do site
│
├── design-tokens.ts              # Design system tokens
└── tailwind.config.ts            # Tailwind config
```

**Regras:**
- ✅ Componentes UI genéricos em `/components/ui`
- ✅ Componentes específicos de feature em pastas dedicadas
- ✅ Sempre usar barrel exports (`index.ts`)
- ✅ Types compartilhados em `/types`
- ✅ Lógica de negócio em `/services`
- ❌ Nunca colocar lógica de negócio em componentes

---

## 3. NOMENCLATURA

### 3.1 Arquivos

```bash
# Componentes React - PascalCase
Button.tsx
MessageBubble.tsx
ConversationCard.tsx

# Hooks - camelCase com prefixo 'use'
useChat.ts
useConversations.ts
useMediaQuery.ts

# Utilitários - camelCase
utils.ts
api.ts
validations.ts

# Types - camelCase
chat.ts
user.ts
conversation.ts

# Páginas (App Router) - kebab-case
page.tsx
layout.tsx
not-found.tsx
error.tsx

# Pastas - kebab-case
components/ui/
hooks/
lib/
```

### 3.2 Variáveis e Funções

```typescript
// ✅ camelCase para variáveis e funções
const userName = 'Carlos'
const isLoading = false
const handleSubmit = () => {}
const fetchConversations = async () => {}

// ✅ PascalCase para componentes e classes
const Button = () => {}
class UserService {}

// ✅ SCREAMING_SNAKE_CASE para constantes
const API_BASE_URL = 'https://api.exemplo.com'
const MAX_MESSAGE_LENGTH = 500
const DEFAULT_PAGE_SIZE = 20

// ✅ Prefixos semânticos
const isActive = true        // boolean - is/has/can/should
const hasPermission = false
const canEdit = true
const shouldRender = false

const userCount = 10         // número - count/total/max/min
const totalMessages = 50
const maxRetries = 3

const handleClick = () => {}  // função - handle/on para eventos
const onClick = () => {}
const onSubmit = () => {}

const fetchUsers = () => {}   // função async - fetch/get/create/update/delete
const getUser = () => {}
const createMessage = () => {}
const updateStatus = () => {}
const deleteConversation = () => {}
```

### 3.3 Componentes

```tsx
// ✅ Nome descritivo e específico
// Bom
<MessageBubble />
<ConversationCard />
<ChatInput />
<StatusBadge />

// ❌ Nome genérico
// Ruim
<Message />
<Card />
<Input />
<Badge />

// ✅ Prefixos para variações
<PrimaryButton />
<SecondaryButton />
<GhostButton />

<MessageBubbleUser />
<MessageBubbleBot />

// ✅ Sufixos para contexto
<ConversationList />
<ConversationItem />
<ConversationCard />

<ChatHeader />
<ChatBody />
<ChatFooter />
```

### 3.4 Props

```typescript
// ✅ Props descritivas
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  isDisabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

// ✅ Callback props com prefixo 'on'
interface FormProps {
  onSubmit: (data: FormData) => void
  onChange: (value: string) => void
  onError: (error: Error) => void
}

// ✅ Props booleanas com prefixo 'is', 'has', 'can', 'should'
interface CardProps {
  isActive?: boolean
  hasIcon?: boolean
  canExpand?: boolean
  shouldAnimate?: boolean
}
```

---

## 4. TYPESCRIPT

### 4.1 Types vs Interfaces

```typescript
// ✅ Use TYPE para:
// - Unions
type Status = 'active' | 'paused' | 'resolved'
type Size = 'sm' | 'md' | 'lg'

// - Primitivos
type ID = string
type Timestamp = number

// - Tuplas
type Point = [number, number]

// - Funções
type HandleClick = (event: MouseEvent) => void

// ✅ Use INTERFACE para:
// - Shapes de objetos
interface User {
  id: string
  name: string
  email: string
}

// - Props de componentes (pode ser extendida)
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  children: React.ReactNode
}

// - API responses
interface ApiResponse<T> {
  data: T
  message: string
  status: number
}
```

### 4.2 Tipagem Estrita

```typescript
// ✅ SEMPRE tipar props de componentes
interface MessageBubbleProps {
  message: string
  sender: 'user' | 'bot'
  timestamp: Date
  isRead?: boolean  // opcional
}

export function MessageBubble({ 
  message, 
  sender, 
  timestamp,
  isRead = false  // valor padrão
}: MessageBubbleProps) {
  // ...
}

// ✅ SEMPRE tipar hooks customizados
interface UseConversationsReturn {
  conversations: Conversation[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
}

function useConversations(): UseConversationsReturn {
  // ...
}

// ✅ SEMPRE tipar funções async
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// ✅ Usar genéricos quando apropriado
function createArray<T>(item: T, length: number): T[] {
  return Array(length).fill(item)
}

const numbers = createArray<number>(0, 5)  // [0, 0, 0, 0, 0]
```

### 4.3 Utilitários TypeScript

```typescript
// ✅ Usar utility types do TypeScript
type User = {
  id: string
  name: string
  email: string
  password: string
}

// Partial - todos opcionais
type UpdateUser = Partial<User>

// Pick - selecionar propriedades
type UserCredentials = Pick<User, 'email' | 'password'>

// Omit - remover propriedades
type PublicUser = Omit<User, 'password'>

// Required - todos obrigatórios
type RequiredUser = Required<Partial<User>>

// Record - objeto com chaves específicas
type StatusColors = Record<'active' | 'paused' | 'resolved', string>

// ✅ Usar inferência quando possível
const user = { id: '1', name: 'Carlos' }  // tipo inferido
// em vez de
const user: { id: string, name: string } = { id: '1', name: 'Carlos' }
```

### 4.4 Nunca usar 'any'

```typescript
// ❌ EVITAR any
function processData(data: any) {  // ❌ RUIM
  return data.value
}

// ✅ Usar unknown + type guard
function processData(data: unknown) {  // ✅ BOM
  if (isValidData(data)) {
    return data.value
  }
  throw new Error('Invalid data')
}

function isValidData(data: unknown): data is { value: string } {
  return typeof data === 'object' && 
         data !== null && 
         'value' in data
}

// ✅ Usar genéricos
function processData<T extends { value: string }>(data: T) {
  return data.value
}
```

---

## 5. REACT COMPONENTS

### 5.1 Estrutura de Componente

```tsx
// ✅ TEMPLATE PADRÃO
import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui'

// 1. INTERFACES/TYPES (no topo)
interface MessageBubbleProps {
  message: string
  sender: 'user' | 'bot'
  timestamp: Date
  onDelete?: () => void
}

// 2. COMPONENTE
export function MessageBubble({ 
  message, 
  sender, 
  timestamp,
  onDelete 
}: MessageBubbleProps) {
  // 3. HOOKS (sempre no topo, mesma ordem)
  const [isHovered, setIsHovered] = useState(false)
  
  // 4. COMPUTED VALUES / MEMOS
  const isBot = sender === 'bot'
  const formattedTime = timestamp.toLocaleTimeString()
  
  // 5. HANDLERS (prefixo 'handle')
  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => setIsHovered(false)
  const handleDelete = () => {
    if (onDelete) onDelete()
  }
  
  // 6. EFFECTS (se necessário)
  // useEffect...
  
  // 7. EARLY RETURNS (se aplicável)
  if (!message) return null
  
  // 8. RENDER
  return (
    <div 
      className={`message-bubble ${isBot ? 'bot' : 'user'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isBot && <MessageCircle size={16} />}
      <p>{message}</p>
      <span className="text-xs">{formattedTime}</span>
      {isHovered && onDelete && (
        <Button variant="ghost" size="sm" onClick={handleDelete}>
          Deletar
        </Button>
      )}
    </div>
  )
}

// 9. EXPORTS AUXILIARES (se houver)
export type { MessageBubbleProps }
```

### 5.2 Componentes Server vs Client

```tsx
// ✅ Server Component (padrão no Next.js)
// Sem 'use client', sem useState/useEffect, sem event handlers
export async function ConversationsList() {
  const conversations = await fetchConversations()
  
  return (
    <div>
      {conversations.map(conv => (
        <ConversationCard key={conv.id} conversation={conv} />
      ))}
    </div>
  )
}

// ✅ Client Component (quando necessário)
'use client'

import { useState } from 'react'

export function ChatInput() {
  const [message, setMessage] = useState('')
  
  const handleSubmit = () => {
    // lógica
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  )
}

// ✅ Composição (Server wrapper com Client children)
// app/conversas/page.tsx (server)
import { ConversationsList } from '@/components/ConversationsList'  // server
import { ChatInput } from '@/components/ChatInput'  // client

export default function ConversationsPage() {
  return (
    <div>
      <ConversationsList />  {/* server */}
      <ChatInput />          {/* client */}
    </div>
  )
}
```

### 5.3 Props Patterns

```tsx
// ✅ Desestruturar props
function Button({ variant, size, children }: ButtonProps) {
  // ✅ BOM
}

function Button(props: ButtonProps) {
  return <button>{props.children}</button>  // ❌ RUIM
}

// ✅ Props opcionais com valores padrão
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

function Button({ 
  variant = 'primary',   // ✅ valor padrão
  size = 'md',
  children 
}: ButtonProps) {
  // variant e size sempre têm valor
}

// ✅ Rest props para elementos HTML
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button 
      className={`btn-${variant} ${className}`}
      {...props}  // passa todos os props HTML (onClick, disabled, etc)
    />
  )
}

// ✅ Children como render prop (quando necessário)
interface ListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

// Uso
<List 
  items={users} 
  renderItem={(user) => <UserCard user={user} />} 
/>
```

### 5.4 Conditional Rendering

```tsx
// ✅ Early return para casos simples
function MessageBubble({ message }: Props) {
  if (!message) return null
  if (message.deleted) return <DeletedMessage />
  
  return <div>{message.text}</div>
}

// ✅ Ternário para toggle simples
<div>
  {isLoading ? <Spinner /> : <Content />}
</div>

// ✅ && para render condicional
<div>
  {hasError && <ErrorMessage />}
  {isSuccess && <SuccessIcon />}
</div>

// ❌ EVITAR ternários aninhados
{isLoading ? (
  <Spinner />
) : hasError ? (           // ❌ difícil de ler
  <Error />
) : isEmpty ? (
  <Empty />
) : (
  <Content />
)}

// ✅ Extrair para função ou variável
function getContent() {
  if (isLoading) return <Spinner />
  if (hasError) return <Error />
  if (isEmpty) return <Empty />
  return <Content />
}

return <div>{getContent()}</div>
```

### 5.5 Lists e Keys

```tsx
// ✅ SEMPRE usar key estável e única
<ul>
  {messages.map(message => (
    <li key={message.id}>  {/* ✅ BOM - ID único */}
      {message.text}
    </li>
  ))}
</ul>

// ❌ NUNCA usar index como key se a lista pode mudar
<ul>
  {messages.map((message, index) => (
    <li key={index}>  {/* ❌ RUIM */}
      {message.text}
    </li>
  ))}
</ul>

// ✅ Se não tem ID, criar um estável
import { nanoid } from 'nanoid'

const messagesWithIds = messages.map(msg => ({
  ...msg,
  id: msg.id || nanoid()
}))

// ✅ Fragmentos com key (quando necessário)
<>
  {items.map(item => (
    <React.Fragment key={item.id}>
      <ItemHeader item={item} />
      <ItemBody item={item} />
    </React.Fragment>
  ))}
</>
```

---

## 6. ESTILIZAÇÃO

### 6.1 Tailwind CSS (Preferido)

```tsx
// ✅ Ordem das classes (consistente)
// Layout → Spacing → Typography → Colors → Effects → States
<div className="
  flex items-center gap-4           // Layout
  p-4 mb-6                          // Spacing
  text-base font-semibold           // Typography
  text-neutral-900 bg-white         // Colors
  rounded-lg shadow-md              // Effects
  hover:shadow-lg hover:bg-neutral-50  // States
  transition-all duration-200       // Transitions
">

// ✅ Responsive (mobile-first)
<div className="
  p-4 md:p-6 lg:p-8                 // Padding responsivo
  text-base md:text-lg              // Texto responsivo
  grid grid-cols-1 md:grid-cols-2   // Grid responsivo
">

// ✅ Conditional classes
import { cn } from '@/lib/utils'  // classnames utility

<button 
  className={cn(
    'px-4 py-2 rounded-md',          // Base
    variant === 'primary' && 'bg-primary-500 text-secondary-800',
    variant === 'secondary' && 'bg-secondary-800 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed',
    className  // permite override externo
  )}
>

// ✅ Extract repeated classes
const buttonBaseClasses = 'px-4 py-2 rounded-md font-semibold transition-all'
const buttonPrimaryClasses = 'bg-primary-500 text-secondary-800 hover:bg-primary-600'

<button className={`${buttonBaseClasses} ${buttonPrimaryClasses}`}>
```

### 6.2 CSS Modules (Quando necessário)

```tsx
// Button.module.css
.button {
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

.button--primary {
  background: var(--color-primary-500);
  color: var(--color-secondary-800);
}

.button--primary:hover {
  background: var(--color-primary-600);
}

// Button.tsx
import styles from './Button.module.css'

export function Button({ variant }: Props) {
  return (
    <button className={`${styles.button} ${styles[`button--${variant}`]}`}>
      Click me
    </button>
  )
}
```

### 6.3 Styled Components (Evitar, mas se usar)

```tsx
import styled from 'styled-components'
import { tokens } from '@/design-tokens'

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
  padding: ${tokens.spacing[3]} ${tokens.spacing[5]};
  border-radius: ${tokens.borderRadius.md};
  font-weight: ${tokens.typography.weights.semibold};
  transition: ${tokens.transitions.default};
  
  ${props => props.$variant === 'primary' && `
    background: ${tokens.colors.primary[500]};
    color: ${tokens.colors.secondary[800]};
    
    &:hover {
      background: ${tokens.colors.primary[600]};
    }
  `}
`

// Uso
<StyledButton $variant="primary">Click me</StyledButton>
```

### 6.4 Evitar Inline Styles

```tsx
// ❌ EVITAR inline styles
<div style={{ 
  padding: '16px', 
  backgroundColor: '#FF5A2A',
  borderRadius: '8px' 
}}>

// ✅ Usar Tailwind
<div className="p-4 bg-primary-500 rounded-lg">

// ✅ OU usar inline apenas para valores dinâmicos
<div 
  className="p-4 rounded-lg"
  style={{ 
    width: `${progress}%`,           // ✅ Valor dinâmico
    transform: `translateX(${x}px)`  // ✅ Valor dinâmico
  }}
>
```

---

## 7. ESTADOS E HOOKS

### 7.1 useState

```tsx
// ✅ Nomear estados claramente
const [isOpen, setIsOpen] = useState(false)
const [userName, setUserName] = useState('')
const [messages, setMessages] = useState<Message[]>([])

// ✅ Estado derivado (computed) - sem useState
const hasMessages = messages.length > 0
const unreadCount = messages.filter(m => !m.isRead).length
// ❌ const [hasMessages, setHasMessages] = useState(false)  // DESNECESSÁRIO

// ✅ Estado com função inicializadora (quando caro)
const [value, setValue] = useState(() => {
  const stored = localStorage.getItem('key')
  return stored ? JSON.parse(stored) : defaultValue
})

// ✅ Update baseado em valor anterior
const [count, setCount] = useState(0)
setCount(prev => prev + 1)  // ✅ BOM
setCount(count + 1)          // ❌ pode dar problema com closures
```

### 7.2 useEffect

```tsx
// ✅ Sempre incluir dependências corretas
useEffect(() => {
  fetchData(userId)  // ✅ userId está nas dependências
}, [userId])

// ✅ Cleanup quando necessário
useEffect(() => {
  const interval = setInterval(() => {
    checkStatus()
  }, 5000)
  
  return () => clearInterval(interval)  // ✅ Cleanup
}, [])

// ✅ Evitar useEffect para estados derivados
// ❌ RUIM
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])

// ✅ BOM - computed value
const fullName = `${firstName} ${lastName}`

// ✅ useEffect apenas para side effects
useEffect(() => {
  // Fetch, subscriptions, timers, logging, analytics
  trackPageView()
  
  const unsubscribe = subscribe()
  return () => unsubscribe()
}, [])
```

### 7.3 Custom Hooks

```tsx
// ✅ Prefixo 'use'
// ✅ Encapsular lógica reutilizável
// ✅ Retornar objeto ou array

// hooks/useConversations.ts
interface UseConversationsReturn {
  conversations: Conversation[]
  isLoading: boolean
  error: Error | null
  refetch: () => Promise<void>
  createConversation: (data: CreateConversationData) => Promise<void>
}

export function useConversations(): UseConversationsReturn {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const fetchConversations = async () => {
    try {
      setIsLoading(true)
      const data = await conversationService.getAll()
      setConversations(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }
  
  useEffect(() => {
    fetchConversations()
  }, [])
  
  const createConversation = async (data: CreateConversationData) => {
    const newConv = await conversationService.create(data)
    setConversations(prev => [newConv, ...prev])
  }
  
  return {
    conversations,
    isLoading,
    error,
    refetch: fetchConversations,
    createConversation,
  }
}

// Uso no componente
function ConversationsList() {
  const { 
    conversations, 
    isLoading, 
    error,
    createConversation 
  } = useConversations()
  
  if (isLoading) return <Spinner />
  if (error) return <Error message={error.message} />
  
  return (
    <div>
      {conversations.map(conv => (
        <ConversationCard key={conv.id} conversation={conv} />
      ))}
    </div>
  )
}
```

### 7.4 Hooks Rules

```tsx
// ✅ SEMPRE chamar hooks no topo do componente
// ✅ Mesma ordem sempre
// ❌ NUNCA dentro de condicionais, loops ou funções

function Component() {
  // ✅ BOM - topo, sempre mesma ordem
  const [state, setState] = useState()
  const data = useQuery()
  useEffect(() => {}, [])
  
  // ❌ RUIM - condicional
  if (condition) {
    useEffect(() => {}, [])  // ❌ ERRO
  }
  
  // ❌ RUIM - dentro de função
  const handleClick = () => {
    const [state] = useState()  // ❌ ERRO
  }
  
  // ❌ RUIM - dentro de loop
  items.forEach(() => {
    useEffect(() => {}, [])  // ❌ ERRO
  })
}
```

---

## 8. FORMULÁRIOS

### 8.1 React Hook Form (Recomendado)

```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// ✅ Schema de validação com Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  })
  
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
    } catch (error) {
      // handle error
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input 
          id="email"
          type="email"
          {...register('email')}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <span className="text-error-500">{errors.email.message}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="password">Senha</label>
        <input 
          id="password"
          type="password"
          {...register('password')}
          aria-invalid={!!errors.password}
        />
        {errors.password && (
          <span className="text-error-500">{errors.password.message}</span>
        )}
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar'}
      </button>
    </form>
  )
}
```

### 8.2 Validações

```tsx
// lib/validations.ts
import * as z from 'zod'

// ✅ Validações reutilizáveis
export const emailSchema = z.string().email('Email inválido')

export const passwordSchema = z
  .string()
  .min(8, 'Mínimo 8 caracteres')
  .regex(/[A-Z]/, 'Deve conter letra maiúscula')
  .regex(/[0-9]/, 'Deve conter número')

export const phoneSchema = z
  .string()
  .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'Telefone inválido')

// ✅ Schemas compostos
export const userSchema = z.object({
  name: z.string().min(2, 'Nome muito curto'),
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema.optional(),
})

export const messageSchema = z.object({
  text: z.string().min(1, 'Mensagem vazia').max(500, 'Máximo 500 caracteres'),
  conversationId: z.string().uuid(),
})
```

---

## 9. FETCH E API

### 9.1 API Client

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface RequestConfig extends RequestInit {
  token?: string
}

async function request<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<T> {
  const { token, ...customConfig } = config
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customConfig.headers,
  }
  
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...customConfig,
    headers,
  })
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro desconhecido' }))
    throw new ApiError(error.message, response.status, error)
  }
  
  return response.json()
}

// ✅ Exports para uso
export const api = {
  get: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: 'GET' }),
    
  post: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, { 
      ...config, 
      method: 'POST',
      body: JSON.stringify(data),
    }),
    
  put: <T>(endpoint: string, data?: any, config?: RequestConfig) =>
    request<T>(endpoint, { 
      ...config, 
      method: 'PUT',
      body: JSON.stringify(data),
    }),
    
  delete: <T>(endpoint: string, config?: RequestConfig) =>
    request<T>(endpoint, { ...config, method: 'DELETE' }),
}
```

### 9.2 Services

```typescript
// services/conversationService.ts
import { api } from '@/lib/api'
import type { Conversation, CreateConversationData } from '@/types/conversation'

export const conversationService = {
  async getAll(): Promise<Conversation[]> {
    return api.get<Conversation[]>('/conversations')
  },
  
  async getById(id: string): Promise<Conversation> {
    return api.get<Conversation>(`/conversations/${id}`)
  },
  
  async create(data: CreateConversationData): Promise<Conversation> {
    return api.post<Conversation>('/conversations', data)
  },
  
  async update(id: string, data: Partial<Conversation>): Promise<Conversation> {
    return api.put<Conversation>(`/conversations/${id}`, data)
  },
  
  async delete(id: string): Promise<void> {
    return api.delete<void>(`/conversations/${id}`)
  },
  
  async pauseAI(id: string): Promise<Conversation> {
    return api.post<Conversation>(`/conversations/${id}/pause-ai`)
  },
  
  async resumeAI(id: string): Promise<Conversation> {
    return api.post<Conversation>(`/conversations/${id}/resume-ai`)
  },
}
```

### 9.3 React Query (Recomendado para fetch)

```tsx
// hooks/useConversations.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { conversationService } from '@/services/conversationService'

export function useConversations() {
  return useQuery({
    queryKey: ['conversations'],
    queryFn: conversationService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutos
  })
}

export function useConversation(id: string) {
  return useQuery({
    queryKey: ['conversations', id],
    queryFn: () => conversationService.getById(id),
    enabled: !!id,  // só faz fetch se tiver ID
  })
}

export function useCreateConversation() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: conversationService.create,
    onSuccess: () => {
      // Invalida cache para refetch
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })
}

export function usePauseAI() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: conversationService.pauseAI,
    onSuccess: (data) => {
      // Update cache otimisticamente
      queryClient.setQueryData(['conversations', data.id], data)
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
  })
}

// Uso no componente
function ConversationsList() {
  const { data: conversations, isLoading, error } = useConversations()
  const { mutate: createConversation } = useCreateConversation()
  const { mutate: pauseAI } = usePauseAI()
  
  if (isLoading) return <Spinner />
  if (error) return <Error />
  
  return (
    <div>
      {conversations?.map(conv => (
        <ConversationCard 
          key={conv.id} 
          conversation={conv}
          onPauseAI={() => pauseAI(conv.id)}
        />
      ))}
      <button onClick={() => createConversation({ ... })}>
        Nova Conversa
      </button>
    </div>
  )
}
```

---

## 10. TESTES

### 10.1 Estrutura de Testes

```typescript
// ✅ Nomear arquivos .test.tsx ou .spec.tsx
Button.test.tsx
useConversations.test.ts
conversationService.test.ts

// ✅ Estrutura AAA (Arrange, Act, Assert)
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('renders with text', () => {
    // Arrange
    const text = 'Click me'
    
    // Act
    render(<Button>{text}</Button>)
    
    // Assert
    expect(screen.getByText(text)).toBeInTheDocument()
  })
  
  it('calls onClick when clicked', () => {
    // Arrange
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    
    // Act
    fireEvent.click(screen.getByRole('button'))
    
    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
  
  it('is disabled when isDisabled prop is true', () => {
    render(<Button isDisabled>Click</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### 10.2 O que testar

```typescript
// ✅ TESTAR
// - Renderização de componentes
// - Props e variações
// - Interações do usuário (click, input, submit)
// - Estados e transições
// - Conditional rendering
// - Acessibilidade (roles, labels)
// - Utils e helpers
// - Hooks customizados
// - Services e API calls (mocked)

// ❌ NÃO TESTAR
// - Implementação interna
// - Bibliotecas externas
// - Estilos CSS (use visual regression)
```

---

## 11. PERFORMANCE

### 11.1 Otimizações React

```tsx
// ✅ Memoização quando necessário
import { memo, useMemo, useCallback } from 'react'

// Memoizar componente pesado
export const ConversationCard = memo(function ConversationCard({ 
  conversation 
}: Props) {
  // ...
})

// useMemo para cálculos pesados
const sortedConversations = useMemo(() => {
  return conversations.sort((a, b) => b.timestamp - a.timestamp)
}, [conversations])

// useCallback para funções passadas como props
const handleDelete = useCallback((id: string) => {
  deleteConversation(id)
}, [deleteConversation])

// ✅ Lazy loading de componentes
import { lazy, Suspense } from 'react'

const HeavyChart = lazy(() => import('./HeavyChart'))

function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyChart />
    </Suspense>
  )
}

// ✅ Dynamic imports
import dynamic from 'next/dynamic'

const DynamicModal = dynamic(() => import('./Modal'), {
  loading: () => <Spinner />,
  ssr: false,  // não renderizar no server
})
```

### 11.2 Images

```tsx
// ✅ SEMPRE usar next/image
import Image from 'next/image'

<Image
  src="/avatar.jpg"
  alt="Avatar do usuário"
  width={48}
  height={48}
  priority  // se above the fold
/>

// ✅ Placeholder blur
<Image
  src="/hero.jpg"
  alt="Hero"
  width={1200}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/..." // ou usar next/image gerar
/>

// ✅ Lazy load (padrão do next/image)
<Image
  src="/thumbnail.jpg"
  alt="Thumbnail"
  width={200}
  height={200}
  loading="lazy"  // padrão
/>
```

### 11.3 Bundle Size

```bash
# ✅ Analisar bundle
npm run build
npx @next/bundle-analyzer

# ✅ Import apenas o necessário
// ❌ import _ from 'lodash'  // importa tudo (heavy)
// ✅ import { debounce } from 'lodash'  // tree-shake

// ❌ import * as Icons from 'lucide-react'
// ✅ import { MessageCircle, Send } from 'lucide-react'

# ✅ Dynamic imports para código pesado
const HeavyLib = await import('heavy-lib')
```

---

## 12. ACESSIBILIDADE

### 12.1 Semântica HTML

```tsx
// ✅ Usar elementos semânticos
<header>
  <nav>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Título</h1>
    <p>Conteúdo</p>
  </article>
</main>

<footer>
  <p>© 2025</p>
</footer>

// ❌ EVITAR divs genéricas
<div className="header">
  <div className="nav">
    // ...
```

### 12.2 ARIA e Labels

```tsx
// ✅ Sempre label em inputs
<label htmlFor="email">Email</label>
<input id="email" type="email" />

// ✅ ARIA quando necessário
<button 
  aria-label="Fechar modal"
  aria-expanded={isOpen}
  aria-controls="menu"
>
  <X size={20} />
</button>

// ✅ Roles quando necessário
<div role="dialog" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Título do Modal</h2>
</div>

// ✅ aria-live para notificações
<div 
  role="alert" 
  aria-live="polite"
  aria-atomic="true"
>
  Mensagem enviada com sucesso
</div>
```

### 12.3 Keyboard Navigation

```tsx
// ✅ Tabs funcionais
<div role="tablist">
  <button 
    role="tab"
    aria-selected={activeTab === 'messages'}
    tabIndex={activeTab === 'messages' ? 0 : -1}
    onClick={() => setActiveTab('messages')}
    onKeyDown={(e) => {
      if (e.key === 'ArrowRight') {
        // mover para próxima tab
      }
    }}
  >
    Mensagens
  </button>
</div>

// ✅ Skip to content
<a href="#main-content" className="skip-to-content">
  Pular para conteúdo
</a>

<main id="main-content">
  {/* conteúdo */}
</main>

// ✅ Focus visible
<button className="
  focus:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-primary-500
">
```

### 12.4 Contraste

```tsx
// ✅ Manter contraste WCAG AA (4.5:1 para texto normal)
// Texto primário em background branco
<p className="text-neutral-900">  {/* #171717 - ✅ 19.38:1 */}

// Texto secundário
<p className="text-neutral-600">  {/* #525252 - ✅ 7.33:1 */}

// ❌ Texto claro demais
<p className="text-neutral-300">  {/* #D4D4D4 - ❌ 1.92:1 */}
```

---

## 13. GIT E COMMITS

### 13.1 Mensagens de Commit

```bash
# ✅ Conventional Commits
# Formato: <tipo>(escopo): <descrição>

# Tipos:
feat:     Nova funcionalidade
fix:      Correção de bug
docs:     Documentação
style:    Formatação (não afeta código)
refactor: Refatoração (não adiciona feature nem corrige bug)
perf:     Melhoria de performance
test:     Adicionar/corrigir testes
chore:    Tarefas de manutenção

# Exemplos:
git commit -m "feat(chat): adiciona componente MessageBubble"
git commit -m "fix(auth): corrige validação de email"
git commit -m "docs(readme): atualiza instruções de instalação"
git commit -m "refactor(button): extrai lógica de variantes"
git commit -m "perf(conversations): adiciona lazy loading"
git commit -m "test(button): adiciona testes de acessibilidade"
git commit -m "chore(deps): atualiza dependências"

# ✅ Breaking changes
git commit -m "feat(api)!: altera estrutura de resposta da API

BREAKING CHANGE: O campo 'user' foi renomeado para 'sender'"
```

### 13.2 Branches

```bash
# ✅ Padrão de nomenclatura
main                    # Produção
develop                 # Desenvolvimento
feature/chat-input      # Nova funcionalidade
fix/message-timestamp   # Correção de bug
refactor/button-styles  # Refatoração
hotfix/security-patch   # Correção urgente em produção

# ✅ Workflow
git checkout develop
git pull origin develop
git checkout -b feature/nova-funcionalidade
# ... trabalhar ...
git add .
git commit -m "feat: adiciona nova funcionalidade"
git push origin feature/nova-funcionalidade
# Abrir Pull Request
```

### 13.3 Pull Requests

```markdown
# ✅ Template de PR

## 🎯 Objetivo
Breve descrição do que foi feito e por quê

## 🔨 Mudanças
- [ ] Adiciona componente X
- [ ] Refatora componente Y
- [ ] Corrige bug Z

## 📸 Screenshots
(se aplicável)

## ✅ Checklist
- [ ] Código segue o guia de estilo
- [ ] Testes adicionados/atualizados
- [ ] Documentação atualizada
- [ ] Testado localmente
- [ ] Sem warnings no console
- [ ] Acessibilidade verificada

## 🔗 Issue Relacionada
Closes #123
```

---

## 📚 RECURSOS E REFERÊNCIAS

### Documentação Oficial
- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

### Ferramentas
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [TanStack Query](https://tanstack.com/query)
- [Testing Library](https://testing-library.com)

### Acessibilidade
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)
- [A11y Project](https://www.a11yproject.com)
- [axe DevTools](https://www.deque.com/axe)

---

## 📋 CHECKLIST ANTES DE COMITAR

- [ ] Código segue o guia de estilo
- [ ] Sem `console.log()` esquecidos
- [ ] Sem `any` no TypeScript
- [ ] Componentes tipados
- [ ] Classes Tailwind ordenadas
- [ ] Tokens do design system usados
- [ ] Sem cores/espaçamentos hardcoded
- [ ] Ícones consistentes (Lucide)
- [ ] Acessibilidade verificada (keyboard, labels, contrast)
- [ ] Responsivo (mobile, tablet, desktop)
- [ ] Loading e error states implementados
- [ ] Mensagem de commit clara
- [ ] Branch nomeada corretamente

---

**Última atualização:** Outubro 2025  
**Versão:** 1.0  
**Mantido por:** Equipe JáRespondi

---

## 🤝 Contribuindo

Para sugerir melhorias neste guia, abra uma issue ou PR no repositório.

Dúvidas? Pergunte no Slack no canal `#frontend` ou `#design-system`.