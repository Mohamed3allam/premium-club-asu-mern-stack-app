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
const CommitteeImg = require('../models/committees/CommitteeImg')

const router = express.Router()


const CommitteeConn = mongoose.createConnection(process.env.MONGO_URI_WEBSITE)
//Init gfs
let committeeGfs;
// Init Stream
CommitteeConn.once('open', ()=> {
    committeeGfs = new mongoose.mongo.GridFSBucket( CommitteeConn.db, { bucketName: 'Committees' })
    return committeeGfs
})
// Upload Committee Image Storage
const CommitteeImgStorage = new GridFsStorage({
    url: process.env.MONGO_URI_WEBSITE,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    return reject(err)
                }
                try {
                    const { committee } = req.body
                    const filename = `${committee}-${file.originalname}`;
                    const imageUrl = `/committee/${filename}`
                    const imageExists = await CommitteeImg.findOne({committee: committee})
                    if (imageExists) {
                        await committeeGfs.delete(imageExists.id)
                        const updatedJson = await CommitteeImg.findByIdAndUpdate(imageExists.id, { filename: filename, imageUrl:imageUrl })
                        const fileInfo = {
                            id: updatedJson.id,
                            filename: filename,
                            bucketName: 'Committees'
                        }

                        resolve(fileInfo, updatedJson)
                        return 0
                    }
                    const committeeImage = await CommitteeImg.create({
                        filename: filename, 
                        committee: committee,
                        imageUrl: imageUrl
                    })
                    const fileInfo = {
                        id: committeeImage.id,
                        filename: filename,
                        bucketName: 'Committees'
                    }
                    resolve(fileInfo, committeeImage)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
})
const uploadCommitteeImg = multer({ storage: CommitteeImgStorage })

// @routes

// Upload Image and updating it if exists together-------
router.post('/upload-committee-img', uploadCommitteeImg.single('upload-committee-img'), (req,res)=> {
    try {
        console.log(req.file)
        res.status(200).json({file:req.file})
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
//-------------------------------------------------------

// Get an image in display mode
router.get('/committee-img/display/:name', async (req,res) => {
    const imgName = req.params.name
    // Init Stream
    const CommitteeConn = mongoose.createConnection(process.env.MONGO_URI_WEBSITE)
    CommitteeConn.once('open', ()=> {
        new mongoose.mongo.GridFSBucket(CommitteeConn.db, {bucketName: 'Committees'}).find().toArray(function(err, files) {

            try {
                // Read Output to browser
                const readStream = new mongoose.mongo.GridFSBucket(CommitteeConn.db, {bucketName: 'Committees'}).openDownloadStreamByName(`${imgName}`)
                readStream.pipe(res)
            } catch (error) {
                console.log(error)
            }
        })
    })
})
//-------------------------------------------------------

// Get an Image in JSON
router.get('/committee-img/json/:name', async (req,res) => {
    const imgName = req.params.name
    const eachImage = await CommitteeImg.find({filename: imgName})
    try {
        // Read Output to browser
        if (!eachImage || eachImage.length == 0) {
            res.status(404).json({error: 'There is no Image with this name'})
            return 0
        }
        res.status(200).json(eachImage)
    } catch (error) {
        console.log(error)
    }
})
//-------------------------------------------------------

module.exports = router