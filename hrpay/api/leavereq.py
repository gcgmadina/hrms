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


@frappe.whitelist()
def get_leave_requests():
    return frappe.db.get_all(
        "Leave Request",
        fields=["name", "employee_name", "leave_type", "docstatus","from_date", "to_date"],
        order_by="creation desc"
    )


@frappe.whitelist(allow_guest=False)
def get_leave_request_detail(name):
    if not name:
        frappe.throw(_("Parameter 'name' wajib diisi."))

    # Ambil dokumen leave request berdasarkan name
    leave_request = frappe.get_doc("Leave Request", name)

    if not leave_request:
        frappe.throw(_("Data cuti tidak ditemukan."))

    # Cek attachment (File) yang terhubung ke Leave Request ini
    attachments = frappe.get_all("File",
        filters={
            "attached_to_doctype": "Leave Request",
            "attached_to_name": name,
            "is_folder": 0
        },
        fields=["file_url", "file_name"]
    )

    data = {
        "name": leave_request.name,
        "employee_name": leave_request.employee_name,
        "leave_type": leave_request.leave_type,
        "from_date": str(leave_request.from_date),
        "to_date": str(leave_request.to_date),
        "docstatus": leave_request.docstatus,
        "note": getattr(leave_request, "note", ""),
        # Tambahkan field lain yang diperlukan
    }

    # Jika ada attachment, tambahkan ke data
    if attachments:
        data["attachments"] = attachments
    else:
        data["attachments"] = []

    return data
