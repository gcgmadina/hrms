const FRAPPE_BASE_URL = "http://localhost:8000"; // Pakai HTTP jika SSL bermasalah

export async function getCompanyInfo() {
    try {
        const response = await fetch(`${FRAPPE_BASE_URL}/api/resource/Company`, {
            credentials: "include"
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        
        // Ambil perusahaan pertama dari daftar jika ada
        return data.data.length > 0 ? data.data[0] : null;
    } catch (error) {
        console.error("Error fetching company info:", error);
        return null;
    }
}

export async function updateCompanyInfo(companyData) {
    try {
        const response = await fetch(`${FRAPPE_BASE_URL}/api/resource/Company/${companyData.name}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(companyData)
        });

        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        const data = await response.json();
        return data.message || null;
    } catch (error) {
        console.error("Error updating company info:", error);
        return null;
    }
}