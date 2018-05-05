import express from 'express'
import { User } from '../../models'

const router = express.Router()

router.post('/register', getModels, saveUser, returnSaveUser)

router.post('/login', getModels, authorrizeUser, retrunLoginUser)

async function getModels (req, res, next) {
  try {
    req.user = new User()
    next()
  } catch (err) {
    next(err)
  }
}

async function saveUser (req, res, next) {
  try {
    req.newUser = await req.user.saveUser(req.body)
    next()
  } catch (err) {
    next(err)
  }
}

async function authorrizeUser (req, res, next) {
  try {
    req.token = await req.user.findUserByEmailAndAuthorize(req.body)
    next()
  } catch (error) {
    next(error)
  }
}

function retrunLoginUser (req, res) {
  switch (req.token) {
    case 400:
      res.status(req.token).json({ password: 'Password Incorect' })
      break
    case 404:
      res.status(req.token).json({ email: 'User not found' })
      break

    default:
      res.json({ success: true, token: `Bearer ${req.token}` })
      break
  }
}

function returnSaveUser (req, res) {
  res.json(req.newUser)
}
export default router
