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

export const validatePostIntput = (req, res, next) => {
  let errors = {}

  for (let prop of Object.keys(req.body)) {
    req.body[prop] = !isEmpty(req.body[prop]) ? req.body[prop] : ''
  }

  if (req.body.text && !validator.isLength(req.body.text, { min: 10, max: 300 })) {
    errors.text =
      'your post should be more than 10 characters and less then 300'
  }

  if (!req.body.text) {
    errors.text = 'text is requierd for the post'
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

export const validateExpirienceInput = (req, res, next) => {
  let errors = {}

  for (let prop of Object.keys(req.body)) {
    req.body[prop] = !isEmpty(req.body[prop]) ? req.body[prop] : ''
  }

  if (req.body.from && !validator.toDate(req.body.from)) {
    errors.from = 'from should be your start date'
  }

  if (req.body.to && !validator.toDate(req.body.to)) {
    errors.to = 'from should be your end date'
  }

  if (req.body.current && !validator.isBoolean(req.body.current)) {
    errors.current = 'need to be true or false'
  }

  if (
    req.body.description &&
    !validator.isLength(req.body.description, { min: 10 })
  ) {
    errors.description = 'description must be at last 10 cahrs'
  }

  if (!req.body.title) {
    errors.title = 'title is required'
  }

  if (!req.body.from) {
    errors.from = 'from is required'
  }

  if (!req.body.current) {
    errors.current = 'current is required'
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

export const validateEducationInput = (req, res, next) => {
  let errors = {}

  for (let prop of Object.keys(req.body)) {
    req.body[prop] = !isEmpty(req.body[prop]) ? req.body[prop] : ''
  }

  if (req.body.from && !validator.toDate(req.body.from)) {
    errors.from = 'from should be your start date'
  }

  if (req.body.to && !validator.toDate(req.body.to)) {
    errors.to = 'from should be your end date'
  }

  if (req.body.current && !validator.isBoolean(req.body.current)) {
    errors.current = 'need to be true or false'
  }

  if (
    req.body.description &&
    !validator.isLength(req.body.description, { min: 10 })
  ) {
    errors.description = 'description must be at last 10 cahrs'
  }

  if (!req.body.school) {
    errors.school = 'school is required'
  }

  if (!req.body.degree) {
    errors.degree = 'degree is required'
  }

  if (!req.body.from) {
    errors.from = 'from is required'
  }

  if (!req.body.current) {
    errors.current = 'current is required'
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
