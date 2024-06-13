ALTER TABLE "users" ALTER COLUMN "phone_verified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "email_verified" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "restorant_owner" SET DATA TYPE boolean;