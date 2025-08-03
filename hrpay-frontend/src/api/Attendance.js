const FRAPPE_URL = "http://localhost:8000/api";

export const getAttendanceSummary = async () => {
   try {
        const response = await fetch(`${FRAPPE_URL}/method/hrpay.api.attendance.get_attendance_records`, {
            method: 'GET',
            credentials: 'include'  // Mengirim cookie login
        });

        // Memeriksa apakah response berhasil
        if (!response.ok) throw new Error(`Failed to fetch attendance records. Status: ${response.status}`);

        // Mengambil data dalam format JSON
        const data = await response.json();

        // Log data yang diterima untuk memastikan formatnya
        console.log("Data received:", data);

        // Pastikan bahwa data.message adalah array jika Anda menggunakan struktur data seperti itu
        if (Array.isArray(data.message)) {
            return data.message; // Kembalikan data jika sudah array
        } else {
            console.error("Data.message is not an array:", data.message);
            return []; // Kembalikan array kosong jika tidak sesuai
        }

    } catch (error) {
        console.error("Error fetching attendance records:", error);
        return []; // Mengembalikan array kosong jika terjadi error
    }
};

// Fungsi untuk check-in dengan koordinat
export async function checkInAttendance(latitude, longitude) {
  try {
    const response = await fetch("/api/method/hrpay.api.absensi.check_in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Jika kamu sudah login pakai session, ini cukup.
        // Kalau pakai API Key, tambahkan Authorization header di sini.
      },
      body: JSON.stringify({ latitude, longitude }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Gagal check-in:", error);
    throw error;
  }
};