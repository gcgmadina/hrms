import frappe
from frappe.model.document import Document

class HolidayManager(Document):
    pass

@frappe.whitelist()
def get_holidays():
    """Ambil daftar semua libur dari Holiday Manager"""
    return frappe.get_all(
        "Holiday Manager",
        fields=["name", "start_date", "end_date", "description", "is_not_fixed"],
        order_by="start_date desc"
    )

@frappe.whitelist()
def create_holiday(data):
    """Tambahkan libur baru ke Holiday Manager"""
    data = frappe.parse_json(data)

    doc = frappe.get_doc({
        "doctype": "Holiday Manager",
        "start_date": data.get("start_date"),
        "end_date": data.get("end_date"),
        "description": data.get("description"),
        "is_not_fixed": data.get("is_not_fixed", 0),
    })
    doc.insert()
    frappe.db.commit()
    return {"message": "Libur berhasil ditambahkan", "name": doc.name}

@frappe.whitelist()
def delete_holiday(docname):
    """Hapus libur dari Holiday Manager berdasarkan name"""
    frappe.delete_doc("Holiday Manager", docname)
    frappe.db.commit()
    return {"message": "Libur berhasil dihapus"}
