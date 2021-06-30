require('dotenv').config();
const { splitFullName, organizeNames, buildAccounts, matchCurrentMailwithSuggestions, compareMailsInLDAP, getFirstAvailableEMail } = require("../../../../../lib/utils");
const { findUser } = require('../../../../../services/ldapService');

class GenerateEmailAccountsService {

    constructor() {}

    async execute({ nome_completo, vinculo }) {

        // coloca em minusculo e remove acentos e caracteres
        let fullname = nome_completo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        // divide o nome completo em array de strings
        const splitNames = splitFullName(fullname);

        // organize o array de strings em variaveis - name, lastname, middlenames[]
        const listNames = organizeNames(splitNames)

        // constrói sugestões de contas de e-mails conforme regulamentação do governo federal brasileiro
        const email_accounts_suggestions = buildAccounts(listNames, vinculo)


        const emailAccounts = {
            fullname,
            email_accounts_suggestions,
        }

        return emailAccounts
    }
}

module.exports = new GenerateEmailAccountsService;