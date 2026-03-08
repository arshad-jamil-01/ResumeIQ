import mongoose from "mongoose";

const blackListTokenSchema = new mongoose.Schema({
    token:{
        type: String,
        required:[true, "token is required to be added in black list"]
    }
},{timestamps:true});

const tokenBlackListModel = mongoose.model("blacklist", blackListTokenSchema)

export default tokenBlackListModel