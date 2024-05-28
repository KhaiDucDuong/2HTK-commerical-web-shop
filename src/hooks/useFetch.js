export async function fetchApi(
  url,
  requestMethod = "GET",
  jsonData,
  token = "",
  credential = false,
  contentType = "application/json"
) {
  const requestOptions = {
    method: requestMethod, 
    headers: {
      "Content-Type": contentType,
      "credentials": credential ? "include" : "same-origin",
      'Authorization': `Bearer ${token}` 
    },
    body: jsonData,
  };

  console.log(requestOptions)

  try {
    let response = await fetch(url, requestOptions);
    // let data = await response.json()
    return response
  } catch (e) {
    console.log("error: ", e);
  }
}
