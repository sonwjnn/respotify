CREATE TABLE IF NOT EXISTS "liked_playlists" (
	"userId" uuid NOT NULL,
	"playlistId" uuid NOT NULL,
	CONSTRAINT "liked_playlists_userId_playlistId_pk" PRIMARY KEY("userId","playlistId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "liked_songs" (
	"userId" uuid NOT NULL,
	"songId" uuid NOT NULL,
	CONSTRAINT "liked_songs_userId_songId_pk" PRIMARY KEY("userId","songId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlist_songs" (
	"playlistId" uuid NOT NULL,
	"songId" uuid NOT NULL,
	CONSTRAINT "playlist_songs_playlistId_songId_pk" PRIMARY KEY("playlistId","songId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "playlists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"userId" uuid NOT NULL,
	"image_path" text,
	"description" text,
	"duration" integer,
	"bg_color" text,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "songs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"author" text NOT NULL,
	"duration" integer,
	"song_path" text,
	"image_path" text,
	"userId" uuid NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
DROP TABLE "likedPlaylist";--> statement-breakpoint
DROP TABLE "likedSong";--> statement-breakpoint
DROP TABLE "playlist";--> statement-breakpoint
DROP TABLE "song";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_playlistId_playlists_id_fk" FOREIGN KEY ("playlistId") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_songId_songs_id_fk" FOREIGN KEY ("songId") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_playlistId_playlists_id_fk" FOREIGN KEY ("playlistId") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_songId_songs_id_fk" FOREIGN KEY ("songId") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs" ADD CONSTRAINT "songs_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
