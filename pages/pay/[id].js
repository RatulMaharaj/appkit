import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Invoice from "../../components/invoice";
import useLocalStorage from "../../components/hooks/useLocalStorage";
import useSWR from "swr";
import { cachedFetch } from "../../lib/cachedFetch";

// Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());
const exchangeFetcher = (url) =>
  cachedFetch(
    url,
    {
      headers: {
        apikey: process.env.NEXT_PUBLIC_API_KEY,
      },
    },
    false,
    60 * 24
  ).then((res) => res.json());

function PayNow() {
  const router = useRouter();
  const { id } = router.query;
  const [theme, setTheme] = useLocalStorage("theme", "lightTheme");
  const [selectedCurrency, setSelectedCurrency] = useState("ZAR");

  let { data, error } = useSWR(`/api/staticdata?id=${id}`, fetcher);
  let { data: exchangeData, error: exchangeError } = useSWR(
    `https://api.apilayer.com/exchangerates_data/latest?base=ZAR&symbols=USD,EUR`,
    exchangeFetcher
  );

  useEffect(() => {
    setTheme("lightTheme");
  }, [setTheme]);

  // Handle the error state
  if (error) return <div>Failed to load</div>;
  // Handle the loading state
  if (!data?.id) {
    return <div>Loading...</div>;
  } else {
    return (
      <main className="w-full flex flex-col min-h-screen sm:px-10 md:px-20 lg:px-40 print:px-10 pb-4 print:py-2 bg-gray-100 print:bg-white">
        <div
          id="controls"
          className="print:hidden py-4 flex items-center px-4 md:px-0 justify-between"
        >
          <div className="flex w-full justify-center items-center">
            <ul className="flex w-full items-center">
              {[`ZAR`, `USD`, `EUR`].map((currency) => {
                return (
                  <li
                    key={currency}
                    className={`${
                      selectedCurrency === currency
                        ? `bg-indigo-500 hover:bg-indigo-600 text-white`
                        : `hover:bg-tertiary bg-primary`
                    } mx-1 py-1 px-4 rounded-md cursor-pointer shadow-md`}
                    onClick={(e) => setSelectedCurrency(currency)}
                  >
                    {currency}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto mr-4 whitespace-nowrap"
              onClick={(e) => {
                window.print();
              }}
            >
              Save a copy
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto whitespace-nowrap"
            >
              Pay now
            </button>
          </div>
        </div>
        <div
          id="invoice_wrapper"
          className="bg-white px-0 py-10 rounded-md shadow-lg print:shadow-none"
        >
          <Invoice
            currency={selectedCurrency}
            data={data}
            exchange={exchangeData?.rates}
          />
        </div>
        <footer className="py-4 text-xs flex flex-col items-center justify-center print:hidden">
          <div className="py-1">
            USD/ZAR: {exchangeData?.rates?.USD} EUR/ZAR:{" "}
            {exchangeData?.rates?.EUR} Last updated:{" "}
            {new Date(exchangeData?.timestamp * 1000).toLocaleString()}
          </div>
          <div className="py-1">
            The exchange rates shown are merely estimates. Please note that the
            final amount will be charged in ZAR.
          </div>
        </footer>
      </main>
    );
  }
}

export default PayNow;
