const userdb = require('../users/users-model');


function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );
  next();
}

function validateUserId(req, res, next) {
  userdb.getById(req.params.id)
  .then((response) => {
    if(response){
      req.user = response;
      next();
    }
    else
      res.status(404).send({ message: "user not found" });
  })
}

function validateUser(req, res, next) {
  if(Object.keys(req.body).length === 0)
    res.status(400).send({ message: "missing user data" });
  else if(!req.body.name)
    res.status(400).send({ message: "missing required name field" });
  else
    next();
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger: logger,
  validateUserId: validateUserId,
  validateUser: validateUser
};