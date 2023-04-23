const express = require('express')
const app = express()

require('dotenv').config()

const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient
mongoose.set('strictQuery', false);

const bodyParser = require("body-parser");
const methodOverride = require('method-override')
const cors = require('cors')
const cookieParser = require('cookie-parser')


//Requiring routes
const userAuth = require("./routes/userAuthRoutes")
const userRoutes = require("./routes/userRoutes");
const PPImageRoutes = require('./routes/ppImageRoutes')
const homeSectionRoutes = require('./routes/homeData')
const homeMainEventsImagesRoutes = require('./routes/homeMainEventsImages')
const activityRoutes = require('./routes/activityRoutes')
const committeeRoutes = require('./routes/committeeRoutes');


mongoose.connect(process.env.MONGO_URI,{ useNewUrlParser:true, useUnifiedTopology:true, maxPoolSize:10, readPreference:'secondary' }, () => {
    console.log('MongoDb Connected')
})

// console.log(mongoose.connections)
// const cleanUp = () => {
//     mongoose.connection.close(() => {
//         console.info('connection closed');
//     });
// };

// [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`].forEach((eventType) => {
//     process.on(eventType, cleanUp.bind(null, eventType));
// })

// json middleware
// app.use(express.json())
app.use(cors())
app.use(cookieParser())


//bodyParser middleware to help requesting body
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.set('view engine', 'ejs');


// MongoStore Middleware


//routes
app.use('/authuser', userAuth)
app.use('/users', userRoutes)
app.use('/api-pp',  PPImageRoutes)
app.use('/home-api', homeSectionRoutes)
app.use('/home-api', homeMainEventsImagesRoutes)
app.use('/activity-api', activityRoutes)
app.use('/committee-api', committeeRoutes)

// @route GET /
// @desc Loads Image upload Form
app.get('/', (req,res)=> {
    res.render('imagesPage')
})

// @route GET /allimages
// @desc Display all images
app.get('/allimages', async (req,res)=> {
    await gfs.find().toArray((err, files)=> {
        // Check if files 
        files.forEach(file => {
            console.log(file)
            if (!file || files.length === 0) {

                return res.status(404).json({
                    error: 'No files exists'
                })
            }
            // Check if image
            if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
                // Read Output to browser
                console.log(file.length)
                console.log(files.length)
                console.log(file.filename);
                const readStream = gfs.openDownloadStreamByName(file.filename)
                readStream.pipe(res)
            } else {
                res.status(404).json({
                    error: 'not an image'
                })
            }
        });
    })
})


app.listen(process.env.PORT, ()=> {
    console.log(`Started listening on port ${process.env.PORT}`)
})