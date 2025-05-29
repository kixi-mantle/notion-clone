CREATE TABLE "user_organization" (
	"userId" uuid,
	"organizationId" uuid,
	CONSTRAINT "user_organization_organizationId_userId_pk" PRIMARY KEY("organizationId","userId")
);
--> statement-breakpoint
ALTER TABLE "organizations" RENAME COLUMN "owner_id" TO "ownerId";--> statement-breakpoint
ALTER TABLE "organizations" DROP CONSTRAINT "organizations_owner_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "documents" ALTER COLUMN "content" SET DATA TYPE jsonb USING content::jsonb;--> statement-breakpoint
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_organization" ADD CONSTRAINT "user_organization_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organizations" ADD CONSTRAINT "organizations_ownerId_users_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;