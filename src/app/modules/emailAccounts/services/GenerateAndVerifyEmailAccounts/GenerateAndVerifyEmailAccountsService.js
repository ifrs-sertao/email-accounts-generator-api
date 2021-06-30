require('dotenv').config();
const { splitFullName, organizeNames, buildAccounts, matchCurrentMailwithSuggestions, compareMailsInLDAP, getFirstAvailableEMail } = require("../../../../../lib/utils");
const { findUser } = require('../../../../../services/ldapService');

class GenerateAndVerifyEmailAccountsService {

    constructor() {}

    async execute({ nome_completo, cpf, matricula, vinculo }) {

        // coloca em minusculo e remove acentos e caracteres
        let fullname = nome_completo.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

        let already_exists_in_ldap = false
        let current_email = ""

        // verifica se o usuario (cpf) já está cadastrado no LDAP
        const userCPF = await findUser(cpf)  
        if (!userCPF) {
            console.log(`The user with CPF ${cpf} cannot be found!`);
        } else {
            console.log(`The user with CPF ${cpf} found!`);
            already_exists_in_ldap = true
            current_email = userCPF.mail
        }


        const userMatricula = await findUser(matricula)  
        if (!userMatricula) {
            console.log(`The user with MATRICULA ${matricula} cannot be found!`);
        } else {
            console.log(`The user with MATRICULA ${cpf} found!`);
            already_exists_in_ldap = true
            current_email = userMatricula.mail
        }

        console.log(`-------------------------------------------------------------------`);


        // divide o nome completo em array de strings
        const splitNames = splitFullName(fullname);

        // organize o array de strings em variaveis - name, lastname, middlenames[]
        const listNames = organizeNames(splitNames)

        // constrói sugestões de contas de e-mails conforme regulamentação do governo federal brasileiro
        const email_accounts_suggestions = buildAccounts(listNames, vinculo)

        // verifica se a conta de e-mail atual é uma das sugestões de conta de e-mail
        const current_email_matches_email_suggestion = matchCurrentMailwithSuggestions(current_email, email_accounts_suggestions)

        // procura se as sugestões de emails existem ou não no LDAP
        const email_accounts_suggestions_exists_ldap = await compareMailsInLDAP(email_accounts_suggestions)

        // pega a primeira sugestão de conta de e-mail disponível (que não está em uso por outro usuário na base LDAP/AD)
        const email = await getFirstAvailableEMail(email_accounts_suggestions_exists_ldap)

        const emailAccounts = {
            fullname,
            already_exists_in_ldap,
            current_email,
            email_accounts_suggestions,
            current_email_matches_email_suggestion,
            email_accounts_suggestions_exists_ldap,
            best_account_suggestion: email
        }

        return emailAccounts
    }
}

module.exports = new GenerateAndVerifyEmailAccountsService;