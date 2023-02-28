const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// GET request to retrieve family's recipe data from db - family table
router.get('/:id', (req, res) => {
  console.log('in recipes GET request with: ', req.params.id);
  // GET route code here
  const queryText = 'SELECT * FROM "recipes" WHERE "family_id" = $1 ORDER BY "title" ASC;';
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
  const queryText = `INSERT INTO "recipes" (title, ingredients, instructions, family_id, user_id)
  VALUES ($1, $2, $3, $4, $5)`;
  pool.query(queryText, [req.body.title, ingredients, instructions, req.body.family_id, req.body.user_id])
  .then(() => res.sendStatus(201))
  .catch((err) => {
      console.log('error with adding recipe: ', err);
      res.sendStatus(500);
  });
});

// POST route for favorite recipes
router.post('/favorite', (req, res) => {
  console.log('in recipe favorites post with: ', req.body.title);
  const queryText = `INSERT INTO "favorites" (user_id, recipe_id)
  VALUES ($1, $2)`;
  pool.query(queryText, [req.body.user_id, req.body.recipe_id])
  .then(() => res.sendStatus(201))
  .catch((err) => {
      console.log('error with adding recipe to favorites: ', err);
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
      const ingredients = JSON.parse(result.rows[0].ingredients);
      const instructions = JSON.parse(result.rows[0].instructions);
      
      const results = {
        title: result.rows[0].title,
        ingredients,
        instructions,
      }

      res.send(results);
      console.log('result rows from edit recipe get request: ', result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR with getting requested recipe data: ', err);
      res.sendStatus(500);
    });
});

//GET route for random recipe
router.get('/random/:id', (req, res) => {
  const id = req.params.id;
  console.log('in get random recipe data request: ', id);
  const queryText = 'SELECT * FROM "recipes" WHERE "family_id" = $1 ORDER BY RANDOM() LIMIT 1;';
  pool.query(queryText, [id])
    .then( result => {
      const ingredients = JSON.parse(result.rows[0].ingredients);
      const instructions = JSON.parse(result.rows[0].instructions);
      
      const results = {
        title: result.rows[0].title,
        ingredients,
        instructions,
      }

      res.send(results);
      console.log('result rows from random get request: ', results);
    })
    .catch(err => {
      console.log('ERROR with getting requested recipe data: ', err);
      res.sendStatus(500);
    });
});

//GET route for user's favorite recipe
router.get('/favorite/:id', (req, res) => {
  const id = req.params.id;
  console.log('in get favorite recipes request: ', id);
  const queryText = 
    `SELECT "recipes"."title", "recipes"."ingredients", "recipes"."instructions", "recipes"."id", "recipes"."user_id" FROM "user"
    JOIN "favorites" ON "favorites"."user_id" = "user"."id"
    JOIN "recipes" ON "recipes"."id" = "favorites"."recipe_id"
    WHERE "user"."id" = $1
    ORDER BY "recipes"."title" ASC;`;

  pool.query(queryText, [id])
    .then( result => {
      res.send(result.rows);
      console.log('result rows from favorites request: ', result.rows);
    })
    .catch(err => {
      console.log('ERROR with getting favorites data: ', err);
      res.sendStatus(500);
    });
});

//DELETE route for user's favorite recipes
router.delete('/favorite/:id', (req, res) => {
  console.log(`in delete favorites request with req params id: ${req.params.id} and data ${req.body.user_id}`);
  const id = req.params.id;
  const user_id = req.body.user_id;
  const queryText = `DELETE from "favorites" WHERE "recipe_id" = $1 AND "user_id" = $2;`;
  
  pool.query(queryText, [id, user_id])
    .then((result) => {
      console.log('this is your delete favorites result: ', result);
      res.sendStatus(204);
    })
    .catch((err) => {
      console.log('error with deleting favorites: ', err);
      res.sendStatus(500);
    });
});

//PUT route for editing recipe
router.put('/edit/:id', (req, res) => {
  ingredients = JSON.stringify(req.body.ingredients);
  instructions = JSON.stringify(req.body.instructions);
  const id = req.params.id;
  console.log(`in recipe put request with:  ${req.body.title}, ${ingredients}, ${instructions}, ${id}`)
  const queryText = 'UPDATE "recipes" SET "title"=$1, "ingredients"=$2, "instructions"=$3 WHERE "id"=$4;';

  pool.query(queryText, [req.body.title, ingredients, instructions, req.body.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('error with updating recipe: ', err);
      res.sendStatus(500);
    });
});


module.exports = router;