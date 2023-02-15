const express = require('express');

// set up express ap
const app = express();

// register view engine
app.set('view engine', 'ejs');
        // app.ste('views', 'myviews');

//listen for requests
app.listen(3000);

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