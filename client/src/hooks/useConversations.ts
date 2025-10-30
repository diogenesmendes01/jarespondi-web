// ============================================
// HOOK: useConversations
// Gerencia estado e operações de conversas
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { conversationsApi } from '../services/whatsappApi';
import type { Conversation, ConversationFilters } from '../types/whatsapp';

export interface UseConversationsReturn {
  conversations: Conversation[];
  loading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null;
  filters: ConversationFilters;
  setFilters: (filters: ConversationFilters) => void;
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  markAsRead: (conversationId: string) => Promise<void>;
  archive: (conversationId: string) => Promise<void>;
  unarchive: (conversationId: string) => Promise<void>;
}

export function useConversations(initialFilters: ConversationFilters = {}): UseConversationsReturn {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);
  const [filters, setFilters] = useState<ConversationFilters>({
    page: 1,
    limit: 20,
    ...initialFilters,
  });

  // ============================================
  // Fetch conversas
  // ============================================
  const fetchConversations = useCallback(async (appendMode = false) => {
    try {
      setLoading(true);
      setError(null);

      const response = await conversationsApi.list(filters);

      if (appendMode) {
        // Modo "carregar mais" - adiciona ao final
        setConversations((prev) => [...prev, ...response.data]);
      } else {
        // Modo normal - substitui
        setConversations(response.data);
      }

      setPagination(response.pagination);
    } catch (err) {
      // Se backend não está rodando, modo silencioso (não quebra a UI)
      console.warn('API não disponível - modo mock ativo:', err);
      setError(null); // Não mostra erro, deixa usar dados mocados
      setConversations([]); // Array vazio para o componente adicionar mocks
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // ============================================
  // Effects
  // ============================================
  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  // ============================================
  // Actions
  // ============================================
  const refresh = useCallback(async () => {
    await fetchConversations(false);
  }, [fetchConversations]);

  const loadMore = useCallback(async () => {
    if (!pagination || pagination.page >= pagination.totalPages) {
      return;
    }

    setFilters((prev) => ({
      ...prev,
      page: (prev.page || 1) + 1,
    }));

    await fetchConversations(true);
  }, [pagination, fetchConversations]);

  const markAsRead = useCallback(async (conversationId: string) => {
    try {
      await conversationsApi.markAsRead(conversationId);

      // Atualiza localmente
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === conversationId
            ? { ...conv, unreadCount: 0, isUnread: false }
            : conv
        )
      );
    } catch (err) {
      console.error('Error marking conversation as read:', err);
      throw err;
    }
  }, []);

  const archive = useCallback(async (conversationId: string) => {
    try {
      await conversationsApi.archive(conversationId);

      // Remove da lista local
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationId));
    } catch (err) {
      console.error('Error archiving conversation:', err);
      throw err;
    }
  }, []);

  const unarchive = useCallback(async (conversationId: string) => {
    try {
      await conversationsApi.unarchive(conversationId);
      await refresh();
    } catch (err) {
      console.error('Error unarchiving conversation:', err);
      throw err;
    }
  }, [refresh]);

  return {
    conversations,
    loading,
    error,
    pagination,
    filters,
    setFilters,
    refresh,
    loadMore,
    markAsRead,
    archive,
    unarchive,
  };
}
