import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password credentials");
          return null;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        try {
          const payload = {
            email: credentials.email,
            password: credentials.password,
          };
          
          console.log("=== NEXTAUTH LOGIN ATTEMPT ===");
          console.log("API URL:", apiUrl);
          console.log("Payload being sent to backend:", JSON.stringify(payload, null, 2));
          
          const response = await axios.post(
            `${apiUrl}/auth/api/v1/login/`,
            payload,
            {
              headers: {
                "Content-Type": "application/json",
                "ngrok-skip-browser-warning": "any",
                "Accept-Language": "hr",
              },
              timeout: 10000,
            }
          );

          console.log("✅ Login response status:", response.status);
          console.log("✅ Login response data:", JSON.stringify(response.data, null, 2));

          // Handle successful response
          if (response.data) {
            const data = response.data.data || response.data.user || response.data;
            const access = response.data.access || response.data.token;
            
            if (access && data?.id && data?.email) {
              const user = {
                id: String(data.id),
                email: data.email,
                name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
                accessToken: access,
                refreshToken: response.data.refresh || null,
                user: data,
              };
              console.log("✅ Login successful for user:", user.email);
              return user;
            } else {
              console.log("❌ Missing required fields in response:", {
                hasAccess: !!access,
                hasId: !!data?.id,
                hasEmail: !!data?.email,
                dataContent: data,
              });
            }
          }
          
          console.log("❌ Login failed: Invalid response structure");
          return null;
        } catch (error: any) {
          console.error("❌ === NEXTAUTH LOGIN ERROR ===");
          console.error("Status Code:", error.response?.status);
          console.error("Backend Response:", JSON.stringify(error.response?.data, null, 2));
          console.error("Error Message:", error.message);
          
          if (error.response?.status === 401) {
            console.error("❌ 401 Unauthorized - Invalid email or password");
            console.error("   → Check if account exists in backend");
            console.error("   → Verify email and password are correct");
          } else if (error.response?.status === 400) {
            console.error("❌ 400 Bad Request - Invalid request format");
            console.error("   Backend error details:", error.response?.data);
          } else if (error.code === "ECONNREFUSED") {
            console.error("❌ Connection refused - Backend API is NOT running");
            console.error("   → Expected at:", apiUrl);
          } else if (error.code === "ENOTFOUND") {
            console.error("❌ DNS error - Cannot resolve backend URL:", apiUrl);
          }
          
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = (user as any).accessToken;
        token.refreshToken = (user as any).refreshToken;
        token.user = (user as any).user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.accessToken) {
        session.accessToken = token.accessToken as string;
      }
      if (token.refreshToken) {
        session.refreshToken = token.refreshToken as string;
      }
      if (token.user) {
        session.user = token.user as any;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
