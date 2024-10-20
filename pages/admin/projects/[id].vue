<template>
    <main class="admin-page">
        <nav class="client-nav">
            <mpage class="admin-mpage">
                <anchor
                    @click="selectedTab = 'details'"
                    :class="{ active: selectedTab === 'details' }"
                    >Project Details</anchor
                >

                <anchor
                    @click="selectedTab = 'chatroom'"
                    :class="{ active: selectedTab === 'chatroom' }"
                    >Chatroom</anchor
                >

                <anchor
                    @click="selectedTab = 'design'"
                    :class="{ active: selectedTab === 'design' }"
                    >Design</anchor
                >

                <anchor
                    @click="selectedTab = 'billing'"
                    :class="{ active: selectedTab === 'billing' }"
                    >Billing</anchor
                >

                <anchor
                    @click="selectedTab = 'documents'"
                    :class="{ active: selectedTab === 'documents' }"
                    >Documents</anchor
                >
            </mpage>
        </nav>

        <mpage class="admin-mpage" v-if="project">
            <VelorisClientsBilling v-if="selectedTab === 'billing'" />
            <Chatroom v-if="selectedTab === 'chatroom'" />
            <!-- <VelorisClientsDesign v-show="selectedTab === 'design'" /> -->
            <VelorisClientsDetails v-if="selectedTab === 'details'" />
            <VelorisClientsDocuments v-if="selectedTab === 'documents'" />
        </mpage>
    </main>
</template>

<script setup lang="ts">
const selectedTab = ref<"details" | "chatroom" | "design" | "billing" | "documents">("details")
const route = useRoute()
const projectId = route.params.id as string

const project = computed(() => {
    return $Projects.getProjectById(projectId)
})

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>
.client-nav
    width: 100%
    background: white
    box-shadow: 0px 2px 3px #999


    .mpage
        display: flex
        align-items: center
        height: 50px
        padding-inline: 50px
        gap: 50px
    .anchor
        &.active
            color: blue
</style>
