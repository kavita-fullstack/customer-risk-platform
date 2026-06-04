"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "../components/AppLayout";

export default function CustomersPage() {
  // const [customers, setCustomers] = useState([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [risk, setRisk] = useState("Low");
  const [unpaidAmount, setUnpaidAmount] = useState("");

  const [editingId, setEditingId] =
  useState<number | null>(null);

useEffect(() => {
  axios
    .get("http://localhost:5000/customers")
    .then((response) => {

      console.log("CUSTOMERS DATA:");
      console.log(response.data);

      setCustomers(response.data);
      setLoading(false);

    })
    .catch((error) => {

      console.error(error);
      setLoading(false);

    });

}, []);

 const handleAddCustomer = async () => {

    if (!name.trim()) {
    alert("Customer name is required");
    return;
  }

  if (!unpaidAmount) {
    alert("Unpaid amount is required");
    return;
  }

   if (Number(unpaidAmount) < 0) {
    alert("Unpaid amount cannot be negative");
    return;
  }

  const customerData = {
    name,
    risk,
    unpaidAmount: Number(unpaidAmount)
  };

  try {

    if (editingId) {

      const response =
        await axios.put(
          `http://localhost:5000/customers/${editingId}`,
          customerData
        );

      setCustomers(
        customers.map(customer =>
          customer.id === editingId
            ? response.data
            : customer
        )
      );

      setEditingId(null);

    } else {

      const response =
        await axios.post(
          "http://localhost:5000/customers",
          customerData
        );

      setCustomers([
        ...customers,
        response.data
      ]);

    }

    setName("");
    setRisk("Low");
    setUnpaidAmount("");
    setShowForm(false);

  } catch (error) {

    console.error(error);

  }

};


const deleteCustomer = async (id: number) => {

  try {

    await axios.delete(
      `http://localhost:5000/customers/${id}`
    );

    setCustomers(
      customers.filter(
        customer => customer.id !== id
      )
    );

  } catch (error) {

    console.error(error);

  }

};

  return (
    <AppLayout>
      <h1 className="text-4xl font-bold mb-8 text-black">
        Customers
      </h1>

      <div className="bg-white rounded-xl shadow text-black">

          {loading && (
        <p className="mb-4 text-black">
          Loading customers...
        </p>
        )}

      <div className="flex justify-between mb-6">

        <p className="text-black">
          Number of customers: {customers.length}
        </p>

      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Customer
      </button>

      </div>

      {showForm && (

    <div className="bg-gray-100 p-6 rounded-xl mb-6">

      <h2 className="text-xl font-bold mb-4 text-black">
      {editingId ? "Edit Customer" : "Add Customer"}
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded text-black"
        />

      <select
        value={risk}
        onChange={(e) => setRisk(e.target.value)}
        className="w-full p-3 border rounded text-black"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <input
        type="number"
        placeholder="Unpaid Amount"
        value={unpaidAmount}
        onChange={(e) => setUnpaidAmount(e.target.value)}
        className="w-full p-3 border rounded text-black"
      />

     <button
        onClick={handleAddCustomer}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        {editingId ? "Update Customer" : "Save Customer"}
      </button>

    </div>

  </div>

)}

<table className="w-full">

  <thead>
    <tr className="border-b">

      <th className="text-left p-4 text-gray-800 font-semibold">
        Customer
      </th>

      <th className="text-left p-4 text-gray-800 font-semibold">
        Risk
      </th>

      <th className="text-left p-4 text-gray-800 font-semibold">
        Unpaid Amount
      </th>

      <th className="text-left p-4 text-gray-800 font-semibold">
        Status
      </th>

      <th className="text-left p-4">
        Actions
      </th>
    </tr>
  </thead>

  <tbody>

    {customers.length === 0 ? (

      <tr>
        <td
          colSpan={4}
          className="p-4 text-center text-black"
        >
          No customers found
        </td>
      </tr>

    ) : (

      customers.map((customer: any) => (

        <tr
          key={customer.id}
          className="border-b text-black"
        >

          <td className="p-4">
            {customer.name}
          </td>

          <td className="p-4">

            <span
              className={
                customer.risk === "High"
                  ? "bg-red-200 px-3 py-1 rounded-full"
                  : customer.risk === "Medium"
                  ? "bg-yellow-200 px-3 py-1 rounded-full"
                  : "bg-green-200 px-3 py-1 rounded-full"
              }
            >
              {customer.risk}
            </span>

          </td>

          <td className="p-4">
            ${customer.unpaidAmount}
          </td>

          <td className="p-4">
            Active
          </td>
          <td className="p-4">

          <button
            onClick={() => {

              setEditingId(customer.id);

              setName(customer.name);
              setRisk(customer.risk);
              setUnpaidAmount(
                String(customer.unpaidAmount)
              );

              setShowForm(true);

            }}
            className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
          >
            Edit
          </button>

          <button
            onClick={() => deleteCustomer(customer.id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>

        </td>
        </tr>

      ))

    )}

  </tbody>

</table>
</div> 
</AppLayout> ); 
}
       