import DashboardHeader from "./Components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "./Components/DashboardSidebar/DashboardSidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Right Side */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}