import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
//import main from "./src/services/ai.services.js"   // this code is right and wroking


import ConnectToDB from "./src/config/db.js";
ConnectToDB()
//main()  // this code is right and wroking this is ai.services file




const PORT = process.env.PORT || 5000;


app.listen(PORT, ()=>{
    console.log(`server is running PORT:${PORT}`)
})