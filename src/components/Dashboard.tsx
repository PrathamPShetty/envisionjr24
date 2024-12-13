import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the structure of a college object
interface College {
  id: string;
  name: string;
  point: number;
}

export default function Dashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState({ college: "", point: 0 });
  const [error, setError] = useState<string>("");
  const [editingCollege, setEditingCollege] = useState<string | null>(null);

  const storedUsername = sessionStorage.getItem("username");

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/v1/college");
        setColleges(response.data);
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setError("Failed to fetch colleges. Please try again.");
      }
    };

    fetchColleges();
  }, []);

  // Handle the delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/v1/college/${id}`);
      setColleges(colleges.filter((college) => college.id !== id));
    } catch (error) {
      console.error("Error deleting college:", error);
      setError("Failed to delete college. Please try again.");
    }
  };

  // Handle the edit action
  const handleEdit = (id: string, name: string, point: number) => {
    setEditingCollege(id);
    setFormData({ college: name, point }); // Populate form with college's current point
  };

  // Handle the update action
  const handleUpdate = async (id: string) => {
    if (editingCollege === id) {
      try {
        const response = await axios.put(`/api/v1/college/${id}`, {
          points: formData.point,
        });

        setColleges(
          colleges.map((college) =>
            college.id === id ? { ...college, point: response.data.points } : college
          )
        );
        setEditingCollege(null); // Clear the editing state after update
        setFormData({ college: "", point: 0 }); // Reset form data
      } catch (error) {
        console.error("Error updating college:", error);
        setError("Failed to update college. Please try again.");
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === "point" ? Number(value) : value, // Convert point to number
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Colleges</h1>

      <div className="w-full max-w-3xl">
        {colleges.map((college) => (
          <div key={college.id} className="bg-white p-4 mb-4 rounded shadow-md">
            <h2 className="text-2xl font-semibold">{college.name}</h2>

            {/* Display input for only the college being edited */}
            {editingCollege === college.id ? (
              <form className="mt-4">
                <div className="flex items-center border-b-2 border-teal-500 py-2">
                  <input
                    type="number"
                    id="point"
                    value={formData.point}
                    onChange={handleInputChange}
                    placeholder="Enter points"
                    className="bg-transparent border-none text-gray-700 py-1 px-2 w-full focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleUpdate(college.id)}
                    className="bg-teal-500 text-white px-4 py-2 rounded ml-4 hover:bg-teal-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4">
                <span className="text-lg">Points: {college.point}</span>
                <div className="flex mt-2 gap-3">
                  <button
                    onClick={() => handleEdit(college.id, college.name, college.point)}
                    className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(college.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

  
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
}
