require('dotenv').config()
const mongoose = require('mongoose')
const {GridFsStorage} = require('multer-gridfs-storage')
const crypto = require('crypto')
const User = require('../models/User')
const {requireAuth} = require('./requireAuth')

const multer = require('multer')
const path = require('path')


// Uploading Background for the website
const BgImageUploader = function() {
    const BGImageConn = mongoose.createConnection(process.env.MONGO_URI_BG_IMAGE)
    //Init gfs
    let bgImageGfs;
    // Init Stream
     BGImageConn.once('open', ()=> {
        bgImageGfs = new mongoose.mongo.GridFSBucket(BGImageConn.db, {bucketName: 'backgroundImage'})
        return bgImageGfs
    })
    // storage engine
    const BGImageStorage = new GridFsStorage({
        url: process.env.MONGO_URI_BG_IMAGE,
        file: (req, file)=> {
            return new Promise((resolve, reject) => {
                crypto.randomBytes(16, async (err,buf)=> {
                    if (err) {
                        return reject(err)
                    }
                    const filename = 'Background Image' + path.extname(file.originalname);
                    const fileInfo = {
                        filename: filename,
                        bucketName: 'backgroundImage'
                    }
                    try {
                        await bgImageGfs.drop()
                        resolve(fileInfo)
                    } catch (err) {
                        reject(err)
                    }
                })
            })
        }
    })
    const upload = multer({ storage: BGImageStorage }).single('bg-image')
    return upload;
}

module.exports = {
    BgImageUploader
}