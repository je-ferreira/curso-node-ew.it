const ICrud = require('./../interfaces/interfaceCrud')
const Mongoose = require('mongoose')
const STATUS = {
    0: 'Desconectado',
    1: 'Conectado',
    2: 'Conectando',
    3: 'Desconectando'
}


class MongoDB extends ICrud {
    constructor(connection, schema) {
        super()
        this._schema = schema
        this._connection = connection
    }
    async isConnected() {
        const state = STATUS[this._connection.readyState]
        if (state === 'Conectado') return state;

        if (state !== 'Conectando') return state; //ele n botou ;

        await new Promise(resolve => setTimeout(resolve, 1000))

        return STATUS[this._connection.readyState]

    }
    static connect() {
        Mongoose.connect('mongodb://jessica:minhasenha@192.168.99.100:27017/herois',
            { useNewUrlParser: true }, function (error) {
                if (!error) return;
                console.log('Falha na conexão!', error)
            })
        const connection = Mongoose.connection
        connection.once('open', () => console.log('Database rodando!'))
        return connection
        
    }
    create(item) {
        return this._schema.create(item) //this._schema é o schema
    }
    read(query, skip = 0, limit = 10) { //skip é pra ignorar x itens
        return this._schema.find(query).skip(skip).limit(limit)
    }
    update(id, item) {
        return this._schema.updateOne({ _id: id }, { $set: item }) //set somente no que for passado por parametro
    }
    delete(id) {
        return this._schema.deleteOne({ _id: id })
    }
}

module.exports = MongoDB