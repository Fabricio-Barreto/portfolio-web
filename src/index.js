const express = require('express')
const hbs = require('hbs')
const path = require('path')
const nodemailer = require('nodemailer')

const SMTP_CONFIG = require('./config/smtp')
const { getMaxListeners } = require('process')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index', {
 
    })
})   

app.post('/', (req, res) => {
    
    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user:SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass
        },
        tls: {
            rejectUnauthorized: false
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: [SMTP_CONFIG.user, 'fabriciobarrr@gmail.com'],
        subject: `Message from ${req.body.email}.`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error)
            res.send('error')
        } else {
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
    
})




app.listen(port, () => {
    console.log('Server is online on port ' + port)
})