import React from 'react'
import Editor from './editor'

export default async function page({ params } : { params : Promise<{documentId : string}>}) {
   
    const {documentId} = await params
  
    return (
    <div className='min-h-screen bg-[#F4F5F7]'>
      id: {documentId}
      <Editor/>
    </div>
  )
}
