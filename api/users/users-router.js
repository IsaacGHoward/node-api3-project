const express = require('express');

const router = express.Router();

const db = require('./users-model');
const postsDB = require('../posts/posts-model');
const middleware = require('../middleware/middleware');

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  db.get()
  .then((resp) => {
    res.send(resp);
  })
});

router.get('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.send(req.user);
});

router.post('/', middleware.validateUser, (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  db.insert(req.body)
  .then((resp) =>{
    res.send(resp);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});

router.put('/:id', middleware.validateUserId, middleware.validateUser, (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  db.update(req.params.id, req.body)
  .then((resp) =>{
    db.getById(req.params.id)
    .then((r) => {
      res.send(r);
    })
  })
  .catch((err) => {
    res.status(400).send(err);
  })
});

router.delete('/:id', middleware.validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  db.getById(req.params.id)
  .then((resp) => {
    db.remove(req.params.id)
    .then(() => {
      res.send(resp);
    })
  })
  
  
});

router.get('/:id/posts', middleware.validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  db.getUserPosts(req.params.id)
  .then((resp) => {
    res.send(resp);
  })

});

router.post('/:id/posts', middleware.validateUserId, middleware.validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  postsDB.insert({text: req.body.text, user_id: req.params.id})
  .then((resp) => {
    res.send(resp);
  })
});

// do not forget to export the router
module.exports = router;
