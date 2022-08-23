const express = require('express');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');
require('dotenv').config();

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all movies from the database
app.get('/', (req, res) => {
  db.select('*')
    .from('todos')
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});

// GET: Fetch movie by movieId from the database
app.get('/:id', (req, res) => {
  const id = req.params.id;
  db.select('*')
    .from('todos')
    .where('id', '=', id)
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log(err);
    });
});
// POST: Create movies and add them to the database
app.post('/add-todo', (req, res) => {
  const { title, isCompleted } = req.body;
  db('todos')
    .insert({
      title: title,
      iscompleted: isCompleted,
    })
    .then(() => {
      console.log('Todo Added');
      return res.json({ msg: 'Todod Added', response: response });
    })
    .catch(err => {
      console.log(err);
    });
});

// DELETE: Delete todo by id from the database
app.delete('/delete-todo', (req, res) => {
  const id = req.body;
  //const id = req.params.id;

  const todoIdToDelete = Number(id.id);
  console.log(todoIdToDelete);
  db('todos')
    .where('id', '=', todoIdToDelete)
    .del()
    .then(() => {
      console.log('Todo Deleted');
      return res.json({ msg: 'Todo Deleted' });
    })
    .catch(err => {
      console.log(err);
    });
});

// PUT: Update todo by id from the database
app.put('/update-todo', (req, res) => {
  db('todos')
    .where('id', '=', 1)
    .update({ title: 'Go to Office 1' })
    .then(() => {
      console.log('Todod Updated');
      return res.json({ msg: 'Todod Updated' });
    })
    .catch(err => {
      console.log(err);
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
