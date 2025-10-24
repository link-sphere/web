"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useTranslations } from "next-intl";

interface CreateIdeaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreatePost: (post: { title: string; content: string; image: string | null }) => void;
  initialData?: {
    title: string;
    content: string;
    image: string | null;
  };
  editMode?: boolean;
}

export function CreateIdeaDialog({
  open,
  onOpenChange,
  onCreatePost,
  initialData,
  editMode,
}: CreateIdeaDialogProps) {
  const t = useTranslations("dashboard.createIdeaDialog");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
      setImage(initialData.image);
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!title.trim()) return;

    onCreatePost({ title, content, image });
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editMode ? t("editTitle") : t("createTitle")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("labelTitle")}</Label>
            <Input
              id="title"
              placeholder={t("placeholderTitle")}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">{t("labelContent")}</Label>
            <Textarea
              id="content"
              placeholder={t("placeholderContent")}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[150px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>{t("labelImage")}</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <div className="text-sm">
                  <span className="font-medium">{t("uploadText1")}</span>{" "}
                  <span className="text-primary font-medium">{t("uploadText2")}</span>
                </div>
                <p className="text-xs text-muted-foreground">{t("uploadHint")}</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>{editMode ? t("editButton") : t("createButton")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
