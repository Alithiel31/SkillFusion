export default async function api(endpoint:string, method = "GET", body?:{}) {
  console.log(localStorage.getItem("token"))
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
  let data=null
    if (response.statusText!="No Content"){
      data = await response.json();
    }
  return {data,status:response.status};
}