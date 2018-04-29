import express from 'express'

// @route GET api/posts
// @desc posts routes
// @access Public
const router = express.Router()
router.get('/', returnPosts)
function returnPosts (req, res) {
  res.json({ posts: 'posts' })
}

export default router
