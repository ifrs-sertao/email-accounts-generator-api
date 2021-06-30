const express = require('express')
const router = express.Router()

const mailsRoutes = require('./mails.routes')

router.use('/mails', mailsRoutes)

module.exports = router