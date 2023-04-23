require('dotenv').config()
const express = require('express')

// Authorization Middleware
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')

// MongoDB
const mongoose = require('mongoose')
const crypto = require('crypto')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const Activity = require('../models/Activity')
const ActivityImage = require('../models/ActivityImage')

// Controllers Needed
const { editActivity, createActivity } = require('../controllers/activityController')
// router
const router = express.Router()


// Image Upload Initialization to Activities
const ActivityConn = mongoose.createConnection(process.env.MONGO_URI_WEBSITE, { 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    readPreference:'secondary' 
})
let ActivityGfs;
ActivityConn.once('open', () => {
    ActivityGfs = new mongoose.mongo.GridFSBucket( ActivityConn.db, { bucketName:'Activities' } )
    return ActivityGfs
})

// Create New Activity with it's Images Storage-----
const CreateActivityStorage = new GridFsStorage({
    url:process.env.MONGO_URI_WEBSITE,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err, buf) => {
                if (err) {
                    reject(err)
                }
                try {
                    // Get PARENT Activity 
                    const {activityTitle, activityDescription, flexDirection} = req.body
                    const activity = await Activity.findOne({
                        activityTitle: activityTitle, 
                        activityDescription: activityDescription, 
                        flexDirection: flexDirection
                    })
                    console.log(activity.id)
                    // Start Assigning data to each image
                    const filename = `${activity.activityTitle}-${file.originalname}`
                    console.log(filename)
                    let i=1;
                    for(i;await ActivityImage.findOne({activity_id:activity.id ,ordering:i});i++) {
                        i = i++
                        console.log('activity image ' + i)
                    }
                    const imageUrl = `/activity-api/activity-image/display/${filename}`

                    // Check The Number of Images in this activity
                    const activityImageLength = await ActivityImage.countDocuments({activity_id: activity.id})
                    console.log(activityImageLength)
                    if (activityImageLength >= 10) {
                        reject()
                        throw Error("You've reached maximum images") 
                    }
                    // Create in json
                    const activityImage = await ActivityImage.create({
                        filename: filename,
                        ordering:i, 
                        imageUrl:imageUrl, 
                        activity_id:activity.id, 
                        activity_title: activity.activityTitle
                    })
                    await Activity.findByIdAndUpdate(activity.id, {imagesIncluded: await Activity.countDocuments({activity_id: activity.id})})
                    // Create in GridFsBucket
                    const fileInfo = {
                        id: activityImage.id,
                        filename: filename,
                        bucketName: 'Activities'
                    }
                    resolve(fileInfo, activityImage)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
})
const uploadNewActivity = multer({ storage: CreateActivityStorage })
//---------------------------------------------------


// Upload Multiple Images Storage--------------------
const DeleteImagesBeforeUploadingBulk = async (req,res,next) => {
    const activityId = req.params.id
    const activity = await Activity.findById(activityId)

    const eachImage = await ActivityImage.find({activity_id: activity.id})
    if (eachImage) {
        eachImage.map(async (img) => {
            console.log(`${img.filename} Deleted`)
            await ActivityGfs.delete(img.id)
            await ActivityImage.findByIdAndDelete(img.id)
        })
        console.log(eachImage)
        console.log('All must be deleted')
        next()
        return 0
    }
    console.log(eachImage)
    console.log('There is no images to be deleted')
    next()
}
const UploadMultipleStorage = new GridFsStorage({
    url: process.env.MONGO_URI_WEBSITE,
    file: ( (req, file)=> {
        return new Promise(async (resolve, reject) => {
            crypto.randomBytes(16, async(err,buf)=> {
                if (err) {
                    console.log(err);
                    return reject(err)
                }
                const activityId = req.params.id
                const activity = await Activity.findById(activityId)

                const filename = `${activity.activityTitle}-${file.originalname}`;
                const imageUrl = `/activity-api/activity-image/display/${filename}`
                try {
                    let i=1;
                    for(i;await ActivityImage.findOne({activity_id:activityId ,ordering:i});i++) {
                        i = i++
                        console.log(i)
                    }

                    // Check Images Length in the database
                    const activityImageLength = await ActivityImage.countDocuments({activity_id: activity.id})
                    if (activityImageLength > 11) {
                        throw Error('Cant add any more Photos')
                    }
                    const activity_image = await ActivityImage.create({
                        filename: filename,
                        ordering: i, 
                        imageUrl: imageUrl, 
                        activity_id:activity.id,
                        activity_title: activity.activityTitle
                    })
                    await Activity.findByIdAndUpdate(activity.id, {imagesIncluded: await Activity.countDocuments({activity_id: activity.id})})
                    const fileInfo = {
                        id: activity_image.id,
                        filename: filename,
                        bucketName: 'Activities'
                    }
                    // await ActivityGfs.delete()
                    resolve(fileInfo, activity_image)
                } catch (err) {
                    reject(err)
                }
            })
        })
    })
})
const uploadMultiple = multer({ storage: UploadMultipleStorage })
// ---------------------------------------------------


// Update Activity Images Storage----------------------
const UpdateSingleStorage = new GridFsStorage({
    url: process.env.MONGO_URI_WEBSITE,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    console.log(err)
                    return reject(err)
                }

                const imageId = req.params.id
                try {
                    // Catch the Activity 
                    const neededToUpdateImage = await ActivityImage.findById(imageId)
                    const activity = await Activity.findById(neededToUpdateImage.activity_id)
    
                    const filename = `${activity.activityTitle}-${file.originalname}`;
                    console.log(imageId)
                    const { ordering } = req.body
                    const imageUrl = `/activity-api/activity-image/display/${filename}`
                    const updatedJson = await ActivityImage.findByIdAndUpdate(imageId, {filename: filename, ordering: ordering, imageUrl})
                    const image = await ActivityImage.findById(imageId)
                    console.log(image)
                    await ActivityGfs.delete(imageId)
                    const fileInfo = {
                        id: updatedJson.id,
                        filename: filename,
                        bucketName: 'Activities'
                    }
                    resolve(fileInfo, updatedJson)
                } catch (err) {
                    console.log(err)
                    reject(err)
                }
            })
        })
    }
})
const updateSingle = multer({ storage: UpdateSingleStorage })
//-----------------------------------------------------


// @routes

// Create Activity Route--------------------
router.post('/create-activity', createActivity) 
// add images to it after creating activity request
// it can be also used to add images to the activity
router.post('/create-activity-imgs',uploadNewActivity.array('create-activity', 10), async (req, res, next) => {
    try {
        console.log(req.files)
        res.status(200).json({files: req.files})
    } catch (err) {
        res.status(404).json({error: err})
    }
})
//-------------------------------------------


// Edit Activity Multiple Images--------------------------------
router.put('/edit-multiple-activity-images/:id', DeleteImagesBeforeUploadingBulk, uploadMultiple.array('edit-multiple-activity-images', 10), async (req,res, next) => {
    try {
        console.log(req.files)
        res.status(200).json({files: req.files})
    } catch (err) {
        res.status(400).json({error: err})
    }
})
//--------------------------------------------------------------


// Update Activity------------------------------------------
router.put('/edit-activity/:id', editActivity)
//---------------------------------------------------------


// Edit Activity Single Image-------------------------------
router.put('/edit-single-activity-image/:id', updateSingle.single('edit-single-activity-image'), async (req,res, next) => {
    const imageId = req.params.id
    try {
        if (!req.file || req.file.length == 0) {
            const {ordering} = req.body
            const updateImage = await ActivityImage.findByIdAndUpdate(imageId, {ordering: ordering})
            console.log(updateImage)
            if (!ordering || ordering == "") {
                res.status(400).json({error: 'Must Send Something'})
                return 0
            }
            const image = await ActivityImage.findById(imageId)
            res.status(200).json(image)
        } else {
            res.status(200).json({file: req.file})
        }
    } catch (err) {
        res.status(400).json({error: err})
    }
})
//----------------------------------------------------------


// Delete Full Activity------------------------------------
router.delete('/delete-activity/:id', async (req, res, next) => {
    try {
        const activityId = req.params.id
        const activity = await Activity.findById(activityId)

        const eachImage = await ActivityImage.find({activity_id: activity.id})
        Object.values(eachImage).forEach(async (img) => {
            console.log(`${img.filename} Deleted`)
            await ActivityGfs.delete(img.id)
            await ActivityImage.findByIdAndDelete(img.id)
        })
        console.log(eachImage)
        console.log('All must be deleted')
        await Activity.findByIdAndDelete(activityId)
        console.log('Activity Deleted With all its images!')
        res.status(200).json({message:'Activity Deleted!'})
    } catch (err) {
        console.log(err)
        res.status(400).json({error:err})
    }
})
//----------------------------------------------------------


// Delete single Image--------------------------------------
router.delete('/delete-activity-image/:id', async (req, res) => {
    try {
        const imageId = req.params.id
        await ActivityGfs.delete(imageId)
        await ActivityImage.findByIdAndDelete(imageId)
        res.status(200).json({message:'Image Deleted!'})
    } catch (err) {
        res.status(401).json({error:err})
    }
})
//----------------------------------------------------------


// GET an Activity------------------------------------------
router.get('/activity/:id', async (req, res) => {
    const activityId = req.params.id
    try {
        const activity = await Activity.findById(activityId)
        res.status(200).json(activity)
    } catch (err) {
        res.status(400).json({error: err})
    }
})
//----------------------------------------------------------


// GET all Activities--------------------------------------
router.get('/activities', async (req, res) => {
    try {
        const activities = await Activity.find({}).sort({activity_ordering: 1})
        res.status(200).json(activities)
    } catch (err) {
        res.status(404).json({error: err})
    }
})
//----------------------------------------------------------


//GET all images in an activity
router.get('/activity/:id/images', async (req, res) => {
    try {
        const activityId = req.params.id
        const activity = await Activity.findById(activityId)
        const activity_images = await ActivityImage.find({activity_id: activity._id}).sort({ordering: 1})
        res.status(200).json(activity_images)
    } catch (err) {
        res.status(404).json({error: err})
    }
})

// GET an Image in GridFsBucket by it's name
router.get('/activity-image/display/:name', async (req,res) => {
    const imgName = req.params.name;
    // Init Stream
    (ActivityConn.readyState === 1) &&
        await ActivityGfs.find().toArray(async (err, files) => {
            try {
                // Read Output to browser
                const readStream = await ActivityGfs.openDownloadStreamByName(`${imgName}`)
                readStream.pipe(res)
            } catch (error) {
                console.log(error)
            }
        })
})

// GET a single image in mongodb in json form
router.get('/activity-image/json/:name', async (req,res) => {
    const imgName = req.params.name
    const eachImage = await ActivityImage.find({filename: imgName})
    try {
        // Read Output to browser
        res.status(200).json(eachImage)
    } catch (error) {
        console.log(error)
    }
})

// GET all Images in mongodb in json form
router.get('/activity-images/json', async (req,res) => {
    const allImages = await ActivityImage.find().sort({activity_title: 1})
    try {
        // Read Output to browser
        res.status(200).json(allImages)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router