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
    }
};

export default PointsController;