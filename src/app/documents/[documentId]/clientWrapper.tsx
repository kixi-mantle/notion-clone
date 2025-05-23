"use client"
import React from 'react'
import Editor from './editor'
import { Toolbar } from './Toolbar'
import { Navbar } from './Navbar'
import {DocumentFull} from '../../../schemaType'
import { z } from 'zod'
import useDataStore from '../../../lib/store/data'

function ClientWrapper({
    docInfo
}: {docInfo : z.infer<typeof DocumentFull>}) {

    
    const setDocument = useDataStore((state)=> state.setDocument)
    const document = useDataStore((state)=> state.document)
    setDocument(docInfo)

    
  
    return (
     <div className='min-h-screen bg-[#F4F5F7]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
      <Navbar/>
        
      <Toolbar/>
      </div>
         <div className='pt-[114px] print:pt-0'>
      <Editor  content={document?.content}/>
         </div>
    </div>
  )
}

export default ClientWrapper
