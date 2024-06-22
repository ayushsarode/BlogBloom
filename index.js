const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Blog = require("./models/blog");


const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')


const { checkForAuthenticationCookie } = require('./middleware/authentication')

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
app.use(bodyParser.json());
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.get("/", async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
        user: req.user,
        blogs: allBlogs,
    });
});


app.listen(PORT, () => console.log(`Server is running at http://localhost:8001`))