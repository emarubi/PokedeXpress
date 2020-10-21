const client = require('./database');

const dataMapper = {
    getAllPokemons: callback => {
        client.query('SELECT * FROM "pokemon"', callback)
    }
    // c'est la même chose que ci-dessous
    /* client.query('SELECT * FROM "pokemon"', (error, results) => {
        callback(error, results)
    }) */
};

module.exports = dataMapper;