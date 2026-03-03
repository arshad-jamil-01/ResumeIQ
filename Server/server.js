import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";

import ConnectToDB from "./src/config/db.js";
ConnectToDB()


const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`server is running PORT:${PORT}`)
})