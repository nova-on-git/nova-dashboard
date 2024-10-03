<template>
    <rflex class="welcome-back">
        <h6>Welcome back,</h6>
        <ClientOnly>
            <h6 v-if="$CurrentUser.displayName">{{ $CurrentUser.displayName }}!</h6>
            <h6 v-else>{{ $CurrentUser.email }}!</h6>
        </ClientOnly>
        <slot></slot>
    </rflex>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.welcome-back
    gap: 5px
</style>
