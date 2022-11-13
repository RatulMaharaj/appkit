import { useSession } from "next-auth/react";
import Layout from "../components/layout";
import Profile from "../components/preferences/profile";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Layout title="Profile">
        <div className="header">
          <h4>Profile</h4>
        </div>
        <div className="p-4">
          <Profile session={session} />
        </div>
      </Layout>
    );
  } else {
    return null;
  }
}
