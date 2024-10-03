// plugins/firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// import { defineNuxtPlugin, useNuxtApp } from "#app"

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

    if (!firebaseConfig.apiKey) {
        console.error("Firebase connection details are missing. Please add them to the .env file.")
    }

    let app: FirebaseApp | undefined
    let auth: Auth | undefined
    let db: Firestore | undefined
    let storage: FirebaseStorage | undefined

    try {
        // Initialize Firebase app
        app = initializeApp(firebaseConfig)
        auth = getAuth(app)
        db = getFirestore(app)
        storage = getStorage(app)

        console.log("Firebase client app, auth, db, and storage initialized.")
    } catch (error) {
        console.error("Error creating Firestore instance", error)
    }

    // Provide the Firebase services to the Nuxt app context
    useNuxtApp().provide("db", db)
    useNuxtApp().provide("storage", storage)
    useNuxtApp().provide("auth", auth)
})
