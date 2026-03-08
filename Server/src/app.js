import express from "express"
import cookieParser from "cookie-parser";

const app  = express()
app.use(express.json())
app.use(cookieParser())

import authRouter from "./routes/auth.routes.js";

app.use("/api/auth", authRouter)    //prefix


export default app;