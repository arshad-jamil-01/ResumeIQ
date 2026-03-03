import express from "express";

const authRouter = express.Router();


authRouter.post("/user",(req, res)=>{
    res.send("hello dost")
})


export default authRouter;