const express = require('express');
const emailsAccountsRoutes = express.Router();

const generateEmailAccountsController = require("../app/modules/emailAccounts/services/GenerateEmailAccounts/GenerateEmailAccountsController");
const generateAndVerifyEmailAccountsController = require("../app/modules/emailAccounts/services/GenerateAndVerifyEmailAccounts/GenerateAndVerifyEmailAccountsController");

emailsAccountsRoutes.post("/generate",  generateEmailAccountsController.handle);
emailsAccountsRoutes.post("/generate-and-verify",  generateAndVerifyEmailAccountsController.handle); // Utiliza o serviço ldaṕ-hanlder-services - https://github.com/ifrs-sertao/ldap-handler-services


module.exports = emailsAccountsRoutes;