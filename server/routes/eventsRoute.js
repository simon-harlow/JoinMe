const express = require("express");
const router = express.Router();
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


module.exports = router;