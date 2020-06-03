import Knex from 'knex';

export async function up(Knex: Knex){ // CRIAR A TABELA
    return Knex.schema.createTable('points_items', table => {
        table.increments('id').primary;

        table.integer('point_id')
        .references('id')
        .inTable('pints')
        .notNullable();

        table.integer('item_id')
        .references('id')
        .inTable('items')
        .notNullable();
    })
}

export async function down(Knex: Knex){ // DELETAR A TABELA
    return Knex.schema.dropTable('points_items')
}