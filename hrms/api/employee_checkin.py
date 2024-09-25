import frappe
from frappe import _
from frappe.model import get_permitted_fields
from frappe.model.workflow import get_workflow_name
from frappe.query_builder import Order
from frappe.utils import getdate, strip_html
import math
import cv2
import base64
import numpy as np
import json

def haversine(lat1, lon1, lat2, lon2):
    # Radius bumi dalam kilometer
    R = 6371.0

    # Mengkonversi derajat ke radian
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    # Perbedaan lintang dan bujur
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Rumus Haversine
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Menghitung jarak
    distance = R * c

    return distance * 1000

@frappe.whitelist()
def checkin(lat, long, work_place):
    try:
        lat = float(lat)
        long = float(long)

        address_lat, address_long, max_dist = frappe.get_value("Address", work_place, ["latitude", "longitude", "attendance_maximum_distance"])
        
        distance = haversine(address_lat, address_long, lat, long)

        if distance > max_dist:
            return {
                "status": "error",
                "message": "You are too far from the work place"
            }
        else:
            return {
                "status": "success",
                "message": "You are checked in successfully"
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@frappe.whitelist()
def get_face_encode(employee_id):
    try:
        emp_face_encode = frappe.get_value("Employee", employee_id, "face_encoding")
        if emp_face_encode:
            return {
                "status": "success",
                "message": "Face encode found",
                "data": emp_face_encode
            }
        else:
            return {
                "status": "success",
                "message": "Face encode not found",
                "data": None
            }
    except Exception as e:
        return {
            "status": "error",
            "message": str(e)
        }

@frappe.whitelist()
def register_face(employee_id, image):
    try:
        # Decode base64 image
        image_data = base64.b64decode(image.split(',')[1])
        np_img = np.frombuffer(image_data, dtype=np.uint8)
        img = cv2.imdecode(np_img, flags=cv2.IMREAD_COLOR)  # Jangan ubah menjadi grayscale

        # Deteksi wajah menggunakan HaarCascade
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(img, 1.1, 4)

        if len(faces) == 0:
            return {"status": "failed", "message": "No face detected."}

        temp = None

        for (x, y, w, h) in faces:
            # Potong wajah dari gambar
            face = img[y:y+h, x:x+w]

            # Resize wajah untuk meningkatkan akurasi encoding jika perlu
            face_resized = cv2.resize(face, (150, 150))  # Resize jika perlu

            # Encode wajah menggunakan face_recognition
            face_encoding = encode_face(face_resized)

            if face_encoding is not None:
                temp = face_encoding

                # Simpan encoding wajah ke dokumen karyawan
                employee = frappe.get_doc('Employee', employee_id)

                # Ubah face_encoding menjadi list atau string untuk menyimpannya
                employee.face_encoding = json.dumps(face_encoding.tolist())  # Simpan sebagai JSON string
                employee.save(ignore_permissions=True)
            else:
                return {"status": "failed", "message": "Face encoding failed."}

        return {
            "status": "success",
            "message": temp
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}

def encode_face(face_image):
    try:
        import face_recognition
        face_encoding = face_recognition.face_encodings(face_image)

        return face_encoding[0] if face_encoding else None
    except Exception as e:
        return None

@frappe.whitelist()
def compare_face(employee_id, image):
    try:
        # Decode base64 image yang dikirim dari frontend
        image_data = base64.b64decode(image.split(',')[1])
        np_img = np.frombuffer(image_data, dtype=np.uint8)
        img = cv2.imdecode(np_img, flags=cv2.IMREAD_COLOR)

        # Ambil encoding wajah yang tersimpan untuk karyawan dari database
        employee = frappe.get_doc('Employee', employee_id)
        registered_face_encoding = employee.face_encoding

        if not registered_face_encoding:
            return {"status": "failed", "message": "No face encoding registered for this employee."}

        # Konversi encoding yang tersimpan dari JSON string menjadi array NumPy
        registered_face_encoding = np.array(json.loads(registered_face_encoding))

        # Deteksi wajah dari gambar baru
        face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
        faces = face_cascade.detectMultiScale(img, 1.1, 4)

        if len(faces) == 0:
            return {"status": "failed", "message": "No face detected."}

        for (x, y, w, h) in faces:
            # Potong dan resize wajah yang terdeteksi untuk encoding
            face = img[y:y+h, x:x+w]
            face_resized = cv2.resize(face, (150, 150))

            # Encode wajah baru menggunakan face_recognition
            face_encoding = encode_face(face_resized)

            if face_encoding is None:
                return {"status": "failed", "message": "Failed to encode face."}

            # Bandingkan encoding wajah baru dengan yang tersimpan
            import face_recognition
            matches = face_recognition.compare_faces([registered_face_encoding], face_encoding, tolerance=0.4)

            if matches[0]:
                return {"status": "success", "message": True}
            else:
                return {"status": "success", "message": False}

    except Exception as e:
        return {"status": "error", "message": str(e)}