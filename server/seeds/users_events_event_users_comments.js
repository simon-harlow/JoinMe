const usersData = require('../seed_data/01_users');
const eventsData = require('../seed_data/02_events');
const eventUsersData = require('../seed_data/03_eventUsers');
const commentsData = require('../seed_data/04_comments');

exports.seed = function (knex) {
    return knex('users')
        .del()
        .then(function () {
            return knex('users').insert(usersData);
        })
        .then(() => {
            return knex('events')
        .del();
        })
        .then(() => {
            return knex('events').insert(eventsData);
        })
        .then(() => {
            return knex('event_users')
        .del();
        })
        .then(() => {
            return knex('event_users').insert(eventUsersData);
        })
        .then(() => {
            return knex('comments')
        .del();
        })
        .then(() => {
            return knex('comments').insert(commentsData);
        });
};