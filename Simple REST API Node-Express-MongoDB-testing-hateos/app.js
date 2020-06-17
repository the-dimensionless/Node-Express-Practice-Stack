const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const debug = require('debug')('app');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/*
 Older versions
 app.use(bodyParser.urlencoded({extended:true}))
 app.use(bodyParser.json())
 */
const port = process.env.PORT || 4242;

if (process.env.ENV === 'Test') {
  debug('This is for testing mode (development mode');
  const db = mongoose.connect('mongodb://localhost/bookAPI_Test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
} else {
  debug('This is for real');
  const db = mongoose.connect('mongodb://localhost/bookAPI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  /* 
  const db = mongoose.connect('mongodb://localhost/bookAPI-production', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
   */
}

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRouter')(Book);

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Welcome to my API');
});

app.server = app.listen(port, () => {
  debug(`Server started on port number ${port} . . .`);
});

module.exports = app;