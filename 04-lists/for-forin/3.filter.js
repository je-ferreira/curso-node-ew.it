const { obterPessoas } = require('./service') //pra importar apenas a function

/* destructuring

const item = {
    nome: 'Erick',
    idade: 12
}

const { nome, idade } = item
console.log (nome, idade)

*/

Array.prototype.meuFilter = function (callback) {
    const lista = []
    for (index in this) { //this é a lista completa
        const pessoa = this[index]
        const result = callback(pessoa, index, this)
        //0, "", null, undefined = false
        if (!result) continue;
        lista.push(pessoa)
    }
    return lista;
}

async function main() {
    try {
        const { results } = await obterPessoas('a') //pegar o results da API (conforme resultados da pesquisa)
        // const familiaLars = results.filter(function (pessoa){
        //     //por padrão precisa retornar um booleano
        //     //para informar se deve manter ou remover da lista
        //     //false -> remove
        //     //true -> mantem
        //     //não encontrou = -1
        //     //encontrou = posicao no array
        // const result = pessoa.name.toLowerCase().indexOf('lars') !== -1 //filtro, retorna -1 se não encontrar
        // return result
        // })
        const familiaLars = results.meuFilter((pessoa, index, lista) => { //function com 3 parametros
            console.log(`index: ${index}`, lista.length)
            return pessoa.name.toLowerCase().indexOf('lars') !== -1
        })

        const names = familiaLars.map(pessoa => pessoa.name) //pega os names do resultado filtrado
        console.log(names)
    } catch (error) {
        console.error('DEU RUIM', error)
    }
}

main()