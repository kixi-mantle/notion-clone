"use client"

import { z } from "zod"
import useDataStore from "../../../../../../lib/store/data"
import { Navbar } from "../../../../../documents/[documentId]/Navbar"
import { Toolbar } from "../../../../../documents/[documentId]/Toolbar"
import Editor from "../../../../../documents/[documentId]/editor"
import { DocumentFull } from "../../../../../../schemaType"
import { useEffect, useRef, useState } from "react"
import {io , Socket} from "socket.io-client"
import { useEditorStore } from "../../../../../../../store/use-editor-store"
import { Step } from "@tiptap/pm/transform"

function ClientWrapper({
    docInfo , docId
}: {docInfo : z.infer<typeof DocumentFull> , docId : string}) {

    
    const setDocument = useDataStore((state)=> state.setDocument)
    const document = useDataStore((state)=> state.document)
    const user = useDataStore((state)=> state.user)
    const {editor} = useEditorStore()

    const [socket, setSocket] = useState<Socket | null>(null)
    const isApplyingRemoteUpdate = useRef(false);
    
    
    useEffect(()=>{
        setDocument(docInfo)
        const s = io("http://localhost:3000")
        setSocket(s)
        
        return () =>{
            s.disconnect();
        }
    },[docInfo , setDocument])


    useEffect(() => {
    if (!socket) return;

    socket.on("connect", () => {
      console.log(" connected to socket");
      socket.emit("join-room" , docId)
    });

    return () => {
      socket.off("connect");
    };
  }, [socket , docId] );


  useEffect(()=> {
    
    if(!editor || !socket) return ;

    const handleTransaction = ({ transaction } : { transaction : any}) =>{
      if(!transaction.docChanged) return;


      if(isApplyingRemoteUpdate.current) return 

      const jsonSteps = transaction.steps.map(step=>step.toJSON())
      
      console.log("Emitting doc-update", { steps: jsonSteps, docId });
      socket?.emit('doc-update' , {
        steps : jsonSteps , 
        docId : docId,
        clientId : user?.id
      })
    }

    const handleDocUpdate = ({steps} : {steps : any[] , userId : string}) => {
      
      const state = editor.state;
      let tr = state.tr;

      for(const json of steps){
        const step = Step.fromJSON(state.schema , json)
        tr = tr.step(step)
      }

      if(tr.docChanged){
        isApplyingRemoteUpdate.current = true;
        editor.view.dispatch(tr)
        isApplyingRemoteUpdate.current = false;
      }
    }

    editor?.on('transaction' , handleTransaction)

    socket?.on('doc-update' , handleDocUpdate)


    return () => {
    editor.off('transaction', handleTransaction);
    socket.off('doc-update', handleDocUpdate);
  };

  } , [editor , socket , docId , user])

    
  
    return (
     <div className='min-h-screen bg-[#F4F5F7]'>
      <div className='flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#FAFBFD] print:hidden'>
      <Navbar/>
        
      <Toolbar/>
      </div>
         <div className='pt-[114px] print:pt-0'>
      <Editor  content={document?.content}/>
         </div>
    </div>
  )
}

export default ClientWrapper
