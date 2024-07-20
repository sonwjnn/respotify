ALTER TABLE "liked_playlists" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "liked_songs" ADD COLUMN "created_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist_songs" ADD COLUMN "created_at" timestamp NOT NULL;