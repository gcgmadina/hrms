<template>
	<ion-app>
		<ion-router-outlet id="main-content" />
		<Toasts />

		<InstallPrompt />
	</ion-app>
</template>

<script setup>
import { onMounted } from "vue"
import { IonApp, IonRouterOutlet } from "@ionic/vue"

import { Toasts } from "frappe-ui"

import InstallPrompt from "@/components/InstallPrompt.vue"
import { showNotification } from "@/utils/pushNotifications"
import { useBranding } from "@/composables/branding"

const { appName, isManusaDomain } = useBranding()

onMounted(() => {
	// Set document title berdasarkan domain
	document.title = appName
	
	// Set favicon berdasarkan domain
	const favicon = document.querySelector("link[rel='icon']")
	if (favicon) {
		// Gunakan path yang berbeda untuk dev dan production
		const isDev = import.meta.env.DEV
		
		if (isManusaDomain) {
			favicon.href = isDev ? '/favicon-manusa.png' : '/assets/hrms/manifest/favicon-manusa.png'
		} else {
			favicon.href = isDev ? '/favicon-mart.png' : '/assets/hrms/manifest/favicon-mart.png'
		}
	}
	
	window?.frappePushNotification?.onMessage((payload) => {
		showNotification(payload)
	})
})
</script>
