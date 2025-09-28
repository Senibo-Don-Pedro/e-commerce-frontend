import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  // This is where you define your authentication providers
  providers: [
    // We will configure the Google provider later.
    // It will point to your Spring Boot backend.
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          // This URL points to YOUR backend, not directly to Google
          authorization_url: `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`,
        },
      },
    }),

    // This is the provider for your email/password login form.
    Credentials({
      // You can name this provider whatever you want.
      name: "Credentials",

      // The `authorize` function is where you'll define your custom logic
      // to call your Spring Boot backend.
      async authorize(credentials) {
        // We will add the logic to call your backend here in a later step.
        // For now, we return null to indicate it's not implemented yet.
        console.log("Credentials provider trying to authorize with:", credentials);

        // TODO: Call your Spring Boot `/api/v1/auth/login` endpoint here.
        // If the login is successful, return the user object from your backend.
        // If it fails, return null.

        return null;
      },
    }),
  ],

  // We will add more configuration here later, like callbacks to handle the JWT.
});