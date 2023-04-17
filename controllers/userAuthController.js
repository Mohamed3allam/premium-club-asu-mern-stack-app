const User = require('../models/User')
const jwt = require('jsonwebtoken')

// Creating token for the `user`
const createToken = (_id, _name,_username,_email, _role, _committee, _profilePicUrl) => {
    return jwt.sign({_id, _id, name: _name,username:_username, email:_email, role:_role, committee: _committee,profilePicUrl: _profilePicUrl}, process.env.JWT_SECRET, { expiresIn: '3d' })
}

//signing up user
const signupUser = async (req,res) => {
    const {name, username, email, password, phone, role, committee, title, profilePicUrl } = req.body
    try {
        const userPCount = await User.countDocuments({role:"President"})
        const userVPCount = await User.countDocuments({role:'Vice President'})
        const userHMediaCount = await User.countDocuments({role:'Head',committee:'Media'})
        const userHMarketingCount = await User.countDocuments({role:'Head',committee:'Marketing'})
        const userHEventsCount = await User.countDocuments({role:'Head',committee:'Events'})
        const userHHRCount = await User.countDocuments({role:'Head',committee:'Human Resources'})
        const userHPRCount = await User.countDocuments({role:'Head',committee:'Public Relations'})
        const userHLogisticsCount = await User.countDocuments({role:'Head',committee:'Logistics'})
        const userHAcademicCount = await User.countDocuments({role:'Head',committee:'Academic'})
        const userVHMediaCount = await User.countDocuments({role:'Vice Head',committee:'Media'})
        const userVHMarketingCount = await User.countDocuments({role:'Vice Head',committee:'Marketing'})
        const userVHEventsCount = await User.countDocuments({role:'Vice Head',committee:'Events'})
        const userVHHRCount = await User.countDocuments({role:'Vice Head',committee:'Human Resources'})
        const userVHPRCount = await User.countDocuments({role:'Vice Head',committee:'Public Relations'})
        const userVHLogisticsCount = await User.countDocuments({role:'Vice Head',committee:'Logistics'})
        const userVHAcademicCount = await User.countDocuments({role:'Vice Head',committee:'Academic'})
        console.log(userPCount, userVPCount, userHMediaCount)
        if (role === 'President' && userPCount > 0) {
            throw Error('Only One President')
        }
        if (role === 'Vice President' && userVPCount > 1) {
            throw Error('Cant add more than two vice presidents')
        }
        if (role === 'Head' && committee === 'Media' && userHMediaCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Marketing' && userHMarketingCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Events' && userHEventsCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Human Resources' && userHHRCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Public Relations' && userHPRCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Logistics' && userHLogisticsCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Head' && committee === 'Academic' && userHAcademicCount > 0) {
            throw Error('There is only one head for each committee')
        }
        if (role === 'Vice Head' && committee === 'Media' && userVHMediaCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Marketing' && userVHMarketingCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Events' && userVHEventsCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Human Resources' && userVHHRCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Public Relations' && userVHPRCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Logistics' && userVHLogisticsCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }
        if (role === 'Vice Head' && committee === 'Academic' && userVHAcademicCount > 1) {
            throw Error('There can only be two vice heads for each committee')
        }

        // create a Premium Id for the User
        let premium_id;
        if (role === 'President') {
            premium_id = 'PRSDNT';
        }
        if (role === 'Vice President') {
            let i=1;
            for(i;await User.findOne({premium_id:`VC_PRSDNT${i}`});i++) {
                i = i++
                console.log('VC_PRSDNT' + i)
            }
            premium_id = `VC_PRSDNT${i}`
        }
        if (role === 'Head') {
            if (committee === 'Media') {
                premium_id = `HEAD_MEDIA`
            }
            if (committee === 'Marketing') {
                premium_id = `HEAD_MARKETING`
            }
            if (committee === 'Marketing') {
                premium_id = `HEAD_MARKETING`
            }
            if (committee === 'Events') {
                premium_id = `HEAD_EVENTS`
            }
            if (committee === 'Public Relations') {
                premium_id = `HEAD_EVENTS`
            }
            if (committee === 'Human Resources') {
                premium_id = `HEAD_HR`
            }
            if (committee === 'Logistics') {
                premium_id = `HEAD_LOGISTICS`
            }
            if (committee === 'Academic') {
                premium_id = `HEAD_AC`
            }
            
        }
        if (role === 'Vice Head') {
            if (committee === 'Media') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_MEDIA${i}`});i++) {
                    i = i++
                    console.log('VICE_MEDIA' + i)
                }
                premium_id = `VICE_MEDIA${i}`
            }
            if (committee === 'Marketing') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_MARKETING${i}`});i++) {
                    i = i++
                    console.log('VICE_MARKETING' + i)
                }
                premium_id = `VICE_MARKETING${i}`
            }
            if (committee === 'Marketing') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_MARKETING${i}`});i++) {
                    i = i++
                    console.log('VICE_MARKETING' + i)
                }
                premium_id = `VICE_MARKETING${i}`
            }
            if (committee === 'Events') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_EVENTS${i}`});i++) {
                    i = i++
                    console.log('VICE_EVENTS' + i)
                }
                premium_id = `VICE_EVENTS${i}`
            }
            if (committee === 'Public Relations') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_PR${i}`});i++) {
                    i = i++
                    console.log('VICE_EVENTS' + i)
                }
                premium_id = `VICE_EVENTS${i}`
            }
            if (committee === 'Human Resources') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_HR${i}`});i++) {
                    i = i++
                    console.log('VICE_HR' + i)
                }
                premium_id = `VICE_HR${i}`
            }
            if (committee === 'Logistics') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_LOGISTICS${i}`});i++) {
                    i = i++
                    console.log('VICE_LOGISTICS' + i)
                }
                premium_id = `VICE_LOGISTICS${i}`
            }
            if (committee === 'Academic') {
                let i=1;
                for(i;await User.findOne({premium_id:`VICE_AC${i}`});i++) {
                    i = i++
                    console.log('VICE_AC' + i)
                }
                premium_id = `VICE_AC${i}`
            }
        }
        if (role === 'Member') {
            if (committee === 'Media') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_MEDIA${i}`});i++) {
                    i = i++
                    console.log('MEMBER_MEDIA' + i)
                }
                premium_id = `MEMBER_MEDIA${i}`
            }
            if (committee === 'Marketing') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_MARKETING${i}`});i++) {
                    i = i++
                    console.log('MEMBER_MARKETING' + i)
                }
                premium_id = `MEMBER_MARKETING${i}`
            }
            if (committee === 'Marketing') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_MARKETING${i}`});i++) {
                    i = i++
                    console.log('MEMBER_MARKETING' + i)
                }
                premium_id = `MEMBER_MARKETING${i}`
            }
            if (committee === 'Events') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_EVENTS${i}`});i++) {
                    i = i++
                    console.log('MEMBER_EVENTS' + i)
                }
                premium_id = `MEMBER_EVENTS${i}`
            }
            if (committee === 'Public Relations') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_PR${i}`});i++) {
                    i = i++
                    console.log('MEMBER_EVENTS' + i)
                }
                premium_id = `MEMBER_EVENTS${i}`
            }
            if (committee === 'Human Resources') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_HR${i}`});i++) {
                    i = i++
                    console.log('MEMBER_HR' + i)
                }
                premium_id = `MEMBER_HR${i}`
            }
            if (committee === 'Logistics') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_LOGISTICS${i}`});i++) {
                    i = i++
                    console.log('MEMBER_LOGISTICS' + i)
                }
                premium_id = `MEMBER_LOGISTICS${i}`
            }
            if (committee === 'Academic') {
                let i=1;
                for(i;await User.findOne({premium_id:`MEMBER_AC${i}`});i++) {
                    i = i++
                    console.log('MEMBER_AC' + i)
                }
                premium_id = `MEMBER_AC${i}`
            }
        }
        
        const user = await User.signup(premium_id,name,username,email,password,phone, role, committee, title, profilePicUrl)
        // create token
        const token = createToken(user.premium_id,user._id, user.name, user.role, user.committee, user.profilePicUrl)
        res.status(200).json({user,token})
    } catch(error) {
        console.log(error)
        res.status(400).json({error:error.message})
    }
}

// logging in 
const loginUser = async (req,res) => {
        const { username, password } = req.body
        try {
            const user = await User.login(username, password)
            const token = createToken(user._id, user.name,user.username,user.email, user.role, user.committee, user.profilePicUrl)
            res.status(200).json({ token,message: `Hello ${user.title}`, user, role:user.role})
            return user
        } catch (error) {
            res.status(400).json({error: error.message})
        }
}

module.exports = { signupUser, loginUser }