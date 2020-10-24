SELECT 
    pokemon.id, nom, pv, attaque, defense, attaque_spe, defense_spe, vitesse, numero,
    type_id, type.name
FROM pokemon 
JOIN pokemon_type
ON numero = pokemon_numero
JOIN type
ON type_id = type.id;

SELECT * FROM type;

SELECT * FROM pokemon_type;

SELECT * from pokemon;
