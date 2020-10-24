# Etapes de création d'un projet sur Node.js

## 1 - initialiser le projet

- ```npm init -y```
  
## 2 - installer les dépendances nécessaires au pojet

- ```npm install node```
- ```npm i express ejs```
- ```npm i pg dotenv```
  
## 3 - mettre en place les dossiers nécessaires

- créer le dossier app
- créer le dossier app/controllers
- créer le dossier app/views
- créer le dossier app/views/partials
- créer le dossier data
  
## 4 - créer les fichiers principaux

- index.js
- app/router.js
- app/ database.js
- app/dataMapper.js

## 5 - créer la Base de Données et importer les données

- dans le terminal: ```psql -U postgres```
- ```postgres=# CREATE ROLE pokedex WITH LOGIN PASSWORD 'pokedex';```
- ```postgres=# CREATE DATABASE pokedex OWNER pokedex;```
- ```postgres=# \i data/pokedex.sql;```
- (ou depuis le terminal: ```psql -U pokedex -f ./data/pokedex.sql```)
- pour tester faire une requête SQL depuis le prompt postgre:
  ```SELECT * FROM  pokedex;```
- \q pour revenir au terminal
- créer le fichier .env avec les variables de connexion à la bdd
  - PORT =
  - PGHOST =
  - PGUSER =
  - PGPASSWORD =
  - PGDATABASE =
  - PGPORT =
- sinon insérer juste 2 constantes dans le .env:
  - PORT =
  - PG_URL = ```postgresql://<dbuser>:<secretPassword>@<database.server>:<port de connexion>/<base de donnés>```
- dans notre exemple
  - PORT=5000
  - PG_URL=postgresql://pokedex:pokedex@localhost:5432/pokedex
- en même temps créer un fichier .env.example avec les même constantes, mais sans valeurs; ce fichier sera exporté sur gitHub, car il n'est pas inclus dans le fichier .gitignore

## 6 - créer le serveur (index.js)

 ```require('dotenv').config();

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
```

## 7 - créer le router.js

```
const express = require('express');

const router = express.Router();

const mainController = require('./controllers/mainController');

router.get('/', mainController.home);

module.exports = router;
```

## 8 - créer le mainController.js

```
const mainController = {

};

module.exports = mainController;
```

## 9 - créer database.js

```
//on va récupérer ce qui nous intéresse du package pg
//on utilise la destructuration proposée par ES6 pour extraire l'object Client du package
const {Client} = require('pg');
//on utilise l'url définie dans le .env pour configurer notre client postgres
const client = new Client(process.env.PG_URL);
//on connecte le client à notre serveur de BDD
client.connect();
//on exporte le client déjà connecté, prêt à l'emploi
module.exports = client
```

## 10 - créer le dataMapper.js

```
const client = require('./database');

const dataMapper = {
    getAllPokemons: callback => {
        client.query('SELECT * FROM "pokemon"', callback)
};

module.exports = dataMapper;
```

## 11 - dans le mainController

Ajouter la méthode home pour gérer la route '/'

```
const mainController = {
    home: (request, response) => {
        dataMapper.getAllPokemons((error, results) => {
            if (error) {
                return response.status(500).send(error);
            }
            response.render('home', {pokemons: results.rows})
        })
    }
};
```

## 12 - créer la view HOME.EJS

```
<%- include('partials/header') %>

<ul class="pokemon-list reset-list row">
    <% for (const pokemon of pokemons) {%>
        <li class="p-3 col-lg-4">
            <figure class="p-3">
                <img src="/img/<%= pokemon.numero%>.png" alt="<%= pokemon.nom %>">
                <figcaption>#<%= pokemon.numero %> <%= pokemon.nom %></figcaption>
            </figure>
        </li>
    <%}%>
</ul>

<%- include('partials/footer') %>
```

## 13 - ... et les partials HEADER.EJS et FOOTER.EJS

header.ejs

```
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<link rel="stylesheet" href="/css/style.css">
<title>Pokedex</title>
</head>
<body>

    <header class="bg-white m-3">
        <h1><a href="/">Pokedex</a></h1>
        <nav class="navbar">
            <ul>
                <li><a href="/types">Liste des types</a></li>
            </ul>
        </nav>
    </header>
<main>
```

footer.ejs

```
</main>
</body>
</html>
```
