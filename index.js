const express = require('express')
const path = require('path')

const app = express()
PORT = 8001;

app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))

app.use(express.static(path.join(__dirname,'public')))

app.get('/', (req,res)=> {
    res.render('home')
})


app.listen(PORT, ()=> console.log(`Server is running at http://localhost:8001`))