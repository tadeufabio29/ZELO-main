import { initializeApp, getApps } from 'firebase/app'
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { Platform } from 'react-native'
import Constants from 'expo-constants'

const {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseProjectId,
  firebaseStorageBucket,
  firebaseMessagingSenderId,
  firebaseAppId,
} = Constants.expoConfig?.extra ?? {}

const firebaseConfig = {
  apiKey:            firebaseApiKey,
  authDomain:        firebaseAuthDomain,
  projectId:         firebaseProjectId,
  storageBucket:     firebaseStorageBucket,
  messagingSenderId: firebaseMessagingSenderId,
  appId:             firebaseAppId,
}

// Evita reinicializar em hot reload
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0]

// Android/iOS: persistência nativa via AsyncStorage
// Web: getAuth padrão (IndexedDB)
let auth: ReturnType<typeof getAuth>
if (Platform.OS === 'web') {
  auth = getAuth(app)
} else {
  try {
    const AsyncStorage = require('@react-native-async-storage/async-storage').default
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    })
  } catch {
    // Já inicializado (hot reload)
    auth = getAuth(app)
  }
}

export { auth }
export const db = getFirestore(app)
export default app
