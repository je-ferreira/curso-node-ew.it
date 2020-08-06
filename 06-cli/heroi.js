class Heroi {
    constructor({ nome, poder, id }) { //do objeto passado, pego somente nome, poder e id
        this.nome = nome,
        this.poder = poder,
        this.id = id
    }
}

module.exports = Heroi //não é new Heroi porque quando for instanciado é que serão passadas as infos