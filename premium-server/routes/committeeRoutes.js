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
const Committee = require('../models/committees/Committee')
const User = require('../models/User')

const router = express.Router()


const CommitteeConn = mongoose.createConnection(process.env.MONGO_URI_USER, { 
    useNewUrlParser:true, 
    useUnifiedTopology:true, 
    readPreference:'secondary' 
})
//Init gfs
let CommitteeGfs;
// Init Stream
CommitteeConn.once('open', ()=> {
    CommitteeGfs = new mongoose.mongo.GridFSBucket( CommitteeConn.db, { bucketName: 'Committees' })
    return CommitteeGfs
})


// @ storage engines


// Create Committee Storage
const CommitteeStorage = new GridFsStorage({
    url: process.env.MONGO_URI_USER,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    return reject(err)
                }
                try {
                    const { committee_name } = req.body
                    const filename = `${committee_name}-${file.originalname}`;
                    const imageUrl = `/committee-api/committee/image/${filename}`

                    const committeeExists = await Committee.findOne({committee_name: committee_name})
                    if (committeeExists) {
                        throw Error('Committee Exists')
                    }

                    const committeeCount = await Committee.countDocuments()
                    if (committeeCount >= 7) {
                        throw Error("There is only 7 committees")
                    }

                    const memberCount = await User.countDocuments({role:'Member',committee:committee_name})
                    const committee_head = await User.findOne({role:'Head', committee: committee_name})
                    const committee_vice_heads = await User.find({role:'Vice Head', committee: committee_name})
                    const committee = await Committee.create({
                        committee_name: committee_name,
                        committee_image_filename: filename, 
                        committee_image_url: imageUrl,
                        committee_head: committee_head,
                        committee_vice_heads: committee_vice_heads,
                        members_count: memberCount
                    })
                    const fileInfo = {
                        id: committee.id,
                        filename: filename,
                        bucketName: 'Committees'
                    }
                    resolve(fileInfo, committee)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
})
const uploadCommittee = multer({ storage: CommitteeStorage })

// Edit Committee Image Storage
const EditCommitteeStorage = new GridFsStorage({
    url: process.env.MONGO_URI_USER,
    file: (req, file)=> {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, async (err,buf)=> {
                if (err) {
                    return reject(err)
                }
                try {
                    const committee_id = req.params.id;
                    const committee = await Committee.findById(committee_id)


                    const filename = `${committee.committee_name}-${file.originalname}`;
                    const imageUrl = `/committee-api/committee/image/${filename}`


                    const memberCount = await User.countDocuments({role:'Member',committee:committee.committee_name})
                    const committee_head = await User.findOne({role:'Head', committee: committee.committee_name})
                    const committee_vice_heads = await User.find({role:'Vice Head', committee: committee.committee_name})
                    const updatedCommittee = await Committee.findByIdAndUpdate(committee_id, {
                        committee_image_filename: filename, 
                        committee_image_url: imageUrl,
                        committee_head: committee_head,
                        committee_vice_heads: committee_vice_heads,
                        members_count: memberCount
                    })
                    await CommitteeGfs.delete(committee_id)
                    const fileInfo = {
                        id: updatedCommittee.id,
                        filename: filename,
                        bucketName: 'Committees'
                    }
                    resolve(fileInfo, updatedCommittee)
                } catch (err) {
                    reject(err)
                }
            })
        })
    }
})
const uploadCommitteeImg = multer({ storage: EditCommitteeStorage })
//-------------------------------------------------------


// @routes

// Upload Image and updating it if exists together-------
router.post('/create-committee', requireAuth, grantAccess('updateAny', 'website'), uploadCommittee.single('create-committee'), (req,res)=> {
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


// Edit Committee Image ---------------------------------
router.put('/edit-committee-img/:id', requireAuth, grantAccess('updateAny', 'website'), uploadCommitteeImg.single('edit-committee-img'), (req,res)=> {
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

// Edit Committee Description ---------------------------------
router.put('/edit-committee-description/:committeeId', requireAuth, grantAccess('updateAny', 'website'), async (req,res)=> {
    const { description } = req.body
    const committeeId = req.params.committeeId
    try {
        const committee = await Committee.findByIdAndUpdate(committeeId, {committee_description:description})
        console.log('Committee description edited successfully ')
        res.status(200).json(committee)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
})
//-------------------------------------------------------

// Get an image in display mode
router.get('/committee/image/:name', async (req,res) => {
    const imgName = req.params.name;
    // Init Stream
    (CommitteeConn.readyState === 1) &&
        await CommitteeGfs.find().toArray(async (err, files) => {
            try {
                // Read Output to browser
                const readStream = await CommitteeGfs.openDownloadStreamByName(`${imgName}`)
                readStream.pipe(res)
            } catch (error) {
                console.log(error)
            }
        })
})
//-------------------------------------------------------

// Get an Image in JSON
router.get('/committee/json/:name', async (req,res) => {
    const committeeName = req.params.name;
    const eachCommittee = await Committee.findOne({committee_name: committeeName})
    try {
        // Read Output to browser
        if (!eachCommittee || eachCommittee.length == 0) {
            res.status(404).json({error: 'There is no Committee with this name'})
            return 0
        }
        res.status(200).json(eachCommittee)
    } catch (error) {
        console.log(error)
    }
})
//-------------------------------------------------------


// Get all committee Image in JSON
router.get('/committees', async (req,res) => {
    const committees = await Committee.find()
    try {
        // Read Output to browser
        if (!committees || committees.length == 0) {
            res.status(404).json({error: 'There is no Committees'})
            return 0
        }
        res.status(200).json(committees)
    } catch (error) {
        console.log(error)
    }
})
//-------------------------------------------------------

// Get all committee Image in JSON
router.get('/committee/:id', async (req,res) => {
    const committeeId = req.params.id;

    const committee = await Committee.findById(committeeId)
    try {
        // Read Output to browser
        if (!committee) {
            res.status(404).json({error: 'Not a Committee'})
            return 0
        }
        res.status(200).json(committee)
    } catch (error) {
        console.log(error)
    }
})
//-------------------------------------------------------

module.exports = router