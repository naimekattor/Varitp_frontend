import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    refreshToken?: string;
    user: {
      id: string;
      email: string;
      first_name: string;
      last_name: string;
      phone: string;
      address: string;
      role: string;
      image?: string | null;
    };
  }
}
