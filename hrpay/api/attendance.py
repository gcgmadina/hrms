import frappe
import math
from frappe.utils import now_datetime, now, today, time_diff_in_hours

def haversine(lat1, lon1, lat2, lon2):
    R = 6371000
    phi1 = math.radians(lat1); phi2 = math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlambda = math.radians(lon2 - lon1)
    a = math.sin(dphi/2)**2 + math.cos(phi1)*math.cos(phi2)*math.sin(dlambda/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return R * c

# titik geofence (samakan dengan check_in)
OFFICE_LAT = -6.200000
OFFICE_LON = 106.816666
GEOFENCE_RADIUS_M = 100

def get_today_attendance(user):
    name = frappe.db.get_value(
        "Attendance",
        filters={
            "employee": user,
            "attendance_date": today()
        },
        fieldname="name"
    )
    return frappe.get_doc("Attendance", name) if name else None


@frappe.whitelist()
def get_attendance_summary():
    # Ambil data kehadiran dari database
        records = frappe.get_all(
            "Attendance",
            fields=["employee", "attendance_date", "status", "shift"],
            order_by="attendance_date desc"
        )
        
        # Jika data tidak ditemukan, kembalikan pesan error
        if not records:
            return {"error": "No attendance records found"}
        
        # Jika ada data, kirimkan data tersebut langsung dalam array
        return records

def check_in(latitude=None, longitude=None):
    user = frappe.session.user

    # Validasi input
    if not latitude or not longitude:
        frappe.throw(_("Koordinat tidak lengkap"))

    # Titik lokasi absensi
    target_lat = -6.200000  # ganti dgn titik lokasi absensimu
    target_lon = 106.816666
    radius_meter = 100  # misal 100 meter

    # Hitung jarak user ke titik absensi
    distance = haversine(float(latitude), float(longitude), target_lat, target_lon)

    if distance > radius_meter:
        return {
            "success": False,
            "message": f"Kamu berada di luar radius absensi ({int(distance)} m)"
        }

    # Cek apakah sudah pernah absen hari ini
    today = frappe.utils.today()
    existing = frappe.db.exists("Attendance", {
        "employee": user,
        "attendance_date": today
    })

    if existing:
        return {
            "success": False,
            "message": "Kamu sudah absen hari ini"
        }

    # Simpan absensi
    doc = frappe.get_doc({
        "doctype": "Attendance",
        "employee": user,
        "attendance_date": today,
        "status": "Present",
        "latitude": latitude,
        "longitude": longitude,
        "check_in_time": now(),
    })
    doc.insert(ignore_permissions=True)

    return {
        "success": True,
        "message": "Absensi berhasil dicatat!",
        "docname": doc.name
    }

def check_out(latitude=None, longitude=None):
    user = frappe.session.user

    if not latitude or not longitude:
        frappe.throw(_("Koordinat tidak lengkap"))

    # validasi geofence saat checkout (opsional: bisa dimatikan jika tak diperlukan)
    distance = haversine(float(latitude), float(longitude), OFFICE_LAT, OFFICE_LON)
    if distance > GEOFENCE_RADIUS_M:
        return {
            "success": False,
            "message": f"Kamu di luar radius absensi saat checkout ({int(distance)} m)"
        }

    att = get_today_attendance(user)
    if not att:
        return {
            "success": False,
            "message": _("Belum ada data check-in hari ini.")
        }

    # pastikan sudah check-in & belum checkout
    if not getattr(att, "check_in_time", None):
        return {
            "success": False,
            "message": _("Kamu belum melakukan check-in.")
        }
    if getattr(att, "check_out_time", None):
        return {
            "success": False,
            "message": _("Kamu sudah melakukan check-out.")
        }

    # set checkout
    att.check_out_time = now()
    # simpan lokasi checkout bila ada custom field
    if hasattr(att, "checkout_latitude"):
        att.checkout_latitude = float(latitude)
    if hasattr(att, "checkout_longitude"):
        att.checkout_longitude = float(longitude)

    # hitung jam kerja (opsional, butuh field work_hours di Doctype)
    try:
        if hasattr(att, "work_hours") and att.check_in_time and att.check_out_time:
            att.work_hours = time_diff_in_hours(att.check_out_time, att.check_in_time)
    except Exception:
        pass

    # status tetap "Present" (ERPNext biasanya memakai status ini untuk hadir)
    if hasattr(att, "status") and not att.status:
        att.status = "Present"

    att.save(ignore_permissions=True)
    frappe.db.commit()

    return {
        "success": True,
        "message": _("Checkout berhasil!"),
        "docname": att.name,
        "distance": distance
    }

def mark_attendance_with_face(employee, lat, lng, image_base64, action):
    # 1. Verifikasi lokasi (kalau mau double check)
    from math import radians, cos, sin, asin, sqrt

    def haversine(lat1, lon1, lat2, lon2):
        R = 6371000
        dlat = radians(lat2 - lat1)
        dlon = radians(lon2 - lon1)
        a = sin(dlat/2)**2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon/2)**2
        return 2 * R * asin(sqrt(a))

    office_lat, office_lng, radius_m = get_office_location_for_employee(employee)  # custom func
    distance = haversine(float(lat), float(lng), office_lat, office_lng)
    if distance > radius_m:
        frappe.throw(f"Di luar radius kantor ({distance:.1f} m)")

    # 2. Verifikasi wajah
    face_ok = verify_face(employee, image_base64)  # bikin sendiri pakai face-recognition lib / API
    if not face_ok:
        frappe.throw("Wajah tidak terverifikasi")

    # 3. Panggil fungsi absensi yang sudah ada
    result = mark_attendance(employee=employee, action=action, lat=lat, lng=lng)  # fungsi lama kamu

    return {"status": "success", "message": f"Berhasil {action}", "attendance": result}