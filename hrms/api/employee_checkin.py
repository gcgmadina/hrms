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
        print("Latitude: ", lat)
        print("Longitude: ", long)

        lat = float(lat)
        long = float(long)

        print("Latitude: ", lat)
        print("Longitude: ", long)

        address_lat, address_long, max_dist = frappe.get_value("Address", work_place, ["latitude", "longitude", "attendance_maximum_distance"])

        print("Address Latitude: ", address_lat)
        print("Address Longitude: ", address_long)
        
        distance = haversine(address_lat, address_long, lat, long)

        if distance > max_dist:
            print("You are too far from the work place")
            print("Distance: ", distance)
            return {
                "status": "error",
                "message": "You are too far from the work place"
            }
        else:
            print("You are checked in successfully")
            return {
                "status": "success",
                "message": "You are checked in successfully"
            }
    except Exception as e:
        print(str(e))
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
                print("Face encoding:", face_encoding)

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
        print(str(e))
        return {"status": "error", "message": str(e)}

def encode_face(face_image):
    try:
        import face_recognition
        face_encoding = face_recognition.face_encodings(face_image)

        if face_encoding:
            print(f"Face encoding berhasil: {face_encoding[0]}")
        else:
            print("Gagal melakukan encoding wajah.")
        return face_encoding[0] if face_encoding else None
    except Exception as e:
        print(str(e))
        return None