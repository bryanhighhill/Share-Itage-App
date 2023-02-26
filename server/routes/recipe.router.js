const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// GET request to retrieve family data from db - family table
router.get('/:id', (req, res) => {
  console.log('in recipes GET request with: ', req.params.id);
  // GET route code here
  const queryText = 'SELECT * FROM "recipes" WHERE "family_id" = $1;';
  pool.query(queryText, [req.params.id])
  .then(result => {
    console.log('recipes get results: ', result.rows)
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR with getting Recipes data: ', err);
    res.sendStatus(500);
  });
});

// POST route for new recipes
router.post('/', (req, res) => {
  ingredients = JSON.stringify(req.body.ingredients);
  instructions = JSON.stringify(req.body.instructions);
  console.log('in recipe post with ingredients: ', req.body.ingredients);
  const queryText = `INSERT INTO "recipes" (title, ingredients, instructions, family_id)
  VALUES ($1, $2, $3, $4)`;
  pool.query(queryText, [req.body.title, ingredients, instructions, req.body.family_id])
  .then(() => res.sendStatus(201))
  .catch((err) => {
      console.log('error with adding recipe: ', err);
      res.sendStatus(500);
  });
});

//GET route for editing recipe
router.get('/edit/:id', (req, res) => {
  const id = req.params.id;
  console.log('id in get recipe data request: ', id);
  const queryText = 'SELECT * FROM "recipes" WHERE "id" = $1;';
  pool.query(queryText, [id])
    .then( result => {
      res.send(result.rows[0]);
      console.log('result rows from edit recipe get request: ', result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR with getting requested recipe data: ', err);
      res.sendStatus(500);
    });
});

module.exports = router;