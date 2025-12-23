// src/components/AddItemModal.jsx
import { useState } from "react";

export default function AddItemModal({ onSubmit, onCancel }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert("Name is required!");
    onSubmit({ name });
    setName("");
  };

  return (
    <div className="modal">
      <form className="modal-form" onSubmit={handleSubmit}>
        <h3>Add New Item</h3>
        <input
          type="text"
          placeholder="Item Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button type="submit" className="add-item">
            Submit
          </button>
          <button type="button" className="freeze-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
