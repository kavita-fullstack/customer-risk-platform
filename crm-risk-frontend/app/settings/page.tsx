// export default function SettingsPage() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold">
//         Settings
//       </h1>
//     </div>
//   );
// }

// export default function SettingsPage() {
//   return (
//     <div className="p-10">
//       <h1 className="text-4xl font-bold">
//         Settings
//       </h1>

//       <p className="mt-4">
//         Configure your application settings.
//       </p>
//     </div>
//   );
// }

import AppLayout from "../components/AppLayout";

export default function SettingsPage() {
  return (
    <AppLayout>
      <h1 className="text-4xl font-bold text-black">
        Settings
      </h1>
    </AppLayout>
  );
}