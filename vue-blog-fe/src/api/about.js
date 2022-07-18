import request from '@/utils/request'

// 关于我数据
export async function getAbout() {
  return await request.get("/api/about");
}
