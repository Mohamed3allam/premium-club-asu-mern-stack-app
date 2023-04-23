const mongoose = require('mongoose')

const Schema = mongoose.Schema

const committeesSchema = new Schema({
    committee_name:{
        type:String,
        enum:['Media','Marketing','Events','Public Relations','Human Resources','Logistics','Academic'],
        required: true,
        unique:true
    },
    committee_image_filename:{
        type:String,
        required:true
    },
    committee_image_url:{
        type:String,
        required:true
    },
    committee_head: {
        type:Object,
        required:true
    },
    committee_vice_heads: {
        type:Array,
        required:true
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

committeesSchema.statics.signup = async (committee_name, committeeImageFilename, committeeImageUrl, committee_head, committee_vice_heads, members_count) => {

    const committeeImg = await this.create({committee_name, committeeImageFilename, committeeImageUrl, committee_head, committee_vice_heads, members_count})
    return committeeImg
}

module.exports = mongoose.connection.useDb('PremiumClub').model('Committee', committeesSchema)