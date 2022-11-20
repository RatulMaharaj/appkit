import React, { useState, useEffect } from "react";
import {
  HomeIcon,
  UsersIcon,
  CreditCardIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import UserProfile from "./userProfile";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, href: "/", current: false },
  { name: "Clients", icon: UsersIcon, href: "/clients", current: false },
  {
    name: "Invoices",
    icon: DocumentTextIcon,
    href: "/invoices",
    current: false,
  },
  {
    name: "Payment Gateways",
    icon: CreditCardIcon,
    href: "/gateways",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Nav({ user }) {
  const [currentPath, setCurrentPath] = useState("/");
  useEffect(() => {
    setCurrentPath(window.location.pathname.split("/")[1]);
  }, []);

  return (
    <div className="flex min-h-0 min-w-[14em] flex-1 flex-col bg-secondary">
      <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
        <div className="flex flex-shrink-0 items-center px-4">
          <Link href="/">
            <a>
              <div className="font-Lemon w-full text-xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500">
                instavoice
              </div>
            </a>
          </Link>
        </div>
        <div>
          <UserProfile user={user} />
        </div>
        <nav
          className="mt-5 flex-1 space-y-1 bg-secondary px-2"
          aria-label="Sidebar"
        >
          {navigation.map((item) => {
            if (item.href.split("/")[1] === currentPath) {
              item.current = true;
            } else {
              item.current = false;
            }
            return (
              <Link key={item.name} href={item.href}>
                <a
                  className={classNames(
                    item.current
                      ? "bg-gray-200 darkTheme:bg-primary text-primary"
                      : "text-primary hover:bg-gray-50 darkTheme:hover:bg-primary",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className={classNames(
                      item.current
                        ? "text-primary"
                        : "text-gray-400 group-hover:text-primary",
                      "mr-3 flex-shrink-0 h-6 w-6"
                    )}
                    aria-hidden="true"
                  />
                  <span className="flex-1">{item.name}</span>
                </a>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
