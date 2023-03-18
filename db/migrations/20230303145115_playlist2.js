/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('playlist', function (table) {
      table.increments('id');
      table.integer('track_id').unsigned();
      table.foreign('track_id').references('id').inTable('music')
      table.integer('playlist_id').unsigned();
      table.foreign('playlist_id').references('id').inTable('playlists')
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
    .dropTable('playlist');
};
