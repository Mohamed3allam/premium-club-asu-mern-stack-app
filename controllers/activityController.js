const ActivityImage = require('../models/ActivityImage')
const Activity = require('../models/Activity')
require('dotenv').config()

const createActivity = async (req, res, next) => {
    
    const { activityTitle, activityDescription, flexDirection } = req.body
    console.log({ activityTitle, activityDescription, flexDirection })
    try {
        let i=1;
        for(i;await Activity.findOne({activity_ordering:i});i++) {
            i = i++
            console.log('activity ' + i)
        }
        const activityLength = await Activity.countDocuments()
        if (activityLength >= 10) {
            res.status(400).json({error:"You Can't Add anymore activities."})
            return 0
        }
        // if (!req.files || req.files.length == 0) {
        //     res.status(400).json({error: 'You must Upload at least an image'})
        //     return 0
        // }
        const activity = await Activity.create({ activityTitle, activityDescription, flexDirection, activity_ordering:i })
        res.json({activity})
    } catch (err) {
        console.log(err)
        res.status(400).json({error:err})
    }
}

const editActivity = async (req, res, next) => {
    
    const activityId = req.params.id
    const updatedData = req.body
    try {
        if (updatedData.activity_ordering && await Activity.findOne({activity_ordering:updatedData.activity_ordering})) {
            res.status(400).json({error: "Other activity already ordered "+updatedData.activity_ordering})
            return 0
        }
        let i=1;
        for(i;await Activity.findOne({activity_ordering:i});i++) {
            i = i++
            console.log('activity ' + i)
        }
        const activity = await Activity.findByIdAndUpdate(activityId, updatedData)
        if (updatedData.activityTitle) {
            await ActivityImage.updateMany({activity_id: activityId}, {$inc: {activity_title: updatedData.activityTitle}})
        }
        res.json(activity)
    } catch (err) {
        console.log(err)
        res.status(400).json({error:err})
    }
}

module.exports = {
    createActivity,
    editActivity
}