
//mongoose connection
const conn = mongoose.createConnection(process.env.MONGO_URI)

//Init gfs
let gfs;

conn.once('open', () => {
    //Init Stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {bucketName: "uploads"})
    return gfs
})

//Create Storage Engine
const storage = new GridFsStorage({
    url: process.env.MONGO_URI,
    file: ( req, file ) => {
        return new Promise(( resolve, reject ) => {
            crypto.randomBytes(16, (err,buf)=> {
                if (err) {
                    return reject(err)
                }
                const fileName = buf.toString('hex') + path.extname(file.originalname)
                const fileInfo = {
                    fileName: fileName,
                    bucketName: 'uploads'
                }
                
                resolve(fileInfo)
            })
        })
    }
})
const upload = multer({ storage: storage })

