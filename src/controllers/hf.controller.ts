import express, { type Request, type Response } from "express"
import { HfInference } from '@huggingface/inference'
import config from "../config";

const router = express.Router();
const hf = new HfInference(config.tokenHF)


router.post("/", async (req: Request, res: Response) => {
    try {
        console.log(req.body.question)
        const textUser = req.body.question

        const stream = hf.textGenerationStream({
            model: 'meta-llama/Meta-Llama-3-8B-Instruct',
            inputs: textUser
        })
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Transfer-Encoding', 'chunked');
        let respuesta: string = ""
        // responde con formato markdown
        for await (const chunk of stream) {
            // Assuming chunk is of type TextGenerationStreamOutput
            if (chunk.token) {
                res.write(chunk.token.text);
                console.log(chunk.token.text)
                respuesta += chunk.token.text
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