import React, { useEffect, useState } from "react";
import ButtonLoader from "../loaders/buttonLoader";
import Dropdown from "../dropdown/index";

export default function Profile({ session }) {
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState(session?.user);
  const [changes, setChanges] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    if (session) {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => res.json())
        .then((obj) => (obj.success ? setMember(obj.data) : null))
        .catch((err) => console.log(err));
    }
  }, [session]);

  const saveToDatabase = () => {
    setLoading(true);
    fetch(`/api/users/${member.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: changes }),
    })
      .then((res) => res.json())
      .then((body) => setError(body.data) & setLoading(false))
      .catch((err) => console.log(err));
  };

  const roles = [
    { id: 1, name: "User" },
    { id: 2, name: "Admin" },
  ];

  return (
    <div className="w-96">
      <div className="uppercase text-[10px] font-bold text-primary">Name</div>
      <input
        type={"text"}
        className="input-secondary capitalize"
        value={member?.name || ""}
        onChange={(e) => {
          setMember({ ...member, name: e.target.value.toLowerCase() });
          setChanges({ ...changes, name: e.target.value.toLowerCase() });
        }}
      />
      <div className="uppercase text-[10px] font-bold text-primary ">
        Surname
      </div>
      <input
        type="text"
        className="input-secondary capitalize"
        value={member?.surname}
        onChange={(e) => {
          setMember({ ...member, surname: e.target.value.toLowerCase() });
          setChanges({ ...changes, surname: e.target.value.toLowerCase() });
        }}
      />
      <div className="uppercase text-[10px] font-bold text-primary ">
        Username
      </div>
      <input
        type="text"
        className="input-secondary"
        value={member?.username || ""}
        onChange={(e) => {
          setMember({ ...member, username: e.target.value.toLowerCase() });
          setChanges({ ...changes, username: e.target.value.toLowerCase() });
        }}
      />
      <div className="uppercase text-[10px] font-bold text-primary ">
        Position
      </div>
      <input
        type="text"
        className="input-secondary"
        placeholder="Job title"
        value={member?.position || ""}
        onChange={(e) => {
          setMember({ ...member, position: e.target.value });
          setChanges({ ...changes, position: e.target.value });
        }}
      />

      <Dropdown
        label="Role"
        options={roles}
        initialValue={member?.role}
        onChange={(option) => {
          setMember({ ...member, role: option.name.toUpperCase() });
          setChanges({ ...changes, role: option.name.toUpperCase() });
        }}
      />

      <div className="uppercase text-[10px] font-bold text-primary ">
        Avatar
      </div>
      <input
        type="text"
        className="input-secondary"
        placeholder={`Link to an image`}
        value={member?.image || ""}
        onChange={(e) => {
          setMember({ ...member, image: e.target.value });
          setChanges({ ...changes, image: e.target.value });
        }}
      />
      <div className="flex flex-row justify-start items-center mt-4 w-80">
        <button
          className="btn-primary-small grow"
          onClick={(e) => saveToDatabase()}
        >
          {loading ? <ButtonLoader loading={loading} /> : `Update`}
        </button>
        <div className="text-sm text-purple-500 w-32 py-4 ml-4">{error}</div>
      </div>
    </div>
  );
}
