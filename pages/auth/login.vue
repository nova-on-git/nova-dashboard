<template>
    <main>
        <form class="nova-form" @submit.prevent="handleEmailSignIn">
            <lheader>
                <h5>Sign In</h5>
                <p>Log in to your account to continue</p>
            </lheader>

            <cflex>
                <label for="email">Email Address</label>
                <input class="nova-input" type="text" name="email" v-model="email" />
            </cflex>

            <cflex>
                <label for="password">Password</label>
                <input class="nova-input" type="password" name="password" v-model="password" />
            </cflex>

            <nuxt-link to="/auth/forgot-password" class="forgot-password-link">Forgot Password?</nuxt-link>

            <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </p>
            <button type="submit" class="submit-button">
                <loader v-if="loading" color="black" />
                <div v-else>Sign In</div>
            </button>

            <div class="nova-form-divider">
                <span>OR CONTINUE WITH</span>
            </div>

            <rflex class="sign-in-options">
                <chip @click="handleGoogleSignIn">
                    <Icon icon="logos:google" height="25" />
                </chip>
            </rflex>

            <p class="no-account-p">Don't have an account? <nuxt-link to="/auth/register">Sign Up</nuxt-link></p>
        </form>
    </main>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "veloris-auth",
})

import { Icon } from "@iconify/vue"

const loading = ref(false)
const email = ref("")
const password = ref("")
const errorMessage = ref("")
// const $CurrentUser = use$CurrentUser()

const handleEmailSignIn = async () => {
    loading.value = true
    let response = await signIn(email.value, password.value)

    if (response.success) {
        navigateTo("/admin")
    } else {
        errorMessage.value = response.message
    }

    loading.value = false
}

const handleGoogleSignIn = async () => {
    const response = await signInWithGoogle()

    if (response.success) {
        navigateTo("/admin")
    } else {
        errorMessage.value = response.message
    }
}
</script>

<style lang="sass" scoped>

main
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background: $admin-background

.error-message
    color: red !important
    font-size: 0.9rem
    margin-inline: auto
    text-align: center

.sign-in-options
    gap: 10px
    flex-wrap: wrap
    margin-bottom: 20px

    .chip

        gap: 10px
        flex-grow: 1
        font-size: 1rem
        padding: 0.5rem 1rem
        background: #e8ecec
        border-radius: 2px
        transition: background 0.15s
        cursor: pointer

        &:hover
            background: #e0dcdc

.forgot-password-link
    margin-left: auto
    font-size: 0.9rem
    color: #2d71ea
    text-decoration: none
    cursor: pointer
    margin-bottom: 15px

    &:hover
        text-decoration: underline

.no-account-p
    margin-inline: auto
    font-size: 0.9rem

    a
        font-size: 0.9rem
        color: #2d71ea !important
        text-decoration: none

        &:hover
            text-decoration: underline
</style>
