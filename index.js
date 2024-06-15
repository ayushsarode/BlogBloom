const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const {checkForAuthenticationCookie } = require('./middleware/authentication')


const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')

const app = express()
PORT = 8001;

mongoose.connect('mongodb://localhost:27017/bloomblog')
    .then(() => {
        console.log('MongoDB server is running');
    })
    .catch(err => {
        console.error('Connection error', err);
    });



app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))



app.use(express.urlencoded({ extended: false }));
app.use('/user', userRoute);
app.use('/blog', blogRoute);
app.use(cookieParser());
app.use(checkForAuthenticationCookie('token'));

app.get('/', (req, res) => {
    res.render('home', {
        user: req.user
    })
})


app.listen(PORT, () => console.log(`Server is running at http://localhost:8001`))