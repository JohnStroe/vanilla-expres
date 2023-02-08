const express = require('express');

// set up express ap
const app = express();

//listen for requests
app.listen(3000);

app.get('/', (req, res) =>{

    // res.send('<p> Home Page </p>')
    res.sendFile('./views/index.html', { root: __dirname});

});

app.get('/about', (req, res) =>{

    // res.send('<p> About Page </p>')
    res.sendFile('./views/about.html', { root: __dirname});

});
