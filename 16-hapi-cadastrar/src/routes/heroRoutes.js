const BaseRoute = require('./base/baseRoute')
const Joi = require('@hapi/joi')

const failAction = (request, headers, erro) => {
    throw erro;
}

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            config: {
                validate: {
                    // payload -> body
                    // headers -> header
                    // params -> na URL :id
                    // query -> ?skip=10&limit=100
                    failAction: failAction,
                    query: {
                        skip: Joi.number().integer().default(0),
                        limit: Joi.number().integer().default(10),
                        nome: Joi.string().min(3).max(100)    
                    }
                }
            },
            handler: (request, headers) => {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                    const query = {
                        nome: {
                            $regex: `.*${nome}*.`
                        }
                    }
                        
                return this.db.read(nome ? query : {}, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.error('Deu ruim', error)
                    return "Erro interno no Servidor"
                }
            }
        }
    }

    create() {
        return {
            path: '/herois',
            method: 'POST',
            config: {
                validate: {
                    failAction: failAction,
                    payload: {
                        nome: Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(2).max(100)
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { nome, poder } = request.payload
                    const result = await this.db.create({ nome, poder })
                    return {
                        message: 'Heroi cadastrado com sucesso!',
                        _id: result.id
                    }
                } catch (error) {
                    console.error('Deu ruim', error)
                    return 'Internal Error!'
                }
            }
        }
    }

}

module.exports = HeroRoutes