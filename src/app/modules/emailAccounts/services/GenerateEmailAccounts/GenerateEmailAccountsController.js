const generateEmailAccountsService = require('./GenerateEmailAccountsService')

class GenerateEmailAccountsController {

    constructor() {}

    async handle(request, response) {

        const { nome_completo, vinculo} = request.body

        const emailAccounts = await generateEmailAccountsService.execute({ nome_completo, vinculo })

        return response.status(200).send({
            ...emailAccounts
        });

    }
}

module.exports = new GenerateEmailAccountsController;

