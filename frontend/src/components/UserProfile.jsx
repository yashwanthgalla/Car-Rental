import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    role: "",
    name: "",
    phone: "",
    address: "",
    memberSince: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    // Get user info from localStorage
    const email = localStorage.getItem("email") || "user@example.com";
    const role = localStorage.getItem("role") || "ROLE_USER";
    const name = localStorage.getItem("userName") || "John Doe";
    const phone = localStorage.getItem("userPhone") || "+1 (555) 123-4567";
    const address = localStorage.getItem("userAddress") || "123 Main St, City, State";
    const memberSince = localStorage.getItem("memberSince") || new Date().toLocaleDateString();

    setUserInfo({ email, role, name, phone, address, memberSince });
    setEditForm({ name, phone, address });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("userAddress");
    navigate("/");
  };

  const handleEditSave = () => {
    // Save updated info to localStorage
    localStorage.setItem("userName", editForm.name);
    localStorage.setItem("userPhone", editForm.phone);
    localStorage.setItem("userAddress", editForm.address);

    // Update state
    setUserInfo(prev => ({
      ...prev,
      name: editForm.name,
      phone: editForm.phone,
      address: editForm.address
    }));

    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditForm({
      name: userInfo.name,
      phone: userInfo.phone,
      address: userInfo.address
    });
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="/logo/ferrari-logo.png" alt="Profile" className="avatar-img" />
          </div>
          <div className="profile-title">
            <h1>User Profile</h1>
            <p>Manage your Ferrari Rentals account</p>
          </div>
          <button onClick={() => navigate("/")} className="back-btn">
            ← Back to Home
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          <div className="profile-card">
            <div className="card-header">
              <h2>Personal Information</h2>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="edit-btn">
                  ✏️ Edit
                </button>
              ) : (
                <div className="edit-actions">
                  <button onClick={handleEditSave} className="save-btn">Save</button>
                  <button onClick={handleEditCancel} className="cancel-btn">Cancel</button>
                </div>
              )}
            </div>

            <div className="profile-info">
              <div className="info-row">
                <label>Full Name:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{userInfo.name}</span>
                )}
              </div>

              <div className="info-row">
                <label>Email:</label>
                <span>{userInfo.email}</span>
              </div>

              <div className="info-row">
                <label>Phone:</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{userInfo.phone}</span>
                )}
              </div>

              <div className="info-row">
                <label>Address:</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                    className="edit-input"
                  />
                ) : (
                  <span>{userInfo.address}</span>
                )}
              </div>

              <div className="info-row">
                <label>Role:</label>
                <span className="role-badge">{userInfo.role === "ROLE_ADMIN" ? "Admin" : "User"}</span>
              </div>

              <div className="info-row">
                <label>Member Since:</label>
                <span>{userInfo.memberSince}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="profile-actions">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button onClick={() => navigate("/mybookings")} className="action-btn bookings-btn">
                📋 My Bookings
              </button>
              <button onClick={() => navigate("/")} className="action-btn browse-btn">
                🚗 Browse Cars
              </button>
              <button onClick={handleLogout} className="action-btn logout-btn">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;