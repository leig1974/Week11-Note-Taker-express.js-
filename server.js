const express = require('express');
const routes = require('./routes');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', routes);


// GET Route for feedback page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Wildcard route to direct users to a 404 page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);

app.listen(PORT, () => console.log(`Server listening on PORT http://localhost:${PORT}`));
