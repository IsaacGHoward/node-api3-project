const express = require('express');

const router = express.Router();

const db = require('./posts-model');

const middleware = require('../middleware/middleware');
router.get('/', (req, res) => {
  // DO YOUR MAGIC
  db.get()
  .then((resp) => {
    res.send(resp);
  })
});

router.get('/:id', middleware.validatePostId, (req, res) => {
  // DO YOUR MAGIC
  res.send(req.post);
});

// do not forget to export the router
module.exports = router
