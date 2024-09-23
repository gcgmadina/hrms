import frappe
from frappe import _
from frappe.model import get_permitted_fields
from frappe.model.workflow import get_workflow_name
from frappe.query_builder import Order
from frappe.utils import getdate, strip_html
import math

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
