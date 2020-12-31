import DashboardShell from "@/components/DashboardShell";
import SiteEmptyState from "@/components/SiteEmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const Dashboard = () => {
  const auth = useAuth();

  const { data, error } = useSWR("/api/sites", fetcher);

  // if (error) return <div>failed to load</div>;

  
  console.log(data);

  // return <SiteTable sites={data} />

  if (!data)
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );

  return (
    <DashboardShell>
      {data.length ? <SiteTable sites={data} /> : <SiteEmptyState />}
    </DashboardShell>
  );
};

export default Dashboard;
