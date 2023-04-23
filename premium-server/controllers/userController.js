const { default: mongoose } = require('mongoose');
const User = require('../models/User')
const roles = require('../roles')


// Get all users
const getUsers = async (req,res,next) => {
    const users = await User.find({}).select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    try {
        console.log(req.user);
        console.log('you are in all users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getHighboard = async (req,res,next) => {
    const users = await User.find({role: ['President', 'Vice President']}).select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    try {
        console.log(req.user);
        console.log('you are in highboard users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}

const getBoard = async (req,res,next) => {
    const users = await User.find({role: ['Head', 'Vice Head']})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in board users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getMembers = async (req,res,next) => {
    const users = await User.find({role: 'Member'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in member users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}

const getMediaMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Media'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in media users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getMarketingMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Marketing'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Marketing users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getEventsMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Events'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Events users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getHRMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Human Resources'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Human Resources users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getPRMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Public Relations'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Public Relations users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getLogisticsMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Logistics'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Logistics users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}
const getACMembers = async (req,res,next) => {
    const users = await User.find({committee: 'Academic'})
    .select(['premium_id','_id','name','username','email','phone','role','title','committee','profilePicUrl'])
    .sort({premium_id:1,committee: 1})
    try {
        console.log(req.user);
        console.log('you are in Academic users route');
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}

//Get a single user
const getUser = async (req,res,next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)
        if (!user) {
            throw Error('User does not exist')
        }
        console.log(req.user)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//update a user
const updateUser = async (req,res,next) => {
    try {
        const update = req.body
        const userId = req.params.id
        if (req.user.role === 'President' || req.user.role === 'Vice President') {
            await User.findByIdAndUpdate(userId, update)
            const user = await User.findById(userId)
            console.log(req.user);
            res.status(200).json({user})
        } else {
            res.status(403).json({message:'Your are not Authorized to edit users'})
        }
    } catch (error) {
        next(error)
    }
}
const updateHighboard = async (req,res,next) => {
    try {
        const update = req.body
        const userId = req.params.id
        if (req.user.role === 'President') {
            await User.findByIdAndUpdate(userId, update)
            const user = await User.findById(userId)
            console.log(req.user)
            res.status(200).json({user})
        } else {
            res.status(403).json({message:'Your are Authorized to edit highboard'})
        }
    } catch (error) {
        next(error)
    }
}


// delete a user 
const deleteUser = async (req,res,next) => {
    try {
        const userId = req.params.id
        if (req.user.role === 'President' || req.user.role === 'Vice President') {
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                res.status(400).json({error:"This user doesn't exist"})
            }
            res.status(200).json({message:'User Deleted'})
        } else {
            res.status(200).json({message:'User has been deleted'})
        }
    } catch (error) {
        console.log(error)
    }
}

const deleteHighboard = async (req,res,next) => {
    try {
        const userId = req.params.id
        if (req.user.role === 'President') {
            const user = await User.findByIdAndDelete(userId)
            if (!user) {
                res.status(400).json({error:"This user doesn't exist"})
            }
            res.status(200).json({message:'Highboard Member Deleted'})
        } else {
            res.status(200).json({message:'User has been deleted'})
        }
    } catch (error) {
        next(error)
    }
}


module.exports = { 
    getUser, 
    getUsers, 
    getHighboard, 
    getBoard, 
    getMembers, 
    getMediaMembers, 
    getMarketingMembers, 
    getEventsMembers, 
    getHRMembers, 
    getPRMembers, 
    getLogisticsMembers, 
    getACMembers, 
    updateUser, 
    updateHighboard, 
    deleteUser, 
    deleteHighboard 
}