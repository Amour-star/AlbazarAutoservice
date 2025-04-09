export const useCars = () => {
  const [cars, setCars] = useState([]);

  const loadCars = async () => {
    const snapshot = await getDocs(collection(db, "cars"));
    const carList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      images: Array.isArray(doc.data().images) ? doc.data().images : [],
    }));
    setCars(carList);
  };

  const saveCar = async (form, editIndex) => {
    if (editIndex !== null && cars[editIndex].id) {
      await updateDoc(doc(db, "cars", cars[editIndex].id), form);
    } else {
      await addDoc(collection(db, "cars"), form);
    }
    await loadCars();
  };

  const deleteCar = async (id) => {
    await deleteDoc(doc(db, "cars", id));
    await loadCars();
  };

  return { cars, loadCars, saveCar, deleteCar };
};
