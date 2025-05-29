"use client"

import { User2Icon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";

 const Dropdown = ({user , organizations} : { user : {id : string , name : string , email : string} , organizations : {id : string , name : string , ownerId : string}[]}) =>{
       
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

                       {
                        organizations.length > 0 ? (
                            organizations.map((organization)=>(
                                <div key={organization.id} className="w-full p-2 h-fit hover:bg-slate-200 rounded-md cursor-pointer" onClick={()=> router.replace(`/organization/${organization.id}`)}>
                                        {organization.name}
                                </div>
                            )) 
                        ) : (
                                "no organization yet"
                            )
                       }

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