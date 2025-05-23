import React from 'react'

import { getDocument } from '../../../../drizzle/queries/document'
import { notFound } from 'next/navigation'
import ClientWrapper from './clientWrapper'
import { z } from 'zod'
import { DocumentFull } from '../../../schemaType'


export default async function Page({ params } : { params : Promise<{documentId : string}>}) {
   
    const {documentId} = await params
    const docInfo : z.infer<typeof DocumentFull> | null = await getDocument(documentId)
    if(!docInfo){
      notFound()
    } 
    

    if(!docInfo){
      notFound()
    }

  
    return (
               <ClientWrapper docInfo= {docInfo} />
  )
}

 
