<template>
	<div class="flex flex-col gap-5 my-4 w-full">
		<div class="text-lg font-medium text-gray-900">{{ title }}</div>
		<div class="flex flex-col bg-white rounded">
			<component
				:is="link.isExternal ? 'a' : 'router-link'"
				class="flex flex-row flex-start p-4 items-center justify-between border-b"
				v-for="link in props.items"
				:key="link.title"
				:to="link.isExternal ? undefined : { name: link.route }"
				:href="link.isExternal ? link.url : undefined"
				@click="link.isExternal ? handleExternalLink($event, link.url) : null"
			>
				<div class="flex flex-row items-center gap-3 grow">
					<component 
						:is="link.icon" 
						class="h-5 w-5 text-gray-500"
						v-bind="link.iconProps || {}"
					/>
					<div class="text-base font-normal text-gray-800">
						{{ link.title }}
					</div>
				</div>
				<FeatherIcon name="chevron-right" class="h-5 w-5 text-gray-500" />
			</component>
		</div>
	</div>
</template>

<script setup>
import { FeatherIcon } from "frappe-ui"

const props = defineProps({
	title: {
		type: String,
		required: false,
		default: "Quick Links",
	},
	items: {
		type: Array,
		required: true,
	},
})

const handleExternalLink = (event, url) => {
	event.preventDefault()
	window.location.href = url
}
</script>
