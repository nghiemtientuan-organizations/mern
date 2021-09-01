const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');

const Post = require('../models/Post');

// @route GET api/posts
// @desc List posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.userId }).populate('user', [
      'username',
    ]);

    return res.json({
      success: true,
      message: 'Success',
      result: posts,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @route POST api/posts
// @desc Create post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const { title, description = '', url = '', status = 'TO LEARN' } = req.body;

  //simple validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Missing title',
    });
  }

  try {
    const newPost = new Post({
      title,
      description,
      url: url ? (url.startsWith('https://') ? url : `https://${url}`) : null,
      status,
      user: req.userId,
    });
    await newPost.save();

    return res.json({
      success: true,
      message: 'Post is created successfully',
      result: newPost,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @route PUT api/posts/postId
// @desc Update post
// @access Private
router.put('/:postId', verifyToken, async (req, res) => {
  const { title, description = '', url = '', status = 'TO LEARN' } = req.body;

  //simple validation
  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Missing title',
    });
  }

  try {
    let updatedPost = {
      title,
      description,
      url: url ? (url.startsWith('https://') ? url : `https://${url}`) : null,
      status,
    };
    const postUpdateCondition = { _id: req.params.postId, user: req.userId };
    updatedPost = await Post.findOneAndUpdate(
      postUpdateCondition,
      updatedPost,
      { new: true }
    );

    if (!updatedPost)
      return res
        .status(401)
        .json({ success: false, message: 'Post not found or Unauthorized' });

    return res.json({
      success: true,
      message: 'Post is updated successfully',
      result: updatedPost,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

// @route DELETE api/posts/postId
// @desc Delete post
// @access Private
router.delete('/:postId', verifyToken, async (req, res) => {
  try {
    const postUpdateCondition = { _id: req.params.postId, user: req.userId };
    const deletedPost = await Post.findOneAndDelete(postUpdateCondition);

    if (!deletedPost)
      return res
        .status(401)
        .json({ success: false, message: 'Post not found or Unauthorized' });

    return res.json({
      success: true,
      message: 'Post is deleted successfully',
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
