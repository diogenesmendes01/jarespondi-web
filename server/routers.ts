import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { 
  contacts, 
  conversations, 
  messages, 
  campaigns, 
  whatsappConnections, 
  alerts, 
  aiConfigs, 
  integrations 
} from "../drizzle/schema";
import { getDb } from "./db";
import { eq } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  dashboard: router({
    stats: protectedProcedure.query(async ({ ctx }) => {
      return await db.getDashboardStats(ctx.user.id);
    }),
  }),

  contacts: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getContactsByUserId(ctx.user.id);
    }),
    
    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getContactById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        name: z.string().optional(),
        phoneNumber: z.string(),
        email: z.string().optional(),
        tags: z.string().optional(),
        notes: z.string().optional(),
        source: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const result = await database.insert(contacts).values({
          userId: ctx.user.id,
          ...input,
        });
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        email: z.string().optional(),
        status: z.enum(["novo", "qualificado", "negociacao", "ganho", "perdido"]).optional(),
        score: z.number().optional(),
        tags: z.string().optional(),
        notes: z.string().optional(),
        dealValue: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const { id, ...updateData } = input;
        await database.update(contacts).set(updateData).where(eq(contacts.id, id));
        
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        await database.delete(contacts).where(eq(contacts.id, input.id));
        
        return { success: true };
      }),
  }),

  conversations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getConversationsByUserId(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getConversationById(input.id);
      }),

    messages: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        return await db.getMessagesByConversationId(input.conversationId);
      }),
  }),

  campaigns: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getCampaignsByUserId(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getCampaignById(input.id);
      }),

    create: protectedProcedure
      .input(z.object({
        connectionId: z.number(),
        name: z.string(),
        description: z.string().optional(),
        messageTemplate: z.string(),
        targetAudience: z.string().optional(),
        scheduledFor: z.date().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const result = await database.insert(campaigns).values({
          userId: ctx.user.id,
          ...input,
        });
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        description: z.string().optional(),
        messageTemplate: z.string().optional(),
        status: z.enum(["rascunho", "agendada", "ativa", "pausada", "finalizada"]).optional(),
        scheduledFor: z.date().optional(),
      }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const { id, ...updateData } = input;
        await database.update(campaigns).set(updateData).where(eq(campaigns.id, id));
        
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        await database.delete(campaigns).where(eq(campaigns.id, input.id));
        
        return { success: true };
      }),
  }),

  connections: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getConnectionsByUserId(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        phoneNumber: z.string(),
        connectionType: z.enum(["web", "api"]),
        apiKey: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const result = await database.insert(whatsappConnections).values({
          userId: ctx.user.id,
          ...input,
        });
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        status: z.enum(["active", "disconnected", "pending"]).optional(),
        apiKey: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const { id, ...updateData } = input;
        await database.update(whatsappConnections).set(updateData).where(eq(whatsappConnections.id, id));
        
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        await database.delete(whatsappConnections).where(eq(whatsappConnections.id, input.id));
        
        return { success: true };
      }),
  }),

  alerts: router({
    list: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getAlertsByUserId(ctx.user.id, input.limit);
      }),

    unreadCount: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUnreadAlertsCount(ctx.user.id);
    }),

    markAsRead: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        await database.update(alerts).set({ isRead: true }).where(eq(alerts.id, input.id));
        
        return { success: true };
      }),
  }),

  aiConfig: router({
    get: protectedProcedure.query(async ({ ctx }) => {
      return await db.getActiveAIConfig(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        name: z.string(),
        systemPrompt: z.string(),
        temperature: z.number().min(0).max(100).optional(),
        maxTokens: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const result = await database.insert(aiConfigs).values({
          userId: ctx.user.id,
          ...input,
        });
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        systemPrompt: z.string().optional(),
        temperature: z.number().min(0).max(100).optional(),
        maxTokens: z.number().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const { id, ...updateData } = input;
        await database.update(aiConfigs).set(updateData).where(eq(aiConfigs.id, id));
        
        return { success: true };
      }),
  }),

  integrations: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return await db.getIntegrationsByUserId(ctx.user.id);
    }),

    create: protectedProcedure
      .input(z.object({
        type: z.enum(["google_calendar", "webhook", "api"]),
        name: z.string(),
        config: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const result = await database.insert(integrations).values({
          userId: ctx.user.id,
          ...input,
        });
        
        return { success: true };
      }),

    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        name: z.string().optional(),
        config: z.string().optional(),
        isActive: z.boolean().optional(),
      }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        const { id, ...updateData } = input;
        await database.update(integrations).set(updateData).where(eq(integrations.id, id));
        
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        const database = await getDb();
        if (!database) throw new Error("Database not available");
        
        await database.delete(integrations).where(eq(integrations.id, input.id));
        
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
