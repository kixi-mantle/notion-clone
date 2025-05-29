"use server"

import { cookies } from "next/headers"
import db from "./index";

export const getUser = async() : Promise<{id : string , name : string  , email : string} | undefined | null>  =>{
   const userId = (await cookies()).get("user_id")?.value;


    if(!userId) return null;

    const user = await db.query.userTable.findFirst({
        where : (fields  , {eq}) => eq(fields.id , userId)
    })

    return user
}