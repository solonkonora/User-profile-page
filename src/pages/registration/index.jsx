// eslint-disable-next-line no-unused-vars
import React from "react";
import { useFormik } from "formik";
import "./registration.module.css";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function RegistrationForm() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("First Name is required"),
      lastName: Yup.string().required("Last Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^[6][7][5-9]\d{6}$/, "Invalid phone number")
        .required("Phone Number is required"),
    }),

    onSubmit: (values) => {
      // Handle form submission
      console.log(values);

      // Store the form data in localStorage
      const formData = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
      };
      localStorage.setItem("formData", JSON.stringify(formData));

      // Reset the form fields
      formik.resetForm();

      navigate("details");
    },
  });

  return (
    <>
      <h1 className="heading">Registration</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style = { {color:"red"} }>
              {formik.errors.firstName}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style = { {color:"red"} }>
              {formik.errors.lastName}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <div style = { {color:"red"} }>
              {formik.errors.email}
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div style={{ color: "red", marginTop: "0.5rem" }}>
              {formik.errors.phoneNumber}
            </div>
          )}
        </div>

        <button type="submit" className="button1">
          Create Profile
        </button>
      </form>
    </>
  );
}

export default RegistrationForm;
