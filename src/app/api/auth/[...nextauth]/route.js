import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

import { connectToDB } from "@/utils/database";
import User from "@/models/user.js";


// create authentication options
const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.clientId,
            clientSecret: process.env.clientSecret
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email
            });

            session.user.id = sessionUser?._id.toString();

            return session;
        },
        async signIn({ profile }) {
            // serverless routing or API
            try {
                await connectToDB();

                // check if user already exists
                const userExists = await User.findOne({
                    email: profile.email
                });

                // if not, create new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            }
            catch (error) {
                console.log(error.message, 'hello error');
                return false;
            }

        }
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };