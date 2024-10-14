<template>
    <div class="svg-container">
        <svg viewBox="0 0 800 100" preserveAspectRatio="xMidYMid meet">
            <!-- Line connecting the phases -->
            <line x1="50" y1="50" x2="750" y2="50" stroke="#ccc" stroke-width="6" />

            <!-- Filled line for completed phases -->
            <line x1="50" y1="50" :x2="currentPhaseX" y2="50" stroke="#1a73e8" stroke-width="6" />

            <!-- Circles for each phase -->
            <circle
                v-for="(phase, index) in phases"
                :key="phase"
                :cx="phasePositions[index]"
                cy="50"
                r="10"
                :fill="index <= currentPhaseIndex ? '#1a73e8' : '#ccc'"
            />

            <!-- Highlight the current phase -->
            <circle :cx="currentPhaseX" cy="50" r="10" fill="#1a73e8" />

            <!-- Labels for each phase -->
            <text
                v-for="(phase, index) in phases"
                :key="phase + '-label'"
                :x="phasePositions[index]"
                y="80"
                text-anchor="middle"
            >
                {{ phase }}
            </text>
        </svg>
    </div>
</template>

<script setup lang="ts">
// Define the project phases
const phases = [
    "onboarding",
    "discovery",
    "design",
    "development",
    "final approval",
    "testing",
    "launch",
    "live",
]

// Calculate the current phase index
const currentPhaseIndex = computed(() => {
    return phases.indexOf(props.phase)
})

interface Props {
    phase: ProjectPhase
}

const props = defineProps<Props>()

const phasePositions = [
    50, // Onboarding
    150, // Discovery
    250, // Design
    350, // Development
    450, // Final Approval
    550, // Testing
    650, // Launch
    750, // Live
]

// Calculate the x-coordinate for the current phase
const currentPhaseX = computed(() => {
    return phasePositions[currentPhaseIndex.value]
})
</script>

<style lang="sass" scoped>
.svg-container
    max-width: 100% // Set a maximum width for the container if needed
    overflow: hidden // Hide any overflow
    margin: auto // Center the container

svg
    width: 100% // Fill the container
    height: 100% // Maintain height
</style>
