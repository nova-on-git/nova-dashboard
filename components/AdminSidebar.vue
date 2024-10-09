<template>
    <div class="admin-nav">
        <cflex class="admin-nav-links">
			<div v-for="(subHeaders, subHeaderKey) in $velorisConfig.sections.subheaders" class="link-group">
				<div class="link-group-header">{{ subHeaderKey }}</div>
				<div v-for="(section, sectionKey) in subHeaders" :style="{ order: section?.order }">
					<div v-for="page of section?.pages" key="key">
						<div v-if="$velorisConfig.sectionSwitches[sectionKey] === true">
							<anchor @click="" :to="page.url" class="page row" >
								<Icon :icon="page.icon" color="white" width="25px" />
								{{ page.name }}
							</anchor>

							<cflex class="subpages">
								<anchor @click="" :to="subpage.url" class="page subpage subpage-link" v-for="subpage in page.subpages">
									{{ subpage.name }}
								</anchor>
							</cflex>
						</div>
					</div>
				</div>
			</div>
        </cflex>

        <cflex class="bottom-links">
            <anchor to="/" class="link-container row">
                <Icon icon="pepicons-pop:leave" width="25px" color="white" style="transform: scaleX(-1)" />
                Back to Site
            </anchor>
        </cflex>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue"
const $velorisConfig = useVelorisConfig()

</script>

<style lang="sass" scoped>
.link-group-header
	color: #666
	font-weight: bold
	text-transform: uppercase
	font-size: 0.7rem
	margin-inline: 20px
	margin-bottom: 10px
	
.link-group
	margin-bottom: 50px

.router-link-active
	background: rgba(255, 255, 255, 0.1)

.admin-nav
	position: relative
	background: #121212
	display: flex
	flex-direction: column
	width: 250px
	padding: 25px 0
	gap: 25px
	height: $dashboard-content-height 
	
	.anchor
		padding: 12px 0px
		color: white
		font-size: 1rem
		text-transform: capitalize
		font-weight: 400

	.row
		padding-inline: 25px

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
