// ============================================
// TIPOS DA API WHATSAPP
// Baseado em: api-whatsapp.md
// ============================================

export type MessageType =
  | 'TEXT'
  | 'IMAGE'
  | 'VIDEO'
  | 'AUDIO'
  | 'DOCUMENT'
  | 'STICKER'
  | 'LOCATION'
  | 'CONTACT';

export type MessageDirection = 'INBOUND' | 'OUTBOUND';

export type MessageStatus =
  | 'PENDING'
  | 'SENT'
  | 'DELIVERED'
  | 'READ'
  | 'FAILED';

export type SenderType = 'AGENT' | 'CUSTOMER' | 'AI' | 'SYSTEM';

export type ConversationStatus = 'active' | 'archived' | 'spam';

export type CRMType = 'LEAD' | 'CUSTOMER' | 'PROSPECT' | 'VIP';

export type CRMStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'NEGOTIATING'
  | 'WON'
  | 'LOST';

export type Sentiment = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type Provider = 'BAILEYS' | 'META_API';

export type AccountStatus = 'DISCONNECTED' | 'CONNECTING' | 'CONNECTED' | 'ERROR';

// ============================================
// INTERFACES
// ============================================

export interface Avatar {
  url: string;
  fallback: string;
  color: string;
}

export interface AssignedTo {
  id: string;
  name: string;
  avatar: string;
}

export interface Pipeline {
  stage: string;
  stageColor: string;
  dealValue: number;
  currency: string;
  probability: number;
}

export interface CRMSummary {
  firstContactDate: string;
  lastPurchaseDate: string;
  totalPurchases: number;
  lifetimeValue: number;
}

export interface CRM {
  isRegistered: boolean;
  customerId?: string;
  type?: CRMType;
  status?: CRMStatus;
  statusColor?: string;
  company?: string;
  email?: string;
  phone?: string;
  tags?: string[];
  assignedTo?: AssignedTo;
  pipeline?: Pipeline;
  summary?: CRMSummary;
}

export interface Contact {
  id: string;
  phoneNumber: string;
  isGroup: boolean;
  displayName: string;
  whatsappName?: string;
  avatar: Avatar;
  crm: CRM;
}

export interface LastMessage {
  id: string;
  type: MessageType;
  content: string | null;
  timestamp: string;
  direction: MessageDirection;
  preview: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface Metrics {
  avgResponseTime: number;
  lastResponseTime: number;
  totalMessages: number;
  sentiment: Sentiment;
  priority: Priority;
  priorityColor?: string;
}

export interface AI {
  autoReplyEnabled: boolean;
  lastAiSuggestion?: string;
  intents?: string[];
  nextBestAction?: string;
  confidence?: number;
}

export interface Account {
  id: string;
  name: string;
  phoneNumber: string;
}

// ============================================
// CONVERSATION (Principal)
// ============================================

export interface Conversation {
  id: string;
  accountId: string;
  account?: Account;
  contact: Contact;
  lastMessage: LastMessage;
  unreadCount: number;
  isUnread: boolean;
  status: ConversationStatus;
  lastMessageAt: string;
  labels: Label[];
  metrics: Metrics;
  ai: AI;
}

// ============================================
// MESSAGE (Para chat)
// ============================================

export interface Sender {
  type: SenderType;
  id: string;
  name: string;
  avatar?: string;
  phoneNumber?: string;
}

export interface ReplyTo {
  id: string;
  content: string | null;
  preview: string;
}

export interface Media {
  id: string;
  type: MessageType;
  url: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
  sizeFormatted: string;
  fileName: string;
  width?: number;
  height?: number;
  duration?: number;
  durationFormatted?: string;
  isVoiceNote?: boolean;
  transcription?: {
    text: string;
    confidence: number;
    language: string;
  };
  downloadStatus: 'PENDING' | 'DOWNLOADING' | 'COMPLETED' | 'FAILED';
  expiresAt?: string;
}

export interface MessageMetadata {
  provider: Provider;
  deliveredAt?: string;
  readAt?: string;
  editedAt?: string;
  isForwarded?: boolean;
  isAiGenerated?: boolean;
  aiModel?: string;
  aiConfidence?: number;
  isGroup?: boolean;
  groupId?: string;
  participant?: {
    phoneNumber: string;
    isAdmin: boolean;
    isSuperAdmin: boolean;
  };
}

export interface Message {
  id: string;
  conversationId: string;
  type: MessageType;
  content: string | null;
  caption?: string;
  direction: MessageDirection;
  status: MessageStatus;
  timestamp: string;
  sender: Sender;
  replyTo?: ReplyTo | null;
  media?: Media | null;
  metadata: MessageMetadata;
}

// ============================================
// API RESPONSES
// ============================================

export interface ConversationsResponse {
  data: Conversation[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MessagesResponse {
  data: Message[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
  conversationContext: {
    contact: {
      id: string;
      displayName: string;
      avatar: Avatar;
      crm: CRM;
    };
    unreadCount: number;
    isTyping: boolean;
  };
}

// ============================================
// API FILTERS
// ============================================

export interface ConversationFilters {
  accountId?: string;
  status?: ConversationStatus;
  unread?: boolean;
  search?: string;
  tags?: string[];
  assignedTo?: string;
  crmStatus?: CRMStatus;
  crmType?: CRMType;
  priority?: Priority;
  lastMessageAfter?: string;
  lastMessageBefore?: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface MessageFilters {
  before?: string;
  after?: string;
  aroundMessageId?: string;
  beforeMessageId?: string;
  limit?: number;
  page?: number;
}
