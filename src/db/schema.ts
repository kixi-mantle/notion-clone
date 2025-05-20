import { relations } from "drizzle-orm";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";




export const userTable= pgTable("users" , {
    id : uuid().primaryKey().defaultRandom(),
    email : text().notNull(),
    name : text().notNull(),
})



export const documentTable = pgTable("documents" , {
    id : uuid().primaryKey().defaultRandom(),
    title : text().notNull(),
    initialContent : text(),
    ownerId : uuid().references(()=>userTable.id),
    roomId : text(),
    organizationId : text(),
})











//relations
export const userTableRelations = relations(userTable, ({ many }) => ({
  documents: many(documentTable, {
    relationName: "userDocuments",
  }),
}));
 
export const documentTableRelations = relations(documentTable, ({ one }) => ({
  owner: one(userTable, {
    fields: [documentTable.ownerId],
    references: [userTable.id],
    relationName: "documentOwner",
  }),
}));