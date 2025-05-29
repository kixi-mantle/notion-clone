import { z } from "zod";
import { getOrganizationDocs } from "../../../../../drizzle/queries/organization";
import { DocumentFull } from "../../../../schemaType";
import { Suspense } from "react";
import { TemplateGallery } from "../../../../contansts/template-gallery";
import DocumentTable from "../../../documents/documentTable";
import { getUser } from "../../../../getUser";



const Page = async({params} : { params : Promise<{organizationId : string}>})=>{

    const {organizationId} = await params;
    const documents : z.infer<typeof DocumentFull>[] | [] = await getOrganizationDocs(organizationId)
    const user = await getUser()

    return (
         <div className="min-h-screen flex flex-col">
           
               
                <div className="mt-16">
                    <Suspense>

                    <TemplateGallery id={user!.id} organizationId={organizationId}/>
                    </Suspense>
                </div>


                

                <DocumentTable documents={documents}/>

        </div>
    )

}


export default Page