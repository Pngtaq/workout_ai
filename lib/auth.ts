import NextAuth from "next-auth";
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

type TUser = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};
const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }: { auth?: TUser }) {
      return !!auth?.user;
    },
    async signIn({ profile }: { profile?: Tprofile }) {
      if (!profile) return false;

      const typedProfile = profile as Tprofile;

      const res = await fetch(`${process.env.NEXTAUTH_URL}/api/user`, {
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
  //Sign in and signout function to export in your custom login and logout button
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
