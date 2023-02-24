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

/**
 * POST route for new recipes
 */
router.post('/', (req, res) => {
    const queryText = `INSERT INTO "recipes" (title, ingredients, instructions, family_id)
    VALUES ($1, $2, $3, $4)`;
    pool.query(queryText, [req.body.title, req.body.ingredients, req.body.instructions, req.body.family_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        console.log('error with adding recipe: ', err);
        res.sendStatus(500);
    });
});

module.exports = router;