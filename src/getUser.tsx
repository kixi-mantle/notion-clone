"use server"

import { cookies } from "next/headers"
import db from "./index";
import { cache } from "react";

export const getUser = cache(async()=>{
   const userId = (await cookies()).get("user_id")?.value;


    if(!userId) return null;

    const user = await db.query.userTable.findFirst({
        where : (fields  , {eq}) => eq(fields.id , userId)
    })

    return user
})