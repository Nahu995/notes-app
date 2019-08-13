const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const methodOverride = require('method-override');
// Initializations
const app = express();

// Settings
app.set('appName', process.env.PORT ||'notes-app');
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layout'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secretapp',
  resave: true,
  saveUninitialized: true,
}));
app.use(morgan('dev'));
// app.use(express.json());

// Global Variables

// Routes
app.use("/",(req, res, next)=>{
  console.log("function")
});
// Static Files

// Server
app.listen(app.get('port'), () => {
  console.log("Server on port", app.get('port'));
});