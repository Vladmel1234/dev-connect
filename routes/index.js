import express from 'express'

import profile from './rest/profile'
import users from './rest/users'
import posts from './rest/posts'

export default function () {
  const router = express.Router()

  router.use('/users', users())
  router.use('/profile', profile())
  router.use('/posts', posts())

  return router
}
