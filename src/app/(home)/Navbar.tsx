'use client'

import Image from "next/image"
import Link from "next/link"
import { SearchInput } from "./SearchInput"
import { Button } from "../../components/ui/button"
import {  PlusIcon, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter  } from "../../components/ui/dialog"
import {  useEffect, useState } from "react"
import { Input } from "../../components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../components/ui/command"
import { getEmails } from "../../../drizzle/queries/user"
import { createOrganization } from "../../../drizzle/queries/organization"
import { toast } from "../../hooks/use-toast"
import Dropdown from "./DropDown"
import { z } from "zod"
import { organizationFull, UserSchema } from "../../schemaType"




export const Navbar = ({user , organizations} : { user : z.infer<typeof UserSchema> & {id : string} , organizations : z.infer<typeof organizationFull>[]})=>{

     const [name , setName] = useState('')
     const [emails , setEmails] = useState<string[]>([]) 
     const [selectedEmails , setSelectedEmails] = useState<string[]>([])
     const [searchEmail , setSearchEmail] = useState('')
     const[isDialog , setIsDialog] = useState(false)
     const [isGetting , setIsGetting] = useState(false)
     

         const CreateOrg = async()=>{
           if(name.trim() == "") return 
           const res = await createOrganization(name , selectedEmails)
             if(res.success){
               toast({
                title : res.msg
               }) 
             }
            
         }

        useEffect(()=>{
            const fetchEmails = async()=>{
                setIsGetting(true)
                const res = await getEmails(searchEmail) ?? []
                setEmails(res) 
                setIsGetting(false)
            }
            if(searchEmail.trim() != ""){
               fetchEmails()
            }else{
                setEmails([])
            }

        },[searchEmail])

        useEffect(()=>{
            console.log(selectedEmails)
            
        },[selectedEmails])

    
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

                

            <Dropdown user={user} organizations={organizations}/>
               

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
                                                        
                                                            <div className="flex-col gap-4">
                                                                <div>
                                                                     <p className="text-black mb-1 text-sm font-semibold">Name:</p>
                                                           
                                                                <Input  value={name} onChange={(e)=>setName(e.target.value)} className="border-black"/>
                                                            
                                                                </div>

                                                                <div>
                                                                    <div className="p-3 border border-black rounded-md mt-4 h-[80px] flex flex-wrap overflow-y-auto gap-2">

                                                                        {selectedEmails.map((e : string)=>(
                                                                        <div key={e} className="p-2 flex items-center w-fit h-fit  border rounded-lg bg-slate-200 text-sm">
                                                                          <p className="w-[100px] truncate">{e}</p>  <X  size="16px" className="ml-3  hover:text-red-600 cursor-pointe" onClick={()=> setSelectedEmails((prev=> prev.filter(email => email != e)))}/>
                                                                        </div>
                                                                        ))} 
                                                                        </div>                                                                    
                                                                    <Command className="mt-3">
                                                                        <CommandInput placeholder="Search collaborators..." 
                                                                         value={searchEmail}
                                                                          onValueChange={(val) => setSearchEmail(val)} className=""/>
                                                                            <CommandList className="h-[80px] overflow-y-auto">
                                                                                <CommandEmpty>{searchEmail.trim() == "" ? "" : 'No User Found' }</CommandEmpty>
                                                                                <CommandGroup>
                                                                                    {
                                                                                        isGetting  ? (
                                                                                              <div className="flex justify-center items-center">
                                                                                                    <div className="h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                                                                                    </div>
                                                                                        ) : (
                                                                                            emails.map((e) => (
                                                                                                <CommandItem key={e} 
                                                                                                
                                                                                                onSelect={()=> setSelectedEmails((prev) => {
                                                                                                   return prev.includes(e) ? 
                                                                                                 [...prev] // remove if already selected
                                                                                                : [...prev, e]; 
                                                                                                })} className="h-[40px] hover:bg-slate-600 cursor-pointer">{e}</CommandItem>
                                                                                            ))
                                                                                        ) 
                                                                                    }
                                                                                </CommandGroup>
                                                                            </CommandList>
                                                                        
                                                                    </Command>
                                                                </div>
                                                            </div>
                                                    <DialogFooter>
                                                            <Button onClick={()=>CreateOrg()}>create</Button>
                                                    </DialogFooter>
                                                    </DialogContent>
                                                   </Dialog>
            
        </nav>
    )
}