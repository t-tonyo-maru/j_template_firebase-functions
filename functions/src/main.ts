// lib
import * as functions from 'firebase-functions'
import { VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  ExpressAdapter,
  NestExpressApplication
} from '@nestjs/platform-express'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
// app
import { AppModule } from '@/app.module'
// config
import configuration from '@/config/configuration'

const server: express.Express = express()
const config = configuration()

export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance)
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {}
  )
  app.disable('x-powered-by')
  app.enableVersioning({
    type: VersioningType.URI
  })
  app.use(helmet())
  app.use(cookieParser())

  return app.init()
}

createNestServer(server)
  .then((v) => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err))

export const api: functions.HttpsFunction = functions
  .region(`${config.region}`)
  .runWith({
    secrets: config.secrets
  })
  .https.onRequest(server)
