<template>
	<ion-page>
		<ion-content class="ion-padding">
			<div class="flex h-screen w-screen flex-col justify-center bg-white">
				<div class="flex flex-col mx-auto gap-3 items-center mb-10">
					<div class="text-3xl font-semibold text-gray-900 text-center">
						Pilih Aplikasi
					</div>
					<p class="text-gray-600 text-center">Silakan pilih aplikasi yang ingin Anda gunakan</p>
				</div>

				<div class="mx-auto w-full px-8 sm:w-96 flex flex-col gap-4">
					<!-- Tombol POS Kasir -->
					<button
						@click="goToPOS"
						class="flex items-center justify-between p-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
					>
						<div class="flex items-center gap-4">
							<div class="bg-white rounded-full p-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-blue-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
									/>
								</svg>
							</div>
							<div class="text-left">
								<div class="text-xl font-bold text-white">Aplikasi Kasir</div>
								<div class="text-sm text-blue-100">Transaksi Penjualan</div>
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>

					<!-- Tombol Absensi -->
					<button
						@click="goToAttendance"
						class="flex items-center justify-between p-6 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
					>
						<div class="flex items-center gap-4">
							<div class="bg-white rounded-full p-3">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-8 w-8 text-green-600"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
									/>
								</svg>
							</div>
							<div class="text-left">
								<div class="text-xl font-bold text-white">Aplikasi Absensi</div>
								<div class="text-sm text-green-100">Check In / Check Out</div>
							</div>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</button>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script setup>
import { IonPage, IonContent } from "@ionic/vue"
import { useRouter } from "vue-router"

const router = useRouter()

function goToPOS() {
	// Redirect ke aplikasi POS Awesome
	window.location.href = "/app/posapp"
}

function goToAttendance() {
	// Redirect ke halaman Home (Absensi)
	router.push({ name: "Home" })
}
</script>
