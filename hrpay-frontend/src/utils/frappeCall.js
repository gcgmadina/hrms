// src/utils/frappeCall.js
export default async function frappeCall(method, args = {}) {
  try {
    const response = await fetch(`http://localhost:8000/api/method/${method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Menggunakan credentials untuk autentikasi
      body: JSON.stringify(args),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in frappeCall:", error);
    throw error;
  }
}