const API_URL = "https://localhost:8000";

export const getEmployees = async (position = "", department = "") => {
    try {
        const response = await fetch(`${API_URL}.get_employee_list?position=${position}&department=${department}`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
};

export const addEmployee = async (employeeData) => {
    try {
        const response = await fetch(`${API_URL}.create_employee`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData)
        });

        if (!response.ok) throw new Error("Failed to add employee");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error adding employee:", error);
        return null;
    }
};