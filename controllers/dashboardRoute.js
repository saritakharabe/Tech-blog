const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get All post 
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll(req.body,{
      attributes: ['id', 'title', 'post_text'],
      where: {
        user_id: req.session.user_id
      }
    });
    const post = postData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { 
      post, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('editPost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;