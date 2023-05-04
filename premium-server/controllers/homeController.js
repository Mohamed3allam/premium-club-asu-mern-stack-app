const HomeData = require('../models/HomeData')
require('dotenv').config()

const createSection = async (req,res) => {
        const {title, description,fontColor, backgroundColor} = req.body
        try {
            let i=1;
            for(i;await HomeData.findOne({order:i});i++) {
                i = i++
                console.log(i)
            }
            const sectionLength = await HomeData.estimatedDocumentCount()
            if (sectionLength > 3) {
                throw Error('Cant add any more sections')
            }
            const section = await HomeData.create({title,description,fontColor, backgroundColor, order: i})
            res.status(200).json(section)
        } catch (err) {
            console.log(err)
            res.status(400).json({error:err.message})
        }
}

const getSection = async (req,res,next) => {

    try {
        const sectionId = req.params.id
        const section = await HomeData.findById(sectionId)
        if (!section) {
            throw Error('This Section Does not exist')
        }
        res.status(200).json(section)
    } catch (error) {
        console.log(error);
        res.status(404).json({error: error})
    }
}

const getSections = async (req,res) => {

    const sections = await HomeData.find({}).select(['title','description','fontColor','backgroundColor','order']).sort({order:1})
    try {
        res.status(200).json(sections)
    } catch (error) {
        console.log(error);
        res.status(404).json(error)
    }
}

const updateSection = async (req,res, next) => {
        try {
            const updatedSection = req.body
            const sectionId = req.params.id
            if (req.user.role === 'President') {
                await HomeData.findByIdAndUpdate(sectionId, updatedSection)
                const section = await HomeData.findById(sectionId)
                console.log(section)
                res.status(200).json({section})
            } else {
                res.status(403).json({error:'Your are not Authorized to edit sections'})
            }
        } catch( error ) {
            next(error)
        }
}

const deleteSection = async (req,res,next) => {
        try {
            if (req.user.role === 'President') {
                const sectionId = req.params.id
                const section = await HomeData.findByIdAndDelete(sectionId)
                if (!section) {
                    res.status(400).json({error:"This section doesn't exist"})
                }
                res.status(200).json({message:'Section Deleted'})
            } else {
                res.status(403).json({error:'Your are not Authorized to edit sections'})
            }
        } catch( error ) {
            next(error)
        }
}

module.exports = {
    createSection,
    getSection,
    getSections,
    updateSection,
    deleteSection
}