


import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../components/ui/dropdown-menu'
import { Button } from '../../components/ui/button'
import { ExternalLink, MoreVertical } from 'lucide-react'

function DocumentMenu({
    documentId , title , onNewTab
}) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            
      <Button variant="ghost" size='icon' className='rounded-full'>
        <MoreVertical className='size-4'/>
      </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuItem
            onClick={()=> onNewTab(documentId)}>
                    <ExternalLink className='size-4 mr-2'/> Open in a new tab
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default DocumentMenu
