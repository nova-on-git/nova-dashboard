<template>
    <main>
        <form @submit.prevent="handleEmailSignUp">
            
            <lheader>
                <h5>Confirm email address</h5>
            </lheader>
            
            <rflex class="green-box">
                <Icon icon='icon-park-outline:inbox-success' width='50' />
                <p>A confirmation email was sent to <strong>{{ verifyEmail }}</strong></p>
            </rflex>

            <p>Before proceeding, we must verify the authenticity of your inbox.</p>
            <p>
                Check the mailbox! After receiving the email, click on the link provided to confirm the email address.
            </p>
         


            <p class="no-account-p">Back to <nuxt-link to="/auth/login">Sign In</nuxt-link> page.</p>

        </form>
    </main> 
</template>

<script setup>
import { Icon } from '@iconify/vue' 

const verifyEmail = ref('')

onMounted(() => {
    verifyEmail.value = localStorage.getItem('verifyEmail')
})

definePageMeta({
    layout: 'veloris-auth'
})
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
    flex-direction: column

    background: white
    box-shadow: 0 1px 3px #00000026

    width: 375px
    padding: 25px
    border-radius: 2px

    .lheader
        margin-bottom: 20px

    h5
        margin-bottom: 5px
        font-weight: 500

    
    a
        text-decoration: underline
        color: black
    p
        font-size: 0.95rem
        margin-bottom: 25px

.green-box
    background: #b8e494
    padding: 10px 20px
    border-radius: 2px
    gap: 25px
    line-height: 1.2
    margin-bottom: 20px

    p
        margin-bottom: 0
        font-size: 0.9rem
.no-account-p
    font-size: 0.9rem
    display: flex
    gap: 3px
    margin-bottom: 0

    a
        font-size: 0.9rem
        color: #2d71ea
        text-decoration: none

        &:hover
            text-decoration: underline
</style>
