import dbConnect from "@/lib/db";
import Gas from "@/models/GasModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();
    const allGas = await Gas.find({ sellingDate: { $exists: false } });
    return NextResponse.json(allGas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while getting all gas",
      error: error?.message,
    });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { gasSerialNumber, receivingDate } = body;

    const newGas = await Gas.create({ gasSerialNumber, receivingDate });

    return NextResponse.json(newGas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while getting adding new gas",
      error: error?.message,
    });
  }
}
