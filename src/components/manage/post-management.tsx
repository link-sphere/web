"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Edit,
  Trash2,
  Search,
  TrendingUp,
  Reply,
  Flag,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePlatform } from "@/components/dashboard/dashboard-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CreateIdeaDialog } from "@/components/create/create-idea-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

interface Post {
  id: string;
  platform: string;
  content: string;
  image: string | null;
  deployedAt: string;
  likes: number;
  comments: number;
  shares: number;
  engagement: number;
}

interface Comment {
  id: string;
  postId: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
  likes: number;
  isReplied: boolean;
  needsAttention: boolean;
}

const mockPosts: Post[] = [
  {
    id: "1",
    platform: "instagram",
    content: "고객님들의 사랑에 감사드립니다 ❤️",
    image: "/thank-you-customers.jpg?height=400&width=400",
    deployedAt: "2025-01-23 14:00",
    likes: 245,
    comments: 18,
    shares: 12,
    engagement: 8.5,
  },
  {
    id: "2",
    platform: "facebook",
    content: "주말 특별 할인 이벤트를 놓치지 마세요!",
    image: "/sale-event.jpg?height=400&width=400",
    deployedAt: "2025-01-22 10:00",
    likes: 189,
    comments: 24,
    shares: 8,
    engagement: 7.2,
  },
  {
    id: "3",
    platform: "threads",
    content: "오늘의 팁: 소셜 미디어 관리를 더 효율적으로!",
    image: null,
    deployedAt: "2025-01-21 16:00",
    likes: 89,
    comments: 7,
    shares: 5,
    engagement: 5.8,
  },
  {
    id: "4",
    platform: "linkedin",
    content: "우리 팀의 최신 성과를 공유합니다",
    image: "/team-success.jpg?height=400&width=400",
    deployedAt: "2025-01-20 09:00",
    likes: 156,
    comments: 12,
    shares: 15,
    engagement: 9.1,
  },
];

const mockComments: Comment[] = [
  {
    id: "1",
    postId: "1",
    author: "김고객",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "정말 좋은 제품이네요! 언제 구매할 수 있나요?",
    timestamp: "2시간 전",
    likes: 5,
    isReplied: false,
    needsAttention: true,
  },
  {
    id: "2",
    postId: "1",
    author: "이유저",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "가격 정보 알려주세요",
    timestamp: "3시간 전",
    likes: 2,
    isReplied: true,
    needsAttention: false,
  },
  {
    id: "3",
    postId: "2",
    author: "박회원",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    content: "할인 코드가 작동하지 않아요",
    timestamp: "5시간 전",
    likes: 8,
    isReplied: false,
    needsAttention: true,
  },
];

const platformIcons: Record<string, string> = {
  instagram: "📷",
  facebook: "👥",
  threads: "🧵",
  linkedin: "💼",
  tiktok: "🎵",
  youtube: "▶️",
};

export function PostManagement() {
  const t = useTranslations("dashboard.postManagement");
  const [posts, setPosts] = useState(mockPosts);
  const [comments, setComments] = useState(mockComments);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCommentsDialogOpen, setIsCommentsDialogOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const { selectedPlatform } = usePlatform();

  const filteredPosts = posts
    .filter((post) => {
      const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = selectedPlatform === "all" || post.platform === selectedPlatform;
      return matchesSearch && matchesPlatform;
    })
    .sort((a, b) => {
      if (sortBy === "engagement") return b.engagement - a.engagement;
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "comments") return b.comments - a.comments;
      return 0;
    });

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((p) => p.id !== postId));
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setIsEditDialogOpen(true);
  };

  const handleUpdatePost = (updatedPost: {
    title: string;
    content: string;
    image: string | null;
  }) => {
    if (selectedPost) {
      setPosts(
        posts.map((p) => (p.id === selectedPost.id ? { ...p, content: updatedPost.content } : p))
      );
    }
    setIsEditDialogOpen(false);
    setSelectedPost(null);
  };

  const handleManageComments = (post: Post) => {
    setSelectedPost(post);
    setIsCommentsDialogOpen(true);
  };

  const handleReply = (commentId: string) => {
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, isReplied: true, needsAttention: false } : c
      )
    );
    setReplyingTo(null);
    setReplyText("");
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const postComments = selectedPost ? comments.filter((c) => c.postId === selectedPost.id) : [];

  return (
    <div className="space-y-6">
      {/* 검색 + 정렬 */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("sort.placeholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">{t("sort.recent")}</SelectItem>
            <SelectItem value="engagement">{t("sort.engagement")}</SelectItem>
            <SelectItem value="likes">{t("sort.likes")}</SelectItem>
            <SelectItem value="comments">{t("sort.comments")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 게시물 카드 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{platformIcons[post.platform]}</span>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{post.engagement}%</span>
                </div>
              </div>
              <Badge variant="secondary">{post.deployedAt}</Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              {post.image && (
                <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-muted">
                  <Image src={post.image} alt="Post image" fill className="object-cover" />
                </div>
              )}

              <p className="text-sm leading-relaxed line-clamp-3">{post.content}</p>

              <div className="flex items-center gap-4 pt-2 border-t border-border">
                <div className="flex items-center gap-1 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="font-medium">{post.likes}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <MessageCircle className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{post.comments}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Share2 className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{post.shares}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex gap-2 border-t border-border pt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleEditPost(post)}
              >
                <Edit className="h-4 w-4 mr-1" />
                {t("buttons.edit")}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 bg-transparent"
                onClick={() => handleManageComments(post)}
              >
                <MessageCircle className="h-4 w-4 mr-1" />
                {t("buttons.comments")}
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleDelete(post.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* 게시물 수정 다이얼로그 */}
      {selectedPost && (
        <CreateIdeaDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onCreatePost={handleUpdatePost}
          editMode={true}
          initialData={{
            title: "",
            content: selectedPost.content,
            image: selectedPost.image,
          }}
        />
      )}

      {/* 댓글 관리 Dialog */}
      <Dialog open={isCommentsDialogOpen} onOpenChange={setIsCommentsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t("comments.title")}</DialogTitle>
            <DialogDescription>{t("comments.description")}</DialogDescription>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{platformIcons[selectedPost.platform]}</span>
                    <Badge variant="secondary">{selectedPost.deployedAt}</Badge>
                  </div>
                  <p className="text-sm">{selectedPost.content}</p>
                </CardContent>
              </Card>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {t("comments.total", { count: postComments.length })}
                  </h3>
                  <div className="flex gap-2">
                    <Badge variant="destructive" className="text-xs">
                      {t("comments.needsAttention", {
                        count: postComments.filter((c) => c.needsAttention).length,
                      })}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {t("comments.replied", {
                        count: postComments.filter((c) => c.isReplied).length,
                      })}
                    </Badge>
                  </div>
                </div>

                {postComments.map((comment) => (
                  <Card key={comment.id} className={comment.needsAttention ? "border-red-500" : ""}>
                    <CardContent className="p-4">
                      <div className="flex gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.authorAvatar} />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">{comment.author}</span>
                              {comment.needsAttention && (
                                <Badge variant="destructive" className="text-xs">
                                  {t("comments.attention")}
                                </Badge>
                              )}
                              {comment.isReplied && (
                                <Badge variant="secondary" className="text-xs">
                                  {t("comments.done")}
                                </Badge>
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp}
                            </span>
                          </div>

                          <p className="text-sm">{comment.content}</p>

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <ThumbsUp className="h-3 w-3" />
                            <span>{comment.likes}</span>
                          </div>

                          {replyingTo === comment.id ? (
                            <div className="space-y-2 pt-2">
                              <Textarea
                                placeholder={t("comments.replyPlaceholder")}
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-[60px] text-sm"
                              />
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleReply(comment.id)}>
                                  {t("comments.replySend")}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setReplyingTo(null)}
                                >
                                  {t("comments.cancel")}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex gap-2 pt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => setReplyingTo(comment.id)}
                              >
                                <Reply className="h-3 w-3 mr-1" />
                                {t("comments.reply")}
                              </Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs">
                                <Flag className="h-3 w-3 mr-1" />
                                {t("comments.report")}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => handleDeleteComment(comment.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
