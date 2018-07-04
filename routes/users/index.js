import express from 'express'
import { User } from '../../models'
import { validateRegisterInput } from '../../middleware/validations'
import passport from 'passport'

const router = express.Router()
const authentification = passport.authenticate('jwt', { session: false })

router.post(
  '/register',
  getModels,
  validateRegisterInput,
  saveUser,
  returnSaveUser
)

router.post('/login', getModels, authorrizeUser, retrunLoginUser)

router.get('/current', getModels, authentification, returnCurrentUser)

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

function returnCurrentUser (req, res) {
  res.json(req.user)
}

function returnSaveUser (req, res) {
  res.json(req.newUser)
}
export default router
