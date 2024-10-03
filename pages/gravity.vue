<template>
    <main id="page"></main>
</template>

<script setup lang="ts">
const clicking = ref(false)
const mousePos = ref()

// Once per frame //
function step() {}

function createBody() {
    const newBody = document.createElement("div")
    const page = document.getElementById("page")
    newBody.classList.add("asteroid")
    page?.appendChild(newBody)
}

function main() {
    // main loop

    setInterval(() => {
        step()
    }, 17) // 17ms // ~60fps
}

function handleClick(eventName: "down" | "up") {
    if (eventName === "down") {
        clicking.value = true
        createBody()
    } else if (eventName === "up") {
        clicking.value = false
    }
}

function handleMouseDown() {
    handleClick("down")
}

function handleMouseUp() {
    handleClick("up")
}

onMounted(() => {
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    document.addEventListener("mousemove", function (event) {
        const mouseX = event.clientX
        const mouseY = event.clientY

        mousePos.value = [mouseX, mouseY]
    })

    main()
})
</script>

<style lang="sass" scoped>
.asteroid
    position: absolute
    background: red
    border-radius: 50%
    width: 25px
    height: 25px
</style>
