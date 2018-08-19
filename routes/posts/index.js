import express from 'express'
import passport from 'passport'
import { Post } from '../../models'
import { validatePostIntput } from '../../middleware/validations'

const authentification = passport.authenticate('jwt', { session: false })

// @route POST api/posts
// @desc posts route for creating post
// @access Private
const router = express.Router()
router.post(
  '/',
  authentification,
  getModel,
  validatePostIntput,
  createPost,
  returnPost
)

// @route GET api/posts
// @desc posts route for getting all posts
// @access Public
router.get('/', getModel, getPosts, returnPosts)

// @route GET api/posts/:id
// @desc posts route for getting posts of user by user ids
// @access Private
router.get('/:id', authentification, getModel, getPostsByUserId, returnPosts)

// @route DELETE api/posts/:postId
// @desc delte post by post id
// @access Private
router.delete(
  '/:postId',
  authentification,
  getModel,
  deletePost,
  returnPosts
)

// @route POST api/posts/like/:postId
// @desc posts route for getting posts of user by user ids
// @access Private
router.post(
  '/like/:postId',
  authentification,
  getModel,
  toggleLike,
  returnPost
)

function returnPost (req, res) {
  res.json({ post: req.post })
}

function returnPosts (req, res) {
  res.json({ posts: req.posts })
}

function getModel (req, res, next) {
  req.model = new Post(req.user)
  next()
}

async function getPosts (req, res, next) {
  try {
    req.posts = await req.model.getAllPosts()
    next()
  } catch (error) {
    next(error)
  }
}

async function getPostsByUserId (req, res, next) {
  try {
    req.posts = await req.model.getUserPostById(req.params.id)
    next()
  } catch (error) {
    next(error)
  }
}

async function createPost (req, res, next) {
  try {
    req.post = await req.model.createPost(req)
    next()
  } catch (error) {
    next(error)
  }
}

async function deletePost (req, res, next) {
  try {
    req.post = await req.model.deltePostById(req.params.postId, req.user._id)
    next()
  } catch (error) {
    next(error)
  }
}

async function toggleLike (req, res, next) {
  try {
    req.post = await req.model.toggleLike(req.params.postId, req.user._id)
    next()
  } catch (error) {
    next(error)
  }
}

export default router
