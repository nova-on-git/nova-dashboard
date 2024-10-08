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

import type {  AuthError, UserCredential, User } from "firebase/auth"

/** Used to sign in with any provider. Will return an error string if there is an issue. */
export async function signIn (provider: Provider, email?: string, password?: string): Promise<string> {

    let error
    switch (provider) {
        case "email":
            if (!email || !password) throw new Error("Email and password are required for email sign-in.")
            error = await signInWithEmail(email, password)
            break

        case "google":
            error = await signInWithGoogle()
            break
    }

    return error
}

/** Used to sign up with any provider. Will return an error string if there is an issue. */
export async function signUp(provider: Provider, email?: string, password?: string): Promise<string> {

    let error
    switch (provider) {
        case "email":
            if (!email || !password) throw new Error("Email and password are required for email sign-in")
            error = await signUpWithEmail(email, password)
            break

        case "google":
            error = await signInWithGoogle()
            break
    }

    return error
}


export const signInWithEmail = async (email: string, password: string): Promise<string> => {
    const $auth = useAuth()

    try {
        await setPersistence($auth, browserLocalPersistence)
        const userCredential: UserCredential = await signInWithEmailAndPassword($auth, email, password)
        const user: User = userCredential.user

        if (!user.emailVerified) {
            return "Please verify your email before logging in."
        }

        return navigateTo("/admin")
    } catch (error: unknown) {
        const message = getErrorMessage(error as AuthError)
        return message
    }
}

export async function signUpWithEmail(email: string, password: string): Promise<string> {
    const $auth = useAuth()
    try {
        const userCredential: UserCredential = await createUserWithEmailAndPassword($auth, email, password)
        const user: User = userCredential.user

        await sendEmailVerification(user)
        return "Account created! A verification email has been sent. Please verify your email before logging in."

    } catch (error: unknown) {
        const message = getErrorMessage(error as AuthError)
        return message 
    }
}

export async function signInWithGoogle(): Promise<string> {
    const $auth = useAuth()
    const provider = new GoogleAuthProvider()

    if ($CurrentUser.isAdmin) {
        navigateTo("/admin")
        return ""
    }

    try {
        await setPersistence($auth, browserLocalPersistence)
        const userCredential: UserCredential = await signInWithPopup($auth, provider)
        const user: User = userCredential.user

        if (user.providerData.some((provider) => provider.providerId === "password") && !user.emailVerified) {
            return "Please verify your email before loggin in."
        }

        navigateTo("/admin")
        return ""
       
    } catch (error: unknown) {
        console.error("Error signing in with Google:", error)
        const message = getErrorMessage(error as AuthError)
        return message 
    }
}

export async function resetPassword(email: string) {
    const $auth = useAuth()
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
