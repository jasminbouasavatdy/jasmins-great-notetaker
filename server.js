const uuid = require('./helpers/uuid'); // gives a unique id to each note written
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
// middle wear for parsing JSON and urlencoded form data
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// GET Route for notes page

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    res.status(200).json(JSON.parse(data))
  console.info(`${req.method} request recieved to GET notes!`)
    // return data;
  }
  );
})


app.post('/api/notes', (req, res) => {
  console.info(`${req.method} request recieved to add notes`);
  // Destructuring assignment for the items in req.body

  const { title, text } = req.body;
  // If all the required properties are present

  if (title && text) {
    // Variable for the object we will save

    const newNote = {
      title,
      text,
      review_id: uuid(), // added so you are getting a unique id
    };


    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.err(err);
      } else {
        // Convert string into JSON object
        const parsedNotes = JSON.parse(data);
        parsedNotes.push(newNote);
        // this is to Write updated reviews back to the file
    fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 2),
      (writeErr) =>
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


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
