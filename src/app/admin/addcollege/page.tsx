"use client";
import React, { useState } from "react";
import axios from "axios";

// Define the structure of a college object
interface College {
  id: string;
  name: string;
  point: number;
}

export default function AddCollege() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({ college: "", point: 0 });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const storedUsername = sessionStorage.getItem("username");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: id === "point" ? Number(value) : value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!storedUsername) {
      setError("You must be logged in to submit data.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/v1/college", {
        name: formData.college,
        points: formData.point,
      });
      setColleges([...colleges, response.data]);
      setFormData({ college: "", point: 0 });
      setError("");
    } catch (error) {
      console.error("Error submitting college:", error);
      setError("Failed to submit college. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
        backgroundColor: "#f4f6f9",
        padding: "0 20px", // Add some padding to avoid edges
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          padding: "20px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          width: "100%",
          animation: "fadeIn 1s ease-in-out",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            textAlign: "center",
            marginBottom: "20px",
            color: "#34495e",
          }}
        >
          🎉 Add New College
        </h1>
        {error && (
          <div
            style={{
              color: "#e74c3c",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="college"
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}
          >
            College Name
          </label>
          <input
            type="text"
            id="college"
            value={formData.college}
            onChange={handleInputChange}
            placeholder="Enter college name"
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "all 0.3s ease-in-out",
            }}
          />

         

          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                backgroundColor: "#16a085",
                color: "white",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
