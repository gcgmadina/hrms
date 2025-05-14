import frappeCall from "@/utils/frappeCall";

// API untuk menambahkan user baru
export async function addUser({ full_name, email, password, role }) {
  try {
    const res = await frappeCall("hrpay.api.user.add_user", {
      full_name,
      email,
      password,
      role,
    });

    if (res.message === "ok") {
      return { success: true, message: "User berhasil ditambahkan" };
    } else {
      return { success: false, message: res.message || "Gagal menambahkan user" };
    }
  } catch (error) {
    console.error("Error saat menambahkan user:", error);
    return { success: false, message: "Terjadi kesalahan pada server" };
  }
}

// API untuk mengambil daftar role
export async function getRoles() {
  try {
    const res = await frappeCall("hrpay.api.user.get_roles");
    return res.message || [];
  } catch (error) {
    console.error("Gagal mengambil role:", error);
    return [];
  }
}
