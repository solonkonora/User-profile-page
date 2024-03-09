// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import "./registration.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


function ImageBlob() {
  const [imgs, setImgs] = useState();
  const [imageData, setImageData] = useState(""); // Add state for storing image data
  const defaultImage = 'data:image/jpeg;base64,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'

  const handleChange = (e) => {
    const file = e.target.files[0]; // retrieves the selected file using .target.files[0].
    const reader = new FileReader();  // creates a new file reader object which is used to read the content of the file
    reader.onloadend = () => {  // It sets the onloadend event handler of the FileReader object, which will be called when the file reading operation is completed
      setImgs(reader.result);
      setImageData(reader.result); // Store the image data in state
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          borderRadius: "50%",
          width: "25%",
          height: "25%",
          justifySelf: "center",
          margin: "0 auto",
          backgroundColor: "#7dabdb",
        }}
      >
        <img
          src={imgs || defaultImage}
          height="100px"
          width="100px"
          alt="upload"
          style={{ alignSelf: "center", borderRadius: "50%" }}
        />
      </div>
      <br />
      {/* Store the image data in local storage */}
      {imageData && (
        <button
          onClick={() => {
            localStorage.setItem("userImage", imageData);
            alert("Image stored in local storage!");
          }}
        >
          Save Image
        </button>
      )}
    </>
  );
}

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

  return(
    <>
      <h1 className="heading">Registration</h1>
      <form onSubmit={formik.handleSubmit}>

      <ImageBlob />

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
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.firstName}</div>
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
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.lastName}</div>
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
            <div style={{ color: "red", fontSize: "12px" }}>{formik.errors.email}</div>
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
            <div style={{ color: "red", fontSize: "12px", marginTop: "0.5rem" }}>
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
