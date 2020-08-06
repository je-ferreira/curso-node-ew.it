const BaseRoute = require('./base/baseRoute')
const Joi = require('@hapi/joi')

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
                    failAction: (request, headers, erro) => {
                        throw erro;
                    },
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

}

module.exports = HeroRoutes