<template>
    <main>
        <form class="nova-form" @submit.prevent="handleSignUp('email')">
            <lheader>
                <h5>Sign Up</h5>
                <p>Fill out the form to create a new account.</p>
            </lheader>

            <cflex>
                <label for="email">Email Address</label>
                <input
                    class="nova-input"
                    type="text"
                    name="email"
                    v-model="email"
                />
            </cflex>

            <cflex>
                <label for="password">Password</label>
                <input
                    class="nova-input"
                    type="password"
                    name="password"
                    v-model="password"
                />
            </cflex>

            <p v-if="successMessage" class="success-message">
                {{ successMessage }}
            </p>
            <p v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </p>

            <button type="submit">
                <loader color="black" v-if="loading" />
                <div v-else>Sign Up</div>
            </button>

            <div class="divider">
                <span>OR CONTINUE WITH</span>
            </div>

            <rflex class="sign-in-options">
                <chip @click="handleSignUp('google')">
                    <Icon icon="logos:google" height="25" />
                </chip>
            </rflex>

            <p class="no-account-p">
                Already have an account?
                <nuxt-link to="/auth/login">Sign In</nuxt-link>
            </p>
        </form>
    </main>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

async function handleSignUp(provider: Provider) {
    if (provider === "email") loading.value = true;
    const error = await signUp(provider, email.value, password.value);

    if (error) {
        successMessage.value = "";
        errorMessage.value = error;
    } else {
        localStorage.setItem("verifyEmail", email.value);
        navigateTo("/auth/verify-email");
    }

    loading.value = false;
}

definePageMeta({
    layout: "veloris-auth",
});
</script>

<style lang="sass" scoped>

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
        margin-bottom: 26px
        min-height: 44px
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, background 0.15s ease-in-out

        &:focus
            color: #212529
            background-color: #fff
            border-color: rgba(19, 38, 77, 0.2)
            outline: 0
            box-shadow: 0 0 0 2px rgba(19, 38, 77, 0.125)
    button
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

.divider
    margin-inline: auto
    font-size: 0.75rem
    color: rgba(0,0,0,0.6)
    position: relative
    width: 100%
    margin-block: 25px
    display: flex
    justify-content: center

    span
        position: relative
        z-index: 2
        background: white
        padding-inline: 10px


    &::before
        content: ""
        width: 100%
        top: 50%
        height: 1px
        background: rgba(0,0,0,0.1)
        position: absolute

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
