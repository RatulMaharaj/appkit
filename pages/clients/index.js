import React from "react";
import Layout from "../../components/layout";
import ClientList from "../../components/clients/list";
import useSWR from "swr";
import { fetcher } from "../../lib/fetcher";
import EmptyClients from "../../components/clients/empty";

export default function Page() {
  const { data, error } = useSWR("/api/clients", fetcher);

  console.log(data);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;

  return (
    <Layout title="Clients">
      {data.length > 0 ? <ClientList /> : <EmptyClients />}
    </Layout>
  );
}
