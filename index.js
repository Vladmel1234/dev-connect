import express from 'express'
import http from 'http'
import logger from 'morgan'
import bodyParser from 'body-parser'
import cors from 'cors'
import methodOverride from 'method-override'
import routes from './routes'
import passport from 'passport'
import passportMiddleware from './middleware/passport'

require('dotenv').config()
const app = express()
app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(methodOverride())
app.use(cors())
app.use(require('express-status-monitor')({ path: '/' }))
app.use(passport.initialize())
app.use('/api', passportMiddleware, routes)

process.on('uncaughtException', err => {
  console.log('--------------UNCAUGHT-EXCEPTION---------------')
  console.log(err)
  console.log('--------------UNCAUGHT-EXCEPTION---------------')
})

http
  .createServer(app)
  .listen(process.env.APP_PORT, process.env.APP_HOST, () =>
    console.log(`api is running on port ${process.env.APP_PORT}`)
  )

export default app
