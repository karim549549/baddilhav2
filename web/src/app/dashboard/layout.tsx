import React from "react";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white">
      <DashboardShell>
        {children}
      </DashboardShell>
    </div>
  );
}
