const ICrud = require('./interfaces/interfaceCrud')

const Sequelize = require('sequelize')


class Postgres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }
    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.log('Deu ruim', error)
        }
    }
    async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }
    async create(item) {
        const { dataValues } = await this._herois.create(item)
        return dataValues //o mocha puxa muitas infos junto, então aqui eu defino que quero somente esta parte
    }
    async connect() { //metodo privado, com _ na frente
        this._driver = new Sequelize(
            'heroes',
            'jessicaferreira',
            'minhasenha',
            {
                host: '192.168.99.100',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorsAliases: false
            }
        )
        await this.defineModel() //pra criar o modelo
    }
    async read(item = {}) { //caso não tenha nada, vem vazio
        return this._herois.findAll({ where: item, raw: true }) //propriedade raw faz a mesma função da chamada do dataValues acima
    }
    async update(id, modificacao) {
        return this._herois.update(modificacao, { where: { id } }) //retorna status, 0-não e 1-sim
    }
    async delete(id) {
        const query = id ? { id } : {} //o id foi passado? então mando ele, senão mando um obj vazio
        return this._herois.destroy({ where: query }) //destroi o obj passado
    }
}

module.exports = Postgres