import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { 
  Loader2, 
  TrendingUp, 
  Users, 
  MessageSquare, 
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Analytics() {
  const { data: stats, isLoading } = trpc.dashboard.stats.useQuery();
  const [timeRange, setTimeRange] = useState("30d");

  // Dados mockados para demonstração
  const metrics = {
    volumeInteracoes: {
      conversasIniciadas: 245,
      mensagensEnviadas: 1823,
      mensagensRecebidas: 1456,
      taxaResposta: 85,
      tempoMedioResposta: "2.5 min",
    },
    novosClientes: {
      leadsCaptados: 89,
      clientesConvertidos: 34,
      taxaConversao: 38.2,
      origemLeads: {
        campanhas: 45,
        organico: 32,
        indicacao: 12,
      },
    },
    fluxoAtendimento: {
      conversasAtivas: stats?.activeConversations || 0,
      conversasFinalizadas: 156,
      conversasAbandonadas: 23,
      tempoMedioAtendimento: "8.3 min",
    },
    reclamacoes: {
      quantidade: 12,
      tipos: {
        produto: 5,
        atendimento: 4,
        entrega: 3,
      },
      tempoResolucao: "4.2 horas",
      satisfacaoPosResolucao: 92,
    },
    qualificacao: {
      leadsQualificados: 67,
      leadsNaoQualificados: 22,
      scoreMedia: 7.8,
      probabilidadeConversao: 42,
    },
    performanceVendas: {
      vendasAtivas: 28,
      vendasPassivas: 45,
      taxaFechamento: 31.5,
      ticketMedio: 450.00,
      roiCampanhas: 285,
    },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex">
        <Sidebar menuItems={dashboardMenuItems} />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF5A2A]" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      <Sidebar menuItems={dashboardMenuItems} />
      <div className="flex-1 p-8">
        <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
            <p className="text-muted-foreground mt-1">
              Análise detalhada de métricas e performance
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Últimos 7 dias</SelectItem>
                <SelectItem value="30d">Últimos 30 dias</SelectItem>
                <SelectItem value="90d">Últimos 90 dias</SelectItem>
                <SelectItem value="1y">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Volume de Interações */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Volume de Interações</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Conversas Iniciadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.volumeInteracoes.conversasIniciadas}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+12%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Mensagens Enviadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.volumeInteracoes.mensagensEnviadas}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+8%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Taxa de Resposta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.volumeInteracoes.taxaResposta}%
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">+3%</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Tempo Médio de Resposta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.volumeInteracoes.tempoMedioResposta}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowDownRight className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600 font-medium">-15%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Novos Clientes */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Novos Clientes</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Leads Captados</CardTitle>
                <CardDescription>Total de novos leads</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {metrics.novosClientes.leadsCaptados}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Clientes Convertidos</CardTitle>
                <CardDescription>Leads que viraram clientes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  {metrics.novosClientes.clientesConvertidos}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Percentual de conversão</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">
                  {metrics.novosClientes.taxaConversao}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance de Vendas */}
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-4">Performance de Vendas</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Vendas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.performanceVendas.vendasAtivas}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Vendas Passivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.performanceVendas.vendasPassivas}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Ticket Médio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  R$ {metrics.performanceVendas.ticketMedio.toFixed(2)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  ROI Campanhas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">
                  {metrics.performanceVendas.roiCampanhas}%
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fluxo de Atendimento & Qualificação */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de Atendimento</CardTitle>
              <CardDescription>Status das conversas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Conversas Ativas</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.fluxoAtendimento.conversasAtivas}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-muted-foreground">Conversas Finalizadas</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.fluxoAtendimento.conversasFinalizadas}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-muted-foreground">Conversas Abandonadas</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.fluxoAtendimento.conversasAbandonadas}
                </span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Tempo Médio de Atendimento
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    {metrics.fluxoAtendimento.tempoMedioAtendimento}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Qualificação de Leads</CardTitle>
              <CardDescription>Análise de qualidade dos leads</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Leads Qualificados</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.qualificacao.leadsQualificados}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Leads Não Qualificados</span>
                </div>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.qualificacao.leadsNaoQualificados}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Score Média</span>
                <span className="text-lg font-semibold text-foreground">
                  {metrics.qualificacao.scoreMedia}/10
                </span>
              </div>
              <div className="pt-2 border-t border-border">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Probabilidade de Conversão
                  </span>
                  <span className="text-lg font-semibold text-primary">
                    {metrics.qualificacao.probabilidadeConversao}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
      </div>
    </div>
  );
}
