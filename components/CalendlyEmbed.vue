<template>
    <div class="calendly-inline-widget">
        <div ref="calendlyWidget" style="min-width: 320px; height: 630px"></div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"

const calendlyLink =
    "https://calendly.com/codypwakeford?hide_landing_page_details=1&hide_gdpr_banner=1"
const calendlyWidget = ref(null)

onMounted(() => {
    // Load Calendly widget script
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true

    script.onload = () => {
        // Initialize the Calendly widget
        window.Calendly.initInlineWidget({
            url: calendlyLink,
            parentElement: calendlyWidget.value,
            prefill: {},
            utm: {},
        })
    }

    document.body.appendChild(script)
})
</script>

<style scoped>
.calendly-embed {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
