const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/jwt.key')


const authMiddleware = (req, res, next) => {
    const authHeaders = req.headers.authorization;

    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        return res.status(401).json({
            message: "Token not found"
        })
    }

    const token = authHeaders.split(' ')[1];

    try{

        const decoded = jwt.verify(token,JWT_SECRET);

        req.userId = decoded.userId;
        next();

    }catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports = {authMiddleware}
