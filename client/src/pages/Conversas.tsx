import { useState } from "react";
import { 
  Search, ChevronDown, MoreVertical, Paperclip, Smile, Mic, Camera,
  Pause, CheckCheck, Calendar, Tag, UserPlus, Archive, Edit, Star,
  Phone, Mail, Building, MapPin, Plus, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ActionButton from "@/components/ActionButton";

type Message = {
  id: string;
  sender: "client" | "ai" | "you";
  content: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  agentName?: string;
};

type Conversation = {
  id: string;
  clientName: string;
  clientInitials: string;
  agent: string;
  lastMessage: string;
  time: string;
  status: "urgent" | "ai" | "you" | "resolved";
  unread?: number;
  phone: string;
  email?: string;
  company?: string;
  location?: string;
  score: number;
  pipeline: string;
  value: string;
  tags: string[];
  notes: Array<{ text: string; author: string; time: string }>;
  tasks: Array<{ text: string; done: boolean; time: string }>;
};

export default function Conversas() {
  const [selectedConv, setSelectedConv] = useState<string>("1");
  const [cardExpanded, setCardExpanded] = useState(false);
  const [iaEnabled, setIaEnabled] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      clientName: "Carlos Silva",
      clientInitials: "CS",
      agent: "🤖 IA Vendas",
      lastMessage: "Busco atividades extras e ensino de qualidade",
      time: "há 2min",
      status: "urgent",
      unread: 2,
      phone: "+55 11 98765-4321",
      email: "carlos@email.com",
      company: "Tech Corp",
      location: "São Paulo, SP",
      score: 85,
      pipeline: "Proposta",
      value: "R$ 5.000",
      tags: ["🔥 Quente", "VIP"],
      notes: [
        { text: "Cliente muito interessado. Orçamento aprovado.", author: "João", time: "há 1h" }
      ],
      tasks: [
        { text: "Enviar proposta", done: false, time: "Hoje 16h" },
        { text: "Follow-up", done: false, time: "Amanhã 10h" }
      ]
    },
    {
      id: "2",
      clientName: "Maria Costa",
      clientInitials: "MC",
      agent: "🤖 IA Vendas",
      lastMessage: "Obrigada pelas informações!",
      time: "há 15min",
      status: "ai",
      phone: "+55 11 98765-1234",
      score: 70,
      pipeline: "Qualificação",
      value: "R$ 3.000",
      tags: ["Novo"],
      notes: [],
      tasks: []
    },
    {
      id: "3",
      clientName: "Lucia Santos",
      clientInitials: "LS",
      agent: "🤖 IA Suporte",
      lastMessage: "Preciso de ajuda com a matrícula",
      time: "há 1h",
      status: "you",
      phone: "+55 11 98765-5678",
      score: 60,
      pipeline: "Suporte",
      value: "R$ 0",
      tags: ["Suporte"],
      notes: [],
      tasks: []
    },
    {
      id: "4",
      clientName: "Roberto Lima",
      clientInitials: "RL",
      agent: "👤 Você",
      lastMessage: "Obrigado pelo atendimento!",
      time: "Ontem",
      status: "resolved",
      phone: "+55 11 98765-9999",
      score: 90,
      pipeline: "Fechado",
      value: "R$ 8.000",
      tags: ["Cliente"],
      notes: [],
      tasks: []
    }
  ];

  const messages: Message[] = [
    {
      id: "1",
      sender: "client",
      content: "Olá! Gostaria de saber sobre os valores do 5º ano",
      time: "14:30"
    },
    {
      id: "2",
      sender: "client",
      content: "Meu filho está na escola X",
      time: "14:31"
    },
    {
      id: "3",
      sender: "ai",
      content: "Olá Carlos! 😊\nQue bom seu interesse!\nAntes de falar valores, me conta: o que você busca numa nova escola?",
      time: "14:32",
      status: "read",
      agentName: "IA Vendas"
    },
    {
      id: "4",
      sender: "client",
      content: "Busco atividades extras e ensino de qualidade",
      time: "14:35"
    }
  ];

  const selectedConversation = conversations.find(c => c.id === selectedConv);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent": return "bg-red-500";
      case "ai": return "bg-green-500";
      case "you": return "bg-yellow-500";
      case "resolved": return "bg-gray-300";
      default: return "bg-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "urgent": return "🔴";
      case "ai": return "🟢";
      case "you": return "🟡";
      case "resolved": return "⚪";
      default: return "⚪";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* HEADER */}
      <div className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="JáRespondi" className="h-10" />
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Phone className="h-4 w-4" />
            <span>📱 Vendas: +55 11 9999-9999</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              placeholder="Buscar..."
              className="pl-10 w-64"
            />
          </div>
          <Avatar>
            <AvatarFallback className="bg-[#FF5A2A] text-white">DM</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex flex-1 overflow-hidden">
        {/* LISTA DE CONVERSAS */}
        <div className="w-[280px] bg-white border-r border-[#E5E7EB] flex flex-col">
          {/* Busca */}
          <div className="p-3 border-b border-[#E5E7EB]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
              <Input
                placeholder="Buscar..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Filtros */}
          <div className="px-3 py-2 border-b border-[#E5E7EB]">
            <Button variant="outline" size="sm" className="w-full justify-between text-xs">
              Filtros
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>

          {/* Lista */}
          <div className="flex-1 overflow-y-auto">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv.id)}
                className={`p-3 border-b border-[#E5E7EB] cursor-pointer transition-colors ${
                  selectedConv === conv.id ? "bg-[#FFF4ED]" : "hover:bg-[#F9FAFB]"
                }`}
              >
                <div className="flex gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-[#FF5A2A] text-white font-semibold">
                      {conv.clientInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-[#111827] truncate">
                        {conv.clientName}
                      </span>
                      <span className={`h-2 w-2 rounded-full ${getStatusColor(conv.status)}`} />
                    </div>
                    <div className="text-xs text-[#6B7280] mb-1">{conv.agent}</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#9CA3AF]">{conv.time}</span>
                      {conv.unread && (
                        <span className="bg-[#FF5A2A] text-white text-xs px-1.5 py-0.5 rounded-full">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-3 text-center">
              <Button variant="link" className="text-xs text-[#6B7280]">
                Ver mais 15...
              </Button>
            </div>
          </div>
        </div>

        {/* CHAT ATIVO */}
        {selectedConversation && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* CARD DO CLIENTE */}
            <Card className={`m-4 ${cardExpanded ? "max-h-[400px] overflow-y-auto" : ""} transition-all flex-shrink-0`}>
              <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-[#FF5A2A] text-white font-semibold">
                        {selectedConversation.clientInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#111827]">{selectedConversation.clientName}</h3>
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          🟢 Online
                        </span>
                      </div>
                      <div className="text-sm text-[#6B7280] flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {selectedConversation.phone}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCardExpanded(!cardExpanded)}
                    >
                      {cardExpanded ? "▲ Menos" : "▼ Mais"}
                    </Button>
                    {cardExpanded && (
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {!cardExpanded ? (
                  <>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span>Score: {selectedConversation.score} 🔥</span>
                      <span>|</span>
                      <span>Pipeline: {selectedConversation.pipeline}</span>
                      <span>|</span>
                      <span>{selectedConversation.value}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        Tag
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Edit className="h-3 w-3 mr-1" />
                        Nota
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        <Star className="h-3 w-3 mr-1" />
                        Favorito
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* Detalhes */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">📊 DETALHES</h4>
                      <div className="border-t border-[#E5E7EB] pt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-[#6B7280]" />
                          <span>Telefone: {selectedConversation.phone}</span>
                        </div>
                        {selectedConversation.email && (
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#6B7280]" />
                            <span>Email: {selectedConversation.email}</span>
                          </div>
                        )}
                        {selectedConversation.company && (
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-[#6B7280]" />
                            <span>Empresa: {selectedConversation.company}</span>
                          </div>
                        )}
                        {selectedConversation.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-[#6B7280]" />
                            <span>{selectedConversation.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CRM */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">🎯 CRM</h4>
                      <div className="border-t border-[#E5E7EB] pt-2 space-y-2 text-sm">
                        <div>
                          <span className="text-[#6B7280]">Score: {selectedConversation.score}/100</span>
                          <div className="w-full bg-[#E5E7EB] h-2 rounded-full mt-1">
                            <div
                              className="bg-[#FF5A2A] h-2 rounded-full"
                              style={{ width: `${selectedConversation.score}%` }}
                            />
                          </div>
                        </div>
                        <div>Temperatura: 🔥 Quente</div>
                        <div>Pipeline: 💰 {selectedConversation.pipeline} ({selectedConversation.value})</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">🏷️ Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedConversation.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-[#FFF4ED] text-[#FF5A2A] text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        <Button variant="outline" size="sm" className="text-xs">
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {/* Notas */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">📝 Notas</h4>
                      {selectedConversation.notes.length > 0 ? (
                        <div className="space-y-2">
                          {selectedConversation.notes.map((note, i) => (
                            <div key={i} className="text-sm bg-[#F9FAFB] p-2 rounded">
                              "{note.text}" - {note.author} ({note.time})
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#6B7280]">Nenhuma nota</p>
                      )}
                      <Button variant="outline" size="sm" className="text-xs mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Adicionar nota
                      </Button>
                    </div>

                    {/* Tarefas */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2">📅 Próximos Passos</h4>
                      {selectedConversation.tasks.length > 0 ? (
                        <div className="space-y-2">
                          {selectedConversation.tasks.map((task, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <input type="checkbox" checked={task.done} readOnly />
                              <span>{task.text} - {task.time}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#6B7280]">Nenhuma tarefa</p>
                      )}
                      <Button variant="outline" size="sm" className="text-xs mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Nova tarefa
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* ÁREA DE MENSAGENS */}
            <div className="flex-1 overflow-y-auto px-4 space-y-4 min-h-0">
              {/* Divisor de data */}
              <div className="flex items-center justify-center">
                <div className="border-t border-[#E5E7EB] flex-1" />
                <span className="px-4 text-xs text-[#6B7280]">Hoje, 14:30</span>
                <div className="border-t border-[#E5E7EB] flex-1" />
              </div>

              {/* Mensagens */}
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "client" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[70%] ${msg.sender === "client" ? "" : "text-right"}`}>
                    <div className="text-xs text-[#6B7280] mb-1">{msg.time}</div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        msg.sender === "client"
                          ? "bg-[#F3F4F6] text-[#111827]"
                          : "bg-[#FF8C42] text-white"
                      }`}
                    >
                      {msg.content.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                    {msg.sender !== "client" && (
                      <div className="text-xs text-[#6B7280] mt-1">
                        {msg.agentName && `🤖 ${msg.agentName} • `}
                        {msg.time}{" "}
                        {msg.status === "read" && <span className="text-blue-500">✓✓</span>}
                        {msg.status === "delivered" && <span>✓✓</span>}
                        {msg.status === "sent" && <span>✓</span>}
                      </div>
                    )}
                    {msg.sender === "client" && (
                      <div className="text-xs text-[#6B7280] mt-1">{selectedConversation.clientName}</div>
                    )}
                  </div>
                </div>
              ))}

              {/* Aviso IA pausada */}
              <div className="flex justify-center">
                <Card className="p-4 bg-[#FFF4ED] border-[#FF5A2A] max-w-md">
                  <div className="text-center">
                    <div className="font-semibold text-[#FF5A2A] mb-2">⏸️ IA pausada</div>
                    <p className="text-sm text-[#6B7280] mb-3">Carlos aguarda sua resposta</p>
                    <Button className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
                      Assumir conversa
                    </Button>
                  </div>
                </Card>
              </div>
            </div>

            {/* INPUT DE MENSAGEM */}
            <div className="p-4 bg-white border-t border-[#E5E7EB] flex-shrink-0">
              <div className="mb-2">
                <Textarea
                  placeholder="Digite sua mensagem..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="min-h-[60px] resize-none"
                />
                <div className="text-xs text-[#6B7280] mt-1">
                  @ para mencionar • / para comandos
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIaEnabled(!iaEnabled)}
                    className={iaEnabled ? "border-green-500 text-green-600" : ""}
                  >
                    🤖 IA: {iaEnabled ? "ON" : "OFF"}
                  </Button>
                  <Button className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
                    Enviar
                  </Button>
                </div>
              </div>
            </div>

            {/* AÇÕES RÁPIDAS */}
            <div className="p-4 bg-white border-t border-[#E5E7EB] flex-shrink-0">
              <div className="text-sm font-semibold text-[#111827] mb-3">🔧 AÇÕES RÁPIDAS</div>
              <div className="flex flex-wrap gap-2">
                <ActionButton icon={Pause}>Pausar IA</ActionButton>
                <ActionButton icon={CheckCheck}>Resolver</ActionButton>
                <ActionButton icon={Calendar}>Agendar</ActionButton>
                <ActionButton icon={Tag}>Tag</ActionButton>
                <ActionButton icon={UserPlus}>Atribuir</ActionButton>
                <ActionButton icon={Archive}>Arquivar</ActionButton>
                <ActionButton icon={MoreVertical}>Mais</ActionButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
