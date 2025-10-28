import { computed } from "vue"

export function useBranding() {
	const currentDomain = window.location.hostname
	const isManusaDomain = currentDomain.includes("gcgmanusa.id") || currentDomain.includes("gcgsalus.id")

	const branding = computed(() => {
		if (isManusaDomain) {
			return {
				appName: "GCG Manusa",
				loginTitle: "Login to GCG Manusa",
				installTitle: "Install GCG Manusa",
			}
		} else {
			// Branding untuk domain lain
			return {
				appName: "GCG Mart",
				loginTitle: "Login to GCG Mart",
				installTitle: "Install GCG Mart",
			}
		}
	})

	return {
		appName: branding.value.appName,
		loginTitle: branding.value.loginTitle,
		installTitle: branding.value.installTitle,
		isManusaDomain,
	}
}
