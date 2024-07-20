ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_credentialID_unique";--> statement-breakpoint
ALTER TABLE "account" DROP CONSTRAINT "account_provider_providerAccountId_pk";--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_user_id_credentialID_pk";--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id");--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_credential_ID_pk" PRIMARY KEY("user_id","credential_ID");--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "provider_account_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credential_ID" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "provider_account_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credential_public_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credential_device_type" text NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "credential_backed_up" boolean NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "email_verified" timestamp;--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "providerAccountId";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialID";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "providerAccountId";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialPublicKey";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialDeviceType";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "credentialBackedUp";--> statement-breakpoint
ALTER TABLE "user" DROP COLUMN IF EXISTS "emailVerified";--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_credential_ID_unique" UNIQUE("credential_ID");