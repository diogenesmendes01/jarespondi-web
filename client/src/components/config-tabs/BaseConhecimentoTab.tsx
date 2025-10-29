import { useState } from "react";
import { Search, Plus, Edit, Trash2, FileText, Upload, Globe, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

type KnowledgeItem = {
  id: number;
  title: string;
  category: string;
  source: "manual" | "pdf" | "website" | "faq";
  status: "active" | "inactive";
  content: string;
  updatedAt: string;
};

export default function BaseConhecimentoTab() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const knowledgeItems: KnowledgeItem[] = [
    {
      id: 1,
      title: "Mensalidades 2025",
      category: "Preços",
      source: "manual",
      status: "active",
      content: "Fundamental I: R$ 950/mês\nEnsino Médio: R$ 1.300/mês",
      updatedAt: "há 2 dias"
    },
    {
      id: 2,
      title: "Horários",
      category: "Horários",
      source: "manual",
      status: "active",
      content: "Manhã: 7h-12h\nTarde: 13h-18h",
      updatedAt: "há 1 semana"
    }
  ];

  const categories = [
    { name: "Todas", count: 15, icon: "📁" },
    { name: "Preços", count: 4, icon: "💰" },
    { name: "Horários", count: 2, icon: "⏰" },
    { name: "Processos", count: 3, icon: "📝" },
    { name: "Contato", count: 1, icon: "📞" },
    { name: "Cursos", count: 5, icon: "🎓" }
  ];

  const getSourceIcon = (source: string) => {
    switch (source) {
      case "manual": return <FileText className="h-4 w-4" />;
      case "pdf": return <Upload className="h-4 w-4" />;
      case "website": return <Globe className="h-4 w-4" />;
      case "faq": return <HelpCircle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex gap-6">
      {/* Sidebar de Filtros */}
      <div className="w-64 space-y-6">
        {/* Categorias */}
        <div>
          <h3 className="text-sm font-semibold text-[#111827] mb-3">CATEGORIAS</h3>
          <div className="space-y-1">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === "all"
                  ? "bg-[#FF5A2A] text-white"
                  : "text-[#6B7280] hover:bg-[#F3F4F6]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span>📁</span>
                <span>Todas</span>
              </span>
              <span className="text-xs">15</span>
            </button>
            {categories.slice(1).map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-[#FF5A2A] text-white"
                    : "text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
                <span className="text-xs">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Adicionar Conteúdo */}
        <div className="pt-4 border-t border-[#E5E7EB]">
          <h3 className="text-sm font-semibold text-[#111827] mb-3">ADICIONAR CONTEÚDO</h3>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start text-sm">
              <FileText className="h-4 w-4 mr-2" />
              Manual
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Upload className="h-4 w-4 mr-2" />
              Upload PDF
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <Globe className="h-4 w-4 mr-2" />
              Website
            </Button>
            <Button variant="outline" className="w-full justify-start text-sm">
              <HelpCircle className="h-4 w-4 mr-2" />
              FAQ
            </Button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex-1 space-y-4">
        {/* Header com Busca */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6B7280]" />
            <Input
              placeholder="Buscar na base de conhecimento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button className="bg-[#FF5A2A] hover:bg-[#E4491F] text-white">
            <Plus className="h-4 w-4 mr-2" />
            Novo Conteúdo
          </Button>
        </div>

        {/* Lista de Itens */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Card key={item.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-[#6B7280]">
                      {getSourceIcon(item.source)}
                    </div>
                    <h3 className="text-base font-semibold text-[#111827]">
                      {item.title}
                    </h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-[#F3F4F6] text-[#6B7280]">
                      {item.category}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.status === "active"
                          ? "bg-[#D1FAE5] text-[#065F46]"
                          : "bg-[#FEE2E2] text-[#991B1B]"
                      }`}
                    >
                      {item.status === "active" ? "Ativo" : "Inativo"}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B7280] line-clamp-2">
                    {item.content}
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-2">
                    Atualizado {item.updatedAt}
                  </p>
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
      </div>
    </div>
  );
}
