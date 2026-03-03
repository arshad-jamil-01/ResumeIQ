import mongoose from "mongoose";


const ConnectToDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    console.log("conneted to db")
    }catch(err){
        console.log(err)
    }
}

export default ConnectToDB