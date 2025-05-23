'use client'

import Image from "next/image"
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { Button } from "../../components/ui/button"
import { PlusIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription  } from "../../components/ui/dialog"
import { useState } from "react"
import { Input } from "../../components/ui/input"




export const Navbar = ()=>{

     const [name , setName] = useState('')
         const[isDialog , setIsDialog] = useState(false)
    
    return (
        <nav className="flex items-center justify-between h-full w-full px-4">
            <div className="flex gap-3 items-center shrink-0 pr-6">
           <Link href={'/'}>
             <Image src="/logo.svg" alt="logo" width={25} height={35} />     
                </Link>
            <h3 className="text-xl">
            Docs
            </h3>
            </div>
            <div className="flex-1 flex justify-center"><SearchInput/></div>
            <div >
                <Button variant='outline' className="flex items-center justify-center outline-black"  onClick={()=>setIsDialog(true)}><PlusIcon /> Organization</Button>
            </div>

            <Dialog open={isDialog} onOpenChange={(open)=>{
                setIsDialog(open)
                if(!open){
                    setName("");
                }
            }}>

              <DialogContent  onClick={(e) => e.stopPropagation()}>
                                                        <DialogHeader>
                                                            <DialogTitle>Create Organization</DialogTitle>

                                                        </DialogHeader>
                                                        
                                                                <p className="text-foreground mb2">Name:</p>
                                                            <div >
                                                                <Input  value={name} onChange={(e)=>setName(e.target.value)}/>
                                                            </div>
                                                    <DialogFooter>
                                                            <Button>Save</Button>
                                                    </DialogFooter>
                                                    </DialogContent>
                                                   </Dialog>
            
        </nav>
    )
}