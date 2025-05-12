import frappe


@frappe.whitelist()
def create_employee(data):
    employee = frappe.get_doc({
        "doctype": "Employee ID",
        "employee_id": data.get("employee_id"),
        "full_name": data.get("full_name"),
        "date_of_birth": data.get("date_of_birth"),
        "marital_status": data.get("marital_status"),
        "dependents": data.get("dependents"),
        "tariff_pph21": data.get("tariff_pph21"),
        "job_position": data.get("job_position"),
        "department": data.get("department"),
        "salary_structure": data.get("salary_structure"),
        "cost_to_company": data.get("cost_to_company"),
        "employment_type": data.get("employment_type")
    })
    employee.insert()
    return employee