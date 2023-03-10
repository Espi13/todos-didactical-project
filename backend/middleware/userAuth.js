const User = require("../models").user;
const jwt = require("jsonwebtoken");

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const checkUserExist = async (req, res, next) => {
  //search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if username exist in the database respond with a status of 409
    if (username) {
      return res.status(409).json({ error: "username already taken" });
    }

    //checking if email already exist
    const emailcheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    //if email exist in the database respond with a status of 409
    if (emailcheck) {
      return res.status(409).json({ error: "email already taken" });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//exporting module
module.exports = {
  checkUserExist,
  checkToken,
};
