<template>
    <div class="admin-nav">
        <cflex class="top-row row">
            <h1 class="logo">VS</h1>
            <h2>Veloris Designs</h2>
        </cflex>

        <cflex class="admin-nav-links" v-if="$velorisConfig">
            <div v-for="(section, sectionKey) in $velorisConfig.sections" :style="{ order: section?.order }">
                <div v-for="page of section?.pages">
                    <anchor @click="" :to="page.url" class="page row" v-if="$velorisConfig.sectionSwitches[sectionKey]">
                        <!-- v-if="$velorisConfig.sectionSwitches[sectionKey]" -->
                        <Icon :icon="page.icon" color="white" width="20px" />
                        {{ page.name }}
                    </anchor>

                    <cflex class="subpages">
                        <anchor @click="" :to="subpage.url" class="page subpage subpage-link" v-for="subpage in page.subpages">
                            {{ subpage.name }}
                        </anchor>
                    </cflex>
                </div>
            </div>
        </cflex>

        <cflex class="bottom-links">
            <anchor to="/" class="link-container row">
                <Icon icon="material-symbols:arrow-left-alt" width="20px" color="white" />
                Back to Site
            </anchor>
        </cflex>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
// import { useVelorisConfig } from "~~/composables/useVelorisConfig"

const $velorisConfig = useVelorisConfig()
</script>

<style lang="sass" scoped>
.router-link-active
	background: rgba(255, 255, 255, 0.1)

.admin-nav
	position: relative
	background: rgba(0, 0, 0, 1)
	display: flex
	flex-direction: column
	width: 240px
	padding: 20px 0
	gap: 25px
	height: 100%

	.anchor
		padding: 8px 0px
		color: white
		font-size: 0.9rem
		text-transform: capitalize
		font-weight: 400

	.row
		padding-inline: 20px

	.top-row
		align-items: center
		border-bottom: 2px solid #50545c
		padding-bottom: 20px

		h1
			font-family: "Montserrat", sans-serif
			color: white
			font-weight: 100
			line-height: 1
			margin-top: 5px

		h2
			font-weight: 400
			text-align: center
			font-size: 0.8rem
			opacity: 1
			font-family: "Montserrat", sans-serif
			color: white

	.user-row
		color: white
			padding-right: 20px

		.email
			font-size: 0.9rem
			color: rgba(255, 255, 255, 0.6)

	.admin-nav-links
		margin-top: 10px

	.links-container
		display: flex
		flex-direction: column

	.page
		gap: 15px
		cursor: pointer

		&:hover
			background: rgba(255, 255, 255, 0.1)

		&.subpage-link
			padding-left: 60px
			font-size: 0.8rem
			opacity: 1


	.bottom-links
		margin-top: auto

		&:hover
			background: rgba(255, 255, 255, 0.1)
</style>
