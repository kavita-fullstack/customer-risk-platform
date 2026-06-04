import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-10">
        CRM Risk
      </h1>

      <ul className="space-y-6 text-lg">

        <li>
          <Link href="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link href="/customers">
            Customers
          </Link>
        </li>

        <li>
          <Link href="/reports">
            Reports
          </Link>
        </li>

        <li>
          <Link href="/ai">
            AI Insights
          </Link>
        </li>

        <li>
          <Link href="/settings">
            Settings
          </Link>
        </li>

      </ul>

    </div>
  );
}


// export default function Sidebar() {
//   return (
//     <div className="w-64 h-screen bg-black text-white p-6">

//       <h1 className="text-3xl font-bold mb-10">
//         CRM Risk
//       </h1>

//       <ul className="space-y-6 text-lg">

//         <li className="hover:text-yellow-400 cursor-pointer">
//           Dashboard
//         </li>

//         <li className="hover:text-yellow-400 cursor-pointer">
//           Customers
//         </li>

//         <li className="hover:text-yellow-400 cursor-pointer">
//           Reports
//         </li>

//         <li className="hover:text-yellow-400 cursor-pointer">
//           AI Insights
//         </li>

//         <li className="hover:text-yellow-400 cursor-pointer">
//           Settings
//         </li>

//       </ul>

//     </div>
//   );
// }