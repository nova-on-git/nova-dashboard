<!-- settings-card.vue -->
<template>
    <div class="card">
        <h2>{{ title }}</h2>
        <div class="card-content">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
    max-width: 300px;
    margin: 16px;

    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    }
}

.card-content {
    padding: 16px;
}
</style>
