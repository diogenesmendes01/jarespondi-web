import { eq, desc, and, or, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  contacts, 
  conversations, 
  messages, 
  campaigns, 
  campaignRecipients,
  whatsappConnections,
  alerts,
  aiConfigs,
  integrations,
  Contact,
  Conversation,
  Message,
  Campaign,
  WhatsappConnection,
  Alert,
  AIConfig,
  Integration
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Contacts
export async function getContactsByUserId(userId: number): Promise<Contact[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contacts).where(eq(contacts.userId, userId)).orderBy(desc(contacts.updatedAt));
}

export async function getContactById(contactId: number): Promise<Contact | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(contacts).where(eq(contacts.id, contactId)).limit(1);
  return result[0];
}

// Conversations
export async function getConversationsByUserId(userId: number): Promise<Conversation[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(conversations).where(eq(conversations.userId, userId)).orderBy(desc(conversations.lastMessageAt));
}

export async function getConversationById(conversationId: number): Promise<Conversation | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(conversations).where(eq(conversations.id, conversationId)).limit(1);
  return result[0];
}

// Messages
export async function getMessagesByConversationId(conversationId: number): Promise<Message[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(messages.sentAt);
}

// Campaigns
export async function getCampaignsByUserId(userId: number): Promise<Campaign[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(campaigns).where(eq(campaigns.userId, userId)).orderBy(desc(campaigns.createdAt));
}

export async function getCampaignById(campaignId: number): Promise<Campaign | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(campaigns).where(eq(campaigns.id, campaignId)).limit(1);
  return result[0];
}

// WhatsApp Connections
export async function getConnectionsByUserId(userId: number): Promise<WhatsappConnection[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(whatsappConnections).where(eq(whatsappConnections.userId, userId)).orderBy(desc(whatsappConnections.createdAt));
}

// Alerts
export async function getAlertsByUserId(userId: number, limit: number = 10): Promise<Alert[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(alerts).where(eq(alerts.userId, userId)).orderBy(desc(alerts.createdAt)).limit(limit);
}

export async function getUnreadAlertsCount(userId: number): Promise<number> {
  const db = await getDb();
  if (!db) return 0;
  const result = await db.select({ count: sql<number>`count(*)` }).from(alerts).where(and(eq(alerts.userId, userId), eq(alerts.isRead, false)));
  return result[0]?.count || 0;
}

// AI Configs
export async function getActiveAIConfig(userId: number): Promise<AIConfig | undefined> {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(aiConfigs).where(and(eq(aiConfigs.userId, userId), eq(aiConfigs.isActive, true))).limit(1);
  return result[0];
}

// Integrations
export async function getIntegrationsByUserId(userId: number): Promise<Integration[]> {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(integrations).where(eq(integrations.userId, userId)).orderBy(desc(integrations.createdAt));
}

// Dashboard Stats
export async function getDashboardStats(userId: number) {
  const db = await getDb();
  if (!db) return null;

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalContacts,
    totalConversations,
    activeConversations,
    totalCampaigns,
    activeCampaigns,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(contacts).where(eq(contacts.userId, userId)),
    db.select({ count: sql<number>`count(*)` }).from(conversations).where(eq(conversations.userId, userId)),
    db.select({ count: sql<number>`count(*)` }).from(conversations).where(and(eq(conversations.userId, userId), eq(conversations.status, 'ativa'))),
    db.select({ count: sql<number>`count(*)` }).from(campaigns).where(eq(campaigns.userId, userId)),
    db.select({ count: sql<number>`count(*)` }).from(campaigns).where(and(eq(campaigns.userId, userId), eq(campaigns.status, 'ativa'))),
  ]);

  return {
    totalContacts: totalContacts[0]?.count || 0,
    totalConversations: totalConversations[0]?.count || 0,
    activeConversations: activeConversations[0]?.count || 0,
    totalCampaigns: totalCampaigns[0]?.count || 0,
    activeCampaigns: activeCampaigns[0]?.count || 0,
  };
}
