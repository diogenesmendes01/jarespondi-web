import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Play, Rocket, X } from "lucide-react";
import { Link } from "wouter";

export default function LandingPage() {
  const painPoints = [
    {
      icon: <X className="h-12 w-12 text-[#EF4444]" />,
      text: "Demora para responder",
    },
    {
      icon: <X className="h-12 w-12 text-[#EF4444]" />,
      text: "Não consegue atender 24/7",
    },
    {
      icon: <X className="h-12 w-12 text-[#EF4444]" />,
      text: "Perde o controle das conversas",
    },
    {
      icon: <X className="h-12 w-12 text-[#EF4444]" />,
      text: "Clientes caem no esquecimento",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Conecte seu WhatsApp",
      description: "Escaneie um QR Code e pronto. Leva menos de 2 minutos.",
    },
    {
      number: "2",
      title: "Configure a IA",
      description: "Defina o tom de voz e as informações do seu negócio.",
    },
    {
      number: "3",
      title: "Ative o Piloto Automático",
      description: "A IA começa a responder seus clientes instantaneamente.",
    },
    {
      number: "4",
      title: "Acompanhe Resultados",
      description: "Veja métricas em tempo real e ajuste conforme necessário.",
    },
  ];

  const features = [
    {
      icon: "🤖",
      title: "IA Inteligente",
      description: "Respostas naturais e contextualizadas que parecem humanas",
    },
    {
      icon: "⚡",
      title: "Resposta Instantânea",
      description: "Atenda em segundos, não em horas. Seus clientes não esperam.",
    },
    {
      icon: "🎯",
      title: "Qualificação Automática",
      description: "A IA identifica e prioriza os leads mais quentes",
    },
    {
      icon: "📊",
      title: "Analytics Completo",
      description: "Dashboards com todas as métricas que importam",
    },
    {
      icon: "🔄",
      title: "Integração Total",
      description: "Conecte com seu CRM, calendário e ferramentas favoritas",
    },
    {
      icon: "🛡️",
      title: "100% Seguro",
      description: "Criptografia de ponta a ponta e conformidade LGPD",
    },
  ];

  const plans = [
    {
      name: "Starter",
      price: "97",
      popular: false,
      features: [
        "1 número WhatsApp",
        "WhatsApp Web (não oficial)",
        "500 conversas/mês",
        "IA básica",
        "Suporte por email",
      ],
    },
    {
      name: "Business",
      price: "297",
      popular: true,
      features: [
        "3 números WhatsApp",
        "WhatsApp API Oficial",
        "2.000 conversas/mês",
        "IA avançada + personalização",
        "CRM integrado",
        "Analytics completo",
        "Suporte prioritário",
      ],
    },
    {
      name: "Pro",
      price: "597",
      popular: false,
      features: [
        "10 números WhatsApp",
        "WhatsApp API Oficial",
        "10.000 conversas/mês",
        "IA premium + treinamento",
        "Integrações ilimitadas",
        "White label",
        "Gerente de sucesso",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      popular: false,
      features: [
        "Números ilimitados",
        "Infraestrutura dedicada",
        "Conversas ilimitadas",
        "IA customizada",
        "SLA garantido",
        "Suporte 24/7",
        "Onboarding dedicado",
      ],
    },
  ];

  const faqs = [
    {
      question: "Como funciona o período de teste?",
      answer:
        "Você tem 14 dias para testar gratuitamente, sem precisar cadastrar cartão de crédito. Pode cancelar a qualquer momento.",
    },
    {
      question: "Preciso ter WhatsApp Business?",
      answer:
        "Não necessariamente. No plano Starter você pode usar WhatsApp Web comum. Para planos superiores, recomendamos a API oficial do WhatsApp Business.",
    },
    {
      question: "A IA realmente entende contexto?",
      answer:
        "Sim! Usamos modelos de linguagem avançados que entendem o contexto da conversa, histórico do cliente e podem até agendar compromissos.",
    },
    {
      question: "Posso personalizar as respostas?",
      answer:
        "Totalmente! Você define o tom de voz, informações do negócio, FAQs e pode treinar a IA com seus próprios dados.",
    },
    {
      question: "E se a IA não souber responder?",
      answer:
        "Você pode configurar para a IA transferir para um humano ou enviar uma mensagem padrão. Você tem controle total.",
    },
    {
      question: "Quantas conversas simultâneas a IA aguenta?",
      answer:
        "Ilimitadas! A IA pode atender centenas de clientes ao mesmo tempo, sem perder qualidade.",
    },
    {
      question: "Vocês têm suporte em português?",
      answer:
        "Sim! Todo nosso suporte é em português e nossa equipe está disponível para ajudar você.",
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer:
        "Sim, sem multas ou taxas. Se cancelar, você ainda pode usar até o fim do período pago.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 h-[72px] bg-white border-b border-[#E5E7EB]">
        <div className="container mx-auto h-full flex items-center justify-between px-12">
          <div className="flex items-center gap-8">
            <div className="text-2xl font-bold text-[#2563EB]">JáResponde</div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#como-funciona" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                Como Funciona
              </a>
              <a href="#recursos" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                Recursos
              </a>
              <a href="#precos" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                Preços
              </a>
              <a href="#faq" className="text-[#6B7280] hover:text-[#111827] transition-colors">
                FAQ
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="h-9 px-5 border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/register">
              <Button className="h-9 px-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                Começar Grátis
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-[56px] font-bold text-[#111827] leading-[1.2] mb-4">
                Atendimento Instantâneo, Vendas Automáticas 24/7
              </h1>
              <p className="text-xl text-[#6B7280] mb-8">
                Seu cliente não espera. JáResponde.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <Link href="/register">
                  <Button className="h-12 px-8 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-lg font-semibold">
                    <Rocket className="mr-2 h-5 w-5" />
                    Começar Grátis - 14 dias
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="h-12 px-8 border-[#E5E7EB] text-[#111827] text-lg font-semibold"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Ver Demo
                </Button>
              </div>
              <p className="text-sm text-[#9CA3AF]">
                ✓ Sem cartão  ✓ 2 minutos pra começar
              </p>
            </div>
            <div>
              <div className="rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden bg-white">
                <img
                  src="/placeholder-dashboard.png"
                  alt="Dashboard Preview"
                  className="w-full h-auto"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.innerHTML =
                      '<div class="w-full h-[400px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-gray-400">Dashboard Preview</div>';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-12 text-center">
          <p className="text-base font-medium text-[#6B7280] mb-6">
            Usado por 500+ empresas no Brasil
          </p>
          <div className="flex justify-center items-center gap-12 mb-4 opacity-50 grayscale">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-[120px] h-[40px] bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className="text-yellow-400 text-xl">⭐</span>
              ))}
            </div>
            <span className="text-sm font-medium text-[#6B7280]">
              4.9/5 (127 avaliações)
            </span>
          </div>
        </div>
      </section>

      {/* Problema Section */}
      <section id="problema" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-12">
          <h2 className="text-4xl font-bold text-center text-[#111827] mb-12">
            Você está perdendo clientes porque:
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((point, index) => (
              <Card
                key={index}
                className="p-8 bg-white border border-[#E5E7EB] rounded-xl"
              >
                <div className="flex items-center gap-4">
                  {point.icon}
                  <p className="text-lg font-semibold text-[#111827]">{point.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="py-20 bg-white">
        <div className="container mx-auto px-12">
          <h2 className="text-4xl font-bold text-center text-[#111827] mb-16">
            Como Funciona (4 Passos Simples)
          </h2>
          <div className="max-w-3xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#2563EB] flex items-center justify-center">
                  <span className="text-[32px] font-bold text-white">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-[#111827] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-[#6B7280]">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="recursos" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-12">
          <h2 className="text-4xl font-bold text-center text-[#111827] mb-16">
            Tudo que Você Precisa em Um Só Lugar
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-10 bg-white rounded-xl text-center hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
              >
                <div className="text-6xl mb-5">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-[#111827] mb-3">
                  {feature.title}
                </h3>
                <p className="text-base text-[#6B7280] leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="precos" className="py-20 bg-white">
        <div className="container mx-auto px-12">
          <h2 className="text-4xl font-bold text-center text-[#111827] mb-6">
            Planos que Crescem com Você
          </h2>
          <div className="flex justify-center mb-12">
            <div className="inline-flex items-center h-12 bg-[#F3F4F6] rounded-full p-1">
              <button className="px-6 h-10 rounded-full bg-white text-[#111827] font-medium">
                Mensal
              </button>
              <button className="px-6 h-10 rounded-full text-[#6B7280] font-medium">
                Anual <span className="text-[#10B981] text-sm ml-1">-20%</span>
              </button>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative p-8 rounded-2xl ${
                  plan.popular
                    ? "border-2 border-[#2563EB] shadow-lg"
                    : "border-2 border-[#E5E7EB]"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white px-4 py-1 rounded-full text-xs font-bold">
                    ⭐ POPULAR
                  </div>
                )}
                <h3 className="text-xl font-semibold text-[#111827] mb-4">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-[#111827]">
                    {plan.price === "Custom" ? "Custom" : `R$ ${plan.price}`}
                  </span>
                  {plan.price !== "Custom" && (
                    <span className="text-base text-[#6B7280]">/mês</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#6B7280]">
                      <Check className="h-4 w-4 text-[#10B981] flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full h-11 ${
                    plan.popular
                      ? "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
                      : "bg-transparent border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB]"
                  }`}
                >
                  {plan.price === "Custom" ? "Falar com Vendas" : "Começar Agora"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-[#F9FAFB]">
        <div className="container mx-auto px-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-[#111827] mb-12">
              Perguntas Frequentes
            </h2>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white border border-[#E5E7EB] rounded-lg px-6"
                >
                  <AccordionTrigger className="text-lg font-semibold text-[#111827] hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-[#6B7280] leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-12 text-center">
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            Pronto para Automatizar Seu Atendimento?
          </h2>
          <Link href="/register">
            <Button className="h-14 px-12 bg-white text-[#2563EB] hover:bg-gray-100 text-lg font-semibold hover:scale-105 transition-transform">
              Começar Gratuitamente Agora
            </Button>
          </Link>
          <p className="mt-6 text-base text-white/80">
            14 dias grátis • Sem cartão de crédito • Cancele quando quiser
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-[#111827] text-white">
        <div className="container mx-auto px-12">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">JáResponde</div>
              <p className="text-sm text-[#9CA3AF]">
                Atendimento inteligente 24/7 com IA
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li><a href="#" className="hover:text-white">Recursos</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Casos de Uso</a></li>
                <li><a href="#" className="hover:text-white">Integrações</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li><a href="#" className="hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Documentação</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-[#9CA3AF]">
                <li><a href="#" className="hover:text-white">Privacidade</a></li>
                <li><a href="#" className="hover:text-white">Termos</a></li>
                <li><a href="#" className="hover:text-white">Segurança</a></li>
                <li><a href="#" className="hover:text-white">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-[#374151] flex justify-between items-center">
            <p className="text-sm text-[#6B7280]">
              © 2024 JáResponde. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              {["Twitter", "LinkedIn", "Instagram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-[#9CA3AF] hover:text-white transition-colors"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
