ALTER TABLE "playlists" ALTER COLUMN "bg_color" SET DEFAULT '#171717';--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "bg_color" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "song_path" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "image_path" SET DEFAULT '/images/note.svg';--> statement-breakpoint
ALTER TABLE "songs" ALTER COLUMN "image_path" SET NOT NULL;