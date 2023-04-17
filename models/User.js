const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    premium_id:{
        type:String,
        required:true,
        unique: true
    },
    name: {
        type:Object,
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role:{
        type: String,
        required: true,
        default: 'Member',
        enum: ['President', 'Vice President', 'Head', 'Vice Head', 'Member']
    },
    committee:{
        type: String || Number,
        required: true,
        enum: [0,1, 'Media', 'Marketing', 'Human Resources', 'Public Relations', 'Logistics', 'Events', 'Academic']
    },
    title: {
        type: String,
        required: true
    },
    profilePicUrl: { 
        type:String,
        default: `/api-pp/default-pp`
    }
},{timestamps: true})


//signing up method 
userSchema.statics.signup = async function(premium_id, name, username, email, password, phone, role, committee, title, profilePicUrl) {

    //VALIDATION-------------------------------------------
    title = `${committee === 0 || committee === 1 ? "Premium" : committee} ${role}`

    console.log(name,username, email, password, phone, role, committee, title, profilePicUrl)
    //empty conditions
    if (!name.firstName || !name.lastName || !username || !email || !password || !phone || !role || !title) {
        throw Error('All fields must be filled')
    }
    //Wrong Email Validation
    if (!validator.isEmail(email)) {
        throw Error("Not Valid Email")
    }
    //Strong Password Validation
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not Strong enough')
    }
    if((role === 'President' && committee !== 0) || (committee === 0 && role !== 'President')) {
        throw Error('President does not have a committee')
    }
    if(role === "Vice President" && committee !== 1) {
        throw Error('Vice President does not have a committee')
    }
    if(committee === 1 && role !== "Vice President") {
        throw Error('Invalid Committee')
    }
    if(committee === 0 && role !== "President") {
        throw Error('Invalid Committee')
    }
    
    

    //check if email exists
    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })
    const premiumIdExists = await this.findOne({ premium_id })
    if ( emailExists ) {
        throw Error('Email is Already in use')
    }
    if ( usernameExists ) {
        throw Error('Username is Already in use')
    }
    if ( premiumIdExists ) {
        throw Error('This Premium Id Already in use')
    }
    //-------------------------------------------------------------------------

    // Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Creating The user
    const user = await this.create({premium_id, name, username, email, password:hash, phone, role, committee, title:title, profilePicUrl})

    return user
}


//Static Login Method 
userSchema.statics.login = async function(username, password) {
    //LOGIN VALIDATION
    if (!username || !password) {
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })
    if (!user) {
        throw Error('Incorrect Email')
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
        throw Error('Wrong Password')
    }
    return user
}

module.exports = mongoose.connection.useDb('PremiumClub').model('User', userSchema)