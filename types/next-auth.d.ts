import { DefaultSession } from "next-auth";

// Declare module augmentation
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
      registerMethod: string; // Add custom property here
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    name: string;
    image: string;
    registerMethod: string; // Add custom property here
  }
}
