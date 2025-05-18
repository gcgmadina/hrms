export async function fetchJobPositions() {
  try {
    const response = await fetch("/api/method/htpay.api.get_job_positions");
    const data = await response.json();
    return data.map(job => ({ id: job.name, name: job.job_position }));
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return [];
  }
}