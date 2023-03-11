const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, email, password)
    VALUES ($1, $2, $3) RETURNING id`;
  pool
    .query(queryText, [username, email, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.post('/register/:id', (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const family_id = req.body.family_id;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, email, password, family_id)
    VALUES ($1, $2, $3, $4) RETURNING id`;
  pool
    .query(queryText, [username, email, password, family_id])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//Fetch Invitations data
router.get('/invites/:id', (req, res) => {
  console.log('in get request for invitations', req.params.id);
  const queryText = 
    `SELECT * FROM "invitations" WHERE "token" = $1 AND "exp_date" > now();`;
  pool.query(queryText, [req.params.id])
    .then( result => {
      console.log('result rows in invitations get: ', result.rows);
      if (result.rows.length > 0) {
        res.send(result.rows[0])
      }
    })
    .catch(err => {
      console.log('ERROR with getting favorites data: ', err);
      res.sendStatus(500);
    });
});


module.exports = router;
