import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type MenuItem = {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

type SidebarProps = {
  menuItems: MenuItem[];
};

export default function Sidebar({ menuItems }: SidebarProps) {
  const [location] = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const logoutMutation = trpc.auth.logout.useMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      toast.success("Logout realizado com sucesso!");
      window.location.href = "/";
    } catch (error) {
      toast.error("Erro ao fazer logout");
    }
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white border-r border-[#E5E7EB] transition-all duration-300 flex flex-col`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#E5E7EB]">
        {!collapsed && (
          <img
            src="/logo.png"
            alt="JáRespondi"
            className="h-auto"
            style={{marginLeft: '53px', width: '100px', height: '80px', objectFit: 'fill'}}
          />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 hover:bg-[#F3F4F6] rounded-lg transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5 text-[#6B7280]" />
          ) : (
            <ChevronLeft className="h-5 w-5 text-[#6B7280]" />
          )}
        </button>
      </div>

      {/* Menu de Navegação */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Perfil do Usuário (Rodapé) */}
      <div className="p-4 border-t border-[#E5E7EB]">
        {user && (
          <div className="space-y-3">
            {/* Info do Usuário */}
            {!collapsed ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FF5A2A] rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111827] truncate">
                    {user.name || "Usuário"}
                  </p>
                  <p className="text-xs text-[#6B7280] truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-10 h-10 bg-[#FF5A2A] rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </div>
            )}

            {/* Botão de Logout */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6] transition-colors ${
                collapsed ? "justify-center" : ""
              }`}
            >
              <LogOut className="h-4 w-4" />
              {!collapsed && <span>Sair</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
