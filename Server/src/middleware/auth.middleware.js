import jwt from "jsonwebtoken";
import tokenBlackListModel from "../models/blacklist.model.js";

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"Token not provided"
        })
    }

    //check token block or not 
    const isTokenBlackListed = await tokenBlackListModel.findOne({token})
    if(isTokenBlackListed){
      return res.status(400).json({
        message:"Token is invalid"
      })
    }



  try{
    const decoded =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  }catch(err){
    return res.status(401).json({
        message:"Invalid token"
    })
  }

};


export default authUser;