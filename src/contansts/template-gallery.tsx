"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel"
import { cn } from "../lib/utils";
import { templates } from "./template";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createDocument } from "../../drizzle/queries/document";





export const TemplateGallery = ({id , organizationId} : {id : string , organizationId ?: string })=>{
    

    const router = useRouter()
    
    const [isArrow , setIsArrow] = useState<boolean>(false)
    const CarouselRef = useRef<HTMLDivElement>(null);
    
    const isCreating = false;
    useEffect(()=>{
      const checkScroll = () => {
            if (CarouselRef.current) {
                const { scrollWidth, clientWidth } = CarouselRef.current;
                setIsArrow(scrollWidth > clientWidth);
            }
        };

        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);
    
          const createDoc = async()=>{
            const data = {
                    title: "Untitled_Doc",
                    content: null,
                    ownerId: id, // id must be a non-empty string
                    roomId: null,
                    organizationId: organizationId ?? null,
            }
            const res = await createDocument(data);
            if(res.success && res.data){
                router.push(`/documents/${res.data.id}`)
            }
          }
    return (
        <div className="bg-[#F1F3F4]">
            <div className="max-w-screen-xl  mx-auto px-16 py-6 flex flex-col gap-y-4">
                <h3 className="font-medium">
               start a new document 
                </h3>
                <Carousel>
                    <CarouselContent className="-ml-4 w-full" ref={CarouselRef}>
                      {templates.map((template)=>(
                        <CarouselItem
                        key={template.id}
                        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/6 2xl:basis-[14.2857145] pl-4  text-center " onClick={()=>createDoc()}>
                                    <div className={cn(
                                        "aspect-[3/4] flex flex-col gap-y-2.5",
                                        isCreating && "ponter-events-none opacity-50"
                                    )}>
                                            <button
                                        disabled={isCreating}
                                        onClick={()=>{

                                        }}
                                        style={{
                                            backgroundImage: `url(${template.imageUrl})`,
                                            backgroundSize : "cover",
                                            backgroundPosition : "center",
                                            backgroundRepeat : "no-repeat"
                                        }}
                                        className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-500
                                        transition flex flex-col items-center justify-center gap-y-4 bg-white">
                                            </button>
                                            <p className="text-sm font-medium truncate ">

                                            {template.label}
                                            </p>
                                    </div>

                        </CarouselItem>
                      ))} 
                       
                    </CarouselContent>
                    {
                        isArrow && <div>
                            <CarouselPrevious/>
                            <CarouselNext/>

                        </div>
                    }
                </Carousel>
            </div>

        </div>
    )
}


