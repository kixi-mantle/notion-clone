"use server"

import { revalidateTag } from "next/cache"
import { revalidateUser } from "./user";


export async function DocCacheTag  (id : string) : Promise<string> {
     return `document-${id}`
}

export async function revalidateDocument ({documentId , userId} : { documentId :string , userId : string}) {
 revalidateTag(await DocCacheTag(documentId));
   revalidateUser(userId)
}