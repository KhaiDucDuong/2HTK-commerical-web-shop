export async function fetchApi(url, requestMethod="GET", jsonData, credential=false, contentType='application/json') {
    const requestOptions = {
        method: requestMethod,
        headers: { "Content-Type": contentType },
        body: jsonData
    }

    try {
        console.log(requestOptions)
        let response = await fetch(url, requestOptions)
        let data = response.json();
        console.log(data)
        return data
    } catch (e) {
        console.log("error: ", e)
    }
}