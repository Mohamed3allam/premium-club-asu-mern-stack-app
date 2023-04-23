const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeImagesSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    eventName:{
        type: String,
        required: true,
        unique:true
    },
    ordering:{
        type:Number,
        enum:[1,2,3,4,5,6,7,8,9,10],
        unique: true
    },
    imageUrl: {
        type:String,
        required:true
    }
}, { timestamps: true })

homeImagesSchema.statics.signup = async function (filename, eventName, ordering, imageUrl) {
    if (!filename || !eventName) {
        throw Error('All fields must be filled')
    }

    const homeImageData = await this.create({filename, eventName, ordering, imageUrl})
    return homeImageData
}

module.exports = mongoose.connection.useDb('Website').model('HomeImage', homeImagesSchema)