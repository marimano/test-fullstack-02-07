import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './users.mjs';
import addUsers from './addUsers.mjs';

import mongoose from 'mongoose';

//const dbUrl = 'mongodb+srv://marfayaga:spel9n6heAtVw8wP@clusterhillel.s63wg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHillel';
const dbUrl = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', () => {
  console.log('DB error');
});

db.once('open', () => {
  console.log('DB opened');
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static('../client'));

app.get('/', (req, res) => {
  const indexPath = path.join(__dirname, "../client/index.html");
  res.sendFile(indexPath);
});

app.get('/index.js', (req, res) => {
  const indexPath = path.join(__dirname, "../client/index.js");
  res.sendFile(indexPath);
});

app.get('/styles.css', (req, res) => {
  const indexPath = path.join(__dirname, "../client/styles.css");
  res.sendFile(indexPath);
});

app.get('/users', (req, res) => {
  return User.find()
    .then(users => {
      console.log('Users', users);
      if (!users.length) {
        return addUsers()
          .then(() => User.find())
          .then(users => {
            console.log('Users2', users);
            res.send(users);
          });
      }
      else {
        return res.send(users);
      }
    })
    .catch(err => {
      console.error('Cannot find users', err);
      res.status(500).send('Something wrong');
    });
});

app.listen(5555, () => {
  console.log('Server started!');
});