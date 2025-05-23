"use server"

import { z } from "zod";
import { DocumentSchema } from "../../src/schemaType";
import db from "../../src/index";
import { documentTable } from "../../src/db/schema";
import { eq } from "drizzle-orm";


interface Response {
    success : boolean , msg : string , data? : z.infer<typeof DocumentSchema> & {id : string}
}


export const createDocument = async(rawData : z.infer<typeof DocumentSchema>) : Promise<Response> =>{


  const {data , success} = DocumentSchema.safeParse(rawData)
  if(!success){
    return {success : false , msg : 'Invalid data'}
  }

  const [document] = await db.insert(documentTable).values({
    ...data
  }).returning()



    return {success : true , msg : 'Document created successfully' , data : document}



}


export const getDocumentsforUser = async(userId:string) =>{
    

  const documents = await db.query.documentTable.findMany({
    where : eq(documentTable.ownerId , userId)
  })

  return documents;
}
export const getDocument = async(id:string) =>{
    

  const document = await db.query.documentTable.findFirst({
    where : eq(documentTable.id , id)
  })
  if(!document) return null
  
  return document;
}



export const updateDocument = async({data , id}: { id : string , data : { title? : string , content? : Record<string , unknown> }} ) =>{
      
  const [updatedDocs] = await db.update(documentTable).set({...data}).where(eq(documentTable.id , id)).returning();

  return {data : updatedDocs , success : true}
}

export const deleteDocument = async({documentId , userId} : {
  documentId : string , 
  userId : string
}) =>{
  const document =  await db.query.documentTable.findFirst({
    where : eq(documentTable.id , documentId)
  }) 
  if (document?.ownerId != userId){
    return null
  }
  await db.delete(documentTable).where(eq(documentTable.id , documentId))

  return {success : true}
}