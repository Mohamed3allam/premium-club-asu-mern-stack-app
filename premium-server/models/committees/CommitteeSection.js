const mongoose = require('mongoose')

const Schema = mongoose.Schema

const committeeSectionsSchema = new Schema({
    committee_id:{
        type:String,
        required: true
    },
    committee_section_title:{
        type:String,
        required:true
    },
    committee_section_description: {
        type:String,
        required:true,
        unique:true
    },
    committee_section_font_color:{
        type:String,
        required:true
    },
    committee_section_bg_color:{
        type:String,
        required:true
    },
    committee_section_ordering: {
        type:Number,
        required:true
    }
}, { timestamps: true })

committeeSectionsSchema.statics.signup = async (committee_id, committee_section_title, committee_section_description, committee_section_font_color, committee_section_bg_color) => {

    const committeeSection = await this.create({committee_id, committee_section_title, committee_section_description, committee_section_font_color, committee_section_bg_color})
    return committeeSection
}

module.exports = mongoose.connection.useDb('Website').model('CommitteeSection', committeeSectionsSchema)