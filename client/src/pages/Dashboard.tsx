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
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Dashboard() {
  const [location] = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: MessageSquare, label: "Conversas", path: "/conversas" },
    { icon: Users, label: "CRM", path: "/crm" },
    { icon: Send, label: "Campanhas", path: "/campanhas" },
    { icon: BarChart3, label: "Analytics", path: "/analytics" },
    { icon: Settings, label: "Configurações", path: "/configuracoes" },
  ];

  const metrics = [
    {
      title: "Conversas Hoje",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: MessageSquare,
      color: "text-[#FF5A2A]",
      bgColor: "bg-[#FFF9F6]",
    },
    {
      title: "Novos Leads",
      value: "38",
      change: "+24%",
      trend: "up",
      icon: Users,
      color: "text-[#10B981]",
      bgColor: "bg-[#ECFDF5]",
    },
    {
      title: "Taxa de Resposta",
      value: "94%",
      change: "+3%",
      trend: "up",
      icon: Zap,
      color: "text-[#F59E0B]",
      bgColor: "bg-[#FEF3C7]",
    },
    {
      title: "Tempo Médio",
      value: "2.3s",
      change: "-15%",
      trend: "down",
      icon: Clock,
      color: "text-[#8B5CF6]",
      bgColor: "bg-[#F3E8FF]",
    },
  ];

  const recentAlerts = [
    {
      type: "success",
      message: "WhatsApp +55 11 99999-9999 conectado",
      time: "2 min atrás",
    },
    {
      type: "warning",
      message: "5 conversas aguardando intervenção manual",
      time: "15 min atrás",
    },
    {
      type: "info",
      message: "Nova campanha 'Black Friday' iniciada",
      time: "1 hora atrás",
    },
  ];

  const quickActions = [
    { icon: MessageSquare, label: "Ver Conversas", path: "/conversas" },
    { icon: Send, label: "Nova Campanha", path: "/campanhas" },
    { icon: Users, label: "Adicionar Lead", path: "/crm" },
    { icon: Settings, label: "Configurar IA", path: "/configuracoes" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-white border-r border-[#E5E7EB] transition-all duration-300 flex flex-col fixed md:relative h-full z-50 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-16 border-b border-[#E5E7EB] flex items-center justify-center px-4">
          <img 
            src="/logo.png" 
            alt="JáRespondi" 
            className={sidebarCollapsed ? "h-10" : "h-14"}
          />
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;

            return (
              <Link key={item.path} href={item.path}>
                <div
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "bg-[#FFF9F6] text-[#FF5A2A]"
                      : "text-[#6B7280] hover:bg-[#F3F4F6]"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User */}
        <div className="p-4 border-t border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#FF5A2A] text-white flex items-center justify-center font-semibold">
              U
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#111827] truncate">Usuário</p>
                <p className="text-xs text-[#6B7280] truncate">user@email.com</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full md:w-auto">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#6B7280] md:hidden"
            >
              ☰
            </Button>
            {/* Desktop Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="text-[#6B7280] hidden md:block"
            >
              ☰
            </Button>
            <h1 className="text-lg md:text-xl font-semibold text-[#111827]">Dashboard</h1>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Search - Hidden on mobile */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-64 h-9 pl-10 pr-4 border border-[#E5E7EB] rounded-lg text-sm focus:outline-none focus:border-[#FF5A2A]"
              />
            </div>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4 md:h-5 md:w-5 text-[#6B7280]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#EF4444] rounded-full"></span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {/* Welcome */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-[#111827] mb-2">
              Bem-vindo de volta!
            </h2>
            <p className="text-sm md:text-base text-[#6B7280]">
              Aqui está um resumo do que está acontecendo hoje
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${metric.bgColor} rounded-xl flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${metric.color}`} />
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      {metric.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-[#10B981]" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-[#EF4444]" />
                      )}
                      <span
                        className={
                          metric.trend === "up" ? "text-[#10B981]" : "text-[#EF4444]"
                        }
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-medium text-[#6B7280] mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-3xl font-bold text-[#111827]">{metric.value}</p>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Quick Actions */}
            <Card className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-[#111827] mb-4">
                Ações Rápidas
              </h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Link key={index} href={action.path}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#F9FAFB] transition-colors cursor-pointer">
                        <div className="w-10 h-10 bg-[#FFF9F6] rounded-lg flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[#FF5A2A]" />
                        </div>
                        <span className="text-sm font-medium text-[#111827]">
                          {action.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </Card>

            {/* Recent Alerts */}
            <Card className="p-4 md:p-6 lg:col-span-2">
              <h3 className="text-base md:text-lg font-semibold text-[#111827] mb-4">
                Alertas Recentes
              </h3>
              <div className="space-y-4">
                {recentAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 rounded-lg bg-[#F9FAFB]"
                  >
                    {alert.type === "success" && (
                      <CheckCircle className="h-5 w-5 text-[#10B981] flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === "warning" && (
                      <AlertCircle className="h-5 w-5 text-[#F59E0B] flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === "info" && (
                      <AlertCircle className="h-5 w-5 text-[#FF5A2A] flex-shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-[#111827]">{alert.message}</p>
                      <p className="text-xs text-[#6B7280] mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chart Placeholder */}
          <Card className="p-4 md:p-6 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
              <h3 className="text-base md:text-lg font-semibold text-[#111827]">
                Conversas nos Últimos 7 Dias
              </h3>
              <Button variant="outline" size="sm">
                <ChevronDown className="h-4 w-4 mr-2" />
                Últimos 7 dias
              </Button>
            </div>
            <div className="h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
              <p className="text-[#6B7280]">Gráfico de Conversas</p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
