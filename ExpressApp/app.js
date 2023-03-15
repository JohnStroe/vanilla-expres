const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes')



// set up express app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://tutorial:G9DZJ9aby39E@vanilaapp.8k4tnue.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// midleware && static
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

//routes
app.get('/', (req, res) =>{
    res.redirect('/blogs');
});

app.get('/about', (req, res) =>{
    res.render('about', {title: 'About'});
});

// blog routes

app.use('/blogs',blogRoutes);

// 404 page
app.use((req, res) => {
    res.status(404).render('404', {title: 'Page not found'});
});