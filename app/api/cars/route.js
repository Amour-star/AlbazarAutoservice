// app/api/cars/route.js
import { NextResponse } from "next/server";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "cars"));
    const cars = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(cars);
  } catch (err) {
    console.error("Failed to fetch cars from Firebase:", err);
    return NextResponse.json([], { status: 500 });
  }
}
