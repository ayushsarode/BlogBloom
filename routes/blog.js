const { Router } = require('express')
const Blog = require('../models/blog')
const multer = require('multer');
const router = Router()

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    })
})

const upload = multer({ dest: 'uploads/' });

router.post("/", upload.single("coverImage"), async (req, res) => {
    const { title, body } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  });



module.exports = router; 