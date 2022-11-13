import { signIn } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ButtonLoader from "../../components/loaders/buttonLoader";
import Logo from "../../components/logo";

export default function SignIn({ csrfToken }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const router = useRouter();
  const error = router.query.error;

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const callbackUrl = router.query.callbackUrl || "/";

  return (
    <div
      id="main"
      className="bg-pattern w-full flex flex-col h-screen items-center justify-center"
    >
      <Head>
        <title>appkit - Sign In</title>
      </Head>
      <form
        method="post"
        action="/api/auth/callback/credentials"
        className="flex flex-col items-center justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          signIn("credentials", {
            callbackUrl: callbackUrl,
            username: email,
            password: pwd,
          });
        }}
      >
        <Logo />
        <input
          className="input-primary"
          name="username"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="input-primary"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button className="btn-primary" type="submit">
          {loading ? <ButtonLoader loading={loading} /> : `Sign in`}
        </button>
      </form>
      <div className="text-purple-500 my-5 text-sm hover:text-opacity-70 cursor-pointer">
        <Link href={"/auth/signup"}>
          <a>No account? Sign up instead</a>
        </Link>
      </div>
      {error ? (
        <div className="flex items-center justify-center text-purple-500 w-96 text-sm">
          Invalid credentials provided. Please try again.
        </div>
      ) : null}
    </div>
  );
}
