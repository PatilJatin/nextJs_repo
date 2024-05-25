import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/Firebase/firebaseClient";
import NextAuth from "next-auth/next";
import { loginUser } from "@/services/auth/authService";

// Function to refresh Firebase token
async function refreshFirebaseToken(user: any | null): Promise<string | null> {
  try {
    if (user) {
      const refreshedUser = await user.getIdToken(true);
      return refreshedUser;
    }
    return null;
  } catch (error: any) {
    console.error("Error refreshing Firebase token:", error.message);
    return null;
  }
}

const authOptions: AuthOptions = {
  pages: {
    signIn: "/adminpanel/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async (credentials): Promise<any> => {
        return await signInWithEmailAndPassword(
          auth,
          (credentials as any).email || "",
          (credentials as any).password || ""
        )
          .then(async (userCredentials) => {
            if (userCredentials.user) {
              const { user } = userCredentials;

              // Refresh Firebase token
              const access_token = await refreshFirebaseToken(user);

              if (!access_token) {
                return null; // Token refresh failed, return null
              }

              const res = await loginUser(access_token);

              if (res) {
                return {
                  _id: res.data._id,
                  name: res.data.name,
                  email: res.data.email,
                  projects: res.data.projects,
                  isActive: res.data.isActive,
                  isSuperAdmin: res.data.isSuperAdmin,
                  firebaseId: res.data.firebaseId,
                  access_token: access_token,
                };
              }
            }
            return null;
          })
          .catch((err) => {
            console.log(err.message);
          });
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.isSuperAdmin = user.isSuperAdmin;
        token.access_token = user.access_token;
        token.trigger = trigger;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.access_token = token.access_token;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.isActive = token.isActive as boolean;
        session.user.isSuperAdmin = token.isSuperAdmin;
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
