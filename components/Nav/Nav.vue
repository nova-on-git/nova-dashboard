<template>
    <div class='nav'>
        <Nav-MobileNav class='MobileNav' />
        <Nav-DesktopNav class='DesktopNav' />
    </div>
</template>

<script setup>

</script>

<style lang='sass' scoped>
.MobileNav
    display: none

@media (max-width: 1300px)

    .DesktopNav
        display: none

    .MobileNav
        display: flex
</style>