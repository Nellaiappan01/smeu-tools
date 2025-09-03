import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Admin Login",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // ✅ Replace with DB check if needed
        if (
          credentials.username === process.env.ADMIN_USER &&
          credentials.password === process.env.ADMIN_PASS
        ) {
          return { id: "1", name: "Commander Admin", role: "admin" };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
  },
  pages: {
    signIn: "/login", // ✅ custom login page
  },
});

export { handler as GET, handler as POST };
