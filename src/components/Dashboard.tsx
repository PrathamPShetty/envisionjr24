import React, { useState, useEffect } from "react";
import axios from "axios";

interface Participant {
  id: string;
  name: string;
  department: string;
  semester: string;
  event: string;
  place: string;
}

interface Department {
  id: string;
  name: string;
}

export default function Dashboard() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    department: "",
    semester: "",
    event: "",
    place: "",
  });
  const storedUsername = sessionStorage.getItem("username");
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setFormData((prevData) => ({ ...prevData, username }));
    }
  }, []);

  useEffect(() => {
    // Fetch participants
    const fetchParticipants = async () => {
      if (!storedUsername) {
        console.error("Username is missing in session storage");
        return;
      }
      try {
        const response = await axios.get(`/api/v1/dashboard/${storedUsername}`);
        if (response.status === 200) {
          setParticipants(response.data);
        } else {
          console.error("Error fetching participants:", response.data);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchParticipants();
  }, [storedUsername]);

  useEffect(() => {
    // Fetch departments
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`/api/v1/department`);
        if (response.status === 200) {
          setDepartments(response.data);
          console.log(response.data);
        } else {
          console.error("Error fetching departments:", response.data);
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchDepartments();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username) {
      alert("Username is required");
      return;
    }

    try {
      const response = await axios.post("/api/v1/dashboard", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setParticipants([...participants, response.data]);
        setFormData({
          username: formData.username,
          name: "",
          department: "",
          semester: "",
          event: "",
          place: "",
        });
        console.log("Participant added successfully:", response.data);
      } else {
        console.error("Error adding participant:", response.data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`/api/v1/dashboard/${id}`);
      if (response.status === 200) {
        setParticipants(participants.filter((p) => p.id !== id));
        console.log("Participant deleted successfully");
      } else {
        console.error("Error deleting participant:", response.data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const handleUpdate = async (id: string, updatedData: Participant) => {
    try {
      const response = await axios.put(`/api/v1/dashboard/${id}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setParticipants(
          participants.map((p) =>
            p.id === id ? { ...p, ...updatedData } : p
          )
        );
        console.log("Participant updated successfully");
      } else {
        console.error("Error updating participant:", response.data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Poppins', sans-serif",
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
          🎉 Event Dashboard
        </h1>
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="name"
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}
          >
            Participant Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter participant name"
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

    
         




          <label htmlFor="department"   style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}>Select Department</label>
          <select
            id="department"
            value={formData.department}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <option value="">Choose department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>

          <label htmlFor="semester"    style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}>Select Semester</label>
          <select
            id="semester"
            value={formData.semester}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <option value="">Choose a semester</option>
            {Array.from({ length: 8 }, (_, i) => (
              <option key={i + 1} value={`Semester ${i + 1}`}>
                Semester {i + 1}
              </option>
            ))}
          </select>

          <label
            htmlFor="name"
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}
          >
            Event
          </label>
          <input
            type="text"
            id="event"
            value={formData.event}
            onChange={handleInputChange}
            placeholder="Enter event name"
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

          <label
            htmlFor="place"
            style={{
              fontWeight: "bold",
              marginBottom: "5px",
              display: "block",
              color: "#2c3e50",
            }}
          >
            Select Place
          </label>
          <select
            id="place"
            value={formData.place}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px",
              borderRadius: "10px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <option value="">Choose a place</option>
            <option value="First">First</option>
            <option value="Second">Second</option>
          </select>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              background: "#16a085",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Add Participant
          </button>
        </form>

        <h2
          style={{
            fontSize: "1.5rem",
            marginTop: "40px",
            marginBottom: "20px",
            textAlign: "center",
            color: "#34495e",
          }}
        >
          Participants List
        </h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: "20px",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Department
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Semester
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Event
              </th>
              <th
                style={{
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "left",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.id}>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {participant.name}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {participant.department}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {participant.semester}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  {participant.event}
                </td>
                <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
                  <button
                    onClick={() =>
                      handleUpdate(participant.id, {
                        ...participant,
                        name: "Updated Name", 
                      })
                    }
                    style={{
                      padding: "5px 10px",
                      background: "#16a085",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(participant.id)}
                    style={{
                      padding: "5px 10px",
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
