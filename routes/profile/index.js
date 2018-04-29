import express from 'express'

// @route GET api/profile
// @desc profile routes
// @access Public

const router = express.Router()
router.get('/', returnProfile)

function returnProfile (req, res) {
  res.json({ profile: 'profile' })
}

export default router
