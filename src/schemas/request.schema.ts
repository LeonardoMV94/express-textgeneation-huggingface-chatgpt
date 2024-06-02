import z from "zod"


export const requestSchema = z.object({
    question: z.string().min(10, {message: `text must be at least 10 characters`}).max(100, {message: `text must be a maximum of 100 characters`})
})