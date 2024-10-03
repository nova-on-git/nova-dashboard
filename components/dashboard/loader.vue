<template>
    <div>
        <mflex class="dashboard-loader">
            <div class="background" />
            <h2>Veloris Technology</h2>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" class="svg-icon">
                <path
                    fill="none"
                    stroke="#000000"
                    stroke-width="25"
                    stroke-linecap="round"
                    stroke-dasharray="300 385"
                    stroke-dashoffset="0"
                    d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
                >
                    <animate
                        attributeName="stroke-dashoffset"
                        calcMode="spline"
                        dur="1.25"
                        values="685;-685"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                    ></animate>
                </path>
            </svg>
        </mflex>
    </div>
</template>

<style lang="sass" scoped>
.mflex
    position: absolute
    height: 100%
    width: 100%
    z-index: 10000

    .background
        position: absolute
        z-index: 10000
        background: white
        height: 100%
        width: 100%

    h2
        font-size: 2rem
        font-weight: thin
        margin-bottom: 15px
        z-index: 100001


.svg-icon
    width: 75px
    height: 30px
    z-index: 100001

.dashboard-loader
    position: absolute
    top: 50%
    left: 50%
    transform: translate(-50%, -50%)
    opacity: 1
</style>
