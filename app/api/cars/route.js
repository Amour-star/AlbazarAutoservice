// app/api/cars/route.js
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "data", "cars.json");
  try {
    const data = await fs.readFile(filePath, "utf8");
    const cars = JSON.parse(data);
    return NextResponse.json(cars);
  } catch (err) {
    console.error("Failed to read cars:", err);
    return NextResponse.json([], { status: 500 });
  }
}
