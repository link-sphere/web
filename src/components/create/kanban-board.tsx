"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, GripVertical } from "lucide-react";
import { CreateIdeaDialog } from "@/components/create/create-idea-dialog";
import { useTranslations } from "next-intl";

interface Idea {
  id: string;
  title: string;
  content: string;
  image: string | null;
  status: "unassigned" | "in-progress" | "to-do";
}

const mockIdeas: Idea[] = [
  {
    id: "1",
    title: "This is a place to plan ✍️ your content",
    content:
      "Save your ideas before converting them into posts. Brainstorm, plan ahead, and refine!",
    image: null,
    status: "unassigned",
  },
  {
    id: "2",
    title: "Save inspirations you find online with one click 😊",
    content: "Use 📱 browser extension to save ideas from the Web.",
    image: null,
    status: "unassigned",
  },
  {
    id: "3",
    title: "aaa",
    content: "",
    image: null,
    status: "in-progress",
  },
];

export function KanbanBoard() {
  const t = useTranslations("dashboard.kanbanBoard");

  const [ideas, setIdeas] = useState<Idea[]>(mockIdeas);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState("unassigned");

  // 컬럼 이름을 다국어로 불러오기
  const columns = [
    { id: "unassigned", title: t("columns.unassigned"), color: "bg-gray-100 dark:bg-gray-800" },
    { id: "in-progress", title: t("columns.inProgress"), color: "bg-blue-50 dark:bg-blue-950" },
    { id: "to-do", title: t("columns.toDo"), color: "bg-green-50 dark:bg-green-950" },
  ];

  const getIdeasByStatus = (status: string) => ideas.filter((i) => i.status === status);

  const handleAddIdea = (columnId: string) => {
    setSelectedColumn(columnId);
    setDialogOpen(true);
  };

  const handleCreateIdea = (newIdea: { title: string; content: string; image: string | null }) => {
    const idea: Idea = {
      ...newIdea,
      id: Date.now().toString(),
      status: selectedColumn as Idea["status"],
    };
    setIdeas((prev) => [...prev, idea]);
    setDialogOpen(false);
  };

  const handleDragStart = (e: React.DragEvent, ideaId: string) => {
    setDraggedId(ideaId);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", ideaId);
  };

  const handleDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => setDragOverColumn(null);

  const handleDrop = (e: React.DragEvent, targetStatus: string) => {
    e.preventDefault();

    if (draggedId) {
      setIdeas((prev) =>
        prev.map((idea) =>
          idea.id === draggedId ? { ...idea, status: targetStatus as Idea["status"] } : idea
        )
      );
    }

    setDraggedId(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverColumn(null);
  };

  return (
    <>
      <div className="h-full overflow-x-auto overflow-y-hidden pb-4">
        <div className="flex gap-4 h-full min-w-min px-2">
          {columns.map((col) => {
            const columnIdeas = getIdeasByStatus(col.id);
            const isOver = dragOverColumn === col.id;

            return (
              <div
                key={col.id}
                className="flex-shrink-0 w-80"
                onDragOver={(e) => handleDragOver(e, col.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, col.id)}
              >
                <Card
                  className={`${col.color} h-full flex flex-col transition-all ${
                    isOver ? "ring-2 ring-blue-500 shadow-lg" : ""
                  }`}
                >
                  <CardHeader className="pb-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base sm:text-lg font-semibold">
                          {col.title}
                        </CardTitle>
                        <Badge variant="secondary" className="rounded-full">
                          {columnIdeas.length}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleAddIdea(col.id)}
                        aria-label={t("addIdea")}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-1 overflow-y-auto">
                    <div className="min-h-[200px] space-y-3">
                      {columnIdeas.map((idea) => (
                        <Card
                          key={idea.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, idea.id)}
                          onDragEnd={handleDragEnd}
                          className={`bg-white dark:bg-gray-900 hover:shadow-md transition-all cursor-move ${
                            draggedId === idea.id ? "opacity-50 rotate-2 scale-105" : ""
                          }`}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start gap-2">
                              <GripVertical className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                              <div className="flex-1 space-y-2">
                                <h4 className="font-semibold text-sm leading-tight">
                                  {idea.title}
                                </h4>
                                {idea.content && (
                                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                                    {idea.content}
                                  </p>
                                )}
                                {idea.image && (
                                  <img
                                    src={idea.image}
                                    alt={idea.title}
                                    className="w-full h-32 object-cover rounded mt-2"
                                  />
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="w-full justify-start text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm"
                      onClick={() => handleAddIdea(col.id)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {t("newIdea")}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      <CreateIdeaDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreatePost={handleCreateIdea}
      />
    </>
  );
}
