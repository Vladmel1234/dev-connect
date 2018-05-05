import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    console.log('hashedPassword', hashedPassword)
    return hashedPassword
  } catch (error) {
    console.error(error)
  }
}

const authorizePassword = async (password, user) => {
  try {
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return 400
    }
    return signTokern(user)
  } catch (error) {
    return error
  }
}

// Sign Toker

const signTokern = async user => {
  const payload = {
    // create JWT tokern
    id: user.id,
    avatar: user.avatar,
    name: user.name
  }
  try {
    return await jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 })
  } catch (error) {
    return error
  }
}

export default {
  hashPassword,
  authorizePassword,
  signTokern
}
