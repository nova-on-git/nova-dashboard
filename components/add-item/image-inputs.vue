<template>
        <div class="image-input-container">
            
            <div class="main-image admin-box">
                <div class="image-input-box"  @click="triggerFileInput">

                    <cflex class="input-trigger" v-if="!images.length" >
                        <Icon icon='material-symbols:add-photo-alternate-outline' width='50' />
                        <div>Click here to select an image</div>
                    </cflex>

                    <input 
                        required
                        ref="fileInput" 
                        type="file" 
                        id="fileInput"
                        multiple 
                        accept="image/*" 
                        @change="handleFiles" 
                        class="image-input"
                    >

                    <img 
                        v-if="images.length && images[focusedImageIndex].fullSize" 
                        :src="images[focusedImageIndex].fullSize" 
                        :key="index"  
                        alt="Image Preview" 
                    />
                    <img 
                        v-else-if="images.length && images[focusedImageIndex].localUrl" 
                        :src="images[focusedImageIndex].localUrl" 
                        alt="Image Preview" 
                    />
                </div>
            </div>

            <rflex class="image-previews admin-box" v-if="images.length" >
                <div class="image-box"
                    v-for="(image, index) in images">

                    <div class="image-container">

                        <img
                            v-if="image.preview"
                            :src="image.preview"
                            :class="{'selected-image': index === focusedImageIndex}"
                            @click="updateFocusedImage(index)"
                        >

                        <img
                            v-else
                            :src="image.localUrl"
                            :class="{'selected-image': index === focusedImageIndex}"
                            @click="updateFocusedImage(index)"
                        >
                    
                        <button class="remove-image-button" type="button" @click="removeImage(index)">
                            <Icon icon='material-symbols:close-rounded' width='25' />
                        </button>
                    </div>

                    <button type="button" @click="changeImageOrder( index, -1)">
                        <Icon icon='material-symbols:arrow-back-rounded' width="25"/>
                    </button>
                    <button  type="button" @click="changeImageOrder( index, 1)">
                        <Icon icon='material-symbols:arrow-forward-rounded' width="25"/>
                    </button>
                </div>
            </rflex>
        </div>

</template>

<script setup lang="ts">
const fileInput = ref('fileInput');
import { Icon } from '@iconify/vue'
const focusedImageIndex = ref(0)
const props = defineProps<{
    modelValue: ProductImage[]
}>();
const images = ref<ProductImage[]>(props.modelValue || []) 


function triggerFileInput() {
    fileInput.value.click();
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: ProductImage[]): void
}>();

watch(images, (newValue) => {
  emit('update:modelValue', newValue);
}, { deep: true });

function changeImageOrder(fromIndex: number, increment: number) {
    const toIndex = fromIndex + increment

    if (toIndex < 0 || toIndex >= images.value.length) return

    const imageObj = images.value[fromIndex]
    images.value.splice(fromIndex, 1)
    images.value.splice(toIndex, 0, imageObj) 

    focusedImageIndex.value = toIndex;
}
    

function updateFocusedImage(index: number) {
    focusedImageIndex.value = index
}

function removeImage(index: number) {
    images.value.splice(index, 1)
}

async function handleFiles(event: Event) {
    const input = event.target as HTMLInputElement

    if (input.files) {
        
        for (const file of input.files) {
            const localUrl = URL.createObjectURL(file)

            const image: ProductImage = {
                file: file,
                localUrl: localUrl,
                preview: '',
                fullSize: ''
            }

            images.value.push(image)
        }

    }
}

</script>

<style lang='sass' scoped>

.image-input-box
    display: flex
    flex-direction: column
    cursor: pointer
    align-items: center
    height: 100%
    justify-content: center
    min-height: 400px

    &:hover
        background: #f8f8f8

    .input-trigger
        justify-content: center
        align-items: center
        gap: 10px
        cursor: pointer
        width: 100%
        height: 100%

    .image-input
        opacity: 0


.image-input-container
    min-height: 400px
    transition: height 0.3s
    flex-grow: 1

    label
        margin-bottom: 5px
        font-size: 0.9rem
        font-weight: 400
    
.image-container
    padding: 15px
    border: 10px solid black

.main-image
    min-height: 400px
    min-width: 550px

    .image-container
        height: 100%
        min-height: 400px
        display: flex
        align-items: center
        justify-content: center
        cursor: pointer
  
    img
        width: 100%

.image-previews
    overflow-x: auto
    align-items: start
    gap: 15px
    
    .image-container
        position: relative
        cursor: pointer
        min-height: 100px
        align-items: center
        padding: 10px
        border: 8px solid black

        &:hover
            .remove-image-button
                display: flex

        &.selected-image    
            outline: 3px solid rgba(0, 0, 0, 0.3)


    img
        width: 150px
        margin-block: auto

        &.selected-image    
            outline: 3px solid rgba(0, 0, 0, 0.3)

    .remove-image-button
        display: none
        position: absolute
        background: rgba(255, 255, 255, 0.5)
        padding: 3px
        top: 10px
        right: 10px
</style>