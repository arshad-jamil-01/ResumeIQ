import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import tokenBlackListModel from "../models/blacklist.model.js";


//=====  REGISTERED FUNCTIOINALITIES ===== 
async function registerUserController(req, res){
try{
    const {username, email, password} = req.body;

    //required all field
    if(!username || !email || !password){
     return res.status(400).json({
        message: "please provide username, email, password "
     })
    };

    //check user is AlreadyExist
    const isUserAlreadyExist = await userModel.findOne({
        $or: [{username}, {email}]
    })
    if(isUserAlreadyExist){
        return res.status(400).json({
            message:"Account already exist with this email address or username"
        })
    };

    //hashing passwprd
    const hash = await bcrypt.hash(password, 10)

    //create user
    const user = await userModel.create({
        username,
        email,
        password:hash
    });

    //create token
    const token = jwt.sign({
        id:user._id, 
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User registered succefully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    });
}catch(err){
    res.status(500).json({
        message:"Something went wrong",
        err:err.message
    })
}
};



//===== LOGIN =====
async function loginUserController(req, res){

    const {email, password} = req.body

    const user = await userModel.findOne({email})
    if(!user){
        return res.status(400).json({
            message:"invalid user or password"
        })
    };

    const isPasswordValid = await  bcrypt.compare(password, user.password);
    if(!isPasswordValid){
       return res.status(400).json({
            message:"invalid user or password"
        })
    };

    const token = jwt.sign({
        id: user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"});

    res.cookie("token", token);
    res.status(200).json({
        message:"User Logged In Succefully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    });

};


//===== logout =====

async function logoutUserController(req, res){

    const token = req.cookies.token
    if(token){
        await tokenBlackListModel.create({token})
    }
    res.clearCookie("token")
    res.status(200).json({
        message:"user logged out succesfully"
    })
}


export {
    registerUserController,
    loginUserController,
    logoutUserController
};