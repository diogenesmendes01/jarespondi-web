import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMenuItems } from "@/lib/menuItems";
import { MessageCircle, BookOpen, FileText } from "lucide-react";

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
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-semibold text-[#111827] mb-4">Configurações do WhatsApp</h2>
                <p className="text-[#6B7280]">Conteúdo da página WhatsAppAgents será movido para cá...</p>
              </div>
            </TabsContent>

            {/* Aba Base de Conhecimento */}
            <TabsContent value="knowledge" className="space-y-4">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-semibold text-[#111827] mb-4">Base de Conhecimento</h2>
                <p className="text-[#6B7280]">Conteúdo da página BaseConhecimento será movido para cá...</p>
              </div>
            </TabsContent>

            {/* Aba Regras de Negócio */}
            <TabsContent value="rules" className="space-y-4">
              <div className="bg-white rounded-lg border border-[#E5E7EB] p-6">
                <h2 className="text-lg font-semibold text-[#111827] mb-4">Regras de Negócio</h2>
                <p className="text-[#6B7280]">Nova seção para regras de negócio...</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
