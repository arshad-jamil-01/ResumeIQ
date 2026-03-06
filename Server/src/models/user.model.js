import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: [true, " user name already taken"],
        required: true,
    }, 
    email:{
        type:String,
        unique:[true, " account already exist with this email"],
         require: true,
    },
    password:{
        type:String,
        required: true,
    }
});

const userModel = mongoose.model("users", userSchema);
export default userModel;