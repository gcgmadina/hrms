import frappe

@frappe.whitelist()
def get_attendance_summary():
    # Ambil data kehadiran dari database
        records = frappe.get_all(
            "Attendance",
            fields=["employee", "attendance_date", "status", "shift"],
            order_by="attendance_date desc"
        )
        
        # Jika data tidak ditemukan, kembalikan pesan error
        if not records:
            return {"error": "No attendance records found"}
        
        # Jika ada data, kirimkan data tersebut langsung dalam array
        return records

