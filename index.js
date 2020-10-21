//on utilise dotenv et sa méthode config pour importer le contenu du fichier .env dans process.env
require('dotenv').config();

const express = require('express');

const router = require('./app/router');

const PORT = process.env.PORT || 4000;

const app = express();
// moteur de templates
app.set('view engine', 'ejs');
app.set('views', './app/views');
// repoertoire des ressources statiques
app.use(express.static('./public'));

app.use(router);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
