import dbConnect from "@/lib/db";
import Gas from "@/models/GasModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const allGas = await Gas.count({ sellingDate: { $exists: true } });
    return NextResponse.json(allGas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while getting all sold gas count",
      error: error?.message,
    });
  }
}
