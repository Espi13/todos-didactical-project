const jwt = require("jsonwebtoken");
const md5 = require("md5");
const User = require("../models").user;

const create = async (req, res) => {
  const { email, password, username } = req.body;

  const user = {
    email,
    password: md5(password),
    username,
  };
  User.create(user)
    .then((result) => {
      result.dataValues.jwt = jwt.sign(
        { id: result.id },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );
      return res.json(result);
    })
    .catch((error) => {
      console.error(error);
      return res.json({
        message: "Unable to create the user",
        error,
      });
    });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({
    attributes: { exclude: ["createdAt", "updatedAt"] },
    where: { email },
  })
    .then((result) => {
      if (md5(password) === result.password) {
        result.dataValues.jwt = jwt.sign(
          { id: result.id },
          process.env.SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );
        delete result.dataValues.password;
        return res.json(result);
      } else {
        return res.status(401).send("Authentication failed");
      }
    })
    .catch((error) => {
      console.error(error);
      return res.json({
        message: "User not found",
        error,
      });
    });
};

module.exports = {
  create,
  login,
};
