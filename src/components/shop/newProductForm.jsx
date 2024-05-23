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
  digit,
  maxLength200,
  tickRequired,
  maxQuantity,
  minQuantity,
  maxPrice,
  minPrice,
  maxLength1000,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconBoxSeam } from "bootstrap-icons/icons/box-seam.svg";
import { ReactComponent as IconPallete } from "bootstrap-icons/icons/palette.svg";
import { ReactComponent as IconSize } from "bootstrap-icons/icons/layout-wtf.svg";
import { ReactComponent as IconBasket } from "bootstrap-icons/icons/basket.svg";
import { ReactComponent as IconTag } from "bootstrap-icons/icons/tag.svg";
const NewProductForm = (props) => {
  const { handleSubmit, submitting, onSubmit, submitFailed } = props;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="row">
        <div className="col-md-6">
          <Field
            name="name"
            type="text"
            label="Name"
            component={renderFormGroupField}
            placeholder="Product name"
            icon={IconBoxSeam}
            required={true}
            validate={[required, maxLength50]}
            maxLength="50"
            className="mb-3"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="color"
            type="text"
            label="Color"
            component={renderFormGroupField}
            placeholder="Color of the product (optional)"
            icon={IconPallete}
            validate={[maxLength50]}
            required={false}
            maxLength="50"
            className="mb-3"
          />
        </div>

        <div className="col-md-6">
          <Field
            name="size"
            type="text"
            label="Size"
            component={renderFormGroupField}
            placeholder="Size of the product (optional)"
            icon={IconSize}
            validate={[maxLength50]}
            maxLength="50"
            required={false}
            className="mb-3"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <Field
            name="remainQuantity"
            type="number"
            label="Remain quantity"
            component={renderFormGroupField}
            placeholder="Remaining product quantity"
            icon={IconBasket}
            validate={[required, maxQuantity, minQuantity, digit]}
            required={true}
            max="9999"
            min="1"
            className="mb-3"
          />
        </div>

        <div className="col-md-6">
          <Field
            name="price"
            type="number"
            label="Price"
            component={renderFormGroupField}
            placeholder="Your product price"
            icon={IconTag}
            validate={[required, maxPrice, minPrice, digit]}
            required={true}
            max="99999999"
            min="1"
            className="mb-3"
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-12">
          <Field
            name="productDescription"
            label="Description"
            rows={4}
            component={renderFormTextArea}
            validate={[required, maxLength200]}
            required={true}
            maxLength="200"
            placeholder="Briefly describe your product (200 words max)."
          />
        </div>

        <div className="col-md-12">
          <Field
            id="informed"
            label="I agree with the terms and conditions regarding product policy."
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
    form: "newProductForm",
  })
)(NewProductForm);
