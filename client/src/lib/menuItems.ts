import { LayoutDashboard, MessageSquare, Users, Send, BarChart3, MessageCircle, BookOpen, Settings } from "lucide-react";

export const dashboardMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: MessageSquare, label: "Conversas", path: "/dashboard/conversas" },
  { icon: Users, label: "CRM", path: "/dashboard/crm" },
  { icon: Send, label: "Campanhas", path: "/dashboard/campanhas" },
  { icon: BarChart3, label: "Analytics", path: "/dashboard/analytics" },
  { icon: MessageCircle, label: "WhatsApp", path: "/dashboard/whatsapp" },
  { icon: BookOpen, label: "Base de Conhecimento", path: "/dashboard/base-conhecimento" },
  { icon: Settings, label: "Configurações", path: "/dashboard/configuracoes" },
];
