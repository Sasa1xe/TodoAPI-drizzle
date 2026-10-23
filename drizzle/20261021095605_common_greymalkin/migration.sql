CREATE TABLE "todos" (
	"id" serial PRIMARY KEY,
	"name" varchar(255) NOT NULL,
	"body" text DEFAULT '' NOT NULL,
	"ordered_at" timestamp DEFAULT now(),
	"done" varchar(3) DEFAULT 'no' NOT NULL
);
