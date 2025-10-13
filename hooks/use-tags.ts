"use client";

import { useState, useEffect } from "react";
import { TagService, type Tag } from "@/lib/tag";

export function useTags() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  /** 📥 목록 불러오기 */
  const fetchTags = async () => {
    setLoading(true);
    const res = await TagService.getTags();
    if (res.success && res.data) setTags(res.data);
    setLoading(false);
  };

  /** ➕ 태그 추가 */
  const addTag = async (name: string) => {
    const res = await TagService.createTag(name);
    if (res.success && res.data) setTags((prev) => [...prev, res.data]);
    return res;
  };

  /** ❌ 태그 삭제 */
  const removeTag = async (id: number) => {
    const res = await TagService.deleteTag(id);
    if (res.success) setTags((prev) => prev.filter((t) => t.id !== id));
    return res;
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return { tags, loading, addTag, removeTag, refetch: fetchTags };
}
