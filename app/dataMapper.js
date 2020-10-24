const client = require('./database');

const dataMapper = {
    getAllPokemons: callback => {
        client.query('SELECT * FROM "pokemon"', callback);
    },
    // c'est la même chose que ci-dessous
    /* client.query('SELECT * FROM "pokemon"', (error, results) => {
        callback(error, results)
    }) */
    getOnePokemon: (pokemonId, callback) => {
        client.query('SELECT pokemon.id, nom, pv, attaque, defense, attaque_spe, defense_spe, vitesse, numero, type_id, type.name, type.color FROM pokemon JOIN pokemon_type ON numero = pokemon_numero JOIN type ON type_id = type.id WHERE pokemon.id =$1', [pokemonId], callback);
    },

    getAllTypes: (callback) => {
        client.query('SELECT * FROM "type"', callback);
    },

    getPokemonsByType: (type, callback) => {
        client.query('SELECT pokemon.id, nom, numero, type_id, type.name, type.color FROM pokemon JOIN pokemon_type ON numero = pokemon_numero JOIN type ON type_id = type.id WHERE type.id =$1', [type], callback);
    }
};

module.exports = dataMapper;