import bcrypt from 'bcryptjs'

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

export default {
  hashPassword
}
