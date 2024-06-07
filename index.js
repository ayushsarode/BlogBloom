const express = require('express')
const path = require('path')
const userRoute = require('./routes/user')
const mongoose = require('mongoose')

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
app.use('/user', userRoute)

app.get('/', (req, res) => {
    res.render('home')
})


app.listen(PORT, () => console.log(`Server is running at http://localhost:8001`))