require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const crypto = require('crypto')
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')
const { GridFsStorage } = require('multer-gridfs-storage')
const multer = require('multer')
const path = require('path')
const User = require('../models/User')


const PPImageConn = mongoose.createConnection(process.env.MONGO_URI_USER)
//Init gfs
let PPImageGfs;
// Init Stream
PPImageConn.once('open', ()=> {
    PPImageGfs = new mongoose.mongo.GridFSBucket(PPImageConn.db, {bucketName: 'Profile Pics'})
    return PPImageGfs
})
// storage engine
const PPImageStorage = new GridFsStorage({
    url: process.env.MONGO_URI_USER,
    file: (req, file)=> {
        return new Promise( (resolve, reject) => {
            crypto.randomBytes(16, async(err,buf)=> {
                if (err) {
                    console.log(err);
                    return reject(err)
                }
                // console.log(req.user)
                const filename = `${req.user.name.firstName} ${req.user.name.lastName}'s Profile Picture` + path.extname(file.originalname);
                const fileInfo = {
                    id: req.user.id,
                    filename: filename,
                    bucketName: 'Profile Pics'
                }
                try {
                    if (req.user.profilePicUrl === '/default-pp') {
                        resolve(fileInfo)
                    }
                    resolve(fileInfo)
                    await PPImageGfs.delete(fileInfo.id)
                } catch (error) {
                    console.log(error)
                }
            })
        })
    }
})
const upload = multer({ storage: PPImageStorage })


// @route /upload-pp-image
// @desc Upload PP Image Route
router.put('/upload-pp-image',requireAuth,upload.single('pp-image'), async (req,res)=> {
    console.log(req.file,req.user)
    try {
        const userId = req.user.id
        const updatedProfilePic = {
            profilePicUrl: `/api-pp/users/${req.user.id}`
        }
        await User.findByIdAndUpdate(userId, updatedProfilePic)
        res.json({file: req.file, user: req.user}).redirect('/dashboard/profile')
    } catch (error) {
        res.json({error: error})
    }
})

router.get('/default-pp', async (req,res) => {
    const PPImageConn = mongoose.createConnection(process.env.MONGO_URI_USER)
    // Init Stream
     PPImageConn.once('open', ()=> {
        new mongoose.mongo.GridFSBucket(PPImageConn.db, {bucketName: 'Default Profile Pic'}).find({}).toArray(function(err, file) {
            const lastestPP = file[file.length - 1]
            // Check if files
            if (!lastestPP || file.length === 0) {
                return res.status(404).json({
                    error: 'There is no Profile Picture'
                })
            }
            console.log(lastestPP.contentType)
            // Check if image
            if (lastestPP.contentType === 'image/jpeg' || lastestPP.contentType === 'image/png') {
                // Read Output to browser
                try {
                    const readStream = new mongoose.mongo.GridFSBucket(PPImageConn.db, {bucketName: 'Default Profile Pic'}).openDownloadStreamByName(lastestPP.filename)
                    readStream.pipe(res)
                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(404).json({
                    error: 'not an image'
                })
            }
        })
    })
})


router.get('/users/:userId', async (req,res) => {
    const user_id = req.params.userId
    const PPImageConn = mongoose.createConnection(process.env.MONGO_URI_USER)
    // Init Stream
     PPImageConn.once('open', ()=> {
        new mongoose.mongo.GridFSBucket(PPImageConn.db, {bucketName: 'Profile Pics'}).find().toArray(function(err, file) {
            const lastestPP = file[file.length - 1]

            // Check if files
            if (!lastestPP || file.length === 0) {
                return res.status(404).json({
                    error: 'There is no Profile Picture'
                })
            }
            // Check if image
            if (lastestPP.contentType === 'image/jpeg' || lastestPP.contentType === 'image/png') {
                // Read Output to browser
                try {
                    const readStream = new mongoose.mongo.GridFSBucket(PPImageConn.db, {bucketName: 'Profile Pics'}).openDownloadStream(user_id)
                    readStream.pipe(res)
                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(404).json({
                    error: 'not an image'
                })
            }
        })
    })
})

module.exports = router