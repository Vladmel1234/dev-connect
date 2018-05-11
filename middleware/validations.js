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
