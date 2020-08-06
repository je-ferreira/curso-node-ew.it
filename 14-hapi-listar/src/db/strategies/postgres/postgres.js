const ICrud = require('./../interfaces/interfaceCrud')
const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor(connection, schema) {
        super()
        this._connection = connection
        this._schema = schema
    }
    async isConnected() {
        try {
            await this._connection.authenticate()
            return true
        } catch (error) {
            console.log('Deu ruim', error)
            return false;
        }
    }
    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        )
        await model.sync()
        return model
    }
    async create(item) {
        const { dataValues } = await this._schema.create(item)
        return dataValues //o mocha puxa muitas infos junto, então aqui eu defino que quero somente esta parte
    }
    
    async read(item = {}) { //caso não tenha nada, vem vazio
        return this._schema.findAll({ where: item, raw: true }) //propriedade raw faz a mesma função da chamada do dataValues acima
    }
    async update(id, modificacao) {
        return this._schema.update(modificacao, { where: { id } }) //retorna status, 0-não e 1-sim
    }
    async delete(id) {
        const query = id ? { id } : {} //o id foi passado? então mando ele, senão mando um obj vazio
        return this._schema.destroy({ where: query }) //destroi o obj passado
    }
    static async connect() { 
        const connection = new Sequelize(
            'heroes',
            'jessicaferreira',
            'minhasenha',
            {
                host: '192.168.99.100',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false,
                logging: false
            }
        )
        return connection
    }
}

module.exports = Postgres