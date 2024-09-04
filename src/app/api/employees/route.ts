import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "6", 10);
  const skip = (page - 1) * limit;

  try {
    const employees = await prisma.employee.findMany({
      skip,
      take: limit,
    });

    const totalEmployees = await prisma.employee.count();

    return NextResponse.json({
      data: employees,
      total: totalEmployees,
      page,
      totalPages: Math.ceil(totalEmployees / limit),
    });
  } catch (error) {
    return NextResponse.error();
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const employee = await prisma.employee.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        position: body.position,
        email: body.email,
        phone: body.phone,
      },
    });
    console.log(employee);

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Error creating employee:", error);
    return NextResponse.error();
  }
}
