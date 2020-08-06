const BaseRoute = require('./base/baseRoute')

class HeroRoutes extends BaseRoute {
    constructor(db) {
        super()
        this.db = db
    }

    list() {
        return {
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                try {
                    const {
                        skip,
                        limit,
                        nome
                    } = request.query

                        let query = {}
                        if (nome) {
                            query.nome = nome
                        }

                        if(isNaN(skip))
                            throw new Error('O tipo do skip é incorreto')
                        if(isNaN(limit))
                            throw new Error('O tipo do limit é incorreto')

                        
                return this.db.read(query, parseInt(skip), parseInt(limit))

                } catch (error) {
                    console.error('Deu ruim', error)
                    return "Erro interno no Servidor"
                }
            }
        }
    }

}

module.exports = HeroRoutes