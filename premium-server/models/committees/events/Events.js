const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eventsSchema = new Schema({
    committeeImageFilename:{
        type:String,
        required:true
    },
    committeeImageUrl:{
        type:String,
        required:true
    },
    committee_id:{
        type:String,
        required: true,
    },
    members_count:{
        type:Number,
        required: true
    },
    // committee_evaluation: {
    //     type:Number,
    //     required:true
    // }
}, { timestamps: true })

committeeImgSchema.statics.signup = async (filename, committee, imageUrl) => {

    const committeeImg = await this.create({filename, committee, imageUrl})
    return committeeImg
}

module.exports = mongoose.connection.useDb('Website').model('committeeImg', committeeImgSchema)