



export const DocumentInput = ({title}:{title : string | null | undefined})=>{

    return (

        <div className="flex items-center gap-2">
        <span className="text-lg px-1.5 cursor-pointer truncate">{title}</span>
        
    </div>
    )
}