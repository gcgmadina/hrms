import frappe
from frappe.model.document import Document
from frappe.utils.password import update_password
from frappe import _

@frappe.whitelist()
def add_user(full_name, email, password, role):
    if frappe.db.exists("User", email):
        return {"message": "User already exists"}

    # Create the user
    user = frappe.get_doc({
        "doctype": "User",
        "email": email,
        "first_name": full_name,
        "enabled": 1,
        "new_password": password,
        "send_welcome_email": 0
    })
    user.insert(ignore_permissions=True)

    # Assign role
    user.add_roles(role)

    return {"message": "ok"}
