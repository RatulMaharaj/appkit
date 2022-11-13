import { signIn } from "next-auth/react";
import Logo from "./logo";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div className="w-full h-screen bg-OM_SA_Light flex flex-col justify-center items-center">
      <Logo />
      <p className="text-md my-4 text-purple-500">
        Access Denied. Please login to view this page.
      </p>
      <Link href="/api/auth/signin">
        <a
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          <button className="btn-primary">Login</button>
        </a>
      </Link>
    </div>
  );
}
