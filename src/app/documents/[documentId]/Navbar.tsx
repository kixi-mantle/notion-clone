"use client"

import Image from "next/image"
import Link from "next/link"
import {  DocumentInput } from "./document-input";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarSub, MenubarSubContent, MenubarSubTrigger, MenubarTrigger } from "../../../components/ui/menubar";
import { FileIcon, FileJsonIcon, FilePenIcon, FilePlusIcon, FileTextIcon, GlobeIcon, PrinterIcon, TrashIcon } from "lucide-react";
import { useEditorStore } from "../../../../store/use-editor-store";





export const Navbar = ()=>{
    const{editor} = useEditorStore()

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
                        <DocumentInput/>
               
                <div className="flex ">
                <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                    <MenubarMenu >
                    <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                            File
                        <MenubarContent>
                            <MenubarSub>
                                <MenubarSubTrigger>

                                <FileIcon className="size-4 mr-2"/> save
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
                                      
                                      <MenubarItem>

                                    <FilePlusIcon className="size-4 mr-2" />
                                       New Document
                                    
                                      </MenubarItem>
                                      <MenubarSeparator/>

                                       <MenubarItem>

                                    <FilePenIcon className="size-4 mr-2" />
                                       Rename
                                    
                                      </MenubarItem>
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
               
            </div>
             </div>
             </div>
             </nav>
    )
}