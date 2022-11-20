import { useSession } from "next-auth/react";
import AppContext from "./context/appContext";
import AccessDenied from "./access-denied";
import Head from "next/head";
import Nav from "./sidebar";

export default function Layout({ children, hideNav, title }) {
  const { data: session, status } = useSession();

  const isAdmin = session?.user.role === "ADMIN";

  // redirect if not authenticated
  if (status === "loading") {
    return null;
  } else if (status === "unauthenticated") {
    return <AccessDenied />;
  }

  return (
    <>
      <AppContext.Provider
        value={{
          isAdmin,
          user: session?.user,
        }}
      >
        <div className="flex flex-row w-full h-screen">
          {hideNav ? null : <Nav user={session?.user} />}
          <Head>
            <title>instavoice {title ? `- ${title}` : ``}</title>
          </Head>
          <main
            className={`bg-primary w-full h-full transition-all overflow-y-scroll pt-10 px-8`}
          >
            {children}
          </main>
        </div>
      </AppContext.Provider>
    </>
  );
}
