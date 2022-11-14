import { Switch } from "@headlessui/react";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout";
import useLocalStorage from "../../components/hooks/useLocalStorage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Layout title="Settings">
        <div className="header">
          <h4>Settings</h4>
        </div>
        <div className="p-4">
          <Setting label="theme" addLabelClassToBody={true} />
        </div>
      </Layout>
    );
  } else {
    return null;
  }
}

function Setting({ label, addLabelClassToBody = false }) {
  const [theme, setTheme] = useLocalStorage(label, "lightTheme");

  const handleSetTheme = (theme) => {
    setTheme(theme);
    if (addLabelClassToBody && document.body) {
      document.body.className = theme;
    }
  };

  return (
    <div className="text-sm flex items-center ">
      <Switch
        checked={theme === "darkTheme"}
        onChange={(e) => {
          theme === "lightTheme"
            ? handleSetTheme("darkTheme")
            : handleSetTheme("lightTheme");
        }}
        className={classNames(
          theme === "darkTheme" ? "bg-purple-500" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none "
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={classNames(
            theme === "darkTheme" ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <div className="ml-4 text-secondary">Dark Mode</div>
    </div>
  );
}
