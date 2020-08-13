//npm install hapi

const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')


const app = new Hapi.Server({
    port: 5000
})

function mapRoutes(instance, methods) {  //trazer nome dos metodos 
    return methods.map(method => instance[method]()) //pra cada metodo, quero chamar essa instancia passando o metodo
}

async function main() {
    const connection = Mongodb.connect()
    const context = new Context(new Mongodb(connection, HeroiSchema))

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()) //add rotas dinamicamente
     ])

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()