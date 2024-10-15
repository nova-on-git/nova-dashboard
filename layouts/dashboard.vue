<script setup>
import { onClickOutside } from "@vueuse/core"

const sidebar = ref(null)
const router = useRouter()

onClickOutside(sidebar, (event) => {
    if (window.innerWidth < 1400) $Dashboard.closeNav()
})

function checkWindowSize() {
    if (window.innerWidth < 1400) {
        $Dashboard.closeNav()
    } else {
        $Dashboard.openNav()
    }
}

onMounted(() => {
    checkWindowSize()
    window.addEventListener("resize", checkWindowSize)

    router.beforeEach(() => {
        if (window.innerWidth < 1400) {
            $Dashboard.closeNav()
        }
    })
})

onUnmounted(() => {
    window.removeEventListener("resize", checkWindowSize)
})

const dashboardLoading = computed(() => {
    return (
        $Dashboard.loading === undefined ||
        $Dashboard.loading === null ||
        $Dashboard.loading === true
    )
})
</script>

<template>
    <cflex>
        <AdminTopbar />

        <rflex class="content">
            <AdminSidebar />

            <Transition name="page-fade" mode="out-in">
                <NuxtPage />
            </Transition>
        </rflex>

        <DashboardModals />
        <DashboardMessages />

        <Transition name="loader">
            <DashboardLoader v-if="dashboardLoading" />
        </Transition>
    </cflex>
</template>

<style scoped lang="sass">

.content
    align-items: stretch





// Transitions
.button-loading
    position: fixed
    bottom: 100px
    right: 25px
    z-index: 100


.page-fade-enter-active,
.page-fade-leave-active
    transition: opacity 0.2s

.page-fade-enter
    opacity: 0

.page-fade-enter-to,
.page-fade-enter-active
    opacity: 1

.page-fade-leave
    opacity: 1

.page-fade-leave-to
    opacity: 0

.cursor
    background: red
    z-index: 10000000

.loader-enter-active,
.loader-leave-active
    transition: opacity 1s

.loader-enter
    opacity: 0

.loader-enter-to,
.loader-enter-active
    opacity: 1

.loader-leave
    opacity: 1

.loader-leave-to
    opacity: 0
</style>
