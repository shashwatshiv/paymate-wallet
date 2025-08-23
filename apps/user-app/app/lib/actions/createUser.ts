"use server";
import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import z from "zod";
export default async function createUser(
  name: string,
  email: string,
  phoneNumber: string,
  password: string,
) {
  const validInput = signupInput.safeParse({
    name,
    email,
    phoneNumber,
    password,
  });

  if (!validInput.success) {
    return { error: " invalid input" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const exist = await prisma.user.findFirst({
      where: {
        number: phoneNumber,
      },
    });
    if (exist) {
      return {
        error: "Phone Number already taken",
      };
    }
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        number: phoneNumber,
        password: hashedPassword,
      },
    });
    if (user) {
      const initialAmount = Math.ceil(Math.random() * 100000);
      await prisma.balance.create({
        data: {
          userId: user.id,
          amount: initialAmount,
          locked: 0,
        },
      });
      return user;
    }
  } catch (error) {
    console.log({ errorFromDB: error });
  }
  return { error: "db error" };
}

const signupInput = z.object({
  name: z.string(),
  email: z.email(),
  phoneNumber: z
    .string()
    .regex(/^\d+$/, { message: "Phone must contain only digits" })
    .length(10),
  password: z.string().min(6),
});
