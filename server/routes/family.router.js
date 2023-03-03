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
  console.log('in family GET request with: ', req.params.id);
  // GET route code here
  const queryText = 'SELECT * FROM "family" WHERE "id" = $1;';
  pool.query(queryText, [req.params.id])
  .then(result => {
    console.log('family get results: ', result.rows)
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR with getting Family data: ', err);
    res.sendStatus(500);
  });
});

/**
 * POST route 
 */
router.post('/', (req, res) => {
      
    const queryText = `INSERT INTO "family" (name)
      VALUES ($1) RETURNING id`;
    pool.query(queryText, [req.body.name])
    .then((query) => {
      //query to take family id returned from line 32 request and set user family_id ALSO make user an admin
      pool.query('UPDATE "user" SET "family_id" = $1, "admin" = true WHERE "id" = $2;', [query.rows[0].id, req.body.user_id])
      .then(() => {
        res.sendStatus(201)
      })
      .catch((err) => {
        console.log('error with setting user family id: ', err);
        res.sendStatus(500);
      });
    })
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
  });
  

module.exports = router;