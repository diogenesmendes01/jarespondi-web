# 🎭 Modo Demo - Tela Conversas

## 🎯 Como funciona

A tela de **Conversas** agora funciona perfeitamente **sem backend**, permitindo testar toda a interface e interações!

---

## ✨ Recursos do Modo Demo

### 📋 **7 Conversas Mocadas**

1. **Carlos Silva** (Urgente - 2 não lidas)
   - Cliente VIP interessado em matrícula
   - Score: 85/100
   - Pipeline: Proposta (R$ 5.000)
   - Conversa completa com IA sobre valores e descontos

2. **Maria Costa** (IA Ativa - 1 não lida)
   - Lead novo interessado no 3º ano
   - Score: 70/100
   - Pipeline: Qualificação (R$ 3.000)

3. **João Pedro Santos** (Manual)
   - Suporte técnico - problema com matrícula
   - Score: 60/100
   - Conversa com atendente humano

4. **Ana Paula Lima** (IA Ativa)
   - Negociação avançada
   - Score: 75/100
   - Visita agendada

5. **Roberto Alves** (Resolvido)
   - Cliente satisfeito - fechou negócio
   - Score: 90/100
   - Matrícula de 2 filhos (R$ 8.000)

6. **Fernanda Oliveira** (IA Ativa)
   - Qualificação em andamento
   - Score: 65/100

7. **Lucas Mendes** (Urgente - 3 não lidas)
   - Suporte financeiro - problema com boleto
   - Score: 55/100

---

## 💬 Mensagens Interativas

### **Carlos Silva** (mock-1)
✅ 7 mensagens simulando conversa real com IA:
- Cliente pergunta sobre valores
- IA qualifica e apresenta proposta
- Cliente pergunta sobre desconto
- IA oferece desconto para irmãos
- Negociação em andamento

### **Maria Costa** (mock-2)
✅ 5 mensagens:
- Cliente viu anúncio
- IA apresenta proposta para 3º ano
- Lead em qualificação

### **João Pedro Santos** (mock-3)
✅ 4 mensagens:
- Cliente com problema técnico
- IA inicia atendimento
- Humano assume conversa
- Suporte em andamento

### **Outras conversas**
✅ Mensagens genéricas de exemplo

---

## 🎮 Funcionalidades Interativas

### 1. **Enviar Mensagens**
- Digite no textarea
- Pressione **Enter** ou clique em **"Enviar"**
- Sua mensagem aparece instantaneamente
- Se **IA está ON**: recebe resposta automática após 2s

### 2. **Toggle IA**
- Botão **"IA: ON/OFF"**
- Quando ON: simula resposta automática da IA
- Quando OFF: apenas suas mensagens aparecem

### 3. **Trocar Conversa**
- Clique em qualquer conversa na lista
- Mensagens mudam automaticamente
- Cada conversa tem seu histórico independente

### 4. **Card Expansível**
- Botão **"▼ Mais"** / **"▲ Menos"**
- Mostra detalhes completos do cliente:
  - Dados de contato (telefone, email, empresa)
  - Score e temperatura
  - Tags
  - Notas
  - Próximos passos (tarefas)

### 5. **Navegação Sem Erros**
- Loading suave ao iniciar
- Banner laranja indica **"Modo Demo"**
- Nenhum erro é exibido (graceful degradation)

---

## 🎨 Elementos Visuais

### **Banner Modo Demo**
```
🔶 Modo Demo - Exibindo dados mocados (Backend offline)
```
- Gradiente laranja no topo
- Aparece apenas quando backend está offline
- Desaparece quando API conecta

### **Status Visual**
- 🔴 **Vermelho** (urgente): Clientes prioritários
- 🟢 **Verde** (ai): IA gerenciando
- 🟡 **Amarelo** (you): Atendimento manual
- ⚪ **Cinza** (resolved): Conversa encerrada

### **Badges de Não Lidas**
- Números em laranja
- Aparecem ao lado do horário
- Exemplos: Carlos (2), Maria (1), Lucas (3)

---

## 🚀 Como Testar

### 1. **Iniciar sem Backend**
```bash
cd client
npm run dev
```
Acesse: http://localhost:5173/conversas

### 2. **Explorar Conversas**
- Clique em **Carlos Silva**
- Veja conversa completa sobre valores
- Clique em **Maria Costa**
- Veja conversa sobre 3º ano
- Clique em **João Pedro Santos**
- Veja transição IA → Humano

### 3. **Testar Envio de Mensagens**
- Selecione **Carlos Silva**
- Digite: "Quero agendar a visita"
- Pressione Enter
- Aguarde 2 segundos
- IA responde automaticamente

### 4. **Testar Toggle IA**
- Clique em **"IA: ON"** para desativar
- Envie mensagem
- Observe que não há resposta automática
- Clique em **"IA: OFF"** para reativar

### 5. **Explorar Card do Cliente**
- Clique em **"▼ Mais"**
- Veja detalhes completos
- Score com barra de progresso
- Tags editáveis
- Notas e tarefas

---

## 🔄 Transição para Backend Real

### **Quando backend conectar:**

1. ✅ Banner desaparece
2. ✅ Conversas mocadas são substituídas (exceto Carlos)
3. ✅ Carlos Silva permanece como referência
4. ✅ Novas conversas aparecem da API
5. ✅ Botão "Ver mais..." funciona com paginação real
6. ✅ Envio de mensagens vai para backend real

### **Modo Híbrido:**
```
┌──────────────────────────┐
│ Carlos Silva (MOCK)      │ ← Sempre visível
├──────────────────────────┤
│ Cliente Real #1 (API)    │ ← Da API
│ Cliente Real #2 (API)    │ ← Da API
│ Cliente Real #3 (API)    │ ← Da API
│ ...                      │
└──────────────────────────┘
```

---

## 📝 Detalhes Técnicos

### **Detecção de Backend Offline**
```typescript
// Em useConversations.ts
catch (err) {
  console.warn('API não disponível - modo mock ativo');
  setError(null);
  setConversations([]);
}
```

### **Combinação de Dados**
```typescript
// Em Conversas.tsx
if (mapped.length === 0) {
  return mockedConversations; // Todas mocadas
}
return [mockedConversations[0], ...mapped]; // 1 mock + reais
```

### **Resposta IA Simulada**
```typescript
if (iaEnabled) {
  setTimeout(() => {
    const aiResponse = {
      sender: "ai",
      content: "Resposta automática no modo demo...",
      time: now,
      agentName: "IA Demo"
    };
    setCustomMessages(prev => [...prev, aiResponse]);
  }, 2000);
}
```

---

## 🎯 Casos de Uso

### **Para Designers:**
- Testar layouts responsivos
- Validar cores e espaçamentos
- Ver todos os estados visuais
- Não precisa de backend

### **Para Desenvolvedores:**
- Desenvolver frontend independente
- Testar integrações antes do backend
- Debug de componentes
- Testes E2E com dados consistentes

### **Para Product Owners:**
- Demos de funcionalidades
- Validação de fluxos
- Feedback de stakeholders
- Apresentações sem dependências

### **Para QA:**
- Testar edge cases
- Validar comportamentos
- Regressão visual
- Cenários padronizados

---

## 🐛 Troubleshooting

### "Banner não aparece"
✅ Backend pode estar conectado
✅ Verificar console: deve ter warning "API não disponível"

### "Mensagens não aparecem ao enviar"
✅ Verificar se messageInput está vazio
✅ Verificar console para erros
✅ Testar com Enter e botão "Enviar"

### "IA não responde"
✅ Verificar se toggle IA está ON
✅ Aguardar 2 segundos
✅ Verificar console para erros no setTimeout

---

## 🎉 Vantagens do Modo Demo

✅ **Zero Dependências**: Funciona sem backend
✅ **Dados Realistas**: 7 conversas com cenários variados
✅ **Interativo**: Envio real de mensagens
✅ **Consistente**: Sempre os mesmos dados para testes
✅ **Educativo**: Mostra como o sistema funcionará
✅ **Rápido**: Loading instantâneo
✅ **Completo**: Todas as features visíveis

---

## 📚 Próximos Passos

Quando backend estiver pronto:

1. Configurar `VITE_API_URL` no `.env`
2. Implementar autenticação (token)
3. Conversas reais aparecerão automaticamente
4. Carlos Silva permanece para referência
5. Todas as features funcionarão com dados reais

**O modo demo continuará funcionando como fallback!**

---

Divirta-se testando! 🚀✨
