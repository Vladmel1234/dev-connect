import { ExtractJwt, Strategy } from 'passport-jwt'
import passport from 'passport'
import { UserSchema } from '../schemas'
require('dotenv').config()

export default (req, res, next) => {
  const options = {}
  options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  options.secretOrKey = process.env.SECRET

  passport.use(
    new Strategy(options, async (jwtPayload, done) => {
      try {
        const user = await UserSchema.findById(jwtPayload.id)
        done(null, user)
      } catch (error) {
        done(error, null)
      }
    })
  )
  next()
}
