<template>
    <mpage class="admin-page">
        <header class="dashboard-header">
            <h1>Dev Panel</h1>
        </header>

        <rflex class="action-buttons">
            <btn preset="dark" @click="$Orders.createDummy()">Add order to db</btn>
            <btn preset="dark" @click="$Notifications.createDummy()">Create notification</btn>
        </rflex>

        <rflex>
            <btn preset="dark" @click="generateAdminLink()">admin link</btn>
            <btn preset="dark">Dev link</btn>
        </rflex>

        <rflex>
            <btn preset="dark" @click="$Analytics.refresh()">Refresh Analytics</btn>
            <btn preset="dark" @click="$Emails.sendClientInvitation('codypwakeford@gmail.com')"
                >Send dummy email</btn
            >
            <btn
                @click="
                    $Projects.addProjectDocument('ovvyiFFAaTlNrHxiBcPu', {
                        name: 'Project Quote',
                        url: 'https://pdfobject.com/pdf/sample.pdf',
                        extension: 'pdf',
                        signed: false,
                    })
                "
                >Add dummy project document</btn
            >
        </rflex>

        <!-- <pre>$CurrentUser.get: {{ currentUser }}</pre> -->
        <!-- {{ notifications }} -->
    </mpage>
</template>

<script setup lang="ts">
definePageMeta({
    layout: "dashboard",
    middleware: "admin-auth",
})

const notifications = computed(() => {
    return $Notifications.get
})
const currentUser = computed(() => {
    return $CurrentUser.get
})
function generateAdminLink() {}
</script>

<style lang="sass" scoped>
.rflex
    margin-bottom: 50px
    gap: 25px
.action-buttons
    gap: 10px


    .btn
        width: min-content
        white-space: nowrap
.order-crud
    background: white
    margin: 50px
</style>
