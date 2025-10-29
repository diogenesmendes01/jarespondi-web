import Sidebar from "@/components/Sidebar";
import { dashboardMenuItems } from "@/lib/menuItems";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Megaphone, Plus, MoreVertical, Calendar, Users, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";

export default function Campanhas() {
  const { data: campaigns, isLoading, refetch } = trpc.campaigns.list.useQuery();
  const { data: connections } = trpc.connections.list.useQuery();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    description: "",
    messageTemplate: "",
    connectionId: 0,
  });

  const createMutation = trpc.campaigns.create.useMutation({
    onSuccess: () => {
      toast.success("Campanha criada com sucesso!");
      setIsCreateDialogOpen(false);
      setNewCampaign({ name: "", description: "", messageTemplate: "", connectionId: 0 });
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao criar campanha: " + error.message);
    },
  });

  const deleteMutation = trpc.campaigns.delete.useMutation({
    onSuccess: () => {
      toast.success("Campanha excluída com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao excluir campanha: " + error.message);
    },
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      rascunho: { label: "Rascunho", variant: "secondary" as const },
      agendada: { label: "Agendada", variant: "default" as const },
      ativa: { label: "Ativa", variant: "default" as const },
      pausada: { label: "Pausada", variant: "destructive" as const },
      finalizada: { label: "Finalizada", variant: "outline" as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusInfo?.variant || "default"}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const handleCreateCampaign = () => {
    if (!newCampaign.name || !newCampaign.messageTemplate) {
      toast.error("Nome e mensagem são obrigatórios");
      return;
    }
    if (!newCampaign.connectionId && connections && connections.length > 0) {
      newCampaign.connectionId = connections[0].id;
    }
    createMutation.mutate(newCampaign);
  };

  const handleDeleteCampaign = (id: number) => {
    if (confirm("Tem certeza que deseja excluir esta campanha?")) {
      deleteMutation.mutate({ id });
    }
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Campanhas</h1>
            <p className="text-muted-foreground mt-1">
              Crie e gerencie campanhas de vendas ativas
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nova Campanha
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Nova Campanha</DialogTitle>
                <DialogDescription>
                  Configure uma nova campanha de vendas ativa
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Campanha *</Label>
                  <Input
                    id="name"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                    placeholder="Ex: Promoção de Verão 2024"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Input
                    id="description"
                    value={newCampaign.description}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                    placeholder="Breve descrição da campanha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    value={newCampaign.messageTemplate}
                    onChange={(e) => setNewCampaign({ ...newCampaign, messageTemplate: e.target.value })}
                    placeholder="Olá {nome}, temos uma oferta especial para você..."
                    rows={5}
                  />
                  <p className="text-xs text-muted-foreground">
                    Use variáveis como {"{nome}"} para personalização automática
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateCampaign} disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Campanha
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Campaigns Grid */}
        {campaigns && campaigns.length > 0 ? (
          <div className="grid gap-4">
            {campaigns.map((campaign) => {
              const deliveryRate = (campaign.totalContacts ?? 0) > 0
                ? ((campaign.deliveredCount ?? 0) / (campaign.totalContacts ?? 1)) * 100
                : 0;
              const responseRate = (campaign.sentCount ?? 0) > 0
                ? ((campaign.responseCount ?? 0) / (campaign.sentCount ?? 1)) * 100
                : 0;

              return (
                <Card key={campaign.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">{campaign.name}</CardTitle>
                          {getStatusBadge(campaign.status)}
                        </div>
                        {campaign.description && (
                          <CardDescription>{campaign.description}</CardDescription>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Duplicar</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteCampaign(campaign.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="text-xs">Contatos</span>
                          </div>
                          <p className="text-2xl font-bold text-foreground">
                            {campaign.totalContacts}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Send className="h-4 w-4" />
                            <span className="text-xs">Enviadas</span>
                          </div>
                          <p className="text-2xl font-bold text-foreground">
                            {campaign.sentCount}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Megaphone className="h-4 w-4" />
                            <span className="text-xs">Respostas</span>
                          </div>
                          <p className="text-2xl font-bold text-foreground">
                            {campaign.responseCount}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs">Conversões</span>
                          </div>
                          <p className="text-2xl font-bold text-primary">
                            {campaign.conversionCount}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bars */}
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Taxa de Entrega</span>
                            <span className="font-medium">{deliveryRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={deliveryRate} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Taxa de Resposta</span>
                            <span className="font-medium">{responseRate.toFixed(1)}%</span>
                          </div>
                          <Progress value={responseRate} className="h-2" />
                        </div>
                      </div>

                      {/* Message Preview */}
                      <div className="rounded-lg bg-muted p-3">
                        <p className="text-xs text-muted-foreground mb-1">Mensagem:</p>
                        <p className="text-sm text-foreground line-clamp-2">
                          {campaign.messageTemplate}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          Ver Detalhes
                        </Button>
                        {campaign.status === "rascunho" && (
                          <Button size="sm" className="flex-1">
                            Iniciar Campanha
                          </Button>
                        )}
                        {campaign.status === "ativa" && (
                          <Button variant="destructive" size="sm" className="flex-1">
                            Pausar Campanha
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Megaphone className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhuma campanha criada
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                Crie sua primeira campanha de vendas ativa para começar a prospectar clientes.
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeira Campanha
              </Button>
            </CardContent>
          </Card>
        )}
        </div>
      </div>
    </div>
  );
}
