import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const employees = [
    {
      firstName: "Jack",
      lastName: "Hansen",
      position: "CEO",
      phone: "08537428374",
      email: "robertr@dx-email.my",
    },
    {
      firstName: "New",
      lastName: "Data",
      position: "CEO",
      phone: "089238727364",
      email: "robertr@dx-email.com",
    },
    {
      firstName: "Sarah",
      lastName: "Johnson",
      position: "Controller",
      phone: "089362537625",
      email: "sandraj@dx-email.id",
    },
    {
      firstName: "Johnson",
      lastName: "Heart",
      position: "CTO",
      phone: "085537283743",
      email: "jheart@dx-email.id",
    },
    {
      firstName: "Robert",
      lastName: "Reagan",
      position: "CTO",
      phone: "087436263572",
      email: "robertr@dx-email.id",
    },
    {
      firstName: "Cynthia",
      lastName: "Stanwick",
      position: "HR Assistant",
      phone: "089234883726",
      email: "cindys@dx-email.com",
    },
    {
      firstName: "Greta",
      lastName: "Sims",
      position: "HR Manager",
      phone: "081287384783",
      email: "gretas@dx-email.com",
    },
    {
      firstName: "Brett",
      lastName: "Modified",
      position: "IT Manager",
      phone: "089347837427",
      email: "brettw@dx-email.com",
    },
    {
      firstName: "Taylor",
      lastName: "Riley",
      position: "Network Admin New",
      phone: "082343847263",
      email: "taylorr@dx-email.com",
    },
  ];

  for (const employee of employees) {
    await prisma.employee.create({
      data: employee,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
