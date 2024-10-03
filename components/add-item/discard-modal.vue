<template>
    <!-- <modal id='discard' ref="modalRef">

        <cflex class="discard-modal admin-box">
            <rflex class="modal-top-row">
                <h6>Are you sure?</h6>
                <btn @click="closeModal('discard')"><Icon icon='material-symbols:close-rounded' width='25' /></btn>
            </rflex>
            
            <rflex>
                <button type="button" class="red-button">
                    DISCARD
                    <Icon icon='ri:delete-bin-5-line' width='20' />
                </button>
                <button type="button" class="darkgrey-button" @click="closeModal('discard')">
                    KEEP MY PRODUCT
                    <Icon icon='icon-park-outline:ad-product' width='20' />
                </button>
            </rflex>

        </cflex>
    </modal> -->
</template>

<script setup lang="ts">
const modalRef = ref<HTMLDivElement | null>(null)
</script>

<style lang="sass" scoped></style>
