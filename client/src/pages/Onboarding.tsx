import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Check, Smartphone, Zap, RefreshCw } from "lucide-react";
import { useLocation } from "wouter";

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [connectionType, setConnectionType] = useState<"web" | "api" | null>(null);
  const [qrCodeTimer, setQrCodeTimer] = useState(83); // 1:23
  const [agentConfig, setAgentConfig] = useState({
    businessName: "",
    businessType: "",
    tone: "amigavel" as "formal" | "amigavel" | "casual",
  });

  const totalSteps = 6;

  // QR Code timer countdown
  useEffect(() => {
    if (currentStep === 3 && qrCodeTimer > 0) {
      const interval = setInterval(() => {
        setQrCodeTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentStep, qrCodeTimer]);

  // Auto advance from step 4 after 3 seconds
  useEffect(() => {
    if (currentStep === 4) {
      const timeout = setTimeout(() => {
        setCurrentStep(5);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Go to dashboard
      setLocation("/dashboard");
    }
  };

  const handleSkip = () => {
    setLocation("/dashboard");
  };

  const handleConnectionSelect = (type: "web" | "api") => {
    setConnectionType(type);
    setTimeout(() => setCurrentStep(3), 300);
  };

  const handleQRSuccess = () => {
    setCurrentStep(4);
  };

  const getTonePreview = () => {
    const previews = {
      formal:
        "Bom dia. Sou o assistente virtual da Clínica Dr. Silva. Como posso auxiliá-lo?",
      amigavel:
        "Olá! Sou a assistente virtual da Clínica Dr. Silva 😊 Como posso te ajudar hoje?",
      casual:
        "E aí! Tudo bem? Sou da Clínica Dr. Silva, em que posso te ajudar? 👋",
    };
    return previews[agentConfig.tone];
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Top Bar */}
      <div className="h-16 md:h-20 bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-8 lg:px-12">
          {/* Logo */}
          <img src="/JaRespondi-logo.png" alt="JáRespondi" className="h-12 md:h-14" />

          {/* Skip Button */}
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-sm md:text-base font-medium text-[#6B7280] hover:text-[#111827]"
          >
            Pular Tutorial
          </Button>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-[#E5E7EB] py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSteps }).map((_, index) => {
                const stepNum = index + 1;
                const isCompleted = stepNum < currentStep;
                const isActive = stepNum === currentStep;

                return (
                  <div key={stepNum} className="flex items-center">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-semibold transition-colors ${
                        isCompleted
                          ? "bg-[#10B981] text-white"
                          : isActive
                          ? "bg-[#FF5A2A] text-white"
                          : "bg-[#E5E7EB] text-[#6B7280]"
                      }`}
                    >
                      {stepNum}
                    </div>
                    {stepNum < totalSteps && (
                      <div
                        className={`w-6 md:w-10 h-0.5 ${
                          isCompleted ? "bg-[#FF5A2A]" : "bg-[#E5E7EB]"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs md:text-sm text-[#6B7280] mt-2">
              Passo {currentStep} de {totalSteps}
            </p>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="container mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Welcome */}
          {currentStep === 1 && (
            <div className="text-center space-y-6 md:space-y-8">
              <div className="text-5xl md:text-8xl mb-4 md:mb-8">🎉</div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] px-4">
                Bem-vindo ao JáRespondi! 🎉
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-[#6B7280] px-4">
                Em menos de 5 minutos você terá seu assistente IA funcionando
              </p>

              {/* Video Placeholder */}
              <div className="w-full max-w-[600px] aspect-video mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl md:text-6xl mb-4">▶️</div>
                  <p className="text-sm md:text-base text-[#6B7280]">Vídeo de Introdução</p>
                </div>
              </div>

              {/* Checklist */}
              <div className="space-y-3 text-left max-w-md mx-auto px-4">
                <div className="flex items-center gap-3 text-sm md:text-base lg:text-lg text-[#6B7280]">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-[#10B981] flex-shrink-0" />
                  <span>WhatsApp conectado</span>
                </div>
                <div className="flex items-center gap-3 text-sm md:text-base lg:text-lg text-[#6B7280]">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-[#10B981] flex-shrink-0" />
                  <span>IA configurada</span>
                </div>
                <div className="flex items-center gap-3 text-sm md:text-base lg:text-lg text-[#6B7280]">
                  <Check className="h-5 w-5 md:h-6 md:w-6 text-[#10B981] flex-shrink-0" />
                  <span>Primeiro cliente sendo atendido</span>
                </div>
              </div>

              <div className="pt-6 md:pt-8">
                <Button
                  onClick={handleNext}
                  className="h-10 md:h-11 px-6 md:px-8 bg-[#FF5A2A] hover:bg-[#E4491F] text-white text-sm md:text-base font-semibold"
                >
                  Começar →
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Connection Type */}
          {currentStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#111827] mb-4">
                  Conecte seu Primeiro WhatsApp 📱
                </h2>
                <p className="text-base text-[#6B7280]">
                  Escolha como você quer conectar seu número
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mt-12">
                {/* WhatsApp Web */}
                <Card
                  onClick={() => handleConnectionSelect("web")}
                  className={`relative p-8 cursor-pointer transition-all hover:shadow-lg ${
                    connectionType === "web"
                      ? "border-2 border-[#FF5A2A] bg-[#F0F6FF]"
                      : "border-2 border-[#E5E7EB]"
                  }`}
                >
                  <div className="absolute top-4 right-4 bg-[#10B981] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Recomendado
                  </div>
                  <div className="text-center space-y-4">
                    <Smartphone className="h-16 w-16 mx-auto text-[#FF5A2A]" />
                    <h3 className="text-2xl font-semibold text-[#111827]">
                      WhatsApp Web
                    </h3>
                    <ul className="space-y-2 text-sm text-left">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#10B981] mt-0.5" />
                        <span>Grátis</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#10B981] mt-0.5" />
                        <span>Setup rápido (2 min)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#F59E0B] mt-0.5">⚠️</span>
                        <span>Menos estável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#F59E0B] mt-0.5">⚠️</span>
                        <span>Ideal para testes</span>
                      </li>
                    </ul>
                    <Button className="w-full mt-4 bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
                      Escolher
                    </Button>
                  </div>
                </Card>

                {/* WhatsApp API */}
                <Card
                  onClick={() => handleConnectionSelect("api")}
                  className={`p-8 cursor-pointer transition-all hover:shadow-lg ${
                    connectionType === "api"
                      ? "border-2 border-[#FF5A2A] bg-[#F0F6FF]"
                      : "border-2 border-[#E5E7EB]"
                  }`}
                >
                  <div className="text-center space-y-4">
                    <Zap className="h-16 w-16 mx-auto text-[#F59E0B]" />
                    <h3 className="text-2xl font-semibold text-[#111827]">
                      WhatsApp API
                    </h3>
                    <ul className="space-y-2 text-sm text-left">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#10B981] mt-0.5" />
                        <span>Oficial e estável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-[#10B981] mt-0.5" />
                        <span>Escalável</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#EF4444] mt-0.5">$</span>
                        <span>Requer conta Business</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-[#EF4444] mt-0.5">$</span>
                        <span>Custos por mensagem</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-[#E5E7EB] text-[#111827]"
                    >
                      Escolher
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 3: QR Code */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#111827] mb-6 md:mb-8">
                  Escaneie o QR Code 📷
                </h2>
              </div>

              {/* Instructions */}
              <div className="max-w-lg mx-auto space-y-4 mb-8">
                {[
                  "Abra o WhatsApp no seu celular",
                  "Toque em Menu ou Configurações",
                  "Toque em Aparelhos conectados",
                  "Toque em Conectar um aparelho",
                  "Aponte seu celular para esta tela",
                ].map((instruction, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FF5A2A] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-base text-[#6B7280] pt-0.5">{instruction}</p>
                  </div>
                ))}
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center">
                <div className="w-[300px] h-[300px] bg-white border-2 border-[#E5E7EB] rounded-2xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-sm text-[#6B7280]">QR Code</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm font-medium text-[#EF4444] mt-4">
                  ⏱️ Válido por: {formatTime(qrCodeTimer)}
                </p>
              </div>

              {/* Actions */}
              <div className="text-center space-y-2">
                <Button
                  variant="ghost"
                  onClick={() => setQrCodeTimer(83)}
                  className="text-sm font-medium text-[#FF5A2A]"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Atualizar Código
                </Button>
                <p className="text-sm text-[#6B7280]">
                  <a href="#" className="underline hover:text-[#111827]">
                    Código não carrega? Clique aqui
                  </a>
                </p>
              </div>

              {/* Simulate Success Button (for demo) */}
              <div className="text-center pt-4">
                <Button
                  onClick={handleQRSuccess}
                  className="bg-[#10B981] hover:bg-[#059669] text-white"
                >
                  Simular Conexão (Demo)
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="text-center space-y-8">
              <div className="text-[120px]">✅</div>
              <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#111827]">
                WhatsApp Conectado com Sucesso!
              </h2>
              <p className="text-lg font-medium text-[#6B7280]">
                Número conectado: +55 11 99999-9999
              </p>
              <p className="text-base text-[#6B7280]">
                Agora vamos configurar sua IA...
              </p>

              {/* Celebration GIF Placeholder */}
              <div className="w-[300px] h-[300px] mx-auto bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center">
                <div className="text-6xl">🎊</div>
              </div>

              <p className="text-sm text-[#9CA3AF]">
                Avançando automaticamente em 3 segundos...
              </p>
            </div>
          )}

          {/* Step 5: Configure Agent */}
          {currentStep === 5 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#111827] mb-4">
                  Configure Seu Primeiro Agente 🤖
                </h2>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Business Name */}
                <div>
                  <Label htmlFor="businessName" className="text-sm font-medium text-[#374151] mb-2 block">
                    Qual é o seu negócio?
                  </Label>
                  <Input
                    id="businessName"
                    placeholder="Ex: Clínica Dr. Silva"
                    value={agentConfig.businessName}
                    onChange={(e) =>
                      setAgentConfig({ ...agentConfig, businessName: e.target.value })
                    }
                    className="h-11 px-4 border-[#E5E7EB] rounded-lg"
                  />
                </div>

                {/* Business Type */}
                <div>
                  <Label htmlFor="businessType" className="text-sm font-medium text-[#374151] mb-2 block">
                    Tipo de negócio:
                  </Label>
                  <Select
                    value={agentConfig.businessType}
                    onValueChange={(value) =>
                      setAgentConfig({ ...agentConfig, businessType: value })
                    }
                  >
                    <SelectTrigger className="h-11">
                      <SelectValue placeholder="Selecione..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saude">Saúde e Medicina</SelectItem>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="servicos">Serviços</SelectItem>
                      <SelectItem value="educacao">Educação</SelectItem>
                      <SelectItem value="imobiliaria">Imobiliária</SelectItem>
                      <SelectItem value="outros">Outros...</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone Selector */}
                <div>
                  <Label className="text-sm font-medium text-[#374151] mb-3 block">
                    Tom de voz:
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(["formal", "amigavel", "casual"] as const).map((tone) => (
                      <button
                        key={tone}
                        type="button"
                        onClick={() => setAgentConfig({ ...agentConfig, tone })}
                        className={`h-11 rounded-lg border-2 font-medium transition-all ${
                          agentConfig.tone === tone
                            ? "bg-[#FF5A2A] border-[#FF5A2A] text-white"
                            : "bg-white border-[#E5E7EB] text-[#111827] hover:border-[#FF5A2A]"
                        }`}
                      >
                        {tone === "formal" && "Formal"}
                        {tone === "amigavel" && "Amigável"}
                        {tone === "casual" && "Casual"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div className="p-6 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl">
                  <p className="text-sm font-semibold text-[#6B7280] mb-3">
                    💬 Preview de como a IA vai responder:
                  </p>
                  <div className="bg-[#FF5A2A] text-white p-4 rounded-xl rounded-bl-none max-w-[80%] text-[15px]">
                    {getTonePreview()}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="ghost"
                    onClick={handleNext}
                    className="text-[#6B7280]"
                  >
                    Personalizar depois
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white"
                  >
                    Confirmar →
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Final */}
          {currentStep === 6 && (
            <div className="text-center space-y-8">
              <div className="text-[120px]">🎉</div>
              <h1 className="text-4xl font-bold text-[#111827]">
                Tudo Pronto! Você está no ar!
              </h1>
              <p className="text-lg text-[#6B7280]">
                Seu assistente já está ativo e pronto pra atender!
              </p>

              {/* Test Section */}
              <div className="max-w-lg mx-auto p-8 bg-[#F0F6FF] border-2 border-dashed border-[#FF5A2A] rounded-2xl">
                <p className="text-base font-semibold text-[#FF5A2A] mb-4">
                  Teste agora: Envie uma mensagem pro seu número e veja a mágica acontecer ✨
                </p>
                <p className="text-xl font-bold text-[#111827] mb-4">
                  +55 11 99999-9999
                </p>
                <Button className="h-12 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold">
                  📱 Abrir WhatsApp
                </Button>
              </div>

              {/* Next Steps */}
              <div className="max-w-lg mx-auto text-left">
                <h3 className="text-base font-semibold text-[#111827] mb-4">
                  Próximos passos sugeridos:
                </h3>
                <div className="space-y-2">
                  {[
                    "Personalizar prompts da IA",
                    "Adicionar mais números",
                    "Configurar integrações",
                    "Convidar equipe",
                  ].map((step, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm text-[#6B7280]">
                      <div className="w-4 h-4 border-2 border-[#E5E7EB] rounded"></div>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main CTA */}
              <div className="pt-8">
                <Button
                  onClick={() => setLocation("/dashboard")}
                  className="h-12 md:h-14 px-8 md:px-12 bg-[#FF5A2A] hover:bg-[#E4491F] text-white text-base md:text-lg font-semibold rounded-xl"
                >
                  🚀 Ir para o Dashboard
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
