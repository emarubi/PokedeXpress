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
        })
    }
};

module.exports = mainController;