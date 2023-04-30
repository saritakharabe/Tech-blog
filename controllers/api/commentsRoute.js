const router = require('express').Router();
const withAuth = require('../../utils/auth');
const {Comment } = require('../../models');
const { Router } = require('express');

//get all Comments
router.get('/', async (res,req )=> {
    try {
        const commentData = await Comment.findAll();
        if (!commentData) {
            res.status(404).json({ message: 'No Comment is found. ' });
            return;
          }
          res.status(200).json(commentData);
    } catch (error) {
        res.status(500).json(error);
    }
});

//create new comment
router.post('/', withAuth, async (req, res) => {
    try {
      const newComment = await Comment.create({
        ...req.body,
        user_id: req.session.user_id,
        post_id: req.session.post_id,
      });
  
      res.status(200).json(newComment);
    } catch (error) {
      res.status(400).json(error);
    }
});

//deleting comment with id
router.delete('/:id', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!commentData) {
        res.status(404).json({ message: 'No Comment found with this id!' });
        return;
      }
  
      res.status(200).json(commentData);
    } catch (error) {
      res.status(500).json(error);
    }
  });

module.exports = Router;