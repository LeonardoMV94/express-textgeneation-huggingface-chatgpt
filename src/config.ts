import dotenv from "dotenv"

dotenv.config()

const config = {
    port: process.env.PORT ?? 3000,
    tokenOpenIA: process.env.TOKEN_OPENIA,
    tokenHF: process.env.TOKEN_HF
}

export default config