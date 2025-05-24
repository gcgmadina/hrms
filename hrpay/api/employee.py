import frappe
from frappe.utils.password import update_password

import frappe
from frappe import _

@frappe.whitelist()
def create_employee(data):
    import json

    if isinstance(data, str):
        data = json.loads(data)

    # --- Cek atau buat Job Position
    job_position = frappe.get_value("Job Position", {"position_name": "Manager"})
    if not job_position:
        job_position = frappe.get_doc({
            "doctype": "Job Position",
            "position_name": "Manager"
        }).insert()
    else:
        job_position = frappe.get_doc("Job Position", job_position)

    # --- Cek atau buat Department
    department = frappe.get_value("Department ID", {"department_name": "HR"})
    if not department:
        department = frappe.get_doc({
            "doctype": "Department ID",
            "department_name": "HR"
        }).insert()
    else:
        department = frappe.get_doc("Department ID", department)

    # --- Persiapkan dependents (jika ada)
    dependents = data.get("dependents", [])
    if isinstance(dependents, str):
        # Coba decode jika string
        try:
            dependents = json.loads(dependents)
        except:
            dependents = []

@frappe.whitelist()
def new_id():
    from datetime import datetime

    today = datetime.today()
    year = today.strftime("%Y")
    month = today.strftime("%m")

    # Hitung jumlah employee yang dibuat bulan ini
    prefix = f"{year}{month}"
    like_pattern = f"EMP-{prefix}-%"
    count = frappe.db.count("Employee ID", {"id": ["like", like_pattern]})

    new_number = str(count + 1).zfill(4)
    full_id = f"EMP-{prefix}-{new_number}"

    return {"new_id": full_id}

    # --- Buat Employee ID
    employee = frappe.get_doc({
        "doctype": "Employee ID",
        "id": data.get("id"),
        "full_name": data.get("full_name"),
        "date_of_birth": data.get("date_of_birth"),
        "marital_status": data.get("marital_status"),
        "dependents": dependents,  # Harus list of dict
        "tariff_pph21": data.get("tariff_pph21"),
        "job_position": job_position.name,
        "department": department.name,
        "sallary_structure": data.get("sallary_structure"),
        "cost_to_company": data.get("cost_to_company"),
        "employment_type": data.get("employment_type"),
        "user_name": data.get("user_name"),
        "email": data.get("email"),
        "password": data.get("password"),
        "role_profile": data.get("role_profile")
    })

    employee.insert()
    employee.user_id = data.get("email")  # ← agar User terhubung dengan Employee
    employee.save()

    # --- Buat akun user jika belum ada
    email = data.get("email")
    if not frappe.db.exists("User", email):
        user = frappe.get_doc({
            "doctype": "User",
            "email": email,
            "first_name": data.get("full_name"),
            "send_welcome_email": 0,
            "roles": [{
                "role": data.get("role", "Employee")
            }]
        })
        user.insert()
        frappe.utils.password.update_password(email, data.get("password"))

    # Optional: force commit jika kamu tahu ini dipanggil di background script
    frappe.db.commit()

    return {
        "success": True,
        "message": "Karyawan dan akun berhasil dibuat.",
        "employee_name": employee.name
    }


# untuk cek doctype
# @frappe.whitelist()
# def check_doctype_exists(doctype):
#     try:
#         meta = frappe.get_meta(doctype)
#         if meta:
#             return True  # Doctype ditemukan
#     except frappe.DoesNotExistError:
#         return False  # Doctype tidak ditemukan

# # Memanggil fungsi dengan benar
# doctype_exists = check_doctype_exists("Employe ID")  # Menyertakan "Employee ID" sebagai argumen
# print(doctype_exists)


# @frappe.whitelist(allow_guest=True)
# def list_doctypes():
#     doctypes = frappe.get_all("DocType", fields=["name"])
#     return [d.name for d in doctypes]