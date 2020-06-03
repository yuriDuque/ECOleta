import express from 'express'
import knex from './database/connection';

const routes = express.Router();

// GET retornar todos os itens
routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*');

    const serializedItems = items.map(item => {
        return {
            id: item.id,
            title: item.title,
            image_url: `http://localhost:3333/uploads/${item.image}`
        }
    })

    return response.json(serializedItems);
});

// POST cadastrar pontos de coleta
routes.post('/points', async (request, response) => {
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        items
    } = request.body;

    const trx = await knex.transaction(); // realizando RowBackTransaction

    const insertedIds = await trx('points').insert({
        image: 'image-fake',
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf
    });

    const point_id = insertedIds[0];

    const pointItem = items.map((item_id: number) => {
        return {
            item_id,
            point_id
        };
    });

    await trx('points_items').insert(pointItem);

    return response.json({success: true});
});

export default routes;