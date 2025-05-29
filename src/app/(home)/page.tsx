import Link from "next/link"
import { getUser } from "../../getUser"
import DocumentTable from "../documents/documentTable"
import { getDocumentsforUser } from "../../../drizzle/queries/document"

import { TemplateGallery } from "../../contansts/template-gallery"
import { Suspense } from "react"





const Home = async() =>{

    const user = await getUser();
    const documents = await getDocuments(user!.id)



    return (
        <div className="min-h-screen flex flex-col">
           
                <div className="mt-16">
                    Click <Link href={'/documents/123'}>
                    <span className="text-blue-500 underline">&nbsp;here&nbsp;</span>
                    </Link> to go to document id
                </div>
                <div className="mt-16">
                    <Suspense>

                    <TemplateGallery id={user!.id}/>
                    </Suspense>
                </div>


                

                <DocumentTable documents={documents}/>

        </div>
    )
}

export default Home


async function getDocuments( userId : string){
    const documents = await getDocumentsforUser(userId)
    return documents
}