import React from "react";
import { Edit3, Trash2 } from "lucide-react";

const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <div className="user-item">
      <div className="user-info">
        <h3>{user.name}</h3>
        <p className="email">{user.email}</p>
        <p className="age">Age: {user.age || "N/A"}</p>
      </div>
      <div className="user-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(user)}
          title="Edit User"
        >
          <Edit3 size={16} />
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(user.id)}
          title="Delete User"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default UserItem;
