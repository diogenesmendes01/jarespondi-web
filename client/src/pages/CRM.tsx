import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, Users, Plus, Search, Filter, MoreVertical, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function CRM() {
  const { data: contacts, isLoading, refetch } = trpc.contacts.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newContact, setNewContact] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const createMutation = trpc.contacts.create.useMutation({
    onSuccess: () => {
      toast.success("Contato criado com sucesso!");
      setIsCreateDialogOpen(false);
      setNewContact({ name: "", phoneNumber: "", email: "", notes: "" });
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao criar contato: " + error.message);
    },
  });

  const deleteMutation = trpc.contacts.delete.useMutation({
    onSuccess: () => {
      toast.success("Contato excluído com sucesso!");
      refetch();
    },
    onError: (error) => {
      toast.error("Erro ao excluir contato: " + error.message);
    },
  });

  const filteredContacts = contacts?.filter((contact) => {
    const matchesSearch =
      contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phoneNumber.includes(searchTerm) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      novo: { label: "Novo", variant: "default" as const, color: "bg-blue-500" },
      qualificado: { label: "Qualificado", variant: "secondary" as const, color: "bg-purple-500" },
      negociacao: { label: "Negociação", variant: "default" as const, color: "bg-yellow-500" },
      ganho: { label: "Ganho", variant: "default" as const, color: "bg-green-500" },
      perdido: { label: "Perdido", variant: "destructive" as const, color: "bg-red-500" },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusInfo?.variant || "default"} className={statusInfo?.color}>
        {statusInfo?.label || status}
      </Badge>
    );
  };

  const handleCreateContact = () => {
    if (!newContact.phoneNumber) {
      toast.error("Número de telefone é obrigatório");
      return;
    }
    createMutation.mutate(newContact);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm("Tem certeza que deseja excluir este contato?")) {
      deleteMutation.mutate({ id });
    }
  };

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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">CRM</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus contatos e leads
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Contato
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Criar Novo Contato</DialogTitle>
                <DialogDescription>
                  Adicione um novo contato ao seu CRM
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome</Label>
                  <Input
                    id="name"
                    value={newContact.name}
                    onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                    placeholder="Nome do contato"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone *</Label>
                  <Input
                    id="phone"
                    value={newContact.phoneNumber}
                    onChange={(e) => setNewContact({ ...newContact, phoneNumber: e.target.value })}
                    placeholder="+55 11 99999-9999"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newContact.email}
                    onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    value={newContact.notes}
                    onChange={(e) => setNewContact({ ...newContact, notes: e.target.value })}
                    placeholder="Notas sobre o contato"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateContact} disabled={createMutation.isPending}>
                  {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Criar Contato
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, telefone ou email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="novo">Novo</SelectItem>
                  <SelectItem value="qualificado">Qualificado</SelectItem>
                  <SelectItem value="negociacao">Negociação</SelectItem>
                  <SelectItem value="ganho">Ganho</SelectItem>
                  <SelectItem value="perdido">Perdido</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Grid */}
        {filteredContacts && filteredContacts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.map((contact) => (
              <Card key={contact.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(contact.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-foreground text-lg">
                      {contact.name || "Sem nome"}
                    </h3>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {contact.phoneNumber}
                      </div>
                      {contact.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      )}
                    </div>
                    {contact.notes && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                        {contact.notes}
                      </p>
                    )}
                    {contact.dealValue && contact.dealValue > 0 && (
                      <p className="text-sm font-semibold text-primary mt-2">
                        Valor: R$ {(contact.dealValue / 100).toFixed(2)}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhum contato encontrado
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md mb-4">
                {searchTerm || statusFilter !== "all"
                  ? "Não há contatos que correspondam aos filtros aplicados."
                  : "Comece adicionando seus primeiros contatos ao CRM."}
              </p>
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Primeiro Contato
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
