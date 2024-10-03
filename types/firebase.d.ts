import { FirebaseApp } from "firebase/app"
import { Auth } from "firebase/auth"
import { Firestore } from "firebase/firestore"
import { FirebaseStorage } from "firebase/storage"

declare module "#app" {
    interface NuxtApp {
        $app: FirebaseApp
        $auth: Auth
        $db: Firestore
        $storage: FirebaseStorage
    }
}
