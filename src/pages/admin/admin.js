// Legacy placeholder file kept to avoid import breaks. Not used.
export default function Admin() {
  return null;
}

// import { useState } from "react";
// import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
// import { Dashboard } from "./components/Dashboard";
// import { Members } from "./components/Members";
// import { Posts } from "./components/Posts";
// import { LayoutDashboard, Users, FileText } from "lucide-react";

// type ActivePage = "dashboard" | "members" | "posts";

// export default function App() {
//   const [activePage, setActivePage] = useState<ActivePage>("dashboard");

//   const menuItems = [
//     { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
//     { id: "members" as const, label: "Members", icon: Users },
//     { id: "posts" as const, label: "Posts", icon: FileText },
//   ];

//   const renderActivePage = () => {
//     switch (activePage) {
//       case "dashboard":
//         return <Dashboard />;
//       case "members":
//         return <Members />;
//       case "posts":
//         return <Posts />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <SidebarProvider>
//       <div className="flex h-screen w-full">
//         <Sidebar className="border-r">
//           <SidebarHeader className="p-6">
//             <h2 className="text-lg font-semibold">Club Admin</h2>
//           </SidebarHeader>
//           <SidebarContent>
//             <SidebarMenu>
//               {menuItems.map((item) => (
//                 <SidebarMenuItem key={item.id}>
//                   <SidebarMenuButton
//                     onClick={() => setActivePage(item.id)}
//                     isActive={activePage === item.id}
//                     className="w-full justify-start"
//                   >
//                     <item.icon className="mr-2 h-4 w-4" />
//                     {item.label}
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarContent>
//         </Sidebar>

//         <div className="flex-1 flex flex-col">
//           <header className="border-b p-4 flex items-center">
//             <SidebarTrigger className="mr-4" />
//             <h1 className="text-lg font-semibold">Student Club Administration</h1>
//           </header>

//           <main className="flex-1 p-6 overflow-auto bg-gray-50">
//             {renderActivePage()}
//           </main>
//         </div>
//       </div>
//     </SidebarProvider>
//   );
// }
