<template>
    <rflex class="footer">
        <rflex>
            <div>© 2024 Veloris</div>
        </rflex>
        <div>|</div>
        <anchor to="https://velorisdesigns.com" target="_blank">Veloris Designs</anchor>
        <rflex></rflex>
    </rflex>
</template>

<script setup lang="ts"></script>

<style lang="sass" scoped>
.footer
    gap: 5px
    margin-inline: auto
    margin-block: 10px
    width: 100%
    justify-content: center
    font-size: 0.8rem
    background: $admin-background
    padding: 3px 10px
    border-radius: 20px

    .anchor
        color: blue
</style>
