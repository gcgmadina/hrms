import frappe
import json

@frappe.whitelist()
def get_job_positions():
    try:
        job_positions = frappe.get_all("Job Position", fields=["name", "job_position"])
        return json.dumps(job_positions)
    except Exception as e:
        frappe.log_error(f"Error fetching job positions: {str(e)}")
        return json.dumps({"error": str(e)})