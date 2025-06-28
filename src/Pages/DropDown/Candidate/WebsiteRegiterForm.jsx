import React, { useState } from 'react';
import './WebsiteRegisterForm.css';

const WebsiteRegisterForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    resumeLink: '',
    folderLink: '',
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formUrl =
      'https://docs.google.com/forms/d/e/1FAIpQLScuaUrDQaQ-RWoL8vSG4rQEIxcjMcq9_tsT6yyS0KK-qNbfGg/formResponse';

    const formBody = new FormData();
    formBody.append('entry.229979197', formData.fullName);
    formBody.append('entry.1142490850', formData.email);
    formBody.append('entry.1919786622', formData.phone);
    formBody.append('entry.1132634516', formData.resumeLink);
    formBody.append('entry.955284201', formData.folderLink);

    fetch(formUrl, {
      method: 'POST',
      mode: 'no-cors', // no-cors required to avoid CORS issues with Google Forms
      body: formBody,
    })
      .then(() => {
        setShowPopup(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          resumeLink: '',
          folderLink: '',
        });

        setTimeout(() => {
          setShowPopup(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        // Optionally, handle error display here
      });
  };

  return (
    <div className="register-container">
      <h2 className="form-title">Avakasha - Website Registration</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
        />

        <label>Email Address:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Resume (Google Drive link):</label>
        <input
          type="url"
          name="resumeLink"
          value={formData.resumeLink}
          onChange={handleChange}
        />

        <label>Document Folder (Google Drive link):</label>
        <input
          type="url"
          name="folderLink"
          value={formData.folderLink}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {showPopup && (
        <div className="popup-message">✅ Form submitted successfully!</div>
      )}
    </div>
  );
};

export default WebsiteRegisterForm;
