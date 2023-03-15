const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog')



// set up express app
const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://tutorial:G9DZJ9aby39E@vanilaapp.8k4tnue.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen())
    .catch((err) => console.log(err));

// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'folder name where views are kept');

//listen for requests
//app.listen(3000);

// midleware && static
app.use(express.static('public'));
app.use(morgan('dev'));

// mongoose and mongo sandbox route
app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'New blog',
        snippet: 'About my new blog',
        body: 'More abt the blog'
    });

    blog.save()
        .then((result) => res.send(result))
        .catch((err) => console.log(err))
});

app.get('/single-blog', (req, res) =>{
    Blog.findById('6408ab71c06ac5fb216371ec')
        .then((result) => res.send(result))
        .catch((err) => console.log(err));
})

app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => console.log(err));
})

//routes
app.get('/', (req, res) =>{
    const blogs = [
        {title:'Blog 1', snippet:'This is the first blog. I hope you like it.'},
        {title:'Blog 2', snippet:'This is the second blog. I hope you love it.'},
        {title:'Blog 3', snippet:'This is the third blog. When will this end.'}
    ];
    // res.send('<p> Home Page </p>')
    // res.sendFile('./views/index.html', { root: __dirname});
    res.render('index', {title: 'Home', blogs});

});

app.get('/about', (req, res) =>{

    // res.send('<p> About Page </p>')
    // res.sendFile('./views/about.html', { root: __dirname});
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res) =>{
    res.render('create', {title: 'Create'});
});

// redirects (not needed anymore)

// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });

// 404 page

app.use((req, res) => {
    res.status(404).render('404', {title: 'Page not found'});
});