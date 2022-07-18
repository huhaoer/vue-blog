import { request } from '@/utils'

// 获取系统设置
export async function getSetting() {
  return await request.get("/api/setting");
}
