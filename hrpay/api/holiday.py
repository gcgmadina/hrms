import frappe
from frappe.model.document import Document

class Holiday(Document):
    pass

@frappe.whitelist()
def get_holidays():
    """Mengambil daftar libur dari database"""
    return frappe.get_all("Holiday", fields=["name", "date"])

@frappe.whitelist()
def create_holiday(name, date):
    """Menambahkan libur baru ke database"""
    holiday = frappe.get_doc({
        "doctype": "Holiday",
        "name": name,
        "date": date
    })
    holiday.insert()
    frappe.db.commit()
    return {"message": "Libur berhasil ditambahkan"}

@frappe.whitelist()
def delete_holiday(holiday_name):
    """Menghapus libur berdasarkan nama"""
    frappe.delete_doc("Holiday", holiday_name)
    frappe.db.commit()
    return {"message": "Libur berhasil dihapus"}