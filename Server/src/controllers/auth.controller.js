import userModel from "../models/user.model.js"


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

    const user = userModel.create({
        username,
        email,
        password
    });
    res.status(200).json({
        message:"User registered succefully",
        user
    });
}catch(err){
    res.status(500).json({
        message:"Something went wrong",
        err:err.message
    })
}
}


export {registerUserController};