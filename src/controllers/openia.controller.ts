import express from "express"
import OpenAI from "openai";
import { pipeline } from "node:stream/promises";
import config from "../config";

const router = express.Router();

const openai = new OpenAI({
    apiKey: config.tokenOpenIA,
});

router.post("/", async (req, res) => {
    try {
        console.log("llamada a chatgpt")
        const messageClient = req.body.question
        const responseStream = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un asistente que habla español y ayuda de forma amable a los humanos" },
                { role: "user", content: messageClient },
            ],
            model: "gpt-3.5-turbo-1106",
            stream: true
        })

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        // Procesar el stream de respuestas
        // responde con formato markdown
        for await (const chunk of responseStream) {
            res.write(`data: ${JSON.stringify(chunk)}\n\n`);
        }

        res.end();
    } catch (err) {
        console.log(err);
    }
});

export default router;