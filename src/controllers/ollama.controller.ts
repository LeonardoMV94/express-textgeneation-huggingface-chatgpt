import express, { type Request, type Response } from "express"
import { Ollama } from "ollama"
import config from "../config";

const router = express.Router();
const ollama = new Ollama({ host: 'http://ollama:11434' })

router.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body.question)
        const textUser = req.body.question

        const stream = await ollama.chat({
            model: 'llama3',
            messages: [{ role: 'user', content: req.body.question }],
            stream: true
        })
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        let respuesta: string = ""
        // responde con formato markdown
        for await (const chunk of stream) {
            // Assuming chunk is of type TextGenerationStreamOutput
            if (chunk.message.content) {
                res.write(chunk.message.content);
                console.log(chunk.message.content)
                respuesta += chunk.message.content
            }
        }
        console.log(respuesta)
        res.end();
    } catch (error) {
        console.log(error)
        res.status(500).send("An error occurred while processing your request.");
    }
})

export default router;