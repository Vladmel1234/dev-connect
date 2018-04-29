import express from 'express'

import profile from './profile'
import users from './users'
import posts from './posts'

const router = express.Router()

router.use('/users', users)
router.use('/profile', profile)
router.use('/posts', posts)

export default router
