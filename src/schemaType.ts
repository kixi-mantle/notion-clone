import {z} from "zod";


export const createDoc = z.object({

})

export const UserSchema = z.object({
    name : z.string(),
    email : z.string(),
})