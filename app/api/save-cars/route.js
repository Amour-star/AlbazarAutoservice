// app/api/save-cars/route.js
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  const cars = await request.json();
  const filePath = path.join(process.cwd(), "public", "data", "cars.json");

  try {
    await fs.writeFile(filePath, JSON.stringify(cars, null, 2));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to save cars:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
