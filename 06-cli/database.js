const {
    readFile,
    writeFile
}
    = require('fs')

const {
    promisify //pra transformar o que for callback em promise
} = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

//outra forma de obter dados do json
// const dadosJson = require('./herois.json')

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }
    async obterDadosArquivo() { //metodo auxiliar
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8') //de onde vou ler? qual tipo de arquivo?
        return JSON.parse(arquivo.toString()) //toString pra transformar em texto, vem como buffer
    }
    async escreverArquivo(dados) { //metodo auxiliar do cadastrar
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados)) //onde vou escrever? e qual tipo de entrada?
        return true //confirma após escrever no arquivo
    }
    async cadastrar(heroi) {
        const dados = await this.obterDadosArquivo() //pra pegar os dados do arquivo, que são uma lista
        const id = heroi.id <= 2 ? heroi.id : Date.now(); //pra ignorar o id fixo, se o id for menor ou igual a 2 eu salvo ele, senão eu gero um novo baseado na hora
        /*     
        imagina que o heroi veio assim:
        
        {
            nome: Flash,
            poder: Velocidade,
        }

        dai eu quero adicionar uma propriedade à ele, a partir de um novo objeto:

        {
            id: 154645
        }

        quero juntar os 2, deixando assim:

        {
            nome: Flash,
            poder: Velocidade,
            id: 154645
        }

        pra isso: 
        */

        const heroiComId = { //tecnica do js pra concatenar os objetos
            id, //pega o id que eu gerei acima
            ...heroi //e junta com o heroi
        }
        const dadosFinal = [
            ...dados, //pega o array de herois que eu tenho
            heroiComId //e concatena com o novo heroi
        ]
        const resultado = await this.escreverArquivo(dadosFinal)
        return resultado
    }
    async listar(id) {
        const dados = await this.obterDadosArquivo() //traz todo mundo
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true)) //traz todo mundo que tiver o mesmo id passado, caso o usuario n passe então traz todo mundo
        return dadosFiltrados
    }

    async remover(id) {
        if (!id) {
            return await this.escreverArquivo([])
        }
        const dados = await this.obterDadosArquivo()
        const indice = dados.findIndex(item => item.id === parseInt(id)) //o cara que eu te passar, vc vai me responder com o id dele
        if (indice === -1) { //se o indice for true, porque eu to pesquisando ids 0 e 1 (que seriam 'false' pro js)
            throw Error('o usuário não existe')
        }
        dados.splice(indice, 1)
        return await this.escreverArquivo(dados)
    }

    async atualizar(id, modificacoes) {
        const dados = await this.obterDadosArquivo() //pego os dados do arquivo
        const indice = dados.findIndex(item => item.id === parseInt(id)) //procura o id digitado nos dados do arquivo
        if (indice === -1) {
            throw Error('O heroi informado nao existe')
        }
        const atual = dados[indice] //pego o item selecionado pelo id
        const objetoAtualizar = { //substitui o que está no 'atual' pelo 'modificacoes
            ...atual,
            ...modificacoes
        }
        dados.splice(indice, 1) //remove o 'atual' da lista

        return await this.escreverArquivo([ //insere o objeto atualizado nos dados existentes
            ...dados,
            objetoAtualizar
        ])

    }
}

module.exports = new Database() //pra utilizar em outros locais e não precisar ficar instanciando