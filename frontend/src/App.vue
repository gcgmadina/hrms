<template>
	<ion-app>
		<ion-router-outlet id="main-content" />
		<Toasts />

		<InstallPrompt />
	</ion-app>
</template>

<script setup>
import { onMounted, nextTick } from "vue"
import { IonApp, IonRouterOutlet } from "@ionic/vue"

import { Toasts } from "frappe-ui"

import InstallPrompt from "@/components/InstallPrompt.vue"
import { showNotification } from "@/utils/pushNotifications"
import { useBranding } from "@/composables/branding"

const { appName, isManusaDomain } = useBranding()

// Fungsi untuk update favicon
function updateFavicon() {
	try {
		const isDev = import.meta.env.DEV
		const basePath = isManusaDomain 
			? (isDev ? '/favicon-manusa.png' : '/assets/hrms/manifest/favicon-manusa.png')
			: (isDev ? '/favicon-mart.png' : '/assets/hrms/manifest/favicon-mart.png')
		
		// Cache busting: tambahkan timestamp sebagai query parameter
		const faviconPath = `${basePath}?v=${Date.now()}`
		
		console.log('[DEBUG] Updating favicon...')
		console.log('[DEBUG] isDev:', isDev)
		console.log('[DEBUG] isManusaDomain:', isManusaDomain)
		console.log('[DEBUG] Favicon path:', faviconPath)
		console.log('[DEBUG] Current hostname:', window.location.hostname)
		
		// Hapus semua favicon lama
		const oldFavicons = document.querySelectorAll("link[rel*='icon']")
		oldFavicons.forEach(icon => {
			console.log('[DEBUG] Removing old favicon:', icon.href)
			icon.remove()
		})
		
		// Buat favicon baru dengan multiple sizes untuk compatibility
		const sizes = ['16x16', '32x32', '96x96', '196x196']
		sizes.forEach(size => {
			const link = document.createElement('link')
			link.rel = 'icon'
			link.type = 'image/png'
			link.sizes = size
			link.href = faviconPath
			document.head.appendChild(link)
		})
		
		// Tambahkan shortcut icon juga (untuk browser lama)
		const shortcutIcon = document.createElement('link')
		shortcutIcon.rel = 'shortcut icon'
		shortcutIcon.type = 'image/png'
		shortcutIcon.href = faviconPath
		document.head.appendChild(shortcutIcon)
		
		console.log('[DEBUG] Favicon updated successfully with cache busting!')
		console.log('[DEBUG] Total favicon elements added:', sizes.length + 1)
	} catch (error) {
		console.error('[ERROR] Failed to update favicon:', error)
	}
}

onMounted(async () => {
	// Set document title berdasarkan domain
	document.title = appName
	console.log('[DEBUG] Document title set to:', appName)
	
	// Tunggu nextTick untuk memastikan DOM ready
	await nextTick()
	
	// Update favicon
	updateFavicon()
	
	// Force update lagi setelah 500ms (untuk memastikan)
	setTimeout(updateFavicon, 500)
	
	window?.frappePushNotification?.onMessage((payload) => {
		showNotification(payload)
	})
})
</script>
