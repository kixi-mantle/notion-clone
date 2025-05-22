import { revalidateTag } from "next/cache"


export function UserCacheTag  (id : string) : string {
     return `user-${id}`
}

export function revalidateUser (id : string){
    revalidateTag(UserCacheTag(id));
}