import { useState, useCallback } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../lib/firebase";

export function useCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCars = useCallback(async () => {
    try {
      setLoading(true);
      const snapshot = await getDocs(collection(db, "cars"));
      const carList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          images: Array.isArray(data.images) ? data.images : [],
        };
      });
      setCars(carList);
    } catch (err) {
      console.error("Error loading cars from Firebase:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveCar = async (form, editIndex = null) => {
    if (!form.title) throw new Error("Car title is required");

    if (editIndex !== null && cars[editIndex]?.id) {
      const carId = cars[editIndex].id;
      await updateDoc(doc(db, "cars", carId), form);
    } else {
      await addDoc(collection(db, "cars"), form);
    }

    await loadCars(); // refresh after save
  };

  const deleteCar = async (id) => {
    try {
      await deleteDoc(doc(db, "cars", id));
      await loadCars(); // refresh after delete
    } catch (err) {
      console.error("Error deleting car:", err);
    }
  };

  return {
    cars,
    loading,
    loadCars,
    saveCar,
    deleteCar,
  };
}
