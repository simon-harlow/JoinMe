const express = require("express");
const router = express.Router();
const fs = require('fs');
const GPXParser = require('gpxparser');
const eventsController = require('../controllers/eventsController')


router
    .route('/')
    .get(eventsController.allEvents)
    .post(eventsController.addEvent);

router
    .route('/:id')
    .get(eventsController.singleEvent)
    .put(eventsController.updateEvent)
    .delete(eventsController.deleteEvent);

router
    .route('/users/:userId')
    .get(eventsController.allEventsByUser)

router
    .route('/users/:userId/joined')
    .get(eventsController.allEventsUserJoined)

router
    .route('/:id/users')
    .get(eventsController.eventUsers)
    .post(eventsController.addUserToEvent);

    router
    .route('/:id/users/:userId')
    .delete(eventsController.deleteUserFromEvent);

router
    .route('/:id/comments')
    .get(eventsController.eventComments)
    .post(eventsController.addComment);

router
    .route('/:id/comments/:commentId')
    .delete(eventsController.deleteComment);

// handle requests to get and parse GPX data files
router
    .get('/:id/gpx/:filename', (req, res) => {
        const { filename } = req.params;
        const gpxData = fs.readFileSync(`public/gpx/${filename}.gpx`, 'utf8');
        const gpx = new GPXParser();
        gpx.parse(gpxData);

        const points = gpx.tracks[0].points;
        res.send(points);
    });

module.exports = router;