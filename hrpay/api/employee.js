const API_URL = "https://localhost:8000";

// Ambil daftar karyawan berdasarkan posisi & departemen
export const getEmployees = async (position = "", department = "") => {
    try {
        const response = await fetch(`${API_URL}/get_employee_list?position=${position}&department=${department}`, {
            credentials: "include", // Menggunakan sesi pengguna
        });

        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};

// Tambah karyawan baru
export const addEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${API_URL}/create_employee`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", // Menggunakan sesi pengguna
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) throw new Error("Failed to add employee");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding employee:", error);
        return null;
    }
};

// Update data karyawan
export const updateEmployee = async (employeeId, employeeData) => {
    try {
        const response = await fetch(`${API_URL}/update_employee/${employeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(employeeData),
        });

        if (!response.ok) throw new Error("Failed to update employee");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating employee:", error);
        return null;
    }
};

// Hapus karyawan
export const deleteEmployee = async (employeeId) => {
    try {
        const response = await fetch(`${API_URL}/delete_employee/${employeeId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to delete employee");
        return true;
    } catch (error) {
        console.error("Error deleting employee:", error);
        return false;
    }
};