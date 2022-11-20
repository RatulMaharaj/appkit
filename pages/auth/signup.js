import React, { useState, useEffect } from "react";
import { getCsrfToken } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import Logo from "../../components/logo";
import ButtonLoader from "../../components/loaders/buttonLoader";
import Head from "next/head";

export default function SignUp(props) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const [form, setForm] = useState({
    csrfToken: props.csrfToken,
    name: "",
    surname: "",
    username: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState(null);

  async function handleCreateDefaults() {
    setLoading(false);
    // alert user of successful sign up
    alert("Sign up successful!");
    // redirect to login page
    router.push("/auth/signin");
  }

  function handleSumbit() {
    setLoading(true);

    if (!error) {
      if (form.name && form.surname && form.username && form.password) {
        // send post request to the signup api
        fetch("/api/auth/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
          .then(function (res) {
            return res.json();
          })
          .then(({ message, data }) => {
            if (message !== "User created") {
              setError(message);
              setLoading(false);
            } else {
              // create default project for user
              handleCreateDefaults();
            }
          });
      } else {
        setError("Please fill out the missing information.");
      }
    }
  }

  useEffect(() => {
    if (form.password !== form.confirm) {
      setError("Please make sure your passwords match.");
      setLoading(false);
    } else {
      setError(null);
    }
  }, [form.password, form.confirm]);

  return (
    <div id="main" className="bg-pattern w-full h-screen">
      <Head>
        <title>instavoice - Sign Up</title>
      </Head>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col h-screen items-center justify-center"
      >
        <Logo />
        <input
          className="input-primary"
          name="name"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
          value={form.name}
        />
        <input
          className="input-primary"
          name="surname"
          type="text"
          placeholder="Surname"
          onChange={(e) => {
            setForm({ ...form, surname: e.target.value });
          }}
          value={form.surname}
        />
        <input
          className="input-primary"
          name="username"
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, username: e.target.value });
          }}
          value={form.username}
        />
        <input
          className="input-primary"
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
          value={form.password}
        />
        <input
          className="input-primary"
          name="confirm"
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => {
            setForm({ ...form, confirm: e.target.value });
          }}
          value={form.confirm}
        />
        <button
          className="btn-primary"
          style={{ padding: `0.65em 0`, marginBottom: `1em` }}
          type="submit"
          onClick={(e) => {
            handleSumbit();
          }}
        >
          {loading ? <ButtonLoader loading={loading} /> : `Sign Up`}
        </button>
        <div className="text-purple-500 my-5 text-sm hover:text-opacity-70 cursor-pointer">
          <Link href={"/auth/signin"}>
            <a>Already have an account? Sign in instead</a>
          </Link>
        </div>
        <div className="flex items-center justify-center text-purple-500 w-96 text-sm">
          {error ? error : ""}
        </div>
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
