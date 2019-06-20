const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { authenticate } = require('../auth/authenticate');
const Users = require('../users/users-model.js')

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/api/users', getUsers);
};

function generateToken(user) {
  return jwt.sign({
    userId: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h',
  })
}

function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

    Users.add(user)
      .then(saved => {
        const token = generateToken(saved)

        res.status(201).json({
          message: `Welcome ${saved.username}!`,
          authToken: token
        })
      })
      .catch(error => {
        res.status(500).json(error);
      })
};

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password )) {
        const token = generateToken(user)

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          authToken: token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' })
      }
    })
    .catch(error => {
      res.status(500).json(error);
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}

function getUsers (req, res) {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send(err));
};