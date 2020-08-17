//npm install hapi
//npm install vision inert hapi-swagger@9.1.3

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {  //trazer nome dos metodos 
    return methods.map(method => instance[method]()) //pra cada metodo, quero chamar essa instancia passando o metodo
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, HeroiSchema))
    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version: 'v1.0'
        },
        lang: 'pt'
    }

    await app.register([ //registro dos plugins
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.route( //add rotas dinamicamente
        mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ) 

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()