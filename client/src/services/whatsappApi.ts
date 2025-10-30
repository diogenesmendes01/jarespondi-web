// ============================================
// SERVIÇO DE API WHATSAPP
// ============================================

import type {
  ConversationsResponse,
  MessagesResponse,
  Conversation,
  Message,
  ConversationFilters,
  MessageFilters,
} from '../types/whatsapp';

// Base URL da API - ajuste conforme necessário
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// ============================================
// HELPER: Criar headers com token
// ============================================
const getHeaders = (): HeadersInit => {
  // TODO: Implementar obtenção do token de autenticação
  // Por enquanto, retorna headers básicos
  const token = localStorage.getItem('auth_token'); // ou de onde vier o token

  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
};

// ============================================
// HELPER: Construir query string
// ============================================
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        searchParams.append(key, value.join(','));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// ============================================
// API: CONVERSAS
// ============================================

export const conversationsApi = {
  /**
   * Lista todas as conversas com filtros
   */
  list: async (filters?: ConversationFilters): Promise<ConversationsResponse> => {
    const queryString = filters ? buildQueryString(filters) : '';

    const response = await fetch(`${API_BASE_URL}/conversations${queryString}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch conversations: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Cria uma nova conversa
   */
  create: async (phoneNumber: string, message?: string): Promise<Conversation> => {
    const response = await fetch(`${API_BASE_URL}/conversations`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ phoneNumber, message }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create conversation: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Arquiva uma conversa
   */
  archive: async (conversationId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/archive`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to archive conversation: ${response.statusText}`);
    }
  },

  /**
   * Desarquiva uma conversa
   */
  unarchive: async (conversationId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/unarchive`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to unarchive conversation: ${response.statusText}`);
    }
  },

  /**
   * Marca conversa como lida
   */
  markAsRead: async (conversationId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/mark-read`, {
      method: 'PATCH',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to mark conversation as read: ${response.statusText}`);
    }
  },
};

// ============================================
// API: MENSAGENS
// ============================================

export const messagesApi = {
  /**
   * Lista mensagens de uma conversa
   */
  list: async (conversationId: string, filters?: MessageFilters): Promise<MessagesResponse> => {
    const queryString = filters ? buildQueryString(filters) : '';

    const response = await fetch(
      `${API_BASE_URL}/conversations/${conversationId}/messages${queryString}`,
      {
        method: 'GET',
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Envia mensagem de texto
   */
  sendText: async (
    conversationId: string,
    content: string,
    replyTo?: string
  ): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        type: 'TEXT',
        content,
        replyTo,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Envia mídia (imagem, vídeo, áudio, documento)
   */
  sendMedia: async (
    conversationId: string,
    file: File,
    type: 'IMAGE' | 'VIDEO' | 'AUDIO' | 'DOCUMENT',
    caption?: string,
    replyTo?: string
  ): Promise<Message> => {
    const formData = new FormData();
    formData.append('type', type);
    formData.append('file', file);
    if (caption) formData.append('caption', caption);
    if (replyTo) formData.append('replyTo', replyTo);

    const response = await fetch(
      `${API_BASE_URL}/conversations/${conversationId}/messages/media`,
      {
        method: 'POST',
        headers: {
          'Authorization': getHeaders()['Authorization'] || '',
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to send media: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Edita mensagem
   */
  edit: async (messageId: string, content: string): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      throw new Error(`Failed to edit message: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Deleta mensagem
   */
  delete: async (messageId: string, deleteFor: 'me' | 'everyone' = 'me'): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}?deleteFor=${deleteFor}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete message: ${response.statusText}`);
    }
  },

  /**
   * Adiciona reação a mensagem
   */
  react: async (messageId: string, emoji: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/messages/${messageId}/react`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ emoji }),
    });

    if (!response.ok) {
      throw new Error(`Failed to react to message: ${response.statusText}`);
    }
  },
};

// ============================================
// API: CRM
// ============================================

export const crmApi = {
  /**
   * Atualiza status CRM
   */
  updateStatus: async (conversationId: string, status: string): Promise<void> => {
    const response = await fetch(
      `${API_BASE_URL}/conversations/${conversationId}/crm/status`,
      {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ status }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update CRM status: ${response.statusText}`);
    }
  },

  /**
   * Adiciona tags
   */
  addTags: async (conversationId: string, tags: string[]): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/crm/tags`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add tags: ${response.statusText}`);
    }
  },

  /**
   * Remove tags
   */
  removeTags: async (conversationId: string, tags: string[]): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/crm/tags`, {
      method: 'DELETE',
      headers: getHeaders(),
      body: JSON.stringify({ tags }),
    });

    if (!response.ok) {
      throw new Error(`Failed to remove tags: ${response.statusText}`);
    }
  },

  /**
   * Atualiza deal/pipeline
   */
  updateDeal: async (
    conversationId: string,
    deal: {
      dealValue?: number;
      dealStage?: string;
      probability?: number;
    }
  ): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/crm/deal`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(deal),
    });

    if (!response.ok) {
      throw new Error(`Failed to update deal: ${response.statusText}`);
    }
  },

  /**
   * Atribui responsável
   */
  assign: async (conversationId: string, assignedToId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/crm/assign`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ assignedToId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to assign: ${response.statusText}`);
    }
  },
};

// ============================================
// API: IA
// ============================================

export const aiApi = {
  /**
   * Toggle IA na conversa
   */
  toggle: async (conversationId: string, enabled: boolean): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/ai/toggle`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ enabled }),
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle AI: ${response.statusText}`);
    }
  },

  /**
   * Forçar sugestão da IA
   */
  suggest: async (conversationId: string): Promise<{ suggestion: string; draftResponse: string }> => {
    const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/ai/suggest`, {
      method: 'POST',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to get AI suggestion: ${response.statusText}`);
    }

    return response.json();
  },
};

// ============================================
// API: ACCOUNTS
// ============================================

export const accountsApi = {
  /**
   * Lista todas as contas
   */
  list: async () => {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch accounts: ${response.statusText}`);
    }

    return response.json();
  },

  /**
   * Status de uma conta
   */
  getStatus: async (accountId: string) => {
    const response = await fetch(`${API_BASE_URL}/accounts/${accountId}/status`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch account status: ${response.statusText}`);
    }

    return response.json();
  },
};

// Export default com todas as APIs
export default {
  conversations: conversationsApi,
  messages: messagesApi,
  crm: crmApi,
  ai: aiApi,
  accounts: accountsApi,
};
