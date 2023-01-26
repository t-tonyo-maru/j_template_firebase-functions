// firebase
import admin from 'firebase-admin'
// settings
import { settings } from '@/settings/settings'

admin.initializeApp({
  credential: admin.credential.cert(settings.firebaseCredentials)
})

const db = admin.firestore()

export { admin, db }
