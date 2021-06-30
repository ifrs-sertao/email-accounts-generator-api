const axios = require('axios')
const https = require('https')

const URL_API_LDAP_HANDLER = process.env.URL_API_LDAP_HANDLER

const api_ldap_handler_dev = axios.create({
    baseURL: `${URL_API_LDAP_HANDLER}`, 

    httpsAgent: new https.Agent({
        rejectUnauthorized: false
    })
});

module.exports = { api_ldap_handler_dev }; 