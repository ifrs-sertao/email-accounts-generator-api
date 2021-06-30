const generateAndVerifyEmailAccountsService = require('./GenerateAndVerifyEmailAccountsService')

class GenerateAndVerifyEmailAccountsController {

    constructor() {}

    async handle(request, response) {

        const { nome_completo, cpf, matricula, vinculo } = request.body

        const emailAccounts = await generateAndVerifyEmailAccountsService.execute({ nome_completo, cpf, matricula, vinculo })

        return response.status(200).send({
            emailAccounts
        });

    }
}

module.exports = new GenerateAndVerifyEmailAccountsController;

