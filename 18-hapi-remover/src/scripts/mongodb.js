// docker ps
docker exec -it 0ead7006aabc mongo -u jessica -p minhasenha --authenticationDatabase herois
// docker exec -it ceb8a2d6a97e mongo --authenticationDatabase herois

// databases
show dbs

// mudando o contexto para uma database
use herois

// mostrar tables (coleções)
show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty() //vem formatado

for (let i = 0; i <= 10000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

// comandos utilizados durante o video
db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 }) //filtrar pra trazer somente o poder e o id não

// create
db.herois.insert({
    nome: `Flash`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read 
db.herois.find()

//update
db.herois.update({ _id: ObjectId("coloca o object id aqui") },
    { nome: 'Mulher maravilha' }) //errado, vai perder os outros dados (poder)

db.herois.update({ _id: ObjectId("coloca o object id aqui") },
    { $set: { name: 'Lanterna Verde' } }) //errado, a propriedade correta é 'nome', com este comando ele cria um novo campo 'name' no objeto ja criado

db.herois.update({ _id: ObjectId("5f2867d13c8945181ff2a1e7") },
    { $set: { nome: 'Lanterna Verde' } }) //correto, o '$set' especifica que é somente o nome a ser alterado

db.herois.update({ poder: 'Velocidade' },
    { $set: { poder: 'super força' } }) //correto, o '$set' especifica que é somente o poder a ser alterado

//delete
db.herois.remove({}) //remove todo mundo
db.herois.remove({nome: 'Mulher maravilha'}) //remove apenas este objeto