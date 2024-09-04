import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/employees:
 *   get:
 *     description: Get a paginated list of employees
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 6
 *         description: The number of items per page
 *     responses:
 *       200:
 *         description: A paginated list of employees
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/employees:
 *   post:
 *     description: Create a new employee
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
 *         description: Employee created successfully
 *       500:
 *         description: Internal server error
 */
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
