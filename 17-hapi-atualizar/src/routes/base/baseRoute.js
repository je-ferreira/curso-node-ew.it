class BaseRoute {
    static methods() {
        return Object.getOwnPropertyNames(this.prototype) //quais são os nomes dos membros dessa classe?
        .filter (method => method !== 'constructor' && !method.startsWith('_'))//do que vc encontrou, me traz somente o que não for construtor nem metodo privado
    }
}

module.exports = BaseRoute