import { UsersIcon } from "@heroicons/react/24/outline";
import AddClient from "./add";

export default function EmptyClients() {
  return (
    <div className="text-center h-full flex flex-col items-center justify-center">
      <UsersIcon
        className="-ml-1 mr-2 h-10 w-10 text-gray-300"
        aria-hidden="true"
      />
      <h3 className="mt-2 text-sm font-medium text-gray-900">No clients</h3>
      <p className="mt-1 text-sm text-gray-500">
        Get started by creating a new client.
      </p>
      <div className="mt-6">
        <AddClient />
      </div>
    </div>
  );
}
