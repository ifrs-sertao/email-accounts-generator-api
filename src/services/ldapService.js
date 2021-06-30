require('dotenv').config()
const { api_ldap_handler_dev } = require("../services/api.sertao");
const AppError = require('../shared/errors/AppError')

const TOKEN_API_LDAP_HANDLER = process.env.TOKEN_API_LDAP_HANDLER

module.exports = {

    async findUser(user) {

        const username = user

        try {

            const response = await api_ldap_handler_dev.get(`users/${username}`, {
                headers: {
                    'Authorization': 'Bearer ' + TOKEN_API_LDAP_HANDLER
                  }
            });

            const user = response.data;

            return user

        } catch (error) {

            if(error.code == 'ECONNREFUSED') {
                throw new AppError(500, `Erro no serviço LDAP!`);
            } else {
                return false
            }
        }
    }
}