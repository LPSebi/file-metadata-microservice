import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'

const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post('/', upload.single('file'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
