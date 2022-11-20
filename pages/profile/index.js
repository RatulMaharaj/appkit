import { useSession } from "next-auth/react";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Profile from "../../components/profile/currentUser";

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Layout title="Profile">
        <Header
          title="Profile"
          description={`View or update your user profile.`}
        />
        <div className="pt-4">
          <Profile session={session} />
        </div>
      </Layout>
    );
  } else {
    return null;
  }
}
