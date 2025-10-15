import React, { useState, useEffect } from "react";
import { X, Save } from "lucide-react";

const UserForm = ({ user, onSave, onCancel, isEditing }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
  });

  useEffect(() => {
    if (user && isEditing) {
      setFormData({
        name: user.name,
        email: user.email,
        age: user.age || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        age: "",
      });
    }
  }, [user, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      age: formData.age ? parseInt(formData.age) : null,
    });
  };

  return (
    <div className="user-form-overlay">
      <div className="user-form">
        <div className="form-header">
          <h2>{isEditing ? "Edit User" : "Add New User"}</h2>
          <button className="btn-close" onClick={onCancel}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="1"
              max="150"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              <Save size={16} />
              {isEditing ? "Update" : "Create"} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
