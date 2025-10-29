import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * WhatsApp connections/numbers configured by users
 */
export const whatsappConnections = mysqlTable("whatsapp_connections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  connectionType: mysqlEnum("connectionType", ["web", "api"]).notNull(),
  status: mysqlEnum("status", ["active", "disconnected", "pending"]).default("pending").notNull(),
  apiKey: text("apiKey"),
  lastConnected: timestamp("lastConnected"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WhatsappConnection = typeof whatsappConnections.$inferSelect;
export type InsertWhatsappConnection = typeof whatsappConnections.$inferInsert;

/**
 * Contacts/Leads in the CRM
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  status: mysqlEnum("status", ["novo", "qualificado", "negociacao", "ganho", "perdido"]).default("novo").notNull(),
  score: int("score").default(0),
  tags: text("tags"), // JSON array of tags
  notes: text("notes"),
  source: varchar("source", { length: 100 }), // origem do lead
  dealValue: int("dealValue").default(0), // valor em centavos
  lastInteraction: timestamp("lastInteraction"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * Conversations with contacts
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  contactId: int("contactId").notNull(),
  connectionId: int("connectionId").notNull(),
  status: mysqlEnum("status", ["ativa", "finalizada", "abandonada"]).default("ativa").notNull(),
  lastMessageAt: timestamp("lastMessageAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Individual messages in conversations
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  direction: mysqlEnum("direction", ["inbound", "outbound"]).notNull(),
  content: text("content").notNull(),
  messageType: mysqlEnum("messageType", ["text", "image", "audio", "video", "document"]).default("text").notNull(),
  mediaUrl: text("mediaUrl"),
  isFromAI: boolean("isFromAI").default(false).notNull(),
  sentAt: timestamp("sentAt").defaultNow().notNull(),
  deliveredAt: timestamp("deliveredAt"),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Active sales campaigns
 */
export const campaigns = mysqlTable("campaigns", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  connectionId: int("connectionId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  messageTemplate: text("messageTemplate").notNull(),
  status: mysqlEnum("status", ["rascunho", "agendada", "ativa", "pausada", "finalizada"]).default("rascunho").notNull(),
  targetAudience: text("targetAudience"), // JSON with filters
  scheduledFor: timestamp("scheduledFor"),
  startedAt: timestamp("startedAt"),
  completedAt: timestamp("completedAt"),
  totalContacts: int("totalContacts").default(0),
  sentCount: int("sentCount").default(0),
  deliveredCount: int("deliveredCount").default(0),
  responseCount: int("responseCount").default(0),
  conversionCount: int("conversionCount").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;

/**
 * Campaign recipients tracking
 */
export const campaignRecipients = mysqlTable("campaign_recipients", {
  id: int("id").autoincrement().primaryKey(),
  campaignId: int("campaignId").notNull(),
  contactId: int("contactId").notNull(),
  status: mysqlEnum("status", ["pendente", "enviada", "entregue", "lida", "respondida", "erro"]).default("pendente").notNull(),
  personalizedMessage: text("personalizedMessage"),
  sentAt: timestamp("sentAt"),
  deliveredAt: timestamp("deliveredAt"),
  readAt: timestamp("readAt"),
  respondedAt: timestamp("respondedAt"),
  errorMessage: text("errorMessage"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CampaignRecipient = typeof campaignRecipients.$inferSelect;
export type InsertCampaignRecipient = typeof campaignRecipients.$inferInsert;

/**
 * System alerts and notifications
 */
export const alerts = mysqlTable("alerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  connectionId: int("connectionId"),
  type: mysqlEnum("type", ["connection_down", "connection_restored", "high_volume", "error", "info"]).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  message: text("message").notNull(),
  isRead: boolean("isRead").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Alert = typeof alerts.$inferSelect;
export type InsertAlert = typeof alerts.$inferInsert;

/**
 * AI agent configurations
 */
export const aiConfigs = mysqlTable("ai_configs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  systemPrompt: text("systemPrompt").notNull(),
  temperature: int("temperature").default(70), // 0-100, stored as percentage
  maxTokens: int("maxTokens").default(1000),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AIConfig = typeof aiConfigs.$inferSelect;
export type InsertAIConfig = typeof aiConfigs.$inferInsert;

/**
 * Integration settings (Google Calendar, webhooks, etc)
 */
export const integrations = mysqlTable("integrations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: mysqlEnum("type", ["google_calendar", "webhook", "api"]).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  config: text("config").notNull(), // JSON with integration-specific settings
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Integration = typeof integrations.$inferSelect;
export type InsertIntegration = typeof integrations.$inferInsert;
