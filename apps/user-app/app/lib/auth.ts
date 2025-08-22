import { prisma } from "@repo/db";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import z from "zod";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: {
          label: "Phone Number",
          type: "text",
          placeholder: "93XXX-XXXXX",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password(min. 8 characters)",
        },
      },
      async authorize(credentials: any) {
        console.log(credentials);

        const validInput = z.safeParse(signinInput, credentials);
        console.log(validInput);

        if (!validInput) {
          return {
            error: "invalid inputs",
          };
        }

        // const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await prisma.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.number,
            };
          }
          return null;
        }

        // todo : signup page with email and name

        // try {
        //   const user = await prisma.user.create({
        //     data: {
        //       number: credentials.phone,
        //       password: hashedPassword,
        //     },
        //   });
        //   return {
        //     id: user.id.toString(),
        //     name: user.name,
        //     email: user.number,
        //   };
        // } catch (e) {
        //   console.log(e);
        // }
        return null;
      },
    }),
  ],
  secret: process.env.JWT_SECRET || "secret",
  callbacks: {
    async session({ session, token }: any) {
      if (session?.user && token?.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const signinInput = z.object({
  phone: z.string().length(10),
  password: z.string().min(6),
});
