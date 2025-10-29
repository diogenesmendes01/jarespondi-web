import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { 
  Users, 
  MessageSquare, 
  Megaphone, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Loader2
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: stats, isLoading } = trpc.dashboard.stats.useQuery();
  const { data: alerts } = trpc.alerts.list.useQuery({ limit: 5 });

  const statCards = [
    {
      title: "Total de Contatos",
      value: stats?.totalContacts || 0,
      icon: Users,
      description: "Leads no CRM",
      trend: "+12%",
      trendUp: true,
      href: "/crm",
    },
    {
      title: "Conversas Ativas",
      value: stats?.activeConversations || 0,
      icon: MessageSquare,
      description: `de ${stats?.totalConversations || 0} totais`,
      trend: "+5%",
      trendUp: true,
      href: "/conversas",
    },
    {
      title: "Campanhas Ativas",
      value: stats?.activeCampaigns || 0,
      icon: Megaphone,
      description: `de ${stats?.totalCampaigns || 0} totais`,
      trend: "+8%",
      trendUp: true,
      href: "/campanhas",
    },
    {
      title: "Taxa de Conversão",
      value: "24%",
      icon: TrendingUp,
      description: "Últimos 30 dias",
      trend: "+3%",
      trendUp: true,
      href: "/analytics",
    },
  ];

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Visão geral do seu sistema de automação WhatsApp
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.title} href={stat.href}>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <p className="text-xs text-muted-foreground">{stat.description}</p>
                      <span
                        className={`flex items-center text-xs font-medium ${
                          stat.trendUp ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {stat.trendUp ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {stat.trend}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions & Recent Alerts */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Ações Rápidas</CardTitle>
              <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/conversas">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Ver Conversas Ativas
                </Button>
              </Link>
              <Link href="/campanhas">
                <Button variant="outline" className="w-full justify-start">
                  <Megaphone className="mr-2 h-4 w-4" />
                  Criar Nova Campanha
                </Button>
              </Link>
              <Link href="/crm">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Gerenciar Contatos
                </Button>
              </Link>
              <Link href="/configuracoes">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Configurar WhatsApp
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Alertas Recentes</CardTitle>
              <CardDescription>Notificações e avisos do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts && alerts.length > 0 ? (
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(alert.createdAt).toLocaleString("pt-BR")}
                        </p>
                      </div>
                    </div>
                  ))}
                  <Link href="/alertas">
                    <Button variant="link" className="w-full">
                      Ver todos os alertas
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Nenhum alerta recente</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Getting Started */}
        {stats?.totalContacts === 0 && (
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle>Comece Agora</CardTitle>
              <CardDescription>Configure seu sistema em poucos passos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm text-foreground">
                  <strong>1.</strong> Configure sua conexão WhatsApp nas configurações
                </p>
                <p className="text-sm text-foreground">
                  <strong>2.</strong> Adicione seus primeiros contatos no CRM
                </p>
                <p className="text-sm text-foreground">
                  <strong>3.</strong> Crie sua primeira campanha de vendas
                </p>
                <p className="text-sm text-foreground">
                  <strong>4.</strong> Configure o agente de IA para atendimento automático
                </p>
              </div>
              <Link href="/configuracoes">
                <Button className="w-full">Ir para Configurações</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
