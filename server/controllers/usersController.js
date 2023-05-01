const { v4: uuid } = require('uuid');
const knex = require('knex')(require('../knexfile'));

const singleUser = (req, res) => {
    knex('users')
        .where({ id: req.params.id })
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`User with id: ${req.params.id} not found`);
            }
            res.status(200).json(data[0]);
        })
        .catch(err => res.status(400).send(`Error retrieving user: ${req.params.id} ${err}`));
};

const allUsers = (req, res) => {
    knex('users')
        .then(data => {
            if (data.length === 0) {
                return res.status(404).send(`No records found`);
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(400).send(`Error retrieving users ${err}`));
};

module.exports = {
    singleUser,
    allUsers,
};