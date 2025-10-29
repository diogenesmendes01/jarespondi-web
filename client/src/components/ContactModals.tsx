import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  status: string;
  tags: string;
};

type AddContactModalProps = {
  open: boolean;
  onClose: () => void;
  onAdd: (contact: any) => void;
};

export function AddContactModal({ open, onClose, onAdd }: AddContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    status: "Novo Lead",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Nome e telefone são obrigatórios!");
      return;
    }

    const newContact = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      score: 50,
      status: formData.status,
      lastContact: "Agora",
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    onAdd(newContact);
    toast.success("Contato adicionado com sucesso!");
    setFormData({ name: "", phone: "", email: "", status: "Novo Lead", tags: "" });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111827]">Adicionar Novo Contato</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-[#374151]">
              Nome Completo *
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: João Silva"
              className="border-[#E5E7EB]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-[#374151]">
              Telefone *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ex: +55 11 98765-4321"
              className="border-[#E5E7EB]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-[#374151]">
              E-mail
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ex: joao@email.com"
              className="border-[#E5E7EB]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-[#374151]">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-[#E5E7EB]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novo Lead">Novo Lead</SelectItem>
                <SelectItem value="Qualificado">Qualificado</SelectItem>
                <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                <SelectItem value="Cliente">Cliente</SelectItem>
                <SelectItem value="Perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags" className="text-sm font-medium text-[#374151]">
              Tags (separadas por vírgula)
            </Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Ex: VIP, Urgente, Interessado"
              className="border-[#E5E7EB]"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FF5A2A] hover:bg-[#E54A1A] text-white"
            >
              Adicionar Contato
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type EditContactModalProps = {
  open: boolean;
  onClose: () => void;
  onUpdate: (contact: any) => void;
  contact: any;
};

export function EditContactModal({ open, onClose, onUpdate, contact }: EditContactModalProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    status: "Novo Lead",
    tags: "",
  });

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || "",
        phone: contact.phone || "",
        email: contact.email || "",
        status: contact.status || "Novo Lead",
        tags: contact.tags?.join(", ") || "",
      });
    }
  }, [contact]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error("Nome e telefone são obrigatórios!");
      return;
    }

    const updatedContact = {
      ...contact,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      status: formData.status,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    };

    onUpdate(updatedContact);
    toast.success("Contato atualizado com sucesso!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111827]">Editar Contato</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name" className="text-sm font-medium text-[#374151]">
              Nome Completo *
            </Label>
            <Input
              id="edit-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: João Silva"
              className="border-[#E5E7EB]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-phone" className="text-sm font-medium text-[#374151]">
              Telefone *
            </Label>
            <Input
              id="edit-phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Ex: +55 11 98765-4321"
              className="border-[#E5E7EB]"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email" className="text-sm font-medium text-[#374151]">
              E-mail
            </Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="Ex: joao@email.com"
              className="border-[#E5E7EB]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status" className="text-sm font-medium text-[#374151]">
              Status
            </Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger className="border-[#E5E7EB]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Novo Lead">Novo Lead</SelectItem>
                <SelectItem value="Qualificado">Qualificado</SelectItem>
                <SelectItem value="Em Negociação">Em Negociação</SelectItem>
                <SelectItem value="Proposta Enviada">Proposta Enviada</SelectItem>
                <SelectItem value="Cliente">Cliente</SelectItem>
                <SelectItem value="Perdido">Perdido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-tags" className="text-sm font-medium text-[#374151]">
              Tags (separadas por vírgula)
            </Label>
            <Input
              id="edit-tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Ex: VIP, Urgente, Interessado"
              className="border-[#E5E7EB]"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-[#FF5A2A] hover:bg-[#E54A1A] text-white"
            >
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

type DeleteContactModalProps = {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  contact: any;
};

export function DeleteContactModal({ open, onClose, onDelete, contact }: DeleteContactModalProps) {
  const handleDelete = () => {
    onDelete();
    toast.success("Contato removido com sucesso!");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#111827]">Remover Contato</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-[#6B7280]">
            Tem certeza que deseja remover o contato <span className="font-semibold text-[#111827]">{contact?.name}</span>?
          </p>
          <p className="text-sm text-[#6B7280] mt-2">
            Esta ação não pode ser desfeita.
          </p>
        </div>
        <DialogFooter className="gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button 
            type="button" 
            variant="destructive"
            onClick={handleDelete}
          >
            Remover
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
