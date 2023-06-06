import dbConnect from "@/lib/db";
import Gas from "@/models/GasModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const gas = await Gas.findById(params.gasId);
    return NextResponse.json(gas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while getting this gas",
      error: error?.message,
    });
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    const body = await request.json();

    const {
      sellingDate,
      customerName,
      customerPhone,
      customerAddress,
      consumerNumber,
    } = body;

    const gas = await Gas.findByIdAndUpdate(params.gasId, {
      sellingDate,
      customerName,
      customerPhone,
      customerAddress,
      consumerNumber,
    });
    return NextResponse.json(gas);
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while updating gas",
      error: error?.message,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    const gas = await Gas.findByIdAndDelete(params.gasId);
    return NextResponse.json({
      message: "Deleted Gas with Serial Number: " + gas.serialNumber,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error occurred while deleting gas",
      error: error?.message,
    });
  }
}
