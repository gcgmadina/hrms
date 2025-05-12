import frappe

@frappe.whitelist()
def get_leaverequest_summary():
    # Ambil data kehadiran dari database
        records = frappe.get_all(
            "Leave Request",
            fields=["id", "employee_name", "job_position", "department", "leave_type", "from_date", "to_date", "half_day", "half_day_date", "leave_bal", "description", "leave_approver", "attachment"],
            
        )
        
        # Jika data tidak ditemukan, kembalikan pesan error
        if not records:
            return {"error": "No leave request found"}
        
        # Jika ada data, kirimkan data tersebut langsung dalam array
        return records

