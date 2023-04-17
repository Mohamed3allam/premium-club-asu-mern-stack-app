const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitySchema = new Schema({
    activityTitle:{
        type:String,
        required:true,
        unique:true,
    },
    activityDescription:{
        type:String,
        required:true
    },
    flexDirection:{
        type:String,
        enum:['row','row-reverse'],
        required: true,
    },
    activity_ordering: {
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10],
        required: true
    },
    imagesIncluded:{
        type:Number,
    }
}, { timestamps: true })

activitySchema.statics.signup = async function(activityTitle, activityDescription, flexDirection, activity_ordering, imagesIncluded) {
    if (!activityTitle || !activityDescription || !flexDirection) {
        throw Error('All fields must be filled')
    }

    const activityLength = this.estimatedDocumentCount()
    if (activityLength >= 10) {
        throw Error("You Can't add anymore activity, you might delete one.")
    }

    const activity = await this.create({activityTitle, activityDescription, flexDirection, activity_ordering, imagesIncluded})
    return activity
}

module.exports = mongoose.connection.useDb('Website').model('Activity', activitySchema)