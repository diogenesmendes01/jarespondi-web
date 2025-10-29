import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMenuItems } from "@/lib/menuItems";
import { MessageCircle, BookOpen, FileText } from "lucide-react";
import WhatsAppTab from "@/components/config-tabs/WhatsAppTab";
import BaseConhecimentoTab from "@/components/config-tabs/BaseConhecimentoTab";
import RegrasNegocioTab from "@/components/config-tabs/RegrasNegocioTab";

export default function Configuracoes() {
  return (
    <div className="flex h-screen bg-[#F9FAFB]">
      <Sidebar menuItems={dashboardMenuItems} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] flex items-center justify-between px-8">
          <h1 className="text-xl font-semibold text-[#111827]">Configurações</h1>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <Tabs defaultValue="whatsapp" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3 mb-8">
              <TabsTrigger value="whatsapp" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="knowledge" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Base de Conhecimento
              </TabsTrigger>
              <TabsTrigger value="rules" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Regras de Negócio
              </TabsTrigger>
            </TabsList>

            {/* Aba WhatsApp */}
            <TabsContent value="whatsapp" className="space-y-4">
              <WhatsAppTab />
            </TabsContent>

            {/* Aba Base de Conhecimento */}
            <TabsContent value="knowledge" className="space-y-4">
              <BaseConhecimentoTab />
            </TabsContent>

            {/* Aba Regras de Negócio */}
            <TabsContent value="rules" className="space-y-4">
              <RegrasNegocioTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
