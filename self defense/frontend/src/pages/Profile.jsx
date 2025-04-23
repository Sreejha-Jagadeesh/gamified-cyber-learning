import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    emergencyContact: ''
  });

  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/profile/save-profile', formData);
      setStatus('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      setStatus('Failed to save profile.');
    }
  };

  return (
    <div className="profile-container">
      <h1>Profile Information</h1>
      <form onSubmit={handleSubmit} className="profile-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter your phone number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            placeholder="Enter your address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Emergency Contact:
          <input
            type="text"
            name="emergencyContact"
            placeholder="Enter emergency contact number"
            value={formData.emergencyContact}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Save Profile</button>
      </form>
      {status && <p className="status">{status}</p>}
    </div>
  );
};

export default Profile;
