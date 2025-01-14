import React, { useState } from "react";

const CreateRoom = () => {
  const [formData, setFormData] = useState({
    roomType: "",
    description: "",
    facilities: "",
    size: "",
    maxPerson: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
    // Add your API call or logic to handle the form data here.
  };

  const styles = {
    form: {
      maxWidth: "400px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    input: {
      width: "100%",
      marginBottom: "15px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create a Room</h2>
      <input
        type="text"
        name="roomType"
        placeholder="Room Type"
        value={formData.roomType}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={styles.input}
        rows="3"
        required
      />
      <input
        type="text"
        name="facilities"
        placeholder="Facilities (comma separated)"
        value={formData.facilities}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="size"
        placeholder="Size (sq. ft)"
        value={formData.size}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="maxPerson"
        placeholder="Max Person"
        value={formData.maxPerson}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        style={styles.input}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleChange}
        style={styles.input}
        required
      />
      <button type="submit" style={styles.button}>
        Create Room
      </button>
    </form>
  );
};

export default CreateRoom;
