import React, { useState, useEffect } from "react";

interface DatasetItem {
  name: string;
  point: number;
}

export default function Leaderboard() {
  const [dataset, setDataset] = useState<DatasetItem[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch college data
  const fetchDepartments = async (): Promise<DatasetItem[]> => {
    try {
      const response = await fetch("/api/v1/dashboard");
      const data = await response.json();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  };

  // Convert one-dimensional array to two-dimensional array
  const toTwoDimensional = (array: DatasetItem[], chunkSize: number): DatasetItem[][] => {
    const result: DatasetItem[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const fetchDataAndSet = async () => {
    const departments = await fetchDepartments();
    const twoDimensionalData = toTwoDimensional(departments, 10); // Split into chunks of 10
    setDataset(twoDimensionalData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDataAndSet();

    const interval = setInterval(() => {
      fetchDataAndSet();
    }, 200000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', padding: '0', margin: '0' }}>
    {/* Header Section */}
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f4f4f4', padding: '10px' }}>
      <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <div style={{ flex: '0 0 10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/logo1.png" alt="Logo 1" style={{ maxWidth: '30%', height: 'auto' }} />
        </div>
        <h1 style={{ flexGrow: 1, textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Srinivas Institute Of Technology</h1>
        <h1 style={{ flexGrow: 1, textAlign: 'center', fontSize: '24px', fontWeight: 'bold' }}>Envision Junior 2k24</h1>
        <div style={{ flex: '0 0 10%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/logo2.jpg" alt="Logo 2" style={{ maxWidth: '30%', height: 'auto' }} />
        </div>
      </div>
    </header>

    {/* Cards Section */}
    <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
      {dataset.map((card, cardIndex) => (
        <div key={cardIndex} style={{ flex: 1, margin: '0 10px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', padding: '10px' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>College Name</th>
                <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left', backgroundColor: '#f2f2f2', fontWeight: 'bold' }}>Marks</th>
              </tr>
            </thead>
            <tbody>
              {card.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.name}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  </div>
);
}
