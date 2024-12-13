import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'

// Define the structure of a college object
interface College {
  id: string;
  name: string;
  point: number;
}

export default function Dashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [formData, setFormData] = useState<{ point: number }>();
  const [editData, setEditData] = useState<{ point: number }>();
  const [error, setError] = useState<string>("");
  const [editingCollege, setEditingCollege] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const storedUsername = sessionStorage.getItem("username");
  const router = useRouter(); // Initialize the router

  // Fetch colleges on component mount
  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/v1/college");
        setColleges(response.data);
        setFilteredColleges(response.data); // Initialize with all colleges
      } catch (error) {
        console.error("Error fetching colleges:", error);
        setError("Failed to fetch colleges. Please try again.");
      }
    };

    fetchColleges();
  }, []);

  // Filter colleges by search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredColleges(colleges); // If no search query, show all colleges
    } else {
      setFilteredColleges(
        colleges.filter((college) =>
          college.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, colleges]);

  // Handle the delete action
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/v1/college/${id}`);
      setColleges(colleges.filter((college) => college.id !== id));
      setFilteredColleges(filteredColleges.filter((college) => college.id !== id));
    } catch (error) {
      console.error("Error deleting college:", error);
      setError("Failed to delete college. Please try again.");
    }
  };

  // Handle the edit action
  const handleEdit = (id: string, name: string, point: number) => {
    setEditingCollege(id);
    setFormData({ point });
  };

  // Handle the update action
  const handleUpdate = async (id: string) => {
    if (editingCollege === id) {
      try {
        const response = await axios.put(`/api/v1/college/${id}`, {
          points: setEditData.point,
        });

        setColleges(
          colleges.map((college) =>
            college.id === id ? { ...college, point: response.data.points } : college
          )
        );
        setFilteredColleges(
          filteredColleges.map((college) =>
            college.id === id ? { ...college, point: response.data.points } : college
          )
        );
        setEditingCollege(null);
        setFormData();
      } catch (error) {
        console.error("Error updating college:", error);
        setError("Failed to update college. Please try again.");
      }
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      point: Number(value),
    });
  };

  // Navigate to the Add College page
  const handleNavigateToAddCollege = () => {
    router.push("/admin/addcollege"); // Navigate to the Add College page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Colleges</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-xs">
        <input
          type="text"
          placeholder="Search by College Name"
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

   
      <div className="mb-6 w-full max-w-xs">
        <button
          onClick={handleNavigateToAddCollege}
          className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-700"
        >
          Add College
        </button>
      </div>

      <div className="w-full max-w-7xl overflow-x-auto">
        <table className="table-auto w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b font-semibold">S.No</th>
              <th className="py-3 px-6 border-b font-semibold">College Name</th>
              <th className="py-3 px-6 border-b font-semibold">Points</th>
              <th className="py-3 px-6 border-b font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredColleges.map((college, index) => (
              <tr key={college.id} className="border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{college.name}</td>
                <td className="py-3 px-6">
                  {editingCollege === college.id ? (
                    <form className="flex items-center">
                      <input
                        type="number"
                        id="point"
                        value={setEditData.point}
                        onChange={handleInputChange}
                        placeholder="Enter points"
                        className="bg-transparent border border-gray-300 text-gray-700 py-2 px-3 w-28 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleUpdate(college.id)}
                        className="bg-teal-500 text-white px-6 py-2 rounded ml-4 hover:bg-teal-700"
                      >
                        Update
                      </button>
                    </form>
                  ) : (
                    <span>{college.point}</span>
                  )}
                </td>
                <td className="py-3 px-6">
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEdit(college.id, college.name, college.point)}
                      className="bg-teal-500 text-white px-6 py-2 rounded hover:bg-teal-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(college.id)}
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
    </div>
  );
}
