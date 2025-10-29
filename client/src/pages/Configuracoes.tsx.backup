import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Plus, Smartphone, Zap, Bot, Webhook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Configuracoes() {
  const { data: connections, isLoading: connectionsLoading, refetch: refetchConnections } = trpc.connections.list.useQuery();
  const { data: aiConfig, isLoading: aiLoading, refetch: refetchAI } = trpc.aiConfig.get.useQuery();
  const { data: integrations, isLoading: integrationsLoading, refetch: refetchIntegrations } = trpc.integrations.list.useQuery();
  
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false);
  const [isAIDialogOpen, setIsAIDialogOpen] = useState(false);
  const [isIntegrationDialogOpen, setIsIntegrationDialogOpen] = useState(false);
  
  const [newConnection, setNewConnection] = useState({
    phoneNumber: "",
    connectionType: "web" as "web" | "api",
    apiKey: "",
  });

  const [aiConfigData, setAiConfigData] = useState({
    name: "Agente Principal",
    systemPrompt: "",
    temperature: 70,
  });

  // Atualizar aiConfigData quando aiConfig carregar
  useEffect(() => {
    if (aiConfig) {
      setAiConfigData({
        name: aiConfig.name || "Agente Principal",
        systemPrompt: aiConfig.systemPrompt || "",
        temperature: aiConfig.temperature || 70,
      });
    }
  }, [aiConfig]);

  const [newIntegration, setNewIntegration] = useState({
    type: "webhook" as "google_calendar" | "webhook" | "api",
    name: "",
    config: "",
  });

  const createConnectionMutation = trpc.connections.create.useMutation({
    onSuccess: () => {
      toast.success("Conexão criada com sucesso!");
      setIsConnectionDialogOpen(false);
      setNewConnection({ phoneNumber: "", connectionType: "web", apiKey: "" });
      refetchConnections();
    },
    onError: (error) => {
      toast.error("Erro ao criar conexão: " + error.message);
    },
  });

  const createAIConfigMutation = trpc.aiConfig.create.useMutation({
    onSuccess: () => {
      toast.success("Configuração de IA salva com sucesso!");
      setIsAIDialogOpen(false);
      refetchAI();
    },
    onError: (error) => {
      toast.error("Erro ao salvar configuração: " + error.message);
    },
  });

  const createIntegrationMutation = trpc.integrations.create.useMutation({
    onSuccess: () => {
      toast.success("Integração criada com sucesso!");
      setIsIntegrationDialogOpen(false);
      setNewIntegration({ type: "webhook", name: "", config: "" });
      refetchIntegrations();
    },
    onError: (error) => {
      toast.error("Erro ao criar integração: " + error.message);
    },
  });

  const handleCreateConnection = () => {
    if (!newConnection.phoneNumber) {
      toast.error("Número de telefone é obrigatório");
      return;
    }
    if (newConnection.connectionType === "api" && !newConnection.apiKey) {
      toast.error("API Key é obrigatória para conexão via API");
      return;
    }
    createConnectionMutation.mutate(newConnection);
  };

  const handleSaveAIConfig = () => {
    if (!aiConfigData.systemPrompt) {
      toast.error("Prompt do sistema é obrigatório");
      return;
    }
    createAIConfigMutation.mutate(aiConfigData);
  };

  const handleCreateIntegration = () => {
    if (!newIntegration.name || !newIntegration.config) {
      toast.error("Nome e configuração são obrigatórios");
      return;
    }
    createIntegrationMutation.mutate(newIntegration);
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: "Ativo", variant: "default" as const },
      disconnected: { label: "Desconectado", variant: "destructive" as const },
      pending: { label: "Pendente", variant: "secondary" as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusInfo?.variant || "default"}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const isLoading = connectionsLoading || aiLoading || integrationsLoading;

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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Configurações</h1>
          <p className="text-muted-foreground mt-1">
            Configure conexões WhatsApp, IA e integrações
          </p>
        </div>

        <Tabs defaultValue="whatsapp" className="space-y-6">
          <TabsList>
            <TabsTrigger value="whatsapp">
              <Smartphone className="mr-2 h-4 w-4" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="ia">
              <Bot className="mr-2 h-4 w-4" />
              Agente IA
            </TabsTrigger>
            <TabsTrigger value="integracoes">
              <Webhook className="mr-2 h-4 w-4" />
              Integrações
            </TabsTrigger>
          </TabsList>

          {/* WhatsApp Tab */}
          <TabsContent value="whatsapp" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Conexões WhatsApp</h2>
                <p className="text-sm text-muted-foreground">
                  Gerencie suas conexões com o WhatsApp
                </p>
              </div>
              <Dialog open={isConnectionDialogOpen} onOpenChange={setIsConnectionDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Conexão
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Conexão WhatsApp</DialogTitle>
                    <DialogDescription>
                      Configure uma nova conexão com o WhatsApp
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de Telefone *</Label>
                      <Input
                        id="phone"
                        value={newConnection.phoneNumber}
                        onChange={(e) => setNewConnection({ ...newConnection, phoneNumber: e.target.value })}
                        placeholder="+55 11 99999-9999"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Tipo de Conexão *</Label>
                      <Select
                        value={newConnection.connectionType}
                        onValueChange={(value: "web" | "api") =>
                          setNewConnection({ ...newConnection, connectionType: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">WhatsApp Web (não oficial)</SelectItem>
                          <SelectItem value="api">WhatsApp API Oficial</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {newConnection.connectionType === "api" && (
                      <div className="space-y-2">
                        <Label htmlFor="apiKey">API Key *</Label>
                        <Input
                          id="apiKey"
                          type="password"
                          value={newConnection.apiKey}
                          onChange={(e) => setNewConnection({ ...newConnection, apiKey: e.target.value })}
                          placeholder="Sua API Key do WhatsApp Business"
                        />
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsConnectionDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateConnection} disabled={createConnectionMutation.isPending}>
                      {createConnectionMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Adicionar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {connections && connections.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {connections.map((connection) => (
                  <Card key={connection.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Smartphone className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{connection.phoneNumber}</CardTitle>
                            <CardDescription className="text-xs">
                              {connection.connectionType === "web" ? "WhatsApp Web" : "API Oficial"}
                            </CardDescription>
                          </div>
                        </div>
                        {getStatusBadge(connection.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Última conexão:</span>
                          <span className="font-medium">
                            {connection.lastConnected
                              ? new Date(connection.lastConnected).toLocaleDateString("pt-BR")
                              : "Nunca"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhuma conexão configurada
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Adicione sua primeira conexão WhatsApp para começar a usar o sistema.
                  </p>
                  <Button onClick={() => setIsConnectionDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Primeira Conexão
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* IA Tab */}
          <TabsContent value="ia" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuração do Agente IA</CardTitle>
                <CardDescription>
                  Personalize o comportamento do agente de IA
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="aiName">Nome do Agente</Label>
                  <Input
                    id="aiName"
                    value={aiConfigData.name}
                    onChange={(e) => setAiConfigData({ ...aiConfigData, name: e.target.value })}
                    placeholder="Ex: Assistente de Vendas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemPrompt">Prompt do Sistema</Label>
                  <Textarea
                    id="systemPrompt"
                    value={aiConfigData.systemPrompt}
                    onChange={(e) => setAiConfigData({ ...aiConfigData, systemPrompt: e.target.value })}
                    placeholder="Você é um assistente de vendas especializado em..."
                    rows={8}
                  />
                  <p className="text-xs text-muted-foreground">
                    Defina como o agente deve se comportar e responder aos clientes
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Criatividade (0-100)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    min="0"
                    max="100"
                    value={aiConfigData.temperature}
                    onChange={(e) => setAiConfigData({ ...aiConfigData, temperature: parseInt(e.target.value) })}
                  />
                  <p className="text-xs text-muted-foreground">
                    Valores mais altos tornam as respostas mais criativas e variadas
                  </p>
                </div>
                <Button onClick={handleSaveAIConfig} disabled={createAIConfigMutation.isPending}>
                  {createAIConfigMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Salvar Configuração
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrações Tab */}
          <TabsContent value="integracoes" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-foreground">Integrações</h2>
                <p className="text-sm text-muted-foreground">
                  Conecte com serviços externos
                </p>
              </div>
              <Dialog open={isIntegrationDialogOpen} onOpenChange={setIsIntegrationDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Nova Integração
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Integração</DialogTitle>
                    <DialogDescription>
                      Configure uma nova integração externa
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="integrationType">Tipo de Integração</Label>
                      <Select
                        value={newIntegration.type}
                        onValueChange={(value: "google_calendar" | "webhook" | "api") =>
                          setNewIntegration({ ...newIntegration, type: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google_calendar">Google Calendar</SelectItem>
                          <SelectItem value="webhook">Webhook</SelectItem>
                          <SelectItem value="api">API Externa</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="integrationName">Nome</Label>
                      <Input
                        id="integrationName"
                        value={newIntegration.name}
                        onChange={(e) => setNewIntegration({ ...newIntegration, name: e.target.value })}
                        placeholder="Nome da integração"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="integrationConfig">Configuração (JSON)</Label>
                      <Textarea
                        id="integrationConfig"
                        value={newIntegration.config}
                        onChange={(e) => setNewIntegration({ ...newIntegration, config: e.target.value })}
                        placeholder='{"url": "https://...", "apiKey": "..."}'
                        rows={5}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsIntegrationDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateIntegration} disabled={createIntegrationMutation.isPending}>
                      {createIntegrationMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Adicionar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {integrations && integrations.length > 0 ? (
              <div className="grid gap-4">
                {integrations.map((integration) => (
                  <Card key={integration.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <CardDescription className="text-xs capitalize">
                              {integration.type.replace("_", " ")}
                            </CardDescription>
                          </div>
                        </div>
                        <Badge variant={integration.isActive ? "default" : "secondary"}>
                          {integration.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Webhook className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Nenhuma integração configurada
                  </h3>
                  <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                    Adicione integrações para conectar com serviços externos.
                  </p>
                  <Button onClick={() => setIsIntegrationDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Adicionar Primeira Integração
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
