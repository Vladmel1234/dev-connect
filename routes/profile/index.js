import express from 'express'
import { Profile } from '../../models'
import { validateProfileInput } from '../../middleware/validations'
import passport from 'passport'

const authentification = passport.authenticate('jwt', { session: false })
const router = express.Router()

// @route GET api/profile
// @desc get current profile profile
// @access Secured

router.get('/', getModel, authentification, getProfile, returnProfile)

// @route GET api/profile/all
// @desc returns all profile
// @access Public

router.get('/all', getModel, getProfiles, returnProfiles)

// @route GET api/profile/handle
// @desc get profile by handle
// @access Public

router.get('/handle/:handle', getModel, getProfileByHandle, returnProfile)

// @route GET api/profile/handle
// @desc get profile by id
// @access Public

router.get('/:id', getModel, getProfileById, returnProfile)

// @route POST api/profile
// @desc create profile
// @access Secured

router.post(
  '/',
  getModel,
  authentification,
  validateProfileInput,
  createProfile,
  returnProfileStatus
)

// @route POST api/profile/expirience
// @desc add expirience to profile
// @access Secured

router.post(
  '/expirience',
  getModel,
  authentification,
  // validateProfileInput,
  createProfileExpirience,
  returnProfileStatus
)

// @route DELETE api/profile/expirience/:id
// @desc dellete expirience from profile
// @access Secured

router.delete(
  '/expirience/:id',
  getModel,
  authentification,
  deleteProfileExpirience,
  returnProfileStatus
)

// @route POST api/profile/education
// @desc add education to profile
// @access Secured

router.post(
  '/education',
  getModel,
  authentification,
  // validateProfileInput,
  createProfileEducation,
  returnProfileStatus
)

function getModel (req, res, next) {
  req.model = new Profile()
  next()
}

async function getProfile (req, res, next) {
  try {
    req.profile = await req.model.one(req.user._id)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function getProfileByHandle (req, res, next) {
  try {
    req.profile = await req.model.oneByHandle(req.params.handle)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function getProfileById (req, res, next) {
  try {
    req.profile = await req.model.oneById(req.params.id)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function getProfiles (req, res, next) {
  try {
    req.profiles = await req.model.getAll()
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function createProfile (req, res, next) {
  try {
    req.profile = await req.model.createOrUpdate(req)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function createProfileExpirience (req, res, next) {
  try {
    req.profile = await req.model.addExpirience(req)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function deleteProfileExpirience (req, res, next) {
  try {
    req.profile = await req.model.deleletExpirience(req)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function createProfileEducation (req, res, next) {
  try {
    req.profile = await req.model.addEducation(req)
    next()
  } catch (error) {
    res.status(400).json({ error })
  }
}

async function returnProfile (req, res) {
  switch (req.profile) {
    case 404:
      res.status(404).json({ error: 'no such user found' })
      break
    default:
      res.json({ profile: req.profile })
      break
  }
}

async function returnProfiles (req, res) {
  switch (req.profiles) {
    case 404:
      res.status(404).json({ error: 'no profiles in database' })
      break
    default:
      res.json({ profile: req.profiles })
      break
  }
}

async function returnProfileStatus (req, res) {
  res.json({ profile: req.profile })
}

export default router
