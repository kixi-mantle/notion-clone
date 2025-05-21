import { relations } from "drizzle-orm";
import { primaryKey } from "drizzle-orm/pg-core";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";




export const userTable= pgTable("users" , {
    id : uuid().primaryKey().defaultRandom(),
    email : text().notNull(),
    name : text().notNull(),
})



export const documentTable = pgTable("documents" , {
    id : uuid().primaryKey().defaultRandom(),
    title : text(),
    content : text(),
    ownerId : uuid().references(()=>userTable.id).notNull(),
    roomId : text(),
    organizationId : uuid().references(()=>organizationTable.id),
})


export const organizationTable = pgTable("organizations", {
  id: uuid("id").defaultRandom(),
  name: text("name").notNull(),
  ownerId: uuid("owner_id").notNull().references(() => userTable.id),
}, (t) => ({
  pk: primaryKey({ columns: [t.id, t.ownerId] }),
}));












//relations
export const userTableRelations = relations(userTable, ({one ,  many }) => ({
  documents: many(documentTable, {
    relationName: "userDocuments",
  }),

  owner : one(organizationTable , {
    fields :  [userTable.id], 
    references : [organizationTable.ownerId],
    relationName : "organizationOwner"
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
    relationName : "organization" 
  }

  )
}));

export const organizationTableRelations = relations(organizationTable , ({many})=>({
  documents : many(documentTable , {
    relationName : 'organization-docs'
  }
    
  )
}))