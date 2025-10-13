"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTags } from "@/hooks/use-tags";

export default function TagsPage() {
  const { tags, loading, addTag, removeTag } = useTags();
  const [newTag, setNewTag] = useState("");

  if (loading) return <div className="p-6 text-gray-500">태그 불러오는 중...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h1 className="text-xl font-semibold">내 태그 관리</h1>

      {/* 새 태그 추가 */}
      <div className="flex gap-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="새 태그 이름 입력"
        />
        <Button
          onClick={async () => {
            if (!newTag.trim()) return;
            const res = await addTag(newTag.trim());
            if (res.success) setNewTag("");
          }}
        >
          추가
        </Button>
      </div>

      {/* 태그 목록 */}
      <ul className="space-y-2 mt-6">
        {tags.map((tag) => (
          <li
            key={tag.id}
            className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
          >
            <span>{tag.name}</span>
            <Button variant="destructive" size="sm" onClick={() => removeTag(tag.id)}>
              삭제
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
