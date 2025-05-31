"use server"

import db from "../../src/index";
import { documentTable, organizationTable, UserOrganizationTable, userTable } from "../../src/db/schema";
import { getUser } from "../../src/getUser";
import { eq, inArray } from "drizzle-orm";





export const createOrganization = async(name : string , emails : string[])=>{

            const user = await getUser();
            if(!user) return {success : false , msg : "unauthorized"}
            const [organization] = await db.insert(organizationTable).values({name  , ownerId : user.id}).returning()
            try {
                
                    await addUsersToOrg({organizationId : organization.id , users : emails})
                    
                    return {success : true , msg : 'Organization successfully created'}
            } catch (error) {
              console.error(error) 
                    return {success : false , msg : 'error occurred'}

            }


}

export const addUsersToOrg = async({organizationId , users} : { organizationId : string, users : string[]}) =>{

        if ( users.length == 0 ) return 

       const userIds = await Promise.all(
    users.map(async (email) => {
      const user = await db.query.userTable.findFirst({ where: eq(userTable.email, email) });
      return user?.id;
    })
  );

  const validUserIds = userIds.filter((id) : id is string => !!id);


       await Promise.all( validUserIds.map( async (e)=>{
              await db.insert(UserOrganizationTable).values({organizationId , userId : e}).returning()
        }))
}

export const getOrganization = async()=>{
         const user = await getUser();
            if(!user) return { owner: [], member: [] };
            const organizations = await db.query.organizationTable.findMany({ where : eq(organizationTable.ownerId , user.id)})
            const otherOrg = await db.query.UserOrganizationTable.findMany({ where : eq(UserOrganizationTable.userId , user.id)})
            const validOrgIds = otherOrg.map(org => org.organizationId)
                                        .filter((id): id is string => id !== null);
            
             const memberOrgs = validOrgIds.length > 0
                                        ? await db.query.organizationTable.findMany({
                                        where: inArray(organizationTable.id, validOrgIds)
                                        })
                                        : [];

            return {owner : organizations ?? [] , member : memberOrgs   } 
}

export const getOrganizationDocs = async(organizationId : string)=>{
        const docs = await db.query.documentTable.findMany({where : eq(documentTable.organizationId , organizationId)});
        
        return docs ?? []
}