"use server"

import db from "../../src/index";
import { documentTable, organizationTable, UserOrganizationTable } from "../../src/db/schema";
import { getUser } from "../../src/getUser";
import { eq, inArray } from "drizzle-orm";





export const createOrganization = async(name : string , emails : string[])=>{

            const user = await getUser();
            if(!user) return {success : false , msg : "unauthorized"}
            const [organization] = await db.insert(organizationTable).values({name  , ownerId : user.id}).returning()
            await addUsersToOrg({organizationId : organization.id , users : emails})

            return {success : true , msg : 'Organization successfully created'}

}

export const addUsersToOrg = async({organizationId , users} : { organizationId : string, users : string[]}) =>{

        if ( users.length == 0 ) return 
       await Promise.all( users.map((e)=>{
             db.insert(UserOrganizationTable).values({organizationId , userId : e})
        }))
}

export const getOrganization = async()=>{
         const user = await getUser();
            if(!user) return []
            const organizations = await db.query.organizationTable.findMany({ where : eq(organizationTable.ownerId , user.id)})
            const otherOrg = await db.query.UserOrganizationTable.findMany({ where : eq(UserOrganizationTable.userId , user.id)})
            const validOrgIds = otherOrg.map(org => org.organizationId)
                                        .filter((id): id is string => id !== null);
            
             const memberOrgs = validOrgIds.length > 0
                                        ? await db.query.organizationTable.findMany({
                                        where: inArray(organizationTable.id, validOrgIds)
                                        })
                                        : [];

            return {myOrgs : organizations ?? [] , memberOrgs   } 
}

export const getOrganizationDocs = async(organizationId : string)=>{
        const docs = await db.query.documentTable.findMany({where : eq(documentTable.organizationId , organizationId)});
        
        return docs ?? []
}