import { Router } from 'express'
import User from '../models/User.js'
import CryptoJS from 'crypto-js'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import sendInfoEmail from '../Nodemailer/SendEmail.js'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authRoutes = Router();
const dirFile = path.resolve(__dirname, '../upload')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${dirFile}`)
    },
    filename: (req, file, cb) => {
        const fileName = req.body.username
            
        const fileExtension = path.extname(file.originalname)

        cb(null, `${fileName}-${Date.now()}${fileExtension}`)
    }
})

//REGISTRO

const upload = multer({ storage: storage })

authRoutes.post('/register', upload.single("file"), async (req, res) => {
    const register = 1
    const { file, body } = req
    
    if (file && body) {
        const newUser = await new User({
            username: body.username,
            email: body.email,
            password: CryptoJS.AES.encrypt(body.password, process.env.PASS_SEC).toString(),
            nombre: body.nombre,
            direccion: body.direccion,
            edad: body.edad,
            numCel: body.numCel,
            file: `http://localhost:5000/${file.filename}`
        })

        try {
            const savedUser = newUser.save()
            sendInfoEmail(req.body, register)
            res.status(201).json(savedUser);
        } catch (error) {
            res.status(500).json(error)
        }

    }
})

//LOGUIN
authRoutes.post('/login', async (req, res) => {
    try {

        const user = await User.findOne({ username: req.body.username })
        !user && res.status(401).json('Credenciales Incorrectas')

        const hasPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC)

        const originalPassword = hasPassword.toString(CryptoJS.enc.Utf8)
        originalPassword !== req.body.password && res.status(401).json('Credenciales Incorrectas')

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SEC,
            { expiresIn: "1d" }
        )

        const { password, ...others } = user._doc
        res.status(200).json({ ...others, accessToken })

    } catch (error) {
        res.status(500).json(error)
    }
})

export default authRoutes;