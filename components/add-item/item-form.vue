<template>
    <cflex class="item-details admin-box nova-form">
        <h5>Product Details</h5>

        <!-- TODO: Not finished, this will allow for different info based on type, color etc... -->
        <!-- <AddItemVariations v-model:modelValue="variationOutput" /> -->

        <cflex v-if="$velorisConfig.itemFormStruct.categories">
            <label for="category">Category</label>
            <div class="select-category">
                <select id="" v-model="formData.category">
                    <option value="" selected>Select a category</option>
                    <option :value="option" v-for="option in categories">{{ option }}</option>
                </select>
                <div class="or-divider">or</div>
                <div class="input">
                    <input
                        type="text"
                        v-model="formData.category"
                        placeholder="Create a new category"
                        :class="{ 'full-width': newCategory }"
                    />
                </div>
            </div>
        </cflex>

        <cflex v-for="field in itemFormStruct.fields" class="input-container">
            <rflex class="inline-inputs" v-if="field.type === '_inline'" :style="{ order: Number(field.order) }">
                <cflex class="input-container" v-for="_field in field.fields">
                    <label :for="_field.name">{{ formatLabel(_field.name) }}</label>
                    <input
                        required
                        class="nova-input"
                        :type="_field.type"
                        v-model="formData[_field.name]"
                        :placeholder="`Enter ${formatLabel(_field.name)}`"
                    />
                </cflex>
            </rflex>

            <cflex
                v-else-if="field.type === 'radio'"
                class="input-container radio"
                :style="{ order: Number(field.order) }"
                :class="{ 'inline-boxes': field.style === 'inline-box' }"
            >
                <label v-if="field.style != 'inline-box'">{{ field.name }}</label>
                <label v-for="item in field.values" :class="{ selected: formData[field.name] === item }">
                    <input required type="radio" :value="item" v-model="formData[field.name]" />
                    {{ item }}
                </label>
            </cflex>

            <cflex v-else-if="field.type === 'textarea'" class="input-container" :style="{ order: Number(field.order) }">
                <label :for="field.name">{{ formatLabel(field.name) }}</label>
                <textarea
                    required
                    class="nova-input"
                    :name="field.name"
                    rows="5"
                    v-model="formData[field.name]"
                    :placeholder="`Enter ${formatLabel(field.name)}`"
                />
            </cflex>

            <cflex v-else class="input-container" :style="{ order: Number(field.order) }">
                <label :for="field.name">{{ formatLabel(field.name) }}</label>
                <input
                    class="nova-input"
                    :type="field.type"
                    required
                    :name="field.name"
                    v-model="formData[field.name]"
                    :placeholder="`Enter ${formatLabel(field.name)}`"
                />
            </cflex>
        </cflex>

        <!-- Not finished -->
        <!-- <AddItemTags v-model="formData.tags"/> -->

        <cflex class="input-container">
            <label for="stock">Stock Level</label>
            <input class="nova-input" type="input" required v-model="formData['stockLevel']" :placeholder="'Enter stock on hand'" />
        </cflex>
    </cflex>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const props = defineProps<{
    modelValue: Product | {}
}>()

// const $Products = use$Products()
const formData = ref<Record<string, any>>(
    props.modelValue || {
        tags: [],
        category: [],
    }
)

import velorisConfig from "~/veloris.config"
const $velorisConfig: VelorisConfig = velorisConfig

const emit = defineEmits<{
    (event: "update:modelValue", value: ProductImage[]): void
}>()

watch(
    formData,
    (newValue) => {
        emit("update:modelValue", newValue)
    },
    { deep: true }
)

const categories = computed(() => $Products.getCategories)

const selectedCategory = ref("")
const newCategory = ref("")
const getOptions = (value: string) => {
    if (Array.isArray(value)) {
        return value
    }
    return []
}
const itemFormStruct = $velorisConfig.itemFormStruct
initProductForm(itemFormStruct)
function initProductForm(itemFormStruct: ProductFormStructure) {
    for (const [key, value] of Object.entries(itemFormStruct)) {
        if (key === "_inline") {
            for (const [_key, _value] of Object.entries(value)) {
                if (Array.isArray(_value)) {
                    formData.value[_key] = value[0]
                } else {
                    formData.value[_key] = ""
                }
            }
        }

        if (Array.isArray(value)) {
            formData.value[key] = value[0]
        } else if (key === "_inline") continue
        else {
            formData.value[key] = ""
        }
    }
}

const formatLabel = (key: string) => key.charAt(0).toUpperCase() + key.slice(1)
</script>

<style lang="sass" scoped>
.radio
    label
        text-transform: capitalize

    input
        margin: 0

.select-category
    display: grid
    grid-template-columns: calc( 50% - 20px ) 10px calc( 50% - 20px )
    grid-gap: 15px
    width: 100%
    padding-block: 0 10px
    position: relative

    .or-divider
        line-height: 2

    select, input
        width: calc( 100% )
        padding: 5px 10px
        border: 1px solid rgba(0,0,0,0.2)
        transition: max-width 0.15s ease, padding 0.15s ease, border 0.15s ease


        &.full-width
            position: absolute
            max-width: 100%
            left: 0

.inline-inputs
    align-items: start
    gap: 1.5rem

    input
        width: 100%
    .input-container
        flex-grow: 1
.item-details
    min-width: 425px
    min-height: 450px

    h5
        font-weight: bold
        margin-bottom: 25px
.bottom-row
    align-items: end
    justify-content: space-between




// Radios

.inline-boxes
    display: flex
    flex-direction: row
    align-items: center
    gap: 10px

    label
        cursor: pointer
        border: 1px solid rgba(0, 0, 0, 0.3)
        height: 40px
        width: 50px
        display: flex
        align-items: center
        justify-content: center

        &.selected
            border: 2px solid black

    input
        padding: 25px
        display: none
</style>
