require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { BgImageUploader } = require('../middleware/bgImgUploader')
const { requireAuth } = require('../middleware/requireAuth')
const { grantAccess } = require('../middleware/verifyAuthorization')


// @route /upload-bg-image
// @desc Upload BG Image Route
router.post('/upload-bg-image', BgImageUploader(), (req,res)=> {
    try {
        res.status(200).redirect('/dashboard/website-edit')
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})

router.get('/shownimage/backgroundimage', async (req,res) => {
    const BGImageConn = mongoose.createConnection(process.env.MONGO_URI_BG_IMAGE, { useNewUrlParser:true, useUnifiedTopology:true})
    // Init Stream
     BGImageConn.once('open', ()=> {
        new mongoose.mongo.GridFSBucket(BGImageConn.db, {bucketName: 'backgroundImage'}).find({}).toArray(function(err, file) {
            const latestBg = file[file.length - 1]
            // Check if files
            if (!latestBg || file.length === 0) {
                return res.status(404).json({
                    error: 'There is no background image'
                })
            }
            console.log(latestBg.contentType)
            // Check if image
            if (latestBg.contentType === 'image/jpeg' || latestBg.contentType === 'image/png') {
                // Read Output to browser
                try {
                    const readStream = new mongoose.mongo.GridFSBucket(BGImageConn.db, {bucketName: 'backgroundImage'}).openDownloadStreamByName(latestBg.filename)
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