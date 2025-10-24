import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { DeployPostsView } from "@/components/deploy/deploy-posts-view";

export default function DeployPage() {
  return (
    <DashboardLayout>
      <DeployPostsView />
    </DashboardLayout>
  );
}
