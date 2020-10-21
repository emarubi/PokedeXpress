//on va récupérer ce qui nous intéresse du package pg
//on utilise la destructuration proposée par ES6 pour extraire l'object Client du package
const {Client} = require('pg');

//on utilise l'url définie dans le .env pour configurer notre client postgres
const client = new Client(process.env.PG_URL);

//on connecte le client à notre serveur de BDD
client.connect();

//on exporte le client déjà connecté, prêt à l'emploi
module.exports = client