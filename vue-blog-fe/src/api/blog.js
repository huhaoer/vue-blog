import { request } from '@/utils'

// 分页获取博客数据
export async function getBlogs(page = 1, limit = 10, cId = -1) {
    return await request.get('/api/blogs', { params: { page, limit, cId } })
}

// 获取博客分类
export async function getBlogTypes() {
    return await request.get('/api/blogTypes')
}

// 获取博客详情
export async function getBlog(id) {
    return await request.get(`/api/blog/${id}`);
}

// 提交评论
export async function postComment(commentInfo) {
    return await request.post(`/api/comment`, commentInfo);
}

// 获取评论
export async function getComments(blogId, page = 1, limit = 10) {
    return await request.get("/api/comment", {
        params: {
            blogId,
            page,
            limit,
        },
    });
}