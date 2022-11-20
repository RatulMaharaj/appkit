import Layout from "../components/layout";
import { useContext } from "react";
import AppContext from "../components/context/appContext";
import Example from "../components/stats";

export default function Home() {
  return (
    <Layout title="Home">
      <Example />
      <div className="w-full h-96 p-4"></div>
    </Layout>
  );
}

function Greeting() {
  var myDate = new Date();
  var hours = myDate.getHours();

  var greet;
  if (hours < 12) greet = "morning";
  else if (hours >= 12 && hours <= 17) greet = "afternoon";
  else if (hours >= 17 && hours <= 24) greet = "evening";

  const { user } = useContext(AppContext);

  return (
    <h4>
      Good {greet}, {user?.name}
    </h4>
  );
}
