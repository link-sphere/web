import api from "@/lib/axios";

export interface Tag {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export class TagService {
  /** 🟢 태그 목록 조회 */
  static async getTags() {
    try {
      const res = await api.get<{ data: Tag[]; message: string }>("/user/tags");
      return { success: true, data: res.data.data };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "태그 목록 조회 실패" };
    }
  }

  /** 🟢 태그 생성 */
  static async createTag(name: string) {
    try {
      // ✅ 서버는 tags: string[] 형태를 요구함
      const res = await api.post("/user/tags", { tags: [name] });
      return { success: true, message: "태그 생성 완료", data: res.data.data };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "태그 생성 실패" };
    }
  }

  /** 🟢 태그 삭제 */
  static async deleteTag(id: number) {
    try {
      // 서버에서 id를 body로 받는 형태로 추정됨
      await api.delete("/user/tags", { data: { id } });
      return { success: true, message: "태그 삭제 완료" };
    } catch (error: any) {
      console.error(error);
      return { success: false, message: "태그 삭제 실패" };
    }
  }
}
