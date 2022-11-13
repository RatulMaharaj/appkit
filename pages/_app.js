import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    const saved_theme = localStorage.getItem("theme");
    if (saved_theme) {
      document.body.className = saved_theme.replaceAll(`"`, ``);
    }
  }, []);

  return (
    <SessionProvider
      options={{
        staleTime: 0,
        refetchInterval: 0,
      }}
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  );
}
