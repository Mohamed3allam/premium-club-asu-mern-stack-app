const mongoose = require('mongoose')

const Schema = mongoose.Schema

const committeeImgSchema = new Schema({
    filename:{
        type:String,
        required:true
    },
    committee:{
        type:String,
        enum:['media','marketing','events','public relations','human resources','logistics','academic'],
        required: true,
        unique:true
    },
    imageUrl:{
        type:String,
        required:true
    },
}, { timestamps: true })

committeeImgSchema.statics.signup = async (filename, committee, imageUrl) => {

    const committeeImg = await this.create({filename, committee, imageUrl})
    return committeeImg
}

module.exports = mongoose.connection.useDb('Website').model('committeeImg', committeeImgSchema)