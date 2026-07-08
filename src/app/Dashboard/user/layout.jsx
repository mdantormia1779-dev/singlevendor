import React from 'react';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      
      {/* Container */}
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>

      </div>
    </div>
  );
}