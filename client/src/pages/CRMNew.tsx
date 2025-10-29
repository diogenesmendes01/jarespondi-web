import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  Send,
  BarChart3,
  Settings,
  Search,
  Filter,
  Plus,
  X,
  Edit,
  Phone,
  Mail,
  AlertTriangle,
  TrendingUp,
  Clock,
  Tag,
  DollarSign,
  Activity,
  Bot,
  FileText,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  Paperclip,
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function CRMNew() {
  const [location] = useLocation();
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"info" | "chat" | "ia" | "activity" | "finance" | "notes">("ia");
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [showDiscussion, setShowDiscussion] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Conversas", path: "/conversas" },
    { icon: Users, label: "CRM", path: "/crm" },
    { icon: Send, label: "Campanhas", path: "/campanhas" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ];

  const contacts = [
    {
      id: 1,
      name: "Carlos Fernandes",
      phone: "+55 11 98765-9999",
      email: "carlos@email.com",
      score: 85,
      status: "Qualificado",
      lastContact: "15 min atrás",
      tags: ["VIP", "Urgente"],
    },
    {
      id: 2,
      name: "Maria Silva",
      phone: "+55 11 98765-8888",
      email: "maria@email.com",
      score: 72,
      status: "Em Negociação",
      lastContact: "2 horas atrás",
      tags: ["Interessado"],
    },
    {
      id: 3,
      name: "João Santos",
      phone: "+55 11 98765-7777",
      email: "joao@email.com",
      score: 45,
      status: "Novo Lead",
      lastContact: "1 dia atrás",
      tags: [],
    },
  ];

  const aiSummary = {
    summary: `Cliente interessado em procedimento de cirurgia plástica (rinoplastia). Mencionou que já pesquisou com 2 clínicas concorrentes. Demonstra urgência (quer fazer em 2 meses). Budget estimado: R$ 8.000-12.000.

Principal objeção: Preço
Motivação: Casamento em março`,
    lastUpdate: "há 15 minutos (auto)",
    suggestedActions: [
      {
        id: 1,
        priority: "urgent",
        title: "URGENTE: Enviar proposta com desconto",
        reason: "Concorrência + urgência",
        actions: ["Marcar como feita", "Enviar agora"],
      },
      {
        id: 2,
        priority: "high",
        title: "Agendar consulta presencial",
        suggestion: "Próxima terça, 14h",
        actions: ["Agendar", "Adiar"],
      },
      {
        id: 3,
        priority: "medium",
        title: "Follow-up em 48h se não responder",
        actions: ["Confirmar", "Editar prazo"],
      },
    ],
    alerts: [
      { type: "danger", message: 'Mencionou concorrente "Clínica X" (2x)' },
      { type: "warning", message: "Sem resposta há 6 horas (risco médio)" },
      { type: "success", message: "Alta probabilidade de conversão (78%)" },
    ],
    intent: {
      primary: { label: "Agendar consulta", confidence: 95 },
      secondary: { label: "Comparar preços", confidence: 70 },
    },
    sentiment: {
      score: 80,
      label: "Positivo",
      trend: "up",
    },
  };

  const notes = [
    {
      id: 1,
      type: "pinned",
      author: "João Silva",
      authorType: "human",
      time: "há 2 dias",
      content: "Cliente VIP - dar prioridade máxima. Amigo do Dr. Roberto.",
    },
    {
      id: 2,
      type: "pinned",
      author: "IA",
      authorType: "ai",
      time: "há 1 hora",
      content:
        "Cliente demonstrou urgência. Proposta deve incluir opção parcelamento facilitado.",
      actionable: true,
    },
    {
      id: 3,
      type: "regular",
      author: "IA",
      authorType: "ai",
      time: "há 15min",
      content: "Lead score atualizado: 78 → 85. Motivo: Resposta rápida + interesse alto",
    },
    {
      id: 4,
      type: "regular",
      author: "Maria (Atendente)",
      authorType: "human",
      time: "há 3h",
      content: "Liguei, não atendeu. Deixei mensagem. Vou tentar novamente amanhã cedo.",
    },
  ];

  const financialData = {
    totalSpent: 8500,
    averageTicket: 2833,
    purchases: 3,
    transactions: [
      {
        date: "15/09/2025",
        amount: 3500,
        status: "paid",
        description: "Rinoplastia - Consulta inicial",
      },
    ],
    currentProposal: {
      value: 12000,
      status: "pending",
      waitingTime: "2h",
      validity: "7 dias",
    },
  };

  const discussions = [
    {
      id: 1,
      author: "João Silva",
      avatar: "JS",
      time: "há 2h",
      content:
        "Pessoal, esse cliente é VIP. Vamos dar atenção especial! @Maria, você consegue ligar pra ele?",
      reactions: [{ emoji: "👍", count: 2 }],
      replies: [
        {
          id: 11,
          author: "Maria",
          avatar: "M",
          time: "há 1h",
          content:
            "Pode deixar! Já liguei, ele vai decidir até amanhã. Deixei proposta no email também.",
          reactions: [{ emoji: "👍", count: 1 }],
        },
      ],
    },
    {
      id: 2,
      author: "IA Bot",
      avatar: "🤖",
      time: "há 30min",
      content:
        "⚠️ Cliente visualizou a proposta mas não respondeu. Sugestão: enviar follow-up em 2h.",
      actionable: true,
    },
  ];

  const quickActions = [
    { icon: MessageCircle, label: "Enviar Mensagem", color: "text-[#2563EB]" },
    { icon: Phone, label: "Ligar", color: "text-[#10B981]", disabled: true },
    { icon: Clock, label: "Agendar Follow-up", color: "text-[#F59E0B]" },
    { icon: FileText, label: "Criar Tarefa", color: "text-[#8B5CF6]" },
    { icon: Tag, label: "Adicionar Tag", color: "text-[#EC4899]" },
    { icon: Activity, label: "Mudar Status", color: "text-[#06B6D4]" },
    { icon: DollarSign, label: "Nova Proposta", color: "text-[#10B981]" },
    { icon: Bot, label: "Atribuir para IA", color: "text-[#F59E0B]" },
    { icon: Users, label: "Transferir p/ Humano", color: "text-[#6B7280]" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col">
        <div className="h-16 border-b border-[#E5E7EB] flex items-center justify-center px-4">
          <div className="text-xl font-bold text-[#2563EB]">JáRespondi</div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <a
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#EFF6FF] text-[#2563EB]"
                      : "text-[#6B7280] hover:bg-[#F3F4F6]"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </a>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-semibold">
              U
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111827] truncate">Usuário</p>
              <p className="text-xs text-[#6B7280] truncate">user@email.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-[#111827]">CRM</h1>
          <Button className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Novo Contato
          </Button>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Contacts List */}
          <div className="w-96 bg-white border-r border-[#E5E7EB] flex flex-col">
            {/* Search & Filter */}
            <div className="p-4 border-b border-[#E5E7EB] space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Buscar contatos..."
                  className="w-full h-10 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB]"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <select className="flex-1 px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-sm">
                  <option>Todos</option>
                  <option>Qualificado</option>
                  <option>Em Negociação</option>
                  <option>Novo Lead</option>
                </select>
              </div>
            </div>

            {/* Contacts */}
            <div className="flex-1 overflow-y-auto">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`p-4 border-b border-[#E5E7EB] cursor-pointer hover:bg-[#F9FAFB] transition-colors ${
                    selectedContact?.id === contact.id ? "bg-[#EFF6FF]" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center font-semibold">
                        {contact.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827]">
                          {contact.name}
                        </h3>
                        <p className="text-xs text-[#6B7280]">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-lg">🔥</span>
                      <span className="text-sm font-bold text-[#EF4444]">
                        {contact.score}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#DBEAFE] text-[#1E40AF]">
                      {contact.status}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {contact.lastContact}
                    </span>
                  </div>
                  {contact.tags.length > 0 && (
                    <div className="flex gap-1 mt-2">
                      {contact.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          {selectedContact ? (
            <div className="flex-1 bg-white flex flex-col">
              {/* Contact Header */}
              <div className="p-6 border-b border-[#E5E7EB]">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] text-white flex items-center justify-center text-2xl font-semibold">
                      {selectedContact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-[#111827]">
                          {selectedContact.name}
                        </h2>
                        <div className="flex items-center gap-1">
                          <span className="text-2xl">🔥</span>
                          <span className="text-lg font-bold text-[#EF4444]">
                            Score: {selectedContact.score}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#6B7280]">{selectedContact.phone}</p>
                      <p className="text-[#6B7280]">{selectedContact.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedContact(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Ligar
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                  <Button size="sm" variant="outline">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    Reportar
                  </Button>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-[#E5E7EB] px-6">
                <div className="flex gap-1">
                  {[
                    { id: "ia", icon: Bot, label: "🤖 IA" },
                    { id: "notes", icon: FileText, label: "📝 Notas" },
                    { id: "finance", icon: DollarSign, label: "💵 $" },
                    { id: "activity", icon: Activity, label: "📊 Ativ" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? "border-[#2563EB] text-[#2563EB]"
                          : "border-transparent text-[#6B7280] hover:text-[#111827]"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* IA Tab */}
                {activeTab === "ia" && (
                  <div className="space-y-6">
                    {/* AI Summary */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-3">
                        🤖 RESUMO AUTOMÁTICO DA IA
                      </h3>
                      <p className="text-sm text-[#374151] whitespace-pre-line mb-3">
                        {aiSummary.summary}
                      </p>
                      <p className="text-xs text-[#6B7280]">
                        📅 Última atualização: {aiSummary.lastUpdate}
                      </p>
                    </Card>

                    {/* Suggested Actions */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        💡 PRÓXIMAS AÇÕES SUGERIDAS
                      </h3>
                      <div className="space-y-4">
                        {aiSummary.suggestedActions.map((action) => (
                          <div
                            key={action.id}
                            className={`p-4 rounded-lg border-l-4 ${
                              action.priority === "urgent"
                                ? "bg-[#FEE2E2] border-[#EF4444]"
                                : action.priority === "high"
                                ? "bg-[#FEF3C7] border-[#F59E0B]"
                                : "bg-[#EFF6FF] border-[#2563EB]"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <p className="font-semibold text-[#111827] mb-1">
                                  {action.priority === "urgent" && "⚡ "}
                                  {action.title}
                                </p>
                                {action.reason && (
                                  <p className="text-sm text-[#6B7280]">
                                    Motivo: {action.reason}
                                  </p>
                                )}
                                {action.suggestion && (
                                  <p className="text-sm text-[#6B7280]">
                                    Sugestão: {action.suggestion}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              {action.actions.map((btn, index) => (
                                <Button key={index} size="sm" variant="outline">
                                  {btn}
                                </Button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Alerts */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        ⚠️ ALERTAS
                      </h3>
                      <div className="space-y-3">
                        {aiSummary.alerts.map((alert, index) => (
                          <div
                            key={index}
                            className={`flex items-start gap-3 p-3 rounded-lg ${
                              alert.type === "danger"
                                ? "bg-[#FEE2E2]"
                                : alert.type === "warning"
                                ? "bg-[#FEF3C7]"
                                : "bg-[#D1FAE5]"
                            }`}
                          >
                            <span className="text-lg">
                              {alert.type === "danger"
                                ? "🔴"
                                : alert.type === "warning"
                                ? "🟡"
                                : "🟢"}
                            </span>
                            <p className="text-sm text-[#111827]">{alert.message}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Intent & Sentiment */}
                    <div className="grid grid-cols-2 gap-6">
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-[#111827] mb-4">
                          🎯 INTENÇÃO DETECTADA
                        </h3>
                        <div className="space-y-2">
                          <p className="text-sm">
                            Primária:{" "}
                            <span className="font-semibold">
                              {aiSummary.intent.primary.label}
                            </span>{" "}
                            ({aiSummary.intent.primary.confidence}%)
                          </p>
                          <p className="text-sm">
                            Secundária:{" "}
                            <span className="font-semibold">
                              {aiSummary.intent.secondary.label}
                            </span>{" "}
                            ({aiSummary.intent.secondary.confidence}%)
                          </p>
                        </div>
                      </Card>

                      <Card className="p-6">
                        <h3 className="text-lg font-semibold text-[#111827] mb-4">
                          😊 SENTIMENTO
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-3 bg-[#E5E7EB] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10B981]"
                                style={{ width: `${aiSummary.sentiment.score}%` }}
                              />
                            </div>
                            <span className="text-sm font-semibold">
                              {aiSummary.sentiment.label} ({aiSummary.sentiment.score}
                              %)
                            </span>
                          </div>
                          <p className="text-sm text-[#6B7280]">
                            Tendência: ↗️ Melhorando
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Notes Tab */}
                {activeTab === "notes" && (
                  <div className="space-y-6">
                    {/* Add Note */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        📝 ADICIONAR NOTA
                      </h3>
                      <textarea
                        placeholder="Escreva sua nota..."
                        rows={4}
                        className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#2563EB] mb-3"
                      />
                      <div className="flex items-center justify-between">
                        <select className="px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm">
                          <option>🔒 Privada</option>
                          <option>👥 Pública</option>
                        </select>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            🤖 IA: Gerar Resumo
                          </Button>
                          <Button size="sm">💾 Salvar</Button>
                        </div>
                      </div>
                    </Card>

                    {/* Pinned Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        📌 NOTAS FIXADAS ({notes.filter((n) => n.type === "pinned").length})
                      </h3>
                      <div className="space-y-3">
                        {notes
                          .filter((n) => n.type === "pinned")
                          .map((note) => (
                            <Card key={note.id} className="p-4 bg-[#FFFBEB]">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-lg">
                                    {note.authorType === "ai" ? "🤖" : "👤"}
                                  </span>
                                  <span className="text-sm font-semibold text-[#111827]">
                                    {note.author}
                                  </span>
                                  <span className="text-xs text-[#6B7280]">
                                    • {note.time}
                                  </span>
                                </div>
                                <span className="text-lg">📌</span>
                              </div>
                              <p className="text-sm text-[#374151] mb-3">
                                {note.content}
                              </p>
                              {note.actionable && (
                                <div className="flex gap-2">
                                  <Button size="sm" variant="outline">
                                    Converter em tarefa
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    OK, entendi
                                  </Button>
                                </div>
                              )}
                            </Card>
                          ))}
                      </div>
                    </div>

                    {/* Regular Notes */}
                    <div>
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        💬 NOTAS REGULARES
                      </h3>
                      <div className="space-y-3">
                        {notes
                          .filter((n) => n.type === "regular")
                          .map((note) => (
                            <Card key={note.id} className="p-4">
                              <div className="flex items-start gap-2 mb-2">
                                <span className="text-lg">
                                  {note.authorType === "ai" ? "🤖" : "👤"}
                                </span>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="text-sm font-semibold text-[#111827]">
                                      {note.author}
                                    </span>
                                    <span className="text-xs text-[#6B7280]">
                                      • {note.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-[#374151]">
                                    {note.content}
                                  </p>
                                </div>
                              </div>
                            </Card>
                          ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Finance Tab */}
                {activeTab === "finance" && (
                  <div className="space-y-6">
                    {/* Financial Summary */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        💰 HISTÓRICO FINANCEIRO
                      </h3>
                      <div className="grid grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-[#6B7280] mb-1">Total gasto</p>
                          <p className="text-2xl font-bold text-[#111827]">
                            R$ {financialData.totalSpent.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280] mb-1">Ticket médio</p>
                          <p className="text-2xl font-bold text-[#111827]">
                            R$ {financialData.averageTicket.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#6B7280] mb-1">Compras</p>
                          <p className="text-2xl font-bold text-[#111827]">
                            {financialData.purchases}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {financialData.transactions.map((transaction, index) => (
                          <div
                            key={index}
                            className="p-4 border border-[#E5E7EB] rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-semibold text-[#111827]">
                                {transaction.date} • R${" "}
                                {transaction.amount.toLocaleString()}
                              </span>
                              <span className="text-sm px-2 py-1 rounded bg-[#D1FAE5] text-[#065F46]">
                                ✅ Pago
                              </span>
                            </div>
                            <p className="text-sm text-[#6B7280] mb-2">
                              {transaction.description}
                            </p>
                            <Button variant="outline" size="sm">
                              Ver nota fiscal
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Current Proposal */}
                    <Card className="p-6 bg-[#FFFBEB]">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">
                        📊 PROPOSTA ATUAL
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6B7280]">Valor:</span>
                          <span className="text-xl font-bold text-[#111827]">
                            R$ {financialData.currentProposal.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6B7280]">Status:</span>
                          <span className="text-sm px-2 py-1 rounded bg-[#FEF3C7] text-[#92400E]">
                            ⏳ Aguardando resposta (há{" "}
                            {financialData.currentProposal.waitingTime})
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[#6B7280]">Validade:</span>
                          <span className="text-sm font-medium text-[#111827]">
                            {financialData.currentProposal.validity}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          Ver proposta
                        </Button>
                        <Button size="sm" variant="outline">
                          Editar
                        </Button>
                        <Button size="sm">Reenviar</Button>
                      </div>
                    </Card>
                  </div>
                )}

                {/* Activity Tab */}
                {activeTab === "activity" && (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-[#111827] mb-4">
                      📊 TIMELINE DE ATIVIDADES
                    </h3>
                    <p className="text-[#6B7280]">Timeline completa (já implementado anteriormente)</p>
                  </Card>
                )}
              </div>

              {/* Action Buttons */}
              <div className="p-4 border-t border-[#E5E7EB] space-y-2">
                <Button
                  onClick={() => setShowQuickActions(!showQuickActions)}
                  className="w-full bg-[#2563EB] hover:bg-[#1D4ED8]"
                >
                  ⚡ Ações Rápidas
                </Button>
                <Button
                  onClick={() => setShowDiscussion(!showDiscussion)}
                  variant="outline"
                  className="w-full"
                >
                  💬 {showDiscussion ? "Fechar" : "Abrir"} Discussão Interna
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-white">
              <div className="text-center">
                <Users className="h-16 w-16 text-[#E5E7EB] mx-auto mb-4" />
                <p className="text-lg text-[#6B7280]">
                  Selecione um contato para ver os detalhes
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions Modal */}
      {showQuickActions && selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowQuickActions(false)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">⚡ AÇÕES RÁPIDAS</h2>
              <button
                onClick={() => setShowQuickActions(false)}
                className="text-[#6B7280] hover:text-[#111827]"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <p className="text-[#6B7280] mb-6">
              O que você quer fazer com este contato?
            </p>

            <div className="grid grid-cols-3 gap-4">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <button
                    key={index}
                    disabled={action.disabled}
                    className={`p-4 border-2 border-[#E5E7EB] rounded-xl hover:border-[#2563EB] hover:bg-[#EFF6FF] transition-all ${
                      action.disabled ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${action.color} mx-auto mb-2`} />
                    <p className="text-sm font-medium text-[#111827] text-center">
                      {action.label}
                    </p>
                    {action.disabled && (
                      <p className="text-xs text-[#6B7280] text-center mt-1">
                        (em breve)
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Internal Discussion Sidebar (could be a separate component) */}
      {selectedContact && showDiscussion && (
        <div className="w-96 bg-white border-l border-[#E5E7EB] flex flex-col">
          <div className="p-4 border-b border-[#E5E7EB]">
            <h3 className="text-lg font-semibold text-[#111827]">
              💬 DISCUSSÃO INTERNA (Time)
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#2563EB] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                    {discussion.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-semibold text-[#111827]">
                        {discussion.author}
                      </span>
                      <span className="text-xs text-[#6B7280]">
                        • {discussion.time}
                      </span>
                    </div>
                    <p className="text-sm text-[#374151] mb-2">
                      {discussion.content}
                    </p>
                    {discussion.actionable && (
                      <div className="flex gap-2 mb-2">
                        <Button size="sm" variant="outline">
                          ✅ Executar sugestão
                        </Button>
                        <Button size="sm" variant="outline">
                          ❌ Ignorar
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      {discussion.reactions?.map((reaction, index) => (
                        <button
                          key={index}
                          className="text-xs px-2 py-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB]"
                        >
                          {reaction.emoji} {reaction.count}
                        </button>
                      ))}
                      <button className="text-xs text-[#2563EB] hover:underline">
                        💬 Responder
                      </button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {discussion.replies?.map((reply) => (
                  <div key={reply.id} className="flex items-start gap-3 ml-11">
                    <div className="w-7 h-7 rounded-full bg-[#10B981] text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                      {reply.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-[#111827]">
                          {reply.author}
                        </span>
                        <span className="text-xs text-[#6B7280]">
                          • {reply.time}
                        </span>
                      </div>
                      <p className="text-sm text-[#374151] mb-2">{reply.content}</p>
                      <div className="flex items-center gap-3">
                        {reply.reactions?.map((reaction, index) => (
                          <button
                            key={index}
                            className="text-xs px-2 py-1 rounded bg-[#F3F4F6] hover:bg-[#E5E7EB]"
                          >
                            {reaction.emoji} {reaction.count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="flex items-end gap-2">
              <textarea
                placeholder="@mencionar [Escrever comentário...]"
                rows={2}
                className="flex-1 px-3 py-2 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#2563EB] resize-none"
              />
              <Button size="sm">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-[#2563EB]">
                Enviar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
