import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, ctx: { params: { id: string } }) {
  try {
    const employees = await prisma.employee.findFirst({
      where: { id: ctx.params.id },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function DELETE(
  request: Request,
  ctx: { params: { id: string } }
) {
  try {
    const employees = await prisma.employee.delete({
      where: { id: ctx.params.id },
    });
    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.error();
  }
}

export async function PATCH(request: Request, ctx: { params: { id: string } }) {
  try {
    const body = await request.json();
    const id = ctx.params.id;
    const employee = await prisma.employee.update({
      where: { id },
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
