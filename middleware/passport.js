import { ExtractJwt, Strategy } from 'passport-jwt'
import passport from 'passport'
import { User } from '../schemas'
require('dotenv').config()

const transformResponse = ({ _id, name, email, avatar }) => ({
  _id,
  name,
  email,
  avatar
})

export default (req, res, next) => {
  const options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.SECRET

  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id).lean()
        done(null, transformResponse(user))
      } catch (error) {
        done(error, null)
      }
    })
  )
  next()
}
