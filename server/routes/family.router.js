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
    res.send(result.rows[0]);
  })
  .catch(err => {
    console.log('ERROR with getting Family data: ', err);
    res.sendStatus(500);
  });
});

// GET request to retrieve family members from db - user table
router.get('/members/:id', (req, res) => {
  console.log('in family members GET request with: ', req.params.id);
  // GET route code here
  const queryText = 'SELECT * FROM "user" WHERE "family_id" = $1 ORDER BY "username" ASC;';
  pool.query(queryText, [req.params.id])
  .then(result => {
    console.log('family members get results: ', result.rows)
    res.send(result.rows);
  })
  .catch(err => {
    console.log('ERROR with getting Family members data: ', err);
    res.sendStatus(500);
  });
});

//POST Route for new family
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

  //POST route for user invites
  router.post('/:id', (req, res) => {
    const queryText = `INSERT INTO "invitations" (token, family_id)
    VALUES ($1, $2)`;
    pool.query(queryText, [req.params.id, req.user.family_id])
    .then((query) => {
      res.sendStatus(201)
    })
    .catch((err) => {
      console.log('user invitation post failed', err);
      res.sendStatus(500);
    });
  });

//PUT request to change admin status of family member
router.put('/', (req, res) => {
  const id = req.body.id;
  const admin = req.body.admin;

  const queryText = 'UPDATE "user" SET "admin"=$1 WHERE "id"=$2;';

  pool.query(queryText, [admin, id])
    .then(result => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('error with updating admin status: ', err);
      res.sendStatus(500);
    });
});

  

module.exports = router;