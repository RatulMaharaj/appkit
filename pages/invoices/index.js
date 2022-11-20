import React from "react";
import Layout from "../../components/layout";
import Example from "../../components/invoice";

export default function Page() {
  return (
    <Layout title="Invoices">
      <Example />
      <div className="w-full h-96 p-4"></div>
    </Layout>
  );
}
