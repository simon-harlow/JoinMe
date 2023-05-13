/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function (knex) {
    return Promise.all([
        // Create users table
        knex.schema.createTable('users', function (table) {
            table.uuid('id').primary();
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('avatar_url').notNullable();
            table.string('city').notNullable();
            table.string('state').notNullable();
            table.string('country').notNullable();
            table.integer('strava_id').notNullable();
            table.string('strava_url').notNullable();
            table.string('fav_activity_1').notNullable();
            table.string('fav_activity_2').notNullable();
            table.string('fav_activity_3').notNullable();
            table.string('bio').notNullable();
        }),

        // Create events table
        knex.schema.createTable('events', function (table) {
            table.uuid('id').primary();
            table.uuid('created_by').references('users.id');
            table.bigint('created_time').notNullable();
            table.bigint('event_time').notNullable();
            table.string('activity_type').notNullable();
            table.string('start_location').notNullable();
            table.float('start_lat', 8, 6).notNullable();
            table.float('start_lon', 9, 6).notNullable();
            table.string('end_location').notNullable();
            table.float('end_lat', 8, 6).notNullable();
            table.float('end_lon', 9, 6).notNullable();
            table.string('event_duration').notNullable();
            table.integer('event_distance').notNullable();
            table.string('intensity_level').notNullable();
            table.string('gpx_url').notNullable();
            table.string('repeats').notNullable();
            table.string('title').notNullable();
            table.string('description').notNullable();
        }),

        // Create event users table
        knex.schema.createTable('event_users', function(table) {
            table.increments('id').primary();
            table.uuid('user_id').references('users.id').onDelete('CASCADE');
            table.uuid('event_id').references('events.id').onDelete('CASCADE');
        }),

        // Create comments table
        knex.schema.createTable('comments', function (table) {
            table.uuid('id').primary();
            table.uuid('user_id').references('users.id');
            table.uuid('event_id').references('events.id').onUpdate('CASCADE').onDelete('CASCADE');
            table.bigint('created_time').notNullable();
            table.string('comment').notNullable();
        })
    ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('comments'),
        knex.schema.dropTable('events'),
        knex.schema.dropTable('event_user'),
        knex.schema.dropTable('users')
    ]);
};