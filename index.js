import express from 'express'
import http from 'http'
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import routes from './routes'
require('dotenv').config()
const app = express()

app.use(logger('dev'))
app.use(cors)
// connection to mongodb

mongoose
  .connect(process.env.DB_HOST)
  .then(() => console.log('Connected to mongoDB'))
  .catch((e) => console.log(`Error accoured --> ${e}`))

app.use('/api', routes())

http(app).listen(process.env.APP_PORT, process.env.APP_HOST, () => console.log(`api is running on port ${process.env.APP_PORT}`))
