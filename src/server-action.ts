"use server"


import { z } from "zod"
import { UserSchema } from "./schemaType"
import db from './index'
import { userTable } from "./db/schema"
import { cookies } from "next/headers"

export const login  = async(userData : z.infer<typeof UserSchema>) =>{

try{
const user = await db.query.userTable.findFirst({
        where : (fields , {eq}) => eq( fields.email ,userData.email )
    })

    let finalUser = user;

    if(!user){
        const [newUser] = await db.insert(userTable).values({
            name : userData.name , 
            email : userData.email
        }).returning();

        if(!newUser){
            return "error occured"
        }
        finalUser = newUser;
    }
    
    const cookieStore = await cookies();
    cookieStore.set("user_id" , finalUser!.id , {
        httpOnly: true , 
        maxAge : 60*60*24*7
    });

    return { success : true }
}catch(error){
    console.error(error)
}
    
    
}