<template>
    <rflex class="variation-checkbox">
        <input type="checkbox" v-model="variationToggle" />
        <label for="variations">This product has variations</label>
    </rflex>

    <cflex class="input-container variations" v-if="variationToggle">
        <label for="variations">Variation Name</label>
        <input
            class="nova-input"
            type="text"
            id="variations"
            v-model="currentVariationInput"
            placeholder="Add variations for easier searching..."
        />
        <Icon @click="addVariation(currentVariationInput), clearInput()" class="icon" icon="material-symbols:add" width="25" />
    </cflex>

    <chips v-if="variationToggle">
        <chip v-for="variation in variations" :key="variation" @click="selectVariation(variation)">
            <div>{{ variation }}</div>
            <Icon class="remove-icon" @click="removeVariation(variation)" icon="material-symbols:close" width="20" />
        </chip>
    </chips>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from "vue"
import { Icon } from "@iconify/vue"

const variationToggle = ref(false)
const variations = ref<string[]>([])
const currentVariationInput = ref("")
const selectedVariation = ref("")

const props = defineProps<{
    modelValue: { variationToggle: boolean; variations: string[]; selectedVariation: string }
}>()

const emit = defineEmits<{
    (event: "update:modelValue", value: { variationToggle: boolean; variations: string[]; selectedVariation: string }): void
}>()

// Watch for changes in `variationToggle` and `variations` and emit updates
watch(
    [variationToggle, variations, selectedVariation],
    () => {
        emit("update:modelValue", {
            variationToggle: variationToggle.value,
            variations: variations.value,
            selectedVariation: selectedVariation.value,
        })
    },
    { deep: true }
)

function clearInput() {
    currentVariationInput.value = ""
}

function addVariation(variation: string) {
    if (variation.trim() === "") return

    variations.value.push(variation.trim())
}

function removeVariation(variation: string) {
    variations.value = variations.value.filter((v) => v !== variation)
}

function selectVariation(variation: string) {
    selectedVariation.value = variation
}
</script>

<style lang="sass" scoped>
.variation-checkbox
  gap: 5px
  align-items: center
  padding-block: 10px

  label
    margin-bottom: 0

.variations
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
