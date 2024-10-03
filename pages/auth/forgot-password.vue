<template>
    <main>

        <form @submit.prevent="handleResetPassword">
            <lheader>
                <h5>Forgot Password?</h5>
                <p>Enter the email address associated with your account and we will send a link to reset your password.</p>
            </lheader>
            
            <cflex>
                <label for="email">Email Address</label>
                <input type="text" name="email" v-model="email">
            </cflex>

            <p v-if="successMessage" class="success-message">
                {{ successMessage }}
            </p>
            <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </p>
            <button type="submit" class="submit-button">
                <loader v-if="loading" color="black" />
                <div v-else>Reset Password</div>
            </button>

            <p class="no-account-p">Remember your password? <nuxt-link to="/auth/login">Sign In</nuxt-link></p>
        </form>

    </main> 
</template>

<script setup>
import { Icon } from '@iconify/vue'
definePageMeta({
    layout: 'veloris-auth'
})
const loading = ref(false)
const email = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const { $authUtils } = useNuxtApp()

const handleResetPassword = async () => {
    loading.value = true
    let response = await $authUtils.resetPassword(email.value)

    if (response.success) {
        successMessage.value = response.message
    } else {
        errorMessage.value = response.message
    }

    loading.value = false
}

</script>

<style lang='sass' scoped>

main
    height: 100%
    display: flex
    align-items: center
    justify-content: center
    background: $admin-background
    
form 
    display: flex
    background: white
    box-shadow: 0 1px 3px #00000026
    flex-direction: column

    width: 375px
    padding: 25px
    border-radius: 2px

    label
        font-size: 0.8rem
        font-weight: 500
        margin-bottom: 8px

    input
        border: 1px solid rgb(206, 212, 218)
        padding: 10px 
        border-radius: 2px
        margin-bottom: 20px
        min-height: 44px
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0.15s ease-in-out
        
        &:focus
            color: #212529
            background-color: #fff
            border-color: rgba(19, 38, 77, 0.2)
            outline: 0
            box-shadow: 0 0 0 2px rgba(19, 38, 77, 0.125)

    .submit-button
        width: 100%
        background: grey
        padding: 10px 0
        margin: 5px 0
        border-radius: 2px
        min-height: 44px
        font-size: 1rem
        font-weight: 500

    .lheader

        margin-bottom: 30px

        h5
            margin-bottom: 5px
            font-weight: 500

        p
            font-size: 0.8rem
    p
        display: flex
        gap: 5px
        color: grey
        
        a
            text-decoration: underline
            color: black

.success-message
    color: green
    font-size: 0.9rem
    margin-inline: auto
    text-align: left
.error-message
    color: red
    font-size: 0.9rem
    margin-inline: auto
    text-align: left
    
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
    margin-top: 15px
    margin-inline: auto
    font-size: 0.9rem

    a
        font-size: 0.9rem
        color: #2d71ea
        text-decoration: none

        &:hover
            text-decoration: underline
</style>