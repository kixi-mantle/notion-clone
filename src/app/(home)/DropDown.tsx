"use client"

import { User2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { organizationFull } from "../../schemaType";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Separator } from "@radix-ui/react-menubar";

 const Dropdown = ({user , organizations} : { user : {id : string , name : string , email : string} , organizations : {owner : z.infer<typeof organizationFull>[]  , member : z.infer<typeof organizationFull>[] }}) =>{
       
    const router = useRouter()
   

   
    
    return(
        <DropdownMenu>
            <DropdownMenuTrigger >
                <div className="w-10 h-10 rounded-full flex justify-center items-center bg-slate-200 ml-3">
           <User2Icon />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
            <div className="w-full font-semibold text-center my-3">{user.name}</div>
                <DropdownMenuItem>{user.email}</DropdownMenuItem>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="p-0">
                    <Accordion type="single" collapsible className="w-full hover:bg-white bg-white px-2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger onClick={(e)=>e.stopPropagation()}>organizations</AccordionTrigger>
                       <AccordionContent>
                        <div className="w-full bg-gray-100 p-2 rounded-md">
                                    {
                                        Object.entries(organizations).map(([key, value]) => (
                                        <div key={key} className="">
                                            <p className="text-sm text-gray-500 ">{key}</p>
                                            <Separator />
                                            <div>
                                            {
                                                value.length > 0 ? (
                                                value.map((organization) => (
                                                    <div key={organization.id} className="p-2 text-black rounded-md hover:bg-gray-300 cursor-pointer w-full" onClick={()=>router.push(`/organization/${organization.id}`)}>
                                                    {organization.name}
                                                    </div>
                                                ))
                                                ) : (
                                                <p className="text-gray-500 text-center w-full">none</p>
                                                )
                                            }
                                            </div>
                                        </div>
                                        ))
                                    }
                                    </div>
                    </AccordionContent>
                    </AccordionItem>
                    </Accordion>

                </DropdownMenuItem>
                 <div className="w-full flex justify-center my-3">
                        <Button>logout</Button>
                 </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
    

}


export default Dropdown