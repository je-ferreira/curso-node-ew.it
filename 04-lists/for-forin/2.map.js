const service = require('./service')

Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for (let indice = 0; indice <= this.length - 1; indice++){
        const resultado = callback(this[indice], indice)
        novoArrayMapeado.push(resultado)
    }
    return novoArrayMapeado
}

async function main() {
    try {
        const results = await service.obterPessoas('a')
        // const names = []
        // results.results.forEach(function (pessoa){ //pra cada pessoa da lista, entra no loop
        // names.push(pessoa.name)
        // })

        // const names = results.results.map(function (pessoa){ //pra cada pessoa da lista, entra no loop (o segundo results é da API)
        //     return pessoa.name
        // })

        // const names = results.results.map(pessoa => pessoa.name) //arrow function, "da pessoa que vc pegou, quero que vc retorne apenas o name"

        const names = results.results.meuMap(function(pessoa, indice){
            // return pessoa.name
            return `[${indice}] ${pessoa.name}`
        })
        console.log('names', names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()