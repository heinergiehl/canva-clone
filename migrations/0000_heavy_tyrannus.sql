CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_user_id" varchar(255) NOT NULL,
	"email" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_table_clerk_user_id_unique" UNIQUE("clerk_user_id"),
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
