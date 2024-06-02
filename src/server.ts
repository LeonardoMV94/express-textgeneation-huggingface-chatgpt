import express, { type Application, type Request, type Response } from "express"
import cors from "cors"
import { requestSchema } from "./schemas/request.schema"
import { validateData } from "./middlewares/request.middleware"
import config from "./config"
import controllers from "./controllers"

const port = config.port
const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(validateData(requestSchema))

app.get('/', (req: Request, res: Response) => {
    res.json({message: "hi"})
});


controllers(app)

app.listen(port, () => {
    console.log(`Listening in http://localhost:${port}`)
})