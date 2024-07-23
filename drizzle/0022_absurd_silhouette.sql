ALTER TABLE "user" ALTER COLUMN "image" SET DEFAULT '/images/robot.svg';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "image" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" DROP COLUMN IF EXISTS "duration";