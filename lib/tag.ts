import api from "@/lib/axios";

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class TagService {
  /** 태그 목록 조회 */
  static async getTags() {
    try {
      const res = await api.get<{ data: Tag[]; message: string }>("/user/tags");
      return { success: true, data: res.data.data };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "태그 목록 조회 실패" };
    }
  }

  /** 태그 생성 */
  static async createTag(name: string) {
    try {
      const res = await api.post("/user/tags", ["life","태그"]);

      const createdTags = res.data.data || [];
      return {
        success: true,
        message: "태그 생성 완료",
        data: createdTags[0],
      };
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return { success: false, message: "태그 생성 실패" };
    }
  }

  /** 태그 삭제 */
  static async deleteTag(id: number) {
    try {
      const res = await api.delete("/user/tags", {
        data: { tagIds: [id] },
      });
      return { success: true, message: "태그 삭제 완료" };
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      return { success: false, message: "태그 삭제 실패" };
    }
  }
}
