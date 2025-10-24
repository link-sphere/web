"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, Calendar, Edit } from "lucide-react";
import Image from "next/image";
import { CreateIdeaDialog } from "@/components/create/create-idea-dialog";
import { useTranslations } from "next-intl";

interface Post {
  id: string;
  platform: string;
  status: "draft" | "scheduled" | "approved" | "deployed";
  content: string;
  image: string | null;
  scheduledDate: string | null;
  likes: number;
  comments: number;
  shares: number;
}

interface PostCardProps {
  post: Post;
}

const platformIcons: Record<string, string> = {
  instagram: "📷",
  facebook: "👥",
  threads: "🧵",
  linkedin: "💼",
  tiktok: "🎵",
  youtube: "▶️",
};

const statusColors: Record<string, string> = {
  draft: "bg-muted text-muted-foreground",
  scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  approved: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  deployed: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
};

export function PostCard({ post }: PostCardProps) {
  const t = useTranslations("dashboard.postCard");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleEditPost = (updatedPost: {
    title: string;
    content: string;
    image: string | null;
  }) => {
    console.log("게시물 수정:", updatedPost);
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{platformIcons[post.platform]}</span>
            <Badge className={statusColors[post.status]}>{t(`status.${post.status}`)}</Badge>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label={t("edit")}
            onClick={() => setIsEditDialogOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-3">
          {post.image && (
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
              <Image
                src={post.image || "/placeholder.svg"}
                alt="Post image"
                fill
                className="object-cover"
              />
            </div>
          )}

          <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>

          {post.scheduledDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{post.scheduledDate}</span>
            </div>
          )}
        </CardContent>

        {post.status === "deployed" && (
          <CardFooter className="flex items-center gap-4 border-t border-border pt-3">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Heart className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              <span>{post.shares}</span>
            </div>
          </CardFooter>
        )}
      </Card>

      <CreateIdeaDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onCreatePost={handleEditPost}
        initialData={{
          title: post.content.slice(0, 50),
          content: post.content,
          image: post.image,
        }}
        editMode
      />
    </>
  );
}
