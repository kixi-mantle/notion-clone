"use client"

import Image from "next/image"
import Link from "next/link"
import {  DocumentInput } from "./document-input";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../../components/ui/menubar";
import { DownloadIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, PrinterIcon, SaveIcon, TrashIcon } from "lucide-react";
import { useEditorStore } from "../../../../store/use-editor-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import useDataStore from "../../../lib/store/data";
import { updateDocument } from "../../../../drizzle/queries/document";
import {isEqual} from 'lodash'
import { useToast } from "../../../hooks/use-toast";





export const Navbar = ()=>{

    const [renameDialog, setrenameDialog] = useState(false)
     const doc = useDataStore((state)=> state.document)
     const setDocument = useDataStore((state)=> state.setDocument)
     const [name , setName] = useState(doc?.title)
     const[isSubmitting ,  setIsSubmitting] = useState(false)
     const {toast} = useToast();

     const handleRename = async()=>{
        setIsSubmitting(true)
        const res = await updateDocument({id : doc!.id , data : {title : name}})
        if(res.success)setDocument(res.data)
            setIsSubmitting(false) 
        setrenameDialog(false)
     }
    
    const{editor} = useEditorStore()


     const saveDoc = useCallback( async()=>{
                 const content : Record<string , unknown> = editor?.getJSON() || {};
                 if(!isEqual(content , doc?.content)){ 
                   const res =  await updateDocument({id : doc!.id , data : {content}})
                   if (res.success){
                    toast({
                        title : "file Saved Sucessfully"
                    })
                   }
                }
        },[doc , editor , toast])
    

    useEffect(()=>{
       

        window.addEventListener("unload" , saveDoc)

        return ()=> {
            window.removeEventListener("unload" , saveDoc)
        }
    },[saveDoc])

    const onDownload = (blob : Blob , filename : string)=>{
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; 
        a.download = filename;
        a.click();
    }
    
    const onSaveJson = () =>{
        if(!editor) return ;
        
        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], {
            type : "application/json"
        })
        onDownload(blob , 'document.json')
    }

    
    const onSaveHTML = () =>{
        if(!editor) return ;
        
        const content = editor.getHTML();
        const blob = new Blob([content], {
            type : "text/html"
        })
        onDownload(blob , 'document.html')
    }
    const onSaveText = () =>{
        if(!editor) return ;
        
        const content = editor.getText();
        const blob = new Blob([content], {
            type : "text/plain"
        })
        onDownload(blob , 'document.txt')
    }
   
    
    

    
     

    

   

     
    return (
        <nav className=" flex items-center justify-between ">
            <div className="flex gap-2 items-center p-2">
                <Link href={'/'}>
             <Image src="/logo.svg" alt="logo" width={25} height={35} />     
                </Link>

               
                 
                     <div className="flex flex-col">
                        <DocumentInput title={doc!.title}/>
               
                <div className="flex ">
                <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                    <MenubarMenu >
                    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                            File
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger>

                                <DownloadIcon className="size-4 mr-2"/> download
                                </MenubarSubTrigger>
                                <MenubarSubContent>
                                    <MenubarItem onClick={()=> onSaveJson()}>
                                    <FileJsonIcon className="size-4 mr-2" />
                                    JSON
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> onSaveHTML()}>
                                    <GlobeIcon className="size-4 mr-2" />
                                    HTML
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> window.print()}>
                                    <FileJsonIcon className="size-4 mr-2"   />
                                    PDF
                                    </MenubarItem>
                                    <MenubarItem onClick={()=> onSaveText()}>
                                    <FileTextIcon className="size-4 mr-2" />
                                    Text
                                    </MenubarItem>
                                </MenubarSubContent>
                            </MenubarSub>

                                       

                                      
                                      <MenubarItem onClick={()=>saveDoc()}>

                                    <SaveIcon className="size-4 mr-2" />
                                       Save
                                    
                                      </MenubarItem>
                                      <MenubarSeparator/>
                                      <MenubarItem>

                                    <FilePlusIcon className="size-4 mr-2" />
                                       New Document
                                    
                                      </MenubarItem>
                                      <MenubarSeparator/>



                                      <MenubarItem onClick={(e)=>{e.stopPropagation(); setrenameDialog(true)}}>

                                    <FilePenIcon className="size-4 mr-2" />
                                       Rename
                                    
                                      </MenubarItem >

                                       
                                       
                                       <MenubarItem>

                                    <TrashIcon className="size-4 mr-2" />
                                       Remove
                                    
                                      </MenubarItem>
                                      <MenubarSeparator/>

                                       <MenubarItem>

                                    <PrinterIcon className="size-4 mr-2" />
                                       Print
                                    
                                      </MenubarItem>


                        </MenubarContent>
                    </MenubarTrigger>
                    </MenubarMenu>
                   
                </Menubar>

                <Dialog open={renameDialog} onOpenChange={setrenameDialog}>
                            
                                        <DialogContent  onClick={(e) => e.stopPropagation()}>
                                            <DialogHeader>
                                                <DialogTitle>Save the file as</DialogTitle>
                                            </DialogHeader>
                                                <div className="mt-4">
                                                    <Input  value={name} onChange={(e)=>setName(e.target.value)}/>
                                                </div>
                                        <DialogFooter>
                                                <Button className={`${isSubmitting ? 'bg-muted-foreground' : ''}`}  onClick={handleRename}  disabled={isSubmitting}>Save</Button>
                                                <Button variant='destructive' onClick={() => setrenameDialog(false)}>cancle</Button>
                                        </DialogFooter>
                                        </DialogContent>
                                       </Dialog>

               
            </div>
             </div>
             </div>
             </nav>
    )
}