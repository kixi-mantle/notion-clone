import { relations } from "drizzle-orm";
import {  jsonb, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";




export const userTable= pgTable("users" , {
    id : uuid().primaryKey().defaultRandom(),
    email : text().notNull(),
    name : text().notNull(),
})



export const documentTable = pgTable("documents" , {
    id : uuid().primaryKey().defaultRandom(),
    title : text().notNull(),
    content : jsonb().$type<Record<string , unknown>>(),
    ownerId : uuid().references(()=>userTable.id , { onDelete : 'cascade'}),
    roomId : text(),
    organizationId : uuid().references(()=>organizationTable.id , { onDelete : 'cascade'}),
    createdAt : timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});



export const organizationTable = pgTable("organizations", {
  id: uuid().defaultRandom().primaryKey().notNull(),
  name: text().notNull(),
  ownerId: uuid().notNull().references(() => userTable.id),
},);


export const UserOrganizationTable = pgTable("user_organization" , {
  userId : uuid().references(()=>userTable.id , { onDelete : 'cascade'}),
  organizationId : uuid().references(()=>organizationTable.id , { onDelete : 'cascade'})
},
(t)=>[
  primaryKey(
    {
      columns : [t.organizationId , t.userId]
    }
  ),
])












//relations
export const userTableRelations = relations(userTable, ({  many }) => ({
  documents: many(documentTable, {
    relationName: "userDocuments",
  }),

  ownedOrganizations: many(organizationTable, {
    relationName: "organizationOwner",
  }),

  organizationMember : many(UserOrganizationTable , {
    relationName : 'member_organization'
  })
}));
 
export const documentTableRelations = relations(documentTable, ({ one  }) => ({
  owner: one(userTable, {
    fields: [documentTable.ownerId],
    references: [userTable.id],
    relationName: "documentOwner",
  }),

  organization : one(organizationTable  , {
     fields :  [documentTable.organizationId], 
    references : [organizationTable.id],
    relationName : "documentOrganization" 
  }

  )
}));

export const organizationTableRelations = relations(organizationTable , ({many , one})=>({
  documents : many(documentTable , {
    relationName : 'organization-docs'
  } ),
  owner: one(userTable, {
    fields: [organizationTable.ownerId],
    references: [userTable.id],
    relationName: "organizationOwner",
  }),

  members : many(UserOrganizationTable , {
    relationName : "members"
  })
    
}))