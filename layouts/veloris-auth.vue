<template>

    <NuxtPage />

    <div class="bottom-message">
        <rflex>Another solution crafted with care by the team at <anchor to="https://velorisdesigns.com" target="_blank">Veloris Designs</anchor></rflex>
    </div>

</template>

<script setup>

</script>

<style lang='sass' scoped>
.bottom-message
    position: absolute
    bottom: 25px
    left: 50%
    transform: translate(-50%)
    opacity: 0.8
    font-size: 0.9rem
    
    .rflex
        gap: 5px

        .anchor
            text-decoration: underline
</style>