<template>
    <section ref="notificationBox">
        <rflex class="top-row">
            <p class="notif-title text-xl">Notifications</p>
            <anchor>Mark all as read</anchor>
        </rflex>
        <rflex class="notification" v-for="notification in $Notifications.getUnread.slice(0, 10)" :class="{ read: notification.read }">
            <mflex class="icon-container" :style="{ backgroundColor: notification.style.backgroundColor }">
                <Icon
                    class="icon"
                    :icon="notification.style.icon"
                    width="25"
                    :color="darkenColor(notification.style.backgroundColor, 50)"
                    :key="notification.id"
                />
            </mflex>

            <cflex>
                <h2>{{ notification.title }}</h2>
                <p>{{ notification.message }}</p>
            </cflex>
        </rflex>
    </section>
</template>

<script setup lang="ts">
const notificationBox = ref(null)
import { onClickOutside } from "@vueuse/core"
import { Icon } from "@iconify/vue"

onClickOutside(notificationBox, () => {
    setTimeout(() => {
        $Notifications.closePopUp()
    }, 0)
})

const darkenColor = (hex: string, percentage: number): string => {
    // Remove the hash at the start if it's there
    hex = hex.replace(/^#/, "")

    // Convert 3-character hex to 6-character hex
    if (hex.length === 3) {
        hex = hex
            .split("")
            .map((char) => char + char)
            .join("")
    }

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    // Calculate the new color values
    const darken = (color: number) => Math.max(0, Math.min(255, Math.floor(color * (1 - percentage / 100))))

    const newR = darken(r)
    const newG = darken(g)
    const newB = darken(b)

    // Convert RGB back to hex
    const toHex = (c: number) => c.toString(16).padStart(2, "0")
    return `#${toHex(newR)}${toHex(newG)}${toHex(newB)}`
}
</script>

<style lang="sass" scoped>
section
    position: absolute
    top: 13px
    right: -50px
    overflow: auto
    background: white
    width: 300px
    box-shadow: $shadow-dark
    max-height: 388px
.notif-title 
    
.top-row
    border-bottom: 1px solid $faint-grey
    padding-inline: 20px
    padding-block: 8px 5px
    justify-content: space-between
    h1
        font-size: 0.8rem

    .anchor
        color: blue
        padding: none !important
        border: none
        font-size: 0.7rem


.notification
    border-bottom: 1px solid rgba(0, 0, 0, 0.05)
    padding: 10px 25px
    gap: 15px

    &:hover
        background: rgba(0, 0, 0, 0.1)
        cursor: pointer

    h2
        font-size: 1rem
        font-weight: bold

    p
        font-size: 0.9rem

    .icon-container
        border-radius: 5px
        height: 50px
        width: 50px
</style>
