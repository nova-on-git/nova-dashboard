<template>
    <div class="layout-container">
        <AdminSidebar ref="sidebar" class="admin-nav" :class="{ 'nav-closed': !$Dashboard.isNavOpen }" />

        <div class="content" :class="{ 'content-shifted': $Dashboard.isNavOpen }">
            <AdminTopbar />

            <Transition name="page-fade" mode="out-in">
                <NuxtPage />
            </Transition>
        </div>

        <!-- Store all modals -->
        <DashboardModals />
        <DashboardMessages />
    </div>

    <!-- <Transition name="loader">
        <DashboardLoader v-if="$Dashboard.loading" />
    </Transition> -->

    <!-- <ClientOnly>
        <btn @click="$Dashboard.toggleLoadingState()" class="button-loading"
            >Loading: {{ $Dashboard.loading }}
        </btn>
    </ClientOnly> -->
</template>

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
</script>

<style scoped lang="sass">

.layout-container
    display: flex
    height: 100%
    overflow: hidden
    background: $admin-background


.admin-nav
    width: 250px
    transition: left 0.15s ease, width 0.15s ease
    position: relative
    z-index: 5
    left: 0px

    &.nav-closed
        width: 0
        left: -250px


.content
    flex: 1
    transition: margin-left 0.15s ease
    position: relative



@media (width < 1400px)
    .admin-nav
        position: absolute

    .content-shifted
        &::after
            content: ""
            position: absolute
            top: 0
            left: 0
            height: 100%
            width: 100%
            background: rgba(255, 255, 255, 0.8)
            z-index: 2



// Transitions

.gravLoader
    position: absolute
    background: #111
    width: 100%
    height: 100%
    z-index: 100000000000000000000000000000
.button-loading
    position: fixed
    bottom: 100px
    right: 25px
    z-index: 1000000000000000


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
