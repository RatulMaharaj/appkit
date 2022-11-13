import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Avatar from "../avatar";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserProfile({ user }) {
  return (
    <Menu
      as="div"
      className="relative inline-block px-3 text-left hover:cursor-pointer"
    >
      <div>
        <Menu.Button className="group w-full rounded-md bg-secondary px-3.5 py-2 text-left text-sm font-medium text-primary hover:bg-gray-200 darkTheme:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset">
          <span className="flex w-full items-center justify-between">
            <span className="flex min-w-0 items-center justify-between space-x-3">
              <Avatar
                name={user?.name}
                surname={user?.surname}
                color={`bg-gray-300`}
                size={`sm`}
                image={user?.image}
              />
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="truncate text-sm font-medium text-primary capitalize">
                  {user?.name} {user?.surname}
                </span>
                <span className="truncate text-sm text-gray-500 lowercase">
                  @{user?.username.split("@")[0]}
                </span>
              </span>
            </span>
            <ChevronUpDownIcon
              className="h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 left-0 z-10 mx-3 mt-1 origin-top divide-y divide-tertiary rounded-md bg-primary shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Link href="/profile">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    View profile
                  </a>
                )}
              </Menu.Item>
            </Link>
            <Link href="/settings">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Settings
                  </a>
                )}
              </Menu.Item>
            </Link>
          </div>
          <div className="py-1">
            <Link href="#">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Report a bug
                  </a>
                )}
              </Menu.Item>
            </Link>
            <Link href="#">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Request a feature
                  </a>
                )}
              </Menu.Item>
            </Link>
            <Link href="#">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Support
                  </a>
                )}
              </Menu.Item>
            </Link>
          </div>
          <div className="py-1">
            <Link href="/logout">
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-secondary text-primary" : "text-primary",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    Log out
                  </a>
                )}
              </Menu.Item>
            </Link>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
