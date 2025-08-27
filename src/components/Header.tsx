// "use client";

// import Link from "next/link";
// // import { useAuth } from "@/context/AuthContext";

// export default function Header() {
//   // const { user, signOut, loading } = useAuth();

//   if (loading) return null; // evita piscar login/logout

//   return (
//     <header className="flex justify-between items-center p-4 bg-black text-white">
//       <h1 className="text-lg font-bold">FitScore</h1>

//       {user ? (
//         <div className="flex items-center gap-4">
//           <span>Olá, {user.user_metadata.full_name || user.email}!</span>
//           <button
//             onClick={signOut}
//             className="px-3 py-1 bg-red-500 rounded hover:bg-red-600"
//           >
//             Sair
//           </button>
//         </div>
//       ) : (
//         <Link
//           href="/login"
//           className="px-3 py-1 bg-blue-500 rounded hover:bg-blue-600"
//         >
//           Login
//         </Link>
//       )}
//     </header>
//   );
// }
