import { User as UserSchema } from '../schemas'
import gravatar from 'gravatar'
import { userHelpers } from '../helpers'

export default class User {
  async saveUser ({ email, name, password, avatar }) {
    const curentUser = await UserSchema.findOne({ email })
    if (curentUser) {
      throw new Error('User alredy exists')
    } else {
      const newUser = new UserSchema({
        name,
        email,
        password: await userHelpers.hashPassword(password),
        avatar: avatar || createGravatar(email)
      })
      try {
        await newUser.save()
      } catch (error) {
        throw new Error(error)
      }
    }
  }

  async findUserByEmailAndAuthorize ({ email, password }) {
    try {
      const curentUser = await UserSchema.findOne({ email })
      if (!curentUser) {
        return 404
      }
      return await userHelpers.authorizePassword(password, curentUser)
    } catch (error) {
      return error
    }
  }
}

function createGravatar (email) {
  const avatar = gravatar.url(email, {
    s: '200', // Size
    r: 'pg', // Rating
    d: 'mm' // Default pic
  })

  return avatar
}
