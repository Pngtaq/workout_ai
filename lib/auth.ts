import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

type Tprofile = {
  iss: string;
  azp: string;
  aud: string;
  sub: string;
  email: string;
  email_verified: string;
  at_hash: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
  iat: number;
  exp: number;
};

// type TUser = {
//   user: {
//     name?: string | null;
//     email?: string | null;
//     image?: string | null;
//   };
// } | null;

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ profile }) {
      const typedProfile = profile as Tprofile | undefined;
      if (!typedProfile) return false;

      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          firstName: typedProfile.given_name,
          lastName: typedProfile.family_name || typedProfile.given_name,
          email: typedProfile.email,
          image: typedProfile.picture,
        }),
      });

      if (!res.ok) throw new Error(`Error: ${res.status}`);
      console.log(typedProfile);
      return true;
    },
  },

  // pages: { signIn: "/login", signOut: "/logout" },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
