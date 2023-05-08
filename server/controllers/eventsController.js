const { v4: uuid } = require('uuid');
const knex = require('knex')(require('../knexfile'));

// Empty field validation
const isEmpty = (value) => {
    return value === undefined || (typeof value === 'string' && value.trim().length === 0);
};

// GET Requests
const singleEvent = (req, res) => {
    knex('events')
        .join('users', 'events.created_by', 'users.id')
        .select(
            'events.id', 
            'events.created_by', 
            'users.first_name', 
            'users.last_name', 
            'events.created_time', 
            'events.event_time', 
            'events.activity_type', 
            'events.start_location', 
            'events.end_location', 
            'events.event_duration', 
            'events.event_distance',
            'events.skill_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.end_location', 'events.event_duration', 'events.event_distance', 'events.skill_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
        .where({ 'events.id': req.params.id })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`Event with id: ${req.params.id} not found`);
            }
            res.status(200).json(data[0]);
        })
        .catch(err => res.status(400).send(`Error retrieving event: ${req.params.id} ${err}`));
};


const allEvents = (req, res) => {
    knex('events')
        .select(
            'events.id', 
            'events.created_by', 
            'users.first_name', 
            'users.last_name', 
            'events.created_time', 
            'events.event_time', 
            'events.activity_type', 
            'events.start_location', 
            'events.end_location', 
            'events.event_duration', 
            'events.event_distance',
            'events.skill_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.end_location', 'events.event_duration', 'events.event_distance', 'events.skill_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`No records found`);
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving events ${err}`));
};

const allEventsByUser = (req, res) => {
    knex('events')
        .select(
            'events.id', 
            'events.created_by', 
            'users.first_name', 
            'users.last_name', 
            'events.created_time', 
            'events.event_time', 
            'events.activity_type', 
            'events.start_location', 
            'events.end_location', 
            'events.event_duration',
            'events.event_distance',
            'events.skill_level', 
            'events.gpx_url', 
            'events.repeats', 
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.end_location', 'events.event_duration', 'events.skill_level', 'events.gpx_url', 'events.repeats', 'events.description')
        .where({ 'events.created_by': req.params.userId })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`No records found`);
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving events ${err}`));
};

const allEventsUserJoined = (req, res) => {
    knex('events')
        .select(
            'events.id', 
            'events.created_by', 
            'users.first_name', 
            'users.last_name', 
            'events.created_time', 
            'events.event_time', 
            'events.activity_type', 
            'events.start_location', 
            'events.end_location', 
            'events.event_duration',
            'events.event_distance',
            'events.skill_level', 
            'events.gpx_url', 
            'events.repeats', 
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.end_location', 'events.event_duration', 'events.skill_level', 'events.gpx_url', 'events.repeats', 'events.description')
        .havingRaw('users_joined LIKE ?', `%${req.params.userId}%`)
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`No records found`);
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving events ${err}`));
};

const eventUsers = (req, res) => {
    knex('event_users')
        .join('users', 'event_users.user_id', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name')
        .where({ 'event_users.event_id': req.params.id })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving users going to event: ${req.params.id} ${err}`));
};

const eventComments = (req, res) => {
    knex('comments')
        .select('comments.id', 'comments.user_id', 'users.first_name', 'users.last_name', 'comments.created_time', 'comments.comment')
        .join('users', 'comments.user_id', 'users.id')
        .where('comments.event_id', req.params.id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(400).send(`Error retrieving comments: ${err}`);
        });
};

// POST Requests
const addEvent = (req, res) => {
    console.log(req.body);
    if (
        isEmpty(req.body.event_time) ||
        isEmpty(req.body.start_location) ||
        isEmpty(req.body.end_location) ||
        isEmpty(req.body.event_duration) ||
        isEmpty(req.body.event_distance) ||
        isEmpty(req.body.skill_level) ||
        isEmpty(req.body.title) ||
        isEmpty(req.body.description)
    ) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const created_by = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    const newEvent = {
        id: uuid(),
        created_time: Date.now(),
        created_by,
        gpx_url: req.gpx_file ? `http://localhost:8080/images/${req.gpx_url}` : "",
        // Repeats has been removed from UI form as this is a placeholder for later phase. Hard-Code "no" for now
        repeats: "No",
        ...req.body
    };

    knex('events')
        .insert(newEvent)
        .then(data => {
            res.status(201).send(newEvent);
        })
        .catch(err => res.status(400).send(`Error creating event ${req.params.id} ${err}`));
};

const addUserToEvent = (req, res) => {
    // Hard-coding my user_id until auth added in phase 2
    const user_id = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    const newEventUser = { 
        event_id: req.params.id,
        user_id
    };

    knex('event_users')
        .select()
        .where({ event_id: req.params.id, user_id })
        .then(rows => {
            if (rows.length > 0) {
                return res.status(400).send('User is already assigned to this event');
            } else {
                knex('event_users')
                    .insert(newEventUser)
                    .returning('id')
                    .then(data => {
                        newEventUser.id = data[0];
                        res.status(201).send(newEventUser);
                    })
                    .catch(err => res.status(400).send(`Error adding user to event ${req.params.id} ${err}`));
            }
        })
        .catch(err => res.status(400).send(`Error checking if user is already assigned to event ${req.params.id} ${err}`));
};

const addComment = (req, res) => {
    console.log(req.body);
    if (
        isEmpty(req.body.comment)
    ) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const user_id = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    const newComment = { 
        id: uuid(),
        created_time: Date.now(),
        event_id: req.params.id,
        user_id,
        ...req.body };

    knex('comments')
        .insert(newComment)
        .then(data => {
            res.status(201).send(newComment);
        })
        .catch(err => res.status(400).send(`Error creating comment ${req.params.id} ${err}`));
};

// PUT Requests
const updateEvent = (req, res) => {
    console.log(req.body);
    if (
        isEmpty(req.body.event_time) ||
        isEmpty(req.body.start_location) ||
        isEmpty(req.body.end_location) ||
        isEmpty(req.body.event_duration) ||
        isEmpty(req.body.event_distance) ||
        isEmpty(req.body.skill_level) ||
        isEmpty(req.body.title) ||
        isEmpty(req.body.description)
    ) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const created_by = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    return knex('events')
        .update(req.body)
        .where({ id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(400).send(`Event item with id ${req.params.id} not found`);
            } else {
                const updatedEvent = {
                    id: req.params.id,
                    gpx_url: req.gpx_file ? `http://localhost:8080/images/${req.gpx_url}` : "",
                    // Repeats has been removed from UI form as this is a placeholder for later phase. Hard-Code "no" for now
                    repeats: "No",
                    ...req.body
                };
                res.status(200).send(updatedEvent)
            }
        })
        .catch(err => res.status(400).send(`Error updating Event ${req.params.id} ${err}`));
};

// DELETE Requests
const deleteEvent = (req, res) => {
    knex('events')
        .delete()
        .where({ id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(400).send(`Event with id: ${req.params.id} not found`);
            } else {
                res.status(200).send(`Event with id: ${req.params.id} has been deleted`);
            }
        })
        .catch(err => res.status(400).send(`Error deleting Event ${req.params.id} ${err}`));
};

const deleteUserFromEvent = (req, res) => {
    knex('event_users')
        .delete()
        .where({ user_id: req.params.userId })
        .andWhere({ event_id: req.params.id })
        .then(data => {
            if (data === 0) {
                res.status(400).send(`User with id: ${req.params.userId} not found for event: ${req.params.id}`);
            } else {
                res.status(200).send(`User with id: ${req.params.userId} has been removed from the event: ${req.params.id} `);
            }
        })
        .catch(err => res.status(400).send(`Error removing user from event: ${req.params.id} ${err}`));
};

const deleteComment = (req, res) => {
    knex('comments')
        .delete()
        .where({ id: req.params.commentId })
        .then(data => {
            if (data === 0) {
                res.status(400).send(`Comment with id: ${req.params.commentId} does not exist`);
            } else {
                res.status(200).send(`Comment with id: ${req.params.commentId} has been deleted`);
            }
        })
        .catch(err => res.status(400).send(`Error deleting Comment ${req.params.commentId} ${err}`));
};


module.exports = {
    singleEvent,
    allEvents,
    allEventsByUser,
    allEventsUserJoined,
    eventUsers,
    eventComments,
    addEvent,
    addUserToEvent,
    addComment,
    updateEvent,
    deleteEvent,
    deleteUserFromEvent,
    deleteComment,
};