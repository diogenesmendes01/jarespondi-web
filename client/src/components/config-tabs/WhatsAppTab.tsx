import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  Power,
  Edit,
  Settings,
} from "lucide-react";
import AgentConfigModal from "@/components/AgentConfigModal";

export default function WhatsAppTab() {
  const [expandedNumbers, setExpandedNumbers] = useState<string[]>(["1"]);
  const [showAgentModal, setShowAgentModal] = useState(false);

  const whatsappNumbers = [
    {
      id: "1",
      number: "+55 11 99999-1111",
      name: "Recepção",
      type: "WhatsApp Web",
      status: "connected",
      agents: [
        {
          id: "1",
          name: "Atendente Inicial",
          priority: "Alta",
          trigger: "Primeira mensagem",
          active: true,
        },
        {
          id: "2",
          name: "Agendamento",
          priority: "Média",
          trigger: 'Palavras "agendar", "consulta", "horário"',
          active: true,
        },
        {
          id: "3",
          name: "Financeiro",
          priority: "Baixa",
          trigger: 'Palavras "pagamento", "plano", "valor"',
          active: true,
        },
      ],
    },
    {
      id: "2",
      number: "+55 11 99999-2222",
      name: "Vendas",
      type: "WhatsApp API",
      status: "connected",
      agents: [
        {
          id: "4",
          name: "Qualificador de Leads",
          priority: "Alta",
          trigger: "Primeira mensagem",
          active: true,
        },
        {
          id: "5",
          name: "Closer",
          priority: "Média",
          trigger: "Lead qualificado",
          active: true,
        },
      ],
    },
    {
      id: "3",
      number: "+55 11 99999-3333",
      name: "Suporte",
      type: "WhatsApp Web",
      status: "disconnected",
      agents: [
        {
          id: "6",
          name: "Suporte Técnico",
          priority: "Alta",
          trigger: "Primeira mensagem",
          active: false,
        },
      ],
    },
  ];

  const toggleNumber = (numberId: string) => {
    if (expandedNumbers.includes(numberId)) {
      setExpandedNumbers(expandedNumbers.filter((id) => id !== numberId));
    } else {
      setExpandedNumbers([...expandedNumbers, numberId]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[#111827]">📱 WhatsApp & Agentes</h2>
        <Button
          onClick={() => setShowAgentModal(true)}
          className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Número
        </Button>
      </div>

      <div className="space-y-4">
        {whatsappNumbers.map((whatsapp) => {
          const isExpanded = expandedNumbers.includes(whatsapp.id);

          return (
            <Card key={whatsapp.id} className="overflow-hidden">
              {/* Number Header */}
              <div
                className="p-6 cursor-pointer hover:bg-[#F9FAFB] transition-colors"
                onClick={() => toggleNumber(whatsapp.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-[#6B7280]">
                      {isExpanded ? (
                        <ChevronDown className="h-5 w-5" />
                      ) : (
                        <ChevronRight className="h-5 w-5" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-[#111827]">
                          📞 {whatsapp.number} ({whatsapp.name})
                        </h3>
                        <span
                          className={`flex items-center gap-1 text-sm ${
                            whatsapp.status === "connected"
                              ? "text-[#10B981]"
                              : "text-[#EF4444]"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {whatsapp.status === "connected"
                            ? "Conectado"
                            : "Desconectado"}
                        </span>
                      </div>
                      <p className="text-sm text-[#6B7280] mt-1">
                        Tipo: {whatsapp.type} | {whatsapp.agents.length} agente
                        {whatsapp.agents.length !== 1 ? "s" : ""} ativo
                        {whatsapp.agents.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Agents List */}
              {isExpanded && (
                <div className="px-6 pb-6 space-y-3">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-sm font-semibold text-[#111827]">
                      🤖 AGENTES ATIVOS ({whatsapp.agents.length}):
                    </h4>
                  </div>

                  {whatsapp.agents.map((agent) => (
                    <Card
                      key={agent.id}
                      className="p-4 bg-[#F9FAFB] border-[#E5E7EB]"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h5 className="text-base font-semibold text-[#111827]">
                              {agent.name}
                            </h5>
                            <span
                              className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                                agent.active
                                  ? "bg-[#D1FAE5] text-[#065F46]"
                                  : "bg-[#FEE2E2] text-[#991B1B]"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              {agent.active ? "ON" : "OFF"}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm text-[#6B7280]">
                            <p>Prioridade: {agent.priority}</p>
                            <p>Trigger: {agent.trigger}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                            onClick={() => setShowAgentModal(true)}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Editar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            {agent.active ? (
                              <>
                                <Power className="h-3 w-3 mr-1" />
                                Desativar
                              </>
                            ) : (
                              <>
                                <Power className="h-3 w-3 mr-1" />
                                Ativar
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => setShowAgentModal(true)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Agente
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Agent Config Modal */}
      <AgentConfigModal
        isOpen={showAgentModal}
        onClose={() => setShowAgentModal(false)}
      />
    </div>
  );
}
