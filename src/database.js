const moongose = require('mongoose');

moongose.connect('mongodb://localhost/notes-db-app',{
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false
})
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));