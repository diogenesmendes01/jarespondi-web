import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader2, MessageSquare, Search, Filter } from "lucide-react";
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

export default function Conversas() {
  const { data: conversations, isLoading } = trpc.conversations.list.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredConversations = conversations?.filter((conv) => {
    const matchesStatus = statusFilter === "all" || conv.status === statusFilter;
    return matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      ativa: { label: "Ativa", variant: "default" as const },
      finalizada: { label: "Finalizada", variant: "secondary" as const },
      abandonada: { label: "Abandonada", variant: "destructive" as const },
    };
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge variant={statusInfo?.variant || "default"}>
        {statusInfo?.label || status}
      </Badge>
    );
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
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Conversas</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie e acompanhe todas as conversas com seus clientes
            </p>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar conversas..."
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
                  <SelectItem value="ativa">Ativa</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                  <SelectItem value="abandonada">Abandonada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Conversations List */}
        {filteredConversations && filteredConversations.length > 0 ? (
          <div className="grid gap-4">
            {filteredConversations.map((conversation) => (
              <Card key={conversation.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            Conversa #{conversation.id}
                          </h3>
                          {getStatusBadge(conversation.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Contato ID: {conversation.contactId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Última mensagem:{" "}
                          {conversation.lastMessageAt
                            ? new Date(conversation.lastMessageAt).toLocaleString("pt-BR")
                            : "Nenhuma mensagem"}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Nenhuma conversa encontrada
              </h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                {statusFilter !== "all"
                  ? "Não há conversas com este status. Tente alterar os filtros."
                  : "Quando você começar a receber mensagens, elas aparecerão aqui."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
