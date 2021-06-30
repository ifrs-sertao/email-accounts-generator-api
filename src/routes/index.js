const express = require('express')
const router = express.Router()

const emailsAccountsRoutes = require('./email-account.routes')

router.use('/email-accounts', emailsAccountsRoutes)

module.exports = router