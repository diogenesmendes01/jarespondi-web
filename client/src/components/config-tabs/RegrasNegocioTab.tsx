import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, FileText } from "lucide-react";

type BusinessRule = {
  id: number;
  name: string;
  description: string;
  trigger: string;
  action: string;
  active: boolean;
  priority: "Alta" | "Média" | "Baixa";
};

export default function RegrasNegocioTab() {
  const [rules, setRules] = useState<BusinessRule[]>([
    {
      id: 1,
      name: "Horário Comercial",
      description: "Responde apenas durante horário comercial (9h-18h)",
      trigger: "Mensagem fora do horário",
      action: "Enviar mensagem automática informando horário de atendimento",
      active: true,
      priority: "Alta"
    },
    {
      id: 2,
      name: "Palavrões",
      description: "Detecta e trata mensagens com palavrões",
      trigger: "Palavrão detectado",
      action: "Responder educadamente e encaminhar para supervisor",
      active: true,
      priority: "Alta"
    },
    {
      id: 3,
      name: "Lead Qualificado",
      description: "Identifica leads com alta intenção de compra",
      trigger: "Palavras-chave: 'quanto custa', 'preço', 'contratar'",
      action: "Marcar como lead quente e notificar vendedor",
      active: true,
      priority: "Média"
    }
  ]);

  const toggleRule = (id: number) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "bg-[#FEE2E2] text-[#991B1B]";
      case "Média": return "bg-[#FEF3C7] text-[#92400E]";
      case "Baixa": return "bg-[#DBEAFE] text-[#1E40AF]";
      default: return "bg-[#F3F4F6] text-[#6B7280]";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#111827] flex items-center gap-2"><FileText size={20} strokeWidth={2} /> Regras de Negócio</h2>
          <p className="text-sm text-[#6B7280] mt-1">
            Configure regras automáticas para o comportamento dos agentes
          </p>
        </div>
        <Button className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
          <Plus className="h-4 w-4 mr-2" />
          Nova Regra
        </Button>
      </div>

      <div className="space-y-3">
        {rules.map((rule) => (
          <Card key={rule.id} className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-base font-semibold text-[#111827]">
                    {rule.name}
                  </h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(rule.priority)}`}>
                    {rule.priority}
                  </span>
                  <button
                    onClick={() => toggleRule(rule.id)}
                    className="ml-auto"
                  >
                    {rule.active ? (
                      <ToggleRight className="h-6 w-6 text-[#10B981]" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-[#6B7280]" />
                    )}
                  </button>
                </div>
                
                <p className="text-sm text-[#6B7280] mb-3">
                  {rule.description}
                </p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-[#111827]">Gatilho:</span>
                    <p className="text-[#6B7280] mt-1">{rule.trigger}</p>
                  </div>
                  <div>
                    <span className="font-medium text-[#111827]">Ação:</span>
                    <p className="text-[#6B7280] mt-1">{rule.action}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 ml-4">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {rules.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6B7280] mb-4">Nenhuma regra de negócio configurada</p>
          <Button className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeira Regra
          </Button>
        </div>
      )}
    </div>
  );
}
