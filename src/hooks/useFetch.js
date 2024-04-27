export async function fetchApi(
  url,
  requestMethod = "GET",
  jsonData,
  credential = false,
  contentType = "application/json"
) {
  const requestOptions = {
    method: requestMethod,
    headers: {
      "Content-Type": contentType,
      "credentials": credential ? "include" : "same-origin",
    },
    body: jsonData,
  };

  try {
    let response = await fetch(url, requestOptions);
    let data = await response.json()
    return data
  } catch (e) {
    console.log("error: ", e);
  }
}
