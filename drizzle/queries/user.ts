"use server"
import { like } from "drizzle-orm"
import { userTable } from "../../src/db/schema"
import db from "../../src/index"


export const getEmails = async(word : string) : Promise<null | string[]>=>{
      const emails = await db.select({ email: userTable.email }).from(userTable).where(like(userTable.email ,`${word}%` ));
      if(!emails || emails.length === 0) return null

      const res = emails.map((e)=> e.email)

      return res
}