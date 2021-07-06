require('dotenv').config();
const { findUser } = require("../services/ldapService");

const studentsEmailDomain = process.env.STUDENTS_EMAIL_DOMAIN
const employesEmailDomain = process.env.EMPLOYES_EMAIL_DOMAIN

const numberOfSuggestions = process.env.NUMBER_OF_SUGGESTIONS





function splitFullName(nome_completo) {

    let arrayString = nome_completo.split(" ");

    for (let i = 0; i < arrayString.length; i++) {
        arrayString[i] = arrayString[i].replace(/\s+/g, '')
        if (arrayString[i] == '') {
            arrayString.splice(i, 1);
            i--;
        }
    }

    return arrayString
}

function organizeNames(arrayNames) {

    // se middlename tiver algumas dessas proposições é excluido
    const prepositions = ["da", "de", "di", "do", "du", "dos"]

    let name = arrayNames[0]
    let lastname = arrayNames[arrayNames.length - 1]

    let middlenames = []
    if (arrayNames.length > 2) {
        for (let i = 1; i < arrayNames.length - 1; i++) {
            if (!prepositions.includes(arrayNames[i])) {
                middlenames.push(arrayNames[i])
            }
        }
    }

    return list = {
        name,
        lastname,
        middlenames
    }
}

function buildAccounts(list, vinculo) {

    const suggestionsNumbers = numberOfSuggestions

    let mail_domain = ""

    if (vinculo == 'aluno') {
        mail_domain = studentsEmailDomain
    } else if ( vinculo == 'servidor' || 'professor' || 'tecnico' || 'terceirizado') {
        mail_domain = employesEmailDomain
    }     

    let arraMails = []

    // cria eamil com nome.sobre
    let mail = list.name.concat(`.${list.lastname}`).concat(`${mail_domain}`);
    arraMails.push(mail)

    // criar emails com nome + nomes do meio
    for (let i = list.middlenames.length - 1; i > -1; i--) {
        mail = list.name.concat(`.${list.middlenames[i]}`).concat(`${mail_domain}`);
        arraMails.push(mail)
    }

    //criar emails com nome + sobrenome + numero iniciando com 1
    for (let j = 1; j <= suggestionsNumbers; j++) {
        mail = list.name.concat(`.${list.lastname}`).concat(`.${j}`).concat(`${mail_domain}`);
        arraMails.push(mail)
    }

    // // criar emails com nome + nomes do meio + numero iniciando com 1
    for (let m = list.middlenames.length - 1; m > -1; m--) {
        for (let n = 1; n <= suggestionsNumbers; n++) {
            mail = list.name.concat(`.${list.middlenames[m]}`).concat(`.${n}`).concat(`${mail_domain}`);
            arraMails.push(mail)
        }
    }

    return arraMails
}

function matchCurrentMailwithSuggestions(current_mail, mails_suggestions) {

    const matchMail = mails_suggestions.some((mail) => mail === current_mail)

    return matchMail
}

async function compareMailsInLDAP(mails) {

    const mailsMatch = await Promise.all(await mails.map(async (mail) => {

        const response = await findUser(mail)

        const users = response

        if (!users) {
            return { email: mail, existsInLDAP: false }
        } else {
            return { email: mail, existsInLDAP: true, user: { CN: users.cn, sAMAccountName: users.sAMAccountName, uid: users.uid } }
        }

    }))

    return mailsMatch
}

async function getFirstAvailableEMail(mails_suggestions) {

    const firstAvailableMail = []
    await Promise.all(mails_suggestions.map(async function (mail) {
        if (mail.existsInLDAP == false) { //ver se ta OK isso aqui
            firstAvailableMail.push(mail.email)
        }

    }));

    return firstAvailableMail[0]
}

module.exports = {
    splitFullName,
    organizeNames,
    buildAccounts,
    matchCurrentMailwithSuggestions,
    compareMailsInLDAP,
    getFirstAvailableEMail
}