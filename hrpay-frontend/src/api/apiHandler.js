import { fetchDepartments } from "../../../hrpay/api/department.js";
import { fetchJobPositions } from "../../../hrpay/api/job_position.js";

export async function getDropdownData() {
  const departments = await fetchDepartments();
  const jobPositions = await fetchJobPositions();

  return { departments, jobPositions };
}