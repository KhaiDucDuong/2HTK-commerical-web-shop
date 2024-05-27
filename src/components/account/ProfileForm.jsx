import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";

const ProfileForm = (props) => {
  const {
    handleSubmit,
    submitting,
    onSubmit,
    submitFailed,
    onImageChange,
    imagePreview,
    userProfile,
  } = props;

  const handleSubmitWithDateConversion = (values) => {
    // Kiểm tra xem values.dateOfBirth đã là một chuỗi chưa
    const valuesWithConvertedDate = {
      ...values,
      dateOfBirth: typeof values.dateOfBirth === 'string' ? new Date(values.dateOfBirth).getTime() : values.dateOfBirth,
    };
  
    // Kiểm tra và xử lý file input
    const fileInput = document.querySelector('input[name="formFile"]');
    if (fileInput && fileInput.files && fileInput.files[0]) {
      valuesWithConvertedDate.image = fileInput.files[0];
    }
  
    onSubmit(valuesWithConvertedDate);
  };
  
  // Parse timestamp to date string (yyyy-mm-dd) for input[type="date"]
  const parseTimestampToDate = (timestamp) => {
    if (!timestamp) return ""; // Handle case when timestamp is null or undefined
    const date = new Date(timestamp);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitWithDateConversion)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <i className="bi bi-person-lines-fill" /> Profile Detail
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/no-img.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Field
              name="fullName"
              type="text"
              component={renderFormGroupField}
              placeholder="Your name"
              icon={IconPerson}
              validate={[required, name]}
              required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="phoneNumber"
              type="text"
              component={renderFormGroupField}
              placeholder="Mobile no without country code"
              icon={IconPhone}
              validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
              required={true}
              max="999999999999999"
              min="9999"
            />
          </li>
          <li className="list-group-item">
            <Field
              name="email"
              type="email"
              component={renderFormGroupField}
              placeholder="Your email"
              icon={IconEnvelop}
              validate={[required, email]}
              required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="address"
              type="text"
              component={renderFormGroupField}
              placeholder="Your address"
              icon={IconGeoAlt}
              validate={[required]}
              required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="dateOfBirth"
              type="date"
              component={renderFormGroupField}
              placeholder="Your birthdate"
              icon={IconCalendarEvent}
              validate={[required]}
              required={true}
            />
          </li>
        </ul>
        <div className="card-body">
          <button
            type="submit"
            className="btn btn-primary d-flex"
            disabled={submitting}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
    enableReinitialize: true, // Ensure the form reinitializes with new props
  })
)(ProfileForm);
