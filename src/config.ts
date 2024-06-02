import dotenv from "dotenv"

dotenv.config()

const config = {
    port: process.env.PORT ?? 3000,
    tokenOpenAI: process.env.OPENAI_API_KEY,
    tokenHF: process.env.TOKEN_HF
}

export default config