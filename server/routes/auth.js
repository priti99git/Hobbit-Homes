const router=require("express").Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const multer=require("multer");

const User=require("../models/User");

// configuration multer for file upload
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"public/uploads/")
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})

const upload=multer({storage})

router.post("/register", upload.single('profileimage'), async (req,res) =>{
try{
    // take all info from the form
    const { firstName, lastName,email,password}=req.body;
    // the uploaded file is available as req.file
    const profileimage=req.file;

    if(!profileimage){
        return res.status(400).send("no file uploaded")
    }

    // path to the uploaded profilephoto
    const profileImagePath=profileimage.path
    // check if user exist
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({message:"user already exists!"})
    }
    // has the passsword
    const salt=await bcrypt.genSalt()
    const hashPassword=await bcrypt.hash(password,salt);
    
    // create a nwe User
    const newUser=new User({
        firstName,
        lastName,
        email,
        password:hashPassword,
        profileImagePath,
    });
    // save the new user
    await newUser.save()

    // send a succesful message
    res.status(200).json({message:"user registered successfully",user:newUser})

}catch(err) {
    console.log(err)
    res.status(500).json({message:" Ragistration Failed",error:err.message})
}
});

router.post("/login",async (req,res)=>{
    try{
        // take info from the form
        const {email, password}=req.body

        // chech user already exist
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({message:"user doesn't exists!"})
        }
        // compare password
        const isMatch=await bcrypt.compare (password,user.password)
        if (!isMatch){
            return res.status(400).json({message:"Invalid Credentials!"})
        }

        // generate jwt token
        const token= jwt.sign({id:user._id},process.env.JWT_SECRET)
        delete user.password
        res.status(200).json({token,user})

    }catch(err){
        console.log(err)
        res.status(200).json({error:err.message})
    }
})
module.exports=router