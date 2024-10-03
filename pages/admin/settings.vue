<template>
    <main>
        <mpage class="admin-mpage">
            <header class="dashboard-header">
                <h1>Settings</h1>
            </header>

            <cflex class="admin-box">
                <h5>Admin</h5>
                <div v-if="users && users.length > 0" class="user-list">
                    <div v-for="user in users" :key="user.id" class="user-item">
                        <p><strong>ID:</strong> {{ user.id }}</p>
                        <p><strong>Email:</strong> {{ user.email }}</p>
                        <p><strong>Role:</strong> {{ user.role }}</p>
                    </div>
                </div>
                <div v-else>No users found</div>
            </cflex>
        </mpage>
        <DashboardFooter />
    </main>
</template>

<script setup lang="ts">
interface UserObj {
    id: string;
    email: string;
    role: string;
}

const users = ref<UserObj[]>([])

onMounted(async () => {
    await $Users.read()
    users.value = $Users.get
})

definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})
</script>

<style lang="sass" scoped>
.admin-box
    padding: 20px
    border-radius: 8px

.user-list
    display: grid
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr))
    gap: 20px

.user-item
    background-color: white
    padding: 15px
    border-radius: 6px
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)

    p
        margin: 5px 0

    strong
        color: #333
</style>