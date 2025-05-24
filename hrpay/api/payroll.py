import frappe
from frappe import _
from frappe.utils import today, getdate
from dateutil.parser import ParserError

@frappe.whitelist()
def submit_payroll_period():
    try:
        payload = frappe.form_dict

        start_date_raw = payload.get("period_date_start")
        end_date_raw = payload.get("period_date_end")
        period_name = payload.get("period_name")
        exchange_rate = payload.get("exchange_rate")
        payable_account = payload.get("payroll_payable_account")

        # Validasi awal
        if not start_date_raw or not end_date_raw or not period_name:
            frappe.throw(_("Start date, end date, dan nama periode wajib diisi."))

        # Validasi format tanggal
        try:
            start_date = getdate(start_date_raw)
            end_date = getdate(end_date_raw)
        except Exception:
            frappe.throw(_(f"Tanggal tidak valid: {start_date_raw} atau {end_date_raw}"))

        # Cek duplikat
        existing = frappe.get_all("Payroll Periode", filters={
            "period_date_start": start_date,
            "period_date_end": end_date
        })
        if existing:
            frappe.throw(_("Payroll Periode dengan tanggal tersebut sudah ada."))

        # Buat Payroll Periode
        period_doc = frappe.new_doc("Payroll Periode")
        period_doc.update({
            "period_name": period_name,
            "period_date_start": start_date,
            "period_date_end": end_date,
            "exchange_rate": exchange_rate,
            "payroll_payable_account": payable_account
        })
        period_doc.insert()

        # Ambil semua karyawan
        employees = frappe.get_all("Employee ID", fields=["name", "full_name"])

        payroll_entries = []
        for emp in employees:
            payroll = frappe.new_doc("Payroll Entry")
            payroll.update({
                "employee": emp.name,
                "payroll_date": today(),
                "start_date": start_date,
                "end_date": end_date,
                "amount": 5000000,
                "status": "Draft"
            })
            payroll.insert()
            payroll_entries.append(payroll.name)

        return {
            "status": "success",
            "message": _("Payroll berhasil dibuat"),
            "payroll_period": period_doc.name,
            "entries": payroll_entries
        }

    except Exception as e:
        frappe.log_error(frappe.get_traceback(), "Submit Payroll Periode Error")
        frappe.throw(_("Terjadi kesalahan saat membuat payroll: {0}").format(e))
