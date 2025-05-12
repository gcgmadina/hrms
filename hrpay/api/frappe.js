// const FRAPPE_URL = "https://localhost:8000/api";

// export const getAttendanceSummary = async () => {
//     try {
//         const response = await fetch(`${FRAPPE_URL}/method/hrpayroll.hrpayroll.doctype.attendance.attendance.get_attendance_summary`);
//         if (!response.ok) throw new Error("Failed to fetch attendance data");
//         const data = await response.json();
//         return data.message;
//     } catch (error) {
//         console.error("Error fetching attendance:", error);
//         return [];
//     }
// };