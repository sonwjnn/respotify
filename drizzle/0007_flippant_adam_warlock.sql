ALTER TABLE "account" DROP CONSTRAINT "account_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "liked_playlists" DROP CONSTRAINT "liked_playlists_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "liked_playlists" DROP CONSTRAINT "liked_playlists_playlistId_playlists_id_fk";
--> statement-breakpoint
ALTER TABLE "liked_songs" DROP CONSTRAINT "liked_songs_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "liked_songs" DROP CONSTRAINT "liked_songs_songId_songs_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_playlistId_playlists_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_songId_songs_id_fk";
--> statement-breakpoint
ALTER TABLE "playlists" DROP CONSTRAINT "playlists_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "session" DROP CONSTRAINT "session_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "songs" DROP CONSTRAINT "songs_userId_user_id_fk";
--> statement-breakpoint
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_userId_credentialID_pk";--> statement-breakpoint
ALTER TABLE "liked_playlists" DROP CONSTRAINT "liked_playlists_userId_playlistId_pk";--> statement-breakpoint
ALTER TABLE "liked_songs" DROP CONSTRAINT "liked_songs_userId_songId_pk";--> statement-breakpoint
ALTER TABLE "playlist_songs" DROP CONSTRAINT "playlist_songs_playlistId_songId_pk";--> statement-breakpoint
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_credentialID_pk" PRIMARY KEY("user_id","credentialID");--> statement-breakpoint
ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_user_id_playlist_id_pk" PRIMARY KEY("user_id","playlist_id");--> statement-breakpoint
ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_user_id_song_id_pk" PRIMARY KEY("user_id","song_id");--> statement-breakpoint
ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_playlist_id_song_id_pk" PRIMARY KEY("playlist_id","song_id");--> statement-breakpoint
ALTER TABLE "account" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "authenticator" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "liked_playlists" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "liked_playlists" ADD COLUMN "playlist_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "liked_songs" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "liked_songs" ADD COLUMN "song_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist_songs" ADD COLUMN "playlist_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "playlist_songs" ADD COLUMN "song_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "playlists" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "session" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "songs" ADD COLUMN "user_id" uuid NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_playlists" ADD CONSTRAINT "liked_playlists_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "liked_songs" ADD CONSTRAINT "liked_songs_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlist_songs" ADD CONSTRAINT "playlist_songs_song_id_songs_id_fk" FOREIGN KEY ("song_id") REFERENCES "public"."songs"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "playlists" ADD CONSTRAINT "playlists_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "songs" ADD CONSTRAINT "songs_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "account" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "authenticator" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "liked_playlists" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "liked_playlists" DROP COLUMN IF EXISTS "playlistId";--> statement-breakpoint
ALTER TABLE "liked_songs" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "liked_songs" DROP COLUMN IF EXISTS "songId";--> statement-breakpoint
ALTER TABLE "playlist_songs" DROP COLUMN IF EXISTS "playlistId";--> statement-breakpoint
ALTER TABLE "playlist_songs" DROP COLUMN IF EXISTS "songId";--> statement-breakpoint
ALTER TABLE "playlists" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "session" DROP COLUMN IF EXISTS "userId";--> statement-breakpoint
ALTER TABLE "songs" DROP COLUMN IF EXISTS "userId";