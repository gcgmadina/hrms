import frappe
import json

@frappe.whitelist()
def get_departments():
    try:
        departments = frappe.get_all("Department", fields=["name", "department_name"])
        return json.dumps(departments)
    except Exception as e:
        frappe.log_error(f"Error fetching departments: {str(e)}")
        return json.dumps({"error": str(e)})