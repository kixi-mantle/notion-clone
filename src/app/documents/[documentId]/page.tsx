import React from 'react'
import Editor from './editor'
import { Toolbar } from './Toolbar'
import { Navbar } from './Navbar'
import { getDocument } from '../../../../drizzle/queries/document'
import { notFound } from 'next/navigation'
import { z } from 'zod'
import { DocumentSchema } from '../../../schemaType'

export default async function page({ params } : { params : Promise<{documentId : string}>}) {
   
    const {documentId} = await params
    const document : z.infer<typeof DocumentSchema> & {id : string , createdAt : Date} = await getDocument(documentId)

    if(!document){
      notFound()
    }

  
    return (
    <div className='min-h-screen bg-[#F4F5F7]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
      <Navbar title={document.title} id={document?.id}/>
        
      <Toolbar/>
      </div>
         <div className='pt-[114px] print:pt-0'>
      <Editor/>
         </div>
    </div>
  )
}
