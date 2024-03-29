const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

// ------------------------------  POST ROUTES ------------------------------ //

// POST route for new recipes
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    ingredients = JSON.stringify(req.body.ingredients);
    instructions = JSON.stringify(req.body.instructions);
    const queryText = `INSERT INTO "recipes" (title, ingredients, instructions, family_id, user_id)
    VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [req.body.title, ingredients, instructions, req.body.family_id, req.body.user_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
        res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});


// POST route for favorite recipes
router.post('/favorite', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "favorites" (user_id, recipe_id)
    VALUES ($1, $2);`;
    pool.query(queryText, [req.user.id, req.body.recipe_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//POST route for recipe_remarks comments
router.post('/remarks', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "user_remarks" (comment, user_id, recipe_id)
    VALUES ($1, $2, $3);`;
    pool.query(queryText, [req.body.comment, req.user.id, req.body.recipe_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});


// ------------------------------  GET ROUTES ------------------------------ //

// GET request to retrieve family's recipe data from db - family table
router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    // GET route code here
    const queryText = 'SELECT * FROM "recipes" WHERE "family_id" = $1 ORDER BY "title" ASC;';
    pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//GET route for editing recipe
router.get('/edit/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
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
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//GET route for random recipe
router.get('/random/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const queryText = 'SELECT * FROM "recipes" WHERE "family_id" = $1 ORDER BY RANDOM() LIMIT 1;';
    pool.query(queryText, [id])
    .then( result => {
      const ingredients = JSON.parse(result.rows[0].ingredients);
      const instructions = JSON.parse(result.rows[0].instructions);
      const results = {
        title: result.rows[0].title,
        ingredients,
        instructions,
        id: result.rows[0].id,
      }
      res.send(results);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//GET route for user's favorite recipe
router.get('/favorite/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.user.id;
    const queryText = 
      `SELECT "recipes"."title", "recipes"."ingredients", "recipes"."instructions", "recipes"."id", "recipes"."user_id" FROM "favorites"
      JOIN "recipes" ON "recipes"."id" = "favorites"."recipe_id"
      WHERE "favorites"."user_id" = $1
      ORDER BY "recipes"."title" ASC;`;
    pool.query(queryText, [id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//GET route for user comments at recipe id
router.get('/remarks/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const queryText = 
    `SELECT "user_remarks"."id", "user_remarks"."comment", "user_remarks"."user_id", "user_remarks"."recipe_id", "user"."username" FROM "recipes"
    JOIN "user_remarks" ON "user_remarks"."recipe_id" = "recipes"."id"
    JOIN "user" ON "user"."id" = "user_remarks"."user_id"
    WHERE "recipes"."id" = $1 AND "user_remarks"."comment" IS NOT NULL
    ORDER BY "user_remarks"."id" ASC;`;
    pool.query(queryText, [id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//GET route for shopping list
router.get('/shoppinglist/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT "shopping_list" FROM "user" WHERE "id" = $1;';
    const id = req.params.id;
    pool.query(queryText, [req.user.id])
    .then( result => {
      res.send(result.rows[0].shopping_list);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

// ------------------------------  PUT ROUTES ------------------------------ //

//PUT route for editing recipe
router.put('/edit/:id', (req, res) => {
  if (req.isAuthenticated()) {
    ingredients = JSON.stringify(req.body.ingredients);
    instructions = JSON.stringify(req.body.instructions);
    const id = req.params.id;
    const queryText = 'UPDATE "recipes" SET "title" = $1, "ingredients" = $2, "instructions" = $3 WHERE "id" = $4;';
    pool.query(queryText, [req.body.title, ingredients, instructions, req.body.id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//PUT route for shopping list
router.put('/shoppinglist', (req, res) => {
  if (req.isAuthenticated()) {
    shoppingList = JSON.stringify(req.body);
    const id = req.user.id;
    const queryText = 'UPDATE "user" SET "shopping_list" = $1 WHERE "id" = $2;';
    pool.query(queryText, [shoppingList, id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});


// ------------------------------  DELETE ROUTES ------------------------------ //

//DELETE route for user's favorite recipes
router.delete('/favorite/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const user_id = req.user.id;
    const queryText = `DELETE FROM "favorites" WHERE "recipe_id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [id, user_id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

//DELETE route for removing recipe from database
router.delete('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id; //recipe id
    pool.query(`DELETE FROM "favorites" WHERE "recipe_id" = $1`, [id])
    pool.query(`DELETE FROM "user_remarks" where "recipe_id" = $1`, [id])
    .then((result) => {
      pool.query(`DELETE FROM "recipes" WHERE "id" = $1`, [id])
      .then((result) => {
        res.sendStatus(204);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
    });
  } else {
    res.sendStatus(403);
  }
});

//DELETE route for user comment
router.delete('/comments/:id', (req, res) => {
  if (req.isAuthenticated()) {
    pool.query('DELETE FROM "user_remarks" WHERE "id" = $1;', [req.params.id])
    .then((result) => {
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

module.exports = router;