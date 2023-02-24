const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
      
    const queryText = `INSERT INTO "family" (name)
      VALUES ($1) RETURNING id`;
    pool.query(queryText, [req.body.name])
        .then((query) => {
            pool.query('UPDATE "user" SET "family_id" = $1 WHERE "id" = $2', [query.rows[0].id, req.body.user_id])
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