export async function fetchDepartments() {
  try {
    const response = await fetch("/api/method/hrpay.api.get_departments");
    const data = await response.json();
    return data.map(dept => ({ id: dept.name, name: dept.department_name }));
  } catch (error) {
    console.error("Error fetching departments:", error);
    return [];
  }
}