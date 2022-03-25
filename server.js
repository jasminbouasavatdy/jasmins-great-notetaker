const { application } = require('express');
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));


app.get('/notes',(req, res) =>{
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})
app.get('/api/notes', (req, res)=>{
  res.json(`${req.method} request recieved to get notes`);

  console.info(`${req.method} request received to get notes`);
})

app.post('/api/notes', (req, res)=>{
  console.info(`${req.method} request recieved to add notes`)
  res.json(`${req.method} request recieved to get notes`);


app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
})
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
