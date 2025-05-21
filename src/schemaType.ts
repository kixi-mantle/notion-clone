import {z} from "zod";


export const createDoc = z.object({

})

export const UserSchema = z.object({
    name : z.string(),
    email : z.string(),
})


export const DocumentSchema = z.object({
    title : z.string().nullable(),
    initialContent: z.string().nullable(),
    ownerId : z.string().min(1, "ownerId is required"),
    roomId : z.string().nullable(),
    organization : z.string().nullable(),
})