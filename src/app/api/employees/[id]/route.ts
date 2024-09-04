import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     description: Get a specific employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: A single employee object
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     description: Delete a specific employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/employees/{id}:
 *   patch:
 *     description: Update a specific employee by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               position:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       404:
 *         description: Employee not found
 *       500:
 *         description: Internal server error
 */
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
