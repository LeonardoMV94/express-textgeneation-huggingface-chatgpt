import express, { Application } from "express"
import chatgptController from "./openia.controller"
import huggingfaceController from "./hf.controller"

const routes = (app: Application) => {
    const router = express.Router()

    app.use('/api/v1', router);
    
    router.use("/chatgpt", chatgptController)
    router.use("/hf", huggingfaceController)
}


export default routes