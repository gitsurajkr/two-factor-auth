const zod = require('zod')
const User = require('../model/schema')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/jwt.key')
const signupBodyVaildation = zod.object({
    firstname : zod.string(),
    lastname : zod.string(),
    username : zod.string(),
    password: zod.string(),
    email: zod.string(),
})

const signup = async (req, res) => {
    const {success, error} = signupBodyVaildation.safeParse(req.body);

    if(!success){
        return res.status(400).json({
            message: 'Invalid request body',
            errors: error.errors
        })
    }

    try{

        const existingUser = await User.findOne({username: req.body.username})

        if(existingUser){
            return res.status(400).json({
                message: "User Already exists"
            })
        }

        // Hash Password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // create new user

        const user = await User.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        const userId = user._id;

        const token = jwt.sign({userId}, JWT_SECRET, {expiresIn:'1d'})

        return res.status(200).json({
            message:"User Created Successfully",
            token
        })
    } catch (err){
        console.error(err);
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

const signinBodyValidation = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const signin = async (req, res) => {
    const validateResult = signinBodyValidation.safeParse(req.body);

    if(!validateResult.success){
        return res.status(401).json({
            message: 'Invalid request body', 
            errors: validateResult.error.errors
        })
    }

    try {
        
        const user = await User.findOne({
            username: req.body.username
        })

        if(!user){
            return res.status(400).json({
                message: 'Incorrect Credentials'
            })
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
        
        if(!isPasswordValid){
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET, {expiresIn: '1h'})

        

        return res.status(200).json({
            message: 'User loged in Successfully',
            token
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

const signout = async(req, res) => {

    try {

        res.clearCookie("token");

        return res.status(200).json({
            message: 'User logout Successfully'
        })

    } catch(err){
        console.error("Signout Error: ", err)

        return res.status(500).json({
            message: 'Internal server error during signout'
        })
    }

}

// const verifyEmail = async (e) => {
//     const {email} = req.body;

// } 

module.exports = {signup, signin, signout}