<template>
    <div>
        <!-- <h2>Employee Face Check</h2> -->
        <video ref="video" autoplay></video>
        <canvas ref="canvas" style="display: none;"></canvas>
        <!-- <p v-if="status">{{ status }}</p> -->
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import * as faceapi from 'face-api.js'
import { saveFaceData, checkIfFaceDataExists, compareFace } from '@/data/employee'

const video = ref(null)
const canvas = ref(null)
const videoStream = ref(null)
const status = ref('Initializing camera...')
const employee = inject('$employee')
const emit = defineEmits(['matchedValue', 'statusValue']);

const loadModels = async () => {
    const MODEL_URL = '/models'
    try {
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL)
        await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
        await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL)

        status.value = 'Models loaded successfully.'
    } catch (error) {
        console.error('Error loading models:', error)
        status.value = 'Failed to load models.'
    }
}

const startCamera = async () => {
    const constraints = {
        video: true,
    }

    try {
        videoStream.value = await navigator.mediaDevices.getUserMedia(constraints)
        video.value.srcObject = videoStream.value

        // Tambahkan listener untuk memastikan video siap
        video.value.addEventListener('loadedmetadata', () => {
            status.value = 'Camera started. Detecting face...'
            checkEmployeeFace()  // Mulai deteksi wajah setelah video siap
        })
    } catch (err) {
        console.error('Error accessing camera: ', err)
        status.value = 'Error accessing camera.'
    }
}

const captureFrame = () => {
    const context = canvas.value.getContext('2d')
    canvas.value.width = video.value.videoWidth
    canvas.value.height = video.value.videoHeight
    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)

    return canvas.value.toDataURL('image/png') // Convert frame to image format
}

const checkEmployeeFace = async () => {
    const faceDetected = await detectFace()

    if (faceDetected) {
        const frame = captureFrame()

        // Cek apakah sudah ada data encoding wajah untuk karyawan ini
        const hasFaceData = await checkIfFaceDataExists(employee.data.name)

        if (!hasFaceData) {
            // Simpan data wajah karyawan jika belum ada encoding
            try {
                await saveFaceData(employee.data.name, frame)
            } catch (error) {
                console.error('Error saving face data:', error)
                status.value = 'Error saving face data.'
            }
        }
        
        try {
            const matched = await compareFace(employee.data.name, frame)
            if (matched) {
                status.value = 'Face matched. Check-in successful.'
                emit('checkinData', { matchedValue: true, statusValue: status.value });
            } else {
                status.value = 'Face not matched. Check-in failed. Retrying...'
                emit('checkinData', { matchedValue: false, statusValue: status.value });
                requestAnimationFrame(checkEmployeeFace) // Lakukan deteksi wajah secara berkala
            }
        } catch (error) {
            console.error('Error comparing face:', error)
            status.value = 'Error comparing face.'
            requestAnimationFrame(checkEmployeeFace) // Lakukan deteksi wajah secara berkala
        }
    } else {
        status.value = 'Face not detected, retrying...'
        requestAnimationFrame(checkEmployeeFace) // Lakukan deteksi wajah secara berkala
    }
}

const detectFace = async () => {
    try {
        if (video.value.readyState === 4) {  // Memastikan video siap diproses
            const detections = await faceapi.detectAllFaces(video.value, new faceapi.TinyFaceDetectorOptions())

            if (detections.length > 0) {
                status.value = 'Face detected'
                return true
            } else {
                status.value = 'No face detected'
                return false
            }
        } else {
            return false
        }
    } catch (error) {
        console.error('Error during face detection:', error)
        status.value = 'Error detecting face.'
        return false
    }
}

onMounted(async () => {
    await loadModels()  // Memuat model face-api.js
    await startCamera()  // Memulai kamera
})
</script>
