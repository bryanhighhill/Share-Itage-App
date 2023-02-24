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