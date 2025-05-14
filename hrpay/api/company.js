const API_URL = "https://localhost:8000/api/method/hrpay.api.company"; // Ganti dengan URL backend kamu

export async function getCompanyInfo() {
    try {
        const response = await fetch(`${API_URL}.get_company_info`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch company info");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching company info:", error);
        return null;
    }
}

export async function updateCompanyInfo(companyData) {
    try {
        const response = await fetch(`${API_URL}.update_company_info`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(companyData),
        });

        if (!response.ok) throw new Error("Failed to update company info");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error updating company info:", error);
        return null;
    }
}