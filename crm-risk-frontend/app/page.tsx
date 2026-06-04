"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";

export default function Home() {

  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/customers")
      .then((response) => {
        setCustomers(response.data);
      });
  }, []);

  const filteredCustomers = customers.filter(
    (customer: any) =>
      customer.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  const totalCustomers = customers.length;

  const highRiskCustomers = customers.filter(
    (customer: any) => customer.risk === "High"
  ).length;

  const healthyCustomers = customers.filter(
    (customer: any) => customer.risk === "Low"
  ).length;

  const totalUnpaidAmount = customers.reduce(
    (sum: number, customer: any) =>
      sum + customer.unpaidAmount,
    0
  );

  const getRiskColor = (risk: string) => {

    if (risk === "High") {
      return "bg-red-200";
    }

    if (risk === "Medium") {
      return "bg-yellow-200";
    }

    return "bg-green-200";
  };

  return (

    <div className="flex">

      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100 min-h-screen">

        <h1 className="text-4xl font-bold mb-8 text-black">
          Customer Risk Dashboard
        </h1>


        <div className="grid grid-cols-4 gap-6 mb-8 text-black">

        <div className="bg-white p-6 rounded-2xl shadow text-black">
          <h3 className="text-gray-500 text-black">
            Total Customers
          </h3>

          <p className="text-4xl font-bold mt-2 text-black">
            {totalCustomers}
          </p>
        </div>

        <div className="bg-red-100 p-6 rounded-2xl shadow text-black">
          <h3 className="text-gray-500 text-black">
            High Risk
          </h3>

          <p className="text-4xl font-bold mt-2 text-black">
            {highRiskCustomers}
          </p>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl shadow text-black">
          <h3 className="text-gray-500 text-black">
            Healthy
          </h3>

          <p className="text-4xl font-bold mt-2 text-black">
            {healthyCustomers}
          </p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-2xl shadow text-black">
          <h3 className="text-gray-500 text-black">
            Revenue At Risk
          </h3>

          <p className="text-4xl font-bold mt-2 text-black">
            ${totalUnpaidAmount}
          </p>
        </div>

    </div>
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full p-4 rounded-xl border mb-8 text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {filteredCustomers.map((customer: any) => (

            <div
              key={customer.id}
              className={`p-6 rounded-2xl shadow ${getRiskColor(customer.risk)}`}
            >

              <h2 className="text-2xl font-bold text-black">
                {customer.name}
              </h2>

              <p className="mt-3 text-lg text-black">
                Risk Level:
                <span className="font-bold ml-2">
                  {customer.risk}
                </span>
              </p>

              <p className="mt-2 text-lg text-black">
                Unpaid Amount:
                <span className="font-bold ml-2">
                  ${customer.unpaidAmount}
                </span>
              </p>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}