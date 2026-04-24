export default async function api(endpoint:string, method = "GET", body:{}) {
  const response = await fetch(`http://localhost:3000/${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    console.error(`Failed to fetch ${endpoint}: ${response.statusText}`);
  }
  const data = await response.json();
  return {data,status:response.status};
}