import React, { useEffect, useState } from 'react';
import './update.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import defaultImage from '../../assets/images/pro.jpg';


const ProfileUpdatePage = ({ onUpdate }) => {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(localStorage.getItem('userImage') || '');

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string()
      .matches(/^[6][7][5-9]\d{6}$/, 'Invalid phone number')
      .required('Phone Number is required'),
    profilePicture: Yup.mixed().nullable().required('Profile Picture is required'), // Added validation for profile picture
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      profilePicture: null,
    },
    validationSchema,
    onSubmit: (values) => {
      onUpdate(values);

      // Store the updated form data/profile picture in localStorage
      localStorage.setItem('formData', JSON.stringify(values));
      localStorage.setItem('userImage', profilePic); 

      navigate('/details');
    },
  });

  useEffect(() => {
    // Retrieve the form data from localStorage
    const storedFormData = localStorage.getItem('formData');

    if (storedFormData) {
      // Parse the JSON string back into an object
      const parsedFormData = JSON.parse(storedFormData);

      // Set the retrieved form data to the formik initial values
      formik.setValues(parsedFormData);
    }
  }, []);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
      formik.setFieldValue('profilePicture', reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <h1 className="heading">Update Profile</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="formGroup">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" {...formik.getFieldProps('firstName')} />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.firstName}</div>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" {...formik.getFieldProps('lastName')} />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.lastName}</div>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" {...formik.getFieldProps('email')} />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="tel" id="phoneNumber" {...formik.getFieldProps('phoneNumber')} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.phoneNumber}</div>
          )}
        </div>
        <div className="formGroup">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <img
            // eslint-disable-next-line no-undef
            src={profilePic || defaultImage}
            height="100px"
            width="100px"
            alt="upload"
            style={{ alignSelf: 'center', borderRadius: '50%' }}
          />
          <input type="file" id="profilePicture" onChange={handleProfilePictureChange} />
          {formik.touched.profilePicture && formik.errors.profilePicture && (
            <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.profilePicture}</div>
          )}
        </div>
        <button type="submit" className="button">
          Update Profile
        </button>
      </form>
    </div>
  );
};

ProfileUpdatePage.propTypes = {
  onUpdate: PropTypes.func.isRequired,
};

export default ProfileUpdatePage