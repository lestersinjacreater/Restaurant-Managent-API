ALTER TABLE "orders" ALTER COLUMN "estimated_delivery_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "delivery_address_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "address" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "category" DROP COLUMN IF EXISTS "menu_items";--> statement-breakpoint
ALTER TABLE "city" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "city" DROP COLUMN IF EXISTS "state";--> statement-breakpoint
ALTER TABLE "city" DROP COLUMN IF EXISTS "restaurant";--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "comment" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "driver" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "driver" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "menu_item" DROP COLUMN IF EXISTS "category";--> statement-breakpoint
ALTER TABLE "menu_item" DROP COLUMN IF EXISTS "restorant";--> statement-breakpoint
ALTER TABLE "menu_item" DROP COLUMN IF EXISTS "order_menu_items";--> statement-breakpoint
ALTER TABLE "order_menu_item" DROP COLUMN IF EXISTS "menu_item";--> statement-breakpoint
ALTER TABLE "order_menu_item" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "order_status" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "order_status" DROP COLUMN IF EXISTS "status_catalog";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "coments";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_menu_items";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "order_status";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "driver";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "restorant";--> statement-breakpoint
ALTER TABLE "orders" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "restaurant_owner" DROP COLUMN IF EXISTS "users";--> statement-breakpoint
ALTER TABLE "restaurant_owner" DROP COLUMN IF EXISTS "restorant";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "menu_items";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "restaurant" DROP COLUMN IF EXISTS "restorant_owner";--> statement-breakpoint
ALTER TABLE "state" DROP COLUMN IF EXISTS "city";--> statement-breakpoint
ALTER TABLE "status_catalog" DROP COLUMN IF EXISTS "order_status";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "address";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "comment";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "driver";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "orders";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "restorant_owner";