import React, { lazy, useState, useEffect } from "react";
import { fetchUserProfile, fetchUserProfileDOB, updateUserProfile } from "../../hooks/userApi";

const ProfileForm = lazy(() => import("../../components/account/ProfileForm"));
const ChangePasswordForm = lazy(() => import("../../components/account/ChangePasswordForm"));
const SettingForm = lazy(() => import("../../components/account/SettingForm"));
const CardListForm = lazy(() => import("../../components/account/CardListForm"));
const AddressListForm = lazy(() => import("../../components/account/AddressListForm"));

const MyProfileView = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        const userId = userData.userId;
        if (userId) {
          fetchUserProfileData(userId);
          fetchUserProfileDOBData(userId).then((dob) => setDateOfBirth(dob));
        } else {
          setIsLoading(false); // Stop loading if userId is not found
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false); // Stop loading if user data is not found
    }
  }, []);

  const fetchUserProfileData = async (userId) => {
    try {
      const responseData = await fetchUserProfile(userId);
      if (responseData && responseData.status === 9999) {
        setUserProfile(responseData.payload);
        setImagePreview(responseData.payload.image || "../../images/no-img.png");
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setIsLoading(false);
    }
  };

  const fetchUserProfileDOBData = async (userId) => {
    try {
      const responseData = await fetchUserProfileDOB(userId);
      if (responseData && responseData.status === 9999) {
        return responseData.payload;
      }
    } catch (error) {
      console.error("Error fetching user date of birth:", error);
    }
  };

  const convertTimestampToDate = (timestamp) => {
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const convertDateToTimestamp = (dateString) => {
    // Kiểm tra xem dateString có phải là một chuỗi không
    if (typeof dateString === 'string') {
      // Sử dụng split chỉ khi dateString là một chuỗi hợp lệ
      const [month, day, year] = dateString.split('/');
      // Tiếp tục xử lý và trả về kết quả
      return new Date(`${month}/${day}/${year}`).getTime();
    } else {
      // Trong trường hợp dateString không phải là một chuỗi hợp lệ, xử lý lỗi ở đây
      console.error("Invalid dateString:", dateString);
      return null;
    }
  };
  

  const onSubmitProfile = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      // Kiểm tra xem values.dateOfBirth đã là một chuỗi chưa
      const dateOfBirthTimestamp = typeof values.dateOfBirth === 'string' ? convertDateToTimestamp(values.dateOfBirth) : values.dateOfBirth;
      const response = await updateUserProfile(user.userId, { ...values, dateOfBirth: dateOfBirthTimestamp });
      if (response && response.status === 9999) {
        setUserProfile(response.payload);
        alert("Profile has been updated!");
      } else {
        alert(response.payload);
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const onSubmitChangePassword = async (values) => {
    alert(JSON.stringify(values));
  };

  const onImageChange = async (obj) => {
    if (obj) {
      const val = await getBase64(obj);
      setImagePreview(val);
    } else {
      setImagePreview("");
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
      reader.onerror = (error) => reject(error);
    });
  };

  if (isLoading) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "100px", marginBottom: "100px" }}>
        Loading...
      </h1>
    );
  }

  const initialValues = {
    ...userProfile,
    dateOfBirth: dateOfBirth ? convertTimestampToDate(dateOfBirth) : '',
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-md-4">
          <ProfileForm
            initialValues={initialValues}
            onSubmit={onSubmitProfile}
            onImageChange={onImageChange}
            imagePreview={imagePreview}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            userProfile={userProfile}
          />
        </div>
        <div className="col-md-8">
          <ChangePasswordForm onSubmit={onSubmitChangePassword} />
          <br />
          <SettingForm />
          <br />
          <CardListForm />
          <br />
          <AddressListForm />
        </div>
      </div>
    </div>
  );
};

export default MyProfileView;
