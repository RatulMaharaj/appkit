import { signIn } from "next-auth/react";
import Logo from "../../components/logo";
import Head from "next/head";
import Link from "next/link";

export default function Signout() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <Head>
        <title>instavoice - Sign Out</title>
      </Head>
      <div className="bg-white px-10 py-20 rounded-lg flex flex-col items-center">
        <Logo />
        <p className="text-md my-4 text-purple-500">
          You have been signed out.
        </p>
        <Link href="/api/auth/signin">
          <a
            onClick={(e) => {
              e.preventDefault();
              signIn("signin", { callbackUrl: "/" });
            }}
          >
            <button className="btn-primary">Login</button>
          </a>
        </Link>
      </div>
    </div>
  );
}
