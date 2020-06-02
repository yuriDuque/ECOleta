import express from 'express'; //com typescript precisa importar a biblioteca junto com sua definição de tipos

const app = express();

app.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    //JSON

    response.json(['Diego', 'Robson', 'Cleiton']);
})

app.listen(3333);