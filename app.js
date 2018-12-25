const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();

const {getHomePage} = require('./routes/index');
const {getSearchPage,Search} = require('./routes/search');

const {getSearchDirectorPage,SearchDirector} = require('./routes/searchDirector')

const {addActorPage, addActor, deleteActor, editActor, editActorPage} = require('./routes/actor');
const {addDirectorPage, addDirector, deleteDirector, editDirector, editDirectorPage} = require('./routes/director');
const {addProducerPage, addProducer, deleteProducer, editProducer, editProducerPage} = require('./routes/producer');
const {addDistributorPage, addDistributor, deleteDistributor, editDistributor, editDistributorPage} = require('./routes/distributor');
const {addMoviePage, addMovie, deleteMovie, editMovie, editMoviePage} = require('./routes/movie');
const port = 2000;

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
const db = mysql.createConnection ({
	multipleStatements: true,
    host: 'localhost',
    user: 'root',
    password: '',
    database: '305_project'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

app.get('/search', getSearchPage);
app.post('/search', Search);
app.get('/searchDirector', getSearchDirectorPage);
app.post('/searchDirector', SearchDirector);
app.get('/', getHomePage);
app.get('/addActor', addActorPage);
app.get('/editActor/:id', editActorPage);
app.get('/deleteActor/:id', deleteActor);
app.post('/addActor', addActor);
app.post('/editActor/:id', editActor);
app.get('/addDirector', addDirectorPage);
app.get('/editDirector/:id', editDirectorPage);
app.get('/deleteDirector/:id', deleteDirector);
app.post('/addDirector', addDirector);
app.post('/editDirector/:id', editDirector);
app.get('/addProducer', addProducerPage);
app.get('/editProducer/:id', editProducerPage);
app.get('/deleteProducer/:id', deleteProducer);
app.post('/addProducer', addProducer);
app.post('/editProducer/:id', editProducer);
app.get('/addDistributor', addDistributorPage);
app.get('/editDistributor/:id', editDistributorPage);
app.get('/deleteDistributor/:id', deleteDistributor);
app.post('/addDistributor', addDistributor);
app.post('/editDistributor/:id', editDistributor);
app.get('/addMovie', addMoviePage);
app.get('/editMovie/:id', editMoviePage);
app.get('/deleteMovie/:id', deleteMovie);
app.post('/addMovie', addMovie);
app.post('/editMovie/:id', editMovie);


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});