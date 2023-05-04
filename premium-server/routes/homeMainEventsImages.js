require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {MongoClient} = require('mongodb');
const router = express.Router()
const crypto = require('crypto')
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const path = require('path')
const User = require('../models/User')
const HomeImage = require('../models/HomeImgs')
const { json } = require('body-parser')
const { error } = require('console')


const HomeMainEventsConn = mongoose.createConnection(process.env.MONGO_URI_WEBSITE, { 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    readPreference:'secondary' 
}, () => {
    console.log('connected to home main events Connection')
})
//Init gfs
let HomeMainEventsGfs;
// Init Stream
HomeMainEventsConn.once('open', ()=> {
    HomeMainEventsGfs = new mongoose.mongo.GridFSBucket(HomeMainEventsConn.db, {bucketName: 'HomeMainEvents'})
    return HomeMainEventsGfs
})


// storage engines
const dropDatabasesBeforeUploadingBulk = async (req,res,next) => {
    await HomeMainEventsGfs.drop()
    await HomeImage.collection.remove()
    console.log('Collections dropped')
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
                const filename = `Home-Main-Event-${file.originalname}`;
                const eventName = path.basename(file.originalname, path.extname(file.originalname))
                const imageUrl = `/home-api/home-main-events-images/display/${filename}`
                try {
                    let i=1;
                    for(i;await HomeImage.findOne({ordering:i});i++) {
                        i = i++
                        console.log(i)
                    }

                    // Check Images Length in the database
                    const HomeImgsLength = await HomeImage.estimatedDocumentCount()
                    if (HomeImgsLength > 20) {
                        throw Error('Cant add any more Photos')
                    }

                    // Check if one of the images exists
                    const exists = await HomeImage.findOne({filename: filename})
                    if (exists) {
                        const updated = await HomeImage.findByIdAndUpdate(exists.id, {filename: filename,eventName: eventName, ordering: i, imageUrl: imageUrl})
                        console.log(updated)
                        await HomeMainEventsGfs.delete(updated.id)
                        const fileInfo = {
                            id: updated.id,
                            filename: filename,
                            bucketName: 'HomeMainEvents'
                        }
                        resolve(fileInfo)
                    }
                    const imgData = await HomeImage.create({filename: filename,eventName: filename, ordering: i, imageUrl: imageUrl})
                    const fileInfo = {
                        id: imgData.id,
                        filename: filename,
                        bucketName: 'HomeMainEvents'
                    }
                    // await HomeMainEventsGfs.delete()
                    resolve(fileInfo, imgData)
                } catch (err) {
                    reject(err)
                }
            })
        })
    })
})
const uploadMultiple = multer({ storage: UploadMultipleStorage })

const UploadSingleStorage = new GridFsStorage({
    url: process.env.MONGO_URI_WEBSITE,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    return reject(err)
                }
                const filename = `Home-Main-Event-${file.originalname}`;
                const imageUrl = `/home-api/home-main-events-images/display/${filename}`
                const {eventName} = req.body
                try {
                    let i=1;
                    for(i;await HomeImage.findOne({ordering:i});i++) {
                        i = i++
                        console.log(i)
                    }
                    const HomeImgsLength = await HomeImage.estimatedDocumentCount()
                    if (HomeImgsLength > 10) {
                        throw Error('Cant add any more Photos')
                    }
                    const exists = await HomeImage.findOne({filename: filename})
                    if (exists) {
                        return reject(err)
                    }
                    const imgData = await HomeImage.create({filename: filename, eventName:eventName,ordering:i, imageUrl:imageUrl})
                    const fileInfo = {
                        id: imgData.id,
                        filename: filename,
                        bucketName: 'HomeMainEvents'
                    }
                    resolve(fileInfo)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
})
const uploadSingle = multer({ storage: UploadSingleStorage })

const UpdateSingleStorage = new GridFsStorage({
    url: process.env.MONGO_URI_WEBSITE,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            console.log('something')
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    console.log(err)
                    return reject(err)
                }
                const filename = `Home-Main-Event-${file.originalname}`;
                const oldImageId = req.params.id
                console.log(oldImageId)
                console.log(req.body)
                const {updatedData} = req.body
                const imageUrl = `/home-api/home-main-events-images/display/${filename}`
                const updatedJson = await HomeImage.findByIdAndUpdate(oldImageId, {filename: filename, updatedData, imageUrl})
                const image = await HomeImage.findById(oldImageId)
                console.log(image)
                await HomeMainEventsGfs.delete(oldImageId)
                const fileInfo = {
                    id: updatedJson.id,
                    filename: filename,
                    bucketName: 'HomeMainEvents'
                }
                resolve(fileInfo)
            })
        })
    }
})
const updateSingle = multer({ storage: UpdateSingleStorage })


// @route /upload-pp-image
// @desc Upload PP Image Route
router.post('/upload-home-main-event-images', requireAuth, grantAccess('updateAny', 'website'), dropDatabasesBeforeUploadingBulk ,uploadMultiple.array('home-main-event-images', 10), async (req,res)=> {
    console.log(req.files,req.user)
    try {
        res.json({files: req.files})
    } catch (error) {
        res.json({error: error})
    }
})

// Upload a single Image to GridFsBucket and to mongodb in json form
router.post('/add-single-home-main-event-image', requireAuth, grantAccess('updateAny', 'website'), uploadSingle.single('add-single-home-main-event-image'), async (req,res)=> {
    console.log(req.file,req.user) 
    try {
        res.json({file: req.file})
    } catch (error) {
        res.json({error: error})
    }
})


// GET an Image in GridFsBucket by it's name
router.get('/home-main-events-images/display/:name', async (req,res, next) => {
    const imgName = req.params.name;
    // Init Stream
    (HomeMainEventsConn.readyState === 1) &&
        await HomeMainEventsGfs.find().toArray(async (err, files) => {

            // Check if files
            if (!files || files.length === 0) {
                return res.status(404).json({
                    error: 'There is no Images'
                })
            }
            try {
                    // Read Output to browser
                    const readStream = await HomeMainEventsGfs.openDownloadStreamByName(`${imgName}`)
                    await readStream.pipe(res)
            } catch (error) {
                console.log(error)
            }
        })
})

router.put('/update-home-main-events-image/json/:id', requireAuth, grantAccess('updateAny', 'website'), updateSingle.single('update-single-home-main-event-image'), async (req,res) => {
    try {
        // console.log(req)
        console.log(req.body)
        console.log(req.file)
        if (!req.file) {
            const oldImageId = req.params.id
            const updatedData = req.body
            const updatedJson = await HomeImage.findByIdAndUpdate(oldImageId, updatedData)
            const image = await HomeImage.findById(oldImageId)
            res.status(200).json({updatedJson, image})
        } else {
            res.status(200).json({file: req.file})
        }
    } catch (error) {

        res.status(401).json({error: error})
    }
})

router.delete('/delete-single-home-main-events-image/json/:id', requireAuth, grantAccess('updateAny', 'website'), async (req,res, next) => {
    try {
        const imageId = req.params.id
        await HomeMainEventsGfs.delete(imageId)
        await HomeImage.findByIdAndDelete(imageId)
        console.log('image deleted')
        res.status(200).json({message:'Image Deleted!'})
    } catch (err) {
        res.status(401).json({error:err})
    }
})


// GET a single image in mongodb in json form
router.get('/home-main-events-images/json/:name', async (req,res) => {
    const imgName = req.params.name
    const eachImage = await HomeImage.find({filename: imgName})
    try {
            // Read Output to browser
            res.status(200).json(eachImage)
    } catch (error) {
        console.log(error)
    }
})

// GET all Images in mongodb in json form
router.get('/home-main-events-images/json', async (req,res) => {
    const allImages = await HomeImage.find().sort({ordering: 1})
    try {
            // Read Output to browser
            res.status(200).json(allImages)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router