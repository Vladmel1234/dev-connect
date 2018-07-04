import mongoose from 'mongoose'
require('dotenv').config()

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Connected to mongoDB'))
  .catch(e => console.log(`Error accoured --> ${e}`))

export User from './User'
export Profile from './Profile'
