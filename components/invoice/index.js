import { useState, useEffect } from "react";
import Image from "next/image";

export default function Invoice(props) {
  const [currency, setCurrency] = useState(props.currency);

  useEffect(() => {
    setCurrency(props.currency);
  }, [props.currency]);

  if (!props.data) {
    return <div>Loading...</div>;
  } else {
    let { id, date, consultant, client, projects, tax } = props.data;

    // subtotal
    let subtotal = 0;

    let charge_price = 0;

    // populate the project price and subtotal
    projects?.map((project) => {
      project.price = project.hours * project.rate;
      charge_price += project.price;
      if (currency !== "ZAR") {
        project.price = project.price * props.exchange[currency];
      }
      subtotal += project.price;
    });

    // calculate the tax
    let taxAmount = subtotal * tax;
    charge_price = parseFloat((charge_price * (1 - tax)).toFixed(2));

    // calculate total
    let total = subtotal - taxAmount;

    console.log({ charge_price });

    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div id="logo" className="w-40">
            <Image
              src={`/images/logo.png`}
              alt="Logo"
              width={7064}
              height={2330}
            />
          </div>
          <h1 className="text-3xl text-primary">Invoice {id}</h1>
        </div>
        <div className="flex justify-between items-center py-8">
          <div className="flex flex-col text-sm">
            <strong>{consultant.name}</strong>
            <span>{consultant.email}</span>
          </div>
          <div className="flex flex-col text-sm items-end">
            <strong>Date: {new Date(date).toLocaleDateString()}</strong>
            <span>{client.email}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div id="address" className="flex flex-col w-full text-xs">
            <span>{consultant.name}</span>
            <span>{consultant.address.street}</span>
            <span>{consultant.address.city}</span>
            <span>{consultant.address.country}</span>
            <span>{consultant.address.zip}</span>
          </div>
          <div
            id="client_address"
            className="flex flex-col w-full text-xs items-end"
          >
            <span>{client.contact}</span>
            <span>{client.address.street}</span>
            <span>{client.address.city}</span>
            <span>{client.address.country}</span>
            <span>{client.address.zip}</span>
          </div>
        </div>
        <div className="-mx-4 mt-8 flex flex-col sm:-mx-6 md:mx-0">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 md:pl-0"
                >
                  Project
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Hours
                </th>
                <th
                  scope="col"
                  className="hidden py-3.5 px-3 text-right text-sm font-semibold text-gray-900 sm:table-cell"
                >
                  Rate
                </th>
                <th
                  scope="col"
                  className="py-3.5 pl-3 pr-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0"
                >
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="border-b border-gray-200">
                  <td className="py-4 pl-4 pr-3 text-sm sm:pl-6 md:pl-0">
                    <div className="text-gray-900">{project.name}</div>
                    <div className="mt-0.5 text-gray-500 sm:hidden">
                      {project.hours} hours at {project.rate}
                    </div>
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {project.hours.toFixed(1)}
                  </td>
                  <td className="hidden py-4 px-3 text-right text-sm text-gray-500 sm:table-cell">
                    {currency === `ZAR`
                      ? project.rate.toFixed(2)
                      : (project.rate * props.exchange[currency]).toFixed(
                          2
                        )}{" "}
                    {currency}
                  </td>
                  <td className="py-4 pl-3 pr-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                    {project.price.toFixed(2)} {currency}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-6 pr-3 pt-6 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                >
                  Subtotal
                </th>
                <th
                  scope="row"
                  className="pl-4 pr-3 pt-6 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Subtotal
                </th>
                <td className="pl-3 pr-4 pt-6 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  {subtotal.toFixed(2)} {currency}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-6 pr-3 pt-4 text-right text-sm font-normal text-gray-500 sm:table-cell md:pl-0"
                >
                  Tax
                </th>
                <th
                  scope="row"
                  className="pl-4 pr-3 pt-4 text-left text-sm font-normal text-gray-500 sm:hidden"
                >
                  Tax
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm text-gray-500 sm:pr-6 md:pr-0">
                  {taxAmount.toFixed(2)} {currency}
                </td>
              </tr>
              <tr>
                <th
                  scope="row"
                  colSpan={3}
                  className="hidden pl-6 pr-3 pt-4 text-right text-sm font-semibold text-gray-900 sm:table-cell md:pl-0"
                >
                  Total
                </th>
                <th
                  scope="row"
                  className="pl-4 pr-3 pt-4 text-left text-sm font-semibold text-gray-900 sm:hidden"
                >
                  Total
                </th>
                <td className="pl-3 pr-4 pt-4 text-right text-sm font-semibold text-gray-900 sm:pr-6 md:pr-0">
                  {total.toFixed(2)} {currency}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}
