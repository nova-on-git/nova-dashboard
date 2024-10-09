<template>
    <div class="top-bar">
        
        <rflex class="left-content">
            <div class="logo-container">
                VelorisDesigns
            </div>

            <search  placeholder="Search anything..." class="search"/>
        </rflex>

        <ClientOnly>
            <div class="right-content">
                <div class="user-details">
                    <div class="user-info">
                        <div class="user-name">{{ $CurrentUser.displayName }}</div>
                        <div class="user-email">{{ $CurrentUser.email }}</div>
                    </div>
                    <btn class="icon-button user-button">
                        <Icon icon="iconamoon:profile" width="25" />

                        <drop class="user-dropdown">
                            <button class="sign-out-btn" @click="$CurrentUser.logout()">Sign Out</button>
                        </drop>
                    </btn>
                </div>

                <btn class="icon-button notification">
                    <div v-if="$Notifications.unreadLength > 0" class="notification-badge">
                        {{ $Notifications.unreadLength }}
                    </div>

                    <Icon icon="material-symbols:notifications-active-outline" width="25" />

                    <drop class="notification-dropdown">
                        <NotificationDropdown />
                    </drop>
                </btn>
            </div>
        </ClientOnly>
    </div>
</template>

<script setup>
import { Icon } from "@iconify/vue"
</script>

<style scoped lang="sass">
.top-bar
    display: flex
    justify-content: space-between
    align-items: center
    padding: 0 1rem
    height: $dashboard-topbar-height
    background-color: black
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1)
    color: white

:deep(.search)
    background: #222

    input
        color: white

.menu-button,
.icon-button
    background: none
    border: none
    cursor: pointer
    padding: 0.5rem
    border-radius: 50%
    transition: background-color 0.3s ease


.menu-button:hover,
.icon-button:hover
    background-color: rgba(0, 0, 0, 0.05)

.left-content
    .logo-container
        width: 250px
.right-content
    display: flex
    align-items: center
    gap: 0.1rem


.user-details
    display: flex
    align-items: center
    gap: 0.5rem


.user-info
    text-align: right
    transition: all 0.3s
    opacity: 1
    margin-right: 0.75rem
    max-width: 200px


.user-name
    font-weight: 600
    font-size: 0.9rem
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis


.user-email
    color: #666
    font-size: 0.8rem
    white-space: nowrap
    overflow: hidden
    text-overflow: ellipsis


.notification
    position: relative

    .drop
        right: 40px
        z-index: 100


.notification-badge
    position: absolute
    top: -5px
    right: -5px
    background-color: #ff4d4f
    color: white
    font-size: 0.7rem
    font-weight: bold
    min-width: 18px
    height: 18px
    border-radius: 9px
    display: flex
    justify-content: center
    align-items: center
    padding: 0 4px


.user-dropdown,
.notification-dropdown

    position: absolute
    top: 100%
    background-color: white
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
    border-radius: 4px
    padding: 0.5rem
    z-index: 10

.user-dropdown
    top: 120%
    right: 00px

.sign-out-btn
    white-space: nowrap
    background-color: #ff4d4f
    color: white
    border: none
    padding: 0.5rem 1rem
    border-radius: 4px
    cursor: pointer
    transition: background-color 0.3s ease


.sign-out-btn:hover
    background-color: #ff7875


@media (max-width: 768px)
    .user-info
        opacity: 0
        max-width: 0
        margin-right: 0
        overflow: hidden


    .right-content
        gap: 0.25rem


    .user-details
        gap: 0.25rem



@media (max-width: 480px)
    .top-bar
        padding: 0 0.5rem


    .menu-button,
    .icon-button
        padding: 0.25rem


    .notification
        margin-left: auto
</style>
