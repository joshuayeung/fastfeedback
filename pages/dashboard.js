import DashboardShell from "@/components/DashboardShell";
import EmptyState from "@/components/SiteEmptyState";
import { useAuth } from "@/lib/auth";
import React from "react";
import FreePlanEmptyState from "../components/FreePlanEmptyState";

const Dashboard = () => {
  const auth = useAuth();

  if (!auth.user) {
    return "Loading...";
  }

  return (
    <DashboardShell>
      <EmptyState />
    </DashboardShell>
  );
};

export default Dashboard;
