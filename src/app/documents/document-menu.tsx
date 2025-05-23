
"use client"

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import { ExternalLink, MoreVertical, Trash2Icon } from 'lucide-react'


interface docMenu {
  documentId : string , 
 
 
}

function DocumentMenu({
    documentId  
} : docMenu) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            
      <Button variant="ghost" size='icon' className='rounded-full border-none focus:outline-none focus:ring-0 focus-visible:ring-0'>
        <MoreVertical className='size-4'/>
      </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem
            onClick={()=>   window.open(`/documents/${documentId}`  , "_blank")}>
                    <ExternalLink className='size-4 mr-2'/> Open in a new tab
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash2Icon className='size-4 mr-2'/> Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu
