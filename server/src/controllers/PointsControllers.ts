import knex from '../database/connection';
import { Request, Response } from 'express'

class PointsController {
    async create(request: Request, response: Response) {
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

        const point = {
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        };

        const trx = await knex.transaction(); // realizando RowBackTransaction

        const insertedIds = await trx('points').insert(point);

        const point_id = insertedIds[0];

        const pointItem = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });

        await trx('points_items').insert(pointItem);

        return response.json({ id: point_id, ...point });
    };

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point)
            return response.status(400).json({message: 'Point not found'});
        
        const items = await knex('items')
            .join('points_items', 'items.id', '=', 'points_items.item_id')
            .where('points_items.point_id', id)
            .select('items.title');
        
        return response.json({point, items});
    }
};

export default PointsController;