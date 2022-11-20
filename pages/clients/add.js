import React, { useState } from "react";
import Layout from "../../components/layout";
import Header from "../../components/header";
import Dropdown from "../../components/dropdown";
import ButtonLoader from "../../components/loaders/buttonLoader";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState();

  return (
    <Layout title="Clients">
      <Header
        title="Add client"
        description={`Add a new client to your portfolio.`}
      />

      <div className="w-96">
        <label
          htmlFor="client_name"
          className="uppercase text-[10px] font-bold text-primary"
        >
          Client Name
        </label>
        <input
          name="client_name"
          type={"text"}
          className="input-secondary capitalize"
          value={client?.name || ""}
          onChange={(e) => {
            setClient({ ...client, name: e.target.value.toLowerCase() });
            setChanges({ ...changes, name: e.target.value.toLowerCase() });
          }}
        />
        <div className="uppercase text-[10px] font-bold text-primary ">
          Surname
        </div>
        <input
          type="text"
          className="input-secondary capitalize"
          value={client?.surname}
          onChange={(e) => {
            setClient({ ...client, surname: e.target.value.toLowerCase() });
            setChanges({ ...changes, surname: e.target.value.toLowerCase() });
          }}
        />
        <div className="uppercase text-[10px] font-bold text-primary ">
          Company Name
        </div>
        <input
          type="text"
          className="input-secondary"
          value={client?.company || ""}
          onChange={(e) => {
            setClient({ ...client, company: e.target.value.toLowerCase() });
            setChanges({ ...changes, company: e.target.value.toLowerCase() });
          }}
        />
        <div className="uppercase text-[10px] font-bold text-primary ">
          email
        </div>
        <input
          type="text"
          className="input-secondary"
          value={client?.email || ""}
          onChange={(e) => {
            setClient({ ...client, email: e.target.value.toLowerCase() });
            setChanges({ ...changes, email: e.target.value.toLowerCase() });
          }}
        />
        <div className="uppercase text-[10px] font-bold text-primary ">
          Phone
        </div>
        <input
          type="text"
          className="input-secondary"
          value={client?.phone || ""}
          onChange={(e) => {
            setClient({ ...client, phone: e.target.value.toLowerCase() });
            setChanges({ ...changes, phone: e.target.value.toLowerCase() });
          }}
        />

        <div className="flex flex-row justify-start items-center mt-4 w-80">
          <button
            className="btn-primary-small grow"
            onClick={(e) => saveToDatabase()}
          >
            {loading ? <ButtonLoader loading={loading} /> : `Update`}
          </button>
        </div>
      </div>
    </Layout>
  );
}
