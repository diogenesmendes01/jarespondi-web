import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface AgentConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentData?: any;
}

export default function AgentConfigModal({
  isOpen,
  onClose,
  agentData,
}: AgentConfigModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Básico
    name: agentData?.name || "",
    description: agentData?.description || "",
    whatsappNumber: agentData?.whatsappNumber || "",

    // Step 2: Triggers
    triggerFirstMessage: true,
    triggerKeywords: true,
    keywords: "agendar, consulta, horário, marcar",
    triggerSchedule: false,
    scheduleStart: "09:00",
    scheduleEnd: "18:00",
    scheduleDays: [true, true, true, true, true, false, false],
    triggerTag: false,
    tagValue: "",
    triggerScore: false,
    scoreOperator: "maior que",
    scoreValue: 70,
    triggerPipeline: false,
    pipelineStatus: "",

    // Step 3: Personalidade
    systemPrompt: `Você é a atendente virtual da Clínica Dr. Silva

Sua função é:
- Receber o cliente com cordialidade
- Entender qual o motivo do contato
- Direcionar para o setor correto:
  * "agendar" → Agente Agendamento
  * "pagamento" → Agente Financeiro
  * outros → continue atendendo

Tom: Profissional mas amigável
Sempre use emojis sutis 😊`,
    temperature: 0.7,
    maxTokens: 500,

    // Step 4: Ações Automáticas
    actionUpdateCRM: true,
    actionScheduleFollowup: true,
    followupDelay: "24",
    followupType: "Check-in",
    actionTransferAgent: true,
    transferTrigger: "palavra-chave",
    transferTo: "Agente Agendamento",
    actionCalendar: false,
    actionTasks: false,
    actionNotifyHuman: false,
    notifyWhen: "",
    notifyEmail: "",

    // Step 5: Handoff
    handoffExplicit: true,
    handoffComplex: true,
    handoffMessages: false,
    handoffMessagesLimit: 5,
    handoffScore: false,
    handoffScoreValue: 85,
    handoffMessage: "Vou te conectar com um de nossos especialistas humanos. Um momento! 😊",
    notifyEmails: ["joao@clinica.com"],
    notifyWhatsApp: "+55 11 98888-8888",
  });

  const totalSteps = 6;

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = (active: boolean) => {
    console.log("Saving agent:", { ...formData, active });
    onClose();
  };

  if (!isOpen) return null;

  const renderStepIndicator = () => (
    <div className="flex items-center gap-2 mb-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-2 flex-1 rounded-full ${
            index < currentStep ? "bg-[#FF5A2A]" : "bg-[#E5E7EB]"
          }`}
        />
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 1 de 6: Básico
      </h3>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Nome do Agente:
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => updateField("name", e.target.value)}
          placeholder="Atendente Inicial"
          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Descrição (interno):
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateField("description", e.target.value)}
          placeholder="Faz primeira triagem e direciona para o agente correto"
          rows={3}
          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Número WhatsApp:
        </label>
        <select
          value={formData.whatsappNumber}
          onChange={(e) => updateField("whatsappNumber", e.target.value)}
          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A]"
        >
          <option value="">Selecione um número</option>
          <option value="+55 11 99999-1111">+55 11 99999-1111 (Recepção)</option>
          <option value="+55 11 99999-2222">+55 11 99999-2222 (Vendas)</option>
          <option value="+55 11 99999-3333">+55 11 99999-3333 (Suporte)</option>
        </select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 2 de 6: Triggers (Quando ativar)
      </h3>
      <p className="text-sm text-[#6B7280]">
        Quando este agente deve entrar em ação?
      </p>

      <div className="space-y-4">
        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.triggerFirstMessage}
            onCheckedChange={(checked) =>
              updateField("triggerFirstMessage", checked)
            }
          />
          <span className="text-sm text-[#374151]">
            Primeira mensagem do contato
          </span>
        </label>

        <div>
          <label className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={formData.triggerKeywords}
              onCheckedChange={(checked) =>
                updateField("triggerKeywords", checked)
              }
            />
            <span className="text-sm text-[#374151]">
              Palavras-chave específicas
            </span>
          </label>
          {formData.triggerKeywords && (
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => updateField("keywords", e.target.value)}
              placeholder="agendar, consulta, horário, marcar"
              className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A] ml-8"
            />
          )}
        </div>

        <div>
          <label className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={formData.triggerSchedule}
              onCheckedChange={(checked) =>
                updateField("triggerSchedule", checked)
              }
            />
            <span className="text-sm text-[#374151]">Horário específico</span>
          </label>
          {formData.triggerSchedule && (
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#6B7280]">De:</span>
                <input
                  type="time"
                  value={formData.scheduleStart}
                  onChange={(e) => updateField("scheduleStart", e.target.value)}
                  className="px-3 py-1 border border-[#E5E7EB] rounded"
                />
                <span className="text-sm text-[#6B7280]">até:</span>
                <input
                  type="time"
                  value={formData.scheduleEnd}
                  onChange={(e) => updateField("scheduleEnd", e.target.value)}
                  className="px-3 py-1 border border-[#E5E7EB] rounded"
                />
              </div>
              <div className="flex gap-2">
                {["S", "T", "Q", "Q", "S", "S", "D"].map((day, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      const newDays = [...formData.scheduleDays];
                      newDays[index] = !newDays[index];
                      updateField("scheduleDays", newDays);
                    }}
                    className={`w-8 h-8 rounded text-sm font-medium ${
                      formData.scheduleDays[index]
                        ? "bg-[#FF5A2A] text-white"
                        : "bg-[#F3F4F6] text-[#6B7280]"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.triggerTag}
            onCheckedChange={(checked) => updateField("triggerTag", checked)}
          />
          <span className="text-sm text-[#374151]">Tag no CRM</span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.triggerScore}
            onCheckedChange={(checked) => updateField("triggerScore", checked)}
          />
          <span className="text-sm text-[#374151]">Score do Lead</span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.triggerPipeline}
            onCheckedChange={(checked) =>
              updateField("triggerPipeline", checked)
            }
          />
          <span className="text-sm text-[#374151]">Status do Pipeline</span>
        </label>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 3 de 6: Personalidade
      </h3>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          System Prompt:
        </label>
        <textarea
          value={formData.systemPrompt}
          onChange={(e) => updateField("systemPrompt", e.target.value)}
          rows={12}
          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A] font-mono text-sm"
        />
        <div className="flex gap-2 mt-2">
          <Button variant="outline" size="sm">
            📋 Templates
          </Button>
          <Button variant="outline" size="sm">
            🧪 Testar
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Temperatura (criatividade): {formData.temperature}
        </label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={formData.temperature}
          onChange={(e) =>
            updateField("temperature", parseFloat(e.target.value))
          }
          className="w-full"
        />
        <div className="flex justify-between text-xs text-[#6B7280]">
          <span>Preciso</span>
          <span>Balanceado</span>
          <span>Criativo</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Máximo de tokens por resposta: {formData.maxTokens}
        </label>
        <input
          type="range"
          min="100"
          max="2000"
          step="50"
          value={formData.maxTokens}
          onChange={(e) => updateField("maxTokens", parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 4 de 6: Ações Automáticas
      </h3>
      <p className="text-sm text-[#6B7280]">
        O que este agente pode fazer automaticamente?
      </p>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={formData.actionUpdateCRM}
              onCheckedChange={(checked) =>
                updateField("actionUpdateCRM", checked)
              }
            />
            <span className="text-sm font-medium text-[#374151]">
              Atualizar CRM
            </span>
          </label>
          {formData.actionUpdateCRM && (
            <ul className="ml-8 text-sm text-[#6B7280] space-y-1">
              <li>• Atualizar score do lead</li>
              <li>• Adicionar tags automaticamente</li>
              <li>• Mudar status do pipeline</li>
            </ul>
          )}
        </div>

        <div>
          <label className="flex items-center gap-3 mb-2">
            <Checkbox
              checked={formData.actionScheduleFollowup}
              onCheckedChange={(checked) =>
                updateField("actionScheduleFollowup", checked)
              }
            />
            <span className="text-sm font-medium text-[#374151]">
              Agendar Follow-ups
            </span>
          </label>
          {formData.actionScheduleFollowup && (
            <div className="ml-8 flex items-center gap-2 text-sm">
              <span className="text-[#6B7280]">Quando:</span>
              <select
                value={formData.followupDelay}
                onChange={(e) => updateField("followupDelay", e.target.value)}
                className="px-2 py-1 border border-[#E5E7EB] rounded text-sm"
              >
                <option value="24">24 horas</option>
                <option value="48">48 horas</option>
                <option value="72">72 horas</option>
              </select>
            </div>
          )}
        </div>

        <div>
          <label className="flex items-center gap-3">
            <Checkbox
              checked={formData.actionTransferAgent}
              onCheckedChange={(checked) =>
                updateField("actionTransferAgent", checked)
              }
            />
            <span className="text-sm font-medium text-[#374151]">
              Transferir para outro agente
            </span>
          </label>
        </div>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.actionCalendar}
            onCheckedChange={(checked) =>
              updateField("actionCalendar", checked)
            }
          />
          <span className="text-sm font-medium text-[#374151]">
            Integrar com calendário
          </span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.actionTasks}
            onCheckedChange={(checked) => updateField("actionTasks", checked)}
          />
          <span className="text-sm font-medium text-[#374151]">
            Criar tarefas no sistema
          </span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.actionNotifyHuman}
            onCheckedChange={(checked) =>
              updateField("actionNotifyHuman", checked)
            }
          />
          <span className="text-sm font-medium text-[#374151]">
            Enviar notificação para humano
          </span>
        </label>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 5 de 6: Handoff (Passar pra humano)
      </h3>
      <p className="text-sm text-[#6B7280]">
        Quando transferir para atendimento humano?
      </p>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-3 mb-1">
            <Checkbox
              checked={formData.handoffExplicit}
              onCheckedChange={(checked) =>
                updateField("handoffExplicit", checked)
              }
            />
            <span className="text-sm font-medium text-[#374151]">
              Cliente solicita explicitamente
            </span>
          </label>
          <p className="ml-8 text-xs text-[#6B7280]">
            "quero falar com alguém", "atendente"
          </p>
        </div>

        <div>
          <label className="flex items-center gap-3 mb-1">
            <Checkbox
              checked={formData.handoffComplex}
              onCheckedChange={(checked) =>
                updateField("handoffComplex", checked)
              }
            />
            <span className="text-sm font-medium text-[#374151]">
              Situação complexa/sensível
            </span>
          </label>
          <p className="ml-8 text-xs text-[#6B7280]">
            IA detecta: reclamação grave, urgência médica
          </p>
        </div>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.handoffMessages}
            onCheckedChange={(checked) =>
              updateField("handoffMessages", checked)
            }
          />
          <span className="text-sm font-medium text-[#374151]">
            Após X mensagens sem resolver
          </span>
        </label>

        <label className="flex items-center gap-3">
          <Checkbox
            checked={formData.handoffScore}
            onCheckedChange={(checked) =>
              updateField("handoffScore", checked)
            }
          />
          <span className="text-sm font-medium text-[#374151]">
            Score muito alto (oportunidade importante)
          </span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Mensagem ao transferir:
        </label>
        <textarea
          value={formData.handoffMessage}
          onChange={(e) => updateField("handoffMessage", e.target.value)}
          rows={3}
          className="w-full px-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:border-[#FF5A2A]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[#374151] mb-2">
          Notificar quem?
        </label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <Checkbox checked={true} />
            <span className="text-sm text-[#374151]">joao@clinica.com</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox checked={false} />
            <span className="text-sm text-[#374151]">maria@clinica.com</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox checked={true} />
            <span className="text-sm text-[#374151]">
              WhatsApp: +55 11 98888-8888
            </span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#111827]">
        Passo 6 de 6: Revisão
      </h3>
      <p className="text-sm text-[#10B981] font-medium">
        ✅ Configuração Completa! Revise:
      </p>

      <Card className="p-4 bg-[#F9FAFB] space-y-2 text-sm">
        <p>
          <span className="font-medium">🤖 Nome:</span> {formData.name || "Não definido"}
        </p>
        <p>
          <span className="font-medium">📱 Número:</span>{" "}
          {formData.whatsappNumber || "Não selecionado"}
        </p>
        <p>
          <span className="font-medium">🎯 Trigger:</span>{" "}
          {formData.triggerFirstMessage && "Primeira mensagem"}
          {formData.triggerKeywords && " + palavras-chave"}
        </p>
        <p>
          <span className="font-medium">💬 Tom:</span> Profissional mas amigável
        </p>
        <p>
          <span className="font-medium">⚡ Ações:</span>{" "}
          {formData.actionUpdateCRM && "Atualiza CRM"}
          {formData.actionScheduleFollowup && ", agenda follow-ups"}
        </p>
        <p>
          <span className="font-medium">👤 Handoff:</span>{" "}
          {formData.handoffExplicit && "Cliente solicita"}
          {formData.handoffComplex && " ou situação complexa"}
        </p>
      </Card>

      <Button variant="outline" className="w-full">
        🧪 Testar Agente
      </Button>
    </div>
  );

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <h2 className="text-2xl font-bold text-[#111827]">
            Configurar Agente
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B7280] hover:text-[#111827]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderStepIndicator()}

          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-[#E5E7EB]">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="bg-[#FF5A2A] hover:bg-[#E4491F]">
              Próximo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
              >
                Salvar Inativo
              </Button>
              <Button
                onClick={() => handleSave(true)}
                className="bg-[#10B981] hover:bg-[#059669]"
              >
                Salvar e Ativar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
