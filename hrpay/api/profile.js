const API_URL = "https://localhost:8000/api/method/hrpay.api.profile"; 

export async function getProfile() {
    try {
        const response = await fetch(`${API_URL}.get_profile`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}

export async function updateProfile(profileData) {
    try {
        const response = await fetch(`${API_URL}.update_profile`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(profileData),
        });

        if (!response.ok) throw new Error("Failed to update profile");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating profile:", error);
        return null;
    }
}