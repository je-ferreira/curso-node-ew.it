//npm install hapi
//npm install vision inert hapi-swagger@9.1.3
//npm install hapi-auth-jwt2


const Hapi = require('hapi')
const Context = require('./db/strategies/base/contextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HeroRoute = require('./routes/heroRoutes')
const AuthRoute = require('./routes/authRoutes')

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDÃO_123'

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
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // },
        validate: (dado, request) => {
            //verifica no banco se o usuario continua ativo
            //verifica no banco se o usuario continua pagando

            return {
                isValid: true
            }
        }
    })
    
    app.auth.default('jwt')

    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
    ]) 

    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}

module.exports = main()