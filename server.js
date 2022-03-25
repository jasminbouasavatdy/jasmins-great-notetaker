const { application } = require('express');
const uuid = require('./helpers/uuid');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', function (err, data) {
    console.log('data loaded', JSON.parse(data))
    res.json(JSON.parse(data))
  })
})


app.post('/api/notes', (req, res) => {
  console.info(`${req.method}request recieved to add notes`);
  res.json(`${req.method} request recieved to get notes`);

  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      review_id: uuid(),
    };

    const noteString = JSON.stringify(newNote, null, 2);

    fs.writeFile(`./db/${newNote.title}.json`, noteString, (err) =>
      err
        ? console.error(err)
        : console.log(`Note for ${newNote.title} has been written to JSON file`)
    );

    const response = {
      status: 'success',
      body: newNote
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting new note');
  }
}),

  app.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/note.html'));
  });

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
