const Mongoose = require('mongoose')
// Mongoose.connect('mongodb://admin:senhaadmin@localhost:27017/herois')
Mongoose.connect('mongodb://localhost:27017/herois',
    { useNewUrlParser: true }, function (error) {
        if (!error) return;
        console.log('Falha na conexão!', error)
    })
const connection = Mongoose.connection

// Formas diferentes de declarar uma function

// function nomeFuncao() {

// }

// const minhaFuncao = function () {

// }

// const minhaFuncaoArrow = () => {

// }

// const minhaFuncaoArrow = (params) => console.log(params) //se for apenas 1 linha, não é necessario chaves


connection.once('open', () => console.log('Database rodando!'))
setTimeout(() => {
    const state = connection.readyState
    console.log('state', state)
})
/*
    States
    0: desconectado
    1: conectado
    2: conectando
    3: desconectando

*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})

const model = Mongoose.model('heroi', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}

main()