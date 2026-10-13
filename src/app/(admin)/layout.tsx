import React from "react";
// import { redirect } from "next/navigation";
import { AdminDashboardSubLayout } from "@/components/admin-layout";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  return <AdminDashboardSubLayout>{children}</AdminDashboardSubLayout>;
};

export default AdminLayout;
