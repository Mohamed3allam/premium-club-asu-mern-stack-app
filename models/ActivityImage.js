const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activityImageSchema = new Schema({
    filename:{
        type:String,
        required:true,
    },
    ordering:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10,11,12],
        required: true
    },
    imageUrl:{
        type:String,
        required:true
    },
    activity_id:{
        type:String,
        required:true,
    },
    activity_title: {
        type:String,
        required: true
    }
}, { timestamps: true })

activityImageSchema.statics.signup = async (filename, ordering, imageUrl, activity_id, activity_title) => {

    const activityImage = await this.create({filename, ordering, imageUrl, activity_id, activity_title})
    return activityImage
}

module.exports = mongoose.connection.useDb('Website').model('ActivityImage', activityImageSchema)