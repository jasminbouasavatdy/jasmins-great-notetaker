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
  res.status(200).json(`${req.method} request recieved to GET notes`)
  
  console.info(`${req.method} request recieved to GET notes`)
})


app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request recieved to add notes`);

  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text,
      review_id: uuid(),
    };


    fs.readFile('./db/db.json', 'utf8', ( err, data) => {
      if (err) {
        console.err(err);
      }else {
        const parsedNotes = JSON.parse(data);

        parsedNotes.push(newNote);

        fs.writeFile(`./db/db.json`,JSON.stringify(parsedNotes, null, 2),
        (writeErr)=>
        writeErr
        ? console.error(writeErr)
        : console.info('Sucessfully wrote a new note!')
        );
      }
    })

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
