import dbConnect from "@/lib/db";
import Gas from "@/models/GasModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const allGas = await Gas.find({ sellingDate: { $exists: true } }).limit(10);
    return NextResponse.json(allGas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while getting 10 sold gas",
      error: error?.message,
    });
  }
}
