const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController')

router
    .route('/')
    .get(usersController.allUsers);

router
    .route('/:id')
    .get(usersController.singleUser);


module.exports = router;