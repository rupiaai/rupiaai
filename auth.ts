import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "./lib/dbConnect";
import userModel from "./models/user";

interface CustomToken {
  id: string;
  email: string;
  name: string;
  [key: string]: any;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;
        try {
          const user = await userModel.findOne({ email });
          if (!user) {
            throw new Error("No user found with this Email/Username");
          }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (!isPasswordCorrect) {
            throw new Error("Incorrect Password");
          }
          return { id: user.id, email: user.email };
        } catch (err: any) {
          throw new Error(err.message || "Something went wrong");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
        token.registerMethod = user.registerMethod;
      }
      return token as CustomToken;
    },
    async session({ session, token }) {
      session.user.id = (token as CustomToken).id;
      session.user.email = (token as CustomToken).email;
      session.user.name = (token as CustomToken).name;
      session.user.registerMethod = (token as CustomToken).registerMethod;
      session.user.image = (token as CustomToken).image;
      return session;
    },
    async signIn({ profile }) {
      try {
        await dbConnect();
        const userExists = await userModel.findOne({
          email: profile?.email,
        });
        if (!userExists) {
          const user = await userModel.create({
            username: profile?.name,
            email: profile?.email,
            image: profile?.picture,
            registerMethod: "google",
          });
        }
        return true;
      } catch (error) {
        console.error(error);
      }

      return true;
    },
  },
  pages: {
    signIn: "signin",
  },
  secret: process.env.JWT_SECRET,
});
