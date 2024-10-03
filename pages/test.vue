<template>
    <main><field validate-on="blur" :validator="validation" v-model="input" type="text"></field>{{ input }}</main>
</template>

<script setup lang="ts">
const input = ref("")

function validation(): boolean {
    if (input.value.length > 10) {
        return false
    } else {
        return true
    }
}
</script>

<style lang="sass" scoped></style>
