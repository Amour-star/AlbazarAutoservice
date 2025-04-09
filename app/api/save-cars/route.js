// app/api/save-cars/route.js
import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export async function POST(request) {
  const cars = await request.json();

  try {
    const carsCollection = collection(db, "cars");

    // 1. Delete all existing cars
    const existing = await getDocs(carsCollection);
    const deletePromises = existing.docs.map((docSnap) =>
      deleteDoc(doc(db, "cars", docSnap.id))
    );
    await Promise.all(deletePromises);

    // 2. Save new list
    const savePromises = cars.map(async (car) => {
      const newDoc = doc(collection(db, "cars"));
      await setDoc(newDoc, car);
    });
    await Promise.all(savePromises);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save cars to Firestore:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
