import { fetchApi } from "./useFetch";

export async function fetchUserProfile(userId) {
  try { 
    const response = await fetchApi(`http://3.147.78.250:8080/api/users/getUser/${userId}`, "GET");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    return null; // Trả về null trong trường hợp lỗi
  }
}
export async function fetchUserProfileDOB(userId) {
  try { 
    const response = await fetchApi(`http://3.147.78.250:8080/api/users/getDateOfBirth/${userId}`, "GET");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch user profile dob:", error);
    return null; // Trả về null trong trường hợp lỗi
  }
}

export async function updateUserProfile(userId, profileData) {
  try {
    const formData = new FormData();
    formData.append("fullName", profileData.fullName);
    formData.append("address", profileData.address);
    formData.append("email", profileData.email);
    formData.append("phoneNumber", profileData.phoneNumber);
    formData.append("dateOfBirth", profileData.dateOfBirth);

    if (profileData.image) {
      formData.append("image", profileData.image);
    }

    const response = await fetch(`http://3.147.78.250:8080/api/users/updateUserProfile/${userId}`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return null;
  }
}
