// export default function DashboardPage() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold">
//         Dashboard
//       </h1>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold">
//         Dashboard
//       </h1>

//       <p className="mt-4">
//         Welcome to the Customer Risk Dashboard.
//       </p>
//     </div>
//   );
// }

// export default function DashboardPage() {
//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Dashboard Page Works 🎉</h1>
//     </div>
//   );
// }

import AppLayout from "../components/AppLayout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-black">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome to the dashboard.
      </p>
    </AppLayout>
  );
}