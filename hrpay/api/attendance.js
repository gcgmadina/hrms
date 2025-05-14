const API_URL = "https://localhost:8000";

export async function getEmployeeAttendance(employeeId, month, year) {
    try {
        const response = await fetch(`${API_URL}/get_attendance?employee_id=${employeeId}&month=${month}&year=${year}`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch attendance data");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching attendance data:", error);
        return [];
    }
}