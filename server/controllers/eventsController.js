const { v4: uuid } = require('uuid');
const knex = require('knex')(require('../knexfile'));
const fs = require('fs');

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
            'events.start_lat',
            'events.start_lon',  
            'events.end_location',
            'events.end_lat',
            'events.end_lon',  
            'events.event_duration', 
            'events.event_distance',
            'events.intensity_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.start_lat', 'events.start_lon', 'events.end_location', 'events.event_duration', 'events.end_lat', 'events.end_lon', 'events.event_distance', 'events.intensity_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
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
            'events.start_lat',
            'events.start_lon',  
            'events.end_location',
            'events.end_lat',
            'events.end_lon',  
            'events.event_duration', 
            'events.event_distance',
            'events.intensity_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.start_lat', 'events.start_lon', 'events.end_location', 'events.event_duration', 'events.end_lat', 'events.end_lon', 'events.event_distance', 'events.intensity_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
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
            'events.start_lat',
            'events.start_lon',  
            'events.end_location',
            'events.end_lat',
            'events.end_lon',  
            'events.event_duration', 
            'events.event_distance',
            'events.intensity_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.start_lat', 'events.start_lon', 'events.end_location', 'events.event_duration', 'events.end_lat', 'events.end_lon', 'events.event_distance', 'events.intensity_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
        .where({ 'events.created_by': req.params.userId })
        .then(data => {
            if (data.length === 0) {
                return res.status(204).send(`User: ${req.params.userId} has not created any events`);
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
            'events.start_lat',
            'events.start_lon',  
            'events.end_location',
            'events.end_lat',
            'events.end_lon',  
            'events.event_duration', 
            'events.event_distance',
            'events.intensity_level', 
            'events.gpx_url', 
            'events.repeats',
            'events.title',
            'events.description', 
            knex.raw('GROUP_CONCAT(DISTINCT CONCAT(event_users.user_id, ":", user.first_name, " ", user.last_name)) AS users_joined')
        )
        .leftJoin('users', 'events.created_by', 'users.id')
        .leftJoin('event_users', 'events.id', 'event_users.event_id')
        .leftJoin('users AS user', 'event_users.user_id', 'user.id')
        .groupBy('events.id', 'events.created_by', 'users.first_name', 'users.last_name', 'events.created_time', 'events.event_time', 'events.activity_type', 'events.start_location', 'events.start_lat', 'events.start_lon', 'events.end_location', 'events.event_duration', 'events.end_lat', 'events.end_lon', 'events.event_distance', 'events.intensity_level', 'events.gpx_url', 'events.repeats', 'events.title', 'events.description')
        .havingRaw('users_joined LIKE ?', `%${req.params.userId}%`)
        .then(data => {
            if (data.length === 0) {
                return res.status(204).send(`User: ${req.params.userId} has not joined any events`);
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving events ${err}`));
};

const eventUsers = (req, res) => {
    knex('event_users')
        .join('users', 'event_users.user_id', 'users.id')
        .select('users.id', 'users.first_name', 'users.last_name', 'users.avatar_url')
        .where({ 'event_users.event_id': req.params.id })
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving users going to event: ${req.params.id} ${err}`));
};

const eventComments = (req, res) => {
    knex('comments')
        .select('comments.id', 'comments.user_id', 'users.first_name', 'users.last_name', 'users.avatar_url', 'comments.created_time', 'comments.comment')
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

    if (
        isEmpty(req.body.event_time) ||
        isEmpty(req.body.start_location) ||
        isEmpty(req.body.start_lat) ||
        isEmpty(req.body.start_lon) ||
        isEmpty(req.body.end_location) ||
        isEmpty(req.body.end_lat) ||
        isEmpty(req.body.end_lon) ||
        isEmpty(req.body.event_duration) ||
        isEmpty(req.body.event_distance) ||
        isEmpty(req.body.intensity_level) ||
        isEmpty(req.body.title) ||
        isEmpty(req.body.description)
    ) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const created_by = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    let newEvent = {
        id: uuid(),
        created_time: Date.now(),
        created_by,
        // Repeats has been removed from UI form, this is a placeholder for later phase. Hard-Code "no" for now
        repeats: "No",
        ...req.body
    };

    // If request contains gpx file
    if (req.file) {
        const timestamp = Date.now().toString();
        const filePath = `./public/gpx/${timestamp}.gpx`;
        const gpxContent = fs.readFileSync(req.file.path);

        // Save gpx file to folder
        fs.writeFile(filePath, gpxContent, err => {
            if (err) {
                return res.status(400).send(`Error saving gpx file: ${err}`);
            }

            // update newEvent with gpx_url
            newEvent = {
                ...newEvent,
                gpx_url: `${timestamp}`,
            };

            knex('events')
                .insert(newEvent)
                .then(data => {
                    res.status(201).send(newEvent);
                })
                .catch(err => res.status(400).send(`Error creating event ${req.params.id} ${err}`));
        });
    } else {
        // request doesn't have gpx file
        const eventWithDefaultGpxUrl = { 
            ...newEvent,
            gpx_url: ""
        };
        knex('events')
            .insert(eventWithDefaultGpxUrl)
            .then(data => {
                res.status(201).send(eventWithDefaultGpxUrl);
            })
            .catch(err => res.status(400).send(`Error creating event ${req.params.id} ${err}`));
    }
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
    if (isEmpty(req.body.comment)) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const user_id = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    const newComment = {
        id: uuid(),
        created_time: Date.now(),
        event_id: req.params.id,
        user_id,
        ...req.body
    };

    knex('comments')
        .insert(newComment)
        .then(data => {
            // get user data to get avatar_url, first_name, and last_name for comments display
            knex('users')
                .select('avatar_url', 'first_name', 'last_name')
                .where('id', user_id)
                .first()
                .then(user => {
                    const commentData = {
                        ...newComment,
                        avatar_url: user.avatar_url,
                        first_name: user.first_name,
                        last_name: user.last_name
                    };
                    res.status(201).send(commentData);
                })
                .catch(err => {
                    console.error(`Error fetching user data for comment ${newComment.id}: ${err}`);
                    res.status(201).send(newComment);
                });
        })
        .catch(err => res.status(400).send(`Error creating comment ${req.params.id} ${err}`));
};

// PUT Requests
const updateEvent = (req, res) => {

    // Check if any required fields are missing
    if (
        isEmpty(req.body.event_time) ||
        isEmpty(req.body.start_location) ||
        isEmpty(req.body.start_lat) ||
        isEmpty(req.body.start_lon) ||
        isEmpty(req.body.end_location) ||
        isEmpty(req.body.end_lat) ||
        isEmpty(req.body.end_lon) ||
        isEmpty(req.body.event_duration) ||
        isEmpty(req.body.event_distance) ||
        isEmpty(req.body.intensity_level) ||
        isEmpty(req.body.title) ||
        isEmpty(req.body.description)
    ) {
        return res.status(400).send('One or more fields are invalid');
    }

    // Hard-coding my user_id until auth added in phase 2
    const created_by = '4780c8ef-6659-4f56-a6ea-cd0486a39f59';

    // Define the update object
    const updateObj = {
        event_time: req.body.event_time,
        created_by,
        start_location: req.body.start_location,
        start_lat: req.body.start_lat,
        start_lon: req.body.start_lon,
        end_location: req.body.end_location,
        end_lat: req.body.end_lat,
        end_lon: req.body.end_lon,
        event_duration: req.body.event_duration,
        event_distance: req.body.event_distance,
        intensity_level: req.body.intensity_level,
        title: req.body.title,
        description: req.body.description,
        gpx_url: req.body.gpx_url
    };

    // Update event in database
        knex('events')
            .update(updateObj)
            .where({ id: req.params.id })
            .then(data => {
                res.status(201).send(updateObj);
        })
            .catch(err => res.status(400).send(`Error editing event ${req.params.id} ${err}`));
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