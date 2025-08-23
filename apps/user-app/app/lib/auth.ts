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
          type: "tel",
          placeholder: "93XXX-XXXXX",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password(min. 8 characters)",
        },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) return null;
        try {
          const validInput = z.safeParse(signinInput, credentials);
          console.log(validInput);

          if (!validInput.success) {
            throw new Error(validInput.error.message);
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              number: credentials.phone,
            },
          });
          if (!existingUser) {
            throw new Error("User does not exist");
          }
          if (existingUser) {
            const passwordValidation = await bcrypt.compare(
              credentials.password,
              existingUser.password,
            );
            if (!passwordValidation) {
              throw new Error("Incorrect password");
            } else {
              return {
                id: existingUser.id.toString(),
                name: existingUser.name,
                email: existingUser.number,
              };
            }
          }
        } catch (error) {
          throw new Error(`${error}`);
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },

  secret: process.env.JWT_SECRET || "secretforlogin",

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
  phone: z
    .string()
    .regex(/^\d+$/, { message: "Phone must contain only digits" })
    .length(10),
  password: z.string().min(6),
});
