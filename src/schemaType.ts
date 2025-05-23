import {z} from "zod";


export const createDoc = z.object({

})

export const UserSchema = z.object({
    name : z.string(),
    email : z.string(),
})


export const DocumentSchema = z.object({
    title : z.string(),
       content: z.record(z.any()).nullable(),
    ownerId : z.string().min(1, "ownerId is required"),
    roomId : z.string().nullable(),
    organizationId : z.string().nullable(),
})

export const DocumentFull = z.object({
     title : z.string(),
    content: z.record(z.any()).nullable(),
    ownerId : z.string().min(1, "ownerId is required"),
    roomId : z.string().nullable(),
    organizationId : z.string().nullable(),
    id : z.string(),
    createdAt : z.date()
})