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
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "family" WHERE "id" = $1;';
    pool.query(queryText, [req.params.id])
    .then(result => {
      res.send(result.rows[0]);
    })
    .catch(err => {
      res.sendStatus(500);
    });
    } else {
      res.sendStatus(403);
    }
});

// GET request to retrieve family members from db - user table
router.get('/members/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'SELECT * FROM "user" WHERE "family_id" = $1 ORDER BY "username" ASC;';
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

//POST Route for new family
router.post('/', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = `INSERT INTO "family" (name)
      VALUES ($1) RETURNING id`;
    pool.query(queryText, [req.body.name])
    .then((query) => {
      //query to take family id returned from line 32 request and set user family_id ALSO make user an admin
      pool.query('UPDATE "user" SET "family_id" = $1, "admin" = true WHERE "id" = $2;', [query.rows[0].id, req.body.user_id])
      .then(result => {
        res.sendStatus(201);
      })
      .catch((err) => {
        res.sendStatus(500);
      });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(403);
  }
});

  //POST route for user invites
  router.post('/:id', (req, res) => {
    if (req.isAuthenticated()) {
      const queryText = `INSERT INTO "invitations" (token, family_id)
      VALUES ($1, $2)`;
      pool.query(queryText, [req.params.id, req.user.family_id])
      .then((query) => {
        res.sendStatus(201)
      })
      .catch((err) => {
        res.sendStatus(500);
      });
    } else {
      res.sendStatus(403);
    }
  });

//PUT request to change admin status of family member
router.put('/', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.body.id;
    const admin = req.body.admin;
    const queryText = 'UPDATE "user" SET "admin"=$1 WHERE "id"=$2;';
    pool.query(queryText, [admin, id])
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

//PUT request to remove family member
router.put('/remove/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const queryText = 'UPDATE "user" SET "family_id"=null WHERE "id"=$1;';
    pool.query(queryText, [req.body.id])
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

  

module.exports = router;