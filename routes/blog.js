const { Router } = require('express')
const Blog = require('../models/blog')
const multer = require('multer');
const router = Router()
const path = require('path')



router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName)
  }
})

const upload = multer({ storage })

router.post("/", upload.single('coverImage'),(req,res)=> {
  console.log(req.body);
  return res.redirect("/")
})


module.exports = router; 