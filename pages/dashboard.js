import DashboardShell from "@/components/DashboardShell";
import FeedbackLink from "@/components/FeedbackLink";
import SiteEmptyState from "@/components/SiteEmptyState";
import SiteTable from "@/components/SiteTable";
import SiteTableHeader from "@/components/SiteTableHeader";
import SiteTableSkeleton from "@/components/SiteTableSkeleton";
import { useAuth } from "@/lib/auth";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

const Dashboard = () => {
  const { user } = useAuth();

  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  // if (error) return <div>failed to load</div>;

  // console.log(data);

  // return <SiteTable sites={data} />

  if (!data)
    return (
      <DashboardShell>
        <SiteTableHeader />
        <SiteTableSkeleton />
      </DashboardShell>
    );

  return (
    <DashboardShell>
      <SiteTableHeader />
      {data.sites ? <SiteTable sites={data.sites} /> : <SiteEmptyState />}
      <SiteEmptyState />
    </DashboardShell>
  );
};

export default Dashboard;
