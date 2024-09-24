import fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './users.mjs';
import mongoose from 'mongoose';
import Role from './roles.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


//const dbUrl = 'mongodb+srv://marfayaga:spel9n6heAtVw8wP@clusterhillel.s63wg.mongodb.net/?retryWrites=true&w=majority&appName=ClusterHillel';
const dbUrl = 'mongodb://localhost:27017/mydatabase';
mongoose.connect(dbUrl);

const db = mongoose.connection;
db.on('error', () => {
  console.log('DB error');
});

db.once('open', () => {
  console.log('DB opened');
});

const app = fastify();

app.register(fastifyStatic, {
  root: path.join(__dirname, '../client')
});

app.get('/users', async (req, res) => {
  try {
    const roles = await Role.find();
    let users = await User.find();
    if (!users.length) {
      await addUsers();
      users = await User.find();
    }
              
    const clientUsers = users.map(u => ({ 
      name: u.name, 
      role: roles.find(r => r._id.toString() === u.roleId.toString()).role 
    }));

    res.send(clientUsers);
  }
  catch (err) {
    console.error('Cannot find users', err);
    res.status(500).send('Something wrong');
  }
});

const port = process.env.PORT || 5555;
const host = process.env.HOST || 'localhost';

app.listen({ port, host }, () => {
  console.log('Fastify server started');
});