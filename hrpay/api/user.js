const API_URL = "https://localhost:8000/api/method/hrpay.api.user"; 

export async function getHRProfile() {
    try {
        const response = await fetch(`${API_URL}.get_users?position=HR`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch HR profile");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching HR profile:", error);
        return null;
    }
}

export async function updateHRProfile(profileData) {
    try {
        const response = await fetch(`${API_URL}.update_user`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(profileData),
        });

        if (!response.ok) throw new Error("Failed to update HR profile");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating HR profile:", error);
        return null;
    }
}