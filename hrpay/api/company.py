import frappe
from frappe import _

@frappe.whitelist() # Biar bisa dipanggil dari frontend
def get_company():
    company = frappe.get_all("Company", fields=["name", "domain", "email", "logo"])
    if company:
        return company[0]  # Ambil perusahaan pertama
    return None