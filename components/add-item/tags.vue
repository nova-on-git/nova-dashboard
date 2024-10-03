<template>
    <cflex class="input-container tags">
        <label for="tags">Tags</label>
        <input class="nova-input" type="input" id="tags" v-model="currentTagInput" placeholder="Add tags for easier searching..." />

        <Icon @click="addTag(currentTagInput), clearInput()" class="icon" icon="material-symbols:add" width="25" />
    </cflex>

    <chips>
        <chip v-for="tag in tags">
            <div>{{ tag }}</div>
            <Icon class="remove-icon" @click="removeTag(tag)" icon="material-symbols:close" width="20" />
        </chip>
    </chips>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const tags = ref([])
const currentTagInput = ref("")

const props = defineProps<{
    modelValue: string[]
}>()

const emit = defineEmits<{
    (event: "update:modelValue", value: string[]): void
}>()

watch(
    tags,
    (newValue) => {
        emit("update:modelValue", newValue)
    },
    { deep: true }
)

function clearInput() {
    currentTagInput.value = ""
}

function addTag(tag: string) {
    if (tag.trim() === "") return

    tags.value.push(tag)
}

function removeTag(tag: string) {
    const index = tags.value.indexOf(tag)

    if (index > -1) {
        tags.value.splice(index, 1)
    }
}
</script>

<style lang="sass" scoped>
.tags
    position: relative
    width: 100%

    input
        margin-bottom: 10px !important

    .icon
        position: absolute
        right: 15px
        top: 37px
        cursor: pointer
        border-radius: 3px

        &:hover
            background: $hover-background

.chips
    display: flex
    flex-wrap: wrap
    gap: 15px

    .chip
        display: flex
        flex-direction: row
        background: $hover-background
        border-radius: 10px
        padding: 5px 10px
        gap: 5px

.remove-icon
    position: relative
    cursor: pointer
    border-radius: 3px

    &:hover
        background: $hover-background
</style>
