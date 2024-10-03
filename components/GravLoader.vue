<template>
    <div id="ctx" class="gravLoader"></div>
</template>

<script setup lang="ts">
const mousePos = ref([0, 0])
function handleMouseMove(event) {
    let mouseX = event.clientX
    let mouseY = event.clientY

    mousePos.value = [mouseX, mouseY]
}

function handleClick(event) {
    const asteroid = document.createElement("div")
    asteroid.classList.add("asteroid")
    asteroid.innerText = "hello"

    const context = document.getElementById("ctx")

    if (context) {
        const rect = context.getBoundingClientRect()

        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        asteroid.style.left = `${x - asteroid.offsetWidth / 2}px`
        asteroid.style.top = `${y - asteroid.offsetHeight / 2}px`

        asteroid.style.position = "absolute"

        // Append the asteroid to the container
        context.appendChild(asteroid)
    }
}

onMounted(() => {
    document.addEventListener("mousedown", handleClick)
    document.addEventListener("mousemove", handleMouseMove)
})
</script>

<style lang="sass">
.asteroid
    position: absolute
    background: red
    height: 50px
    width: 50px
    z-index: 20000
    transition: all 0.1s ease-out
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
</style>

<style lang="sass" scoped>
.gravLoader
    position: fixed
    top: 0
    left: 0
    background: #111
    width: 100%
    height: 100%
    cursor: pointer
    z-index: 10000

    color: white
</style>
