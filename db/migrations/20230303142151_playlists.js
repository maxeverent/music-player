/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('playlists', function (table) {
      table.increments('id');
      table.string('name', 255);
      table.integer('playlist_id').unsigned();
      table.foreign('playlist_id').references('id').inTable('playlist')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('playlists');
};
