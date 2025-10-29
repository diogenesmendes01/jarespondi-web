CREATE TABLE `ai_configs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`systemPrompt` text NOT NULL,
	`temperature` int DEFAULT 70,
	`maxTokens` int DEFAULT 1000,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_configs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `alerts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`connectionId` int,
	`type` enum('connection_down','connection_restored','high_volume','error','info') NOT NULL,
	`title` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `alerts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaign_recipients` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`contactId` int NOT NULL,
	`status` enum('pendente','enviada','entregue','lida','respondida','erro') NOT NULL DEFAULT 'pendente',
	`personalizedMessage` text,
	`sentAt` timestamp,
	`deliveredAt` timestamp,
	`readAt` timestamp,
	`respondedAt` timestamp,
	`errorMessage` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaign_recipients_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `campaigns` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`connectionId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`messageTemplate` text NOT NULL,
	`status` enum('rascunho','agendada','ativa','pausada','finalizada') NOT NULL DEFAULT 'rascunho',
	`targetAudience` text,
	`scheduledFor` timestamp,
	`startedAt` timestamp,
	`completedAt` timestamp,
	`totalContacts` int DEFAULT 0,
	`sentCount` int DEFAULT 0,
	`deliveredCount` int DEFAULT 0,
	`responseCount` int DEFAULT 0,
	`conversionCount` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `campaigns_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contacts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`name` varchar(255),
	`phoneNumber` varchar(20) NOT NULL,
	`email` varchar(320),
	`status` enum('novo','qualificado','negociacao','ganho','perdido') NOT NULL DEFAULT 'novo',
	`score` int DEFAULT 0,
	`tags` text,
	`notes` text,
	`source` varchar(100),
	`dealValue` int DEFAULT 0,
	`lastInteraction` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contacts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contactId` int NOT NULL,
	`connectionId` int NOT NULL,
	`status` enum('ativa','finalizada','abandonada') NOT NULL DEFAULT 'ativa',
	`lastMessageAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `integrations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` enum('google_calendar','webhook','api') NOT NULL,
	`name` varchar(255) NOT NULL,
	`config` text NOT NULL,
	`isActive` boolean NOT NULL DEFAULT true,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `integrations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`conversationId` int NOT NULL,
	`direction` enum('inbound','outbound') NOT NULL,
	`content` text NOT NULL,
	`messageType` enum('text','image','audio','video','document') NOT NULL DEFAULT 'text',
	`mediaUrl` text,
	`isFromAI` boolean NOT NULL DEFAULT false,
	`sentAt` timestamp NOT NULL DEFAULT (now()),
	`deliveredAt` timestamp,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `whatsapp_connections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`phoneNumber` varchar(20) NOT NULL,
	`connectionType` enum('web','api') NOT NULL,
	`status` enum('active','disconnected','pending') NOT NULL DEFAULT 'pending',
	`apiKey` text,
	`lastConnected` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `whatsapp_connections_id` PRIMARY KEY(`id`)
);
