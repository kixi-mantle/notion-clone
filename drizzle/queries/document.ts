import { z } from "zod";
import { DocumentSchema } from "../../src/schemaType";
import db from "../../src/index";
import { documentTable } from "../../src/db/schema";


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
