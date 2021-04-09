const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
const bodyParser = require('body-parser');
const cors = require('cors');

//connect to database
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    ()=> console.log('connected to db')
    );

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/posts', postsRoute);
app.use('/api/users', usersRoute);



app.listen(3300, ()=> console.log('server is running....'));