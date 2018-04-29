import express from 'express'
import { User } from '../../models'

var router = express.Router()
router.post('/register', getModels, saveUser, returnSaveUser)

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

function returnSaveUser (req, res) {
  res.json(req.newUser)
}
export default router
