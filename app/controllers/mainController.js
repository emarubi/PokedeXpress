const dataMapper = require('../dataMapper');

const mainController = {
    home: (request, response) => {
        dataMapper.getAllPokemons((error, results) => {
            if (error) {
                //on utilise return pour stopper le traitement en cas d'erreur
                return response.status(500).send(error);
            }
            //si on n'a pas eu d'erreur, on continue tranquillement notre code
            response.render('home', {pokemons: results.rows})
        });
    },
    pokemonDetail: (request, response) => {
        const pokemonId = parseInt(request.params.id);
        dataMapper.getOnePokemon(pokemonId,(error, results) => {
            if (error) {
                //on utilise return pour stopper le traitement en cas d'erreur
                return response.status(500).send(error);
            }
            console.log(results.rows)
            const pokemon = {...results.rows[0]};
            pokemon.types = [];
            for (const rec of results.rows) {
                pokemon.types.push({id: rec.type_id, name: rec.name, color: rec.color});
            }
  
            response.render('details', {pokemon});

        });
    },

    types: (request, response) => {
        dataMapper.getAllTypes((error, results) => {
            if (error) {
                //on utilise return pour stopper le traitement en cas d'erreur
                return response.status(500).send(error);
            }
            response.render('types', {types:results.rows});
        });
    },

    pokemonTypes: (request, response) => {
        const type = parseInt(request.params.id);
        dataMapper.getPokemonsByType(type, (error, results) => {
            if (error) {
                //on utilise return pour stopper le traitement en cas d'erreur
                return response.status(500).send(error);
            }
            //si on n'a pas eu d'erreur, on continue tranquillement notre code
            response.render('home', {pokemons: results.rows})
        });

    }
};

module.exports = mainController;