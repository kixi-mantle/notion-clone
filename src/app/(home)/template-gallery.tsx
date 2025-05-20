"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../components/ui/carousel"
import { cn } from "../../lib/utils";
import { templates } from "../../contansts/template";
import { useEffect, useRef, useState } from "react";





export const TemplateGallery = ()=>{
    
    
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
                        className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/6 2xl:basis-[14.2857145] pl-4  text-center">
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


