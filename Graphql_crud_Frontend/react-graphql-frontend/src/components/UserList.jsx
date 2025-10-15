import React, { useState, useEffect } from "react";
import { Plus, Search } from "lucide-react";
import UserItem from "./UserItem";
import UserForm from "./UserForm";
import Loading from "./Loading";
import {
  graphQLClient,
  GET_ALL_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  GET_USERS_BY_NAME,
} from "../services/graphqlClient";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await graphQLClient.request(GET_ALL_USERS);
      setUsers(data.getAllUsers || []);
    } catch (err) {
      setError("Failed to load users: " + err.message);
      console.error("Error loading users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      loadUsers();
      return;
    }

    try {
      setLoading(true);
      const variables = { name: searchTerm };
      const data = await graphQLClient.request(GET_USERS_BY_NAME, variables);
      setUsers(data.getUsersByName || []);
    } catch (err) {
      setError("Search failed: " + err.message);
      console.error("Error searching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      setError("");
      const variables = {
        name: userData.name,
        email: userData.email,
        age: userData.age,
      };
      await graphQLClient.request(CREATE_USER, variables);
      setShowForm(false);
      loadUsers();
    } catch (err) {
      setError("Failed to create user: " + err.message);
      console.error("Error creating user:", err);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      setError("");
      const variables = {
        id: editingUser.id,
        name: userData.name,
        email: userData.email,
        age: userData.age,
      };
      await graphQLClient.request(UPDATE_USER, variables);
      setEditingUser(null);
      loadUsers();
    } catch (err) {
      setError("Failed to update user: " + err.message);
      console.error("Error updating user:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      setError("");
      const variables = { id: userId };
      await graphQLClient.request(DELETE_USER, variables);
      loadUsers();
    } catch (err) {
      setError("Failed to delete user: " + err.message);
      console.error("Error deleting user:", err);
    }
  };

  const handleSave = (userData) => {
    if (editingUser) {
      handleUpdateUser(userData);
    } else {
      handleCreateUser(userData);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  if (loading && users.length === 0) {
    return <Loading />;
  }

  return (
    <div className="user-list-container">
      <div className="header">
        <h1>User Management</h1>
        <button className="btn-primary" onClick={() => setShowForm(true)}>
          <Plus size={20} />
          Add User
        </button>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn-search" onClick={handleSearch}>
            <Search size={16} />
          </button>
        </div>
        <button className="btn-reset" onClick={loadUsers}>
          Reset
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-grid">
        {users.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            onEdit={setEditingUser}
            onDelete={handleDeleteUser}
          />
        ))}
      </div>

      {users.length === 0 && !loading && (
        <div className="empty-state">
          <p>
            No users found.{" "}
            {searchTerm ? "Try a different search." : "Add your first user!"}
          </p>
        </div>
      )}

      {(showForm || editingUser) && (
        <UserForm
          user={editingUser}
          onSave={handleSave}
          onCancel={handleCancel}
          isEditing={!!editingUser}
        />
      )}
    </div>
  );
};

export default UserList;
