

  // // Handle college points update
  // const handleUpdate = async (id: string) => {
  //   if (editingCollege === id) {
  //     try {
  //       const response = await axios.put(`/api/v1/college/${id}`, {
  //         points: formData.point,
  //       });

  //       setColleges(
  //         colleges.map((college) =>
  //           college.id === id ? { ...college, point: response.data.points } : college
  //         )
  //       );
  //       setEditingCollege(null); // Exit edit mode
        
  //     } catch (error) {
  //       console.error("Error updating college:", error);
  //       setError("Failed to update college. Please try again.");
  //     }
  //   }
  // };


  //   useEffect(() => {
  //     const fetchColleges = async () => {
  //       setLoading(true);
  //       try {
  //         const response = await axios.get("/api/v1/college");
  //         setColleges(response.data);
  //       } catch (error) {
  //         console.error("Error fetching colleges:", error);
  //         setError("Failed to load colleges. Please try again.");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchColleges();
  //   }, []);
  