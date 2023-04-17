const mongoose = require('mongoose')

const Schema = mongoose.Schema

const homeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fontColor: {
        type:String,
        required: true
    },
    backgroundColor: {
        type: String,
        required: true
    },
    order:{
        type:Number,
        required:true,
        unique: true,
    }
}, { timestamps: true })

homeSchema.statics.signup = async function (title,description,fontColor, backgroundColor, order) {
    if (!title || !description || !fontColor || !backgroundColor) {
        throw Error('All fields must be filled')
    }


    const homeData = await this.create({title,description,fontColor, backgroundColor, order})
    return homeData
}

module.exports = mongoose.connection.useDb('Website').model('HomeData', homeSchema)