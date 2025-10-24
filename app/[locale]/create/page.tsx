import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { KanbanBoard } from "@/components/create/kanban-board";
import { useTranslations } from "next-intl";

export default function CreatePage() {
  const t = useTranslations("dashboard.createPage");

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground mt-1">{t("description")}</p>
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          <KanbanBoard />
        </div>
      </div>
    </DashboardLayout>
  );
}
