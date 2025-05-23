


import { Building2Icon, CircleUserIcon, LoaderIcon } from 'lucide-react'
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import { format } from 'date-fns'
import DocumentMenu from './document-menu'
import { DocumentSchema } from '../../schemaType'
import { z } from 'zod'
import Link from 'next/link'




function DocumentTable({
    documents
} : { documents : (z.infer<typeof DocumentSchema> & { id : string , createdAt : Date})[] }) {

    // const onNewTabClick = (id: string) =>{
    //     window.open(`/documents/${id}`  , "_blank");
    // }
  return (
    <div className='max-w-screen-xl  w-full mx-auto px-16 py-6 flex flex-col gap-5'>
      {
        documents === undefined ? (
            <div className='flex justify-center items-center h-24'>
                <LoaderIcon className=' animate-spin text-muted-foreground size-5'/>
            </div>
        ) : 
        (
            <Table>
                <TableHeader>
                    <TableRow className="hover:bg-transparent border-none">
                       <TableHead>Name</TableHead>
                       <TableHead>&nbsp;</TableHead>
                       <TableHead>Shared</TableHead>
                       <TableHead>Created at</TableHead>

                    </TableRow>
                </TableHeader>
            {documents.length === 0 ? (
               <TableBody>
                <TableRow className='hover:bg-transparent'>
                <TableCell className=' h-24 text-center text-muted-foreground' colSpan={4}>No documents found</TableCell>
                </TableRow>
               </TableBody> 
            ):(
                <TableBody>
                    {
                        documents.map((document)=>(

                            <TableRow key={document.id} className='rounded-sm px-2'>
                                <TableCell className='font-medium md:w-[45%]'>
                                    <Link href={`/documents/${document.id}`} className='hover:text-blue-500 hover:underline'>{document.title}</Link>
                                </TableCell>
                                <TableCell className='text-muted-foreground hidden md:flex items-center gap-2'>
                                    {document.organizationId ? <Building2Icon className='size-4'/> : <CircleUserIcon className='size-4'/>}
                                {
                                   document.organizationId ? "Organization" : "Personal" 
                                }
                                </TableCell>
                                <TableCell className='text-muted-foreground hidden md:table-cell'>
                                    {format(new Date(document.createdAt) , "MMM dd, yyyy")}
                                </TableCell>
                                <TableCell className='flex justify-end'>
                                   <DocumentMenu documentId={document.id}  />
                                </TableCell>
                                
                            </TableRow> 
                        ))
                    }
                </TableBody>
            )
        }
            </Table>
        )
      }
    </div>
  )
}

export default DocumentTable
