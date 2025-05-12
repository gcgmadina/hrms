const API_URL = "https://localhost:8000";

export const getSalaryStructures = async () => {
    try {
        const response = await fetch(`${API_URL}.get_salary_structures`);
        if (!response.ok) throw new Error("Failed to fetch salary structures");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching salary structures:", error);
        return [];
    }
};