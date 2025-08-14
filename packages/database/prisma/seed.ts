import { PrismaClient } from "../generated/prisma";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

async function main() {
  const alice = await prisma.user.upsert({
    where: { number: "9988776655" },
    update: {},
    create: {
      number: "9988776655",
      password: await bcrypt.hash("password", 10),
      name: "alice",
      Balance: {
        create: {
          amount: 20000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Success",
          amount: 20000,
          token: "token__1",
          provider: "HDFC Bank",
        },
      },
    },
  });
  const bob = await prisma.user.upsert({
    where: { number: "9876543210" },
    update: {},
    create: {
      number: "9876543210",
      password: await bcrypt.hash("awesome", 10),
      name: "bob",
      Balance: {
        create: {
          amount: 2000,
          locked: 0,
        },
      },
      OnRampTransaction: {
        create: {
          startTime: new Date(),
          status: "Failure",
          amount: 2000,
          token: "token__2",
          provider: "HDFC Bank",
        },
      },
    },
  });
  console.log({ alice, bob });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
