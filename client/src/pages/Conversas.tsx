import { useState, useMemo, useEffect } from "react";
import {
  Search, ChevronDown, MoreVertical, Paperclip, Smile, Mic, Camera,
  Pause, CheckCheck, Calendar, Tag, UserPlus, Archive, Edit, Star,
  Phone, Mail, Building, MapPin, Plus, Check, AlertCircle, Bot, User, CheckCircle, Smartphone,
  Flame, Target, FileText, ClipboardList, Settings, Loader2, X, Image, Video, File, Copy, Trash2,
  Reply, Pin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import ActionButton from "@/components/ActionButton";
import { useConversations } from "@/hooks/useConversations";
import type { Conversation as APIConversation } from "@/types/whatsapp";

type Message = {
  id: string;
  sender: "client" | "ai" | "you";
  content: string;
  time: string;
  status?: "sent" | "delivered" | "read";
  agentName?: string;
  edited?: boolean;
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

// ==================== COMPONENTE DE MENSAGEM ====================
type WhatsAppMessageProps = {
  message: Message;
  clientName?: string;
  isEditing: boolean;
  editingText: string;
  reactions: string[];
  onStartEdit: (id: string, content: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
  onCopyMessage: (content: string) => void;
  onDeleteMessage: (id: string) => void;
  onAddReaction: (id: string, emoji: string) => void;
};

function WhatsAppMessage({
  message: msg,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [reactionPickerOpen, setReactionPickerOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.message-menu') && !target.closest('.reaction-picker')) {
        setMenuOpen(false);
        setReactionPickerOpen(false);
      }
    };

    if (menuOpen || reactionPickerOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [menuOpen, reactionPickerOpen]);

  const handleDeleteForMe = () => {
    console.log("🗑️ Apagar somente para mim:", msg.id);
    onDeleteMessage(msg.id);
    setShowDeleteModal(false);
    setMenuOpen(false);
  };

  const handleDeleteForEveryone = () => {
    console.log("🗑️ Apagar para todos:", msg.id);
    // Backend: enviar flag deleteForEveryone: true
    onDeleteMessage(msg.id);
    setShowDeleteModal(false);
    setMenuOpen(false);
  };

  // Estilos da mensagem baseado no remetente
  const messageStyles = {
    client: {
      align: "justify-start",
      textAlign: "",
      bgColor: "bg-white",
      textColor: "text-[#111827]",
      shadow: "shadow-sm",
      borderColor: "border-[#E5E7EB]",
      nameColor: "text-[#111827]",
      menuPosition: "left-0",
    },
    ai: {
      align: "justify-end",
      textAlign: "text-right",
      bgColor: "bg-[#D9FDD3]",
      textColor: "text-[#111827]",
      shadow: "shadow-sm",
      borderColor: "border-[#D9FDD3]",
      nameColor: "text-[#FF5A2A]",
      menuPosition: "right-0",
    },
    you: {
      align: "justify-end",
      textAlign: "text-right",
      bgColor: "bg-[#D9FDD3]",
      textColor: "text-[#111827]",
      shadow: "shadow-sm",
      borderColor: "border-[#D9FDD3]",
      nameColor: "text-[#FF5A2A]",
      menuPosition: "right-0",
    },
  };

  const style = messageStyles[msg.sender];

  return (
    <div className={`flex ${style.align} group mb-3`}>
      <div className={`max-w-[70%] ${style.textAlign} relative`}>
        {/* CABEÇALHO - Nome + Horário */}
        {msg.sender === "client" ? (
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-sm font-bold ${style.nameColor}`}>
              {clientName}
            </span>
            <span className="text-xs text-[#6B7280]">{msg.time}</span>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-2 mb-1">
            <span className="text-xs text-[#6B7280]">{msg.time}</span>
            {msg.agentName && (
              <div className="flex items-center gap-1">
                {msg.sender === "ai" && <Bot size={14} strokeWidth={2} className={style.nameColor} />}
                {msg.sender === "you" && <User size={14} strokeWidth={2} className={style.nameColor} />}
                <span className={`text-sm font-bold ${style.nameColor}`}>
                  {msg.agentName}
                </span>
              </div>
            )}
          </div>
        )}

        {/* CONTAINER DA MENSAGEM */}
        <div className="relative inline-block">
          {isEditing ? (
            // MODO EDIÇÃO
            <div className="bg-white border-2 border-[#FF5A2A] rounded-lg px-4 py-2 shadow-lg min-w-[300px]">
              <Textarea
                value={editingText}
                onChange={(e) => onEditTextChange(e.target.value)}
                className="min-h-[60px] resize-none border-none p-0 focus-visible:ring-0"
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
                <Button size="sm" variant="ghost" onClick={onCancelEdit}>
                  Cancelar
                </Button>
                <Button size="sm" className="bg-[#FF5A2A]" onClick={onSaveEdit}>
                  Salvar
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* BOLHA DA MENSAGEM - Objeto Visual */}
              <div
                className={`
                  ${style.bgColor}
                  ${style.textColor}
                  ${style.shadow}
                  rounded-lg
                  px-3 py-2
                  relative
                  border ${style.borderColor}
                  min-w-[60px]
                `}
              >
                {/* Conteúdo da mensagem */}
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

                {/* STATUS dentro da bolha - canto inferior direito */}
                {msg.sender !== "client" && msg.status && (
                  <div className="flex items-center justify-end gap-1 mt-0.5">
                    <span className="text-xs text-[#667781]">
                      {msg.status === "read" && (
                        <CheckCheck size={14} strokeWidth={2} className="inline text-blue-500" />
                      )}
                      {msg.status === "delivered" && (
                        <CheckCheck size={14} strokeWidth={2} className="inline text-[#667781]" />
                      )}
                      {msg.status === "sent" && (
                        <Check size={14} strokeWidth={2} className="inline text-[#667781]" />
                      )}
                    </span>
                  </div>
                )}

                {/* Reações exibidas próximas ao botão de emoji */}
                {reactions.length > 0 && (
                  <div className={`absolute top-1/2 -translate-y-1/2 ${msg.sender === "client" ? "-right-16" : "-left-16"} flex flex-col gap-1 z-10`}>
                    {reactions.map((emoji, idx) => (
                      <span
                        key={idx}
                        className="bg-white border border-[#CED0D1] rounded-full px-1.5 py-0.5 text-sm shadow-md cursor-pointer hover:bg-[#F0F2F5] hover:scale-110 transition-transform"
                        onClick={() => onAddReaction(msg.id, emoji)}
                      >
                        {emoji}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* BOTÕES DE AÇÃO - Posicionados corretamente */}

              {/* Botão de emoji - CENTRALIZADO verticalmente ao lado da bolha */}
              <button
                className={`absolute top-1/2 -translate-y-1/2 ${msg.sender === "client" ? "-right-10" : "-left-10"} bg-[#F0F2F5] rounded-full p-1.5 hover:bg-[#E4E6EB] transition-colors opacity-0 group-hover:opacity-100 reaction-picker`}
                onClick={(e) => {
                  e.stopPropagation();
                  setReactionPickerOpen(!reactionPickerOpen);
                  setMenuOpen(false);
                }}
                title="Reagir"
              >
                <Smile size={16} strokeWidth={2} className="text-[#54656F]" />
              </button>

              {/* Botão chevron - NO CANTO SUPERIOR da bolha */}
              <button
                className={`absolute top-0 ${msg.sender === "client" ? "right-0" : "left-0"} bg-[#F0F2F5] rounded-full p-1.5 hover:bg-[#E4E6EB] transition-colors opacity-0 group-hover:opacity-100 message-menu`}
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(!menuOpen);
                  setReactionPickerOpen(false);
                }}
                title="Mais opções"
              >
                <ChevronDown size={14} strokeWidth={2} className="text-[#54656F]" />
              </button>

              {/* SELETOR DE REAÇÕES - Aparece horizontalmente ao lado do botão de emoji */}
              {reactionPickerOpen && (
                <div
                  className={`reaction-picker absolute top-1/2 -translate-y-1/2 ${msg.sender === "client" ? "-right-[310px]" : "-left-[310px]"} bg-white rounded-full shadow-2xl border border-[#E5E7EB] px-3 py-2 z-50`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    {['👍', '❤️', '😂', '😮', '😢', '🙏', '🎉'].map((emoji) => (
                      <button
                        key={emoji}
                        className="text-2xl hover:scale-125 transition-transform"
                        onClick={() => {
                          onAddReaction(msg.id, emoji);
                          setReactionPickerOpen(false);
                        }}
                      >
                        {emoji}
                      </button>
                    ))}
                    <button
                      className="text-xl text-[#54656F] hover:scale-125 transition-transform"
                      onClick={() => {
                        console.log("🎨 Abrir seletor completo de emojis");
                        setReactionPickerOpen(false);
                      }}
                    >
                      ➕
                    </button>
                  </div>
                </div>
              )}

              {/* MENU DE AÇÕES - Aparece abaixo do botão chevron, sempre em direção ao centro */}
              {menuOpen && (
                <div
                  className={`message-menu absolute ${msg.sender === "client" ? "right-0" : "left-0"} top-8 bg-white rounded-lg shadow-xl border border-[#E5E7EB] py-1 w-48 z-50`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] flex items-center gap-3 text-[#111827]"
                    onClick={() => {
                      console.log("📨 Responder mensagem:", msg.id);
                      setMenuOpen(false);
                    }}
                  >
                    <Reply size={16} strokeWidth={2} />
                    Responder
                  </button>

                  {msg.sender !== "client" && (
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] flex items-center gap-3 text-[#111827]"
                      onClick={() => {
                        onStartEdit(msg.id, msg.content);
                        setMenuOpen(false);
                      }}
                    >
                      <Edit size={16} strokeWidth={2} />
                      Editar
                    </button>
                  )}

                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] flex items-center gap-3 text-[#111827]"
                    onClick={() => {
                      onCopyMessage(msg.content);
                      setMenuOpen(false);
                    }}
                  >
                    <Copy size={16} strokeWidth={2} />
                    Copiar
                  </button>

                  <button
                    className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] flex items-center gap-3 text-[#111827]"
                    onClick={() => {
                      console.log("📌 Fixar mensagem:", msg.id);
                      setMenuOpen(false);
                    }}
                  >
                    <Pin size={16} strokeWidth={2} />
                    Fixar
                  </button>

                  {msg.sender !== "client" && (
                    <button
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[#F9FAFB] flex items-center gap-3 text-red-600"
                      onClick={() => {
                        setShowDeleteModal(true);
                        setMenuOpen(false);
                      }}
                    >
                      <Trash2 size={16} strokeWidth={2} />
                      Deletar
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* MODAL DE CONFIRMAÇÃO DE DELETE */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]" onClick={() => setShowDeleteModal(false)}>
            <Card className="w-[400px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold mb-4 text-[#111827]">
                Apagar mensagem?
              </h3>
              <p className="text-sm text-[#6B7280] mb-6">
                Escolha uma opção:
              </p>

              <div className="flex flex-col gap-3">
                <Button
                  className="w-full justify-start bg-white hover:bg-[#F9FAFB] text-[#111827] border border-[#E5E7EB]"
                  onClick={handleDeleteForMe}
                >
                  <Trash2 size={16} strokeWidth={2} className="mr-2" />
                  Apagar somente para mim
                </Button>

                <Button
                  className="w-full justify-start bg-white hover:bg-[#F9FAFB] text-red-600 border border-[#E5E7EB]"
                  onClick={handleDeleteForEveryone}
                >
                  <Trash2 size={16} strokeWidth={2} className="mr-2" />
                  Apagar para todos
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancelar
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
// ==================== FIM DO COMPONENTE DE MENSAGEM ====================

export default function Conversas() {
  const [selectedConv, setSelectedConv] = useState<string>("mock-1");
  const [cardExpanded, setCardExpanded] = useState(false);
  const [iaEnabled, setIaEnabled] = useState(true);
  const [messageInput, setMessageInput] = useState("");
  const [customMessages, setCustomMessages] = useState<Record<string, Message[]>>({});

  // Estados para modais/ações
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newTag, setNewTag] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [scheduleType, setScheduleType] = useState<"message" | "task" | "followup" | "reminder" | null>(null);

  // Estados para formulários de agendamento
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduleDetails, setScheduleDetails] = useState("");
  const [showScheduleFormModal, setShowScheduleFormModal] = useState(false);

  // Estados para funcionalidades de mídia
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  // Estados para edição e reações de mensagens
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editingMessageText, setEditingMessageText] = useState("");
  const [messageReactions, setMessageReactions] = useState<Record<string, string[]>>({});

  // Hook da API
  const { conversations: apiConversations, loading, error, loadMore } = useConversations({
    status: 'active',
    limit: 20,
  });

  // Fechar menus ao clicar fora (apenas menus do input)
  useEffect(() => {
    const handleClickOutside = () => {
      setShowAttachMenu(false);
      setShowEmojiPicker(false);
    };

    if (showAttachMenu || showEmojiPicker) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showAttachMenu, showEmojiPicker]);

  // Conversas MOCADAS para testar sem backend
  const mockedConversations: Conversation[] = [
    {
      id: "mock-1",
      clientName: "Carlos Silva",
      clientInitials: "CS",
      agent: "IA Vendas",
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
      tags: ["Quente", "VIP"],
      notes: [
        { text: "Cliente muito interessado. Orçamento aprovado.", author: "João", time: "há 1h" }
      ],
      tasks: [
        { text: "Enviar proposta", done: false, time: "Hoje 16h" },
        { text: "Follow-up", done: false, time: "Amanhã 10h" }
      ]
    },
    {
      id: "mock-2",
      clientName: "Maria Costa",
      clientInitials: "MC",
      agent: "IA Vendas",
      lastMessage: "Obrigada pelas informações!",
      time: "há 15min",
      status: "ai",
      unread: 1,
      phone: "+55 11 98765-1234",
      email: "maria@empresa.com",
      company: "Costa Empreendimentos",
      location: "Rio de Janeiro, RJ",
      score: 70,
      pipeline: "Qualificação",
      value: "R$ 3.000",
      tags: ["Novo", "Interessado"],
      notes: [],
      tasks: [
        { text: "Agendar visita", done: false, time: "Amanhã 14h" }
      ]
    },
    {
      id: "mock-3",
      clientName: "João Pedro Santos",
      clientInitials: "JP",
      agent: "IA Suporte",
      lastMessage: "Preciso de ajuda com a matrícula",
      time: "há 1h",
      status: "you",
      phone: "+55 11 98765-5678",
      email: "joao@email.com",
      location: "Campinas, SP",
      score: 60,
      pipeline: "Suporte",
      value: "R$ 0",
      tags: ["Suporte", "Urgente"],
      notes: [
        { text: "Cliente com dificuldade no processo de matrícula", author: "Suporte", time: "há 1h" }
      ],
      tasks: [
        { text: "Resolver pendência matrícula", done: false, time: "Hoje 17h" }
      ]
    },
    {
      id: "mock-4",
      clientName: "Ana Paula Lima",
      clientInitials: "AP",
      agent: "IA Vendas",
      lastMessage: "Quando posso visitar a escola?",
      time: "há 3h",
      status: "ai",
      phone: "+55 11 98765-9012",
      email: "ana@email.com",
      company: "Lima Consultoria",
      location: "São Paulo, SP",
      score: 75,
      pipeline: "Negociação",
      value: "R$ 4.200",
      tags: ["Visita Agendada"],
      notes: [],
      tasks: []
    },
    {
      id: "mock-5",
      clientName: "Roberto Alves",
      clientInitials: "RA",
      agent: "Você",
      lastMessage: "Perfeito! Obrigado pelo atendimento!",
      time: "Ontem",
      status: "resolved",
      phone: "+55 11 98765-9999",
      email: "roberto@email.com",
      company: "Alves & Filhos",
      location: "São Paulo, SP",
      score: 90,
      pipeline: "Fechado",
      value: "R$ 8.000",
      tags: ["Cliente", "Satisfeito"],
      notes: [
        { text: "Cliente fechou matrícula para 2 filhos", author: "Maria", time: "Ontem" }
      ],
      tasks: [
        { text: "Enviar documentação", done: true, time: "Ontem" }
      ]
    },
    {
      id: "mock-6",
      clientName: "Fernanda Oliveira",
      clientInitials: "FO",
      agent: "IA Vendas",
      lastMessage: "Gostei muito das opções",
      time: "há 5h",
      status: "ai",
      phone: "+55 11 98765-3456",
      email: "fernanda@email.com",
      location: "São Paulo, SP",
      score: 65,
      pipeline: "Qualificação",
      value: "R$ 2.500",
      tags: ["Interessado"],
      notes: [],
      tasks: []
    },
    {
      id: "mock-7",
      clientName: "Lucas Mendes",
      clientInitials: "LM",
      agent: "IA Suporte",
      lastMessage: "Ainda não recebi o boleto",
      time: "há 2h",
      status: "urgent",
      unread: 3,
      phone: "+55 11 98765-7890",
      email: "lucas@email.com",
      location: "São Paulo, SP",
      score: 55,
      pipeline: "Suporte",
      value: "R$ 0",
      tags: ["Suporte", "Financeiro"],
      notes: [],
      tasks: [
        { text: "Reenviar boleto", done: false, time: "Hoje" }
      ]
    }
  ];

  // Mapear conversas da API para formato do componente
  const mapApiToComponent = (apiConv: APIConversation): Conversation => {
    // Determinar status baseado na prioridade e IA
    let status: Conversation["status"] = "you";
    if (apiConv.metrics.priority === "URGENT" || apiConv.metrics.priority === "HIGH") {
      status = "urgent";
    } else if (apiConv.ai.autoReplyEnabled) {
      status = "ai";
    } else if (apiConv.contact.crm.status === "WON") {
      status = "resolved";
    }

    // Formatar valor monetário
    const formatCurrency = (value?: number) => {
      if (!value) return "R$ 0";
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value);
    };

    // Calcular tempo relativo
    const getRelativeTime = (timestamp: string) => {
      const now = new Date();
      const date = new Date(timestamp);
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return "agora";
      if (diffMins < 60) return `há ${diffMins}min`;
      if (diffHours < 24) return `há ${diffHours}h`;
      if (diffDays === 1) return "Ontem";
      return `há ${diffDays} dias`;
    };

    return {
      id: apiConv.id,
      clientName: apiConv.contact.displayName,
      clientInitials: apiConv.contact.avatar.fallback,
      agent: apiConv.ai.autoReplyEnabled ? "IA Ativa" : "Manual",
      lastMessage: apiConv.lastMessage.preview || apiConv.lastMessage.content || "",
      time: getRelativeTime(apiConv.lastMessageAt),
      status,
      unread: apiConv.unreadCount > 0 ? apiConv.unreadCount : undefined,
      phone: apiConv.contact.phoneNumber,
      email: apiConv.contact.crm.email,
      company: apiConv.contact.crm.company,
      location: undefined, // API não tem esse campo
      score: 0, // Poderia calcular baseado em metrics
      pipeline: apiConv.contact.crm.pipeline?.stage || "Novo",
      value: formatCurrency(apiConv.contact.crm.pipeline?.dealValue),
      tags: apiConv.contact.crm.tags || [],
      notes: [], // API não retorna notes na lista
      tasks: [] // API não retorna tasks na lista
    };
  };

  // Combinar: conversas mocadas + conversas reais da API
  const conversations: Conversation[] = useMemo(() => {
    const mapped = apiConversations.map(mapApiToComponent);

    // Se não há conversas da API (backend offline), usa todas as mocadas
    if (mapped.length === 0) {
      return mockedConversations;
    }

    // Se tem conversas da API, mostra apenas a primeira mocada + reais
    return [mockedConversations[0], ...mapped];
  }, [apiConversations]);

  // Mensagens mocadas para demonstração (Carlos Silva)
  const getMockedMessages = (conversationId: string): Message[] => {
    if (conversationId === "mock-1") {
      return [
        {
          id: "msg-1",
          sender: "client",
          content: "Olá! Gostaria de saber sobre os valores do 5º ano",
          time: "14:25"
        },
        {
          id: "msg-2",
          sender: "client",
          content: "Meu filho está na escola X atualmente",
          time: "14:26"
        },
        {
          id: "msg-3",
          sender: "ai",
          content: "Olá Carlos! 👋\n\nQue bom ter você aqui!\n\nAntes de falar sobre valores, gostaria de entender melhor suas necessidades. O que você busca numa nova escola para seu filho?",
          time: "14:27",
          status: "read",
          agentName: "IA Vendas"
        },
        {
          id: "msg-4",
          sender: "client",
          content: "Busco atividades extras e ensino de qualidade",
          time: "14:30"
        },
        {
          id: "msg-5",
          sender: "ai",
          content: "Perfeito! Nossa escola oferece:\n\n✅ Atividades extras: robótica, música, esportes\n✅ Ensino bilíngue\n✅ Metodologia inovadora\n✅ Acompanhamento individualizado\n\nO investimento para o 5º ano é de R$ 2.800/mês.\n\nGostaria de agendar uma visita?",
          time: "14:31",
          status: "read",
          agentName: "IA Vendas"
        },
        {
          id: "msg-6",
          sender: "client",
          content: "Interessante! Tem desconto para irmãos? Tenho 2 filhos",
          time: "14:33"
        },
        {
          id: "msg-7",
          sender: "ai",
          content: "Que ótimo! Sim, temos desconto especial:\n\n🎯 2º filho: 15% de desconto\n🎯 3º filho: 20% de desconto\n\nNeste caso, o investimento total seria:\n• 1º filho: R$ 2.800\n• 2º filho: R$ 2.380 (com desconto)\n\n💰 Total: R$ 5.180/mês\n\nPosso agendar uma visita para você conhecer melhor?",
          time: "14:35",
          status: "delivered",
          agentName: "IA Vendas"
        }
      ];
    }

    if (conversationId === "mock-2") {
      return [
        {
          id: "msg-m2-1",
          sender: "client",
          content: "Boa tarde! Vi o anúncio de vocês",
          time: "15:10"
        },
        {
          id: "msg-m2-2",
          sender: "ai",
          content: "Olá Maria! Boa tarde! 😊\n\nQue bom que chegou até nós! Como posso ajudar?",
          time: "15:11",
          status: "read",
          agentName: "IA Vendas"
        },
        {
          id: "msg-m2-3",
          sender: "client",
          content: "Quero saber sobre matrícula para o 3º ano",
          time: "15:12"
        },
        {
          id: "msg-m2-4",
          sender: "ai",
          content: "Maravilha! O 3º ano tem vagas disponíveis.\n\nNossa metodologia foca em:\n📚 Alfabetização completa\n🎨 Desenvolvimento criativo\n🤝 Socialização\n\nO investimento é R$ 2.400/mês.\n\nGostaria de mais informações sobre algum ponto específico?",
          time: "15:13",
          status: "read",
          agentName: "IA Vendas"
        },
        {
          id: "msg-m2-5",
          sender: "client",
          content: "Obrigada pelas informações!",
          time: "15:15"
        }
      ];
    }

    if (conversationId === "mock-3") {
      return [
        {
          id: "msg-m3-1",
          sender: "client",
          content: "Preciso de ajuda com a matrícula",
          time: "13:30"
        },
        {
          id: "msg-m3-2",
          sender: "ai",
          content: "Olá João! Claro, estou aqui para ajudar.\n\nQual é a dificuldade que está encontrando?",
          time: "13:31",
          status: "read",
          agentName: "IA Suporte"
        },
        {
          id: "msg-m3-3",
          sender: "client",
          content: "Não consigo fazer upload dos documentos no portal",
          time: "13:32"
        },
        {
          id: "msg-m3-4",
          sender: "you",
          content: "Olá João! Vi seu chamado.\n\nVocê está tentando pelo celular ou computador?",
          time: "13:35",
          status: "delivered",
          agentName: "Suporte"
        }
      ];
    }

    // Mensagens genéricas para outras conversas
    return [
      {
        id: "msg-default-1",
        sender: "client",
        content: "Olá!",
        time: "10:00"
      },
      {
        id: "msg-default-2",
        sender: "ai",
        content: "Olá! Como posso ajudar?",
        time: "10:01",
        status: "read",
        agentName: "IA"
      }
    ];
  };

  // Combina mensagens mocadas com mensagens customizadas (enviadas pelo usuário)
  const messages: Message[] = [
    ...getMockedMessages(selectedConv),
    ...(customMessages[selectedConv] || [])
  ];

  // Função para enviar mensagem (modo demo)
  const handleSendMessage = () => {
    // Não permite enviar se IA está ativa
    if (iaEnabled || !messageInput.trim()) return;

    const newMessage: Message = {
      id: `custom-${Date.now()}`,
      sender: "you",
      content: messageInput,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: "sent",
      agentName: "Você"
    };

    setCustomMessages(prev => ({
      ...prev,
      [selectedConv]: [...(prev[selectedConv] || []), newMessage]
    }));

    setMessageInput("");

    // Nota: Quando IA está OFF, usuário se comunica diretamente com o cliente
    // Não há resposta automática da IA neste caso
  };

  // ============================================
  // FUNÇÕES DAS AÇÕES
  // ============================================

  const handleResolve = () => {
    setShowResolveModal(true);
  };

  const confirmResolve = () => {
    setShowResolveModal(false);
    // Com backend: chamar API para resolver conversa
    console.log("✅ Conversa resolvida:", selectedConv);
  };

  const handleArchive = () => {
    setShowArchiveModal(true);
  };

  const confirmArchive = () => {
    setShowArchiveModal(false);
    // Com backend: chamar API para arquivar
    console.log("📦 Conversa arquivada:", selectedConv);
  };

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    // Com backend: chamar API para favoritar/desfavoritar
    console.log(
      newFavoriteState ? "⭐ Adicionado aos favoritos!" : "⭐ Removido dos favoritos",
      "Conversa:", selectedConv
    );
  };

  const handleAddNote = () => {
    if (!newNote.trim()) {
      return;
    }

    // Com backend: chamar API para adicionar nota
    console.log("📝 Nota adicionada:", newNote);
    setNewNote("");
    setShowNoteModal(false);
  };

  const handleAddTag = () => {
    if (!newTag.trim()) {
      return;
    }

    // Com backend: chamar API para adicionar tag
    console.log("🏷️ Tag adicionada:", newTag);
    setNewTag("");
    setShowTagModal(false);
  };

  const handleSchedule = () => {
    setShowScheduleModal(true);
  };

  const handleScheduleAction = (type: "message" | "task" | "followup" | "reminder") => {
    setScheduleType(type);
    setShowScheduleModal(false);
    setShowScheduleFormModal(true);
    // Limpar campos
    setScheduleDate("");
    setScheduleTime("");
    setScheduleDetails("");
  };

  const handleConfirmSchedule = () => {
    if (!scheduleDate || !scheduleTime) {
      console.log("⚠️ Data e hora são obrigatórios");
      return;
    }

    // Com backend: criar agendamento
    console.log("📅 Agendamento criado:", {
      type: scheduleType,
      date: scheduleDate,
      time: scheduleTime,
      details: scheduleDetails,
      conversationId: selectedConv
    });

    // Limpar e fechar
    setShowScheduleFormModal(false);
    setScheduleType(null);
    setScheduleDate("");
    setScheduleTime("");
    setScheduleDetails("");
  };

  const handleAssign = () => {
    setShowAssignModal(true);
  };

  const handleAssignTo = (agentId: string, agentName: string) => {
    setShowAssignModal(false);
    // Com backend: chamar API para atribuir
    console.log("👥 Atribuir para:", agentId, agentName);
  };

  const handleEditClient = () => {
    // Com backend: abrir modal de edição
    console.log("✏️ Editar cliente:", selectedConv);
  };

  const handleMore = () => {
    setShowMoreModal(true);
  };

  const handleMoreAction = (action: string) => {
    setShowMoreModal(false);
    // Com backend: executar ação específica
    console.log("⚙️ Ação:", action);
  };

  // ============================================
  // FUNÇÕES DE MÍDIA
  // ============================================

  // Anexar arquivo
  const handleAttachFile = () => {
    setShowAttachMenu(!showAttachMenu);
  };

  const handleFileSelect = (type: 'document' | 'image' | 'video') => {
    const input = document.createElement('input');
    input.type = 'file';

    if (type === 'document') {
      input.accept = '.pdf,.doc,.docx,.txt,.xls,.xlsx,.zip';
    } else if (type === 'image') {
      input.accept = 'image/*';
    } else if (type === 'video') {
      input.accept = 'video/*';
    }

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("📎 Arquivo selecionado:", file.name, file.size, "bytes");
        // Com backend: upload do arquivo
        // Criar preview se for imagem
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            console.log("🖼️ Preview da imagem gerado");
          };
          reader.readAsDataURL(file);
        }
      }
      setShowAttachMenu(false);
    };

    input.click();
  };

  // Emoji picker
  const handleEmojiSelect = (emoji: string) => {
    setMessageInput(prev => prev + emoji);
  };

  // Gravar áudio
  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        console.log("🎤 Áudio gravado:", audioBlob.size, "bytes");
        // Com backend: upload do áudio
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecordingAudio(true);
      setRecordingTime(0);

      // Timer de gravação
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

      (recorder as any).interval = interval;

    } catch (error) {
      console.error("❌ Erro ao acessar microfone:", error);
      console.log("⚠️ Permissão de microfone negada ou não disponível");
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder && isRecordingAudio) {
      mediaRecorder.stop();
      clearInterval((mediaRecorder as any).interval);
      setIsRecordingAudio(false);
      setMediaRecorder(null);
      setRecordingTime(0);
    }
  };

  const handleCancelRecording = () => {
    if (mediaRecorder && isRecordingAudio) {
      mediaRecorder.stop();
      clearInterval((mediaRecorder as any).interval);
      setIsRecordingAudio(false);
      setMediaRecorder(null);
      setRecordingTime(0);
      console.log("🎤 Gravação cancelada");
    }
  };

  // Tirar/selecionar foto
  const handleCamera = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.setAttribute('capture', 'environment'); // Usa câmera traseira no mobile

    input.onchange = (e: Event) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("📷 Foto capturada:", file.name, file.size, "bytes");
        // Com backend: upload da foto
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log("🖼️ Preview da foto gerado");
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  };

  // ============================================
  // FUNÇÕES DE EDIÇÃO E REAÇÃO DE MENSAGENS
  // ============================================

  // Iniciar edição
  const handleStartEditMessage = (messageId: string, currentText: string) => {
    setEditingMessageId(messageId);
    setEditingMessageText(currentText);
    setMessageMenuOpen(null);
  };

  // Salvar edição
  const handleSaveEditMessage = () => {
    if (!editingMessageText.trim() || !editingMessageId) return;

    // Atualizar mensagem nas mensagens customizadas
    setCustomMessages(prev => ({
      ...prev,
      [selectedConv]: (prev[selectedConv] || []).map(msg =>
        msg.id === editingMessageId
          ? { ...msg, content: editingMessageText, edited: true }
          : msg
      )
    }));

    console.log("✏️ Mensagem editada:", editingMessageId, editingMessageText);
    setEditingMessageId(null);
    setEditingMessageText("");
  };

  // Cancelar edição
  const handleCancelEditMessage = () => {
    setEditingMessageId(null);
    setEditingMessageText("");
  };

  // Copiar mensagem
  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log("📋 Mensagem copiada:", text);
    setMessageMenuOpen(null);
  };

  // Deletar mensagem
  const handleDeleteMessage = (messageId: string) => {
    setCustomMessages(prev => ({
      ...prev,
      [selectedConv]: (prev[selectedConv] || []).filter(msg => msg.id !== messageId)
    }));
    console.log("🗑️ Mensagem deletada:", messageId);
    setMessageMenuOpen(null);
  };

  // Adicionar reação
  const handleAddReaction = (messageId: string, emoji: string) => {
    setMessageReactions(prev => {
      const current = prev[messageId] || [];
      // Se já tem a reação, remove. Se não tem, adiciona.
      const hasReaction = current.includes(emoji);
      return {
        ...prev,
        [messageId]: hasReaction
          ? current.filter(e => e !== emoji)
          : [...current, emoji]
      };
    });
    console.log("❤️ Reação adicionada:", messageId, emoji);
    setReactionPickerOpen(null);
  };

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
    const iconProps = { size: 16, strokeWidth: 2 };
    switch (status) {
      case "urgent": return <AlertCircle {...iconProps} className="text-error-500" />;
      case "ai": return <Bot {...iconProps} className="text-success-500" />;
      case "you": return <User {...iconProps} className="text-warning-500" />;
      case "resolved": return <CheckCircle {...iconProps} className="text-neutral-400" />;
      default: return <CheckCircle {...iconProps} className="text-neutral-400" />;
    }
  };

  // Verifica se está em modo demo (backend offline)
  const isDemoMode = apiConversations.length === 0 && !loading;

  return (
    <div className="flex flex-col h-screen bg-[#F9FAFB]">
      {/* BANNER MODO DEMO */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-[#FF5A2A] to-[#FF8C42] text-white px-6 py-2 text-center text-sm font-medium flex items-center justify-center gap-2">
          <AlertCircle size={16} strokeWidth={2} />
          <span>Modo Demo - Exibindo dados mocados (Backend offline)</span>
        </div>
      )}

      {/* HEADER */}
      <div className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src="/logo.png" alt="JáRespondi" className="h-10" />
          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
            <Phone className="h-4 w-4" />
            <span className="flex items-center gap-1.5"><Smartphone size={16} strokeWidth={2} /> Vendas: +55 11 9999-9999</span>
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
            {loading && conversations.length === 0 ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="h-6 w-6 animate-spin text-[#FF5A2A]" />
              </div>
            ) : error ? (
              <div className="p-4 text-center text-red-500">
                <AlertCircle className="h-6 w-6 mx-auto mb-2" />
                <p className="text-sm">Erro ao carregar conversas</p>
                <Button
                  variant="link"
                  className="text-xs mt-2"
                  onClick={() => window.location.reload()}
                >
                  Tentar novamente
                </Button>
              </div>
            ) : (
              <>
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
                {!loading && conversations.length > 1 && (
                  <div className="p-3 text-center">
                    <Button
                      variant="link"
                      className="text-xs text-[#6B7280]"
                      onClick={loadMore}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                          Carregando...
                        </>
                      ) : (
                        "Ver mais..."
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* CHAT ATIVO */}
        {selectedConversation && (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* CARD DO CLIENTE */}
            <Card className={`m-4 bg-white ${cardExpanded ? "max-h-[400px] overflow-y-auto" : ""} transition-all flex-shrink-0`}>
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
                          <span className="flex items-center gap-1.5"><CheckCircle size={14} strokeWidth={2} className="text-success-500" /> Online</span>
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleEditClient}
                        title="Editar informações do cliente"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {!cardExpanded ? (
                  <>
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <span className="flex items-center gap-1">
                        Score: {selectedConversation.score}
                        <Flame size={14} strokeWidth={2} className="text-error-500" />
                      </span>
                      <span>|</span>
                      <span>Pipeline: {selectedConversation.pipeline}</span>
                      <span>|</span>
                      <span>{selectedConversation.value}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setShowTagModal(true)}
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        Tag
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => setShowNoteModal(true)}
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Nota
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`text-xs ${isFavorite ? "bg-yellow-50 border-yellow-500" : ""}`}
                        onClick={handleToggleFavorite}
                      >
                        <Star className={`h-3 w-3 mr-1 ${isFavorite ? "fill-yellow-500 text-yellow-500" : ""}`} />
                        Favorito
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="space-y-4">
                    {/* Detalhes */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <FileText size={16} strokeWidth={2} />
                        DETALHES
                      </h4>
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
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <Target size={16} strokeWidth={2} />
                        CRM
                      </h4>
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
                        <div className="flex items-center gap-1.5">
                          Temperatura:
                          <Flame size={14} strokeWidth={2} className="text-error-500" />
                          Quente
                        </div>
                        <div>Pipeline: {selectedConversation.pipeline} ({selectedConversation.value})</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <Tag size={16} strokeWidth={2} />
                        Tags
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedConversation.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-[#FFF4ED] text-[#FF5A2A] text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setShowTagModal(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {/* Notas */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <FileText size={16} strokeWidth={2} />
                        Notas
                      </h4>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs mt-2"
                        onClick={() => setShowNoteModal(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Adicionar nota
                      </Button>
                    </div>

                    {/* Tarefas */}
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-1.5">
                        <ClipboardList size={16} strokeWidth={2} />
                        Próximos Passos
                      </h4>
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
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs mt-2"
                        onClick={() => {
                          // Com backend: abrir modal de nova tarefa
                          console.log("📋 Nova tarefa para:", selectedConv);
                        }}
                      >
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

              {/* Mensagens - Usando componente WhatsAppMessage */}
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

              {/* Aviso: Estado da conversa */}
              {!iaEnabled && (
                <div className="flex justify-center">
                  <Card className="p-4 bg-[#FFF4ED] border-[#FF5A2A] max-w-md">
                    <div className="text-center">
                      <div className="font-semibold text-[#FF5A2A] mb-2 flex items-center justify-center gap-1.5">
                        <User size={16} strokeWidth={2} />
                        Você assumiu a conversa
                      </div>
                      <p className="text-sm text-[#6B7280] mb-3">
                        {selectedConversation?.clientName} aguarda sua resposta. Você está se comunicando diretamente com o cliente.
                      </p>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => setIaEnabled(true)}
                      >
                        <Bot size={16} strokeWidth={2} className="mr-1.5" />
                        Retornar para IA
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            {/* INPUT DE MENSAGEM */}
            <div className="p-4 bg-white border-t border-[#E5E7EB] flex-shrink-0">
              {/* AVISO: IA ATIVA */}
              {iaEnabled && (
                <div className="mb-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <Bot size={20} strokeWidth={2} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium text-sm text-green-800 mb-1">
                      IA gerenciando esta conversa
                    </div>
                    <div className="text-xs text-green-700">
                      A Inteligência Artificial está respondendo automaticamente. Para assumir a conversa e enviar mensagens diretamente, desative a IA.
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIaEnabled(false)}
                    className="border-green-600 text-green-700 hover:bg-green-100 flex-shrink-0"
                  >
                    Assumir conversa
                  </Button>
                </div>
              )}

              <div className="mb-2">
                <Textarea
                  placeholder={
                    iaEnabled
                      ? "IA está gerenciando esta conversa. Desative para enviar mensagens."
                      : "Digite sua mensagem..."
                  }
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey && !iaEnabled) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  disabled={iaEnabled}
                  className={`min-h-[60px] resize-none ${
                    iaEnabled ? "bg-gray-50 cursor-not-allowed opacity-60" : ""
                  }`}
                />
                <div className="text-xs text-[#6B7280] mt-1">
                  {iaEnabled ? (
                    <span className="flex items-center gap-1">
                      <Bot size={12} strokeWidth={2} />
                      IA ativa - Modo somente leitura
                    </span>
                  ) : (
                    "@ para mencionar • / para comandos • Enter para enviar"
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-2 relative">
                  {/* Botão Anexar */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={iaEnabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAttachFile();
                      }}
                      title={iaEnabled ? "Desative a IA para usar" : "Anexar arquivo"}
                    >
                      <Paperclip className="h-4 w-4" />
                    </Button>

                    {/* Menu de anexos */}
                    {showAttachMenu && !iaEnabled && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-[#E5E7EB] p-2 w-48 z-50" onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleFileSelect('document')}
                        >
                          <File size={16} strokeWidth={2} className="mr-2 text-blue-600" />
                          Documento
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleFileSelect('image')}
                        >
                          <Image size={16} strokeWidth={2} className="mr-2 text-green-600" />
                          Imagem
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start"
                          onClick={() => handleFileSelect('video')}
                        >
                          <Video size={16} strokeWidth={2} className="mr-2 text-purple-600" />
                          Vídeo
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Botão Emoji */}
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={iaEnabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowEmojiPicker(!showEmojiPicker);
                      }}
                      title={iaEnabled ? "Desative a IA para usar" : "Adicionar emoji"}
                    >
                      <Smile className="h-4 w-4" />
                    </Button>

                    {/* Picker de emoji simples */}
                    {showEmojiPicker && !iaEnabled && (
                      <div className="absolute bottom-full left-0 mb-2 bg-white rounded-lg shadow-xl border border-[#E5E7EB] p-4 w-96 z-50" onClick={(e) => e.stopPropagation()}>
                        <div className="grid grid-cols-10 gap-2 max-h-80 overflow-y-auto">
                          {['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '👍', '👎', '👏', '🙌', '👋', '🤝', '🙏', '💪', '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '⭐', '✨', '💯', '✅', '❌', '⚠️', '📌', '📍', '🔥', '💡', '💰', '💵', '💸', '📱', '💻', '⌨️', '🖱️', '📞', '📧', '📨', '📩', '📮', '📫', '🏠', '🏢', '🏪', '🏬', '🏭', '🏗️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚐', '✈️', '🚀', '⏰', '⏱️', '⏲️', '🕐', '📅', '📆', '🎯', '🎨', '🎭', '🎪', '🎬', '🎤', '🎧', '🎼', '🎹', '🎸', '🎺', '🎷', '🥁', '🎮', '🎲', '🎳', '⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳', '🏹', '🎣', '🥊', '🥋', '⛷️', '🏂', '🏋️', '🤸', '⛹️', '🤺', '🤾', '🏌️', '🧘', '🏃', '🚴', '🚵', '🧗', '🤹', '☕', '🍵', '🧃', '🥤', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🍾', '🍴', '🍽️', '🥄', '🔪', '🍕', '🍔', '🍟', '🌭', '🍿', '🥓', '🥚', '🧀', '🥗', '🍝', '🥘', '🍜', '🍲', '🍛', '🍣', '🍱', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥟', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜'].map(emoji => (
                            <button
                              key={emoji}
                              className="text-2xl hover:bg-[#F9FAFB] rounded p-1 transition-colors"
                              onClick={() => {
                                handleEmojiSelect(emoji);
                                setShowEmojiPicker(false);
                              }}
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Botão Áudio */}
                  {!isRecordingAudio ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      disabled={iaEnabled}
                      onClick={handleStartRecording}
                      title={iaEnabled ? "Desative a IA para usar" : "Gravar áudio"}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2 bg-red-50 px-3 py-1 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm text-red-600 font-medium">
                          {Math.floor(recordingTime / 60)}:{(recordingTime % 60).toString().padStart(2, '0')}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancelRecording}
                        className="h-6 w-6 p-0"
                        title="Cancelar gravação"
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleStopRecording}
                        className="h-6 w-6 p-0"
                        title="Enviar áudio"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  )}

                  {/* Botão Foto/Câmera */}
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={iaEnabled}
                    onClick={handleCamera}
                    title={iaEnabled ? "Desative a IA para usar" : "Tirar foto"}
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIaEnabled(!iaEnabled)}
                    className={iaEnabled ? "border-green-500 text-green-600" : "border-orange-500 text-orange-600"}
                  >
                    <Bot size={16} strokeWidth={2} className="mr-1" />
                    IA: {iaEnabled ? "ON" : "OFF"}
                  </Button>
                  <Button
                    className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleSendMessage}
                    disabled={iaEnabled || !messageInput.trim()}
                    title={iaEnabled ? "Desative a IA para enviar mensagens" : "Enviar mensagem"}
                  >
                    Enviar
                  </Button>
                </div>
              </div>
            </div>

            {/* AÇÕES RÁPIDAS */}
            <div className="p-4 bg-white border-t border-[#E5E7EB] flex-shrink-0">
              <div className="text-sm font-semibold text-[#111827] mb-3 flex items-center gap-1.5">
                <Settings size={16} strokeWidth={2} />
                AÇÕES RÁPIDAS
              </div>
              <div className="flex flex-wrap gap-2">
                {iaEnabled ? (
                  <ActionButton icon={User} onClick={() => setIaEnabled(false)}>
                    Assumir conversa
                  </ActionButton>
                ) : (
                  <ActionButton icon={Bot} onClick={() => setIaEnabled(true)}>
                    Ativar IA
                  </ActionButton>
                )}
                <ActionButton icon={CheckCheck} onClick={handleResolve}>
                  Resolver
                </ActionButton>
                <ActionButton icon={Calendar} onClick={handleSchedule}>
                  Agendar
                </ActionButton>
                <ActionButton icon={Tag} onClick={() => setShowTagModal(true)}>
                  Tag
                </ActionButton>
                <ActionButton icon={UserPlus} onClick={handleAssign}>
                  Atribuir
                </ActionButton>
                <ActionButton icon={Archive} onClick={handleArchive}>
                  Arquivar
                </ActionButton>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleMore}
                  className="gap-1.5 text-sm px-2"
                  title="Mais opções"
                >
                  <MoreVertical size={16} strokeWidth={2} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL: RESOLVER CONVERSA */}
      {showResolveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowResolveModal(false)}>
          <Card className="w-[450px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCheck size={20} strokeWidth={2} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold">Resolver Conversa</h3>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              Tem certeza que deseja marcar a conversa com <span className="font-semibold text-[#111827]">{selectedConversation?.clientName}</span> como resolvida?
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowResolveModal(false)}>
                Cancelar
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={confirmResolve}>
                <CheckCheck size={16} strokeWidth={2} className="mr-1.5" />
                Resolver
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: ARQUIVAR CONVERSA */}
      {showArchiveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowArchiveModal(false)}>
          <Card className="w-[450px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Archive size={20} strokeWidth={2} className="text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold">Arquivar Conversa</h3>
            </div>
            <p className="text-sm text-[#6B7280] mb-6">
              Tem certeza que deseja arquivar a conversa com <span className="font-semibold text-[#111827]">{selectedConversation?.clientName}</span>?
              <br />
              <span className="text-xs mt-2 block">A conversa será movida para o arquivo e não aparecerá mais na lista ativa.</span>
            </p>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowArchiveModal(false)}>
                Cancelar
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700 text-white" onClick={confirmArchive}>
                <Archive size={16} strokeWidth={2} className="mr-1.5" />
                Arquivar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: AGENDAR - SELEÇÃO DE TIPO */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowScheduleModal(false)}>
          <Card className="w-[450px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Calendar size={20} strokeWidth={2} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">O que deseja agendar?</h3>
            </div>
            <p className="text-sm text-[#6B7280] mb-4">
              Escolha o tipo de agendamento para a conversa com {selectedConversation?.clientName}
            </p>
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => handleScheduleAction("message")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-purple-100 flex items-center justify-center">
                    <Smile size={16} strokeWidth={2} className="text-purple-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Mensagem Agendada</div>
                    <div className="text-xs text-[#6B7280]">Enviar mensagem em data/hora específica</div>
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => handleScheduleAction("task")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-orange-100 flex items-center justify-center">
                    <ClipboardList size={16} strokeWidth={2} className="text-orange-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Tarefa</div>
                    <div className="text-xs text-[#6B7280]">Criar tarefa com prazo</div>
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => handleScheduleAction("followup")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center">
                    <Phone size={16} strokeWidth={2} className="text-green-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Follow-up</div>
                    <div className="text-xs text-[#6B7280]">Agendar retorno de contato</div>
                  </div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-auto py-3"
                onClick={() => handleScheduleAction("reminder")}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-yellow-100 flex items-center justify-center">
                    <AlertCircle size={16} strokeWidth={2} className="text-yellow-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium text-sm">Lembrete</div>
                    <div className="text-xs text-[#6B7280]">Criar lembrete pessoal</div>
                  </div>
                </div>
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full" onClick={() => setShowScheduleModal(false)}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: AGENDAR - FORMULÁRIO */}
      {showScheduleFormModal && scheduleType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowScheduleFormModal(false)}>
          <Card className="w-[500px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                scheduleType === 'message' ? 'bg-purple-100' :
                scheduleType === 'task' ? 'bg-orange-100' :
                scheduleType === 'followup' ? 'bg-green-100' :
                'bg-yellow-100'
              }`}>
                {scheduleType === 'message' && <Smile size={20} strokeWidth={2} className="text-purple-600" />}
                {scheduleType === 'task' && <ClipboardList size={20} strokeWidth={2} className="text-orange-600" />}
                {scheduleType === 'followup' && <Phone size={20} strokeWidth={2} className="text-green-600" />}
                {scheduleType === 'reminder' && <AlertCircle size={20} strokeWidth={2} className="text-yellow-600" />}
              </div>
              <h3 className="text-lg font-semibold">
                {scheduleType === 'message' && 'Agendar Mensagem'}
                {scheduleType === 'task' && 'Criar Tarefa'}
                {scheduleType === 'followup' && 'Agendar Follow-up'}
                {scheduleType === 'reminder' && 'Criar Lembrete'}
              </h3>
            </div>

            <div className="space-y-4">
              {/* Data */}
              <div>
                <label className="text-sm font-medium text-[#111827] block mb-2">
                  Data *
                </label>
                <Input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Hora */}
              <div>
                <label className="text-sm font-medium text-[#111827] block mb-2">
                  Hora *
                </label>
                <Input
                  type="time"
                  value={scheduleTime}
                  onChange={(e) => setScheduleTime(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Detalhes */}
              <div>
                <label className="text-sm font-medium text-[#111827] block mb-2">
                  {scheduleType === 'message' && 'Mensagem'}
                  {scheduleType === 'task' && 'Descrição da tarefa'}
                  {scheduleType === 'followup' && 'Observações'}
                  {scheduleType === 'reminder' && 'Lembrete'}
                </label>
                <Textarea
                  placeholder={
                    scheduleType === 'message' ? 'Digite a mensagem que será enviada...' :
                    scheduleType === 'task' ? 'Descreva a tarefa...' :
                    scheduleType === 'followup' ? 'Adicione observações sobre o follow-up...' :
                    'Digite seu lembrete...'
                  }
                  value={scheduleDetails}
                  onChange={(e) => setScheduleDetails(e.target.value)}
                  className="min-h-[100px] resize-none"
                />
              </div>

              {/* Info adicional */}
              <div className="bg-[#F9FAFB] p-3 rounded-lg">
                <p className="text-xs text-[#6B7280]">
                  <strong>Cliente:</strong> {selectedConversation?.clientName}
                </p>
                {scheduleType === 'message' && (
                  <p className="text-xs text-[#6B7280] mt-1">
                    A mensagem será enviada automaticamente no horário agendado.
                  </p>
                )}
                {scheduleType === 'task' && (
                  <p className="text-xs text-[#6B7280] mt-1">
                    Você receberá uma notificação quando chegar o prazo.
                  </p>
                )}
                {scheduleType === 'followup' && (
                  <p className="text-xs text-[#6B7280] mt-1">
                    Você será lembrado de entrar em contato com o cliente.
                  </p>
                )}
                {scheduleType === 'reminder' && (
                  <p className="text-xs text-[#6B7280] mt-1">
                    Você receberá uma notificação pessoal no horário agendado.
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  // Volta para a tela de seleção
                  setShowScheduleFormModal(false);
                  setShowScheduleModal(true);
                  setScheduleType(null);
                  // Limpar campos
                  setScheduleDate("");
                  setScheduleTime("");
                  setScheduleDetails("");
                }}
              >
                Cancelar
              </Button>
              <Button
                className={`text-white ${
                  scheduleType === 'message' ? 'bg-purple-600 hover:bg-purple-700' :
                  scheduleType === 'task' ? 'bg-orange-600 hover:bg-orange-700' :
                  scheduleType === 'followup' ? 'bg-green-600 hover:bg-green-700' :
                  'bg-yellow-600 hover:bg-yellow-700'
                }`}
                onClick={handleConfirmSchedule}
                disabled={!scheduleDate || !scheduleTime}
              >
                <Calendar size={16} strokeWidth={2} className="mr-1.5" />
                Agendar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: ATRIBUIR */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAssignModal(false)}>
          <Card className="w-[450px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <UserPlus size={20} strokeWidth={2} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold">Atribuir Conversa</h3>
            </div>
            <p className="text-sm text-[#6B7280] mb-4">
              Selecione um agente para atribuir a conversa com {selectedConversation?.clientName}
            </p>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {/* Lista de agentes mock */}
              {[
                { id: "1", name: "Maria Vendedora", avatar: "MV", status: "online", role: "Vendas" },
                { id: "2", name: "João Suporte", avatar: "JS", status: "online", role: "Suporte" },
                { id: "3", name: "Ana Gerente", avatar: "AG", status: "busy", role: "Gerência" },
                { id: "4", name: "Pedro Atendente", avatar: "PA", status: "offline", role: "Atendimento" },
                { id: "5", name: "Carla Vendas", avatar: "CV", status: "online", role: "Vendas" },
              ].map((agent) => (
                <Button
                  key={agent.id}
                  variant="outline"
                  className="w-full justify-start h-auto py-3 hover:bg-[#FFF4ED]"
                  onClick={() => handleAssignTo(agent.id, agent.name)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-[#FF5A2A] text-white font-semibold text-sm">
                        {agent.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{agent.name}</div>
                      <div className="text-xs text-[#6B7280]">{agent.role}</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={`h-2 w-2 rounded-full ${
                        agent.status === 'online' ? 'bg-green-500' :
                        agent.status === 'busy' ? 'bg-yellow-500' :
                        'bg-gray-300'
                      }`} />
                      <span className="text-xs text-[#6B7280] capitalize">{agent.status}</span>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full" onClick={() => setShowAssignModal(false)}>
                Cancelar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: MAIS OPÇÕES */}
      {showMoreModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMoreModal(false)}>
          <Card className="w-[450px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                <MoreVertical size={20} strokeWidth={2} className="text-gray-600" />
              </div>
              <h3 className="text-lg font-semibold">Mais Opções</h3>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoreAction("export")}
              >
                <FileText size={16} strokeWidth={2} className="mr-2" />
                Exportar Conversa
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoreAction("block")}
              >
                <AlertCircle size={16} strokeWidth={2} className="mr-2" />
                Bloquear Contato
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoreAction("ticket")}
              >
                <ClipboardList size={16} strokeWidth={2} className="mr-2" />
                Criar Ticket
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoreAction("history")}
              >
                <Calendar size={16} strokeWidth={2} className="mr-2" />
                Ver Histórico Completo
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handleMoreAction("whatsapp-web")}
              >
                <Phone size={16} strokeWidth={2} className="mr-2" />
                Abrir no WhatsApp Web
              </Button>
            </div>
            <div className="mt-4 pt-4 border-t">
              <Button variant="ghost" className="w-full" onClick={() => setShowMoreModal(false)}>
                Fechar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: ADICIONAR TAG */}
      {showTagModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTagModal(false)}>
          <Card className="w-[400px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Tag size={20} strokeWidth={2} className="text-[#FF5A2A]" />
              Adicionar Tag
            </h3>
            <Input
              placeholder="Digite o nome da tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTag();
                if (e.key === 'Escape') setShowTagModal(false);
              }}
              className="mb-4"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowTagModal(false);
                  setNewTag("");
                }}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white"
                onClick={handleAddTag}
                disabled={!newTag.trim()}
              >
                Adicionar
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* MODAL: ADICIONAR NOTA */}
      {showNoteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowNoteModal(false)}>
          <Card className="w-[500px] p-6 bg-white rounded-xl shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText size={20} strokeWidth={2} className="text-[#FF5A2A]" />
              Adicionar Nota
            </h3>
            <Textarea
              placeholder="Digite sua nota..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setShowNoteModal(false);
              }}
              className="mb-4 min-h-[120px]"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowNoteModal(false);
                  setNewNote("");
                }}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white"
                onClick={handleAddNote}
                disabled={!newNote.trim()}
              >
                Adicionar
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
