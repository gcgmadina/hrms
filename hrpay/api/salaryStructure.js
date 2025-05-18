const API_URL = "https://localhost:8000"; 

export async function getSalaryStructures() {
    try {
        const response = await fetch(`${API_URL}/get_salary_structures`, {
            credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch Salary Structures");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching Salary Structures:", error);
        return [];
    }
}