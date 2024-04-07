import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'
import fs from 'fs'

const app = express()
app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
// create "uploads"
fs.mkdir('uploads', { recursive: true }, (err) => {
    if (err) throw err
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    res.json({
        name: req.file.originalname,
        type: req.file.mimetype,
        size: req.file.size,
    })
})

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './' })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
