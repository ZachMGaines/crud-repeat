DROP TABLE IF EXISTS beers, cars, players;

CREATE TABLE beers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  abv TEXT NOT NULL,
  color TEXT
);

CREATE TABLE cars (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  price INT NOT NULL,
  color TEXT
);

CREATE TABLE players (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  team TEXT NOT NULL,
  age INT NOT NULL
);