// plugins/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

import type { FirebaseApp } from "firebase/app"
import type { Auth } from "firebase/auth"
import type { Firestore } from "firebase/firestore"
import type { FirebaseStorage } from "firebase/storage"

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: config.public.FIREBASE_API_KEY as string,
        authDomain: config.public.FIREBASE_AUTH_DOMAIN as string,
        storageBucket: config.public.FIREBASE_STORAGE_BUCKET as string,
        messagingSenderId: config.public.FIREBASE_MESSAGE_SENDER_ID as string,
        appId: config.public.FIREBASE_APP_ID as string,
        projectId: config.public.FIREBASE_PROJECT_ID as string,
    }

    const velorisFirebaseConfig = {
        apiKey: "AIzaSyBAbJjwIWx1DDYbQaV8e6vTWQG5JQMqUYk",
        authDomain: "veloris-91865.firebaseapp.com",
        projectId: "veloris-91865",
        storageBucket: "veloris-91865.appspot.com",
        messagingSenderId: "849032631896",
        appId: "1:849032631896:web:ea11e7e0769e7f5de05c2d",
        measurementId: "G-EZV53X4G0C",
    }

    if (!firebaseConfig.apiKey) {
        console.error("Firebase connection details are missing. Please add them to the .env file.")
    }

    let app: FirebaseApp | undefined
    let velorisApp: FirebaseApp | undefined

    let auth: Auth | undefined

    let db: Firestore | undefined
    let velorisDb: Firestore | undefined

    let storage: FirebaseStorage | undefined
    let velorisStorage: FirebaseStorage | undefined

    try {
        // Initialize Firebase apps
        app = initializeApp(firebaseConfig)
        db = getFirestore(app)
        storage = getStorage(app)

        velorisApp = initializeApp(velorisFirebaseConfig, "velorisApp")
        auth = getAuth(velorisApp)
        velorisDb = getFirestore(velorisApp)
        velorisStorage = getStorage(velorisApp)

        console.log("Firebase client app, auth, db, and storage initialized.")
    } catch (error) {
        console.error("Error creating Firestore instance", error)
    }

    // Provide the Firebase services to the Nuxt app context
    useNuxtApp().provide("db", db)
    useNuxtApp().provide("storage", storage)

    useNuxtApp().provide("auth", auth)
    useNuxtApp().provide("velorisStorage", velorisStorage)
    useNuxtApp().provide("velorisDb", velorisDb)
})
