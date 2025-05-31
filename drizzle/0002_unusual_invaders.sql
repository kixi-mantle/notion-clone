ALTER TABLE "user_organization" DROP CONSTRAINT "user_organization_userId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "user_organization" DROP CONSTRAINT "user_organization_organizationId_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_ownerId_users_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" DROP CONSTRAINT "documents_organizationId_organizations_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "ownerId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "documents" ADD CONSTRAINT "documents_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;