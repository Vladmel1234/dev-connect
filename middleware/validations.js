import validator from 'validator'
import { isEmpty } from 'lodash'

export const validateRegisterInput = (req, res, next) => {
  let errors = {}

  for (let prop of Object.keys(req.body)) {
    req.body[prop] = !isEmpty(req.body[prop]) ? req.body[prop] : ''
  }

  if (!validator.isLength(req.body.name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 to 30 characters'
  }

  if (!validator.isLength(req.body.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 to 30 characters'
  }

  if (!validator.isEmail(req.body.email)) {
    errors.email = 'Email is not valid'
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      errors,
      isValid: isEmpty(errors)
    })
  } else {
    next()
  }
}

export const validateProfileInput = (req, res, next) => {
  let errors = {}

  for (let prop of Object.keys(req.body)) {
    req.body[prop] = !isEmpty(req.body[prop]) ? req.body[prop] : ''
  }

  if (req.body.website && !validator.isURL(req.body.website)) {
    errors.webiste = 'website should be valid url'
  }

  if (req.body.facebook && !validator.isURL(req.body.facebook)) {
    errors.facebook = 'facebook should be valid url'
  }
  if (req.body.linkedin && !validator.isURL(req.body.linkedin)) {
    errors.linkedin = 'website should be valid url'
  }
  if (req.body.twitter && !validator.isURL(req.body.twitter)) {
    errors.twitter = 'twitter should be valid url'
  }
  if (req.body.googleplus && !validator.isURL(req.body.googleplus)) {
    errors.googleplus = 'googleplus should be valid url'
  }

  if (
    req.body.handle &&
    !validator.isLength(req.body.handle, { min: 2, max: 30 })
  ) {
    errors.handle = 'handle must be between 2 to 30 characters'
  }

  if (!req.body.handle) {
    errors.handle = 'handle is required'
  }

  if (!req.body.status) {
    errors.status = 'status is required'
  }

  if (!req.body.skills) {
    errors.handle = 'skills is required'
  }

  if (!isEmpty(errors)) {
    res.status(400).json({
      errors,
      isValid: isEmpty(errors)
    })
  } else {
    next()
  }
}
