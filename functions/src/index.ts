// firebase
import * as functions from 'firebase-functions'
// settings
import { settings } from '@/settings/settings'
// app
import { app } from '@/app'

// end point: "/api", region: settings.region
export const api = functions
  .region(`${settings.region}`)
  .runWith({
    secrets: settings.secrets
  })
  .https.onRequest(app)
