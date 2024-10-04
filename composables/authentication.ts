import {
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
} from "firebase/auth"

import type { Auth, AuthError, UserCredential, User } from "firebase/auth"

interface AuthResponse {
    success: boolean
    message?: string
}

export const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth as Auth

    try {
        await setPersistence($auth, browserLocalPersistence)
        const userCredential: UserCredential = await signInWithEmailAndPassword($auth, email, password)
        const user: User = userCredential.user
        console.log("insignin")
        console.log($CurrentUser.get)
        if (!user.emailVerified) {
            return {
                success: false,
                message: "Please verify your email before logging in.",
            }
        }

        return { success: true }
    } catch (error: unknown) {
        console.error(error)

        const message = getErrorMessage(error as AuthError)
        return { success: false, message }
    }
}

export const signUp = async (email: string, password: string): Promise<AuthResponse> => {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth as Auth
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword($auth, email, password)

        const user: User = userCredential.user

        await sendEmailVerification(user)

        return {
            success: true,
            message: "Account created! A verification email has been sent. Please verify your email before logging in.",
        }
    } catch (error: unknown) {
        console.error(error)

        const message = getErrorMessage(error as AuthError)
        return { success: false, message }
    }
}

export const signInWithGoogle = async (): Promise<AuthResponse> => {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth as Auth
    const provider = new GoogleAuthProvider()

    try {
        await setPersistence($auth, browserLocalPersistence)
        const userCredential: UserCredential = await signInWithPopup($auth, provider)
        const user: User = userCredential.user

        if (user.providerData.some((provider) => provider.providerId === "password") && !user.emailVerified) {
            return {
                success: false,
                message: "Please verify your email before accessing the app.",
            }
        }

        return { success: true }
    } catch (error: unknown) {
        console.error("Error signing in with Google:", error)

        const message = getErrorMessage(error as AuthError)
        return { success: false, message }
    }
}

export const resetPassword = async (email: string): Promise<AuthResponse> => {
    const nuxtApp = useNuxtApp()
    const $auth = nuxtApp.$auth as Auth
    try {
        await sendPasswordResetEmail($auth, email)
        return {
            success: true,
            message: "Password reset email sent! Please check your inbox.",
        }
    } catch (error: unknown) {
        const message = getErrorMessage(error as AuthError)
        return { success: false, message }
    }
}

export const getErrorMessage = (error: AuthError): string => {
    switch (error.code) {
        case "auth/invalid-email":
            return "Invalid email format."
        case "auth/invalid-credential":
            return "Invalid email or password."
        case "auth/email-already-in-use":
            return "The email address is already in use."
        case "auth/operation-not-allowed":
            return "Operation not allowed. You may need to enable this provider in your Firebase project settings."
        case "auth/weak-password":
            return "The password is too weak."
        default:
            return "An unknown error occurred. Please try again."
    }
}
