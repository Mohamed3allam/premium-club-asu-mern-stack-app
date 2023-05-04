const jwt = require('jsonwebtoken')
const User = require('../models/User')

const requireAuth = async (req,res,next) => {
    // Verify User is Authenticated
    const { authorization } = req.headers
    console.log(authorization)
    if (!authorization) {
        console.log(authorization)
        return res.status(401).json({error: "Authorization token required"})
    }
    const token = authorization.split(' ')[1]
    console.log(token)
    try {
        const { _id,name,username,email,role,committee, profilePicUrl } = await jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findOne({ _id,name,username,email,role,committee, profilePicUrl }).select(['_id','name','username','email','role','committee', 'profilePicUrl'])
        console.log(req.user);
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({error: "You are not authorized"})
    }
}


module.exports = { requireAuth }