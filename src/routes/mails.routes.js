const express = require('express');
const mailsRoutes = express.Router();

const generateEmailAccountsController = require("../app/modules/emailAccounts/services/GenerateEmailAccounts/GenerateEmailAccountsController");
const generateAndVerifyEmailAccountsController = require("../app/modules/emailAccounts/services/GenerateAndVerifyEmailAccounts/GenerateAndVerifyEmailAccountsController");

mailsRoutes.post("/generate",  generateEmailAccountsController.handle);
mailsRoutes.post("/generate-and-verify",  generateAndVerifyEmailAccountsController.handle); // Utiliza o serviço ldaṕ-hanlder-services - https://github.com/ifrs-sertao/ldap-handler-services


module.exports = mailsRoutes;