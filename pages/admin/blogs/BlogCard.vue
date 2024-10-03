<template>
    <div
        class="text-5xl font-bold items-baseline rounded-xl bg-white h-[30vh] max-h-[40vh] border-gray-300 w-full flex flex-col justify-between px-3 py-4 border   ">
        <p class="text-4xl font-bold">{{ title }}</p>
        <div class="flex flex-col gap-1 justify-start items-start">
            <p class="text-xl font-bold text-black">{{ description }}</p>
            <p class="text-xs text-black">{{ description }} </p>

        </div>

        <Anchor :to="`/admin${path}`" class="flex cursor-pointer gap-2 items-center hover:text-blue-600 hover:underline">
            <p class="text-xs font-bold">Click here to edit it</p>
            <Icon icon="mdi:arrow-right" class="text-black" width="20" />
        </Anchor >

    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
    title: String,
    description: String,
    path: String
});
</script>

<style scoped>
/* Add your styles here */
</style>
