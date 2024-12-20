import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Define the structure of a college object
interface College {
  id: string;
  name: string;
  point: number;
}

export default function Dashboard() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [filteredColleges, setFilteredColleges] = useState<College[]>([]);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [editData, setEditData] = useState<{ point: number }>({ point: 0 });
    const [editingCollege, setEditingCollege] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get("/api/v1/college");
        setColleges(response.data.map((college: any) => ({
            id: college._id,
            name: college.name,
            point: college.point,
            })));
        console.log(response.data);

        setFilteredColleges(colleges);

      } catch (error) {
        console.error("Error fetching colleges:", error);
        setError("Failed to fetch colleges. Please try again.");
      }
    };

    fetchColleges();
  }, []);

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



  const handleUpdate = async (id: string) => {
    if (editingCollege === id) {
      try {
        const response = await axios.put(`/api/v1/college/${id}`, {
          points: editData.point,
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
        setEditData({ point: 0 });
      } catch (error) {
        console.error("Error updating college:", error);
        setError("Failed to update college. Please try again.");
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditData({ ...editData, point: Number(value) });
  };

  const handleNavigateToAddCollege = () => {
    router.push("/admin/addcollege");
  };


  const handleEdit = (id: string) => {
    setEditingCollege(id);
    setEditData({ point: colleges.find((college) => college.id === id)?.point || 0 });

  }
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
              <tr key={index} className="border-b">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6">{college.name}</td>
                <td className="py-3 px-6">
                  {editingCollege === college.id ? (
                    <form className="flex items-center">
                      <input
                        type="number"
                        value={editData.point}
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
                      onClick={ ()=>handleEdit(college.id)}
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
