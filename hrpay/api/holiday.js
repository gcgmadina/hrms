const API_URL = "https://localhost:8000/api/method/hrpay.api.holiday";

export async function getHolidays() {
    try {
        const response = await fetch(`${API_URL}.get_holidays`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch holidays");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching holidays:", error);
        return [];
    }
}

export async function addHoliday(holidayData) {
    try {
        const response = await fetch(`${API_URL}.create_holiday`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ data: JSON.stringify(holidayData) }), // ⬅ double JSON!
        });

        if (!response.ok) throw new Error("Failed to add holiday");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding holiday:", error);
        return null;
    }
}

export async function deleteHoliday(name) {
    try {
        const response = await fetch(`${API_URL}.delete_holiday?docname=${name}`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to delete holiday");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error deleting holiday:", error);
        return null;
    }
}
