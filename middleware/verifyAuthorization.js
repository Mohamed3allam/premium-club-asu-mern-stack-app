const { roles } = require('../roles')

const grantAccess = (action, resource) => {
    return async (req,res,next) => {
        try {
            console.log(req.user.role, req.user.committee)
            const permission = await roles().can(req.user.role)[action](resource)
            if (!permission.granted) {
                return res.status(401).json({error: "You Are Not Authorized to access this page"})
            }
            next()
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = { grantAccess }