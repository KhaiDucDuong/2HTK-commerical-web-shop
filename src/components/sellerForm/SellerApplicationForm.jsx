import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import {
  renderFormGroupField,
  renderFormTextArea,
  renderFormCheckbox,
} from "../../helpers/renderForm";
import {
  required,
  maxLength50,
  name,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  email,
  maxLength1000,
  maxLength200,
  tickRequired,
} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelope } from "bootstrap-icons/icons/envelope.svg";

const SellerAplicationForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <h6 className="text-info">
        Note: update this component to fetch user's information and set the
        default value for phone and email inputs, if the user hasn't set these
        values then provide a warning telling the user to update their phone and
        email.
      </h6>
      <div className="row">
        <div className="col-md-6">
          <Field
            name="name"
            type="text"
            label="Name"
            component={renderFormGroupField}
            placeholder="Your full name"
            icon={IconPerson}
            required={true}
            validate={[required, maxLength50, name]}
            pattern="[a-zA-Z\s]*"
            maxLength="50"
            className="mb-3"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="mobileNo"
            type="number"
            label="Mobile no"
            component={renderFormGroupField}
            placeholder="Mobile no with country code"
            icon={IconPhone}
            validate={[required, maxLengthMobileNo, minLengthMobileNo, digit]}
            required={true}
            max="999999999999999"
            min="9999"
            className="mb-3"
          />
        </div>

        <div className="col-md-6">
          <Field
            name="email"
            type="email"
            label="Email address"
            component={renderFormGroupField}
            placeholder="Your email address"
            icon={IconEnvelope}
            validate={[required, maxLength50, email]}
            maxLength="50"
            required={true}
            className="mb-3"
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-12">
          <Field
            name="applyingReason"
            label="Applaying Reason"
            maxLength="200"
            component={renderFormTextArea}
            validate={maxLength200}
            placeholder="Briefly describe your business (200 words max)."
          />
        </div>

        <div className="col-md-12">
          <Field
            name="businessPlanDescription"
            label="Detailed Business Plan"
            maxLength="1000"
            component={renderFormTextArea}
            validate={maxLength1000}
            placeholder="Explain your business plan in details (1000 words max)."
          />
        </div>

        <div className="col-md-12">
          <Field
            id="informed"
            label="I agree with the terms and conditions of the shop's seller policy."
            name="informed"
            component={renderFormCheckbox}
            validate={tickRequired}
            required
          />
        </div>
      </div>
      <div className="d-grid">
        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={submitting}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "SellerApplicationForm",
  })
)(SellerAplicationForm);
