import request from '@/utils/request'

// 获取首页轮播数据
export async function getBanners () {
    return await request('/api/banner')
    // return request('/api/banner')

}