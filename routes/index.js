const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const fs = require('fs');

// GET Route for retrieving diagnostic information
router.get('/notes', (req, res) => {
  readFromFile('./db/db.json').then((data) =>
    res.json(JSON.parse(data))
  );
});

// POST Route for a error logging
router.post('/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  const payload = {
    title,
    id: uuidv4(),
    text,
  };

  if (req.body) {
    readAndAppend(payload, './db/db.json');
    console.log(payload);
    res.json(`Diagnostic information added 🔧`);

  } else {
    res.json({
      message: 'Object is valid, not logging. Check front end implementation',
    });
  }
});

router.delete('/notes/:id', (req, res) => {
  fs.readFile('./db/db.json').then((data) => {
    let parsedData = JSON.parse(data)
    parsedData.filter(note => note.id != req.params.id)
        fs.writeFile('db/db.json', JSON.stringify(parsedData), (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
      res.redirect('/notes')
    });
  })
});
module.exports = router;
