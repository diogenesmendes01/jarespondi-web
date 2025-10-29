import { useState } from "react";
import { Search, Plus, Edit, Trash2, FileText, Upload, Globe, HelpCircle, X, Check } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/lib/menuItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type KnowledgeItem = {
  id: number;
  title: string;
  category: string;
  source: "manual" | "pdf" | "website" | "faq";
  status: "active" | "inactive";
  content: string;
  updatedAt: string;
};

type ModalType = "manual" | "upload" | "website" | "faq" | null;

export default function BaseConhecimento() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSource, setSelectedSource] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState<ModalType>(null);
  
  // Estados dos modais
  const [manualData, setManualData] = useState({ category: "", title: "", content: "" });
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [websitePages, setWebsitePages] = useState<{title: string, selected: boolean}[]>([]);
  const [faqItems, setFaqItems] = useState<{question: string, answer: string, keywords: string}[]>([]);

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

  const handleAnalyzeWebsite = () => {
    setWebsitePages([
      { title: "Sobre a Escola", selected: true },
      { title: "Mensalidades e Valores", selected: true },
      { title: "Grade Curricular", selected: true },
      { title: "Infraestrutura", selected: true },
      { title: "Como Matricular", selected: true },
      { title: "Perguntas Frequentes", selected: true },
      { title: "Notícias", selected: false },
      { title: "Blog", selected: false }
    ]);
  };

  const addFaqItem = () => {
    setFaqItems([...faqItems, { question: "", answer: "", keywords: "" }]);
  };



  return (
    <div className="min-h-screen bg-[#FFF9F6] flex">
      {/* Sidebar de Navegação Principal */}
      <Sidebar menuItems={dashboardMenuItems} />
      
      {/* Sidebar de Filtros */}
      <aside className="w-64 bg-white border-r border-[#E5E7EB] p-6 space-y-6">
        {/* Categorias */}
        <div>
          <h3 className="text-sm font-semibold text-[#2A1A16] mb-3">📁 Categorias</h3>
          <div className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name.toLowerCase())}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === cat.name.toLowerCase()
                    ? "bg-[#FFF9F6] text-[#FF5A2A]"
                    : "text-[#6B7280] hover:bg-[#F3F4F6]"
                }`}
              >
                {cat.icon} {cat.name} ({cat.count})
              </button>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-3 text-sm">
            + Nova Categoria
          </Button>
        </div>

        {/* Fontes */}
        <div>
          <h3 className="text-sm font-semibold text-[#2A1A16] mb-3">📄 Fontes</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6]">
              ✏️ Manual (10)
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6]">
              📄 PDF (3)
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6]">
              🌐 Website (2)
            </button>
          </div>
        </div>

        {/* Status */}
        <div>
          <h3 className="text-sm font-semibold text-[#2A1A16] mb-3">🤖 Status</h3>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6]">
              ✅ Ativo (13)
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm text-[#6B7280] hover:bg-[#F3F4F6]">
              ⏸️ Inativo (2)
            </button>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2A1A16] mb-2">📚 Base de Conhecimento</h1>
          <p className="text-[#6B7280]">Configure as informações que a IA pode usar</p>
        </div>

        {/* Barra de Ações */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9CA3AF]" />
            <Input
              placeholder="Buscar conhecimento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={() => setModalOpen("manual")} className="gap-2">
              <FileText className="h-4 w-4" />
              Manual
            </Button>
            <Button onClick={() => setModalOpen("upload")} variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Upload
            </Button>
            <Button onClick={() => setModalOpen("website")} variant="outline" className="gap-2">
              <Globe className="h-4 w-4" />
              Website
            </Button>
            <Button onClick={() => setModalOpen("faq")} variant="outline" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              FAQ
            </Button>
          </div>
        </div>

        {/* Grid de Conhecimentos */}
        <div className="grid gap-4">
          {knowledgeItems.map((item) => (
            <Card key={item.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">
                      {item.category === "Preços" ? "💰" : "⏰"}
                    </span>
                    <h3 className="text-lg font-semibold text-[#2A1A16]">{item.title}</h3>
                  </div>
                  <p className="text-sm text-[#6B7280] mb-3">Atualizado {item.updatedAt}</p>
                  <div className="bg-[#F9FAFB] p-4 rounded-lg">
                    <pre className="text-sm text-[#3A2A25] whitespace-pre-wrap font-sans">
                      {item.content}
                    </pre>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal: Adicionar Manual */}
        <Dialog open={modalOpen === "manual"} onOpenChange={() => setModalOpen(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>✏️ Adicionar Conhecimento Manual</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#2A1A16] mb-2 block">Categoria:</label>
                <Select value={manualData.category} onValueChange={(v) => setManualData({...manualData, category: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="precos">💰 Preços</SelectItem>
                    <SelectItem value="horarios">⏰ Horários</SelectItem>
                    <SelectItem value="processos">📝 Processos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-[#2A1A16] mb-2 block">Título:</label>
                <Input
                  placeholder="Ex: Valores das Mensalidades 2025"
                  value={manualData.title}
                  onChange={(e) => setManualData({...manualData, title: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#2A1A16] mb-2 block">Conteúdo:</label>
                <Textarea
                  placeholder="Digite o conteúdo aqui..."
                  value={manualData.content}
                  onChange={(e) => setManualData({...manualData, content: e.target.value})}
                  rows={12}
                  className="font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(null)}>Cancelar</Button>
                <Button>Salvar</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal: Upload de Arquivo */}
        <Dialog open={modalOpen === "upload"} onOpenChange={() => setModalOpen(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>📄 Adicionar via Upload</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-[#E5E7EB] rounded-lg p-12 text-center">
                <Upload className="h-12 w-12 text-[#9CA3AF] mx-auto mb-4" />
                <p className="text-[#2A1A16] font-medium mb-2">📎 Arraste arquivos aqui</p>
                <p className="text-sm text-[#6B7280] mb-1">ou clique para selecionar</p>
                <p className="text-xs text-[#9CA3AF]">Aceita: PDF, Word, Excel, TXT</p>
                <p className="text-xs text-[#9CA3AF]">Tamanho máximo: 10MB</p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#2A1A16] mb-2">Arquivos selecionados:</p>
                <div className="bg-[#F9FAFB] p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-[#3A2A25]">📄 Manual_do_Aluno_2025.pdf (2.3 MB)</span>
                    <Button variant="ghost" size="sm">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="w-full bg-[#E5E7EB] rounded-full h-2">
                    <div className="bg-[#FF5A2A] h-2 rounded-full" style={{width: "80%"}}></div>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-1">Processando... 80%</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#2A1A16] mb-2 block">Categoria automática:</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="📝 Processos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="processos">📝 Processos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(null)}>Cancelar</Button>
                <Button>Fazer Upload</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal: Importar Website */}
        <Dialog open={modalOpen === "website"} onOpenChange={() => setModalOpen(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>🌐 Importar do Website</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#2A1A16] mb-2 block">URL do seu site:</label>
                <Input
                  placeholder="https://escolafuturo.com.br"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                />
              </div>

              <Button onClick={handleAnalyzeWebsite} variant="outline" className="w-full">
                🔍 Analisar Site
              </Button>

              {websitePages.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-[#2A1A16] mb-3">
                    ✅ Encontramos {websitePages.length} páginas relevantes:
                  </p>
                  <div className="space-y-2">
                    {websitePages.map((page, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Checkbox
                          checked={page.selected}
                          onCheckedChange={(checked) => {
                            const updated = [...websitePages];
                            updated[idx].selected = !!checked;
                            setWebsitePages(updated);
                          }}
                        />
                        <span className="text-sm text-[#3A2A25]">{page.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(null)}>Cancelar</Button>
                <Button disabled={websitePages.filter(p => p.selected).length === 0}>
                  Importar {websitePages.filter(p => p.selected).length}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal: FAQ */}
        <Dialog open={modalOpen === "faq"} onOpenChange={() => setModalOpen(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>📊 Perguntas e Respostas Frequentes</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Button onClick={addFaqItem} variant="outline" className="w-full">
                + Adicionar Pergunta
              </Button>

              {faqItems.map((item, idx) => (
                <Card key={idx} className="p-4">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-[#2A1A16] mb-1 block">Pergunta:</label>
                      <Input
                        placeholder="Ex: Quanto custa a mensalidade?"
                        value={item.question}
                        onChange={(e) => {
                          const updated = [...faqItems];
                          updated[idx].question = e.target.value;
                          setFaqItems(updated);
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2A1A16] mb-1 block">Resposta:</label>
                      <Textarea
                        placeholder="Digite a resposta..."
                        value={item.answer}
                        onChange={(e) => {
                          const updated = [...faqItems];
                          updated[idx].answer = e.target.value;
                          setFaqItems(updated);
                        }}
                        rows={4}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-[#2A1A16] mb-1 block">Palavras-chave:</label>
                      <Input
                        placeholder="Ex: preço, valor, custo, quanto"
                        value={item.keywords}
                        onChange={(e) => {
                          const updated = [...faqItems];
                          updated[idx].keywords = e.target.value;
                          setFaqItems(updated);
                        }}
                      />
                    </div>
                    <div className="flex gap-2 justify-end">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFaqItems(faqItems.filter((_, i) => i !== idx))}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(null)}>Cancelar</Button>
                <Button>Salvar FAQ</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
