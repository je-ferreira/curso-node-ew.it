const ICrud = require('./interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}


class MongoDB extends ICrud {
    constructor() {
        super()
        this._herois = null
        this._driver = null
    }
    async isConnected() {
        const state = STATUS[this._driver.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state; //ele n botou ;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._driver.readyState]

    }
    defineModel() {
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

        this._herois = Mongoose.model('heroi', heroiSchema)
    }
    connect() {
        Mongoose.connect('mongodb://jessica:minhasenha@192.168.99.100:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexão!', error)
            })
        const connection = Mongoose.connection
        this._driver = connection
        connection.once('open', () => console.log('Database rodando!'))
        this.defineModel()
    }
    create(item) {
        return this._herois.create(item) //this._herois é o schema
    }
    read(query, skip = 0, limit = 10) { //skip é pra ignorar x itens
        return this._herois.find(query).skip(skip).limit(limit)
    }
    update(id, item) {
        return this._herois.updateOne({ _id: id }, { $set: item }) //set somente no que for passado por parametro
    }
    delete(id) {
        return this._herois.deleteOne({ _id: id })
    }
}

module.exports = MongoDB