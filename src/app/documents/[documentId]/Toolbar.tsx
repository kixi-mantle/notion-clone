"use client"

import { BoldIcon, ChevronDownIcon, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, Undo2Icon } from "lucide-react"
import { cn } from "../../../lib/utils"
import { useEditorStore } from "../../../../store/use-editor-store";
import { Separator } from "../../../components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../../../components/ui/dropdown-menu";
import {type Level} from '@tiptap/extension-heading'




const FontFamilyButton = ()=>{
    const {editor} = useEditorStore();
     const fonts = [
        {lable : "Arial" , value : "Arial"},
        {lable : "Times New Roman" , value : "Times New Roman"},
        {lable : "Courier New" , value : "Courier New"},
        {lable : "Georgia" , value : "Georgia"},
        {lable : "Verdana" , value : "Verdana"},
     ];

     return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className={cn("h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                        {editor?.getAttributes("textStyle").fontFamily || "Arial"}
                        
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {
                    fonts.map(({lable ,value})=>(
                        <button
                        key={value} 
                        className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        editor?.getAttributes("textStyle").fontFamily === value && "bg-neutral-200/80")}
                        style= {{ fontFamily : value}}
                        onClick={()=>editor?.chain().focus().setFontFamily(value).run()}>
                                <span className="text-sm">{lable}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
     )
}


const HeadingButton = ()=>{
    const {editor} = useEditorStore();
     const headings = [
        {lable : "Normal text" , value  : 0 , fontSize: "16px"},
        {lable : "Heading 1" , value  : 1 , fontSize: "32px"},
        {lable : "Heading 2" , value  : 2 , fontSize: "24px"},
        {lable : "Heading 3" , value  : 3 , fontSize: "20px"},
        {lable : "Heading 4" , value  : 4 , fontSize: "18px"},
        {lable : "Heading 5" , value  : 5 , fontSize: "16px"},
        
     ];

     const getCurrentHeading = ()=> {
        for(let level = 1 ; level <= 5; level++){
            if(editor?.isActive('heading',{level})){
                return `Heading ${level}`
            }

            return "Noraml text"
        }
     }

     return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                className={cn("h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm")}>
                    <span className="truncate">
                       
                        {getCurrentHeading()}
                    </span>
                    <ChevronDownIcon className="ml-2 size-4 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
                {
                    headings.map(({lable ,value , fontSize})=>(
                        <button
                        key={value} 
                        className={cn(
                        "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                        (value === 0 && !editor?.isActive("heading")) || editor?.isActive('heading', {level : value }) && "bg-neutral-200/80")}
                        style= {{ fontSize }}
                        onClick = {()=>{
                            if(value === 0 ){
                                editor?.chain().focus().setParagraph().run()
                            } else {
                                editor?.chain().focus().toggleHeading({level : value as Level }).run()
                            }
                        }}
                       >
                                <span className="text-sm">{lable}</span>
                        </button>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
     )
}

interface ToolbarButtonProps {
    onClick? : () => void;
    isActive? : boolean ;
    icon : LucideIcon
}

const ToolbarButton = ({
   isActive ,
    icon : Icon, 
    onClick
} : ToolbarButtonProps) =>{
    return (
        <button
        onClick={onClick}
        className={cn(
            "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
            isActive && "bg-neutral-200/80"
        )}>
        <Icon className="size-4"></Icon>
        </button>
    )
}

export const Toolbar = () => {

    const { editor } = useEditorStore();

    const sections : {
        label : string ;
        icon : LucideIcon ;
        onClick : ()=> void ;
        isActive? : boolean ;
    }[][] = [
        [
            {
                label :'undo',
                icon : Undo2Icon ,
                onClick :() => editor?.chain().focus().undo().run(),
            },
            {
                label :'redo',
                icon : Redo2Icon ,
                onClick :() => editor?.chain().focus().redo().run(),
            },
            {
                label :'Print',
                icon : PrinterIcon ,
                onClick :() => window.print(),
            },
            
            {
                label :'Spell Check',
                icon : SpellCheckIcon ,
                onClick :() =>{
                    const current = editor?.view.dom.getAttribute("spellcheck");
                    editor?.view.dom.setAttribute("spellcheck" , current === "false" ? "true" : "false")
                }
            },
        ],

        [
              {
                label: "Bold" ,
                icon : BoldIcon , 
                isActive : editor?.isActive("bold"),
                onClick: ()=> editor?.chain().focus().toggleBold().run(),
              },
              {
                label: "italic" ,
                icon : ItalicIcon , 
                isActive : editor?.isActive("Italic"),
                onClick: ()=> editor?.chain().focus().toggleItalic().run(),
              },
              
        ],
        [
           {
                label: "Comment" ,
                icon : MessageSquarePlusIcon , 
                isActive : false,
                onClick: ()=> console.log("hello World"),
              }, 
           {
                label: "List Todo" ,
                icon : ListTodoIcon , 
                onClick: ()=> console.log("hello World"),
                isActive : editor?.isActive("taskList")
              }, 
           {
                label: "Remove Formatting" ,
                icon : RemoveFormattingIcon , 
                onClick: ()=> editor?.chain().focus().unsetAllMarks().run(),
                
              }, 
        ]
    ]
    return (

        <div className="bg-[#F1F4F9] px-2.5 py0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5">
            {
                sections[0].map((item) =>(
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
            <Separator orientation= "vertical" className="h-6 bg-neutral-300 "/>
                <FontFamilyButton />
 
            
            <Separator orientation= "vertical" className="h-6 bg-neutral-300 "/>
              <HeadingButton />
            
            
            <Separator orientation= "vertical" className="h-6 bg-neutral-300 "/>
              {
                sections[1].map((item) =>(
                    <ToolbarButton key={item.label} {...item} />
                ))
            }
        </div>
    )
}