import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <div className="w-full h-screen bg-OM_SA_Light flex flex-col items-center justify-center">
      <Head>
        <title>Appkit - 404</title>
      </Head>
      <h1 className="text-purple-500 font-bold text-3xl font-Lemon mb-4">
        404 - Not Found
      </h1>
      <p className="py-4">Looks like that page does not exist.</p>
      <Link href="/">
        <a>
          <button className="btn-primary">Go back to the homepage</button>
        </a>
      </Link>
    </div>
  );
}
